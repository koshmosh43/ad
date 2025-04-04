!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("PlProtocol", [], t) : "object" == typeof exports ? exports.PlProtocol = t() : e.PlProtocol = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(o) {
            if (t[o])
                return t[o].exports;
            var a = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(a.exports, a, a.exports, n),
            a.l = !0,
            a.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var o = Object.create(null);
            if (n.r(o),
            Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var a in e)
                    n.d(o, a, function(t) {
                        return e[t]
                    }
                    .bind(null, a));
            return o
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 1)
    }([, function(e, t, n) {
        "use strict";
        function o(e) {
            var t, n = {
                width: 0,
                height: 0
            }, o = {
                isAndroid: (t = window.navigator.userAgent).indexOf("Android") > -1 || t.indexOf("Adr") > -1,
                isiOS: !!t.match(/.+Mac OS X/)
            };
            if (e && o.isiOS && document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight)
                n.width = document.documentElement.clientWidth,
                n.height = document.documentElement.clientHeight;
            else if (e && o.isAndroid && window.screen.width && window.screen.height)
                n.width = window.screen.width,
                n.height = window.screen.height;
            else if (document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight)
                n.width = document.documentElement.clientWidth,
                n.height = document.documentElement.clientHeight;
            else {
                var a = document.createElement("div");
                a.setAttribute("style", "position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: -1;"),
                document.body.appendChild(a),
                n.width = a.offsetWidth,
                n.height = a.offsetHeight,
                a.remove()
            }
            return n
        }
        n.r(t);
        var a = function() {
            var e = {
                domComplete: !1,
                winOnload: !1,
                renderFail: !1,
                gameReady: !1,
                gameRetry: !1,
                gameStart: !1,
                gameEnd: !1,
                install: !1,
                gameClose: !1,
                muteStatus: !1,
                handsOn: !1
            }
              , t = "outer"
              , n = null;
            function a() {
                var n;
                n = function(e) {
                    (function e(t) {
                        return !!t && t !== document.body && t !== document.documentElement && (!!function(e) {
                            return !!["pl-custom-dom", "m-playable-skip-page", "m-playable-skip", "m-playable-countdown", "confirm-candy-popup-mask", "confirm-candy-popup", "m-more-offer", "m-playable-close", "coppa_privacy_trigger"].some((function(t) {
                                return -1 !== e.className.indexOf(t)
                            }
                            ))
                        }(t) || e(t.parentElement))
                    }
                    )(e.target) || (window.HttpAPI.sendPoint("fc"),
                    document.removeEventListener("touchstart", n, !0))
                }
                ,
                window.addEventListener("message", (function(e) {
                    var t;
                    if (e.data && "PLAYABLE:protocol" === e.data.type && e.data.data) {
                        var o = e.data.data.type
                          , a = e.data.data.name
                          , i = e.data.data.params || [];
                        if (console.log("执行自定义事件:", a),
                        console.log("传参:", i),
                        "CustomEvent" === o)
                            !function(e, t) {
                                var n = new CustomEvent(e,{
                                    detail: t
                                });
                                document.dispatchEvent(n)
                            }(a, i);
                        else if ("GlobalFunction" === o)
                            switch (a) {
                            case "HttpAPI.sendPoint":
                                window.HttpAPI && window.HttpAPI.sendPoint && "function" == typeof window.HttpAPI.sendPoint && (t = window.HttpAPI).sendPoint.apply(t, i);
                                break;
                            case "gameClose":
                                window.gameClose && window.gameClose();
                                break;
                            case "gameEnd":
                                window.gameEnd && window.gameEnd.apply(window, i);
                                break;
                            case "gameReady":
                                window.gameReady && window.gameReady();
                                break;
                            case "gameRetry":
                                window.gameRetry && window.gameRetry();
                                break;
                            case "gameStart":
                                window.gameStart && window.gameStart.apply(window, i),
                                document.addEventListener("touchstart", n, !0);
                                break;
                            case "install":
                                window.triggerEvents && (window.triggerEvents.handsOn = !0),
                                window.install && window.install.apply(window, i);
                                break;
                            case "MW_gameStartCheck":
                                window.MW_gameStartCheck && window.MW_gameStartCheck();
                                break;
                            case "renderFail":
                                window.renderFail && window.renderFail()
                            }
                    }
                }
                )),
                function() {
                    var n = {
                        gameEnd: window.gameEnd,
                        install: window.install,
                        gameReady: window.gameReady,
                        renderFail: window.renderFail,
                        gameClose: window.gameClose,
                        gameStart: window.gameStart,
                        gameRetry: window.gameRetry
                    };
                    "outer" === t && (window.gameStart = function() {
                        n.gameStart && n.gameStart.call(window, arguments),
                        i({
                            type: "GlobalFunction",
                            name: "MW_gameStartCheck"
                        }),
                        i({
                            type: "GlobalFunction",
                            name: "gameStart",
                            params: Array.prototype.slice.apply(arguments)
                        })
                    }
                    ,
                    window.gameClose = function() {
                        n.gameClose && n.gameClose.call(window, arguments),
                        i({
                            type: "GlobalFunction",
                            name: "gameClose",
                            params: Array.prototype.slice.apply(arguments)
                        })
                    }
                    );
                    "inner" === t && (!function() {
                        for (var t = ["touchstart", "click", "mousedown", "touchend", "mouseup", "touchmove", "mousemove"], n = null, o = 0; o < t.length; o++)
                            document.addEventListener(t[o], (function() {
                                e.handsOn = !0,
                                n && clearTimeout(n),
                                n = setTimeout((function() {
                                    console.log("当前用户交互时延到期"),
                                    e.handsOn = !1
                                }
                                ), 1e3)
                            }
                            ), !0)
                    }(),
                    document.addEventListener("readystatechange", (function() {
                        "complete" === document.readyState && i({
                            type: "CustomEvent",
                            name: "PLAYABLE:domComplete"
                        })
                    }
                    )),
                    window.addEventListener("load", (function() {
                        i({
                            type: "CustomEvent",
                            name: "PLAYABLE:windowOnload"
                        })
                    }
                    )),
                    window.gameEnd = function() {
                        i({
                            type: "GlobalFunction",
                            name: "gameEnd",
                            params: Array.prototype.slice.apply(arguments)
                        })
                    }
                    ,
                    window.install = function() {
                        e.handsOn && (console.log("用户主动触发"),
                        i({
                            type: "GlobalFunction",
                            name: "install",
                            params: Array.prototype.slice.apply(arguments)
                        }))
                    }
                    ,
                    window.gameReady = function() {
                        i({
                            type: "GlobalFunction",
                            name: "gameReady",
                            params: Array.prototype.slice.apply(arguments)
                        })
                    }
                    ,
                    window.gameRetry = function() {
                        i({
                            type: "GlobalFunction",
                            name: "gameRetry",
                            params: Array.prototype.slice.apply(arguments)
                        })
                    }
                    ,
                    window.renderFail = function() {
                        i({
                            type: "GlobalFunction",
                            name: "renderFail",
                            params: Array.prototype.slice.apply(arguments)
                        })
                    }
                    ,
                    window.HttpAPI = {
                        sendPoint: function() {
                            i({
                                type: "GlobalFunction",
                                name: "HttpAPI.sendPoint",
                                params: Array.prototype.slice.apply(arguments)
                            })
                        }
                    },
                    window.gameRetry = function() {
                        i({
                            type: "GlobalFunction",
                            name: "gameRetry",
                            params: Array.prototype.slice.apply(arguments)
                        })
                    }
                    )
                }()
            }
            function i(e) {
                var o;
                switch (t) {
                case "inner":
                    o = window.parent;
                    break;
                case "outer":
                    o = n.contentWindow;
                    break;
                default:
                    o = null
                }
                if (o && o !== window) {
                    var a = {
                        type: "PLAYABLE:protocol",
                        data: e
                    };
                    console.log(a),
                    o.postMessage(a, "*")
                }
            }
            function r() {
                var e = o(!0);
                n.width = e.width + "px",
                n.height = e.height + "px"
            }
            return document.querySelector("#MW_PLFRAME") ? (n = document.querySelector("#MW_PLFRAME"),
            t = "outer",
            a(),
            r(),
            window.addEventListener("resize", (function() {
                r()
            }
            ))) : (t = "inner",
            a(),
            function() {
                window.addEventListener("load", (function() {
                    window.Luna && window.pi && (window.pi.logEvent = function() {
                        console.log("prevent-log")
                    }
                    ,
                    window.pi.statsUrl = "")
                }
                ));
                var e = function(e, t) {
                    var n = Object.getOwnPropertyDescriptor(e, t);
                    n && Object.defineProperty(e, t, {
                        get: function() {
                            if (window.screen.width + window.screen.height > 0) {
                                var e = n.get.apply(this, arguments);
                                return "innerWidth" == t ? e = window.screen.width : "innerHeight" == t && (e = window.screen.height),
                                e
                            }
                            return 800
                        },
                        set: function() {
                            console.log("windowInnerWH set:" + arguments[0]),
                            n.set.apply(this, arguments)
                        }
                    })
                };
                window.innerWidth < 1 && (e(window, "innerWidth"),
                e(window, "innerHeight"))
            }()),
            {
                status: e
            }
        }();
        t.default = a
    }
    ]).default
}
));
