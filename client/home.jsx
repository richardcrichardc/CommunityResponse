import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Home extends React.Component {

  render() {

    return <div>
      <h3>Welcome</h3>
      <p>Ipsum loerm ...</p>

      <Link to="register">What do you have or need?</Link>

    </div>;
  }
}
