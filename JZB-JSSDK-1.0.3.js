!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(((e = e || self).jme = {}));
})(this, function (e) {
  "use strict";
  var t,
    n = {
      default: void 0,
      call: function (e, t, n) {
        var o = "";
        "function" == typeof t && ((n = t), (t = {}));
        var a = { data: void 0 === t ? null : t };
        if ("function" == typeof n) {
          var i = "dscb" + window.dscb++;
          (window[i] = n), (a._dscbstub = i);
        }
        return (
          (a = JSON.stringify(a)),
          window._dsbridge ? (o = _dsbridge.call(e, a)) : (window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")) && (o = prompt("_dsbridge=" + e, a)),
          JSON.parse(o || "{}").data
        );
      },
      register: function (e, t, o) {
        var a = o ? window._dsaf : window._dsf;
        window._dsInit ||
          ((window._dsInit = !0),
          setTimeout(function () {
            n.call("_dsb.dsinit");
          }, 0)),
          "object" == typeof t ? (a._obs[e] = t) : (a[e] = t);
      },
      registerAsyn: function (e, t) {
        this.register(e, t, !0);
      },
      hasNativeMethod: function (e, t) {
        return this.call("_dsb.hasNativeMethod", { name: e, type: t || "all" });
      },
      disableJavascriptDialogBlock: function (e) {
        this.call("_dsb.disableJavascriptDialogBlock", { disable: !1 !== e });
      },
    };
  !(function () {
    if (!window._dsf) {
      var e = {
        _dsf: { _obs: {} },
        _dsaf: { _obs: {} },
        dscb: 0,
        dsBridge: n,
        close: function () {
          n.call("_dsb.closePage");
        },
        _handleMessageFromNative: function (e) {
          var t = JSON.parse(e.data),
            o = { id: e.callbackId, complete: !0 },
            a = this._dsf[e.method],
            i = this._dsaf[e.method],
            c = function (e, a) {
              (o.data = e.apply(a, t)), n.call("_dsb.returnValue", o);
            },
            r = function (e, a) {
              t.push(function (e, t) {
                (o.data = e), (o.complete = !1 !== t), n.call("_dsb.returnValue", o);
              }),
                e.apply(a, t);
            };
          if (a) c(a, this._dsf);
          else if (i) r(i, this._dsaf);
          else {
            var s = e.method.split(".");
            if (s.length < 2) return;
            var l = s.pop(),
              d = s.join("."),
              u = this._dsf._obs,
              f = u[d] || {},
              g = f[l];
            if (g && "function" == typeof g) return void c(g, f);
            if ((g = (f = (u = this._dsaf._obs)[d] || {})[l]) && "function" == typeof g) return void r(g, f);
          }
        },
      };
      for (var t in e) window[t] = e[t];
      n.register("_hasJavascriptMethod", function (e, t) {
        var n = e.split(".");
        if (n.length < 2) return !(!_dsf[n] && !_dsaf[n]);
        e = n.pop();
        var o = n.join("."),
          a = _dsf._obs[o] || _dsaf._obs[o];
        return a && !!a[e];
      });
    }
  })(),
    window.dsBridge
      ? (t = function (e, t) {
          dsBridge.call("onAjaxRequest", e, function (n) {
            (n = JSON.parse(n)),
              "stream" === e.responseType &&
                (function (e) {
                  var t = e.headers || {},
                    n = (t["content-type"] || t["Content-Type"] || "").toString().toLowerCase();
                  -1 !== n.indexOf("image") && -1 === e.responseText.indexOf("base64") && (e.responseText = `data:${n};base64,` + e.responseText);
                })(n),
              t(n);
          });
        })
      : console.error("dsBridge is not exist!");
  var o = "undefined" != typeof document;
  function a(e) {
    return e.replace(/(^\s*)|(\s*$)/g, "");
  }
  function i() {
    if (window && window.location.protocol.indexOf("file") > -1) {
      var e = (function (e) {
        return class {
          constructor() {
            (this.requestHeaders = {}), (this.readyState = 0), (this.timeout = 0), (this.responseURL = ""), (this.responseHeaders = {});
          }
          _call(e) {
            this[e] && this[e].apply(this, [].splice.call(arguments, 1));
          }
          _changeReadyState(e) {
            (this.readyState = e), this._call("onreadystatechange");
          }
          open(e, t) {
            if (((this.method = e), t)) {
              if (0 !== (t = a(t)).indexOf("http") && o) {
                var n = document.createElement("a");
                (n.href = t), (t = n.href);
              }
            } else t = location.href;
            (this.responseURL = t), this._changeReadyState(1);
          }
          send(t) {
            t = t || null;
            var n = this;
            if (e) {
              var a,
                i = { method: n.method, url: n.responseURL, headers: n.requestHeaders || {}, body: t };
              !(function (e, t) {
                for (var n in t) e.hasOwnProperty(n) ? this.isObject(t[n], 1) && this.isObject(e[n], 1) && this.merge(e[n], t[n]) : (e[n] = t[n]);
              })(i, n._options || {}),
                "GET" === i.method && (i.body = null),
                n._changeReadyState(3),
                (n.timeout = n.timeout || 0),
                n.timeout > 0 &&
                  (a = setTimeout(() => {
                    3 === n.readyState && (this._call("onloadend"), n._changeReadyState(0), n._call("ontimeout"));
                  }, n.timeout)),
                (i.timeout = n.timeout),
                e(i, function (e) {
                  function t(t) {
                    var n = e[t];
                    return delete e[t], n;
                  }
                  if (3 === n.readyState) {
                    clearTimeout(a), (n.status = t("statusCode") - 0);
                    var i = t("responseText"),
                      c = t("statusMessage");
                    if (n.status) {
                      var r = t("headers"),
                        s = {};
                      for (var l in r) {
                        var d = r[l],
                          u = l.toLowerCase();
                        "object" == typeof d ? (s[u] = d) : ((s[u] = s[u] || []), s[u].push(d));
                      }
                      var f = s["set-cookie"];
                      o &&
                        f &&
                        f.forEach((e) => {
                          document.cookie = e.replace(/;\s*httpOnly/gi, "");
                        }),
                        (n.responseHeaders = s),
                        (n.statusText = c || ""),
                        (n.response = n.responseText = i),
                        (n._response = e),
                        n._changeReadyState(4),
                        n._call("onload");
                    } else (n.statusText = i), n._call("onerror", { msg: c });
                    n._call("onloadend");
                  }
                });
            } else console.error("Ajax require adapter");
          }
          setRequestHeader(e, t) {
            this.requestHeaders[a(e)] = t;
          }
          getResponseHeader(e) {
            return (this.responseHeaders[e.toLowerCase()] || "").toString() || null;
          }
          getAllResponseHeaders() {
            var e = "";
            for (var t in this.responseHeaders) e += t + ":" + this.getResponseHeader(t) + "\r\n";
            return e || null;
          }
          abort(e) {
            this._changeReadyState(0), this._call("onerror", { msg: e }), this._call("onloadend");
          }
          static setAdapter(t) {
            e = t;
          }
        };
      })(t);
      XMLHttpRequest = e;
    }
  }
  var c = {
    chooseImage(e) {
      var t = e;
      "boolean" != typeof e.multiple && (e.multiple = !1),
        "number" != typeof e.count && (e.count = 9),
        t.multiple
          ? dsBridge.call("photoalbum.chooseASetPhoto", { count: t.count }, function (e) {
              t.success && t.success(e);
            })
          : dsBridge.call("photoalbum.chooseAPhoto", function (e) {
              t.success && t.success(e);
            });
    },
    getImageBase64(e) {
      dsBridge.call("photoalbum.chooseAPhoto", function (t) {
        var n = dsBridge.call("file.getFileData", { filePath: t.localUrl, format: "base64" });
        e.success && e.success({ base64: "data:image/jpeg;base64," + n });
      });
    },
    saveImage(e) {
      dsBridge.call("photoalbum.saveImage", e, function (t) {
        e.callback && e.callback(t);
      });
    },
  };
  var r = {
    appInfo: function (e) {
      return dsBridge.call("applet.appInfo", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    canOpenUrl: (e) => dsBridge.call("application.canOpenUrl", { url: e.url }),
    openAppletUrl(e) {
      dsBridge.call("application.openUrl", { url: e.url }, function (t) {
        e.success && e.success(t);
      });
    },
    openSetting(e) {
      dsBridge.call("application.openSetting", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    getAppInfo: () => dsBridge.call("appInfo.appInfo"),
  };
  function s(e) {
    if ("undefined" == typeof _dsbridge && !window._dswk && -1 == navigator.userAgent.indexOf("_dsbridge")) return FocusSDK.closeWebViewModal(e);
    let t = "browser.close";
    return (
      navigator.userAgent.toLowerCase().includes("electron") && (t = "browser.closeWebViewModal"),
      dsBridge.call(t, e, function (t) {
        e && e.callback && e.callback(t);
      })
    );
  }
  var l = {
      openPrompt: function (e) {
        return dsBridge.call("browser.openPrompt", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      showOpenDialog: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("browser.showOpenDialog", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.showOpenDialog(e);
      },
      openUrl: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("browser.openUrl", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.openUrl(e.url);
      },
      openLocalUrl: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("browser.openLocalUrl", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.openUrl(e.url);
      },
      openDeepLink: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("browser.openDeepLink", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.openUrl(e.url);
      },
      openSafariUrl: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("browser.openSafariUrl", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.openUrl(e.url);
      },
      openWebViewModal: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("browser.openWebViewModal", e, function (t) {
              e.callback && e.callback(t);
            })
          : e.callback && e.callback({ status: 404, errMsg: "method is not fund" });
      },
      closeWebViewModal: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("browser.closeWebViewModal", e, function (t) {
              e.callback && e.callback(t);
            })
          : e.callback && e.callback({ status: 404, errMsg: "method is not fund" });
      },
      openCommonModal: function (e) {
        if ("undefined" == typeof _dsbridge && !window._dswk && -1 == navigator.userAgent.indexOf("_dsbridge")) {
          const t = e.callback;
          return delete e.callback, FocusSDK.openCommonModal(t, e);
        }
        return dsBridge.call("browser.openCommonModal", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      openExternal: function (e) {
        if ("undefined" == typeof _dsbridge && !window._dswk && -1 == navigator.userAgent.indexOf("_dsbridge")) {
          const t = e.callback;
          return delete e.callback, FocusSDK.openExternal(t, e);
        }
        return dsBridge.call("browser.openExternal", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      closeWeb: s,
      close: s,
      goback: function (e) {
        dsBridge.call("browser.goback", e);
      },
      onSignFileItem: function (e) {
        dsBridge.call("browser.onSignFileItem", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      getQianPiPath: function (e) {
        dsBridge.call("browser.getQianPiPath", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      readFileBySlice: function (e) {
        dsBridge.call("browser.readFileBySlice", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      getJSSDKVersion: function (e) {
        dsBridge.call("browser.getJSSDKVersion", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      onJSSignFileItem: function (e) {
        dsBridge.call("browser.onJSSignFileItem", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      addEventListener: function (e) {
        dsBridge.call("browser.addEventListener", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      removeEventListener: function (e) {
        dsBridge.call("browser.removeEventListener", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      onCustomSignFileItem: function (e) {
        dsBridge.call("browser.onCustomSignFileItem", e, function (t) {
          e.callback && e.callback(t);
        });
      },
    },
    d = {
      openCamera(e) {
        dsBridge.call("camera.shooting", {}, function (t) {
          e && e(t);
        });
      },
      openCameraEx(e) {
        dsBridge.call("camera.shooting", e, function (t) {
          e.callback && e.callback(t);
        });
      },
    };
  var u = {
      openDevTools: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("device.openDevTools", e, function (t) {
              e.callback && e.callback(t);
            })
          : e.callback && e.callback({ status: 404, errMsg: "method is not fund" });
      },
      getDeviceInfo: () => dsBridge.call("devinfo.deviceInfo"),
    },
    f = {
      getFileData(e) {
        var t = e;
        return "string" != typeof e.filePath && (e.filePath = ""), "string" != typeof e.format && (e.format = "base64"), dsBridge.call("file.getFileData", { filePath: t.filePath, format: t.format });
      },
      chooseFile(e) {
        dsBridge.call("file.chooseFile", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      chooseFileFromJS(e) {
        dsBridge.call("file.chooseFileFromJS", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      saveFile(e) {
        dsBridge.call("file.saveFile", e, function (t) {
            console.log(e,t);
          e.callback && e.callback(t);
        });
      },
      openDocument(e) {
        dsBridge.call("file.openDocument", e, function (t) {
          e.callback && e.callback(t);
        });
      },
    };
  var g = {
    openContactsSelector: function (e) {
      if ("undefined" == typeof _dsbridge && !window._dswk && -1 == navigator.userAgent.indexOf("_dsbridge")) {
        const t = e.callback;
        return delete e.callback, FocusSDK.userSelection(e, t);
      }
      return dsBridge.call("im.openContactsSelector", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    openContactsSelectorPro: function (e) {
      if ("undefined" == typeof _dsbridge && !window._dswk && -1 == navigator.userAgent.indexOf("_dsbridge")) {
        const t = e.callback;
        return delete e.callback, FocusSDK.userSelection(e, t);
      }
      return dsBridge.call("im.openContactsSelectorPro", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    externalOpenContactsSelectorPro: function (e) {
      if ("undefined" == typeof _dsbridge && !window._dswk && -1 == navigator.userAgent.indexOf("_dsbridge")) {
        const t = e.callback;
        return delete e.callback, FocusSDK.userSelection(e, t);
      }
      return dsBridge.call("im.externalOpenContactsSelectorPro", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    openGroupChat: function (e) {
      return dsBridge.call("im.openGroupChat", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    openSingleChat: function (e) {
      return dsBridge.call("im.openSingleChat", e, function (t) {
        e.callback && e.callback(t);
      });
    },
  };
  var p = {
    viewImages: function (e) {
      return dsBridge.call("image.viewImages", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    viewVideo: function (e) {
      return dsBridge.call("image.viewVideo", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    saveToPhotoAlbum: function (e) {
      dsBridge.call("image.saveToPhotoAlbum", e, function (t) {
        e.callback && e.callback(t);
      });
    },
  };
  var b = {
    startLocationUpdate(e) {
      dsBridge.call("location.startLocationUpdate", e, function (t) {
        e.callback && e.callback(t);
      });
    },
    stopLocationUpdate(e) {
      dsBridge.call("location.stopLocationUpdate", function (t) {
        e.callback && e.callback(t);
      });
    },
    getLocation(e) {
      dsBridge.call("location.getLocation", function (t) {
        e.callback && e.callback(t);
      });
    },
    locationChange: function (e) {
      return dsBridge.call("location.locationChange", e, function (t) {
        e.callback && e.callback(t);
      });
    },
  };
  class h {
    constructor({ url: e = "", method: t = "GET", data: n = {}, async: o = !0, success: a, error: i, resType: c = "application/json", headers: r = {}, resolve: s, reject: l }) {
      (this.option = { url: e, method: t, data: n, async: o, success: a, error: i, resType: c, headers: r, resolve: s, reject: l }),
        (this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")),
        this.start();
    }
    start() {
      this.checkOption(), this.initOption(), this.open(), this.setHeaders(), this.setResponseType(), this.sendData(), this.responseData();
    }
    checkOption() {
      let { url: e, resType: t, headers: n } = this.option;
      if ("" === e) throw new Error("请求地址不能为空");
      if ("object" != typeof n) throw new Error("设置请求头时请传入 {key:value，key:value...} 的格式");
      if ("string" != typeof t) throw new Error("设置返回数据格式时请传入字符出串格式");
    }
    initOption() {
      let { url: e, async: t, method: n } = this.option;
      if (((e = (e || "").toString()), "boolean" != typeof t && (this.option.async = 1 == t), (this.option.method = n.toUpperCase()), "FORMDATA" != this.option.method)) {
        let e = this.option.data;
        if ("object" == typeof e) {
          if ("GET" === this.option.method) {
            let t = [];
            for (let n in e) t.push(`${n}=${e[n]}`);
            let n = t.join("&");
            this.option.data = `?${n}`;
          } else if ("POST" === this.option.method && "application/x-www-form-urlencoded" === this.option.headers["Content-Type"]) {
            let t = new FormData();
            for (let n in e) t.append(`${n}`, `${e[n]}`);
            this.option.data = t;
          }
        } else "string" == typeof e && "GET" === this.option.method && (this.option.data = `?${e}`);
      }
    }
    open() {
      let { method: e, url: t, async: n, data: o } = this.option;
      "GET" === e ? this.xhr.open(e, t + o, n) : this.xhr.open(e, t, n);
    }
    setHeaders() {
      let e = this.option.headers;
      for (let t in e) this.xhr.setRequestHeader(`${t.toString()}`, `${e[t].toString()}`);
    }
    setResponseType() {
      this.option.async && (this.xhr.responseType = this.option.resType);
    }
    sendData() {
      "GET" == this.option.method ? this.xhr.send() : this.xhr.send(JSON.stringify(this.option.data)),
        (this.timeout = setTimeout(() => {
          "function" == typeof this.option.error && this.option.error("请求超时，默认超时时间为 10000 毫秒"), this.option.reject("请求超时，默认超时时间为 10000 毫秒");
        }, this.option.time || 1e4));
    }
    responseData() {
      this.xhr.onload = () => {
        if ((this.xhr.status >= 200 && this.xhr.status < 300) || 304 === this.xhr.status) {
          clearTimeout(this.timeout);
          let e = this.xhr.response;
          if ("string" == typeof e)
            try {
              e = JSON.parse(e);
            } catch (e) {}
          "function" == typeof this.option.success && this.option.success(this.xhr.response), this.option.resolve(e);
        } else {
          clearTimeout(this.timeout);
          let e = this.xhr.statusText;
          if ("string" == typeof e)
            try {
              e = JSON.parse(e);
            } catch (e) {}
          "function" == typeof this.option.error && this.option.error(e), this.option.reject(e);
        }
      };
    }
    all(e) {
      return Promise.all(e);
    }
  }
  const k = "MAC",
    w = "WINDOWS",
    m = (window.navigator || {}).userAgent || "",
    v = () => (m.toLowerCase().includes("mac") ? k : w),
    _ = () =>
      new Promise((e, t) => {
        (window.FocusSDK && window.FocusSDK.getAppRuntimeEnv) || t(new Error("请确认是在PC桌面端")),
          window.FocusSDK.getAppRuntimeEnv((t) => {
            if ("object" == typeof t && t.runtimeEnv && t.runtimeEnv.envConfig) return e(t.runtimeEnv.envConfig);
            e(t);
          });
      }),
    y = (e) => Math.random().toString().substr(2, e),
    S = (e = 10) => y((e = e > 8 ? e - 8 : 0)) + (Number(y(e)) + Date.now()).toString(36),
    B = {
      getAuthorizationCode: async (e) => {
        const t = "eopen.getCode",
          n = await ((e) =>
            new Promise((t, n) => {
              (window.FocusSDK && window.FocusSDK.getAuthInfo) || n(new Error("请确认是在PC桌面端")),
                window.FocusSDK.getAuthInfo(async (n = {}) => {
                  const o = n.accessToken || "",
                    a = n.app || {},
                    i = a.deviceId || "",
                    c = a.appId || "",
                    { envConfig: r = {} } = (await _()) || {};
                  t({
                    "Content-Type": "application/json",
                    "x-api": e,
                    "x-app": c,
                    "x-did": i,
                    "x-app-version": "1.5.0",
                    "x-gw-version": 2,
                    "x-nonce": S(),
                    "x-token": o,
                    "x-ts": Date.now(),
                    "x-client": v(),
                    "x-stage": r.gateway.stage,
                  });
                });
            }))(t),
          o =
            (
              (await (() =>
                new Promise((e, t) => {
                  (window.FocusSDK && window.FocusSDK.getAuthInfo) || t(new Error("请确认是在PC桌面端")),
                    window.FocusSDK.getAuthInfo((t = {}) => {
                      e(t);
                    });
                }))()) || {}
            ).user || {},
          a = o.teamUserInfo || {},
          i = await ((e) =>
            new Promise((t, n) => {
              _()
                .then(({ envConfig: o }) => {
                  const { protocol: a, host: i } = o.gateway || {};
                  a || i || n(""), t(`${a + "://" + i + "/"}${e}`);
                })
                .catch((e) => {
                  n("");
                });
            }).catch((e) => {
              console.error(e);
            }))(t);
        console.log(i),
          (({ url: e, method: t, data: n, async: o, success: a, error: i, resType: c, headers: r, time: s }) =>
            new Promise((l, d) => new h({ url: e, method: t, data: n, async: o, success: a, error: i, resType: c, headers: r, time: s, resolve: l, reject: d })))({
            url: i,
            method: "POST",
            data: { appKey: e.appKey || "", teamId: a.teamId || "", userId: o.userId || "" },
            headers: n,
          })
            .then((t) => {
              const n = { statusCode: Number(t.errorCode) };
              t.content && ((n.code = t.content.code), (n.expireIn = t.content.expireIn.toString())), e.callback && e.callback(n);
            })
            .catch((t) => {
              e.callback && e.callback(t);
            });
      },
    };
  var x = {
      getAuthorizationCode: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.getAuthorizationCode", e, function (t) {
              e.callback && e.callback(t);
            })
          : B.getAuthorizationCode(e);
      },
      getAccessToken: function (e) {
        return dsBridge.call("login.getAccessToken", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      getThirdAppUserInfo: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.getThirdAppUserInfo", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.getThirdAppUserInfo(e.callback);
      },
      getAppRuntimeEnv: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.getAppRuntimeEnv", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.getAppRuntimeEnv(e.callback);
      },
      getAuthInfo: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.getAuthInfo", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.getAuthInfo(e.callback);
      },
      getUserInfo: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.getUserInfo", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.getUserInfo(e.callback);
      },
      getThirdConfigData: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.getThirdConfigData", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.getThirdConfigData(e.appKey, e.key);
      },
      setThirdConfigData: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.setThirdConfigData", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.setThirdConfigData(e.appId, e.key, e.value, e.callback);
      },
      getAuthInfoNew: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("login.getAuthInfoNew", e, function (t) {
              e.callback && e.callback(t);
            })
          : FocusSDK.getAuthInfo(e.callback);
      },
    },
    A = {
      openMeetingRoom(e) {
        dsBridge.call("meeting.openMeetingRoom", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      createMeeting(e) {
        dsBridge.call("meeting.createMeeting", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      joinMeeting(e) {
        dsBridge.call("meeting.joinMeeting", e, function (t) {
          e.callback && e.callback(t);
        });
      },
    },
    O = {
      getNetworkStatus: (e) =>
        dsBridge.call("network.networkStatus", function (t) {
          e && e({ status: t });
        }),
      uploadFile(e) {
        "boolean" != typeof e.needAuthn && (e.needAuthn = !1),
          "boolean" != typeof e.needCdn && (e.needCdn = !1),
          dsBridge.call("network.uploadFile", e, function (t) {
            e.callback && e.callback(t);
          });
      },
      downloadFile(e) {
        dsBridge.call("network.downloadFile", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      checkEGov(e) {
        let t;
        "function" == typeof e ? (t = e) : "object" == typeof e && (t = e.callback),
          dsBridge.call("network.checkEGov", function (e) {
            t && t(e);
          });
      },
    },
    D = {
      scanCode(e) {
        dsBridge.call("imagescan.scanning", function (t) {
          e && e(t);
        });
      },
      scanCodeEx(e) {
        var t = e;
        "object" != typeof e.scanType && (e.scanType = ["barCode", "qrCode"]),
          "boolean" != typeof e.onlyFromCamera && (e.onlyFromCamera = !1),
          dsBridge.call("imagescan.scanning", t, function (t) {
            e.callback && e.callback(t);
          });
      },
      scanOCR(e) {
        var t = e;
        "object" != typeof e.scanType && (e.scanType = ["document"]),
          "boolean" != typeof e.onlyFromCamera && (e.onlyFromCamera = !1),
          dsBridge.call("imagescan.scanOCR", t, function (t) {
            e.callback && e.callback(t);
          });
      },
    };
  var C = {
    portrait() {
      dsBridge.call("screencontrol.portrait");
    },
    landscape() {
      dsBridge.call("screencontrol.landscape");
    },
    unspecified() {
      dsBridge.call("screencontrol.unspecified");
    },
    captureScreen: function (e) {
      return dsBridge.call("screen.captureScreen", e, function (t) {
        e.callback && e.callback(t);
      });
    },
  };
  var F = {
    shareDocuments: function (e) {
      return dsBridge.call("share.shareDocuments", e, function (t) {
        e.callback && e.callback(t);
      });
    },
  };
  var T = {
      setObject: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("storage.setObject", e, function (t) {
              e.callback && e.callback(t);
            })
          : { status: 404, errMsg: "method is not fund" };
      },
      objForKey: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("storage.objForKey", e, function (t) {
              e.callback && e.callback(t);
            })
          : { status: 404, errMsg: "method is not fund" };
      },
      removeObjForKey: function (e) {
        return "undefined" != typeof _dsbridge || window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")
          ? dsBridge.call("storage.removeObjForKey", e, function (t) {
              e.callback && e.callback(t);
            })
          : { status: 404, errMsg: "method is not fund" };
      },
    },
    I = {
      startRecord(e) {
        dsBridge.call("voice.startRecord", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      stopRecord(e) {
        dsBridge.call("voice.stopRecord", e, function (t) {
          e.callback && e.callback(t);
        });
      },
      openRecorder(e) {
        dsBridge.call("voice.openRecorder", e, function (t) {
          e.callback && e.callback(t);
        });
      },
    },
    K = {
      scanQRCode(e) {
        dsBridge.call("gdt.createGdt", e, function (t) {
          e.callback && e.callback(t);
        });
      },
    };
  const M = {
    openUserSelectModel: (e, t) => (
      "undefined" == typeof dsBridge && FocusSDK && FocusSDK.userSelection(e, t),
      dsBridge.call("userSelect.openUserSelectModel", e, function (e) {
        t && t(e, () => {});
      })
    ),
  };
  var R = {
    openOtherApp(e) {
      dsBridge.call("extra.openOtherApp", e, function (t) {
        e.callback && e.callback(t);
      });
    },
  };
  i(),
    (e.initDsBridge = i),
    (e.album = c),
    (e.applet = r),
    (e.browser = l),
    (e.camera = d),
    (e.cookie = {}),
    (e.datacollection = {}),
    (e.device = u),
    (e.engine = {}),
    (e.event = {}),
    (e.file = f),
    (e.im = g),
    (e.image = p),
    (e.location = b),
    (e.login = x),
    (e.map = {}),
    (e.meeting = A),
    (e.network = O),
    (e.scan = D),
    (e.screen = C),
    (e.share = F),
    (e.storage = T),
    (e.voice = I),
    (e.version = "1.0.3"),
    (e.gdt = K),
    (e.userSelect = M),
    (e.extra = R),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
