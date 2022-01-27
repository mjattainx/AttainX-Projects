import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import '../App.scss';
import FirstTab from './FirstTab';
// import SecondTab from './SecondTab';
import ThirdTab from './ThirdTab';
import JqueryTab from './JqueryTab';
// import EmployeeTable from './EmployeeTableObselete';
import UserTab from './UserTab';
// import AddEmployee from './AddEmployee';
// import EmployeeTable from './EmployeeTable';
// import EmployeeTab from './EmployeeTab'
import EditableContractTable from './EditableContractTable'
// import EditableEmployeeTable from './EditableEmployeeTable';
// import Debug from './Debug'
// import CertsTable from './CertsTable';
// import CertsTable2 from './kendo/CertsTable2'
// import CertsTable2Edit from './kendo/CertsTable2Edit'
// import CertsTable2Tab from './kendo/CertsTable2Tab'
// import CertsTable3 from './ag-grid/CertsTable3'
// import SkillsTableTab from './SkillsTableTab'
// import TeamQuestionnaire from './TeamQuestionnaire';
import TeamQuestionnairePM from './TeamQuestionnairePM';
import SkillsTableEdit from './SkillsTableEdit';
import CertsTable2Edit from './kendo/CertsTable2Edit';
import EmployeesTableNew from './EmployeesTableNew';
import ContractsTableNew from './ContractsTableNew';
import EmployeeTableNewTest from './EmployeeTableNewTest';
import ManageUsers from './ManageUsers';

// import { Auth } from 'aws-amplify';

const panesAdmin = [
	{ menuItem: 'Home (Admin)', render: () => 
		<Tab.Pane attached='top'>
			<FirstTab/>
		</Tab.Pane> },
	// { menuItem: 'Contract Table right click', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<SecondTab/>
	// 	</Tab.Pane> },
	// { menuItem: 'Employee Table', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '27px'}}>
	// 			<EmployeeTable/>
	// 		</div>
	// 	</Tab.Pane> },
	// { menuItem: 'Add Employee', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '27px'}}>
	// 			<AddEmployee/>
	// 		</div>
	// 	</Tab.Pane> },
	// { menuItem: 'Employee Table', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '27px'}}>
	// 			<EmployeeTab/>
	// 		</div>
	// 	</Tab.Pane> },
	// { menuItem: 'Contract Table', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '27px'}}>
	// 			{/* <JqueryTab/> */}
	// 			<ThirdTab/>
	// 		</div>
	// 	</Tab.Pane> },
	// { menuItem: 'Add Contract', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<ThirdTab />
	// 	</Tab.Pane> },
	{ menuItem: 'Contracts', render: () => 
		<Tab.Pane attached='top'>
			<div style = {{marginTop: '27px'}}>
				<ContractsTableNew />
			</div>
		</Tab.Pane> },
	// { menuItem: 'Contracts', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '30px'}}>
	// 			<EditableContractTable/>
	// 		</div>
	// 	</Tab.Pane> },
	// { menuItem: 'Employees', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '27px'}}>
	// 			<EmployeesTableNew />
	// 		</div>
	// 	</Tab.Pane> },
	{ menuItem: 'Employees', render: () => 
		<Tab.Pane attached='top'>
			<div style = {{marginTop: '27px'}}>
				<EmployeeTableNewTest />
			</div>
		</Tab.Pane> },
	// { menuItem: 'Certificates Table', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '30px'}}>
	// 			<CertsTable />
	// 		</div>
	// 	</Tab.Pane> },
	{ menuItem: 'Certifications', render: () => 
		<Tab.Pane attached='top'>
			<div style = {{marginTop: '27px'}}>
				<CertsTable2Edit />
			</div>
		</Tab.Pane> },

	// { menuItem: 'debug tab', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '30px'}}>
	// 			<Debug />
	// 		</div>
	// 	</Tab.Pane> },
	{ menuItem: 'Skills', render: () => 
	<Tab.Pane attached='top'>
		<div style = {{marginTop: '27px'}}>
			<SkillsTableEdit />
		</div>
	</Tab.Pane> },
	// { menuItem: 'Team Questionnaire User Form', render: () => 
	// <Tab.Pane attached='top'>
	// 	<div style = {{marginTop: '27px'}}>
	// 		<TeamQuestionnaire />
	// 	</div>
	// </Tab.Pane> },
	{ menuItem: 'Team Questionnaire', render: () => 
	<Tab.Pane attached='top'>
		<div style = {{marginTop: '27px'}}>
			<TeamQuestionnairePM />
		</div>
	</Tab.Pane> },
	{ menuItem: 'Manage Users', render: () => 
	<Tab.Pane attached='top'>
		<div style = {{marginTop: '27px'}}>
			<ManageUsers />
		</div>
	</Tab.Pane> },


]

const panesUser = (props) => { return [
	{ menuItem: 'Home (User)', render: () => 
	<Tab.Pane attached='top'>
		<UserTab props = {props}/>
	</Tab.Pane> },
	{ menuItem: 'Contract Table', render: () => 
		<Tab.Pane attached='top'>
			<div style = {{marginTop: '30px'}}>
				<JqueryTab/>
			</div>
		</Tab.Pane> },
	// { menuItem: 'Team Questionnaire', render: () => 
	// 	<Tab.Pane attached='top'>
	// 		<div style = {{marginTop: '30px'}}>
	// 			<TeamQuestionnaire/>
	// 		</div>
	// 	</Tab.Pane> },
]}

const Home = (props) => {
	// const debug = () => {
	// 	console.log(props.auth.authLevel)
	// }
	if (props.auth.authLevel === 'Admin') {
		return(
			
			<div>

				{/* <button onClick = {debug} > debug </button> */}
				{/* <button onClick = {getSession} > get cognito session</button> */}
				<Tab menu={{ attached: false }} panes={panesAdmin} />
			</div>
		)
	}

	if (props.auth.authLevel === 'User') {
		return(
			<div>
				<Tab menu={{ attached: false }} panes={panesUser(props)} />
			</div>
		)
	}

	

	return (
		<div>
			Loading...
		</div>
	)

} 

export default Home;
