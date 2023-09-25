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
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const inpValue = common_vendor.ref("");
    const list = common_vendor.ref([]);
    const send = () => {
      const reg = /(https|http):\/\/.*\/[\dA-Za-z]*/g;
      if (reg.test(inpValue.value)) {
        reg.lastIndex = 0;
        const url = reg.exec(inpValue.value)[0];
        common_vendor.index.showLoading({
          title: "\u6B63\u5728\u83B7\u53D6\uFF0C\u8BF7\u7A0D\u5019..."
        });
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
              list.value = imgList.map((item) => __spreadProps(__spreadValues({}, item), {
                url: `https://${reg3.exec(item.url)[0]}${item.fileId}`
              }));
              common_vendor.index.hideLoading();
            }
          },
          fail: (err) => {
            console.log("err", err);
          }
        });
      }
    };
    const saveAll = () => {
      if (list.value.length === 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u83B7\u53D6\u56FE\u7247",
          icon: "error"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: inpValue.value,
        b: common_vendor.o(($event) => inpValue.value = $event.detail.value),
        c: common_vendor.o(send),
        d: common_vendor.o(saveAll),
        e: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.url,
            b: item.url
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WxProject/getUrlTest/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
