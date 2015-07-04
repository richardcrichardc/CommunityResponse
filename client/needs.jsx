import React from 'react';
import { Route, DefaultRoute, RouteHandler, Navigation, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Needs extends React.Component {

  mixins: [Navigation]

  constructor(props) {
    super(props);

    this.state = {user: props.user};
  }

  handleChange(field, event) {
    this.state.user[field] = event.target.value;
    this.setState({user: this.state.user});
  }

  back(event) {
    console.log('back', this.context.router);
    this.context.router.transitionTo('home');
  }


  submit(event) {
    event.preventDefault();
    this.props.userRef.set(this.state.user);
  }

  render() {

    var user = this.state.user;

    return (
      <div>
        <h3>Register Needs</h3>

        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group" role="group">
            <button type="submit" className="btn btn-default" onClick={this.back.bind(this)}>Back</button>
          </div>
          <div className="btn-group" role="group">
            <button type="submit" className="btn btn-primary" onClick={this.submit.bind(this)}>Next</button>
          </div>
        </div>



      </div>
    );
  }

}

Needs.contextTypes = {
  router: React.PropTypes.func.isRequired
};
