"use strict";
var common_vendor = require("../common/vendor.js");
const queryString = (object) => {
  let str = "";
  for (let key in object) {
    str += `${key}=${object[key]}&`;
  }
  return str.slice(0, str.length - 1);
};
const router = {
  push(options) {
    return new Promise((resolve) => {
      const type = typeof options;
      if (type === "string") {
        common_vendor.index.navigateTo({
          url: options,
          success() {
            resolve();
          }
        });
      } else if (type === "object" && options instanceof Object) {
        const { path, query } = options;
        const queryStr = queryString(query);
        console.log(path, query, queryStr, `${path}?${queryString(query)}`);
        common_vendor.index.navigateTo({
          url: `${path}?${queryString(query)}`,
          success() {
            resolve();
          }
        });
      }
    });
  },
  back() {
    return new Promise((resolve) => {
      common_vendor.index.navigateBack({
        success() {
          resolve();
        }
      });
    });
  }
};
exports.router = router;
