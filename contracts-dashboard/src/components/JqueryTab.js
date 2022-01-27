import '../App.scss'
import React, {Component} from 'react'
import axios from 'axios'

import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom'
import { BrowserRouter as  Link, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify';


const $ = require('jquery')
$.DataTable = require('datatables.net')


function handleEdit(row, props) {
    props.history.push("/edit=" +
        row["contract id"] + "zzzzzzzz" +
        row["contract name"] + "zzzzzzzz" +
        row["start date"] + "zzzzzzzz" +
        row["end date"] + "zzzzzzzz" +
        row["title"] + "zzzzzzzz" +
        row["first name"] + "zzzzzzzz" +
        row["last name"] + "zzzzzzzz" +
        row["email"] + "zzzzzzzz" +
        row["phone"] + "zzzzzzzz" +
        row["office"] + "zzzzzzzz" +
        row["address"] + "zzzzzzzz" +
        row["employee id"]
    )
}

async function handleDelete(rowData) {
    await axios.delete('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
    { data : {
        "contract id" : rowData["contract id"],
        "contract name" : rowData["contract name"]
        },
        headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
        }
    })
    .then(res => {
        console.log(res.data);
    })
    .catch((err) => {
            console.log(err);
    })
}
class JqueryTab extends Component {
    state = {
        data : [],
        isLoading: true,
        authLevel : ""
    }

    async getData () {
        await axios.get('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
		{	headers : {
			"Content-Type": "application/json",
			"Accept": "application/json"}})
		.then(res => {
			// console.log(res.data);
            this.setState({data : res.data})
		})
        .catch((err) => {
            console.log(err);
		})
    }
    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser()
		this.setState({authLevel : user.signInUserSession.accessToken.payload["cognito:groups"][0]})

