const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.homerSimpson)
    .then((hash) => {
    //if there is no hash
      if (!hash) {
      //create session
        throw hash;
      }
      return models.Sessions.get({hash});
    })
    .tap((session) => {
      if (!session) {
        throw session;
      }
    })
    .catch(() => {
      return models.Sessions.create()
        .then(results => {
          // console.log('results from session create:',results);
          return models.Sessions.get({ id: results.insertId });
        })
        .then((session) => {
          // console.log('session after session create', session);
          res.cookie('homerSimpson', session.hash);
          return session;
        });
    })
    .then((session) => {
      req.session = session;
      next();
    });

};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }
};