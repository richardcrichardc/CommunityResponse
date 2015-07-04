import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { root } from './base';

export default class Map extends React.Component {

  constructor(props) {
    super(props);

    this.mapNode = null;
    this.map = null;

    this.state = {
      users: [],
      sel: null
    };

    this.usersRef = root.child('users');

  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  showMap() {
    // add map if it has not been added yet
    if (this.map == null) {
      setTimeout(() => {
        this.mapNode = React.findDOMNode(this.refs.map);

        var mapOptions = {
                  center: { lat: -39.927369, lng: 175.0414431},
                  zoom: 14
        };
        this.map = new google.maps.Map(this.mapNode, mapOptions);

        // Listen for new users and add when they arrive
        this.usersRef.on('child_added', function(snapshot) {
          var user = snapshot.val();
          user.key = snapshot.key();

          var users = this.state.users;
          users.push(user);
          this.setState({'users': users});
          if (user.loc) {
            this.addMark(user);

            // Make noise
            React.findDOMNode(this.refs.ping).play();
          }
        }.bind(this));

      }.bind(this), 100);
    }
  }

  addMark(user) {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(user.loc.lat, user.loc.lon),
      title: user.name + ': ' + user.address_no + ' ' + user.address_name
    });

    marker.setMap(this.map);

    google.maps.event.addListener(marker, 'click', () => {
      this.setState({'sel', user});
    });
  }

  render() {
    var users = this.state.users;
    var sel = this.state.sel;
    this.showMap()

    var rows = [];
    for (var userId in users) {
      var user = users[userId];
      rows.push(
        <tr key={user.key}>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.adults}</td>
          <td>{user.children}</td>
          <td>{user.address_no} {user.address_name}</td>
          <td>{user.loc ? user.loc.lat : ''}</td>
          <td>{user.loc ? user.loc.lon : ''}</td>
        </tr>
      )
    }

    var userPane = null;
    if (sel) {
      userPane = (
        <div>{ sel.name }</div>
        );
    }



    return (
      <div>
        <h3>Management Console</h3>

        <div className="row">
          <div className="col-md-8">
            <div id="map-canvas" ref="map"></div>
            <audio src="ping.mp3" autobuffer="autobuffer" ref="ping" />
          </div>
          <div className="col-md-4">
            { userPane }
          </div>

        </div>

        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Adults</th>
                  <th>Children</th>
                  <th>Address</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}