        this.getData().then(() => this.syncTable())
        this.setState({isLoading: false})
    }

    componentWillUnmount() {
        $('#example')
        .find('table')
        .DataTable()
        .destroy(true);

        this.setState({isLoading: true})
    }
    

    syncTable() {
        // $(document).ready(function() {
        if (this.state.authLevel === 'Admin') {
    
            var table = $('#example_Admin').DataTable(
                {
                    paging : true,
                    data: this.state.data,
                    info : true,
                    searching : true,
                    ordering : true,
                    scrollCollapse : true,
                    scroller : true,
                    scrolly : '100px',
                    order : [[1, "asc"]],
                    columns : [
                        { "mData": "contract id", "sTitle": "Contract ID", "visible": false, "bSearchable": false},
                        { "mData": "contract name", "sTitle": "Contract Name" , "sWidth": "20%"},
                        { "mData": "start date", "sTitle": "Start Date", "sWidth": "20%" },
                        { "mData": "end date","sTitle": "End Date", "sWidth": "20%"  },
                        { "mData": "title","sTitle": "Title"  , "sWidth": "20%"},
                        { "mData": "first name","sTitle": "First" , "sWidth": "20%" },
                        { "mData": "last name","sTitle": "Last" , "sWidth": "20%" },
                        { "mData": "email","sTitle": "Email" , "sWidth": "20%" },
                        { "mData": "phone","sTitle": "Phone" , "sWidth": "20%" },
                        { "mData": "office","sTitle": "Office" , "sWidth": "20%" },
                        { "mData": "address","sTitle": "Address" , "sWidth": "20%" },
                        {
                            "mData": null,
                            "bSortable": false,
                            "sTitle" : "",
                            "sType":'string', 
                            "bSearchable":false,
                            "bFilter": false,
                            "autoWidth": false,
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                <a
                                    // onClick={() => handleEdit(rowData["contract id"], rowData["contract name"], this.props)}>
                                    onClick={() => handleEdit(rowData, this.props)}>
                                    <button className="ui button" id = 'editButton' > <b> Edit </b> </button>
                                </a>
                            , nTd)
                        },
                        {
                            "mData": null,
                            "bSortable": false,
                            "sTitle" : "",
                            "sType":'string', 
                            "bSearchable":false,
                            "bFilter": false,
                            "autoWidth": false,
                            fnCreatedCell: (nTd, rowData) => ReactDOM.render(
                                <a
                                    onClick={() => {
                                        handleDelete(rowData)
                                        alert("Contract " + rowData["contract name"] + " has been deleted.")
                                    }}>
                                    <button className="ui button" id = 'deleteButton'> <b> Delete </b> </button>
                                </a>
                            , nTd)
                        }
                    ]
                }
            )
            // $('#example tbody').on( 'click', '#deleteButton', function () {
            //     var data = table.row( $(this).parents('tr') ).data();
            //     const destroy = async (jqueryInput) => {                
            //             let str = jqueryInput.split("zzzzzzzzzzzzzzzzzzzzzzzzz")
            //             let contractId = str[0]
            //             let contractName = str[1]
            //             await axios.delete('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
            //             { data : {
            //                 "contract id" : contractId,
            //                 "contract name" : contractName
            //                 },
            //                 headers : {
            //                 "Content-Type": "application/json",
            //                 "Accept": "application/json"
            //                 }
            //             })
            //             .then(res => {
            //                 console.log(res.data);
            //             })
            //             .catch((err) => {
            //                     console.log(err);
            //             })
            //     }
            //     let str = data["contract id"] + 'zzzzzzzzzzzzzzzzzzzzzzzzz' + data["contract name"]
            //     destroy(str)
            //     alert("Contract " + data["contract name"] + " has been deleted.")

            // } );
        }

        if (this.state.authLevel === 'User') {
            var table = $('#example_User').DataTable(
                {
                    paging : true,
                    data: this.state.data,
                    info : true,
                    searching : true,
                    ordering : true,
                    scrollCollapse : true,
                    scroller : true,
                    scrolly : '100px',
                    order : [[1, "asc"]],
                    columns : [
                        { "mData": "contract id", "sTitle": "Contract ID", "visible": false, "bSearchable": false},
                        { "mData": "contract name", "sTitle": "Contract Name" , "sWidth": "20%"},
                        { "mData": "start date", "sTitle": "Start Date", "sWidth": "20%" },
                        { "mData": "end date","sTitle": "End Date", "sWidth": "20%"  },
                        { "mData": "title","sTitle": "Title"  , "sWidth": "20%"},
                        { "mData": "first name","sTitle": "First" , "sWidth": "20%" },
                        { "mData": "last name","sTitle": "Last" , "sWidth": "20%" },
                        { "mData": "email","sTitle": "Email" , "sWidth": "20%" },
                        { "mData": "phone","sTitle": "Phone" , "sWidth": "20%" },
                        { "mData": "office","sTitle": "Office" , "sWidth": "20%" },
                        { "mData": "address","sTitle": "Address" , "sWidth": "20%" },
                    ]
                }
            )
        } 
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    render() {
        if (this.state.authLevel === 'Admin') {
            return (
                <div style = {{marginTop : "35px"}}>
                    {/* <Menu /> */}
                    <table id = "example_Admin" className="display">
                        <thead>
                            <tr>
                                <th rowSpan = "2" align = "left" >  Contract ID </th>
                                <th rowSpan = "2" align = "left" >  Contract Name </th>
                                <th rowSpan = "2" align = "left" >  Start Date </th>
                                <th rowSpan = "2" align = "left" >  End Date </th>
                                {/* <th align = "left" colSpan = "7" style = {{backgroundColor: "#cccccc"}}> Contract POC </th> */}
                                <th rowSpan = "2">                  Title </th>
                                <th rowSpan = "1"   colSpan = "2">  Name </th>
                                <th rowSpan = "2">                  Email </th>
                                <th rowSpan = "2">                  Phone </th>
                                <th rowSpan = "1"   colSpan = "2">  Location </th>
                                <th rowSpan = "2"                >  Edit </th>
                                <th rowSpan = "2"                >  Delete </th>
                            </tr>
                            <tr>
                                <th> First </th>
                                <th> Last  </th>
                                <th> Office </th>
                                <th> Address </th>
                            </tr>
                        </thead>
                        <tbody style={{height:'100px', overflowY:'scroll'}}>
                        {this.state.data.map(index => {
                            return (
                                // index["contract id"] + "---" + index["contract name"]
                                <tr key = {index["contract id"]}>
                                    <td>{index["contract id"]}</td>
                                    <td>{index["contract name"]}</td>
                                    <td>{index["start date"]}</td>
                                    <td>{index["end date"]}</td>
                                    <td>{index["title"]}</td>
                                    <td>{index["first name"]}</td>
                                    <td>{index["last name"]}</td>
                                    <td>{index["email"]}</td>
                                    <td>{index["phone"]}</td>
                                    <td>{index["office"]}</td>
                                    <td>{index["address"]}</td>
                                    <td> cell </td>
                                    <td> cell </td>
                                </tr>
                            )
                        })}
                        </tbody>
                
                    </table>
                </div>
            )
        }

        if (this.state.authLevel === 'User') {
            return (
                <div>
                    {/* <Menu /> */}
                    <table id = "example_User" className="display">
                        <thead>
                            <tr>
                                <th rowSpan = "2" align = "left" >  Contract ID </th>
                                <th rowSpan = "2" align = "left" >  Contract Name </th>
                                <th rowSpan = "2" align = "left" >  Start Date </th>
                                <th rowSpan = "2" align = "left" >  End Date </th>
                                {/* <th align = "left" colSpan = "7" style = {{backgroundColor: "#cccccc"}}> Contract POC </th> */}
                                <th rowSpan = "2">                  Title </th>
                                <th rowSpan = "1"   colSpan = "2">  Name </th>
                                <th rowSpan = "2">                  Email </th>
                                <th rowSpan = "2">                  Phone </th>
                                <th rowSpan = "1"   colSpan = "2">  Location </th>
                            </tr>
                            <tr>
                                <th> First </th>
                                <th> Last  </th>
                                <th> Office </th>
                                <th> Address </th>
                            </tr>
                        </thead>
                        <tbody style={{height:'100px', overflowY:'scroll'}}>
                        {this.state.data.map(index => {
                            return (
                                // index["contract id"] + "---" + index["contract name"]
                                <tr key = {index["contract id"]}>
                                    <td>{index["contract id"]}</td>
                                    <td>{index["contract name"]}</td>
                                    <td>{index["start date"]}</td>
                                    <td>{index["end date"]}</td>
                                    <td>{index["title"]}</td>
                                    <td>{index["first name"]}</td>
                                    <td>{index["last name"]}</td>
                                    <td>{index["email"]}</td>
                                    <td>{index["phone"]}</td>
                                    <td>{index["office"]}</td>
                                    <td>{index["address"]}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                
                    </table>
                </div>
            )
        }
    return (
        <div>
            Loading . . .
            {/* {this.state.authLevel} */}
        </div>
    )
    }
}

export default withRouter(JqueryTab)