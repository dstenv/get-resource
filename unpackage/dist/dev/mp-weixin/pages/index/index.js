"use strict";
var common_vendor = require("../../common/vendor.js");
var router_index = require("../../router/index.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const functionClick = (routerLink) => {
      router_index.router.push(routerLink);
    };
    const functionList = [
      {
        name: "\u8D44\u6E90\u83B7\u53D6",
        router: "/pages/platform-control/platform-control",
        icon: "../../static/icons/\u6279\u91CF\u83B7\u53D6\u8D44\u6E90.png",
        key: "getSource",
        desc: "\u83B7\u53D6\u5C0F\u7EA2\u4E66\u3001\u6296\u97F3\u7B49\u5206\u4EAB\u94FE\u63A5\u5185\u7684\u8D44\u6E90"
      },
      {
        name: "\u56FE\u7247\u538B\u7F29",
        router: "",
        icon: "../../static/icons/compress-image.png",
        key: "compressImg",
        desc: "\u5BF9\u56FE\u7247\u8FDB\u884C\u65E0\u635F\u538B\u7F29\uFF0C\u6700\u9AD8\u538B\u7F29\u6BD4\u53EF\u8FBE75%"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(functionList, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.desc),
            d: item.key,
            e: common_vendor.o(($event) => functionClick(item.router), item.key)
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57280228"], ["__file", "G:/WxProject/getUrlTest/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
