var i18n          = require('i18n'),
    config        = require('../../config/config');

i18n.configure({
  locales:['zh-CN', 'en'],
  directory: config.main.languagePath,
  defaultLocale: 'zh-CN',
  cookie: 'lang'
  // queryParameter: 'lang'
});

module.exports = function(req, res, next) {
  i18n.init(req, res);
  var current_locale = i18n.getLocale();
  return next();
};
