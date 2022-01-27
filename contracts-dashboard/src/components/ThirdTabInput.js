import React from 'react'
import axios from 'axios'


const ThirdTabInput = () => {
    // // const [message, setMessage] = useState([])
    // const [messageState, setMessageState] = useState([false])

    const debug = () => {
        var start = document.getElementById('id3').valueAsDate
        var end = document.getElementById('id4').valueAsDate

        console.log(typeof start)
    }

    const renderSubmit = async () => {
        //e.preventDefault()
        // setMessage(input_id)
        // setMessageState(true)
        // showMessage()

        var start = document.getElementById('id3').valueAsDate
        var end = document.getElementById('id4').valueAsDate
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
        const newData = {
            "contract id" : document.getElementById('input_id').value,
            "contract name" : document.getElementById('id2').value,
            "start date" : start,
            "end date" : end,
            "title" : document.getElementById('id5').value,
            "first name" : document.getElementById('id6').value,
            "last name" : document.getElementById('id7').value,
            "email" : document.getElementById('id8').value,
            "phone" : document.getElementById('id9').value,
            "office" : document.getElementById('id10').value,
            "address" : document.getElementById('id11').value,
            "employee id" : []
        }
        // console.log(newData)
        // console.log("newData is ", newData)
        await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', newData, {
            // data : [{
            //     "contract id" : id.value,
            //     "contract name" : id2.value,
            //     "start date" : id3.value,
            //     "end date" : id4.value,
            //     "title" : id5.value,
            //     "first name" : id6.value,
            //     "last name" : id7.value,
            //     "email" : id8.value,
            //     "phone" : id9.value,
            //     "office" : id10.value,
            //     "address" : id11.value
            // }],
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => {
            // console.log(res.data);
            alert('Submitted contract.');
        })
        .catch((err) => {
            console.log(err);
            alert('There was an error.');
        })
        // window.location.reload(true)
    }

    // const showMessage = (id) => {
    //     //let id = document.getElementById('input_id')
    //     if (id !== null) {
    //         return (
    //             <div className="ui success message">
    //             <div className="header">Form Completed</div>
    //             <p>Contract ${id} has been submitted.</p>
    //             </div>
    //         )
    //     }
    // }

    return (
        <div style = {{marginTop: '50px', maxWidth: '700px', display: 'inline-block'}}>
            {/* <button onClick = {debug}> debug </button> */}
            <div className="ui form success">
                <h4 className="ui dividing header">Contract Headers</h4>
                <div className="two fields">
                    <div className="field">
                        <label>Contract ID</label>
                        <input type="text" placeholder="Required" id = 'input_id'/>
                    </div>
                    <div className="field">
                        <label>Contract Name</label>
                        <input type="text" placeholder="Required" id = 'id2' />
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Start Date</label>
                        <input type="date" placeholder="Required" id = 'id3' />
                    </div>
                    <div className="field">
                        <label>End Date</label>
                        <input type="date" id = 'id4' />
                    </div>
                </div>
                <h4 className="ui dividing header">POC Information</h4>
                <div className="three fields">
                    <div className="field">
                        <label>Title</label>
                        <input type="text" placeholder="Required" id = 'id5'/>
                    </div>
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" placeholder="Required" id = 'id6'/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" placeholder="Required" id = 'id7'/>
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Email</label>
                        <input type="text" placeholder="Required" id = 'id8'/>
                    </div>
                    <div className="field">
                        <label>Phone</label>
                        <input type="text" placeholder="Required" id = 'id9'/>
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Office</label>
                        <input type="text" id = 'id10'/>
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input type="text" id = 'id11'/>
                    </div>
                </div>
                <h4 className="ui dividing header"></h4>
                
                {/* {messageState && showMessage()} */}
                {/* <button className="ui submit button" type="submit" onClick = {(document.getElementById('input_id')) => showMessage}>Submit</button> */}
                <button className="ui submit button" type="submit" onClick = {renderSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ThirdTabInput
