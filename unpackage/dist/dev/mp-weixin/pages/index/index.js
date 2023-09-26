"use strict";
var common_vendor = require("../../common/vendor.js");
var router_index = require("../../router/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const platformList = [
      {
        name: "\u5C0F\u7EA2\u4E66",
        key: "smallRedBook"
      },
      {
        name: "\u6296\u97F3",
        key: "tiktok"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(platformList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.key,
            c: common_vendor.o(($event) => common_vendor.unref(router_index.router).push({
              path: "/pages/get-resource/get-resource",
              query: {
                key: item.key
              }
            }), item.key)
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WxProject/getUrlTest/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
