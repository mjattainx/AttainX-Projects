import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
// import history from 'history';

import { AmplifySignOut } from '@aws-amplify/ui-react'
import '../App.scss'
import 'bootstrap/dist/css/bootstrap.css';
// import { useHistory } from 'react-router';


// const history = useHistory();

export default class Navbar extends Component {  
  
  handleLogOut = async event => {
    event.preventDefault();
    try {
      await Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      // history.push('/');
      // <Redirect push to='/'/>
    }catch(error) {
      console.log(error.message);
    }
  }

  
  render() {
    return (
      <nav className="navbar navbar-light" style={{backgroundColor: "#ffffff"}} role="navigation" aria-label="main navigation">

        <div id="navbarBasicExample" className="navbar-menu">
          {/* <div className="navbar-start">
            <a href="/" className="navbar-item">
              <button type="button" className="btn btn-secondary">Home</button>
            </a>
          </div> */}
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {this.props.auth.isAuthenticated && (
                  // <div>
                  //   <a href="/" onClick={this.handleLogOut} className="button is-light">
                  //     <button type="button" className="btn btn-danger">Log Out</button>
                  //   </a>
                  // </div>
                <AmplifySignOut />
                  // <Link to="/">
                  //   <button type = "button" className = "btn btn=danger" onClick = {this.handleLogOut}> Log Out</button>
                  // </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}