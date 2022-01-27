import React from 'react'
import {Tab} from 'semantic-ui-react'
import ThirdTabInput from './ThirdTabInput'
import ThirdTabJSON from './ThirdTabJSON'

const panes = [
	{ menuItem: 'Input', render: () => 
		<Tab.Pane attached='top'>
			<ThirdTabInput/>
		</Tab.Pane> },
	{ menuItem: 'JSON', render: () => 
		<Tab.Pane attached='top'>
			<ThirdTabJSON/>
		</Tab.Pane> }
]

const ThirdTabAdd = () => {
    return (
        <div style = {{marginTop: '25px', marginLeft: '-14px'}}>
            <Tab menu={{ attached: false }} panes={panes} />
        </div>
    )
}

export default ThirdTabAdd
