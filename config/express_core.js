/*
 * Author: Kain·Altion <a904616537@outlook.com>
 * Last Update (author): Kain Shi <kain.shi@holaever.com> (https://github.com/a904616537)
 */


var express 	= require('express'),
	path 		    = require('path'),
	port 		    = process.env.PORT || 3502,
	bodyParser 	= require("body-parser"),
  glob        = require('glob'),
  async       = require('async'),
  config      = require('./config'),
  i18n        = require(config.main.rootPath + '/app/language/i18n'),
  routes      = glob.sync(config.main.rootPath + '/app/routes/**/*.js'),
	cookieParser = require('cookie-parser');

module.exports = function(express, app) {
  app.set('views',config.main.rootPath + '/app/views');
	app.set('view engine','jade');
	app.engine('jade', require('jade').__express);
	app.use(cookieParser());
	app.use(i18n);

  app.use(express.static(path.join(config.main.rootPath, '/public')));
  app.use(bodyParser.json());

  app.listen(port);

  async.each(routes, function (route) {
    require(route)(app);
  });

  console.log('imooc started on port ' + port);
}
