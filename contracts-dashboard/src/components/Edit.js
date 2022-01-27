import React from 'react'
import axios from 'axios'
import { withRouter, useHistory } from 'react-router-dom'

function Edit(props) {
    const history = useHistory();

    var str = props.match.params.id
    str = str.split("=", 2)[1]
    str = str.split("zzzzzzzz", 12)
    console.log("11 is ", str[11])
    // return(
    //     <div>
    //         <p>Contract ID: {str[0]}</p>
    //         <p>Contract Name: {str[1]}</p>
    //         <p>Start Date: {str[2]}</p>
    //         <p>End Date: {str[3]}</p>
    //         <p>Title: {str[4]}</p>
    //         <p>First Name: {str[5]}</p>
    //         <p>Last Name: {str[6]}</p>
    //         <p>Email: {str[7]}</p>
    //         <p>Phone: {str[8]}</p>
    //         <p>Office: {str[9]}</p>
    //         <p>Address: {str[10]}</p>
            
    //     </div>
    // )
    const renderSubmit = async () => {
        let id1 = document.getElementById('id1')
        let id2 = document.getElementById('id2')
        let id3 = document.getElementById('id3')
        let id4 = document.getElementById('id4')
        let id5 = document.getElementById('id5')
        let id6 = document.getElementById('id6')
        let id7 = document.getElementById('id7')
        let id8 = document.getElementById('id8')
        let id9 = document.getElementById('id9')
        let id10 = document.getElementById('id10')
        let id11 = document.getElementById('id11')
        const newData = {
            "contract id" : id1.value,
            "contract name" : id2.value,
            "start date" : id3.value,
            "end date" : id4.value,
            "title" : id5.value,
            "first name" : id6.value,
            "last name" : id7.value,
            "email" : id8.value,
            "phone" : id9.value,
            "office" : id10.value,
            "address" : id11.value,
            "employee id": str[11]
        }

        await axios.delete('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
            { data : {
                "contract id" : id1.value,
                "contract name" : id2.value
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
        await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', newData, {

            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => {
            console.log(res.data);
            alert('Edited contract.');
        })
        .catch((err) => {
            console.log(err);
            alert('There was an error.');
        })
        // window.location.reload(true)

        history.push("/");
    }


    return (
        <div className = "content-table" style = {{maxWidth : "500px"}}>
            <div className="ui form success">
                <h4 className="ui dividing header">Contract Headers</h4>
                <div className="two fields">
                    <div className="field">
                        <label>Contract ID</label>
                        <input type="text" defaultValue = {str[0]} placeholder="Required" id = 'id1' readOnly = "readonly" style = {{backgroundColor : '#ebebeb'}}/>
                    </div>
                    <div className="field">
                        <label>Contract Name</label>
                        <input type="text" defaultValue = {str[1]} placeholder="Required" id = 'id2' readOnly = "readonly" style = {{backgroundColor : '#ebebeb'}}/>
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Start Date</label>
                        <input type="text" defaultValue = {str[2]} placeholder="Required" id = 'id3' />
                    </div>
                    <div className="field">
                        <label>End Date</label>
                        <input type="text" defaultValue = {str[3]} id = 'id4' />
                    </div>
                </div>
                <h4 className="ui dividing header">POC Information</h4>
                <div className="three fields">
                    <div className="field">
                        <label>Title</label>
                        <input type="text" defaultValue = {str[4]} placeholder="Required" id = 'id5'/>
                    </div>
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" defaultValue = {str[5]} placeholder="Required" id = 'id6'/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" defaultValue = {str[6]} placeholder="Required" id = 'id7'/>
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Email</label>
                        <input type="text" defaultValue = {str[7]} placeholder="Required" id = 'id8'/>
                    </div>
                    <div className="field">
                        <label>Phone</label>
                        <input type="text" defaultValue = {str[8]} placeholder="Required" id = 'id9'/>
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Office</label>
                        <input type="text" defaultValue = {str[9]} id = 'id10'/>
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input type="text" defaultValue = {str[10]} id = 'id11'/>
                    </div>
                </div>
                <h4 className="ui dividing header"></h4>
                
                {/* {messageState && showMessage()} */}
                {/* <button className="ui submit button" type="submit" onClick = {(document.getElementById('input_id')) => showMessage}>Submit</button> */}
                <button className="ui submit button" type="submit" onClick = {renderSubmit}>Submit</button>
                <a href="/"><button className="ui cancel button" type="button">Cancel</button></a>
            </div>
        </div>
    )
    
}

export default withRouter(Edit)
