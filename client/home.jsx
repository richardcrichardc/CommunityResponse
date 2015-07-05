import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Home extends React.Component {

  render() {
    return <div>
    	<p className="map-user-table">Welcome to the demo 
    	of <a href="https://hackerspace.govhack.org/content/community-response">Community Response</a> a 
    	 mobile web app and management console, developed over 48hrs for <a href="https://www.govhack.org/">GovtHack 2015</a>.</p>

      <p><Link to="mobile" className="btn btn-primary">Mobile Web App</Link></p>
  	  <p><Link to="map" className="btn btn-primary">Management Console</Link></p>

    </div>;
  }
}
