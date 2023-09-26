"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("./vendor.js");
var analysis = {
  smallRedBook: (link) => {
    return new Promise((resolve, reject) => {
      const reg = /(https|http):\/\/.*\/[\dA-Za-z]*/g;
      if (reg.test(link)) {
        reg.lastIndex = 0;
        const url = reg.exec(link)[0];
        common_vendor.index.request({
          url,
          method: "GET",
          success: (res) => {
            const reg2 = /"imageList":\[[^\s]*\]/;
            const htmlText = res.data;
            const listvalue = reg2.exec(htmlText)[0];
            const reg22 = /\[[^\s]*\]/;
            const str = reg22.exec(listvalue)[0];
            const imgList = JSON.parse(str);
            console.log("imgList", imgList);
            if (imgList && imgList.length > 0) {
              const reg3 = /\/\/.*\.com\//;
              const list = imgList.map((item) => __spreadProps(__spreadValues({}, item), {
                url: `https:${reg3.exec(item.url)[0]}${item.fileId}`
              }));
              resolve(list);
            }
          },
          fail: (err) => {
            console.log("err", err);
            reject(err);
          }
        });
      }
    });
  },
  tiktok: (link) => {
  }
};
exports.analysis = analysis;
