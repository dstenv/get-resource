"use strict";
var common_vendor = require("../../common/vendor.js");
var common_analysis = require("../../common/analysis.js");
var common_auth = require("../../common/auth.js");
let key = "";
const _sfc_main = {
  data() {
    return {
      inpValue: "",
      list: []
    };
  },
  onLoad(query) {
    key = query.key;
  },
  methods: {
    saveAll() {
      if (this.list.length === 0) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u83B7\u53D6\u56FE\u7247",
          icon: "error"
        });
        return;
      }
      const _this = this;
      common_auth.userAuthorize("scope.writePhotosAlbum", (state) => {
        if (!state)
          return;
        common_vendor.index.showLoading({
          title: "\u6B63\u5728\u4FDD\u5B58..."
        });
        let count = 0;
        _this.list.forEach((item) => {
          common_vendor.index.getImageInfo({
            src: item.url,
            success: (data) => {
              common_vendor.index.saveImageToPhotosAlbum({
                filePath: data.path,
                success: () => {
                  count++;
                  if (count === _this.list.length) {
                    common_vendor.index.hideLoading();
                    setTimeout(() => {
                      common_vendor.index.showToast({
                        title: "\u4FDD\u5B58\u6210\u529F",
                        icon: "none"
                      });
                    });
                    return;
                  }
                  console.log("count", count);
                }
              });
            }
          });
        });
      });
    },
    async send() {
      if (common_analysis.analysis[key]) {
        common_vendor.index.showLoading({
          title: "\u6B63\u5728\u83B7\u53D6\uFF0C\u8BF7\u7A0D\u5019"
        });
        try {
          const result = await common_analysis.analysis[key](this.inpValue);
          console.log("result", result);
          this.list = result;
          common_vendor.index.hideLoading();
        } catch (e) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "\u83B7\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC",
            icon: "error"
          });
        }
      }
    },
    preview(url) {
      console.log(url);
      common_vendor.index.previewImage({
        count: url,
        current: this.list.findIndex((item) => item.url === url),
        urls: this.list.map((item) => item.url)
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.inpValue,
    b: common_vendor.o(($event) => $data.inpValue = $event.detail.value),
    c: common_vendor.o((...args) => $options.send && $options.send(...args)),
    d: common_vendor.o((...args) => $options.saveAll && $options.saveAll(...args)),
    e: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.url,
        b: index,
        c: common_vendor.o(($event) => $options.preview(item.url), index)
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WxProject/getUrlTest/pages/get-resource/get-resource.vue"]]);
wx.createPage(MiniProgramPage);
