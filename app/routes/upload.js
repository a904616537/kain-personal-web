/*
 * Author: Kain·Altion <a904616537@outlook.com>
 * Last Update (author): Kain Shi <kain.shi@holaever.com> (https://github.com/a904616537)
 */
var formidable  = require('formidable'),
    util        = require('util'),
    config      = require('../../config/config'),
    fs          = require('fs'),
    sizeOf      = require('image-size'),
    querystring = require('querystring'),
    util        = require('util');

module.exports = function (app) {
  app.post('/upload',function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = config.main.upload.save;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
      if (err) {
        res.locals.error = '上传出错！';
        res.end();
        return;
      }

      var extName = '';  //后缀名
      switch (files.image.type) {
          case 'image/pjpeg':
              extName = 'jpg';
              break;
          case 'image/jpeg':
              extName = 'jpg';
              break;
          case 'image/png':
              extName = 'png';
              break;
          case 'image/x-png':
              extName = 'png';
              break;
      }
      if(extName.length == 0) {
        res.locals.error = '只支持png和jpg格式图片';
        res.end();
        return;
      }

      sizeOf(files.image.path, function(err, dimensions) {
        if(err) return send('err');

        var size = [dimensions.width, dimensions.height];

        var avatarName  = Date.parse(new Date())+ '.' + extName,
            newPath     = form.uploadDir + avatarName,
            showDir     = config.main.upload.showUploadDir + avatarName;
        fs.renameSync(files.image.path, newPath);  //重命名
        res.json({
          url: showDir,
          size: size
        });
      });
    });
  });

  app.post('/save-my-page',function (req, res) {
    var post = '';     //定义了一个post变量，用于暂存请求体的信息

    req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;
    });

    req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        post = querystring.parse(post);
        var str = util.inspect(post);
        console.log(str);
    });
    res.send('ok');
  });

}
