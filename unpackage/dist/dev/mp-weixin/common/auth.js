"use strict";
var common_vendor = require("./vendor.js");
function userAuthorize(authKey, callback) {
  common_vendor.index.getSetting({
    success: (res) => {
      if (res.authSetting.hasOwnProperty(authKey)) {
        if (res.authSetting[authKey]) {
          callback(true);
        } else {
          common_vendor.index.openSetting();
          callback(false);
        }
      } else {
        common_vendor.index.authorize({
          scope: authKey,
          success: () => {
            callback(true);
          },
          fail() {
            callback(false);
          }
        });
      }
    }
  });
}
exports.userAuthorize = userAuthorize;
