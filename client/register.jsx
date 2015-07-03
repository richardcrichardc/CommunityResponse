import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link, default as Router } from 'react-router';
import { rooms, logs } from './base';

export default class Room extends React.Component {

  constructor(props) {
    super(props);

    this.state = {user: props.user};
  }

  handleChange(field, event) {
    this.state.user[field] = event.target.value;
    this.setState({user: this.state.user});
  }

  back(event) {
    console.log('back');
    this.context.router.transitionTo('room');
  }


  submit(event) {
    event.preventDefault();
    this.props.userRef.set(this.state.user);
  }

  render() {

    var user = this.state.user;

    return (
      <div>
        <h3>Register Location</h3>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input type="text" className="form-control" placeholder="Contact Name" value={user.name} onChange={this.handleChange.bind(this, 'name')}/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Phone</label>
            <div className="col-xs-10">
              <input type="text" className="form-control" placeholder="Phone Number" value={user.phone} onChange={this.handleChange.bind(this, 'phone')}/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Adults</label>
            <div className="col-xs-10">
              <select className="form-control width-auto" value={user.adults} onChange={this.handleChange.bind(this, 'adults')}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Children</label>
            <div className="col-xs-10">
              <select className="form-control width-auto" value={user.children} onChange={this.handleChange.bind(this, 'children')}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Address</label>
            <div className="col-xs-3">
              <input type="text" className="form-control" placeholder="No" value={user.address_no} onChange={this.handleChange.bind(this, 'address_no')}/>
            </div>
            <div className="col-xs-7">
              <input type="text" className="form-control" placeholder="Name" value={user.address_name} onChange={this.handleChange.bind(this, 'address_name')}/>
            </div>
            <div className="col-xs-2">
            </div>
          </div>
        </form>


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

