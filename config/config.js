/*
 * Author: Kain·Altion <a904616537@outlook.com>
 * Last Update (author): Kain Shi <kain.shi@holaever.com> (https://github.com/a904616537)
 */


var path     = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
  main: {
    rootPath: rootPath,
    languagePath: rootPath + '/app/language/',
    upload: {
      save: rootPath + '/public/upload/',
      showUploadDir: 'upload/'
    }
  }
}
