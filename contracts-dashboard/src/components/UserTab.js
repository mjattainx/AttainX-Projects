import React, { useState, useEffect } from 'react'
import TeamQuestionnaire from './TeamQuestionnaire'
import axios from 'axios'

const UserTab = (props) => {
    const [data, setData] = useState([])
    const [filled, setFilled] = useState(true)
    useEffect(async () => {
        await axios.get('https://okz4vqf3tj.execute-api.us-east-1.amazonaws.com/dev', {
          headers : {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
          }
        })
        .then( res => {
          setData(res.data)

          const data = res.data
          const emails = []
          data.map(entry => emails.push(entry.cognitoEmail))
        //   console.log(emails)
          if (!emails.includes(props.props.auth.user.attributes.email)) setFilled(false)
        })
        .catch((err) => {
          console.log(err);
        })
      }, [])

    return (
        <div style = {{marginTop: '30px'}}>
            <p> The authorization status of this account is User. </p>
            {/* <button onClick = {() => console.log(data)}>data</button> */}
            {!filled &&<TeamQuestionnaire props = {props.props.auth.user.attributes.email}/>}
        </div>
    )
}

export default UserTab
