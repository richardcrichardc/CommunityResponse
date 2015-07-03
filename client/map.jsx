import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { root } from './base';

export default class Map extends React.Component {

  constructor(props) {
    super(props);

    this.mapNode = null;

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

  showMap() {
    if (this.map == null) {
      setTimeout(() => {
        this.mapNode = React.findDOMNode(this.refs.map);
        console.log('hola', this.mapNode);

        var mapOptions = {
                  center: { lat: -39.927369, lng: 175.0414431},
                  zoom: 14
        };
        var map = new google.maps.Map(this.mapNode, mapOptions);


      }.bind(this), 100);
    }
  }

  render() {
    var users = this.state.users;
    if (users==null)
        return null;

    this.showMap()

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

        <div id="map-canvas" ref="map">zz</div>

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

