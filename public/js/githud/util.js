if (typeof GitHUD === 'undefined') GitHUD = {};

GitHUD.Util = (function() {
  var API_BASE = 'https://api.github.com/';

  function initRepo(obj, options) {
    var repo = options.repo;
    if (typeof repo === 'string') repo = new GitHUD.Repo(options.repo);

    if (!repo && obj.collection) repo = obj.collection.repo;

    if (typeof obj.set === 'function') obj.set('repo', repo);
    else obj.repo = repo;
  }

  function slug(type, name) {
    return type + '-' + name.toString().replace(/[^\-_0-9a-z]/ig, '');
  }

  function url(path, params) {
    var u = path;
    if (!path.match(/^http/i)) u = API_BASE + path;
    u += '?access_token=' + $.cookie('githubToken');
    if (params) {
      _.each(_.keys(params), function(k) {
        u += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      });
    }
    return u;
  }

  return {
    API_BASE : API_BASE,
    initRepo : initRepo,
    slug     : slug,
    url      : url
  };
})();
