import "./style.less";

import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { root, users, things } from './base';

var userId;

class App extends React.Component {

  constructor(props) {
    super(props);

    var userRef = users.child(userId);
    this.state = {user: null, userRef:userRef, things: {}};

    userRef.on("value", function(snapshot) {
      this.setState({'user': snapshot.val() || {}});
    }.bind(this));

    things.on("value", function(snapshot) {
      this.setState({'things': snapshot.val() || {}});
    }.bind(this));

  }

  handleLogout(event) {
    event.preventDefault();
    console.log('logout');
    root.unauth();
    this.context.router.transitionTo('mobile');
    setTimeout(() => {
      window.location.reload();
    }.bind(this), 500);
  }


  render() {
    var user = this.state.user;
    var userRef = this.state.userRef;
    var things = this.state.things;

    // wait until user is loaded until rendering
    if (user == null)
      return null;

    var logout = user.address_no ? <a href="#" onClick={this.handleLogout.bind(this)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a> : null;

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> {/*<img src="com_response.png"/>*/} Community Response
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>{logout}</li>
            </ul>
            
          </div>
        </nav>

        <div className="container">
          <div className="row content">
            <div className="col-md-12">
                <RouteHandler userId={userId} user={user} userRef={userRef} things={things}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

import Home from './home.jsx';
import Mobile from './mobile.jsx';
import Register from './register.jsx';
import Needs from './needs.jsx';
import Haves from './haves.jsx';
import Map from './map.jsx';

var routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="mobile" path="mobile" handler={Mobile}/>
    <Route name="register" path="register" handler={Register}/>
    <Route name="needs" path="needs" handler={Needs}/>
    <Route name="haves" path="haves" handler={Haves}/>
    <Route name="map" path="map" handler={Map}/>
  </Route>
);

function start() {
  Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
  });
}


// Log user in before displaying app
var authData = root.getAuth();

if (authData) {
  userId = authData.uid;
  start();
} else {
  root.authAnonymously((error, authData) => {
    if (error) {
      userId = null;
      console.log('auth failed');
    } else {
      userId = authData.uid;
     }
    start()
  });
}
