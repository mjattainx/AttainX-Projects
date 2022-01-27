import React, { useState } from 'react'
import { Fade, Form, Modal } from 'react-bootstrap'
// import { Transition } from 'semantic-ui-react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import TeamQuestionnaireIcon from './TeamQuestionnaireIcon.png'
import './Modal.scss'
import axios from 'axios'
import {v4 as uuid} from "uuid";

const TeamQuestionnaire = (props) => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [open, setOpen] = useState(0);

    const renderSubmit = async () => {
        // await axios.post()
        
        const payload = {"create" : [{
            "entry": uuid(),
            "cognitoEmail" : props.props,
            "name" : document.getElementById("question1").value,
            "workEmail" : document.getElementById("question2").value,
            "personalEmail" : document.getElementById("question3").value,
            "workPhone" : document.getElementById("question4").value,
            "personalPhone" : document.getElementById("question5").value,
        }]
        }
        var empty = false;
        for (var key in payload) {
            if (payload[key] === "") {
                empty = true
            }
        }
        
        if (empty) { alert("Please enter all required fields.")}
        else { 
            setOpen(1)
            await axios.put('https://okz4vqf3tj.execute-api.us-east-1.amazonaws.com/dev', payload, {
                headers : {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                }
              })
              .then(res => {
                setOpen(!open)
                // alert('Changes have been submitted.')
              })
              .catch((err) => {
                // console.log(err);
                // alert('There was an error.');
              })
            }
            setOpen(2)
        // console.log(payload)
    }

    return (
        <div className = "modal" style = {{textAlign:'left'}}>
            {/* <button className = "ui button" variant="primary" onClick={() => {setOpen(true); handleShow()}}> This will popup when a user logs in for the first time and/or we don't have a submission recorded from the user. </button> */}
            
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered = {true}
                size = "lg" 
            >
                
                <Modal.Header className = "modalheader">          
                    <div>
                        <div className = "modalcontent">
                            <img src={TeamQuestionnaireIcon} alt="TeamQuestionnaireIcon" />
                            
                            {/* <Modal.Title>Team Questionnaire </Modal.Title> */}
                            <span className = "modaltitle">
                                    
                                &nbsp;&nbsp;&nbsp;&nbsp;Team Questionnaire
                            </span>
                            <br />
                            
                            <br />
                            We're collecting information that will help us manage our teams.
                            We recognize that some of this information may be a duplicate to what's been supplied before.
                            We're working to eliminate out of date or missing information. Thank you for your time and attention!
                        </div>
                    </div>
                </Modal.Header>
                {/* <SwitchTransition>
                    <CSSTransition
                    key={open}
                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                    classNames='fade'
                    > */}
                <div>

                <Modal.Body className = "modalform">
                {open == 0 ?
                <div>
                    * Required
                    <br/>
                    <br/>
                    <Form.Group className="mb-3">
                        <Form.Label>1. Name (Last, First) *</Form.Label>
                        <Form.Control type="text" placeholder = "Enter your answer" id = "question1"/>
                    </Form.Group>
                    <br />
                    <Form.Group  className="mb-3">
                        <Form.Label>2. Work Email *</Form.Label>
                        <Form.Control type="text" placeholder = "Enter your answer" id = "question2"/>
                    </Form.Group>
                    <br />
                    <Form.Group  className="mb-3">
                        <Form.Label>3. Personal Email *</Form.Label>
                        <Form.Control type="text" placeholder = "Enter your answer" id = "question3"/>
                    </Form.Group>
                    <br />
                    <Form.Group  className="mb-3">
                        <Form.Label>4. Work Phone *</Form.Label>
                        <Form.Control type="text" placeholder = "Enter your answer" id = "question4"/>
                    </Form.Group>
                    <br />
                    <Form.Group  className="mb-3">
                        <Form.Label>5. Personal Phone *</Form.Label>
                        <Form.Control type="text" placeholder = "Enter your answer" id = "question5"/>
                    </Form.Group>
                </div> :
                
                open == 1 ? <div className="ui segment">
                <div className="ui active inverted dimmer">
                  <div className="ui large text loader">Submitting</div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div> : 
                open == 2 ? <div style = {{textAlign: 'center'}}> <p>Thank you for submitting.</p> </div> : null
                }
                
                </Modal.Body>

                <Modal.Footer>
                    {open == 0 ? 
                    <div>
                        <button className = "ui button" variant="secondary" onClick={handleClose}> Later </button>
                        <button className = "ui button" variant="primary" onClick = {() => renderSubmit()}> Submit </button>
                    </div> :
                    open == 2 ?
                    <button className = "ui button" onClick = {() => {setShow(!show)}}>Close </button>
                    : null
                    }
                </Modal.Footer> 
                </div>
                {/* </CSSTransition>
                </SwitchTransition> */}
            </Modal>
        </div>
    )
}

export default TeamQuestionnaire
