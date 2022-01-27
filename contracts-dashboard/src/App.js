import './App.scss';
import Home from './components/Home'
import Navbar from './components/Navbar'

import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify';

import { withAuthenticator, AmplifySignIn, AmplifyAuthenticator } from "@aws-amplify/ui-react"
import ContractDetails from './components/ContractDetails';

class App extends Component {
  
  state = {
    isAuthenticated : true,
    user : null,
    authLevel : null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated : authenticated})
  }

  setUser = user => {
    this.setState({ user: user})
  }

  setAuthLevel = authLevel => {
    this.setState({ authLevel : authLevel})
  }

  async componentDidMount() {
    try {
      this.setAuthStatus(true);
      // console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);

      // const session_info = await Auth.currentUserInfo()
      // console.log(session_info.attributes['custom:authorizationLevel'])
      // this.setAuthLevel(session_info.attributes['custom:authorizationLevel'])
      
      // const user = await Auth.currentAuthenticatedUser()
      this.setState({authLevel : user.signInUserSession.idToken.payload["cognito:groups"][0]})
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated : this.state.isAuthenticated,
      user: this.state.user,
      authLevel : this.state.authLevel,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
      setAuthLevel : this.setAuthLevel
    }

    return(
      <AmplifyAuthenticator>
        <AmplifySignIn slot="sign-in" hideSignUp>
        </AmplifySignIn>
        <Router>
          <div className = "content-table">
            <Navbar auth = {authProps} />
            {/* <button onClick = {() => console.log(this.state.user)}>test </button> */}
            <Switch>
              {/* <Route path = "/edit:id" component = {withRouter(Edit)}/> */}
              
              <Route exact path = "/" render = { (props) => <Home {...props} auth = {authProps}/>}/>
              {/* <Route exact path = "/login" render={(props) => <LogIn {...props} auth={authProps} />} /> */}
              {/* <Route exact path = "/details" render={(props) => <ContractDetails {...props} auth={authProps} />} /> */}
            </Switch>
            {/* <AmplifySignOut/> */}
          </div>
        </Router>
      </AmplifyAuthenticator>
    )
  }
}

// export default withAuthenticator(App);
export default App;
