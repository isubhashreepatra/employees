import React, { Component } from 'react'; //Component is added to create class based component
import { withTracker } from 'meteor/react-meteor-data';

import { Employees } from '../../imports/collections/employees';
import  EmployeeDetail from './employee_detail';

const PER_PAGE =20;

//Create a component
class EmployeeList extends Component {
  componentWillMount(){
    this.numberOfClicks = 1;
  };

  handleClickEvent(){
    Meteor.subscribe('employees', PER_PAGE * (this.numberOfClicks + 1));
    this.numberOfClicks += 1;

  };

  render() {
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(item =>
            <EmployeeDetail employee={item} key={item._id}/>
          )}
        </div>
        <button className="btn btn-primary" onClick={this.handleClickEvent.bind(this)} >Load More..</button>
      </div>
    );
 }
};

//create container
export default withTracker(() => {
  //subscribe for the data published by the server
  Meteor.subscribe('employees', PER_PAGE);

  //retun the object that will be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch() };
})(EmployeeList);
