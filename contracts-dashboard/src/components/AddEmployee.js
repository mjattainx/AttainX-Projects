import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'

class AddEmployee extends Component {
    state = {
        data : [],
        contracts : [],
        filteredData : [],
        freeData : [],

        selectedOption1 : [],
        selectedOption2 : []
    }

    async getData () {
        await axios.get('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
		{	headers : {
			"Content-Type": "application/json",
			"Accept": "application/json"}})
		.then(res => {
            this.setState({ 
                data : res.data,
                
                // filteredData : res.data.filter(contract =>
                //     contract["employee id"] !== undefined &&
                //     contract["employee id"] !== null &&
                //     contract["employee id"] !== ""),
                filteredData : res.data.filter(contract =>
                    contract["employee id"]),
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

    async componentDidMount() {
        await this.getData()
    }

    componentWillUnmount() {
        this.setState({
            contracts : []
        })
    }

    debug() {
        // console.log(this.state.contracts)
        console.log(this.state.selectedOption1, "...", this.state.selectedOption2)
    }

    query(contractId, contractName) {
        var data = this.state.data
        var entry = data.filter(entry => entry["contract id"] === contractId && entry["contract name"] === contractName) 
        if (entry.length !== 0) {
            return entry[0]
        } else {
            return null
        }
    }

    handleChange1 = (selectedOption1) => {
        let val = selectedOption1.target.value
        this.setState({
            selectedOption1 : val,
            contracts : this.state.data.filter(contract => (contract["employee id"] !== val)).map(contract => ({value : contract["contract id"], label : contract["contract name"]}))
        })
    }
    handleChange2 = (selectedOption2) => {
        this.setState({
            selectedOption2 : selectedOption2,
            // contracts : this.state.data.map(contract => (contract["contract id"] !== selectedOption["value"] ? ({value : contract["contract id"], label : contract["contract name"]}) : console.log(this.state.contracts)))
        })
        
    }

    

    async submitRender() {
        // console.log(document.getElementById('id1').value)
        // console.log(this.state.selectedOption2)
        let row = this.query(this.state.selectedOption2["value"], this.state.selectedOption2["label"])
        var start = document.getElementById('start date').valueAsDate
        var end = document.getElementById('end date').valueAsDate

        if (start !== null) {
            start = start.toISOString().slice(0,10)
            start = start.split('-')
            start = start[1] + '-' + start[2] + '-' + start[0] 
          }
        if (end !== null) {
            end = end.toISOString().slice(0,10)
            end = end.split('-')
            end = end[1] + '-' + end[2] + '-' + end[0] 
        }
        row["employee id"].push({
            "emp id" : document.getElementById('id').value,
            "emp start date" : start,
            "emp end date" : end,
            "emp first name" : document.getElementById('first name').value,
            "emp last name" : document.getElementById('last name').value,
            "emp work phone" : document.getElementById('work phone').value,
            "emp personal phone" : document.getElementById('cell phone').value,
            "emp work email" : document.getElementById('work email').value,
            "emp personal email" : document.getElementById('personal email').value,
        })
        // console.log(row)

        await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', row, {
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => {
            // console.log(res.data);
            alert('New employee added.');
        })
        .catch((err) => {
            console.log(err);
            alert('There was an error.');
        })

    }

    render() {
        const { selectedOption2 } = this.state;
        return (
            <div className = "content-table" style = {{maxWidth : "600px", display: 'inline-block'}}>
                <div className="ui form success">
                    <h4 className="ui dividing header">Employee Credentials</h4>
                    <div className="three fields">
                        <div className="field">
                            <label>Employee ID</label>
                            <input type="text" placeholder="Required" id = 'id' onChange = {this.handleChange1}/>
                        </div>
                        <div className="field">
                            <label>First Name</label>
                            <input type="text" placeholder="Required" id = 'first name'/>
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Required" id = 'last name'/>
                        </div>
                        {/* <button onClick = {(bind) => this.debug(bind)}> debug </button> */}
                        
                    </div>
                    <h4 className="ui dividing header">Contract Information</h4>
                    <div className = "three fields">
                        <div className="field">
                            <label>Contract Name</label>
                            <Select 
                                type = "text"
                                options = {this.state.contracts}
                                value = {selectedOption2}
                                onChange = {this.handleChange2}
                                defaultInputValue = "Required"
                            />
                        </div>
                        <div className = "field">
                            <label>Start Date</label>
                            <input type = "date" id = "start date"></input>
                        </div>
                        <div className = "field">
                            <label>End Date</label>
                            <input type = "date" id = "end date"></input>
                        </div>
                    </div>
                    <h4 className="ui dividing header">Phone</h4>
                    <div className = "two fields">
                        <div className = "field">
                            <label>Work</label>
                            <input type = "text" id = "work phone"></input>
                        </div>
                        <div className = "field">
                            <label>Cell</label>
                            <input type = "text" id = "cell phone"></input>
                        </div>
                    </div>
                    <h4 className="ui dividing header">Email</h4>
                    <div className = "two fields">
                        <div className = "field">
                            <label>Work</label>
                            <input type = "text" id = "work email"></input>
                        </div>
                        <div className = "field">
                            <label>Personal</label>
                            <input type = "text" id = "personal email"></input>
                        </div>
                    </div>

                    <button className="ui submit button" type="submit" onClick = {() => this.submitRender()}>Submit</button>
                </div>
            </div>
        )
    }
}

export default AddEmployee
