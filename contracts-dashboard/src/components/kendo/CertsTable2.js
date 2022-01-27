// //V1: WITHOUT EDITING

import '@progress/kendo-theme-default/dist/all.css';
// import '@progress/kendo-theme-material/dist/all.css';
// import '@progress/kendo-theme-classic/dist/all.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { setExpandedState, setGroupIds } from '@progress/kendo-react-data-tools';
import products from './products.json';
import axios from 'axios'
const initialDataState = {
  take: 10,
  skip: 0,
  group: [
    // {
    // field: 'firstName'
    // }, {
    // field: 'lastName'
    // }
    {
      field: 'fullName'
    }
  ]
};
const aggregates = [
  {
    field: 'UnitsInStock',
    aggregate: 'sum'
  }, {
    field: 'UnitPrice',
    aggregate: 'average'
  }
];

const processWithGroups = (data, dataState) => {
  const groups = dataState.group;

  if (groups) {
    groups.map(group => group.aggregates = aggregates);
  }

  dataState.group = groups;
  const newDataState = process(data, dataState);
  setGroupIds({
    data: newDataState.data,
    group: dataState.group
  });
  return newDataState;
};

const CertsTable2 = () => {
  const [dataState, setDataState] = React.useState(initialDataState);
  const [temp, setTemp] = React.useState([])
  const [result, setResult] = React.useState(processWithGroups(temp, initialDataState));
  const [collapsedState, setCollapsedState] = React.useState([]);

  const [page, setPage] = React.useState(initialDataState);

  const pageChange = (event) => {
    setPage(event.page);
  };

  React.useEffect(() => {
    async function fetchData() {
      const params = {
        "TableName": "skillstable-120192812318"
      }
    
      await axios.get('https://pwnk7rnvjl.execute-api.us-east-1.amazonaws.com/dev', {
        headers : {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then( res => {
        
        var data = res.data
        data.map(entry => {
          entry["fullName"] = entry["firstName"] + " " + entry["lastName"]
        })
        setTemp(data)
        setResult(processWithGroups(data, initialDataState))
      })
      .catch((err) => {
        console.log(err);
      })
    }
    fetchData();
  }, [])

  const dataStateChange = event => {
    const newDataState = processWithGroups(temp, event.dataState);
    setResult(newDataState);
    setDataState(event.dataState);
  };

  const expandChange = event => {
    const item = event.dataItem;

    if (item.groupId) {
      const newCollapsedIds = !event.value ? [...collapsedState, item.groupId] : collapsedState.filter(groupId => groupId !== item.groupId);
      setCollapsedState(newCollapsedIds);
    }
  };

  const cellRender = (tdElement, cellProps) => {
    // if (cellProps.rowType === 'groupFooter') {
    //   if (cellProps.field === 'firstName') {
    //     return <td aria-colindex={cellProps.columnIndex} role={'gridcell'}>
    //               Average: {cellProps.dataItem.aggregates.UnitPrice.average}
    //             </td>;
    //   } else if (cellProps.field === 'lastName') {
    //     return <td aria-colindex={cellProps.columnIndex} role={'gridcell'}>
    //               Sum: {cellProps.dataItem.aggregates.UnitsInStock.sum}
    //             </td>;
    //   }
    // }

    return tdElement;
  };

  const newData = setExpandedState({
    data: result.data,
    collapsedIds: collapsedState
  });
  return <Grid
    style={{ height: '520px' }}
    resizable={true}
    reorderable={true}
    filterable={true}
    sortable={true}
    // pageable={{
    //   pageSizes: true,
    // }}
    onPageChange={pageChange}
    skip={page.skip}
    take={page.take}
    total={newData.length}
    groupable={{ footer: 'visible' }}
    data={newData.slice(page.skip, page.take + page.skip)}
    onDataStateChange={dataStateChange} {...dataState} onExpandChange={expandChange} expandField="expanded" cellRender={cellRender}>
      {/* <Column field="entry" filterable={false} width="50px" /> */}
      {/* <Column field="firstName" title="First Name" /> */}
      {/* <Column field="lastName" title="Last Name" /> */}
      <Column field="fullName" title="Name" />
      <Column field="certificate" title="Certificate" />
      <Column field="provider" title="Provider"/>
      <Column field="effectiveDate" title="Effective Date" />
      <Column field="expirationDate" title="Expiration Date" />
    </Grid>;
};

export default CertsTable2

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { process } from '@progress/kendo-data-query';
// import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
// import { setGroupIds, getGroupIds, setExpandedState } from '@progress/kendo-react-data-tools';
// import axios from 'axios';
// // import products from './products.json';
// const initialDataState = {
//   take: 10,
//   skip: 0,
//   // group: [{
//   //   field : 'fullName'
//   // }]
// };

// const processWithGroups = (data, dataState) => {
//   const newDataState = process(data, dataState);
//   setGroupIds({
//     data: newDataState.data,
//     group: dataState.group
//   });
//   return newDataState;
// };

// const CertsTable2 = () => {
//   const [products, setProducts] = React.useState([])
//   const [dataState, setDataState] = React.useState(initialDataState);
//   const [resultState, setResultState] = React.useState(processWithGroups(products, initialDataState));
//   const [collapsedState, setCollapsedState] = React.useState([]);


//   React.useEffect(() => {
//     async function fetchData() {
//       await axios.get('https://pwnk7rnvjl.execute-api.us-east-1.amazonaws.com/dev', {
//       headers : {
// 			  "Content-Type": "application/json",
// 			  "Accept": "application/json"
//       }
//     })
//     .then( res => {

//       const data = res.data
//       const data2 = data.map(entry => {
//         entry["fullName"] = entry["firstName"] + " " + entry["lastName"]
//         return(entry)
//       })
//       console.log(data2)
//       setProducts(data2)

//       const datastate = {
//         take: 10,
//         skip: 0,
//         group: [{
//           field : 'fullName'
//         }]
//       };

//       setDataState(datastate)
//       const temp = processWithGroups(data2, datastate)
//       setResultState(temp)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   }
//     fetchData()
//   }, [])
//   const onDataStateChange = React.useCallback(event => {
//     const newDataState = processWithGroups(products, event.dataState);
//     setDataState(event.dataState);
//     setResultState(newDataState);
//   }, []);
//   const onExpandChange = React.useCallback(event => {
//     const item = event.dataItem;

//     if (item.groupId) {
//       const collapsedIds = !event.value ? [...collapsedState, item.groupId] : collapsedState.filter(groupId => groupId !== item.groupId);
//       setCollapsedState(collapsedIds);
//     }
//   }, [collapsedState]);
//   const onGroupsToggle = React.useCallback(() => {
//     const dataStateWithoutPaging = processWithGroups(products, {
//       group: dataState.group
//     });
//     setCollapsedState(collapsedState.length ? [] : getGroupIds({
//       data: dataStateWithoutPaging.data
//     }));
//   }, [collapsedState, dataState]);
//   const newData = setExpandedState({
//     data: resultState.data,
//     collapsedIds: collapsedState
//   });
//   return <Grid style={{
//     height: '520px'
//   }} pageable={{
//     pageSizes: true
//   }} groupable={true} data={newData} total={resultState.total} onDataStateChange={onDataStateChange} {...dataState} onExpandChange={onExpandChange} expandField="expanded">
//         {/* <GridToolbar>
//           <button className="k-button k-primary" onClick={onGroupsToggle}>{collapsedState.length ? 'Expand' : 'Collapse'} Groups</button>
//         </GridToolbar> */}
//          <Column field="fullName" title="Name" />
//          <Column field="certificate" title="Certificate" />
//          <Column field="provider" title="Provider"/>
//          <Column field="effectiveDate" title="Effective Date" />
//          <Column field="expirationDate" title="Expiration Date" />
//       </Grid>;
// };

// export default CertsTable2







// //V2: WITH EDITING

// import '@progress/kendo-theme-default/dist/all.css';
// // import '@progress/kendo-theme-material/dist/all.css';
// // import '@progress/kendo-theme-classic/dist/all.css';
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
// import { process } from '@progress/kendo-data-query';
// import { setExpandedState, setGroupIds } from '@progress/kendo-react-data-tools';
// import products from './products.json';
// import {v4 as uuid} from "uuid";
// import axios from 'axios'
// const initialDataState = {
//   take: 10,
//   skip: 0,
//   group: [
//     // {
//     // field: 'firstName'
//     // }, {
//     // field: 'lastName'
//     // }
//     {
//       field: 'fullName'
//     }
//   ]
// };
// const aggregates = [
//   {
//     field: 'UnitsInStock',
//     aggregate: 'sum'
//   }, {
//     field: 'UnitPrice',
//     aggregate: 'average'
//   }
// ];

// const processWithGroups = (data, dataState) => {
//   const groups = dataState.group;

//   if (groups) {
//     groups.map(group => group.aggregates = aggregates);
//   }

//   dataState.group = groups;
//   const newDataState = process(data, dataState);
//   setGroupIds({
//     data: newDataState.data,
//     group: dataState.group
//   });
//   return newDataState;
// };

// const CertsTable2 = () => {
//   const [dataState, setDataState] = React.useState(initialDataState);
//   const [temp, setTemp] = React.useState([])
//   const [result, setResult] = React.useState(processWithGroups(temp, initialDataState));
//   const [collapsedState, setCollapsedState] = React.useState([]);

//   const [page, setPage] = React.useState(initialDataState);

//   const pageChange = (event) => {
//     setPage(event.page);
//   };

//   React.useEffect(() => {
//     async function fetchData() {
//       await axios.get('https://pwnk7rnvjl.execute-api.us-east-1.amazonaws.com/dev', {
//         headers : {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         }
//       })
//       .then( res => {
//         var data = res.data
//         data.map(entry => {
//           entry["fullName"] = entry["firstName"] + " " + entry["lastName"]
//         })
//         setTemp(data)
//         setResult(processWithGroups(data, initialDataState))
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//     }
//     fetchData();
//   }, [])

//   const dataStateChange = event => {
//     const newDataState = processWithGroups(temp, event.dataState);
//     setResult(newDataState);
//     setDataState(event.dataState);
//   };

//   const expandChange = event => {
//     const item = event.dataItem;

//     if (item.groupId) {
//       const newCollapsedIds = !event.value ? [...collapsedState, item.groupId] : collapsedState.filter(groupId => groupId !== item.groupId);
//       setCollapsedState(newCollapsedIds);
//     }
//   };

//   const cellRender = (tdElement, cellProps) => {
//     // if (cellProps.rowType === 'groupFooter') {
//     //   if (cellProps.field === 'firstName') {
//     //     return <td aria-colindex={cellProps.columnIndex} role={'gridcell'}>
//     //               Average: {cellProps.dataItem.aggregates.UnitPrice.average}
//     //             </td>;
//     //   } else if (cellProps.field === 'lastName') {
//     //     return <td aria-colindex={cellProps.columnIndex} role={'gridcell'}>
//     //               Sum: {cellProps.dataItem.aggregates.UnitsInStock.sum}
//     //             </td>;
//     //   }
//     // }

//     return tdElement;
//   };

//   const newData = setExpandedState({
//     data: result.data,
//     collapsedIds: collapsedState
//   });
//   return (
//     <div>
//       {/* <div>
//         <form>
//           <label>
//             Name:
//             <input type = "text" name="name" id="inputName"/>
//           </label>
//           <label>
//             Certificate:
//             <input type = "text" name="certificate" />
//           </label>
//           <label>
//             Provider:
//             <input type = "text" name="provider" />
//           </label>
//           <label>
//             Effective Date:
//             <input type = "text" name="effective date" />
//           </label>
//           <label>
//             Expiration Date:
//             <input type = "text" name="expiration date" />
//           </label>
//         </form>
//       </div> */}
//       <button onClick = {() => console.log(temp)}>data</button>
//       <button onClick = {() => {
//         // const fill = [...temp,]
//         // fill.push({
//         //   // 'entry': uuid(),
//         //   // 'fullName' : document.getElementById('inputName').value,
//         //   'fullName': 'te'
//         // })
//         // setTemp(fill)
//         setTemp( prev => {
//           return [...prev, {'fullName': 'testing'}]
//         }

//         )

//         const newDataState = processWithGroups(temp, dataState);
//         setResult(newDataState);
//         setDataState(dataState);
//       }}>add data</button>
//   <Grid
//     style={{ height: '520px' }}
//     resizable={true}
//     reorderable={true}
//     filterable={true}
//     sortable={true}
//     // pageable={true}
//     onPageChange={pageChange}
//     skip={page.skip}
//     take={page.take}
//     total={newData.length}
//     groupable={{ footer: 'visible' }}
//     data={newData.slice(page.skip, page.take + page.skip)}
//     onDataStateChange={dataStateChange} {...dataState} onExpandChange={expandChange} expandField="expanded" cellRender={cellRender}>
//       {/* <Column field="entry" filterable={false} width="50px" /> */}
//       {/* <Column field="firstName" title="First Name" /> */}
//       {/* <Column field="lastName" title="Last Name" /> */}
      
//       <Column field="fullName" title="Name" />
//       <Column field="certificate" title="Certificate" />
//       <Column field="provider" title="Provider"/>
//       <Column field="effectiveDate" title="Effective Date" />
//       <Column field="expirationDate" title="Expiration Date" />
//     </Grid>
//     </div>
//   )
// };

// export default CertsTable2
