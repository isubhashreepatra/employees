import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
//Great place to generate data
  const numberOfRecords = Employees.find({}).count();
  console.log(numberOfRecords); //The logs of the server are loaded on terminal

  if (!numberOfRecords) {
    //Generate data
    _.times(1000, () => {
        const {name, email, phone} = helpers.createCard();
        //This is the same as
        // const name = helpers.createCard().name;
        // const email = helpers.createCard().email;
        // const phone = helpers.createCard().phone;

        const avatar = image.avatar();

        Employees.insert({ name, email, phone, avatar });
        //This is the same as
        // Employees.insert({
        //   name: name,
        //   email: email,
        //   phone: phone,
        //   avatar: avatar
        // });
    });
  }
  Meteor.publish('employees', function (per_page) {
    return Employees.find({},{ limit: per_page });
  });
});
