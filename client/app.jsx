import "./style.less";

import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { root, users } from './base';

var userId;

class App extends React.Component {

  constructor(props) {
    super(props);

    var userRef = users.child(userId);
    this.state = {user: null, userRef:userRef};

    userRef.on("value", function(snapshot) {
      this.setState({'user': snapshot.val() || {}});
    }.bind(this));

  }

  render() {
    var user = this.state.user;
    var userRef = this.state.userRef;

    // wait until user is loaded until rendering
    if (user == null)
      return null;

    var username = user.name || 'stranger';
    var logout = user.name ? <a href="#">Logout</a> : null;

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Community Response (Don't Panic)
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
                <RouteHandler user={user} userRef={userRef}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import Home from './home.jsx';
import Register from './register.jsx';
import Map from './map.jsx';

var routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="register" path="register" handler={Register}/>
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
