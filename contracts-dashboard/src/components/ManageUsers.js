import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Auth } from 'aws-amplify';
import {v4 as uuid} from "uuid";
import { Form, Modal } from 'react-bootstrap'

const ManageUsers = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [createmodal, setCreatemodal] = useState(false)
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        async function fetchData() {
            await axios.get("https://ablmlt1a3a.execute-api.us-east-1.amazonaws.com/dev", {
                headers : {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                }
              })
              .then( res => {
                console.log("data from lambda, ", res)
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
    if (loading) {
        return(
            <div>
                <button onClick = {() => setCreatemodal(!createmodal)}>create user</button>
                <Modal show = {createmodal}> yes </Modal>
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
                
                </tbody>
            </table>
            <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
          </div>
        )
    } else {
        return (
            <div>
                <button onClick = {() => setCreatemodal(!createmodal)}>create user</button>
                {/* <button onClick = {() => console.log('working')}>delete user</button> */}
                <button onClick = {() => createUser()}> log in data </button>
                <button onClick = {() => console.log(data)}>show data</button>
                <Modal show = {createmodal}>
                    <Modal.Header>
                        Create User
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                            </Form.Group> */}

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange = {(e) => setEmail(e.target.value)}/>
                                {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select aria-label="Default select example" onChange = {(e) => setRole(e)}>
                                    <option>-</option>
                                    <option value="Admin">Admin</option>
                                    <option value="HR">HR</option>
                                    <option value="ProgramManager">Program Manager</option>
                                    <option value="ProjectManager">Project Manager</option>
                                    <option value="User">User</option>
                                </Form.Select>
                            </Form.Group>
                            <button variant="primary" type="submit">
                                Submit
                            </button>
                            <button variant="secondary" onClick = {() => setCreatemodal(!createmodal)}>
                                Cancel
                            </button>
                        </Form>
                    </Modal.Body>
                </Modal>
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

                            var email = ''
                            var email_verified = ''
                            for (var i in entry.user.Attributes) {
                                if (entry.user.Attributes[i].Name === 'email') {
                                    email = entry.user.Attributes[i].Value
                                }
                                if (entry.user.Attributes[i].Name === 'email_verified') {
                                    email_verified = entry.user.Attributes[i].Value
                                }
                            }
                            
                            return(
                            <tr>
                                <td>{entry.user.Username} </td>
                                <td>{entry.role}</td>
                                <td>{entry.user.Enabled.toString()}</td>
                                <td>{email}</td>
                                <td>{email_verified}</td>

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
}

export default ManageUsers
