import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Home extends React.Component {

  render() {
    return <div>
      <div><Link to="mobile">Mobile Web App</Link></div>
      <div><Link to="map">Management Console</Link></div>
    </div>;
  }
}
