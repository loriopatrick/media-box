var url = require('url');
var request = require('superagent');

function load_files(root, cb) {
  if (!root.endsWith('/')) {
    root += '/';
  }
  request.get(root).end((err, res) => {
    if (err) {
      return cb(err);
    }

    var el = document.createElement('div');
    el.innerHTML = res.text;
    var links = el.querySelectorAll('a');

    var files = [];
    links.forEach((link_el) => {
      var parsed = url.parse(link_el.href);
      var path = parsed.path.substr(1);
      var src = url.resolve(root, path);

      if (!path.startsWith('.') && path.endsWith('.mp3')) {
        files.push(src);
      }
    });

    cb(null, files);
  });
}

export default load_files;
