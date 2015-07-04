import React from 'react';
import { Route, DefaultRoute, RouteHandler, Navigation, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Needs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {user: props.user};
  }

  handleChange(thingId, event) {
    var needs = this.state.user.needs || {};
    needs[thingId] = event.target.checked;
    this.state.user.needs = needs;
    this.setState({user: this.state.user});
  }

  back(event) {
    this.context.router.transitionTo('register');
  }


  submit(event) {
    this.props.userRef.set(this.state.user);
    this.context.router.transitionTo('home');
  }

  render() {

    var user = this.state.user;
    var userNeeds = user.needs || {};
    var things = [];

    console.log('userNeeds', userNeeds);

    for (var thingId in this.props.things) {
      var thingName = this.props.things[thingId];
      var checked = userNeeds[thingId] || false;
      things.push(
        <div className="checkbox" key={thingId}>
          <label>
            <input type="checkbox" checked={checked} onChange={this.handleChange.bind(this, thingId)}/> {thingName}
          </label>
        </div>
      );
    };


    return (
      <div>
        <h3>What do you need?</h3>
        <form>
        <div>{things}</div>
        </form>
        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group" role="group">
            <button className="btn btn-default" onClick={this.back.bind(this)}>Back</button>
          </div>
          <div className="btn-group" role="group">
            <button className="btn btn-primary" onClick={this.submit.bind(this)}>Next</button>
          </div>
        </div>



      </div>
    );
  }

}

Needs.contextTypes = {
  router: React.PropTypes.func.isRequired
};
