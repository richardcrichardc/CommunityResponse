import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { root } from './base';

export default class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null
    };

    this.usersRef = root.child('users');

    this.usersRef.on('value', function(snapshot) {
      this.setState({'users': snapshot.val()});
    }.bind(this));
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  render() {
    var users = this.state.users;
    if (users==null)
        return null;

    var rows = [];
    for (var userId in users) {
      var user = users[userId];
      rows.push(
        <tr key={userId}>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.adults}</td>
          <td>{user.children}</td>
          <td>{user.address_no} {user.address_name}</td>
        </tr>
      )
    }


    return (
      <div>
        <h3>Map</h3>

        <table className="table">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Address</th>
          </tr>
          {rows}
        </table>

      </div>
    );
  }

}

