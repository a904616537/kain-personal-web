/*
 * Author: Kain·Altion <a904616537@outlook.com>
 * Last Update (author): Kain Shi <kain.shi@holaever.com> (https://github.com/a904616537)
 */

'use strict'

var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema(),
    articleSchema = new Schema({
      title: String,
      describe: String,
      dateTime: Date,
      icon: Number,
      link: String,
      content: String
    })

articleSchema.virtual('date').get (function() {
  this._id.getTimestamp()
});

articleSchema.pre('save', function (next) {
  next();
});


articleSchema.statics = {
  findById: function (id, callback) {
    return this.findOne({_id: id})
      .exec(callback);
  },
  multiByTitle: function (title, callback) {
    return this.findOne({title: /title/})
      .sort(dateTime: -1)
      .exec(callback);
  },
  findByTitle: function (title, callback) {
    return this.findOne({title: title})
      .exec(callback);
  }
}

mongoose.model('article', articleSchema);
