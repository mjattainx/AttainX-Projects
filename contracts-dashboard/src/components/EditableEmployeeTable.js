import '../App.scss'
import React, { useEffect } from 'react'
import axios from 'axios'
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { useTable, usePagination } from 'react-table'
import { Button } from 'react-bootstrap'



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
function Table({ columns, data, updateMyData, skipPageReset, renderRowSubComponent }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      visibleColumns,
      state : { expanded },
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
              const rowProps = row.getRowProps();
              return (
                <tr {...rowProps}>
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
  const addtest = (one, two, three) => {
    return(one + two + three)
}


const EditableEmployeeTable = () => {
    
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
                    setData(prevData => [...prevData.filter(entry => entry["employee id"] !== tableProps.row.values["employee id"])])
                    // console.log(dataCopy)
                    // setData(dataCopy);
                    }}
                >
                    <Button variant = "danger"> x </Button>
                </span>
                )
          },
          {
            Header: 'Employee ID',
            accessor: 'employee id',
          },
          {
            Header: 'Name',
            columns: [
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
            columns: [
              {
                Header: 'Personal',
                accessor: 'personal email',
              },
              {
                Header: 'Work',
                accessor: 'work email',
              }
            ]
          },
          {
            Header: 'Phone',
            columns: [
              {
                Header: 'Cell',
                accessor: 'cell phone',
              },
              {
                Header: 'Work',
                accessor: 'work phone',
              }
            ]
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
            Header: 'Contracts',
            columns: [
                {
                Header: 'ID',
                accessor: 'contract id'
                },
                {
                Header: 'Name',
                accessor: 'contract name'
                
            
          
                    // columns: [
                    //     {
                    //         Header: () => null,
                    //         id: 'last',
                    //         accessor: data => data.contracts.map(item => {
                    //             return(
                    //                 item["contract name"]
                    //             )
                    //             // {console.log("this is, ", item)}
                    //             // <div>
                    //             //     <span>{item["contract name"]}</span>
                    //             //     <span>{item["contract id"]}</span>
                    //             // </div>
                    //         })
                    //     }

                    // Cell: (tableProps) => (
                    //     <div className="dropdown">
                    //         <button className="btn">
                    //             <i className="fa fa-caret-down">Current</i>
                    //         </button>
                    //         <div className="dropdown-content" >
                    //             {tableProps.row.original.contracts.map(index => {
                    //                 return (
                    //                     <a> ID: {index["contract id"]}, Name: {index["contract name"]} </a>
                    //                 )
                    //             })}
                                    
                    //         </div>
                    //         {/* <button onClick = {() => { console.log("tableProps are " ,tableProps.row.original.contracts)}}>debug</button> */}
                    //     </div>
                    //     )
                    // },
                    // {
                    //     Header: 'Remove',
                    //     Cell: (tableProps) => (
                    //         <div className="dropdown">
                    //             <button className="btn">
                    //                 <i className="fa fa-caret-down">Remove</i>
                    //             </button>
                    //             <div className="dropdown-content" >
                    //                 {tableProps.row.original.contracts.map(index => {
                    //                     return (
                    //                         <a onClick = {
                    //                             () => {
                    //                                 // console.log(addtest(index["contract id"], index["contract name"], tableProps.row.original["employee id"]))
                    //                                 // var newData = [...data]
                    //                                 // var newContracts = tableProps.row.original.contracts.filter(entry => entry["contract id"] !== index["contract id"] && entry["contract name"] !== index["contract name"])
                                                    
                    //                                 // for (var i in newData) {
                    //                                 //     if (newData[i]["employee id"] === tableProps.row.original["employee id"]) {
                    //                                 //         newData[i]["contracts"] = newContracts
                    //                                 //     }
                    //                                 // }
                    //                                 console.log([...data].map(emp => {
                    //                                     if (emp["employee id"] === tableProps.row.original["employee id"]) {
                    //                                         // emp["contracts"].filter(entry => entry["contract id"] !== index["contract id"] && entry["contract name"] !== index["contract name"])
                    //                                         return(emp["contracts"])
                    //                                     }
                    //                                     // emp["contracts"].filter(entry => entry["employee id"] !== tableProps.row.original["employee id"])
                    //                                 }))
                    //                                 // setData(prevData => ([...prevData , newData]))
                    //                                 // newData = newData.map(entry => entry["employee id"] )
                    //                                 // () => console.log()
                    //                             }
                    //                         }>    
                    //                         ID: {index["contract id"]}, Name: {index["contract name"]} </a>
                    //                     )
                    //                 })}
                                        
                    //             </div>
                    //             {/* <button onClick = {() => { console.log("tableProps are " ,tableProps.row.original.contracts)}}>debug</button> */}
                    //         </div>
                    //     )
                    // },
                    // {
                    //     Header: 'Add',
                    //     Cell: (tableProps) => (
                    //         <div className="dropdown">
                    //             <button className="btn">
                    //                 <i className="fa fa-caret-down">Add</i>
                    //             </button>
                    //             <div className="dropdown-content" >
                    //                 {tableProps.row.original.contracts.map(index => {
                    //                     return (
                    //                         <a> ID: {index["contract id"]}, Name: {index["contract name"]} </a>
                    //                     )
                    //                 })}
                                        
                    //             </div>
                    //             {/* <button onClick = {() => { console.log("tableProps are " ,tableProps.row.original.contracts)}}>debug</button> */}
                    //         </div>
                    //     )
                    }
            ] 
          }
          
        ],
        []
      )
    
      const [data, setData] = React.useState([])
      const [originalData, setOriginalData] = React.useState([])
      const [skipPageReset, setSkipPageReset] = React.useState(false)

      const [contractsData, setContractsData] = React.useState([])

      useEffect(() => {
        axios.get('https://3jvf3lp2x8.execute-api.us-east-1.amazonaws.com/dev',
            {	headers : {
            "Content-Type": "application/json",
            "Accept": "application/json"}}).then(res => {
           setData(res.data)
           setOriginalData(res.data)
        });

        axios.get('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
        {	headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"}}).then(res => {
       setContractsData(res.data)
    });
      }, []);


      //sub-components****************************
      function SubRows({ row, rowProps, visibleColumns, data, loading }) {
        if (loading) {
          return (
            <tr>
              <td/>
              <td colSpan={visibleColumns.length - 1}>
                Loading...
              </td>
            </tr>
          );
        }
      
        // error handling here :)
      
        return (
          <>
            {data.map((x, i) => {
              return (
                <tr
                  {...rowProps}
                  key={`${rowProps.key}-expanded-${i}`}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                      >
                        {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                          value:
                            cell.column.accessor &&
                            cell.column.accessor(x, i),
                          row: { ...row, original: x }
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </>
        );
      }

      function SubRowAsync({ row, rowProps, visibleColumns }) {
        const [loading, setLoading] = React.useState(true);
        const [data, setData] = React.useState([]);
      
        React.useEffect(() => {
          const timer = setTimeout(() => {
            console.log(row)
            setData(row.original["contracts"])
            // setData([
            //     {
            //         "employee id": "temp",
            //         "first name": "temp",
            //         "last name": "temp"
            //     },
            //     {
            //         "employee id": "temp2",
            //         "first name": "temp",
            //         "last name": "temp"
            //     },
            //     {
            //         "employee id": "temp3",
            //         "first name": "temp",
            //         "last name": "temp"
            //     }
            // ]);
            setLoading(false);
          }, 500);
      
          return () => {
            clearTimeout(timer);
          };
        }, []);
      
        return (
          <SubRows
            row={row}
            rowProps={rowProps}
            visibleColumns={visibleColumns}
            data={data}
            loading={loading}
          />
        );
      }

      const renderRowSubComponent = React.useCallback(
        ({ row, rowProps, visibleColumns }) => (
          <SubRowAsync
            row={row}
            rowProps={rowProps}
            visibleColumns={visibleColumns}
          />
        ),
        []
      );



      //Editable*********************************


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
            'employee id' : '',
            'contract id' : '',
            'contract name' : '',
            'start date' : '',
            'end date' : '',
            'personal email' : '',
            'work email' : '',
            'first name' : '',
            'last name' : '',
            'cell phone' : '',
            'work phone' : '',
        }
        
        setData(prevData => ([...prevData , newData]))
      }

      const renderSubmit = async () => {
        //   console.log(JSON.stringify(data))

        await axios.delete('https://3jvf3lp2x8.execute-api.us-east-1.amazonaws.com/dev', {data : originalData}, {
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }})
        // .then(res => {
        //     console.log('deleted');
        //     alert('deleted')
        // })

        await axios.post('https://3jvf3lp2x8.execute-api.us-east-1.amazonaws.com/dev', data, {
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => {
            // console.log(res.data);
            alert('Changes were submitted.');
        })
        .catch((err) => {
            console.log(err);
            alert('There was an error.');
        })
    }
        
    const subComponent = row => {
        return (
          <div>
            <div> working row {row} </div>
            <div> working row 2 {row} </div>
          </div>
        );
      };
    
      return (
        <div>
            <button className = "ui button" onClick = {() => addRow()}> Add Employee </button>
            <button className = "ui button" onClick = {() => renderSubmit()}> Submit Changes</button>
            <button className = "ui button" onClick = {() => resetData()}>Reset Table</button>
            {/* <Button onClick = {() => console.log(data)}>debug</Button> */}
            <div className = 'editTable'>
            <Table
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                subComponent = {subComponent}
                renderRowSubComponent={renderRowSubComponent}
                
            />
            </div>
        </div>
      )
}

export default EditableEmployeeTable
