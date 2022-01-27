import React from 'react'
import { Tab } from 'semantic-ui-react'
import CertsTable2 from './CertsTable2'
import CertsTable2Edit from './CertsTable2Edit'

const panes = [
	{ menuItem: 'View', render: () => 
		<Tab.Pane attached='top'>
            <div style = {{marginTop: '27px'}}>
    			<CertsTable2/>
            </div>
		</Tab.Pane> },
	{ menuItem: 'Edit', render: () => 
		<Tab.Pane attached='top'>
            <div style = {{marginTop: '27px'}}>
			    <CertsTable2Edit/>
            </div>
		</Tab.Pane> }
]

const ThirdTab = () => {
    return (
        <div style = {{marginTop: '10px', marginLeft: '-14px'}}>
            <Tab menu={{ attached: false }} panes={panes} />
        </div>
    )
}

export default ThirdTab
