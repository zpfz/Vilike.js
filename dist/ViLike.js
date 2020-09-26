'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * ViLike.js v0.1.2
 * (c) 2020 Feng L.H.
 * Released under the MIT License.
 */
;(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.ViLike = factory());
})(undefined, function () {
  'use strict';

  var ViLike = {};

  ViLike.version = '0.1.2';

  var Settings = {
    secretKey: '',
    safeKey: '',
    table: 'vilike',
    key: 'key',
    visit: 'visit',
    like: 'like'
  };

  // Configure
  ViLike.configure = function (options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }
    return this;
  };

  // Initialize
  ViLike.init = function () {
    Bmob.initialize(Settings.secretKey, Settings.safeKey);
  };

  // Get Visit & Like
  ViLike.get = function (skey, callback) {
    var _visit = localStorage.getItem(skey + '-visit');
    var _like = localStorage.getItem(skey + '-like');
    var islike = false;

    var query = Bmob.Query(Settings.table);
    query.equalTo(Settings.key, '==', skey);
    query.find().then(function (res) {
      if (res.length !== 0) {
        if (_like != null) {
          islike = true;
        }
        if (_visit === null) {
          query.set('id', res[0].objectId);
          query.set(Settings.visit, res[0][Settings.visit] + 1);
          query.save().then(function () {
            localStorage.setItem(skey + '-visit', 1);
          }).catch(function () {
            console.error("Can\'t read and write data normally.");
          });
          callback(res[0][Settings.visit] + 1, res[0][Settings.like], islike);
        } else {
          callback(res[0][Settings.visit], res[0][Settings.like], islike);
        }
      } else {
        query.set(Settings.key, skey);
        query.set(Settings.visit, 1);
        query.set(Settings.like, 0);
        query.save().then(function () {
          localStorage.setItem(skey + '-visit', 1);
        }).catch(function () {
          console.error("Can\'t read and write data normally.");
        });
        callback(1);
      }
    });
  };

  // Event
  ViLike.like = function (skey, callback) {
    var query = Bmob.Query(Settings.table);
    query.equalTo(Settings.key, '==', skey);
    query.find().then(function (res) {
      if (res.length == 1) {
        query.set('id', res[0].objectId);
        query.set(Settings.like, res[0][Settings.like] + 1);
        query.save().then(function () {
          localStorage.setItem(skey + '-like', 1);
        }).catch(function () {
          console.error("Can\'t  write data normally.");
        });
        callback(res[0][Settings.like] + 1);
      } else {
        console.error('Like Number is empty or not unique.');
      }
    });
  };

  if (typeof window !== 'undefined') {
    window.ViLike = ViLike;
  }

  return ViLike;
});