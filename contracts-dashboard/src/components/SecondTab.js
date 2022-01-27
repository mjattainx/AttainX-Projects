import React, { useEffect, useState, useRef } from 'react'
import {Table } from 'semantic-ui-react';
import Menu from "../Menu"
import '../App.scss'
import axios from 'axios';


const SecondTab = () => {
    const outerRef = useRef(null);

	const [rows, setRows] = useState([]);

	//read
	useEffect(() => {
	axios.get('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
		{	headers : {
			"Content-Type": "application/json",
			"Accept": "application/json"}})
		.then(res => {
			console.log(res.data);
			setRows(res.data)
			})
	// console.log(this.el)
	// this.$el = $(this.el)
	// this.$el.DataTable(
	// 	{data : rows,
	// 	columns : [
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"},
	// 		{title : "Contract Name"}
			
	// 	]}
	// )
	}, [])

	
	return (
		<div>
			
		  <Menu outerRef={outerRef} />
		  <table ref={outerRef} className = "content-table" id = "current-table">
			{/* <thead >
			  <th align = "left" rowSpan = "3">Contract Name</th>
			  <th align = "left" rowSpan = "3">Start Date</th>
			  <th align = "left" rowSpan = "3">End Date</th>
			  <th align = "left" rowSpan = "7">Contract POC</th>
				
			</thead> */}

			<thead className = "content-table">
				<tr>
					<td align = "left" rowSpan = "3"> Contract Name </td>
					<td align = "left" rowSpan = "3"> Start Date </td>
					<td align = "left" rowSpan = "3"> End Date </td>
					<td align = "left" colSpan = "7" style = {{backgroundColor: "#cccccc"}}> Contract POC </td>
				</tr>
				<tr>
					<td rowSpan = "2"> Title </td>
					<td colSpan = {2}> Name </td>
					<td rowSpan = "2"> Email </td>
					<td rowSpan = "2"> Phone </td>
					<td colSpan = {2}> Location </td>
				</tr>
				<tr>
					<td> First Name </td>
					<td> Last Name </td>
					<td> Office </td>
					<td> Address </td>
				</tr>
			</thead>
			{/* <div className = "content-table"> */}
				<tbody ref={outerRef} className = "content-table" style={{height:'500px', overflow:'auto'}}>
					{rows.map(index => {
						console.log("indexxx is ",  typeof index["contract id"])
						return (
							<tr key = {index["contract id"]} id = {index["contract id"] + "---" + index["contract name"]}>
								<Table.Cell>{index["contract name"]}</Table.Cell>
								<Table.Cell>{index["start date"]}</Table.Cell>
								<Table.Cell>{index["end date"]}</Table.Cell>
								<Table.Cell>{index["title"]}</Table.Cell>
								<Table.Cell>{index["first name"]}</Table.Cell>
								<Table.Cell>{index["last name"]}</Table.Cell>
								<Table.Cell>{index["email"]}</Table.Cell>
								<Table.Cell>{index["phone"]}</Table.Cell>
								<Table.Cell>{index["office"]}</Table.Cell>
								<Table.Cell>{index["address"]}</Table.Cell>
								{/* <Table.Cell colSpan = {2} onClick = {() => destroy(index["contract id"], index["contract name"])}><Button> Delete </Button></Table.Cell> */}
							</tr>
						)
					})}
				</tbody>
			{/* </div> */}
		  </table>
		</div>
	);
}

export default SecondTab
