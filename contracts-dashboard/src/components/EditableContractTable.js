import '../App.scss'
import React, { useEffect } from 'react'
import axios from 'axios'
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { useTable, usePagination } from 'react-table'
import { Button } from 'react-bootstrap'
import moment from 'moment'



// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
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
  
    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return <input value={value} onChange={onChange} onBlur={onBlur} />
  }
// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
  }
// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        // use the skipPageReset option to disable page resetting temporarily
        autoResetPage: !skipPageReset,
        // updateMyData isn't part of the API, but
        // anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our
        // cell renderer!
        updateMyData,
      },
      usePagination
    )
  
    // Render the UI for your table
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
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
      </>
    )
  }

const EditableContractTable = () => {
    const [data, setData] = React.useState([])
    const [originalData, setOriginalData] = React.useState([])
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const columns = React.useMemo(
        () => [
            {
                Header : () => null,
                id: 'delete',
                accessor: (str) => "delete",
    
                Cell: (tableProps) => (
                <span
                    style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline"
                    }}
                    onClick={() => {

                    // const dataCopy = [...data];
                    // dataCopy.splice(tableProps.row.index, 1);
                    // console.log(tableProps.row.index)
                    // console.log(dataCopy)

                    // setData(dataCopy.filter(entry => entry["contract id"] !== tableProps.row.values["contract id"]))
                    if (window.confirm('Are you sure you wish to delete this item?'))
                    setData(prevData => [...prevData.filter(entry => entry["contract id"] !== tableProps.row.values["contract id"])])
                    // console.log(dataCopy)
                    // setData(dataCopy);
                    }}
                >
                    <Button variant = "danger" size = "sm"> x </Button>
                </span>
                )
              },
          {
            Header: 'Contract ID',
            accessor: 'contract id',
          },
          {
            Header: 'Contract Name',
            accessor: 'contract name',
          },
          {
            Header: 'Start Date',
            accessor: 'start date',
          },
          {
            Header: 'End Date',
            accessor: 'end date',
          },
          {
            Header: 'Name',
            columns: [
              {
                Header: 'Title',
                accessor: 'title',
              },
              {
                Header: 'First',
                accessor: 'first name',
              },
              {
                Header: 'Last',
                accessor: 'last name',
              }
            ]
          },
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Phone',
            accessor: 'phone'
          },
          {
            Header : 'Location',
            columns : [
              {
                Header : 'Office',
                accessor: 'office'
              },
              {
                Header : 'Address',
                accessor : 'address'
              }
            ]
          }
        ],
        []
      )
    

      useEffect(() => {
        axios.get('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
            {	headers : {
            "Content-Type": "application/json",
            "Accept": "application/json"}}).then(res => {
           setData(res.data)
           setOriginalData(res.data)
        });
      }, []);
    


      // We need to keep the table from resetting the pageIndex when we
      // Update data. So we can keep track of that flag with a ref.
    
      // When our cell renderer calls updateMyData, we'll use
      // the rowIndex, columnId and new value to update the
      // original data
      const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      }
    
      // After data chagnes, we turn the flag back off
      // so that if data actually changes when we're not
      // editing it, the page is reset
      React.useEffect(() => {
        setSkipPageReset(false)
      }, [data])
    
      // Let's add a data resetter/randomizer to help
      // illustrate that flow...
      const resetData = () => setData(originalData)

      const addRow = () => {
        var newData = {
            'contract id' : '',
            'contract name' : '',
            'start date' : '',
            'end date' : '',
            'title' : '',
            'first name' : '',
            'last name' : '',
            'email' : '',
            'phone' : '',
            'office' : '',
            'address' : '',
        }
        
        setData(prevData => ([...prevData , newData]))
      }

      const renderSubmit = async () => {
        //   console.log(JSON.stringify(data))

        await axios.delete('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', {data : originalData}, {
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }})
        // .then(res => {
        //     console.log('deleted');
        //     alert('deleted')
        // })


        // var perChunk = 20
        // const partitionedData = data.reduce((resultArray, item, index) => { 
        //   const chunkIndex = Math.floor(index/perChunk)
        //   if(!resultArray[chunkIndex]) {
        //     resultArray[chunkIndex] = [] // start a new chunk
        //   }
        //   resultArray[chunkIndex].push(item)
        //   return resultArray
        // }, [])
        // for (var i in partitionedData) {
        //   await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', i, {
        //       headers : {
        //           "Content-Type": "application/json",
        //           "Accept": "application/json"
        //       }
        //   })
        // }
        // alert('Changes were submitted.')

        await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', data, {
          headers : {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
        })
        .then(res => {
          alert('Changes have been submitted.')
        })
      }

      const addFillerData = () => {
        for (var k in Array.from({length: 20}, (x, i) => i)) {
          const newData = {
            'contract id' : (parseInt(k) + 100).toString(),
            'contract name' : (parseInt(k) + 100).toString(),
            'start date' : moment(new Date(+(new Date()) - Math.round(Math.random()*1000000000)))
            .format('MM/DD/YYYY'),
            'end date' : moment(new Date(+(new Date()) - Math.round(Math.random()*1000000000)))
            .format('MM/DD/YYYY'),
            'title' : (parseInt(k) + 100).toString(),
            'first name' : (parseInt(k) + 100).toString(),
            'last name' : (parseInt(k) + 100).toString(),
            'email' : (parseInt(k) + 100).toString(),
            'phone' : (parseInt(k) + 100).toString(),
            'office' : (parseInt(k) + 100).toString(),
            'address' : (parseInt(k) + 100).toString(),
          }
          setData(prevData => ([...prevData , newData]))
        }
      }
        
      
    
      return (
        <div>
            <button className = "ui button" onClick = {() => addRow()}> Add Contract </button>
            <button className = "ui button" onClick = {() => renderSubmit()}> Submit Changes</button>
            <button className = "ui button" onClick = {() => resetData()}>Reset Table</button>
            <button className = "ui button" onClick = {() => {
                      var perChunk = 20
                      const partitionedData = data.reduce((resultArray, item, index) => { 
                        const chunkIndex = Math.floor(index/perChunk)
                        if(!resultArray[chunkIndex]) {
                          resultArray[chunkIndex] = [] // start a new chunk
                        }
                        resultArray[chunkIndex].push(item)
                        return resultArray
                      }, [])
                      console.log(partitionedData)
            }}> debugger</button>
            <button className = "ui button" onClick = {() => addFillerData()}> add filler data</button>
            <div className = 'editTable'>
            <Table
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
            />
            </div>
        </div>
      )
}

export default EditableContractTable
