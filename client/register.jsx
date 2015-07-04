import React from 'react';
import { Route, DefaultRoute, RouteHandler, Navigation, default as Router } from 'react-router';
import { streets } from './base';

export default class Register extends React.Component {

  mixins: [Navigation]

  constructor(props) {
    super(props);

    this.state = {user: props.user, locNotFound: false};
  }

  handleChange(field, event) {
    this.state.user[field] = event.target.value;
    this.setState({user: this.state.user});
  }

  back(event) {
    this.context.router.transitionTo('mobile');
  }


  submit(event) {
    event.preventDefault();

    var user = this.state.user;

    console.log(this.state);
    if (!user.address_no || !user.address_name) {
      this.setState({locNotFound: true});
      return;
    }

    var key = getStreetKey(user);
    console.log('key', key);

    streets.child(key).once('value', function(snapshot) {
      var loc = snapshot.val();
      if (loc) {
        user.loc = loc;
        this.props.userRef.set(user);
        this.context.router.transitionTo('needs');
      } else {
        this.setState({locNotFound: true});
      }
    }.bind(this));
  }

  render() {

    var user = this.state.user;
    var locNotFoundMsg = this.state.locNotFound ? 'Address not found' : '';

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
            <div className="col-xs-10">
              <span className="help-block loc-found text-danger"><span className="text-danger">{locNotFoundMsg}</span></span>
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

Register.contextTypes = {
  router: React.PropTypes.func.isRequired
};
