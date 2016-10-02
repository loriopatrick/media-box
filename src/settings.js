var request = require('superagent');

var cache = null;

module.exports = function(cb) {
  if (cache) {
    return cb(null, cache);
  }

  request.get(window.PUBLIC_URL + '/settings.json').end((err, res) => {
    if (err) {
      return cb(err);
    }
    cache = JSON.parse(res.text);
    cb(null, cache);
  });
};
