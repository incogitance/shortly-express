const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res) => {
  var username = req.body.username;
  var attempted = req.body.password;
  // get the user from db
  var options =
  {
    username
  };

  return models.Users.get(options)
    .then((queryResult) => {
      console.log('queryResults', queryResult);
    // var result = models.Users.compare(attempted, password, salt);
    // console.log('Compare: ',result);
    })
    .error(error => { throw error; });
  // get salt from that user

  //check username with hashed pw on users table


};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
