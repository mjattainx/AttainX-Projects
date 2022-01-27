import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Auth } from 'aws-amplify';
import {v4 as uuid} from "uuid";

const ManageUsers = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            await axios.get("https://ablmlt1a3a.execute-api.us-east-1.amazonaws.com/dev", {
                headers : {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                }
              })
              .then( res => {
                const converted = []
                res.data.map(group => { return( group.map(entry2 => converted.push(entry2)) )})
                // setData(res.data)
                setData(converted)
                setLoading(false)
              })
              .catch((err) => {
                console.log(err);
              })
        }
        fetchData()
    }, [])

    const createUser = async () => {
        const user = await Auth.currentAuthenticatedUser() // get user authentication
        const idToken = user.signInUserSession.idToken.getJwtToken();  // get session token

        console.log(user)
        console.log(idToken)

        // return(idToken)
      

    }

    return (
        <div>
            <button onClick = {() => createUser()}>create user</button>
            <button onClick = {() => {console.log(data)}}> users </button>
            <table>
                <thead>
                    <tr>
                        <td>Username</td>
                        <td>Role</td>
                        <td>Enabled</td>
                        <td>Email</td>
                        <td>Email Verified</td>
                        <td>Status</td>
                        <td>User Created Date</td>
                        <td>User Last Modified Date</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(entry => {
                        return(
                        <tr>
                            <td>{entry.user.Username} </td>
                            <td>{entry.role}</td>
                            <td>{entry.user.Enabled.toString()}</td>
                            <td>{entry.user.Attributes[2].Value}</td>
                            <td>{entry.user.Attributes[1].Value}</td>

                            <td>{entry.user.UserStatus}</td>
                            <td>{entry.user.UserCreateDate}</td>
                            <td>{entry.user.UserLastModifiedDate}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ManageUsers
