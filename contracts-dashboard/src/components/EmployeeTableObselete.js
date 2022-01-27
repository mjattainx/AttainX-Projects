import '../App.scss'
import React, {Component} from 'react'
import axios from 'axios'

import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom'
import { BrowserRouter as  Link, withRouter } from 'react-router-dom'
import { Dropdown } from 'react-dropdown';
import 'react-dropdown/style.css';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons'
import { DropdownItem, DropdownMenu } from 'semantic-ui-react';


const $ = require('jquery')
$.DataTable = require('datatables.net')

function handletableclick(id, name, props) {
    props.history.push("/details=" +
        id + "zzzzzzzz" + name
    )
}

class EmployeeTab extends Component {
    state = {
        data : [],
        filteredData : [],
        freeData : [],

        // uniqueEmployeeIds : [],
        // uniqueData : [],
        // resultData : [],
        isLoading: true
    }
    async getData () {
        await axios.get('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
		{	headers : {
			"Content-Type": "application/json",
			"Accept": "application/json"}})
		.then(res => {
			// console.log(res.data);
            this.setState({ 
                data : res.data,
                filteredData : res.data.filter(contract =>
                    contract["employee id"] !== undefined &&
                    contract["employee id"] !== null &&
                    contract["employee id"] !== ""),
                freeData : res.data.filter(contract =>
                    contract["employee id"] === undefined ||
                    contract["employee id"] === null ||
                    contract["employee id"] === "")
            })
		})
        .catch((err) => {
            console.log(err);
		})
    }

    // transformData(inputId) {
    //     var returnedData = []
    //     var filteredData = this.state.filteredData
    //     var uniqueEmployeeIds = filteredData.map( (value) => value["employee id"]).filter( (value, index, _arr) => _arr.indexOf(value) == index);
    //     this.setState({ uniqueEmployeeIds : uniqueEmployeeIds })
    //     // console.log(uniqueEmployeeIds)
    //     uniqueEmployeeIds.map(id => returnedData[id] = filteredData.filter(entry => entry["employee id"] === id))
    //     // console.log("returnedData is , ", returnedData)
    //     returnedData = returnedData[inputId]

    //     var ans = []
    //     returnedData.map(entry => ans.push("Contract ID: " + entry["contract id"] + ", Contract Name: " + entry["contract name"]))
    //     // console.log("returnedData is ", returnedData)
    //     // console.log("transformData ans is, ", ans)
    //     return(ans)
    // }
    transformData2() {
        var filteredData = this.state.filteredData
        // console.log(filteredData)

        const result = [];
        const map = new Map();
        for (const item of filteredData) {
            if(!map.has(item["employee id"])){
                map.set(item["employee id"], true);    // set any value to Map
                var tempItem = item
                var contracts = []
                filteredData.map(entry => (entry["employee id"] === item["employee id"]) ? contracts.push("Contract ID: " + entry["contract id"] + ", Contract Name: " + entry["contract name"]) : console.log("next"))
                tempItem["contracts"] = contracts
                result.push(tempItem);
            }
        }
        // console.log("resultData is, ", result)
        // console.log("filteredData is, ", filteredData)
        this.setState({ resultData : result})
        return result
    }

    query(contractId, contractName) {
        var data = this.state.data
        var entry = data.filter(entry => entry["contract id"] === contractId && entry["contract name"] === contractName) 
        
        if (entry.length !== 0) {
            // console.log("entry is, ", entry[0])
            return entry[0]
        } else {
            return null
        }
    }

    async componentDidMount() {
        await this.getData()
        .then(() => this.transformData2())
        .then(() => this.syncTable())
        this.setState({isLoading: false})
        
    }

    componentWillUnmount() {
        $('#example')
        .find('table')
        .DataTable()
        .destroy(true);

        this.setState({isLoading: true})
    }

    freeData() {
        // console.log(this.state.freeData)
        return this.state.freeData
    }

    

