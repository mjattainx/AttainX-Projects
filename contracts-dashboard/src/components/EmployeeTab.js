import React from 'react'
import EmployeeTable from './EmployeeTable'
import AddEmployee from './AddEmployee'
import { Tab } from 'semantic-ui-react'


const panes = [
	{ menuItem: 'View', render: () => 
		<Tab.Pane attached='top'>
			<EmployeeTable/>
		</Tab.Pane> },
	{ menuItem: 'Add', render: () => 
		<Tab.Pane attached='top'>
			<AddEmployee/>
		</Tab.Pane> }
]
const EmployeeTab = () => {
    return (
        <div style = {{marginTop: '10px', marginLeft: '-14px'}}>
            <Tab menu={{ attached: false }} panes={panes} />
        </div>
    )
}

export default EmployeeTab
