import '../App.scss'
import React, {Component} from 'react'
import axios from 'axios'

import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom'
import { BrowserRouter as  Link, withRouter } from 'react-router-dom'
import { Dropdown } from 'react-dropdown';
import 'react-dropdown/style.css';
import Modal from "./Modal";


const $ = require('jquery')
$.DataTable = require('datatables.net')

function handletableclick(id, name, props) {
    props.history.push("/details=" +
        id + "zzzzzzzz" + name
    )
}

class EmployeeTable extends Component {
    state = {
        data : [],
        filteredData : [],
        freeData : [],

        debugData : [],
             

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
                // filteredData : res.data.filter(contract =>
                //     contract["employee id"]),
                // freeData : res.data.filter(contract =>
                //     contract["employee id"] === undefined ||
                //     contract["employee id"] === null ||
                //     contract["employee id"] === "")
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
    // transformData2() {
    //     var filteredData = this.state.filteredData
    //     // console.log(filteredData)

    //     const result = [];
    //     const map = new Map();
    //     for (const item of filteredData) {
    //         if(!map.has(item["employee id"])){
    //             map.set(item["employee id"], true);    // set any value to Map
    //             var tempItem = item
    //             var contracts = []
    //             filteredData.map(entry => (entry["employee id"] === item["employee id"]) ? contracts.push("Contract ID: " + entry["contract id"] + ", Contract Name: " + entry["contract name"]) : console.log("next"))
    //             tempItem["contracts"] = contracts
    //             result.push(tempItem);
    //         }
    //     }
    //     // console.log("resultData is, ", result)
    //     // console.log("filteredData is, ", filteredData)
    //     this.setState({ resultData : result})
    //     return result
    // }

    debugTransform() {
        var data = this.state.data
        var emp_data = []

        // expand
        data.map(contract => contract["employee id"].map(employee_info => {
            let id = employee_info["emp id"]            
            if (id !== undefined && id !== "") {
                emp_data.push({
                    "emp id" : id,
                    "contract name" : contract["contract name"],
                    "contract id" : contract["contract id"],
                    "emp work email" : employee_info["emp work email"],
                    "emp work phone" : employee_info["emp work phone"],
                    "emp personal phone" : employee_info["emp personal phone"],
                    "emp personal email" : employee_info["emp work phone"],
                    "emp start date" : employee_info["emp start date"],
                    "emp end date" : employee_info["emp end date"],
                    "emp first name" : employee_info["emp first name"],
                    "emp last name" : employee_info["emp last name"],
                })
            }
        }))

        console.log("emp data is", emp_data)


        // collapse
        var uniqueEmployeeIds = emp_data.map( (value) => value["emp id"]).filter( (value, index, _arr) => _arr.indexOf(value) == index);
        // console.log(uniqueEmployeeIds)
        var res = []
        for (var id in uniqueEmployeeIds) {
            // console.log(emp_data[entry])
            var temp = emp_data.filter(entry => entry["emp id"] === uniqueEmployeeIds[id])
            // console.log("temp is ", temp)

            var emp_info = []
            for (var i in temp) {
                emp_info.push({
                    "emp start date" : temp[i]["emp start date"],
                    "emp end date" : temp[i]["emp end date"],
                    "contract id" : temp[i]["contract id"],
                    "contract name" : temp[i]["contract name"],
                })
            }
            // console.log("emp_info is", emp_info)
            var temp2 = {
                "emp id" : uniqueEmployeeIds[id],
                "emp first name" : temp[0]["emp first name"],
                "emp last name" : temp[0]["emp last name"],
                "emp work email" : temp[0]["emp work email"],
                "emp work phone" : temp[0]["emp work phone"],
                "emp personal phone" : temp[0]["emp personal phone"],
                "emp personal email" : temp[0]["emp work phone"],
                // "email" : temp[0]["email"],
                // "phone" : temp[0]["phone"],
                emp_info
            }
            res.push(temp2)
            // res.push({"yes" : "no"})
            
        }
        console.log(res)
        this.setState({
            debugData : res
        })
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
        .then(() => this.debugTransform())
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
                    // data: this.state.resultData,
                    data: this.state.debugData,
                    info : true,
                    searching : true,
                    ordering : true,
                    order : [[0, "asc"]],
                    
                    bDestroy: true,
                    columns : [
                        { "mData": "emp id", "sTitle": "Employee ID", "visible": true, "bSearchable": true},
                        { "mData": "emp first name", "sTitle": "First", "sWidth": "5%"},
                        { "mData": "emp last name", "sTitle": "Last"},
                        { "mData": "emp work email","sTitle": "Work" },
                        { "mData": "emp personal email", "sTitle": "Personal"},
                        { "mData": "emp work phone","sTitle": "Work" },
                        { "mData": "emp personal phone", "sTitle": "Cell"},
                        {   "mData": null,
                            "sTitle": "Start",
                            "bSortable": false,
                            "sType":'string', 
                            "bSearchable":false,
                            "bFilter": false,
                            "sWidth" :"7%",
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                <a>
                                    <select name="selectList" key = {rowData["emp id"]} style = {{width: "100px"}}>
                                       
                                        {
                                            rowData["emp_info"].map(entry => 
                                                <option> {entry["emp start date"]} </option>)
                                        }
                                    </select>
                                </a>
                            , nTd)
                        },
                        {   "mData": null,
                            "sTitle": "End",
                            "bSortable": false,
                            "sType":'string', 
                            "bSearchable":false,
                            "bFilter": false,
                            "sWidth" :"7%",
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                <a>
                                    <select name="selectList" key = {rowData["emp id"]} style = {{width: "100px"}}>
                                        {
                                            rowData["emp_info"].map(entry => 
                                                <option> {entry["emp end date"]} </option>)
                                        }
                                    </select>
                                </a>
                            , nTd)
                         },
                        {                       
                            "mData": null,
                            "sTitle": "Contracts",
                            "bSortable": false,
                            "sType":'string', 
                            "bSearchable":false,
                            "bFilter": false,
                            "sWidth" :"7%",
                            // "autoWidth": true,     
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                <a>
                                    <select name="selectList" id={'selectList' + rowData['employee id']} style = {{width: "100px"}}>
                                        {
                                            rowData["emp_info"].map(entry => 
                                                <option> 
                                                    Contract ID: {entry["contract id"]}, Contract Name: {entry["contract name"]}  
                                                </option>
                                            )
                                        }
                                                
                                    </select>
                                </a>
                                // <a>
                                //     <select name="selectList" id={'selectList' + rowData['employee id']} style = {{width: "100px"}}>
                                //         {rowData["contracts"].map(index => {
                                //             return (
                                //                 <option onClick = {() => {
                                //                     var str =index.split(', ')
                                //                     handletableclick(str[0], str[1], this.props)
                                //                 }}> {index} </option>
                                //             )
                                //         })}
                                //     </select>
                                // </a>
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

                        //default
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
                                        <b className="fa fa-caret-down">Remove</b>
                                    </button>
                                    <div className="dropdown-content">
                                        {rowData["emp_info"].map(contract => {
                                            return (
                                                <a key = {contract["contract id"]} onClick = { async () => {
                                                    var newData = this.query(contract["contract id"], contract["contract name"])
                                                    newData["employee id"] = newData["employee id"].filter(employee => employee["emp id"] !== rowData["emp id"])

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
                                                 Contract ID: {contract["contract id"]}, Contract Name: {contract["contract name"]} </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            , nTd)
                        },

                        //default
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
                                        <b className="fa fa-caret-down">Add</b>
                                    </button>
                                    <div className="dropdown-content" style = {{minHeight : '100px'}}>
                                        {this.state.data.map(index => {

                                            // console.log("index passed, ", index)
                                            // console.log("index is", index["contract id"])
                                            // console.log(rowData["emp_info"][0]["contract id"])
                                            var current_contracts = rowData["emp_info"].map(key => key["contract id"])
                                            var newData = this.query(index["contract id"], index["contract name"])
                                            if (!current_contracts.includes(index["contract id"]))
                                                return (
                                                    <a>
                                                        <Modal centered rowData = {rowData} index = {index} newData = {newData} />
                                                        {/* Contract ID: { index["contract id"]}
                                                        , Contract Name: { index["contract name"]} */}
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
            <div style = {{marginTop : '35px'}}>
                <div>
                    {/* <button onClick = {() => {
                        console.log(this.state.debugData)
                    }}> Debugging </button> */}
                </div>
                <table id = "example" className="display" style = {{justifyContent : "space-between"}}>
                    <thead>
                        <tr>
                            <th rowSpan = "2"   colSpan = "1" align = "left" >   </th>
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

export default EmployeeTable
