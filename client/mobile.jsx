import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { users } from './base';
import { geoDistance, friendlyDistance } from './misc';

export default class Mobile extends React.Component {

  componentWillMount() {
  	// Not yet registered
		if (!this.props.user.address_no) {
			this.context.router.transitionTo('register');
		}

		this.setState({'users': {}});

    users.on('value', function(snapshot) {
      this.setState({'users': snapshot.val()});
    }.bind(this));   

	}

  render() {

  	var userId = this.props.userId;
  	var user = this.props.user;
  	var users = this.state.users;
  	var others = [];

  	for (var otherId in users) {
  			// Don't list yourself
  			if (userId == otherId)
  				break;

  			var other = users[otherId];
  			var distance = geoDistance(user.loc, other.loc);
  			

  			var haves = [];
  			for (var thingId in other.haves) {
  				var thing = this.props.things[thingId];
  				
  				var match = false;
  				for (var myThingId in user.needs) {
  					if (myThingId == thingId) {
  						match = true;
  						break;
  					}
  				}

  				thing = <span>{thing}</span>;
  				if (match) {
  						thing = <strong>{thing}</strong>;
  				}

  				haves.push(thing);
  				haves.push(<span>, </span>);
  			}
  			haves.pop();

  			var needs = [];
  			for (var thingId in other.needs) {
  				var thing = this.props.things[thingId];
  				
  				var match = false;
  				for (var myThingId in user.haves) {
  					if (myThingId == thingId) {
  						match = true;
  						break;
  					}
  				}

  				thing = <span>{thing}</span>;
  				if (match) {
  						thing = <strong>{thing}</strong>;
  				}

  				needs.push(<span>{thing}</span>);
  				needs.push(<span>, </span>);
  			}
  			needs.pop();

  			others.push(
  				<div>
  					<div className="pull-right"><span className="badge">{ friendlyDistance(distance) }</span></div>
  					<h4>{other.name || 'anon'} <small>{other.phone}</small> </h4>
  					<div>{other.address_no} {other.address_name}</div>
  					{ haves.length ? <div>Have: {haves}</div> : null }
  					{ needs.length ? <div>Need: {needs}</div> : null }
  					<hr/>
  				</div>
  			);
  	}

    return <div>
      <div className="pull-right">
      	<Link to="register" className="btn btn-default btn-xs">Edit</Link>
      </div>
      <h2>{user.name} <small>{user.phone}</small></h2>
      <p>{user.address_no} {user.address_name}</p>
      
      <h3>Nearby people</h3>

      {others}

    </div>;
  }
}

Mobile.contextTypes = {
  router: React.PropTypes.func.isRequired
};
