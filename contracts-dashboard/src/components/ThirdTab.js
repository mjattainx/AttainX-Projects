import React from 'react'
import { Tab } from 'semantic-ui-react'
import JqueryTab from './JqueryTab'
import ThirdTabAdd from './ThirdTabAdd'


const panes = [
	{ menuItem: 'View', render: () => 
		<Tab.Pane attached='top'>
			<JqueryTab/>
		</Tab.Pane> },
	{ menuItem: 'Add', render: () => 
		<Tab.Pane attached='top'>
			<ThirdTabAdd/>
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
