/*
 * Author: Kain·Altion <a904616537@outlook.com>
 * Last Update (author): Kain Shi <kain.shi@holaever.com> (https://github.com/a904616537)
 */

'use strict'

var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema(),
    aboutSchema = new Schema({
      EN_name: String,
      CH_name: String,
      sex: Date,
      phone: Number
    })

aboutSchema.virtual('date').get (function() {
  this._id.getTimestamp()
});

aboutSchema.pre('save', function (next) {
  next();
});


aboutSchema.statics = {
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

mongoose.model('about', articleSchema);
