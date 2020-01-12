const parseCookies = (req, res, next) => {
  var cookieString = req.get('Cookie') || '';

  parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
    if (cookie.length) {
      let parts = cookie.split('=');
      cookies[parts[0]] = parts[1];
    }
    return cookies;
  }, {});
  //console.log(parsedCookies);

  req.cookies = parsedCookies;
  next();
};

module.exports = parseCookies;