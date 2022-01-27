import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from 'react-table'
import {matchSorter} from 'match-sorter'

import axios from 'axios'
import moment from 'moment'
import {v4 as uuid} from "uuid";
import CsvDownload from 'react-json-to-csv';

const Styles = styled.div`
  display: block;
  max-width: 100%; 
  padding: 1rem;
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;



    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  editable,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if (!editable) {
    return `${initialValue}`
  }

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

function DateRangeColumnFilter({
    column: {
      filterValue = [],
      preFilteredRows,
      setFilter,
      id
    }})
  {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
      let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
  
      preFilteredRows.forEach(row => {
        const rowDate = new Date(row.values[id])
  
        min = rowDate <= min ? rowDate : min
        max = rowDate >= max ? rowDate : max
      })
  
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div>
        <input
          min={min.toISOString().slice(0, 10)}
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? val : undefined, old[1]])
          }}
          type="date"
          value={filterValue[0] || ''}
        />
        {' to '}
        <input
          max={max.toISOString().slice(0, 10)}
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? val.concat('T23:59:59.999Z') : undefined])
          }}
          type="date"
          value={filterValue[1]?.slice(0, 10) || ''}
        />
      </div>
    )
  }

  function dateBetweenFilterFn(rows, id, filterValues) {
    let sd = new Date(filterValues[0]);
    let ed = new Date(filterValues[1]);
    console.log(rows, id, filterValues)
    return rows.filter(r => {
        var time = new Date(r.values[id]);
        console.log(time, ed, sd)
        if (filterValues.length === 0) return rows;
        return (time >= sd && time <= ed);
    });
}

dateBetweenFilterFn.autoRemove = val => !val;

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Be sure to pass our updateMyData and the skipReset option
function Table({ columns, data, updateMyData, skipReset, setData, renderSubmit, resetData, loadingSubmit, loadingGet }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      dateBetween: dateBetweenFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      Cell: EditableCell,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGroupBy,
    state: {
      pageIndex,
      pageSize,
      sortBy,
      groupBy,
      expanded,
      filters,
      selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // Here we will use a plugin to add our selection column
    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            // Make this column a groupByBoundary. This ensures that groupBy columns
            // are placed after it
            groupByBoundary: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                {/* <button onclick = {() => console.log(row)} > 🗑️ </button> */}
              </div>
            ),
          },
          ...columns,
        ]
      })
    }
  )

  const excludeEntry = () => {
    var copy = [...data]
    for (var obj in copy) {
      delete copy[obj]['entry']
      delete copy[obj]['cognitoEmail']
    }
    return(copy)
  }

  // Render the UI for your table
  return (
    <>
    <div className="crud-ui-bar">
      {/* <button onClick = {() => console.log(selectedRowIds)}>Delete 🗑️</button> */}
      <button className = "ui labeled icon button"  onClick = {() => {
        if (window.confirm('Are you sure you want to delete these item(s)?')) {
          const indices = Object.keys(selectedRowIds)
          const indices2 = indices.map(id => parseInt(id))
          const retData = data.filter(function(value, index) {
            return indices2.indexOf(index) == -1;
          })
          // console.log(retData)
          setData(retData)
          // setData(retData)
        }
      }}> <i className="trash alternate icon"></i>Delete</button>

      <button className = "ui labeled icon button" onClick={() => {
          const newData = {
            "entry": uuid(),
            "name" : "",
            "workPhone": "",
            "personalPhone": "",
            "workEmail": "",
            "personalEmail": "",
          }
          setData(prev => [newData, ...prev])}

        }> <i className = "user plus icon"></i>Add</button>
      <button className = "ui labeled icon button" onClick={() => {resetData(); gotoPage(0)}}> <i className = "sync alternate icon"></i>Reset Data</button>   
      {loadingSubmit ? <button className = "ui loading button" onClick={() => renderSubmit()}>  Submit Changes </button> : <button className = "ui labeled icon button" onClick={() => renderSubmit()}> <i className = "paper plane icon"></i> Submit Changes </button> }
      {/* <button onClick = {() => console.log(excludeEntry())}>test</button> */}
      <CsvDownload className = "ui labeled icon button" data={data} filename = "TeamQuestionnaire.csv"><i className = "download icon"></i> Download as CSV File</CsvDownload>
      <br/>
    </div>

      {!loadingGet ?   
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? '⫸ ' : '➝ '}
                      </span>
                    ) : null}
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {/* {row.isGrouped && <button className = "ui button" onClick = {() => {
                
                  console.log(row)
                  const copy = row.subRows[0].original
                  const newData = {
                    'entry': uuid(),
                    'firstName' : copy["firstName"],
                    'lastName' : copy["lastName"],
                    'skill' : '',
                    'managerRating': '',
                    'selfRating' : ''
                  }
                  setData(prev => [newData, ...prev])
                  // setGroupBy('firstName')
                  // console.log()
                }}> yes</button>} */}
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? <i className= "ui minus square outline icon"></i> : <i className= "ui plus square outline icon"></i>}
                          </span>{' '}
                          {cell.render('Cell', { editable: false })} (
                          {row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell', { editable: true })
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      : <div className="ui segment">
          {/* <p>Loading Data</p> */}
          <br/><br/>
          <br/>
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
          <br/><br/><br/>
        </div>}
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button className = "mini ui button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <i className = "ui angle double left icon"></i>
        </button>{' '}
        <button className = "mini ui button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          <i className = "ui angle left icon"></i>
        </button>{' '}
        <button className = "mini ui button" onClick={() => nextPage()} disabled={!canNextPage}>
        <i className = "ui angle right icon"></i>
        </button>{' '}
        <button className = "mini ui button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <i className = "ui angle double right icon"></i>
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              groupBy,
              expanded: expanded,
              filters,
              selectedRowIds: selectedRowIds,
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
function roundedMedian(leafValues) {
  let min = leafValues[0] || 0
  let max = leafValues[0] || 0

  leafValues.forEach(value => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const TeamQuestionnairePM = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name (Last, First)',
        accessor: 'name',
        // Use a two-stage aggregator here to first
        // count the total rows being aggregated,
        // then sum any of those counts if they are
        // aggregated further
        // aggregate: 'count',
        // Aggregated: ({ value }) => `${value} Names`,
      },
      {
        Header: 'Email',
        columns: [
          {
            Header: 'Work',
            accessor: 'workEmail',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            // aggregate: 'uniqueCount',
            // Aggregated: ({ value }) => `${value} Unique Names`,
          },
          {
            Header: 'Personal',
            accessor: 'personalEmail',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            // aggregate: 'uniqueCount',
            // Aggregated: ({ value }) => `${value} Unique Names`,
          },
        ]
      },
      {
        Header: 'Phone',
        columns: [
          {
            Header: 'Work',
            accessor: 'workPhone',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            // aggregate: 'uniqueCount',
            // Aggregated: ({ value }) => `${value} Unique Names`,
          },
          {
            Header: 'Personal',
            accessor: 'personalPhone',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            // aggregate: 'uniqueCount',
            // Aggregated: ({ value }) => `${value} Unique Names`,
          },
        ]
      },
    ],
    []
  )

  const [data, setData] = React.useState([])
  // const [datafordelete, setDatafordelete] = React.useState([])

  const [originalData, setOriginalData] = React.useState([])
  const [loadingSubmit, setLoadingSubmit] = React.useState(false)
  const [loadingGet, setLoadingGet] = React.useState(true)



  useEffect(async () => {
    await axios.get('https://okz4vqf3tj.execute-api.us-east-1.amazonaws.com/dev', {
      headers : {
			  "Content-Type": "application/json",
			  "Accept": "application/json"
      }
    })
    .then( res => {
      setData(res.data)
      setOriginalData(res.data)
      setLoadingGet(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  const renderSubmit = async () => {
    setLoadingSubmit(true)
    const entries_data = []
    const entries_og_data = []
    for (var key in data) {
      entries_data.push(data[key].entry)
    }
    for (var key in originalData) {
      entries_og_data.push(originalData[key].entry)
    }
    const payloadDelete = originalData.filter(item => !entries_data.includes(item.entry))
    // console.log("deleting ", JSON.stringify(payloadDelete))
    console.log("deleting ", payloadDelete)

    const payloadCreate = data.filter(item => !entries_og_data.includes(item.entry))
    console.log("creating ", payloadCreate)

    const payloadUpdate = data.filter(item => entries_og_data.includes(item.entry) && !originalData.includes(item))
    console.log("updating ", payloadUpdate)

    const payload = {
      "delete" : payloadDelete,
      "update" : payloadUpdate,
      "create" : payloadCreate
    }
    // console.log(payload)

    await axios.put('https://okz4vqf3tj.execute-api.us-east-1.amazonaws.com/dev', payload, {
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => {
      alert('Changes have been submitted.')
    })
    .catch((err) => {
      console.log(err);
      alert('There was an error.');
    })


  
    setLoadingSubmit(false)
  }

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = React.useRef(false)

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    skipResetRef.current = false
  }, [data])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => {
    // Don't reset the page when we do this
    skipResetRef.current = true
    setData(originalData)
    // setDatafordelete([])
  }

  const addFillerData = () => {
    for (var k in Array.from({length: 100}, (x, i) => i)) {
      const newData = {
        'entry' : uuid(),
        'firstName' : "someone",
        'lastName' : (parseInt(k) + 1).toString(),
        'skill' : (parseInt(k) + 1).toString(),
        'selfRating' : (parseInt(k) + 1).toString(),
        'managerRating' : moment(new Date(+(new Date()) - Math.round(Math.random()*10000000000)))
        .format('MM/DD/YYYY'),
      }
      setData(prevData => ([...prevData , newData]))
    }
  }

  return (
    <Styles>
      {/* <button onClick={() => setData(prev => [{'entry' : uuid(), 'firstName' : '123', 'lastName': '123', 'skill': '123', 'managerRating': '123', 'selfRating': '123'},...prev])}>add 123</button> */}
      {/* <div>
        <button onClick={resetData}>Reset Data</button>      
        <button onClick={() => renderSubmit()}> Submit Changes </button>
      </div> */}
      {/* <div>
        debugging
        <button onClick={() => console.log(data)}>data</button>
        <button onClick={() => addFillerData()}> Add Filler Data</button>
      </div> */}

      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipReset={skipResetRef.current}
        setData={setData}
        resetData = {resetData}
        renderSubmit = {renderSubmit}
        loadingSubmit = {loadingSubmit}
        loadingGet = {loadingGet}
      />
    </Styles>
  )
}

export default TeamQuestionnairePM