import React from 'react'
import { Tab } from 'semantic-ui-react'
import SkillsTable from './SkillsTable'
import SkillsTableEdit from './SkillsTableEdit'


const panes = [
	{ menuItem: 'View', render: () => 
		<Tab.Pane attached='top'>
			<div style = {{marginTop: '27px'}}>
				<SkillsTable/>
			</div>
		</Tab.Pane> },
	{ menuItem: 'Edit', render: () => 
		<Tab.Pane attached='top'>
			<div style = {{marginTop: '27px'}}>
				<SkillsTableEdit/>
			</div>
		</Tab.Pane> }
]

const SkillsTableTab = () => {
    return (
        <div style = {{marginTop: '10px', marginLeft: '-14px'}}>
            <Tab menu={{ attached: false }} panes={panes} />
        </div>
    )
}

export default SkillsTableTab