    syncTable() {
        // console.log('syncTable is working')
        // $(document).ready(function() {
            var table = $('#example').DataTable(
                {
                    paging : true,
                    // data : this.state.filteredData,
                    data: this.state.resultData,
                    // data: this.state.uniqueData,
                    info : true,
                    searching : true,
                    ordering : true,
                    order : [[0, "asc"]],
                    
                    bDestroy: true,
                    columns : [
                        { "mData": "employee id", "sTitle": "Employee ID", "visible": true, "bSearchable": true},
                        { "mData": "first name", "sTitle": "First", "sWidth": "5%"},
                        { "mData": "last name", "sTitle": "Last"},
                        { "mData": "email","sTitle": "Work" },
                        { "mData": null, "sTitle": "Personal"},
                        { "mData": "phone","sTitle": "Work" },
                        { "mData": null, "sTitle": "Personal"},
                        { "mData": "start date","sTitle": "Start" },
                        { "mData": "end date","sTitle": "End" },
                        {                       
                            "mData": null,
                            "sTitle": "Contracts",
                            "bSortable": false,
                            "sType":'string', 
                            "bSearchable":false,
                            "bFilter": false,
                            // "autoWidth": true,     
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                <a>
                                    <select name="selectList" id={'selectList' + rowData['employee id']} style = {{width: "100px"}}>
                                        {/* {this.transformData(rowData["employee id"]).map(index => {
                                            
                                            return (
                                                <option> {index} </option>
                                            )
                                        })} */}
                                        {rowData["contracts"].map(index => {
                                            return (
                                                <option onClick = {() => {
                                                    var str =index.split(', ')
                                                    handletableclick(str[0], str[1], this.props)
                                                }}> {index} </option>
                                            )
                                        })}
                                    </select>
                                </a>
                            , nTd)
                        },
                        // {
                        //     "mData": null,
                        //     "bSortable": false,
                        //     "sTitle" : "",
                        //     "sType":'string', 
                        //     "bSearchable":false,
                        //     "bFilter": false,
                        //     "autoWidth": false,
                        //     fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                
                        //         <a
                        //             onClick={async () => {
                        //                 var e = document.getElementById('selectList' + rowData['employee id']).value;
                        //                 var str = e.split("Contract ID: ")[1].split(", Contract Name: ") 
                        //                 var newData = this.query(str[0], str[1])
                        //                 newData["employee id"] = null
                        //                 await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', newData, {
                        //                     headers : {
                        //                         "Content-Type": "application/json",
                        //                         "Accept": "application/json"
                        //                     }
                        //                 })
                        //                 .then(res => {
                        //                     console.log(res.data);
                        //                     alert('Contract removed from employee.');
                        //                 })
                        //                 .catch((err) => {
                        //                     console.log(err);
                        //                     alert('There was an error.');
                        //                 })
                                                                      
                        //                 // alert(newData["employee id"])
                        //             }}>
                        //             <button id = 'deleteButton'> Remove </button>
                        //         </a>
                        //     , nTd)
                        // },
                        {             
                                      
                            "mData": null,
                            "sTitle": "",
                            "bSortable": false,
                            "sType":'string', 
                            "bSearchable":false,
                            "bFilter": false,
                            "autoWidth": true,     
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                <div className="dropdown" style = {{textAlign:'center', width: '50px'}}>
                                    <button className="btn">
                                        <i className="fa fa-caret-down">Remove</i>
                                    </button>
                                    <div className="dropdown-content">
                                        {rowData["contracts"].map(index => {
                                            return (
                                                <a onClick = { async () => {
                                                    var str = index.split("Contract ID: ")[1].split(", Contract Name: ") 
                                                    var newData = this.query(str[0], str[1])
                                                    newData["employee id"] = null
                                                    await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', newData, {
                                                        headers : {
                                                            "Content-Type": "application/json",
                                                            "Accept": "application/json"
                                                        }
                                                    })
                                                    .then(res => {
                                                        // console.log(res.data);
                                                        alert('Contract removed from employee.');
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                        alert('There was an error.');
                                                    })

                                                    window.location.reload(true);
                                                }}>
                                                 {index} </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            , nTd)
                        },
                        {
                            
                            "mData": null,
                            "bSortable": false,
                            "sTitle" : "",
                            "sType":'string',
                            "bSearchable":false,
                            "bFilter": false,
                            "autoWidth": true,
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                
                                <div className="dropdown" style = {{textAlign: 'left', width: '140px'}}>
                                    <button className="btn">
                                        <i className="fa fa-caret-down">Add</i>
                                    </button>
                                    <div className="dropdown-content">
                                        {this.freeData().map(index => {
                                            return (
                                                <a onClick = { async () => {
                                                    var newData = this.query(index["contract id"], index["contract name"])
                                                    newData["employee id"] = rowData["employee id"]
                                                    await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', newData, {
                                                        headers : {
                                                            "Content-Type": "application/json",
                                                            "Accept": "application/json"
                                                        }
                                                    })
                                                    .then(res => {
                                                        // console.log(res.data);
                                                        alert('Contract added to employee.');
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                        alert('There was an error.');
                                                    })

                                                    window.location.reload(true);
                                                }}>
                                                    Contract ID: { index["contract id"]}
                                                    , Contract Name: { index["contract name"]}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            , nTd)
                        },
                    ]
                }

                
            )
            // $(function() {
            //     $('select').selectize({
            //     sortField: 'text'
            // })});
            // $('#example tbody').on( 'click', '#deleteButton', function () {
                // var e = document.getElementById("selectList").value;
                // alert(e)
            // })
        // })
    }
    


    
    render() {

        // if (this.state.isLoading) {
        //     return(
        //         <div>
        //             Loading...
        //         </div>
        //     )
        // }
        return (
            <div>
                {/* <div>
                    <button onClick = {(bind) => this.debugger(bind)}> Debugging </button>
                </div> */}
                <div>
                    {/* <button className = 'btn' style = {{backgroundColor : '#dddddd'}} onClick = {(bind) => alert('yes')}>debug</button> */}
                    
                </div>
                <table id = "example" className="display" style = {{justifyContent : "space-between"}}>
                    <thead>
                        <tr>
                            <th rowSpan = "2"   colSpan = "1" align = "left" >  Employee ID (debugging) </th>
                            <th rowSpan = "1"   colSpan = "2" align = "left" >  Name </th>
                            <th rowSpan = "1"   colSpan = "2" align = "left" >  Email </th>
                            <th rowSpan = "1"   colSpan = "2" align = "left" >  Phone </th>
                            <th rowSpan = "2"                 align = "left" >  Start Date </th>
                            <th rowSpan = "2"                 align = "left" >  End Date </th>
                            <th rowSpan = "2"   colSpan = "1" align = "left" >  Contract Details </th>
                            <th rowSpan = "2"   colSpan = "1" align = "left" >   </th>
                            <th rowSpan = "2"   colSpan = "1" align = "left" >   </th>
                            <th rowSpan = "2"   colSpan = "1" align = "left" >   </th>
                            {/* <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th>
                            <th> placeholder </th> */}
                            
                        </tr>
                        <tr>
                            <th> First </th>
                            <th> Last  </th>
                            <th> Work </th>
                            <th> Personal </th>
                            <th> Work </th>
                            <th> Cell </th>
                        </tr>
                    </thead>
                    <tbody>
					{this.state.filteredData.map(index => {
						// console.log("indexxx is ",  typeof index["contract id"])
						return (
                            // index["contract id"] + "---" + index["contract name"]
							<tr key = {index["employee id"]}>
                                <td>{index["employee id"]}</td>
								<td>{index["first name"]}</td>
								<td>{index["last name"]}</td>
                                
								<td>{index["email"]}</td>
                                <td> </td>
                                
								<td>{index["phone"]}</td>
                                <td> </td>

								<td>{index["start date"]}</td>
								<td>{index["end date"]}</td>

                                {/* Contract Details */}
                                <td > cell </td>
                                {/* Add Contract to employee */}
                                <td > cell </td>
                                <td > cell </td>
							</tr>
						)
					})}
                    </tbody>
			
                </table>
            </div>
        )
    }
}

export default withRouter(EmployeeTab)