import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Mobile extends React.Component {

  componentWillMount() {
  	// Not yet registered
		if (!this.props.user.address_no) {
			this.context.router.transitionTo('register');
		}
	}

  render() {

  	var user = this.props.user;
  	var others = [];

    return <div>
      <div className="pull-right">
      	<Link to="register" className="btn btn-default btn-xs">Edit</Link>
      </div>
      <h2>{user.name} <small>{user.phone}</small></h2>
      <p>{user.address_no} {user.address_name}</p>
      <hr/>
      <div><Link to="register">What do you have or need?</Link></div>
    </div>;
  }
}

Mobile.contextTypes = {
  router: React.PropTypes.func.isRequired
};
