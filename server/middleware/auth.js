const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res) => {
  var username = req.body.username;
  var attempted = req.body.password;
  var options =
  {
    username
  };

  return models.Users.get(options)
    .then((userResult) => {
      console.log('queryResults', userResult);
      if (userResult) {
        userResult.compareResult = models.Users.compare(attempted, userResult.password, userResult.salt);
        return userResult;
      } else {
        return false;
      }
    })
    .then((userResult) => {
      console.log('mutated queryResult: ', userResult);
      if (userResult.compareResult) {

        // models.Sessions.create(userResult.id);
        var session = models.Sessions.get({ userId: userResult.id });
        console.log('get session: ', session);
        if (session.id) {
          return session;
        } else {
          models.Sessions.create(userResult.id);
          return models.Sessions.get({ userId: userResult.id });
        }
      }
    })
    .then(session => {
      console.log('the session: ', session);

    })
    .error(error => { throw error; });
};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
