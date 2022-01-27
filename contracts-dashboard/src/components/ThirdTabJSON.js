import React from 'react'
import axios from 'axios'

const ThirdTabJSON = () => {

    const renderSubmit = async () => {
        let newData = document.getElementById('jsontext')
        
        let jsondata = JSON.parse(newData.value)
        console.log(typeof jsondata)
        await axios.post('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev', jsondata, {
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => {
            console.log(res.data);
            alert('Submitted contract.')
        })
        .catch((err) => {
            console.log(err);
            alert('There was an error.')
        })
    }
    return (
        <div className="ui form">
            <div className="field">
                <label>Insert JSON Data</label>
                <textarea id = 'jsontext'></textarea>
            </div>

            <button className="ui submit button" type="submit" onClick = {renderSubmit}>Submit</button>
        </div>
    )
}

export default ThirdTabJSON
