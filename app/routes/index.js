/*
 * Author: Kain·Altion <a904616537@outlook.com>
 * Last Update (author): Kain Shi <kain.shi@holaever.com> (https://github.com/a904616537)
 */


module.exports = function (app) {
  app.get('/',function (req, res) {
    res.render('index');
  });
  app.get('/editor',function (req, res) {
    res.render('editor');
  });

}
