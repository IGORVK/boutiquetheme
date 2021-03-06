(function outer(g, f, a) {
    function b(a) {
        if (f[a]) return f[a].exports;
        if (g[a]) return e(a, b);
        throw Error('cannot find module "' + a + '"');
    }

    function e(b, d) {
        var e = f[b] = {
                exports: {}
            },
            h = g[b],
            v = h[2],
            h = h[0],
            r = !0;
        try {
            h.call(e.exports, function(a) {
                return d(g[b][1][a] || a)
            }, e, e.exports, outer, g, f, a), r = !1
        } finally {
            r ? delete f[b] : v && (f[v] = f[b])
        }
        return f[b].exports
    }
    var d = function() {
            return this
        }(),
        h;
    for (h in a) a[h] ? d[a[h]] = b(h) : b(h);
    b.duo = !0;
    b.cache = f;
    b.modules = g;
    return b
})({
    1: [function(c, g, f) {
        f = window.trekkie || [];
        var a = c("segmentio/analytics.js-core"),
            b = c("./integrations");
        c = c("each");
        g.exports = a;
        for (c(b, function(b, d) {
                a.use(d)
            }); f && 0 < f.length;) g = f.shift(), c = g.shift(), a[c] && a[c].apply(a, g)
    }, {
        "segmentio/analytics.js-core": 2,
        "./integrations": 3,
        each: 4
    }],
    2: [function(c, g, f) {
        f = c("./analytics");
        (g.exports = f = new f).require = c;
        f.VERSION = c("../bower.json").version
    }, {
        "./analytics": 5,
        "../bower.json": 6
    }],
    5: [function(c, g, f) {
        function a() {
            this._options({});
            this.Integrations = {};
            this._integrations = {};
            this._readied = !1;
            this._timeout = 300;
            this._user = y;
            this.log = q("analytics.js");
            h(this);
            var a = this;
            this.on("initialize", function(b, d) {
                d.initialPageview && a.page();
                a._parseQuery(window.location.search)
            })
        }
        var b = window.analytics,
            e = c("emitter");
        f = c("facade");
        var d = c("after"),
            h = c("bind-all"),
            k = c("callback"),
            m = c("clone"),
            l = c("./cookie"),
            q = c("debug"),
            v = c("defaults"),
            r = c("each"),
            u = c("foldl"),
            t = c("./group"),
            p = c("is"),
            w = c("is-meta"),
            z = c("object").keys,
            x = c("./memory"),
            A = c("./normalize"),
            n = c("event").bind,
            B = c("./pageDefaults"),
            C = c("pick"),
            D = c("prevent"),
            F = c("querystring"),
            G = c("object").length,
            E = c("./store"),
            y = c("./user"),
            H = f.Alias,
            I = f.Group,
            J = f.Identify,
            K = f.Page,
            L = f.Track;
        f = g.exports = a;
        f.cookie = l;
        f.store = E;
        f.memory = x;
        e(a.prototype);
        a.prototype.use = function(a) {
            a(this);
            return this
        };
        a.prototype.addIntegration = function(a) {
            var b = a.prototype.name;
            if (!b) throw new TypeError("attempted to add an invalid integration");
            this.Integrations[b] = a;
            return this
        };
        a.prototype.init = a.prototype.initialize = function(a, b) {
            a = a || {};
            b = b || {};
            this._options(b);
            this._readied = !1;
            var e = this;
            r(a, function(b) {
                e.Integrations[b] ||
                    delete a[b]
            });
            r(a, function(a, b) {
                var d = new e.Integrations[a](m(b));
                e.log("initialize %o - %o", a, b);
                e.add(d)
            });
            var h = this._integrations;
            y.load();
            t.load();
            var l = d(G(h), function() {
                e._readied = !0;
                e.emit("ready")
            });
            r(h, function(a, h) {
                b.initialPageview && !1 === h.options.initialPageview && (h.page = d(2, h.page));
                h.analytics = e;
                h.once("ready", l);
                h.initialize()
            });
            this.initialized = !0;
            this.emit("initialize", a, b);
            return this
        };
        a.prototype.setAnonymousId = function(a) {
            this.user().anonymousId(a);
            return this
        };
        a.prototype.add =
            function(a) {
                this._integrations[a.name] = a;
                return this
            };
        a.prototype.identify = function(a, b, d, e) {
            p.fn(d) && (e = d, d = null);
            p.fn(b) && (e = b, b = d = null);
            p.object(a) && (d = b, b = a, a = y.id());
            y.identify(a, b);
            var h = this.normalize({
                options: d,
                traits: y.traits(),
                userId: y.id()
            });
            this._invoke("identify", new J(h));
            this.emit("identify", a, b, d);
            this._callback(e);
            return this
        };
        a.prototype.user = function() {
            return y
        };
        a.prototype.group = function(a, b, d, e) {
            if (!arguments.length) return t;
            p.fn(d) && (e = d, d = null);
            p.fn(b) && (e = b, b = d = null);
            p.object(a) &&
                (d = b, b = a, a = t.id());
            t.identify(a, b);
            var h = this.normalize({
                options: d,
                traits: t.traits(),
                groupId: t.id()
            });
            this._invoke("group", new I(h));
            this.emit("group", a, b, d);
            this._callback(e);
            return this
        };
        a.prototype.track = function(a, b, d, e) {
            p.fn(d) && (e = d, d = null);
            p.fn(b) && (e = b, b = d = null);
            var h = this.options.plan || {},
                h = h.track || {},
                l = this.normalize({
                    properties: b,
                    options: d,
                    event: a
                });
            if (h = h[a]) {
                this.log("plan %o - %o", a, h);
                if (!1 === h.enabled) return this._callback(e);
                v(l.integrations, h.integrations || {})
            }
            this._invoke("track",
                new L(l));
            this.emit("track", a, b, d);
            this._callback(e);
            return this
        };
        a.prototype.trackClick = a.prototype.trackLink = function(a, b, d) {
            if (!a) return this;
            p.element(a) && (a = [a]);
            var e = this;
            r(a, function(a) {
                if (!p.element(a)) throw new TypeError("Must pass HTMLElement to `analytics.trackLink`.");
                n(a, "click", function(h) {
                    var l = p.fn(b) ? b(a) : b,
                        c = p.fn(d) ? d(a) : d,
                        m = a.getAttribute("href") || a.getAttributeNS("http://www.w3.org/1999/xlink", "href") || a.getAttribute("xlink:href");
                    e.track(l, c);
                    m && "_blank" !== a.target && !w(h) && (D(h),
                        e._callback(function() {
                            window.location.href = m
                        }))
                })
            });
            return this
        };
        a.prototype.trackSubmit = a.prototype.trackForm = function(a, b, d) {
            if (!a) return this;
            p.element(a) && (a = [a]);
            var e = this;
            r(a, function(a) {
                function h(l) {
                    D(l);
                    l = p.fn(b) ? b(a) : b;
                    var c = p.fn(d) ? d(a) : d;
                    e.track(l, c);
                    e._callback(function() {
                        a.submit()
                    })
                }
                if (!p.element(a)) throw new TypeError("Must pass HTMLElement to `analytics.trackForm`.");
                var l = window.jQuery || window.Zepto;
                l ? l(a).submit(h) : n(a, "submit", h)
            });
            return this
        };
        a.prototype.page = function(a, b,
            d, e, h) {
            p.fn(e) && (h = e, e = null);
            p.fn(d) && (h = d, e = d = null);
            p.fn(b) && (h = b, e = d = b = null);
            p.object(a) && (e = b, d = a, b = a = null);
            p.object(b) && (e = d, d = b, b = null);
            p.string(a) && !p.string(b) && (b = a, a = null);
            d = m(d) || {};
            b && (d.name = b);
            a && (d.category = a);
            var l = B();
            v(d, l);
            l = C(z(l), d);
            p.empty(l) || (e = e || {}, e.context = e.context || {}, e.context.page = l);
            l = this.normalize({
                properties: d,
                category: a,
                options: e,
                name: b
            });
            this._invoke("page", new K(l));
            this.emit("page", a, b, d, e);
            this._callback(h);
            return this
        };
        a.prototype.pageview = function(a) {
            var b = {};
            a && (b.path = a);
            this.page(b);
            return this
        };
        a.prototype.alias = function(a, b, d, e) {
            p.fn(d) && (e = d, d = null);
            p.fn(b) && (e = b, b = d = null);
            p.object(b) && (d = b, b = null);
            var h = this.normalize({
                options: d,
                previousId: b,
                userId: a
            });
            this._invoke("alias", new H(h));
            this.emit("alias", a, b, d);
            this._callback(e);
            return this
        };
        a.prototype.ready = function(a) {
            if (p.fn(a))
                if (this._readied) k.async(a);
                else this.once("ready", a);
            return this
        };
        a.prototype.timeout = function(a) {
            this._timeout = a
        };
        a.prototype.debug = function(a) {
            !arguments.length || a ?
                q.enable("analytics:" + (a || "*")) : q.disable()
        };
        a.prototype._options = function(a) {
            this.options = a = a || {};
            l.options(a.cookie);
            E.options(a.localStorage);
            y.options(a.user);
            t.options(a.group);
            return this
        };
        a.prototype._callback = function(a) {
            k.async(a, this._timeout);
            return this
        };
        a.prototype._invoke = function(a, b) {
            this.emit("invoke", b);
            r(this._integrations, function(d, e) {
                b.enabled(d) && e.invoke.call(e, a, b)
            });
            return this
        };
        a.prototype.push = function(a) {
            var b = a.shift();
            this[b] && this[b].apply(this, a)
        };
        a.prototype.reset =
            function() {
                this.user().logout();
                this.group().logout()
            };
        a.prototype._parseQuery = function(a) {
            function b(a, d) {
                var e = a.length,
                    h;
                return u(function(b, d, l) {
                    l.substr(0, e) === a && (h = l.substr(e), b[h] = d);
                    return b
                }, {}, d)
            }
            a = F.parse(a);
            var d = b("ajs_trait_", a),
                e = b("ajs_prop_", a);
            a.ajs_uid && this.identify(a.ajs_uid, d);
            a.ajs_event && this.track(a.ajs_event, e);
            a.ajs_aid && y.anonymousId(a.ajs_aid);
            return this
        };
        a.prototype.normalize = function(a) {
            a = A(a, z(this._integrations));
            a.anonymousId && y.anonymousId(a.anonymousId);
            a.anonymousId =
                y.anonymousId();
            a.context.page = v(a.context.page || {}, B());
            return a
        };
        a.prototype.noConflict = function() {
            window.analytics = b;
            return this
        }
    }, {
        emitter: 7,
        facade: 8,
        after: 9,
        "bind-all": 10,
        callback: 11,
        clone: 12,
        "./cookie": 13,
        debug: 14,
        defaults: 15,
        each: 4,
        foldl: 16,
        "./group": 17,
        is: 18,
        "is-meta": 19,
        object: 20,
        "./memory": 21,
        "./normalize": 22,
        event: 23,
        "./pageDefaults": 24,
        pick: 25,
        prevent: 26,
        querystring: 27,
        "./store": 28,
        "./user": 29
    }],
    7: [function(c, g, f) {
        function a(b) {
            if (b) {
                for (var d in a.prototype) b[d] = a.prototype[d];
                return b
            }
        }
        var b = c("indexof");
        g.exports = a;
        a.prototype.on = a.prototype.addEventListener = function(a, b) {
            this._callbacks = this._callbacks || {};
            (this._callbacks[a] = this._callbacks[a] || []).push(b);
            return this
        };
        a.prototype.once = function(a, b) {
            function h() {
                c.off(a, h);
                b.apply(this, arguments)
            }
            var c = this;
            this._callbacks = this._callbacks || {};
            b._off = h;
            this.on(a, h);
            return this
        };
        a.prototype.off = a.prototype.removeListener = a.prototype.removeAllListeners = a.prototype.removeEventListener = function(a, d) {
            this._callbacks = this._callbacks || {};
            if (0 == arguments.length) return this._callbacks = {}, this;
            var h = this._callbacks[a];
            if (!h) return this;
            if (1 == arguments.length) return delete this._callbacks[a], this;
            var c = b(h, d._off || d);
            ~c && h.splice(c, 1);
            return this
        };
        a.prototype.emit = function(a) {
            this._callbacks = this._callbacks || {};
            var b = [].slice.call(arguments, 1),
                h = this._callbacks[a];
            if (h)
                for (var h = h.slice(0), c = 0, m = h.length; c < m; ++c) h[c].apply(this, b);
            return this
        };
        a.prototype.listeners = function(a) {
            this._callbacks = this._callbacks || {};
            return this._callbacks[a] || []
        };
        a.prototype.hasListeners = function(a) {
            return !!this.listeners(a).length
        }
    }, {
        indexof: 30
    }],
    30: [function(c, g, f) {
        g.exports = function(a, b) {
            if (a.indexOf) return a.indexOf(b);
            for (var e = 0; e < a.length; ++e)
                if (a[e] === b) return e;
            return -1
        }
    }, {}],
    8: [function(c, g, f) {
        f = c("./facade");
        g.exports = f;
        f.Alias = c("./alias");
        f.Group = c("./group");
        f.Identify = c("./identify");
        f.Track = c("./track");
        f.Page = c("./page");
        f.Screen = c("./screen")
    }, {
        "./facade": 31,
        "./alias": 32,
        "./group": 33,
        "./identify": 34,
        "./track": 35,
        "./page": 36,
        "./screen": 37
    }],
    31: [function(c, g, f) {
        function a(a, e) {
            e = e || {};
            "clone" in e || (e.clone = !0);
            e.clone && (a = d(a));
            "traverse" in e || (e.traverse = !0);
            a.timestamp = "timestamp" in a ? m(a.timestamp) : new Date;
            e.traverse && b(a);
            this.opts = e;
            this.obj = a
        }
        var b = c("isodate-traverse"),
            e = c("./is-enabled"),
            d = c("./utils").clone,
            h = c("./utils").type;
        f = c("./address");
        var k = c("obj-case"),
            m = c("new-date");
        g.exports = a;
        f(a.prototype);
        a.prototype.proxy = function(a) {
            var b = a.split(".");
            a = b.shift();
            a = this[a] || this.field(a);
            if (!a) return a;
            "function" === typeof a &&
                (a = a.call(this) || {});
            if (0 === b.length) return this.opts.clone ? d(a) : a;
            a = k(a, b.join("."));
            return this.opts.clone ? d(a) : a
        };
        a.prototype.field = function(a) {
            a = this.obj[a];
            return this.opts.clone ? d(a) : a
        };
        a.proxy = function(a) {
            return function() {
                return this.proxy(a)
            }
        };
        a.field = function(a) {
            return function() {
                return this.field(a)
            }
        };
        a.multi = function(a) {
            return function() {
                var b = this.proxy(a + "s");
                if ("array" === h(b)) return b;
                (b = this.proxy(a)) && (b = [this.opts.clone ? d(b) : b]);
                return b || []
            }
        };
        a.one = function(a) {
            return function() {
                var b =
                    this.proxy(a);
                if (b) return b;
                b = this.proxy(a + "s");
                if ("array" === h(b)) return b[0]
            }
        };
        a.prototype.json = function() {
            var a = this.opts.clone ? d(this.obj) : this.obj;
            this.type && (a.type = this.type());
            return a
        };
        a.prototype.options = function(a) {
            var b = this.obj.options || this.obj.context || {},
                b = this.opts.clone ? d(b) : b;
            if (!a) return b;
            if (this.enabled(a)) return b = this.integrations(), b = b[a] || k(b, a), "object" !== typeof b && (b = k(this.options(), a)), "object" === typeof b ? b : {}
        };
        a.prototype.context = a.prototype.options;
        a.prototype.enabled =
            function(a) {
                var b = this.proxy("options.providers.all");
                "boolean" !== typeof b && (b = this.proxy("options.all"));
                "boolean" !== typeof b && (b = this.proxy("integrations.all"));
                "boolean" !== typeof b && (b = !0);
                var b = b && e(a),
                    d = this.integrations();
                d.providers && d.providers.hasOwnProperty(a) && (b = d.providers[a]);
                d.hasOwnProperty(a) && (a = d[a], b = "boolean" === typeof a ? a : !0);
                return !!b
            };
        a.prototype.integrations = function() {
            return this.obj.integrations || this.proxy("options.providers") || this.options()
        };
        a.prototype.active = function() {
            var a =
                this.proxy("options.active");
            if (null === a || void 0 === a) a = !0;
            return a
        };
        a.prototype.anonymousId = function() {
            return this.field("anonymousId") || this.field("sessionId")
        };
        a.prototype.sessionId = a.prototype.anonymousId;
        a.prototype.groupId = a.proxy("options.groupId");
        a.prototype.traits = function(a) {
            var b = this.proxy("options.traits") || {},
                d = this.userId();
            a = a || {};
            d && (b.id = d);
            for (var e in a) d = null == this[e] ? this.proxy("options.traits." + e) : this[e](), null != d && (b[a[e]] = d, delete b[e]);
            return b
        };
        a.prototype.library = function() {
            var a =
                this.proxy("options.library");
            return a ? "string" === typeof a ? {
                name: a,
                version: null
            } : a : {
                name: "unknown",
                version: null
            }
        };
        a.prototype.device = function() {
            var a = this.proxy("context.device");
            "object" !== h(a) && (a = {});
            var b = this.library().name;
            if (a.type) return a; - 1 < b.indexOf("ios") && (a.type = "ios"); - 1 < b.indexOf("android") && (a.type = "android");
            return a
        };
        a.prototype.userAgent = a.proxy("context.userAgent");
        a.prototype.timezone = a.proxy("context.timezone");
        a.prototype.timestamp = a.field("timestamp");
        a.prototype.channel =
            a.field("channel");
        a.prototype.ip = a.proxy("context.ip");
        a.prototype.userId = a.field("userId")
    }, {
        "isodate-traverse": 38,
        "./is-enabled": 39,
        "./utils": 40,
        "./address": 41,
        "obj-case": 42,
        "new-date": 43
    }],
    38: [function(c, g, f) {
        function a(a, h) {
            void 0 === h && (h = !0);
            return d.object(a) ? b(a, h) : d.array(a) ? e(a, h) : a
        }

        function b(b, e) {
            k(b, function(c, k) {
                h.is(k, e) ? b[c] = h.parse(k) : (d.object(k) || d.array(k)) && a(k, e)
            });
            return b
        }

        function e(b, e) {
            k(b, function(c, k) {
                d.object(c) ? a(c, e) : h.is(c, e) && (b[k] = h.parse(c))
            });
            return b
        }
        var d = c("is"),
            h = c("isodate"),
            k;
        try {
            k = c("each")
        } catch (m) {
            k = c("each-component")
        }
        g.exports = a
    }, {
        is: 44,
        isodate: 45,
        each: 4
    }],
    44: [function(c, g, f) {
        function a(a) {
            return function(d) {
                return a === b(d)
            }
        }
        g = c("is-empty");
        try {
            var b = c("type")
        } catch (h) {
            b = c("component-type")
        }
        c = "arguments array boolean date element function null number object regexp string undefined".split(" ");
        for (var e = 0, d; d = c[e]; e++) f[d] = a(d);
        f.fn = f["function"];
        f.empty = g;
        f.nan = function(a) {
            return f.number(a) && a != a
        }
    }, {
        "is-empty": 46,
        type: 47,
        "component-type": 47
    }],
    46: [function(c,
        g, f) {
        g.exports = function(b) {
            if (null == b) return !0;
            if ("boolean" == typeof b) return !1;
            if ("number" == typeof b) return 0 === b;
            if (void 0 !== b.length) return 0 === b.length;
            for (var e in b)
                if (a.call(b, e)) return !1;
            return !0
        };
        var a = Object.prototype.hasOwnProperty
    }, {}],
    47: [function(c, g, f) {
        var a = Object.prototype.toString;
        g.exports = function(b) {
            switch (a.call(b)) {
                case "[object Date]":
                    return "date";
                case "[object RegExp]":
                    return "regexp";
                case "[object Arguments]":
                    return "arguments";
                case "[object Array]":
                    return "array";
                case "[object Error]":
                    return "error"
            }
            if (null ===
                b) return "null";
            if (void 0 === b) return "undefined";
            if (b !== b) return "nan";
            if (b && 1 === b.nodeType) return "element";
            if (null != b && (b._isBuffer || b.constructor && "function" === typeof b.constructor.isBuffer && b.constructor.isBuffer(b))) return "buffer";
            b = b.valueOf ? b.valueOf() : Object.prototype.valueOf.apply(b);
            return typeof b
        }
    }, {}],
    45: [function(c, g, f) {
        var a = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
        f.parse = function(b) {
            var e = [1,
                    5, 6, 7, 11, 12
                ],
                d = a.exec(b),
                h = 0;
            if (!d) return new Date(b);
            b = 0;
            for (var c; c = e[b]; b++) d[c] = parseInt(d[c], 10) || 0;
            d[2] = parseInt(d[2], 10) || 1;
            d[3] = parseInt(d[3], 10) || 1;
            d[2]--;
            d[8] = d[8] ? (d[8] + "00").substring(0, 3) : 0;
            " " == d[4] ? h = (new Date).getTimezoneOffset() : "Z" !== d[9] && d[10] && (h = 60 * d[11] + d[12], "+" == d[10] && (h = 0 - h));
            e = Date.UTC(d[1], d[2], d[3], d[5], d[6] + h, d[7], d[8]);
            return new Date(e)
        };
        f.is = function(b, e) {
            return e && !1 === /^\d{4}-\d{2}-\d{2}/.test(b) ? !1 : a.test(b)
        }
    }, {}],
    4: [function(c, g, f) {
        function a(a, b) {
            for (var e = 0; e <
                a.length; ++e) b(a[e], e)
        }
        var b = c("type"),
            e = Object.prototype.hasOwnProperty;
        g.exports = function(d, h) {
            switch (b(d)) {
                case "array":
                    return a(d, h);
                case "object":
                    if ("number" == typeof d.length) return a(d, h);
                    for (var c in d) e.call(d, c) && h(c, d[c]);
                    break;
                case "string":
                    for (c = 0; c < d.length; ++c) h(d.charAt(c), c)
            }
        }
    }, {
        type: 47
    }],
    39: [function(c, g, f) {
        var a = {
            Salesforce: !0
        };
        g.exports = function(b) {
            return !a[b]
        }
    }, {}],
    40: [function(c, g, f) {
        try {
            f.inherit = c("inherit"), f.clone = c("clone"), f.type = c("type")
        } catch (a) {
            f.inherit = c("inherit-component"),
                f.clone = c("clone-component"), f.type = c("type-component")
        }
    }, {
        inherit: 48,
        clone: 49,
        type: 47
    }],
    48: [function(c, g, f) {
        g.exports = function(a, b) {
            var e = function() {};
            e.prototype = b.prototype;
            a.prototype = new e;
            a.prototype.constructor = a
        }
    }, {}],
    49: [function(c, g, f) {
        function a(e) {
            switch (b(e)) {
                case "object":
                    var d = {},
                        h;
                    for (h in e) Object.prototype.hasOwnProperty.call(e, h) && (d[h] = a(e[h]));
                    return d;
                case "array":
                    d = Array(e.length);
                    h = 0;
                    for (var c = e.length; h < c; h++) d[h] = a(e[h]);
                    return d;
                case "regexp":
                    return d = "" + (e.multiline ? "m" :
                        ""), d += e.global ? "g" : "", d += e.ignoreCase ? "i" : "", new RegExp(e.source, d);
                case "date":
                    return new Date(e.getTime());
                default:
                    return e
            }
        }
        var b;
        try {
            b = c("component-type")
        } catch (e) {
            b = c("type")
        }
        g.exports = a
    }, {
        "component-type": 47,
        type: 47
    }],
    41: [function(c, g, f) {
        var a = c("obj-case");
        g.exports = function(b) {
            function e(b, e) {
                return function() {
                    var c = this.traits(),
                        m = this.properties ? this.properties() : {};
                    return a(c, "address." + b) || a(c, b) || (e ? a(c, "address." + e) : null) || (e ? a(c, e) : null) || a(m, "address." + b) || a(m, b) || (e ? a(m, "address." +
                        e) : null) || (e ? a(m, e) : null)
                }
            }
            b.zip = e("postalCode", "zip");
            b.country = e("country");
            b.street = e("street");
            b.state = e("state");
            b.city = e("city");
            b.region = e("region")
        }
    }, {
        "obj-case": 42
    }],
    42: [function(c, g, f) {
        function a(a) {
            return function(b, e, c, f) {
                function g() {
                    for (u in b) {
                        var a = r(u);
                        if (0 === e.indexOf(a) && (a = e.substr(a.length), "." === a.charAt(0) || 0 === a.length)) {
                            e = a.substr(1);
                            a = b[u];
                            if (null == a) {
                                t = !0;
                                return
                            }
                            if (!e.length) {
                                t = !0;
                                return
                            }
                            b = a;
                            return
                        }
                    }
                    u = void 0;
                    t = !0
                }
                var r = f && "function" === typeof f.normalizer ? f.normalizer : d;
                e = r(e);
                for (var u, t = !1; !t;) g();
                if (u) return null == b ? b : a(b, u, c)
            }
        }

        function b(a, b) {
            a.hasOwnProperty(b) && delete a[b];
            return a
        }

        function e(a, b, d) {
            a.hasOwnProperty(b) && (a[b] = d);
            return a
        }

        function d(a) {
            return a.replace(/[^a-zA-Z0-9\.]+/g, "").toLowerCase()
        }
        g.exports = a(function(a, b) {
            if (a.hasOwnProperty(b)) return a[b]
        });
        g.exports.find = g.exports;
        g.exports.replace = function(b, d, c, l) {
            a(e).call(this, b, d, c, l);
            return b
        };
        g.exports.del = function(d, e, c) {
            a(b).call(this, d, e, null, c);
            return d
        }
    }, {}],
    43: [function(c, g, f) {
        var a =
            c("is"),
            b = c("isodate"),
            e = c("./milliseconds"),
            d = c("./seconds");
        g.exports = function(h) {
            if (a.date(h)) return h;
            if (a.number(h)) {
                var c = Date;
                return new c(315576E5 > h ? 1E3 * h : h)
            }
            return b.is(h) ? b.parse(h) : e.is(h) ? e.parse(h) : d.is(h) ? d.parse(h) : new Date(h)
        }
    }, {
        is: 50,
        isodate: 45,
        "./milliseconds": 51,
        "./seconds": 52
    }],
    50: [function(c, g, f) {
        function a(a) {
            return function(d) {
                return a === b(d)
            }
        }
        g = c("is-empty");
        var b = c("type");
        c = "arguments array boolean date element function null number object regexp string undefined".split(" ");
        for (var e = 0, d; d = c[e]; e++) f[d] = a(d);
        f.fn = f["function"];
        f.empty = g;
        f.nan = function(a) {
            return f.number(a) && a != a
        }
    }, {
        "is-empty": 46,
        type: 47
    }],
    51: [function(c, g, f) {
        var a = /\d{13}/;
        f.is = function(b) {
            return a.test(b)
        };
        f.parse = function(a) {
            a = parseInt(a, 10);
            return new Date(a)
        }
    }, {}],
    52: [function(c, g, f) {
        var a = /\d{10}/;
        f.is = function(b) {
            return a.test(b)
        };
        f.parse = function(a) {
            a = 1E3 * parseInt(a, 10);
            return new Date(a)
        }
    }, {}],
    32: [function(c, g, f) {
        function a(a, d) {
            b.call(this, a, d)
        }
        f = c("./utils").inherit;
        var b = c("./facade");
        g.exports =
            a;
        f(a, b);
        a.prototype.action = function() {
            return "alias"
        };
        a.prototype.type = a.prototype.action;
        a.prototype.previousId = function() {
            return this.field("previousId") || this.field("from")
        };
        a.prototype.from = a.prototype.previousId;
        a.prototype.userId = function() {
            return this.field("userId") || this.field("to")
        };
        a.prototype.to = a.prototype.userId
    }, {
        "./utils": 40,
        "./facade": 31
    }],
    33: [function(c, g, f) {
        function a(a, b) {
            d.call(this, a, b)
        }
        f = c("./utils").inherit;
        var b = c("is-email"),
            e = c("new-date"),
            d = c("./facade");
        g.exports = a;
        f(a,
            d);
        a.prototype.action = function() {
            return "group"
        };
        a.prototype.type = a.prototype.action;
        a.prototype.groupId = d.field("groupId");
        a.prototype.created = function() {
            var a = this.proxy("traits.createdAt") || this.proxy("traits.created") || this.proxy("properties.createdAt") || this.proxy("properties.created");
            if (a) return e(a)
        };
        a.prototype.email = function() {
            var a = this.proxy("traits.email");
            if (a) return a;
            a = this.groupId();
            if (b(a)) return a
        };
        a.prototype.traits = function(a) {
            var b = this.properties(),
                d = this.groupId();
            a = a || {};
            d &&
                (b.id = d);
            for (var e in a) d = null == this[e] ? this.proxy("traits." + e) : this[e](), null != d && (b[a[e]] = d, delete b[e]);
            return b
        };
        a.prototype.name = d.proxy("traits.name");
        a.prototype.industry = d.proxy("traits.industry");
        a.prototype.employees = d.proxy("traits.employees");
        a.prototype.properties = function() {
            return this.field("traits") || this.field("properties") || {}
        }
    }, {
        "./utils": 40,
        "is-email": 53,
        "new-date": 43,
        "./facade": 31
    }],
    53: [function(c, g, f) {
        g.exports = function(b) {
            return a.test(b)
        };
        var a = /.+\@.+\..+/
    }, {}],
    34: [function(c,
        g, f) {
        function a(a, d) {
            b.call(this, a, d)
        }
        var b = c("./facade"),
            e = c("is-email"),
            d = c("new-date");
        f = c("./utils");
        var h = c("obj-case"),
            k = c("trim");
        c = f.inherit;
        var m = f.type;
        g.exports = a;
        c(a, b);
        a.prototype.action = function() {
            return "identify"
        };
        a.prototype.type = a.prototype.action;
        a.prototype.traits = function(a) {
            var b = this.field("traits") || {},
                d = this.userId();
            a = a || {};
            d && (b.id = d);
            for (var e in a) d = null == this[e] ? this.proxy("traits." + e) : this[e](), null != d && (b[a[e]] = d, e !== a[e] && delete b[e]);
            return b
        };
        a.prototype.email = function() {
            var a =
                this.proxy("traits.email");
            if (a) return a;
            a = this.userId();
            if (e(a)) return a
        };
        a.prototype.created = function() {
            var a = this.proxy("traits.created") || this.proxy("traits.createdAt");
            if (a) return d(a)
        };
        a.prototype.companyCreated = function() {
            var a = this.proxy("traits.company.created") || this.proxy("traits.company.createdAt");
            if (a) return d(a)
        };
        a.prototype.name = function() {
            var a = this.proxy("traits.name");
            if ("string" === typeof a) return k(a);
            var a = this.firstName(),
                b = this.lastName();
            if (a && b) return k(a + " " + b)
        };
        a.prototype.firstName =
            function() {
                var a = this.proxy("traits.firstName");
                if ("string" === typeof a) return k(a);
                a = this.proxy("traits.name");
                if ("string" === typeof a) return k(a).split(" ")[0]
            };
        a.prototype.lastName = function() {
            var a = this.proxy("traits.lastName");
            if ("string" === typeof a) return k(a);
            a = this.proxy("traits.name");
            if ("string" === typeof a) {
                var b = k(a).indexOf(" ");
                if (-1 !== b) return k(a.substr(b + 1))
            }
        };
        a.prototype.uid = function() {
            return this.userId() || this.username() || this.email()
        };
        a.prototype.description = function() {
            return this.proxy("traits.description") ||
                this.proxy("traits.background")
        };
        a.prototype.age = function() {
            var a = this.birthday(),
                b = h(this.traits(), "age");
            if (null != b) return b;
            if ("date" === m(a)) return (new Date).getFullYear() - a.getFullYear()
        };
        a.prototype.avatar = function() {
            var a = this.traits();
            return h(a, "avatar") || h(a, "photoUrl") || h(a, "avatarUrl")
        };
        a.prototype.position = function() {
            var a = this.traits();
            return h(a, "position") || h(a, "jobTitle")
        };
        a.prototype.username = b.proxy("traits.username");
        a.prototype.website = b.one("traits.website");
        a.prototype.websites =
            b.multi("traits.website");
        a.prototype.phone = b.one("traits.phone");
        a.prototype.phones = b.multi("traits.phone");
        a.prototype.address = b.proxy("traits.address");
        a.prototype.gender = b.proxy("traits.gender");
        a.prototype.birthday = b.proxy("traits.birthday")
    }, {
        "./facade": 31,
        "is-email": 53,
        "new-date": 43,
        "./utils": 40,
        "obj-case": 42,
        trim: 54
    }],
    54: [function(c, g, f) {
        f = g.exports = function(a) {
            return a.trim ? a.trim() : a.replace(/^\s*|\s*$/g, "")
        };
        f.left = function(a) {
            return a.trimLeft ? a.trimLeft() : a.replace(/^\s*/, "")
        };
        f.right =
            function(a) {
                return a.trimRight ? a.trimRight() : a.replace(/\s*$/, "")
            }
    }, {}],
    35: [function(c, g, f) {
        function a(a, b) {
            e.call(this, a, b)
        }
        f = c("./utils").inherit;
        var b = c("./utils").type,
            e = c("./facade"),
            d = c("./identify"),
            h = c("is-email"),
            k = c("obj-case");
        g.exports = a;
        f(a, e);
        a.prototype.action = function() {
            return "track"
        };
        a.prototype.type = a.prototype.action;
        a.prototype.event = e.field("event");
        a.prototype.value = e.proxy("properties.value");
        a.prototype.category = e.proxy("properties.category");
        a.prototype.id = e.proxy("properties.id");
        a.prototype.sku = e.proxy("properties.sku");
        a.prototype.tax = e.proxy("properties.tax");
        a.prototype.name = e.proxy("properties.name");
        a.prototype.price = e.proxy("properties.price");
        a.prototype.total = e.proxy("properties.total");
        a.prototype.repeat = e.proxy("properties.repeat");
        a.prototype.coupon = e.proxy("properties.coupon");
        a.prototype.shipping = e.proxy("properties.shipping");
        a.prototype.discount = e.proxy("properties.discount");
        a.prototype.description = e.proxy("properties.description");
        a.prototype.plan = e.proxy("properties.plan");
        a.prototype.orderId = function() {
            return this.proxy("properties.id") || this.proxy("properties.orderId")
        };
        a.prototype.subtotal = function() {
            var a = k(this.properties(), "subtotal"),
                b = this.total();
            if (a) return a;
            if (!b) return 0;
            (a = this.tax()) && (b -= a);
            (a = this.shipping()) && (b -= a);
            (a = this.discount()) && (b += a);
            return b
        };
        a.prototype.products = function() {
            var a = this.properties(),
                a = k(a, "products");
            return "array" === b(a) ? a : []
        };
        a.prototype.quantity = function() {
            return (this.obj.properties || {}).quantity || 1
        };
        a.prototype.currency =
            function() {
                return (this.obj.properties || {}).currency || "USD"
            };
        a.prototype.referrer = function() {
            return this.proxy("context.referrer.url") || this.proxy("context.page.referrer") || this.proxy("properties.referrer")
        };
        a.prototype.query = e.proxy("options.query");
        a.prototype.properties = function(a) {
            var b = this.field("properties") || {};
            a = a || {};
            for (var d in a) {
                var e = null == this[d] ? this.proxy("properties." + d) : this[d]();
                null != e && (b[a[d]] = e, delete b[d])
            }
            return b
        };
        a.prototype.username = function() {
            return this.proxy("traits.username") ||
                this.proxy("properties.username") || this.userId() || this.sessionId()
        };
        a.prototype.email = function() {
            var a = this.proxy("traits.email") || this.proxy("properties.email") || this.proxy("options.traits.email");
            if (a) return a;
            a = this.userId();
            if (h(a)) return a
        };
        a.prototype.revenue = function() {
            var a = this.proxy("properties.revenue"),
                b = this.event();
            !a && b && b.match(/completed ?order/i) && (a = this.proxy("properties.total"));
            a: {
                if (a) {
                    if ("number" === typeof a) break a;
                    if ("string" === typeof a && (a = a.replace(/\$/g, ""), a = parseFloat(a), !isNaN(a))) break a
                }
                a = void 0
            }
            return a
        };
        a.prototype.cents = function() {
            var a = this.revenue();
            return "number" !== typeof a ? this.value() || 0 : 100 * a
        };
        a.prototype.identify = function() {
            var a = this.json();
            a.traits = this.traits();
            return new d(a, this.opts)
        }
    }, {
        "./utils": 40,
        "./facade": 31,
        "./identify": 34,
        "is-email": 53,
        "obj-case": 42
    }],
    36: [function(c, g, f) {
        function a(a, d) {
            b.call(this, a, d)
        }
        f = c("./utils").inherit;
        var b = c("./facade"),
            e = c("./track"),
            d = c("is-email");
        g.exports = a;
        f(a, b);
        a.prototype.action = function() {
            return "page"
        };
        a.prototype.type = a.prototype.action;
        a.prototype.category = b.field("category");
        a.prototype.name = b.field("name");
        a.prototype.title = b.proxy("properties.title");
        a.prototype.path = b.proxy("properties.path");
        a.prototype.url = b.proxy("properties.url");
        a.prototype.referrer = function() {
            return this.proxy("context.referrer.url") || this.proxy("context.page.referrer") || this.proxy("properties.referrer")
        };
        a.prototype.properties = function(a) {
            var b = this.field("properties") || {},
                d = this.category(),
                e = this.name();
            a = a || {};
            d &&
                (b.category = d);
            e && (b.name = e);
            for (var c in a) d = null == this[c] ? this.proxy("properties." + c) : this[c](), null != d && (b[a[c]] = d, c !== a[c] && delete b[c]);
            return b
        };
        a.prototype.email = function() {
            var a = this.proxy("context.traits.email") || this.proxy("properties.email");
            if (a) return a;
            a = this.userId();
            if (d(a)) return a
        };
        a.prototype.fullName = function() {
            var a = this.category(),
                b = this.name();
            return b && a ? a + " " + b : b
        };
        a.prototype.event = function(a) {
            return a ? "Viewed " + a + " Page" : "Loaded a Page"
        };
        a.prototype.track = function(a) {
            var b =
                this.json();
            b.event = this.event(a);
            b.timestamp = this.timestamp();
            b.properties = this.properties();
            return new e(b, this.opts)
        }
    }, {
        "./utils": 40,
        "./facade": 31,
        "./track": 35,
        "is-email": 53
    }],
    37: [function(c, g, f) {
        function a(a, e) {
            b.call(this, a, e)
        }
        f = c("./utils").inherit;
        var b = c("./page"),
            e = c("./track");
        g.exports = a;
        f(a, b);
        a.prototype.action = function() {
            return "screen"
        };
        a.prototype.type = a.prototype.action;
        a.prototype.event = function(a) {
            return a ? "Viewed " + a + " Screen" : "Loaded a Screen"
        };
        a.prototype.track = function(a) {
            var b =
                this.json();
            b.event = this.event(a);
            b.timestamp = this.timestamp();
            b.properties = this.properties();
            return new e(b, this.opts)
        }
    }, {
        "./utils": 40,
        "./page": 36,
        "./track": 35
    }],
    9: [function(c, g, f) {
        g.exports = function(a, b) {
            return 0 >= a ? b() : function() {
                if (1 > --a) return b.apply(this, arguments)
            }
        }
    }, {}],
    10: [function(c, g, f) {
        try {
            var a = c("bind"),
                b = c("type")
        } catch (e) {
            a = c("bind-component"), b = c("type-component")
        }
        g.exports = function(e) {
            for (var d in e) "function" === b(e[d]) && (e[d] = a(e, e[d]));
            return e
        }
    }, {
        bind: 55,
        type: 47
    }],
    55: [function(c,
        g, f) {
        var a = [].slice;
        g.exports = function(b, e) {
            "string" == typeof e && (e = b[e]);
            if ("function" != typeof e) throw Error("bind() requires a function");
            var d = a.call(arguments, 2);
            return function() {
                return e.apply(b, d.concat(a.call(arguments)))
            }
        }
    }, {}],
    11: [function(c, g, f) {
        function a(a) {
            "function" === typeof a && a()
        }
        var b = c("next-tick");
        g.exports = a;
        a.async = function(a, d) {
            if ("function" === typeof a) {
                if (!d) return b(a);
                setTimeout(a, d)
            }
        };
        a.sync = a
    }, {
        "next-tick": 56
    }],
    56: [function(c, g, f) {
        if ("function" == typeof setImmediate) g.exports =
            function(a) {
                setImmediate(a)
            };
        else if ("undefined" != typeof process && "function" == typeof process.nextTick) g.exports = process.nextTick;
        else if ("undefined" == typeof window || window.ActiveXObject || !window.postMessage) g.exports = function(a) {
            setTimeout(a)
        };
        else {
            var a = [];
            window.addEventListener("message", function() {
                for (var b = 0; b < a.length;) try {
                    a[b++]()
                } catch (e) {
                    throw a = a.slice(b), window.postMessage("tic!", "*"), e;
                }
                a.length = 0
            }, !0);
            g.exports = function(b) {
                a.length || window.postMessage("tic!", "*");
                a.push(b)
            }
        }
    }, {}],
    12: [function(c,
        g, f) {
        function a(e) {
            switch (b(e)) {
                case "object":
                    var d = {},
                        c;
                    for (c in e) e.hasOwnProperty(c) && (d[c] = a(e[c]));
                    return d;
                case "array":
                    d = Array(e.length);
                    c = 0;
                    for (var f = e.length; c < f; c++) d[c] = a(e[c]);
                    return d;
                case "regexp":
                    return d = "" + (e.multiline ? "m" : ""), d += e.global ? "g" : "", d += e.ignoreCase ? "i" : "", new RegExp(e.source, d);
                case "date":
                    return new Date(e.getTime());
                default:
                    return e
            }
        }
        var b;
        try {
            b = c("type")
        } catch (e) {
            b = c("type-component")
        }
        g.exports = a
    }, {
        type: 47
    }],
    13: [function(c, g, f) {
        function a(a) {
            this.options(a)
        }
        f = c("bind-all");
        var b = c("clone"),
            e = c("cookie"),
            d = c("debug")("analytics.js:cookie"),
            h = c("defaults"),
            k = c("json"),
            m = c("top-domain");
        a.prototype.options = function(a) {
            if (0 === arguments.length) return this._options;
            a = a || {};
            var b = "." + m(window.location.href);
            "." === b && (b = null);
            this._options = h(a, {
                maxage: 31536E6,
                path: "/",
                domain: b
            });
            this.set("ajs:test", !0);
            this.get("ajs:test") || (d("fallback to domain=null"), this._options.domain = null);
            this.remove("ajs:test")
        };
        a.prototype.set = function(a, d) {
            try {
                return d = k.stringify(d), e(a, d, b(this._options)), !0
            } catch (c) {
                return !1
            }
        };
        a.prototype.get = function(a) {
            try {
                var b = e(a);
                return b = b ? k.parse(b) : null
            } catch (d) {
                return null
            }
        };
        a.prototype.remove = function(a) {
            try {
                return e(a, null, b(this._options)), !0
            } catch (d) {
                return !1
            }
        };
        g.exports = f(new a);
        g.exports.Cookie = a
    }, {
        "bind-all": 10,
        clone: 12,
        cookie: 57,
        debug: 14,
        defaults: 15,
        json: 58,
        "top-domain": 59
    }],
    57: [function(c, g, f) {
        function a(a) {
            var b = {};
            a = a.split(/ *; */);
            var d;
            if ("" == a[0]) return b;
            for (var c = 0; c < a.length; ++c) d = a[c].split("="), b[e(d[0])] = e(d[1]);
            return b
        }

        function b(a) {
            try {
                return encodeURIComponent(a)
            } catch (b) {
                d("error `encode(%o)` - %o",
                    a, b)
            }
        }

        function e(a) {
            try {
                return decodeURIComponent(a)
            } catch (b) {
                d("error `decode(%o)` - %o", a, b)
            }
        }
        var d = c("debug")("cookie");
        g.exports = function(d, e, c) {
            switch (arguments.length) {
                case 3:
                case 2:
                    var f;
                    f = c || {};
                    var g = b(d) + "=" + b(e);
                    null == e && (f.maxage = -1);
                    f.maxage && (f.expires = new Date(+new Date + f.maxage));
                    f.path && (g += "; path=" + f.path);
                    f.domain && (g += "; domain=" + f.domain);
                    f.expires && (g += "; expires=" + f.expires.toUTCString());
                    f.secure && (g += "; secure");
                    document.cookie = g;
                    break;
                case 1:
                    return a(document.cookie)[d];
                default:
                    return a(document.cookie)
            }
        }
    }, {
        debug: 14
    }],
    14: [function(c, g, f) {
        g.exports = "undefined" == typeof window ? c("./lib/debug") : c("./debug")
    }, {
        "./lib/debug": 60,
        "./debug": 61
    }],
    60: [function(c, g, f) {
        c = c("tty");
        g.exports = function(c) {
            function f() {}

            function g(a) {
                a = a instanceof Error ? a.stack || a.message : a;
                var b = new Date,
                    e = b - (d[c] || b);
                d[c] = b;
                b = "  \u001b[9" + u + "m" + c + " \u001b[3" + u + "m\u001b[90m" + a + "\u001b[3" + u + "m +";
                e = 36E5 <= e ? (e / 36E5).toFixed(1) + "h" : 6E4 <= e ? (e / 6E4).toFixed(1) + "m" : 1E3 <= e ? (e / 1E3 | 0) + "s" : e + "ms";
                a = b + e + "\u001b[0m";
                console.error.apply(this, arguments)
            }

            function v(a) {
                a = a instanceof Error ? a.stack || a.message : a;
                a = (new Date).toUTCString() + " " + c + " " + a;
                console.error.apply(this, arguments)
            }
            f.enabled = !1;
            var r = b.some(function(a) {
                return a.test(c)
            });
            if (r) return f;
            r = a.some(function(a) {
                return a.test(c)
            });
            if (!r) return f;
            var u = e[h++ % e.length];
            g.enabled = v.enabled = !0;
            return k || process.env.DEBUG_COLORS ? g : v
        };
        var a = [],
            b = [];
        (process.env.DEBUG || "").split(/[\s,]+/).forEach(function(d) {
            d = d.replace("*", ".*?");
            "-" === d[0] ? b.push(new RegExp("^" +
                d.substr(1) + "$")) : a.push(new RegExp("^" + d + "$"))
        });
        var e = [6, 2, 3, 4, 5, 1],
            d = {},
            h = 0,
            k = c.isatty(2)
    }, {}],
    61: [function(c, g, f) {
        function a(b) {
            return a.enabled(b) ? function(e) {
                e instanceof Error && (e = e.stack || e.message);
                var d = new Date,
                    c = d - (a[b] || d);
                a[b] = d;
                e = b + " " + e + " +" + a.humanize(c);
                window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            } : function() {}
        }
        g.exports = a;
        a.names = [];
        a.skips = [];
        a.enable = function(b) {
            try {
                localStorage.debug = b
            } catch (c) {}
            for (var e = (b || "").split(/[\s,]+/), d =
                    e.length, h = 0; h < d; h++) b = e[h].replace("*", ".*?"), "-" === b[0] ? a.skips.push(new RegExp("^" + b.substr(1) + "$")) : a.names.push(new RegExp("^" + b + "$"))
        };
        a.disable = function() {
            a.enable("")
        };
        a.humanize = function(a) {
            return 36E5 <= a ? (a / 36E5).toFixed(1) + "h" : 6E4 <= a ? (a / 6E4).toFixed(1) + "m" : 1E3 <= a ? (a / 1E3 | 0) + "s" : a + "ms"
        };
        a.enabled = function(b) {
            for (var e = 0, d = a.skips.length; e < d; e++)
                if (a.skips[e].test(b)) return !1;
            e = 0;
            for (d = a.names.length; e < d; e++)
                if (a.names[e].test(b)) return !0;
            return !1
        };
        try {
            window.localStorage && a.enable(localStorage.debug)
        } catch (b) {}
    }, {}],
    15: [function(c, g, f) {
        var a = function(b, e, d) {
            for (var c in e) d && b[c] instanceof Object && e[c] instanceof Object ? b[c] = a(b[c], e[c], !0) : c in b || (b[c] = e[c]);
            return b
        };
        g.exports = a
    }, {}],
    58: [function(c, g, f) {
        f = window.JSON || {};
        var a = f.stringify;
        g.exports = f.parse && a ? JSON : c("json-fallback")
    }, {
        "json-fallback": 62
    }],
    62: [function(c, g, f) {
        (function() {
            function a(a) {
                return 10 > a ? "0" + a : a
            }

            function b(a) {
                f.lastIndex = 0;
                return f.test(a) ? '"' + a.replace(f, function(a) {
                        var b = q[a];
                        return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    }) +
                    '"' : '"' + a + '"'
            }

            function e(a, d) {
                var c, h, f, g, k = m,
                    q, n = d[a];
                n && "object" === typeof n && "function" === typeof n.toJSON && (n = n.toJSON(a));
                "function" === typeof v && (n = v.call(d, a, n));
                switch (typeof n) {
                    case "string":
                        return b(n);
                    case "number":
                        return isFinite(n) ? String(n) : "null";
                    case "boolean":
                    case "null":
                        return String(n);
                    case "object":
                        if (!n) return "null";
                        m += l;
                        q = [];
                        if ("[object Array]" === Object.prototype.toString.apply(n)) {
                            g = n.length;
                            for (c = 0; c < g; c += 1) q[c] = e(c, n) || "null";
                            f = 0 === q.length ? "[]" : m ? "[\n" + m + q.join(",\n" + m) + "\n" +
                                k + "]" : "[" + q.join(",") + "]";
                            m = k;
                            return f
                        }
                        if (v && "object" === typeof v)
                            for (g = v.length, c = 0; c < g; c += 1) "string" === typeof v[c] && (h = v[c], (f = e(h, n)) && q.push(b(h) + (m ? ": " : ":") + f));
                        else
                            for (h in n) Object.prototype.hasOwnProperty.call(n, h) && (f = e(h, n)) && q.push(b(h) + (m ? ": " : ":") + f);
                        f = 0 === q.length ? "{}" : m ? "{\n" + m + q.join(",\n" + m) + "\n" + k + "}" : "{" + q.join(",") + "}";
                        m = k;
                        return f
                }
            }
            var d = g.exports = {};
            "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() +
                    "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                return this.valueOf()
            });
            var c, f, m, l, q, v;
            "function" !== typeof d.stringify && (f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, q = {
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                d.stringify = function(a, b, d) {
                    var c;
                    l = m = "";
                    if ("number" === typeof d)
                        for (c = 0; c < d; c += 1) l += " ";
                    else "string" === typeof d && (l = d);
                    if ((v = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length)) throw Error("JSON.stringify");
                    return e("", {
                        "": a
                    })
                });
            "function" !== typeof d.parse && (c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, d.parse = function(a, b) {
                function d(a, e) {
                    var c, h, f = a[e];
                    if (f && "object" === typeof f)
                        for (c in f) Object.prototype.hasOwnProperty.call(f,
                            c) && (h = d(f, c), void 0 !== h ? f[c] = h : delete f[c]);
                    return b.call(a, e, f)
                }
                var e;
                a = String(a);
                c.lastIndex = 0;
                c.test(a) && (a = a.replace(c, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }));
                if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" === typeof b ? d({
                    "": e
                }, "") : e;
                throw new SyntaxError("JSON.parse");
            })
        })()
    }, {}],
    59: [function(c, g, f) {
        function a(a) {
            var b = f.cookie;
            a = f.levels(a);
            for (var c = 0; c < a.length; ++c) {
                var g = a[c],
                    m = {
                        domain: "." + g
                    };
                b("__tld__", 1, m);
                if (b("__tld__")) return b("__tld__", null, m), g
            }
            return ""
        }
        var b = c("url").parse;
        c = c("cookie");
        f = g.exports = a;
        f.cookie = c;
        a.levels = function(a) {
            a = b(a).hostname.split(".");
            var d = a[a.length - 1],
                c = [];
            if (4 == a.length && parseInt(d, 10) == d || 1 >= a.length) return c;
            for (d = a.length - 2; 0 <= d; --d) c.push(a.slice(d).join("."));
            return c
        }
    }, {
        url: 63,
        cookie: 64
    }],
    63: [function(c, g, f) {
        f.parse = function(a) {
            var b =
                document.createElement("a");
            b.href = a;
            a = b.href;
            var e = b.host || location.host,
                d;
            if ("0" === b.port || "" === b.port) a: switch (b.protocol) {
                case "http:":
                    d = 80;
                    break a;
                case "https:":
                    d = 443;
                    break a;
                default:
                    d = location.port
            } else d = b.port;
            return {
                href: a,
                host: e,
                port: d,
                hash: b.hash,
                hostname: b.hostname || location.hostname,
                pathname: "/" != b.pathname.charAt(0) ? "/" + b.pathname : b.pathname,
                protocol: b.protocol && ":" != b.protocol ? b.protocol : location.protocol,
                search: b.search,
                query: b.search.slice(1)
            }
        };
        f.isAbsolute = function(a) {
            return 0 ==
                a.indexOf("//") || !!~a.indexOf("://")
        };
        f.isRelative = function(a) {
            return !f.isAbsolute(a)
        };
        f.isCrossDomain = function(a) {
            a = f.parse(a);
            var b = f.parse(window.location.href);
            return a.hostname !== b.hostname || a.port !== b.port || a.protocol !== b.protocol
        }
    }, {}],
    64: [function(c, g, f) {
        function a() {
            var a;
            try {
                a = document.cookie
            } catch (b) {
                return "undefined" !== typeof console && "function" === typeof console.error && console.error(b.stack || b), {}
            }
            var d = {};
            a = a.split(/ *; */);
            var c;
            if ("" != a[0])
                for (var f = 0; f < a.length; ++f) c = a[f].split("="),
                    d[e(c[0])] = e(c[1]);
            return d
        }

        function b(a) {
            try {
                return encodeURIComponent(a)
            } catch (b) {
                d("error `encode(%o)` - %o", a, b)
            }
        }

        function e(a) {
            try {
                return decodeURIComponent(a)
            } catch (b) {
                d("error `decode(%o)` - %o", a, b)
            }
        }
        var d = c("debug")("cookie");
        g.exports = function(d, e, c) {
            switch (arguments.length) {
                case 3:
                case 2:
                    var f;
                    f = c || {};
                    var g = b(d) + "=" + b(e);
                    null == e && (f.maxage = -1);
                    f.maxage && (f.expires = new Date(+new Date + f.maxage));
                    f.path && (g += "; path=" + f.path);
                    f.domain && (g += "; domain=" + f.domain);
                    f.expires && (g += "; expires=" +
                        f.expires.toUTCString());
                    f.secure && (g += "; secure");
                    document.cookie = g;
                    break;
                case 1:
                    return a()[d];
                default:
                    return a()
            }
        }
    }, {
        debug: 14
    }],
    16: [function(c, g, f) {
        var a;
        try {
            a = c("@ndhoule/each")
        } catch (b) {
            a = c("each")
        }
        g.exports = function(b, e, d) {
            if ("function" !== typeof b) throw new TypeError("Expected a function but received a " + typeof b);
            a(function(a, d, c) {
                e = b(e, a, d, c)
            }, d);
            return e
        }
    }, {
        each: 65
    }],
    65: [function(c, g, f) {
        var a;
        try {
            a = c("@ndhoule/keys")
        } catch (m) {
            a = c("keys")
        }
        var b = Object.prototype.toString,
            e = function(a) {
                var d =
                    typeof a;
                return "number" === d || "object" === d && "[object Number]" === b.call(a)
            },
            d = "function" === typeof Array.isArray ? Array.isArray : function(a) {
                return "[object Array]" === b.call(a)
            },
            h = function(a, b) {
                for (var d = 0; d < b.length && !1 !== a(b[d], d, b); d += 1);
            },
            k = function(b, d) {
                for (var e = a(d), c = 0; c < e.length && !1 !== b(d[e[c]], e[c], d); c += 1);
            };
        g.exports = function(a, b) {
            return (null != b && (d(b) || "function" !== b && e(b.length)) ? h : k).call(this, a, b)
        }
    }, {
        keys: 66
    }],
    66: [function(c, g, f) {
        var a = String.prototype.charAt,
            b = function(b, d) {
                return a.call(b,
                    d)
            },
            e = Object.prototype.hasOwnProperty,
            d = Object.prototype.toString,
            h = function(a, b) {
                return e.call(a, b)
            },
            k = function(a, b) {
                b = b || h;
                for (var d = [], e = 0, c = a.length; e < c; e += 1) b(a, e) && d.push(String(e));
                return d
            };
        g.exports = function(a) {
            if (null == a) return [];
            if ("[object String]" === d.call(a)) return k(a, b);
            if (null != a && "function" !== typeof a && "number" === typeof a.length) return k(a, h);
            var e;
            e = h;
            var c = [],
                f;
            for (f in a) e(a, f) && c.push(String(f));
            return c
        }
    }, {}],
    17: [function(c, g, f) {
        function a(d) {
            this.defaults = a.defaults;
            this.debug =
                e;
            b.call(this, d)
        }
        var b = c("./entity");
        f = c("bind-all");
        var e = c("debug")("analytics:group");
        c = c("inherit");
        a.defaults = {
            persist: !0,
            cookie: {
                key: "ajs_group_id"
            },
            localStorage: {
                key: "ajs_group_properties"
            }
        };
        c(a, b);
        g.exports = f(new a);
        g.exports.Group = a
    }, {
        "./entity": 67,
        "bind-all": 10,
        debug: 14,
        inherit: 68
    }],
    67: [function(c, g, f) {
        function a(a) {
            this.options(a);
            this.initialize()
        }
        var b = c("clone"),
            e = c("./cookie"),
            d = c("debug")("analytics:entity"),
            h = c("defaults"),
            k = c("extend"),
            m = c("./memory"),
            l = c("./store"),
            q = c("isodate-traverse");
        g.exports = a;
        a.prototype.initialize = function() {
            e.set("ajs:cookies", !0);
            e.get("ajs:cookies") ? (e.remove("ajs:cookies"), this._storage = e) : l.enabled ? this._storage = l : (d("warning using memory store both cookies and localStorage are disabled"), this._storage = m)
        };
        a.prototype.storage = function() {
            return this._storage
        };
        a.prototype.options = function(a) {
            if (0 === arguments.length) return this._options;
            this._options = h(a || {}, this.defaults || {})
        };
        a.prototype.id = function(a) {
            switch (arguments.length) {
                case 0:
                    return this._getId();
                case 1:
                    return this._setId(a)
            }
        };
        a.prototype._getId = function() {
            var a = this._options.persist ? this.storage().get(this._options.cookie.key) : this._id;
            return void 0 === a ? null : a
        };
        a.prototype._setId = function(a) {
            this._options.persist ? this.storage().set(this._options.cookie.key, a) : this._id = a
        };
        a.prototype.properties = a.prototype.traits = function(a) {
            switch (arguments.length) {
                case 0:
                    return this._getTraits();
                case 1:
                    return this._setTraits(a)
            }
        };
        a.prototype._getTraits = function() {
            var a = this._options.persist ? l.get(this._options.localStorage.key) :
                this._traits;
            return a ? q(b(a)) : {}
        };
        a.prototype._setTraits = function(a) {
            a = a || {};
            this._options.persist ? l.set(this._options.localStorage.key, a) : this._traits = a
        };
        a.prototype.identify = function(a, b) {
            b = b || {};
            var d = this.id();
            if (null === d || d === a) b = k(this.traits(), b);
            a && this.id(a);
            this.debug("identify %o, %o", a, b);
            this.traits(b);
            this.save()
        };
        a.prototype.save = function() {
            if (!this._options.persist) return !1;
            e.set(this._options.cookie.key, this.id());
            l.set(this._options.localStorage.key, this.traits());
            return !0
        };
        a.prototype.logout =
            function() {
                this.id(null);
                this.traits({});
                e.remove(this._options.cookie.key);
                l.remove(this._options.localStorage.key)
            };
        a.prototype.reset = function() {
            this.logout();
            this.options({})
        };
        a.prototype.load = function() {
            this.id(e.get(this._options.cookie.key));
            this.traits(l.get(this._options.localStorage.key))
        }
    }, {
        clone: 12,
        "./cookie": 13,
        debug: 14,
        defaults: 15,
        extend: 69,
        "./memory": 21,
        "./store": 28,
        "isodate-traverse": 38
    }],
    69: [function(c, g, f) {
        g.exports = function(a) {
            for (var b = Array.prototype.slice.call(arguments, 1), e =
                    0, d; d = b[e]; e++)
                if (d)
                    for (var c in d) a[c] = d[c];
            return a
        }
    }, {}],
    21: [function(c, g, f) {
        function a() {
            this.store = {}
        }
        f = c("bind-all");
        var b = c("clone"),
            e = Object.prototype.hasOwnProperty;
        g.exports = f(new a);
        a.prototype.set = function(a, e) {
            this.store[a] = b(e);
            return !0
        };
        a.prototype.get = function(a) {
            if (e.call(this.store, a)) return b(this.store[a])
        };
        a.prototype.remove = function(a) {
            delete this.store[a];
            return !0
        }
    }, {
        "bind-all": 10,
        clone: 12
    }],
    28: [function(c, g, f) {
        function a(a) {
            this.options(a)
        }
        f = c("bind-all");
        var b = c("defaults"),
            e = c("store.js");
        a.prototype.options = function(a) {
            if (0 === arguments.length) return this._options;
            a = a || {};
            b(a, {
                enabled: !0
            });
            this.enabled = a.enabled && e.enabled;
            this._options = a
        };
        a.prototype.set = function(a, b) {
            return this.enabled ? e.set(a, b) : !1
        };
        a.prototype.get = function(a) {
            return this.enabled ? e.get(a) : null
        };
        a.prototype.remove = function(a) {
            return this.enabled ? e.remove(a) : !1
        };
        g.exports = f(new a);
        g.exports.Store = a
    }, {
        "bind-all": 10,
        defaults: 15,
        "store.js": 70
    }],
    70: [function(c, g, f) {
        var a = c("json"),
            b = {};
        f = window;
        c = f.document;
        var e;
        b.disabled = !1;
        b.set = function(a, b) {};
        b.get = function(a) {};
        b.remove = function(a) {};
        b.clear = function() {};
        b.transact = function(a, d, e) {
            var c = b.get(a);
            null == e && (e = d, d = null);
            "undefined" == typeof c && (c = d || {});
            e(c);
            b.set(a, c)
        };
        b.getAll = function() {};
        b.serialize = function(b) {
            return a.stringify(b)
        };
        b.deserialize = function(b) {
            if ("string" == typeof b) try {
                return a.parse(b)
            } catch (d) {
                return b || void 0
            }
        };
        var d;
        try {
            d = "localStorage" in f && f.localStorage
        } catch (l) {
            d = !1
        }
        if (d) e = f.localStorage, b.set = function(a, d) {
            if (void 0 ===
                d) return b.remove(a);
            e.setItem(a, b.serialize(d));
            return d
        }, b.get = function(a) {
            return b.deserialize(e.getItem(a))
        }, b.remove = function(a) {
            e.removeItem(a)
        }, b.clear = function() {
            e.clear()
        }, b.getAll = function() {
            for (var a = {}, d = 0; d < e.length; ++d) {
                var c = e.key(d);
                a[c] = b.get(c)
            }
            return a
        };
        else if (c.documentElement.addBehavior) {
            d = function(a) {
                return function() {
                    var d = Array.prototype.slice.call(arguments, 0);
                    d.unshift(e);
                    h.appendChild(e);
                    e.addBehavior("#default#userData");
                    e.load("localStorage");
                    d = a.apply(b, d);
                    h.removeChild(e);
                    return d
                }
            };
            var h, k;
            try {
                k = new ActiveXObject("htmlfile"), k.open(), k.write('<script>document.w=window\x3c/script><iframe src="/favicon.ico"></iframe>'), k.close(), h = k.w.frames[0].document, e = h.createElement("div")
            } catch (l) {
                e = c.createElement("div"), h = c.body
            }
            var m = /[!"#$%&'()*+,/\\:;<=>?@[\]^`{|}~]/g;
            b.set = d(function(a, d, e) {
                d = d.replace(m, "___");
                if (void 0 === e) return b.remove(d);
                a.setAttribute(d, b.serialize(e));
                a.save("localStorage");
                return e
            });
            b.get = d(function(a, d) {
                d = d.replace(m, "___");
                return b.deserialize(a.getAttribute(d))
            });
            b.remove = d(function(a, b) {
                b = b.replace(m, "___");
                a.removeAttribute(b);
                a.save("localStorage")
            });
            b.clear = d(function(a) {
                var b = a.XMLDocument.documentElement.attributes;
                a.load("localStorage");
                for (var d = 0, e; e = b[d]; d++) a.removeAttribute(e.name);
                a.save("localStorage")
            });
            b.getAll = d(function(a) {
                for (var d = a.XMLDocument.documentElement.attributes, e = {}, c = 0, f; f = d[c]; ++c) {
                    var h = f.name.replace(m, "___");
                    e[f.name] = b.deserialize(a.getAttribute(h))
                }
                return e
            })
        }
        try {
            b.set("__storejs__", "__storejs__"), "__storejs__" != b.get("__storejs__") &&
                (b.disabled = !0), b.remove("__storejs__")
        } catch (l) {
            b.disabled = !0
        }
        b.enabled = !b.disabled;
        g.exports = b
    }, {
        json: 58
    }],
    68: [function(c, g, f) {
        g.exports = function(a, b) {
            var e = function() {};
            e.prototype = b.prototype;
            a.prototype = new e;
            a.prototype.constructor = a
        }
    }, {}],
    18: [function(c, g, f) {
        function a(a) {
            return function(d) {
                return a === b(d)
            }
        }
        g = c("is-empty");
        try {
            var b = c("type")
        } catch (h) {
            b = c("component-type")
        }
        c = "arguments array boolean date element function null number object regexp string undefined".split(" ");
        for (var e = 0, d; d =
            c[e]; e++) f[d] = a(d);
        f.fn = f["function"];
        f.empty = g;
        f.nan = function(a) {
            return f.number(a) && a != a
        }
    }, {
        "is-empty": 46,
        type: 47,
        "component-type": 47
    }],
    19: [function(c, g, f) {
        g.exports = function(a) {
            if (a.metaKey || a.altKey || a.ctrlKey || a.shiftKey) return !0;
            var b = a.which;
            a = a.button;
            return b || void 0 === a ? 2 === b ? !0 : !1 : !a & 1 && !a & 2 && a & 4
        }
    }, {}],
    20: [function(c, g, f) {
        var a = Object.prototype.hasOwnProperty;
        f.keys = Object.keys || function(b) {
            var e = [],
                d;
            for (d in b) a.call(b, d) && e.push(d);
            return e
        };
        f.values = function(b) {
            var e = [],
                d;
            for (d in b) a.call(b,
                d) && e.push(b[d]);
            return e
        };
        f.merge = function(b, e) {
            for (var d in e) a.call(e, d) && (b[d] = e[d]);
            return b
        };
        f.length = function(a) {
            return f.keys(a).length
        };
        f.isEmpty = function(a) {
            return 0 == f.length(a)
        }
    }, {}],
    22: [function(c, g, f) {
        var a = c("debug")("analytics.js:normalize"),
            b = c("defaults"),
            e = c("each"),
            d = c("includes"),
            h = c("is"),
            k = c("component/map"),
            m = Object.prototype.hasOwnProperty;
        g.exports = function(c, f) {
            function g(a) {
                return !(!d(a, f) && "all" !== a.toLowerCase() && !d(a.toLowerCase(), u))
            }
            var u = k(f, function(a) {
                    return a.toLowerCase()
                }),
                t = c.options || {},
                p = t.integrations || {},
                w = t.providers || {},
                z = t.context || {},
                x = {};
            a("<-", c);
            e(t, function(a, b) {
                g(a) && (m.call(p, a) || (p[a] = b), delete t[a])
            });
            delete t.providers;
            e(w, function(a, b) {
                g(a) && (h.object(p[a]) || m.call(p, a) && "boolean" === typeof w[a] || (p[a] = b))
            });
            e(t, function(a) {
                d(a, l) ? x[a] = t[a] : z[a] = t[a]
            });
            delete c.options;
            x.integrations = p;
            x.context = z;
            x = b(x, c);
            a("->", x);
            return x
        };
        var l = ["integrations", "anonymousId", "timestamp", "context"]
    }, {
        debug: 14,
        defaults: 15,
        each: 4,
        includes: 71,
        is: 18,
        "component/map": 72
    }],
    71: [function(c, g, f) {
        var a;
        try {
            a = c("@ndhoule/each")
        } catch (e) {
            a = c("each")
        }
        var b = String.prototype.indexOf;
        g.exports = function(e, d) {
            var c = !1;
            if ("string" === typeof d) return -1 !== b.call(d, e);
            a(function(a) {
                a = a === e ? 0 !== a || 1 / a === 1 / e : a !== a && e !== e;
                if (a) return c = !0, !1
            }, d);
            return c
        }
    }, {
        each: 65
    }],
    72: [function(c, g, f) {
        var a = c("to-function");
        g.exports = function(b, e) {
            var d = [];
            e = a(e);
            for (var c = 0; c < b.length; ++c) d.push(e(b[c], c));
            return d
        }
    }, {
        "to-function": 73
    }],
    73: [function(c, g, f) {
        function a(a) {
            switch ({}.toString.call(a)) {
                case "[object Object]":
                    return d(a);
                case "[object Function]":
                    return a;
                case "[object String]":
                    var c;
                    if (/^ *\W+/.test(a)) c = new Function("_", "return _ " + a);
                    else {
                        c = Function;
                        var f = k(a);
                        if (f.length) {
                            var g, r, u;
                            for (r = 0; r < f.length; r++) u = f[r], g = "_." + u, g = "('function' == typeof " + g + " ? " + g + "() : " + g + ")", a = h(u, a, g)
                        } else a = "_." + a;
                        c = new c("_", "return " + a)
                    }
                    return c;
                case "[object RegExp]":
                    return e(a);
                default:
                    return b(a)
            }
        }

        function b(a) {
            return function(b) {
                return a === b
            }
        }

        function e(a) {
            return function(b) {
                return a.test(b)
            }
        }

        function d(d) {
            var e = {},
                c;
            for (c in d) e[c] =
                "string" === typeof d[c] ? b(d[c]) : a(d[c]);
            return function(a) {
                if ("object" !== typeof a) return !1;
                for (var b in e)
                    if (!(b in a && e[b](a[b]))) return !1;
                return !0
            }
        }

        function h(a, b, d) {
            return b.replace(new RegExp("(\\.)?" + a, "g"), function(a, b) {
                return b ? a : d
            })
        }
        var k;
        try {
            k = c("props")
        } catch (m) {
            k = c("component-props")
        }
        g.exports = a
    }, {
        props: 74,
        "component-props": 74
    }],
    74: [function(c, g, f) {
        function a(a, b, e) {
            return a.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g, function(a) {
                return "(" == a[a.length - 1] ? e(a) : ~b.indexOf(a) ?
                    e(a) : a
            })
        }

        function b(a) {
            return function(b) {
                return a + b
            }
        }
        var e = /\b(this|Array|Date|Object|Math|JSON)\b/g;
        g.exports = function(d, c) {
            for (var f = d.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, "").replace(e, "").match(/[$a-zA-Z_]\w*/g) || [], g = [], l = 0; l < f.length; l++) ~g.indexOf(f[l]) || g.push(f[l]);
            c && "string" == typeof c && (c = b(c));
            return c ? a(d, g, c) : g
        }
    }, {}],
    23: [function(c, g, f) {
        f.bind = function(a, b, e, d) {
            a.addEventListener ? a.addEventListener(b, e, d || !1) : a.attachEvent("on" + b, e);
            return e
        };
        f.unbind = function(a, b, e,
            d) {
            a.removeEventListener ? a.removeEventListener(b, e, d || !1) : a.detachEvent("on" + b, e);
            return e
        }
    }, {}],
    24: [function(c, g, f) {
        var a = c("canonical"),
            b = c("includes"),
            e = c("url");
        g.exports = function() {
            var d;
            d = (d = a()) ? e.parse(d).pathname : window.location.pathname;
            var c = document.referrer,
                f = location.search,
                g = document.title,
                l;
            l = location.search;
            var q = a();
            q ? l = b("?", q) ? q : q + l : (l = window.location.href, q = l.indexOf("#"), l = -1 === q ? l : l.slice(0, q));
            return {
                path: d,
                referrer: c,
                search: f,
                title: g,
                url: l
            }
        }
    }, {
        canonical: 75,
        includes: 71,
        url: 76
    }],
    75: [function(c, g, f) {
        g.exports = function() {
            for (var a = document.getElementsByTagName("link"), b = 0, e; e = a[b]; b++)
                if ("canonical" == e.getAttribute("rel")) return e.getAttribute("href")
        }
    }, {}],
    76: [function(c, g, f) {
        f.parse = function(a) {
            var b = document.createElement("a");
            b.href = a;
            a = b.href;
            var e = b.host || location.host,
                d;
            if ("0" === b.port || "" === b.port) a: switch (b.protocol) {
                case "http:":
                    d = 80;
                    break a;
                case "https:":
                    d = 443;
                    break a;
                default:
                    d = location.port
            } else d = b.port;
            return {
                href: a,
                host: e,
                port: d,
                hash: b.hash,
                hostname: b.hostname ||
                    location.hostname,
                pathname: "/" != b.pathname.charAt(0) ? "/" + b.pathname : b.pathname,
                protocol: b.protocol && ":" != b.protocol ? b.protocol : location.protocol,
                search: b.search,
                query: b.search.slice(1)
            }
        };
        f.isAbsolute = function(a) {
            return 0 == a.indexOf("//") || !!~a.indexOf("://")
        };
        f.isRelative = function(a) {
            return !f.isAbsolute(a)
        };
        f.isCrossDomain = function(a) {
            a = f.parse(a);
            var b = f.parse(window.location.href);
            return a.hostname !== b.hostname || a.port !== b.port || a.protocol !== b.protocol
        }
    }, {}],
    25: [function(c, g, f) {
        var a = Object.prototype.toString,
            b = function(b) {
                return "string" === typeof b || "[object String]" === a.call(b)
            };
        g.exports = function(e, d) {
            if (null == d || null == d || "object" !== typeof d) return {};
            b(e) && (e = [e]);
            "[object Array]" !== a.call(e) && (e = []);
            for (var c = {}, f = 0; f < e.length; f += 1) b(e[f]) && e[f] in d && (c[e[f]] = d[e[f]]);
            return c
        }
    }, {}],
    26: [function(c, g, f) {
        g.exports = function(a) {
            a = a || window.event;
            return a.preventDefault ? a.preventDefault() : a.returnValue = !1
        }
    }, {}],
    27: [function(c, g, f) {
        var a = c("trim"),
            b = c("type"),
            e = /(\w+)\[(\d+)\]/,
            d = function(a) {
                try {
                    return encodeURIComponent(a)
                } catch (b) {
                    return a
                }
            },
            h = function(a) {
                try {
                    return decodeURIComponent(a.replace(/\+/g, " "))
                } catch (b) {
                    return a
                }
            };
        f.parse = function(b) {
            if ("string" != typeof b) return {};
            b = a(b);
            if ("" == b) return {};
            "?" == b.charAt(0) && (b = b.slice(1));
            var d = {};
            b = b.split("&");
            for (var c = 0; c < b.length; c++) {
                var f = b[c].split("="),
                    g = h(f[0]);
                (g = e.exec(g)) ? (d[g[1]] = d[g[1]] || [], d[g[1]][g[2]] = h(f[1])) : d[f[0]] = null == f[1] ? "" : h(f[1])
            }
            return d
        };
        f.stringify = function(a) {
            if (!a) return "";
            var e = [],
                c;
            for (c in a) {
                var f = a[c];
                if ("array" == b(f))
                    for (var h = 0; h < f.length; ++h) e.push(d(c +
                        "[" + h + "]") + "=" + d(f[h]));
                else e.push(d(c) + "=" + d(a[c]))
            }
            return e.join("&")
        }
    }, {
        trim: 54,
        type: 77
    }],
    77: [function(c, g, f) {
        var a = Object.prototype.toString;
        g.exports = function(b) {
            switch (a.call(b)) {
                case "[object Date]":
                    return "date";
                case "[object RegExp]":
                    return "regexp";
                case "[object Arguments]":
                    return "arguments";
                case "[object Array]":
                    return "array";
                case "[object Error]":
                    return "error"
            }
            if (null === b) return "null";
            if (void 0 === b) return "undefined";
            if (b !== b) return "nan";
            if (b && 1 === b.nodeType) return "element";
            b = b.valueOf ?
                b.valueOf() : Object.prototype.valueOf.apply(b);
            return typeof b
        }
    }, {}],
    29: [function(c, g, f) {
        function a(e) {
            this.defaults = a.defaults;
            this.debug = d;
            b.call(this, e)
        }
        var b = c("./entity");
        f = c("bind-all");
        var e = c("./cookie"),
            d = c("debug")("analytics:user"),
            h = c("inherit"),
            k = c("cookie"),
            m = c("uuid");
        a.defaults = {
            persist: !0,
            cookie: {
                key: "ajs_user_id",
                oldKey: "ajs_user"
            },
            localStorage: {
                key: "ajs_user_traits"
            }
        };
        h(a, b);
        a.prototype.id = function(a) {
            var d = this._getId(),
                e = b.prototype.id.apply(this, arguments);
            if (null == d) return e;
            d != a && a && this.anonymousId(null);
            return e
        };
        a.prototype.anonymousId = function(a) {
            var b = this.storage();
            if (arguments.length) return b.set("ajs_anonymous_id", a), this;
            if (a = b.get("ajs_anonymous_id")) return a;
            if (a = k("_sio")) return a = a.split("----")[0], b.set("ajs_anonymous_id", a), b.remove("_sio"), a;
            a = m();
            b.set("ajs_anonymous_id", a);
            return b.get("ajs_anonymous_id")
        };
        a.prototype.logout = function() {
            b.prototype.logout.call(this);
            this.anonymousId(null)
        };
        a.prototype.load = function() {
            this._loadOldCookie() || b.prototype.load.call(this)
        };
        a.prototype._loadOldCookie = function() {
            var a = e.get(this._options.cookie.oldKey);
            if (!a) return !1;
            this.id(a.id);
            this.traits(a.traits);
            e.remove(this._options.cookie.oldKey);
            return !0
        };
        g.exports = f(new a);
        g.exports.User = a
    }, {
        "./entity": 67,
        "bind-all": 10,
        "./cookie": 13,
        debug: 14,
        inherit: 68,
        cookie: 57,
        uuid: 78
    }],
    78: [function(c, g, f) {
        g.exports = function b(e) {
            return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1E7] + -1E3 + -4E3 + -8E3 + -1E11).replace(/[018]/g, b)
        }
    }, {}],
    6: [function(c, g, f) {
        g.exports = {
            name: "analytics-core",
            version: "2.11.1",
            main: "analytics.js",
            dependencies: {},
            devDependencies: {}
        }
    }, {}],
    3: [function(c, g, f) {
        g.exports = {
            "google-analytics": c("analytics.js-integration-google-analytics"),
            trekkie: c("../trekkie/integration/trekkie.js"),
            "reports-tracking": c("../trekkie/integration/reports-tracking.js"),
            performance: c("../trekkie/integration/performance.js"),
            "facebook-pixel": c("analytics.js-integration-facebook-pixel"),
            pinterest: c("../trekkie/integration/pinterest.js")
        }
    }, {
        "analytics.js-integration-google-analytics": 79,
        "../trekkie/integration/trekkie.js": 80,
        "../trekkie/integration/reports-tracking.js": 81,
        "../trekkie/integration/performance.js": 82,
        "analytics.js-integration-facebook-pixel": 83,
        "../trekkie/integration/pinterest.js": 84
    }],
    79: [function(c, g, f) {
        function a(a, b) {
            if (a) {
                var d = a.path;
                b.includeSearch && a.search && (d += a.search);
                return d
            }
        }

        function b(a) {
            return !a || 0 > a ? 0 : Math.round(a)
        }

        function e(a, b) {
            var d = {};
            r([b.metrics, b.dimensions, b.contentGroupings], function(b) {
                r(b, function(b, e) {
                    var c = v(a, b) || a[b];
                    t.boolean(c) && (c = c.toString());
                    c && (d[e] = c)
                })
            });
            return d
        }

        function d(a) {
            var b = a.properties(),
                b = {
                    id: a.sku() || a.id(),
                    name: a.name(),
                    category: a.category(),
                    quantity: a.quantity(),
                    price: a.price(),
                    brand: b.brand,
                    variant: b.variant,
                    currency: a.currency()
                };
            if (a = a.proxy("properties.coupon")) b.coupon = a;
            window.ga("ec:addProduct", b)
        }

        function h(a, b, e) {
            d(a);
            window.ga("ec:setAction", b, e || {})
        }

        function k(a) {
            a = z([a.paymentMethod, a.shippingMethod], function(a) {
                return a
            });
            return 0 < a.length ? a.join(", ") : null
        }

        function m(a, b) {
            b.currency = b.currency || a.currency();
            return new l({
                properties: b
            })
        }
        var l = c("facade").Track,
            q = c("defaults"),
            v = c("obj-case"),
            r = c("each"),
            u = c("analytics.js-integration"),
            t = c("is"),
            p = c("object").length,
            w = c("global-queue")("_gaq"),
            z = c("select"),
            x = c("use-https"),
            A;
        g.exports = f = function(a) {
            a.addIntegration(n);
            A = a.user()
        };
        var n = f.Integration = u("Google Analytics").readyOnLoad().global("ga").global("gaplugins").global("_gaq").global("GoogleAnalyticsObject").option("anonymizeIp", !1).option("classic", !1).option("contentGroupings", {}).option("dimensions", {}).option("domain", "auto").option("doubleClick", !1).option("enhancedEcommerce", !1).option("enhancedLinkAttribution", !1).option("ignoredReferrers", null).option("includeSearch", !1).option("metrics", {}).option("nonInteraction", !1).option("sendUserId", !1).option("siteSpeedSampleRate", 1).option("sampleRate", 100).option("trackCategorizedPages", !0).option("trackNamedPages", !0).option("trackingId", "").tag("library", '<script src="//www.google-analytics.com/analytics.js">').tag("double click", '<script src="//stats.g.doubleclick.net/dc.js">').tag("http",
            '<script src="http://www.google-analytics.com/ga.js">').tag("https", '<script src="https://ssl.google-analytics.com/ga.js">');
        n.on("construct", function(a) {
            a.options.classic ? (a.initialize = a.initializeClassic, a.loaded = a.loadedClassic, a.page = a.pageClassic, a.track = a.trackClassic, a.completedOrder = a.completedOrderClassic) : a.options.enhancedEcommerce && (a.viewedProduct = a.viewedProductEnhanced, a.clickedProduct = a.clickedProductEnhanced, a.addedProduct = a.addedProductEnhanced, a.removedProduct = a.removedProductEnhanced,
                a.startedOrder = a.startedOrderEnhanced, a.viewedCheckoutStep = a.viewedCheckoutStepEnhanced, a.completedCheckoutStep = a.completedCheckoutStepEnhanced, a.updatedOrder = a.updatedOrderEnhanced, a.completedOrder = a.completedOrderEnhanced, a.refundedOrder = a.refundedOrderEnhanced, a.viewedPromotion = a.viewedPromotionEnhanced, a.clickedPromotion = a.clickedPromotionEnhanced)
        });
        n.prototype.initialize = function() {
            this.pageCalled = !1;
            var a = this.options;
            window.GoogleAnalyticsObject = "ga";
            window.ga = window.ga || function() {
                window.ga.q =
                    window.ga.q || [];
                window.ga.q.push(arguments)
            };
            window.ga.l = (new Date).getTime();
            "localhost" === window.location.hostname && (a.domain = "none");
            window.ga("create", a.trackingId, {
                cookieDomain: a.domain || n.prototype.defaults.domain,
                siteSpeedSampleRate: a.siteSpeedSampleRate,
                sampleRate: a.sampleRate,
                allowLinker: !0
            });
            a.doubleClick && window.ga("require", "displayfeatures");
            a.enhancedLinkAttribution && window.ga("require", "linkid", "linkid.js");
            a.sendUserId && A.id() && window.ga("set", "userId", A.id());
            a.anonymizeIp && window.ga("set",
                "anonymizeIp", !0);
            a = e(A.traits(), a);
            p(a) && window.ga("set", a);
            this.load("library", this.ready)
        };
        n.prototype.loaded = function() {
            return !!window.gaplugins
        };
        n.prototype.page = function(b) {
            var d = b.category(),
                c = b.properties(),
                f = b.fullName(),
                h = this.options,
                g = b.proxy("context.campaign") || {},
                k = {},
                l = a(c, this.options),
                m = f || c.title,
                q = b.referrer() || "";
            this._category = d;
            k.page = l;
            k.title = m;
            k.location = c.url;
            g.name && (k.campaignName = g.name);
            g.source && (k.campaignSource = g.source);
            g.medium && (k.campaignMedium = g.medium);
            g.content &&
                (k.campaignContent = g.content);
            g.term && (k.campaignKeyword = g.term);
            c = e(c, h);
            p(c) && window.ga("set", c);
            l = {
                page: l,
                title: m
            };
            q !== document.referrer && (l.referrer = q);
            window.ga("set", l);
            this.pageCalled && delete k.location;
            window.ga("send", "pageview", k);
            d && this.options.trackCategorizedPages && (d = b.track(d), this.track(d, {
                nonInteraction: 1
            }));
            f && this.options.trackNamedPages && (d = b.track(f), this.track(d, {
                nonInteraction: 1
            }));
            this.pageCalled = !0
        };
        n.prototype.identify = function(a) {
            var b = this.options;
            b.sendUserId && a.userId() &&
                window.ga("set", "userId", a.userId());
            a = e(A.traits(), b);
            p(a) && window.ga("set", a)
        };
        n.prototype.track = function(a, d) {
            var c = a.options(this.name),
                f = this.options,
                h = q(d || {}, c),
                h = q(h, f),
                g = a.properties(),
                c = a.proxy("context.campaign") || {},
                f = e(g, f);
            p(f) && window.ga("set", f);
            f = {
                eventAction: a.event(),
                eventCategory: a.category() || this._category || "All",
                eventLabel: g.label,
                eventValue: b(g.value || a.revenue()),
                nonInteraction: !(!g.nonInteraction && !h.nonInteraction)
            };
            c.name && (f.campaignName = c.name);
            c.source && (f.campaignSource =
                c.source);
            c.medium && (f.campaignMedium = c.medium);
            c.content && (f.campaignContent = c.content);
            c.term && (f.campaignKeyword = c.term);
            window.ga("send", "event", f)
        };
        n.prototype.completedOrder = function(a) {
            var b = a.total() || a.revenue() || 0,
                d = a.orderId(),
                e = a.products(),
                c = a.properties();
            d && (this.ecommerce || (window.ga("require", "ecommerce"), this.ecommerce = !0), window.ga("ecommerce:addTransaction", {
                affiliation: c.affiliation,
                shipping: a.shipping(),
                revenue: b,
                tax: a.tax(),
                id: d,
                currency: a.currency()
            }), r(e, function(b) {
                b = m(a,
                    b);
                window.ga("ecommerce:addItem", {
                    category: b.category(),
                    quantity: b.quantity(),
                    price: b.price(),
                    name: b.name(),
                    sku: b.sku() || b.id(),
                    id: d,
                    currency: b.currency()
                })
            }), window.ga("ecommerce:send"))
        };
        n.prototype.initializeClassic = function() {
            var a = this.options,
                b = a.anonymizeIp,
                d = a.domain,
                e = a.enhancedLinkAttribution,
                c = a.ignoredReferrers,
                f = a.siteSpeedSampleRate;
            window._gaq = window._gaq || [];
            w("_setAccount", a.trackingId);
            w("_setAllowLinker", !0);
            b && w("_gat._anonymizeIp");
            d && w("_setDomainName", d);
            f && w("_setSiteSpeedSampleRate",
                f);
            e && w("_require", "inpage_linkid", ("https:" === document.location.protocol ? "https:" : "http:") + "//www.google-analytics.com/plugins/ga/inpage_linkid.js");
            c && (t.array(c) || (c = [c]), r(c, function(a) {
                w("_addIgnoredRef", a)
            }));
            this.options.doubleClick ? this.load("double click", this.ready) : (a = x() ? "https" : "http", this.load(a, this.ready))
        };
        n.prototype.loadedClassic = function() {
            return !(!window._gaq || window._gaq.push === Array.prototype.push)
        };
        n.prototype.pageClassic = function(b) {
            var d = b.category(),
                e = b.properties(),
                c = b.fullName();
            w("_trackPageview", a(e, this.options));
            d && this.options.trackCategorizedPages && (d = b.track(d), this.track(d, {
                nonInteraction: 1
            }));
            c && this.options.trackNamedPages && (d = b.track(c), this.track(d, {
                nonInteraction: 1
            }))
        };
        n.prototype.trackClassic = function(a, d) {
            var e = d || a.options(this.name),
                c = a.properties(),
                f = a.revenue(),
                h = a.event(),
                g = this._category || a.category() || "All",
                k = c.label,
                f = b(f || c.value);
            w("_trackEvent", g, h, k, f, !(!c.nonInteraction && !e.nonInteraction))
        };
        n.prototype.completedOrderClassic = function(a) {
            var b =
                a.total() || a.revenue() || 0,
                d = a.orderId(),
                e = a.products() || [],
                c = a.properties(),
                f = a.currency();
            d && (w("_addTrans", d, c.affiliation, b, a.tax(), a.shipping(), a.city(), a.state(), a.country()), r(e, function(a) {
                a = new l({
                    properties: a
                });
                w("_addItem", d, a.sku() || a.id(), a.name(), a.category(), a.price(), a.quantity())
            }), w("_set", "currencyCode", f), w("_trackTrans"))
        };
        n.prototype.loadEnhancedEcommerce = function(a) {
            this.enhancedEcommerceLoaded || (window.ga("require", "ec"), this.enhancedEcommerceLoaded = !0);
            window.ga("set", "&cu",
                a.currency())
        };
        n.prototype.pushEnhancedEcommerce = function(a) {
            a = z(["send", "event", a.category() || "EnhancedEcommerce", a.event() || "Action not defined", a.properties().label, {
                nonInteraction: 1
            }], function(a) {
                return void 0 !== a
            });
            window.ga.apply(window, a)
        };
        n.prototype.startedOrderEnhanced = function(a) {
            this.viewedCheckoutStep(a)
        };
        n.prototype.updatedOrderEnhanced = function(a) {
            this.startedOrderEnhanced(a)
        };
        n.prototype.viewedCheckoutStepEnhanced = function(a) {
            var b = a.products(),
                e = a.properties(),
                c = k(e);
            this.loadEnhancedEcommerce(a);
            r(b, function(b) {
                b = m(a, b);
                d(b)
            });
            window.ga("ec:setAction", "checkout", {
                step: e.step || 1,
                option: c || void 0
            });
            this.pushEnhancedEcommerce(a)
        };
        n.prototype.completedCheckoutStepEnhanced = function(a) {
            var b = a.properties(),
                d = k(b);
            b.step && d && (this.loadEnhancedEcommerce(a), window.ga("ec:setAction", "checkout_option", {
                step: b.step || 1,
                option: d
            }), window.ga("send", "event", "Checkout", "Option"))
        };
        n.prototype.completedOrderEnhanced = function(a) {
            var b = a.total() || a.revenue() || 0,
                e = a.orderId(),
                c = a.products(),
                f = a.properties();
            e && (this.loadEnhancedEcommerce(a), r(c, function(b) {
                b = m(a, b);
                d(b)
            }), window.ga("ec:setAction", "purchase", {
                id: e,
                affiliation: f.affiliation,
                revenue: b,
                tax: a.tax(),
                shipping: a.shipping(),
                coupon: a.coupon()
            }), this.pushEnhancedEcommerce(a))
        };
        n.prototype.refundedOrderEnhanced = function(a) {
            var b = a.orderId(),
                d = a.products();
            b && (this.loadEnhancedEcommerce(a), r(d, function(a) {
                a = new l({
                    properties: a
                });
                window.ga("ec:addProduct", {
                    id: a.sku() || a.id(),
                    quantity: a.quantity()
                })
            }), window.ga("ec:setAction", "refund", {
                id: b
            }), this.pushEnhancedEcommerce(a))
        };
        n.prototype.addedProductEnhanced = function(a) {
            this.loadEnhancedEcommerce(a);
            h(a, "add");
            this.pushEnhancedEcommerce(a)
        };
        n.prototype.removedProductEnhanced = function(a) {
            this.loadEnhancedEcommerce(a);
            h(a, "remove");
            this.pushEnhancedEcommerce(a)
        };
        n.prototype.viewedProductEnhanced = function(a) {
            var b = a.properties(),
                d = {};
            this.loadEnhancedEcommerce(a);
            b.list && (d.list = b.list);
            h(a, "detail", d);
            this.pushEnhancedEcommerce(a)
        };
        n.prototype.clickedProductEnhanced = function(a) {
            var b = a.properties(),
                d = {};
            this.loadEnhancedEcommerce(a);
            b.list && (d.list = b.list);
            h(a, "click", d);
            this.pushEnhancedEcommerce(a)
        };
        n.prototype.viewedPromotionEnhanced = function(a) {
            var b = a.properties();
            this.loadEnhancedEcommerce(a);
            window.ga("ec:addPromo", {
                id: a.id(),
                name: a.name(),
                creative: b.creative,
                position: b.position
            });
            this.pushEnhancedEcommerce(a)
        };
        n.prototype.clickedPromotionEnhanced = function(a) {
            var b = a.properties();
            this.loadEnhancedEcommerce(a);
            window.ga("ec:addPromo", {
                id: a.id(),
                name: a.name(),
                creative: b.creative,
                position: b.position
            });
            window.ga("ec:setAction",
                "promo_click", {});
            this.pushEnhancedEcommerce(a)
        }
    }, {
        facade: 8,
        defaults: 85,
        "obj-case": 42,
        each: 4,
        "analytics.js-integration": 86,
        is: 18,
        object: 20,
        "global-queue": 87,
        select: 88,
        "use-https": 89
    }],
    85: [function(c, g, f) {
        g.exports = function(a, b) {
            for (var e in b) e in a || (a[e] = b[e]);
            return a
        }
    }, {}],
    86: [function(c, g, f) {
        var a = c("bind"),
            b = c("clone"),
            e = c("debug"),
            d = c("defaults"),
            h = c("extend"),
            k = c("slug"),
            m = c("./protos"),
            l = c("./statics");
        g.exports = function(c) {
            function f(h) {
                if (h && h.addIntegration) return h.addIntegration(f);
                this.debug = e("analytics:integration:" + k(c));
                this.options = d(b(h) || {}, this.defaults);
                this._queue = [];
                this.once("ready", a(this, this.flush));
                f.emit("construct", this);
                this.ready = a(this, this.ready);
                this._wrapInitialize();
                this._wrapPage();
                this._wrapTrack()
            }
            f.prototype.defaults = {};
            f.prototype.globals = [];
            f.prototype.templates = {};
            f.prototype.name = c;
            h(f, l);
            h(f.prototype, m);
            return f
        }
    }, {
        bind: 55,
        clone: 12,
        debug: 90,
        defaults: 15,
        extend: 91,
        slug: 92,
        "./protos": 93,
        "./statics": 94
    }],
    90: [function(c, g, f) {
        g.exports = "undefined" ==
            typeof window ? c("./lib/debug") : c("./debug")
    }, {
        "./lib/debug": 95,
        "./debug": 96
    }],
    95: [function(c, g, f) {
        c = c("tty");
        g.exports = function(c) {
            function f() {}

            function g(a) {
                a = a instanceof Error ? a.stack || a.message : a;
                var b = new Date,
                    e = b - (d[c] || b);
                d[c] = b;
                b = "  \u001b[9" + u + "m" + c + " \u001b[3" + u + "m\u001b[90m" + a + "\u001b[3" + u + "m +";
                e = 36E5 <= e ? (e / 36E5).toFixed(1) + "h" : 6E4 <= e ? (e / 6E4).toFixed(1) + "m" : 1E3 <= e ? (e / 1E3 | 0) + "s" : e + "ms";
                a = b + e + "\u001b[0m";
                console.error.apply(this, arguments)
            }

            function v(a) {
                a = a instanceof Error ? a.stack || a.message :
                    a;
                a = (new Date).toUTCString() + " " + c + " " + a;
                console.error.apply(this, arguments)
            }
            f.enabled = !1;
            var r = b.some(function(a) {
                return a.test(c)
            });
            if (r) return f;
            r = a.some(function(a) {
                return a.test(c)
            });
            if (!r) return f;
            var u = e[h++ % e.length];
            g.enabled = v.enabled = !0;
            return k || process.env.DEBUG_COLORS ? g : v
        };
        var a = [],
            b = [];
        (process.env.DEBUG || "").split(/[\s,]+/).forEach(function(d) {
            d = d.replace("*", ".*?");
            "-" === d[0] ? b.push(new RegExp("^" + d.substr(1) + "$")) : a.push(new RegExp("^" + d + "$"))
        });
        var e = [6, 2, 3, 4, 5, 1],
            d = {},
            h = 0,
            k = c.isatty(2)
    }, {}],
    96: [function(c, g, f) {
        function a(b) {
            return a.enabled(b) ? function(e) {
                e instanceof Error && (e = e.stack || e.message);
                var d = new Date,
                    c = d - (a[b] || d);
                a[b] = d;
                e = b + " " + e + " +" + a.humanize(c);
                window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            } : function() {}
        }
        g.exports = a;
        a.names = [];
        a.skips = [];
        a.enable = function(b) {
            try {
                localStorage.debug = b
            } catch (c) {}
            for (var e = (b || "").split(/[\s,]+/), d = e.length, f = 0; f < d; f++) b = e[f].replace("*", ".*?"), "-" === b[0] ? a.skips.push(new RegExp("^" + b.substr(1) +
                "$")) : a.names.push(new RegExp("^" + b + "$"))
        };
        a.disable = function() {
            a.enable("")
        };
        a.humanize = function(a) {
            return 36E5 <= a ? (a / 36E5).toFixed(1) + "h" : 6E4 <= a ? (a / 6E4).toFixed(1) + "m" : 1E3 <= a ? (a / 1E3 | 0) + "s" : a + "ms"
        };
        a.enabled = function(b) {
            for (var e = 0, d = a.skips.length; e < d; e++)
                if (a.skips[e].test(b)) return !1;
            e = 0;
            for (d = a.names.length; e < d; e++)
                if (a.names[e].test(b)) return !0;
            return !1
        };
        try {
            window.localStorage && a.enable(localStorage.debug)
        } catch (b) {}
    }, {}],
    91: [function(c, g, f) {
        g.exports = function(a) {
            for (var b = Array.prototype.slice.call(arguments,
                    1), e = 0, d; d = b[e]; e++)
                if (d)
                    for (var c in d) a[c] = d[c];
            return a
        }
    }, {}],
    92: [function(c, g, f) {
        g.exports = function(a, b) {
            b || (b = {});
            return a.toLowerCase().replace(b.replace || /[^a-z0-9]/g, " ").replace(/^ +| +$/g, "").replace(/ +/g, b.separator || "-")
        }
    }, {}],
    93: [function(c, g, f) {
        function a() {}

        function b(a) {
            return x.array(a) ? z(e, a) ? "mixed" : "array" : x.object(a) ? "map" : "unknown"
        }

        function e(a) {
            return x.object(a) && x.string(a.key) && A.call(a, "value") ? !0 : !1
        }

        function d(a, b) {
            b = b || function() {};
            var d = new Image;
            d.onerror = h(b, "failed to load pixel",
                d);
            d.onload = function() {
                b()
            };
            d.src = a.src;
            d.width = 1;
            d.height = 1;
            return d
        }

        function h(a, b, d) {
            return function(e) {
                e = e || window.event;
                var c = Error(b);
                c.event = e;
                c.source = d;
                a(c)
            }
        }

        function k(a, b) {
            return r(function(a, d, e) {
                a[e] = d.replace(/\{\{\ *(\w+)\ *\}\}/g, function(a, d) {
                    return b[d]
                });
                return a
            }, {}, a.attrs)
        }
        g = c("emitter");
        var m = c("after"),
            l = c("each"),
            q = c("analytics-events"),
            v = c("fmt"),
            r = c("foldl"),
            u = c("load-iframe"),
            t = c("load-script"),
            p = c("to-no-case"),
            w = c("next-tick"),
            z = c("every"),
            x = c("is"),
            A = Object.prototype.hasOwnProperty,
            n = window.onerror,
            B = window.setInterval,
            C = window.setTimeout;
        g(f);
        f.initialize = function() {
            w(this.ready)
        };
        f.loaded = function() {
            return !1
        };
        f.page = function(a) {};
        f.track = function(a) {};
        f.map = function(a, d) {
            var e = p(d),
                c = b(a);
            return "unknown" === c ? [] : r(function(a, b, d) {
                var f, h;
                "map" === c && (f = d, h = b);
                "array" === c && (h = f = b);
                "mixed" === c && (f = b.key, h = b.value);
                p(f) === e && a.push(h);
                return a
            }, [], a)
        };
        f.invoke = function(a) {
            if (this[a]) {
                var b = Array.prototype.slice.call(arguments, 1);
                if (!this._ready) return this.queue(a, b);
                var d;
                try {
                    this.debug("%s with %o",
                        a, b), d = this[a].apply(this, b)
                } catch (e) {
                    this.debug("error %o calling %s with %o", e, a, b)
                }
                return d
            }
        };
        f.queue = function(a, b) {
            if ("page" === a && this._assumesPageview && !this._initialized) return this.page.apply(this, b);
            this._queue.push({
                method: a,
                args: b
            })
        };
        f.flush = function() {
            this._ready = !0;
            var a = this;
            l(this._queue, function(b) {
                a[b.method].apply(a, b.args)
            });
            this._queue.length = 0
        };
        f.reset = function() {
            for (var a = 0; a < this.globals.length; a++) window[this.globals[a]] = void 0;
            window.setTimeout = C;
            window.setInterval = B;
            window.onerror =
                n;
            window.onload = null
        };
        f.load = function(b, e, c) {
            "function" === typeof b && (c = b, b = e = null);
            b && "object" === typeof b && (c = e, e = b, b = null);
            "function" === typeof e && (c = e, e = null);
            b = b || "library";
            e = e || {};
            e = this.locals(e);
            var f = this.templates[b];
            if (!f) throw Error(v('template "%s" not defined.', b));
            b = k(f, e);
            c = c || a;
            var h = this,
                g;
            switch (f.type) {
                case "img":
                    b.width = 1;
                    b.height = 1;
                    g = d(b, c);
                    break;
                case "script":
                    g = t(b, function(a) {
                        if (!a) return c();
                        h.debug('error loading "%s" error="%s"', h.name, a)
                    });
                    delete b.src;
                    l(b, function(a, b) {
                        g.setAttribute(a,
                            b)
                    });
                    break;
                case "iframe":
                    g = u(b, c)
            }
            return g
        };
        f.locals = function(a) {
            a = a || {};
            var b = Math.floor((new Date).getTime() / 36E5);
            a.hasOwnProperty("cache") || (a.cache = b);
            l(this.options, function(b, d) {
                a.hasOwnProperty(b) || (a[b] = d)
            });
            return a
        };
        f.ready = function() {
            this.emit("ready")
        };
        f._wrapInitialize = function() {
            var a = this.initialize;
            this.initialize = function() {
                this.debug("initialize");
                this._initialized = !0;
                var b = a.apply(this, arguments);
                this.emit("initialize");
                return b
            };
            this._assumesPageview && (this.initialize = m(2, this.initialize))
        };
        f._wrapPage = function() {
            var a = this.page;
            this.page = function() {
                return this._assumesPageview && !this._initialized ? this.initialize.apply(this, arguments) : a.apply(this, arguments)
            }
        };
        f._wrapTrack = function() {
            var a = this.track;
            this.track = function(b) {
                var d = b.event(),
                    e, c, f;
                for (f in q)
                    if (A.call(q, f)) {
                        var h = q[f];
                        if (this[f] && h.test(d)) {
                            c = this[f].apply(this, arguments);
                            e = !0;
                            break
                        }
                    }
                e || (c = a.apply(this, arguments));
                return c
            }
        }
    }, {
        emitter: 7,
        after: 9,
        each: 97,
        "analytics-events": 98,
        fmt: 99,
        foldl: 16,
        "load-iframe": 100,
        "load-script": 101,
        "to-no-case": 102,
        "next-tick": 56,
        every: 103,
        is: 104
    }],
    97: [function(c, g, f) {
        try {
            var a = c("type")
        } catch (d) {
            a = c("component-type")
        }
        var b = c("to-function"),
            e = Object.prototype.hasOwnProperty;
        g.exports = function(d, c, f) {
            c = b(c);
            f = f || this;
            switch (a(d)) {
                case "array":
                    var g = c;
                    for (c = 0; c < d.length; ++c) g.call(f, d[c], c);
                    break;
                case "object":
                    if ("number" == typeof d.length) {
                        g = c;
                        for (c = 0; c < d.length; ++c) g.call(f, d[c], c);
                        break
                    }
                    for (g in d) e.call(d, g) && c.call(f, g, d[g]);
                    break;
                case "string":
                    for (g = c, c = 0; c < d.length; ++c) g.call(f, d.charAt(c),
                        c)
            }
        }
    }, {
        type: 105,
        "component-type": 105,
        "to-function": 73
    }],
    105: [function(c, g, f) {
        var a = Object.prototype.toString;
        g.exports = function(b) {
            switch (a.call(b)) {
                case "[object Function]":
                    return "function";
                case "[object Date]":
                    return "date";
                case "[object RegExp]":
                    return "regexp";
                case "[object Arguments]":
                    return "arguments";
                case "[object Array]":
                    return "array";
                case "[object String]":
                    return "string"
            }
            return null === b ? "null" : void 0 === b ? "undefined" : b && 1 === b.nodeType ? "element" : b === Object(b) ? "object" : typeof b
        }
    }, {}],
    98: [function(c,
        g, f) {
        g.exports = {
            removedProduct: /^[ _]?removed[ _]?product[ _]?$/i,
            viewedProduct: /^[ _]?viewed[ _]?product[ _]?$/i,
            viewedProductCategory: /^[ _]?viewed[ _]?product[ _]?category[ _]?$/i,
            addedProduct: /^[ _]?added[ _]?product[ _]?$/i,
            completedOrder: /^[ _]?completed[ _]?order[ _]?$/i,
            startedOrder: /^[ _]?started[ _]?order[ _]?$/i,
            updatedOrder: /^[ _]?updated[ _]?order[ _]?$/i,
            refundedOrder: /^[ _]?refunded?[ _]?order[ _]?$/i,
            viewedProductDetails: /^[ _]?viewed[ _]?product[ _]?details?[ _]?$/i,
            clickedProduct: /^[ _]?clicked[ _]?product[ _]?$/i,
            viewedPromotion: /^[ _]?viewed[ _]?promotion?[ _]?$/i,
            clickedPromotion: /^[ _]?clicked[ _]?promotion?[ _]?$/i,
            viewedCheckoutStep: /^[ _]?viewed[ _]?checkout[ _]?step[ _]?$/i,
            completedCheckoutStep: /^[ _]?completed[ _]?checkout[ _]?step[ _]?$/i
        }
    }, {}],
    99: [function(c, g, f) {
        function a(b) {
            var e = [].slice.call(arguments, 1),
                d = 0;
            return b.replace(/%([a-z])/gi, function(b, c) {
                return a[c] ? a[c](e[d++]) : b + c
            })
        }
        c = window.JSON ? JSON.stringify : function(a) {
            return String(a)
        };
        g.exports = a;
        a.o = c;
        a.s = String;
        a.d = parseInt
    }, {}],
    100: [function(c,
        g, f) {
        var a = c("script-onload"),
            b = c("next-tick"),
            e = c("type");
        g.exports = function(d, c) {
            if (!d) throw Error("Cant load nothing...");
            "string" == e(d) && (d = {
                src: d
            });
            var f = "https:" === document.location.protocol || "chrome-extension:" === document.location.protocol;
            d.src && 0 === d.src.indexOf("//") && (d.src = f ? "https:" + d.src : "http:" + d.src);
            f && d.https ? d.src = d.https : !f && d.http && (d.src = d.http);
            var g = document.createElement("iframe");
            g.src = d.src;
            g.width = d.width || 1;
            g.height = d.height || 1;
            g.style.display = "none";
            "function" == e(c) &&
                a(g, c);
            b(function() {
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(g, a)
            });
            return g
        }
    }, {
        "script-onload": 106,
        "next-tick": 56,
        type: 47
    }],
    106: [function(c, g, f) {
        function a(a, b) {
            a.addEventListener("load", function(a, c) {
                b(null, c)
            }, !1);
            a.addEventListener("error", function(c) {
                var f = Error('script error "' + a.src + '"');
                f.event = c;
                b(f)
            }, !1)
        }

        function b(a, b) {
            a.attachEvent("onreadystatechange", function(c) {
                /complete|loaded/.test(a.readyState) && b(null, c)
            });
            a.attachEvent("onerror", function(c) {
                var f =
                    Error('failed to load the script "' + a.src + '"');
                f.event = c || window.event;
                b(f)
            })
        }
        g.exports = function(c, d) {
            return c.addEventListener ? a(c, d) : b(c, d)
        }
    }, {}],
    101: [function(c, g, f) {
        var a = c("script-onload"),
            b = c("next-tick"),
            e = c("type");
        g.exports = function(d, c) {
            if (!d) throw Error("Cant load nothing...");
            "string" == e(d) && (d = {
                src: d
            });
            var f = "https:" === document.location.protocol || "chrome-extension:" === document.location.protocol;
            d.src && 0 === d.src.indexOf("//") && (d.src = f ? "https:" + d.src : "http:" + d.src);
            f && d.https ? d.src = d.https :
                !f && d.http && (d.src = d.http);
            var g = document.createElement("script");
            g.type = "text/javascript";
            g.async = !0;
            g.src = d.src;
            "function" == e(c) && a(g, c);
            b(function() {
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(g, a)
            });
            return g
        }
    }, {
        "script-onload": 106,
        "next-tick": 56,
        type: 47
    }],
    102: [function(c, g, f) {
        function a(a) {
            return a.replace(h, function(a, b) {
                return b ? " " + b : ""
            })
        }

        function b(a) {
            return a.replace(k, function(a, b, d) {
                return b + " " + d.toLowerCase().split("").join(" ")
            })
        }
        g.exports = function(c) {
            return e.test(c) ?
                c.toLowerCase() : d.test(c) ? a(c).toLowerCase() : b(c).toLowerCase()
        };
        var e = /\s/,
            d = /[\W_]/,
            h = /[\W_]+(.|$)/g,
            k = /(.)([A-Z]+)/g
    }, {}],
    103: [function(c, g, f) {
        var a;
        try {
            a = c("@ndhoule/each")
        } catch (b) {
            a = c("each")
        }
        g.exports = function(b, c) {
            if ("function" !== typeof b) throw new TypeError("`predicate` must be a function but was a " + typeof b);
            var d = !0;
            a(function(a, c, e) {
                d = !!b(a, c, e);
                if (!d) return !1
            }, c);
            return d
        }
    }, {
        each: 65
    }],
    104: [function(c, g, f) {
        function a(a) {
            return function(d) {
                return a === b(d)
            }
        }
        g = c("is-empty");
        try {
            var b = c("type")
        } catch (h) {
            b =
                c("component-type")
        }
        c = "arguments array boolean date element function null number object regexp string undefined".split(" ");
        for (var e = 0, d; d = c[e]; e++) f[d] = a(d);
        f.fn = f["function"];
        f.empty = g;
        f.nan = function(a) {
            return f.number(a) && a != a
        }
    }, {
        "is-empty": 46,
        type: 47,
        "component-type": 47
    }],
    94: [function(c, g, f) {
        function a(a) {
            a = a.replace(' src="', ' data-src="');
            var c = b(a),
                f = {};
            e(c.attributes, function(b) {
                var c = "data-src" === b.name ? "src" : b.name;
                d(b.name + "=", a) && (f[c] = b.value)
            });
            return {
                type: c.tagName.toLowerCase(),
                attrs: f
            }
        }
        g = c("emitter");
        var b = c("domify"),
            e = c("each"),
            d = c("includes");
        g(f);
        f.option = function(a, b) {
            this.prototype.defaults[a] = b;
            return this
        };
        f.mapping = function(a) {
            this.option(a, []);
            this.prototype[a] = function(b) {
                return this.map(this.options[a], b)
            };
            return this
        };
        f.global = function(a) {
            this.prototype.globals.push(a);
            return this
        };
        f.assumesPageview = function() {
            this.prototype._assumesPageview = !0;
            return this
        };
        f.readyOnLoad = function() {
            this.prototype._readyOnLoad = !0;
            return this
        };
        f.readyOnInitialize = function() {
            this.prototype._readyOnInitialize = !0;
            return this
        };
        f.tag = function(b, d) {
            null == d && (d = b, b = "library");
            this.prototype.templates[b] = a(d);
            return this
        }
    }, {
        emitter: 7,
        domify: 107,
        each: 97,
        includes: 71
    }],
    107: [function(c, g, f) {
        g.exports = function(b, c) {
            if ("string" != typeof b) throw new TypeError("String expected");
            c || (c = document);
            var d = /<([\w:]+)/.exec(b);
            if (!d) return c.createTextNode(b);
            b = b.replace(/^\s+|\s+$/g, "");
            d = d[1];
            if ("body" == d) return d = c.createElement("html"), d.innerHTML = b, d.removeChild(d.lastChild);
            var d = a[d] || a._default,
                f = d[0],
                g = d[1],
                m = d[2],
                d = c.createElement("div");
            for (d.innerHTML = g + b + m; f--;) d = d.lastChild;
            if (d.firstChild == d.lastChild) return d.removeChild(d.firstChild);
            for (f = c.createDocumentFragment(); d.firstChild;) f.appendChild(d.removeChild(d.firstChild));
            return f
        };
        c = document.createElement("div");
        c.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
        g = !c.getElementsByTagName("link").length;
        c = void 0;
        var a = {
            legend: [1, "<fieldset>", "</fieldset>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>",
                "</colgroup></table>"
            ],
            _default: g ? [1, "X<div>", "</div>"] : [0, "", ""]
        };
        a.td = a.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"];
        a.option = a.optgroup = [1, '<select multiple="multiple">', "</select>"];
        a.thead = a.tbody = a.colgroup = a.caption = a.tfoot = [1, "<table>", "</table>"];
        a.polyline = a.ellipse = a.polygon = a.circle = a.text = a.line = a.path = a.rect = a.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', "</svg>"]
    }, {}],
    87: [function(c, g, f) {
        g.exports = function(a, b) {
            b = b || {};
            return function(c) {
                c = [].slice.call(arguments);
                window[a] || (window[a] = []);
                !1 === b.wrap ? window[a].push.apply(window[a], c) : window[a].push(c)
            }
        }
    }, {}],
    88: [function(c, g, f) {
        var a = c("to-function");
        g.exports = function(b, c) {
            var d = [];
            c = a(c);
            for (var f = 0; f < b.length; ++f) c(b[f], f) && d.push(b[f]);
            return d
        }
    }, {
        "to-function": 73
    }],
    89: [function(c, g, f) {
        function a() {
            return "https:" == location.protocol || "chrome-extension:" == location.protocol
        }
        g.exports = function(b) {
            switch (arguments.length) {
                case 0:
                    return a();
                case 1:
                    return a() ? "https:" + b : "http:" + b
            }
        }
    }, {}],
    80: [function(c, g, f) {
        f =
            c("analytics.js-integration");
        var a = c("./../trekkie.js");
        c = g.exports = f("Trekkie").option("appName").option("environment", "production").option("navigationTimingApiMeasurementsEnabled", !1).option("navigationTimingApiMeasurementsSampleRate", .5).option("defaultAttributes", {});
        c.prototype.initialize = function() {
            this.trekkie = new a(this.options.appName, this._merge(this.options.defaultAttributes, {
                environment: this.options.environment
            }));
            this.ready()
        };
        c.prototype.identify = function(a) {
            a = this._merge(a.traits(), {
                id: a.userId(),
                eventType: "identify"
            });
            this.trekkie.emit("identify", a)
        };
        c.prototype.track = function(a) {
            a = this._merge(a.properties(), {
                event: a.event(),
                eventType: "track"
            });
            this.trekkie.emit("track", a)
        };
        c.prototype.page = function(a) {
            a = this._merge(a.properties(), {
                category: a.category(),
                name: a.name(),
                eventType: "page"
            });
            this.trekkie.emit("page", a)
        };
        c.prototype.alias = function(a) {
            a = {
                id: a.userId(),
                token: a.previousId(),
                eventType: "alias"
            };
            this.trekkie.emit("alias", a)
        };
        c.prototype._merge = function(a, c) {
            var d = function(a,
                    b) {
                    for (var d in b) a[d] = b[d];
                    return a
                },
                f = d({}, a);
            return d(f, c)
        }
    }, {
        "analytics.js-integration": 86,
        "./../trekkie.js": 108
    }],
    108: [function(c, g, f) {
        function a(a, d) {
            if (!a) throw "appName argument is required to initialize Trekkie.";
            this.appName = a;
            d = d ? d : {};
            this.environment = d.environment || "production";
            delete d.environment;
            this.defaultAttributes = this._merge(d, {
                hasUniqCookie: b.hasUniqCookie() ? 1 : 0,
                hasVisitCookie: b.hasVisitCookie() ? 1 : 0,
                visitToken: b.visitToken(),
                uniqToken: b.uniqToken(),
                microSessionId: b.buildUniqToken(),
                microSessionCount: 0,
                firstSeen: b.firstSeen(),
                appName: a
            });
            this.request = e;
            window._visit = {
                multitrackToken: b.uniqToken
            }
        }
        var b = c("./lib/token.js"),
            e = c("./lib/request.js"),
            d = c("./lib/events.js");
        a.prototype.emit = function(a, b) {
            this.defaultAttributes.microSessionCount += 1;
            var c = this._merge(this.defaultAttributes, this._sanitize(b)),
                c = this._merge(c, d.additionalParamsFromEvent(b.event));
            if ("production" === this.environment) return this.request.load(this.appName, a, c);
            console.log("Logging trekkie " + a + " event to " +
                this.appName + " with:");
            console.log(c)
        };
        a.prototype._sanitize = function(a) {
            var b = {},
                d;
            for (d in a) a[d] && (b[d] = a[d]);
            return b
        };
        a.prototype._merge = function(a, b) {
            var d = function(a, b) {
                    for (var d in b) a[d] = b[d];
                    return a
                },
                c = d({}, a);
            return d(c, b)
        };
        g.exports = a
    }, {
        "./lib/token.js": 109,
        "./lib/request.js": 110,
        "./lib/events.js": 111
    }],
    109: [function(c, g, f) {
        var a = c("./cookie.js"),
            b = c("./store.js"),
            e = {
                _uniqueId: {
                    fetch: function(d, c) {
                        var e = {
                                permanent: d
                            },
                            f = a.read(c),
                            e = b.read(c, e);
                        return f || e
                    },
                    fetchOrSet: function(d) {
                        var c =
                            d ? "_y" : "_s",
                            f = d ? "_shopify_y" : "_shopify_s",
                            g = e._uniqueId.fetch(d, c) || e._uniqueId.fetch(d, f) || e._uniqueId.build();
                        d = {
                            permanent: d
                        };
                        a.write(c, g, d);
                        a.write(f, g, d);
                        b.write(c, g, d);
                        b.write(f, g, d);
                        return g
                    },
                    generateWeakUUID: function() {
                        return "xxxxxxxx-xxxx-4xxx-xxxx".replace(/[x]/g, function(a) {
                            var b = 16 * Math.random() | 0;
                            return ("x" === a ? b : b & 3 | 8).toString(16)
                        }).toUpperCase()
                    },
                    generateStrongUUID: function(a) {
                        var b = 0;
                        return "xxxxxxxx-xxxx-4xxx-xxxx".replace(/[x]/g, function(c) {
                            var e = a[b] % 16;
                            b++;
                            return ("x" === c ? e : e & 3 |
                                8).toString(16)
                        }).toUpperCase()
                    },
                    build: function() {
                        if (a.isEnabled()) try {
                            var b = window.crypto || window.msCrypto,
                                c = new Uint16Array(19);
                            b.getRandomValues(c);
                            return e._uniqueId.generateStrongUUID(c)
                        } catch (f) {
                            return e._uniqueId.generateWeakUUID()
                        } else return "00000000-0000-0000-4000-000000000000"
                    }
                },
                _firstSeen: {
                    fetch: function() {
                        var d = a.read("_shopify_fs"),
                            c = b.read("_shopify_fs", {
                                permanent: !0
                            });
                        return d || c
                    },
                    fetchOrSet: function() {
                        var d = e._firstSeen.fetch() || (new Date).toISOString(),
                            c = {
                                permanent: !0
                            };
                        a.write("_shopify_fs",
                            d, c);
                        b.write("_shopify_fs", d, c);
                        return d
                    }
                },
                hasShortTerm: function() {
                    return !!a.read("_shopify_s") || !!a.read("_s")
                },
                hasLongTerm: function() {
                    return !!a.read("_shopify_y") || !!a.read("_y")
                },
                shortTerm: function() {
                    return e._uniqueId.fetchOrSet(!1)
                },
                longTerm: function() {
                    return e._uniqueId.fetchOrSet(!0)
                },
                hasFirstSeen: function() {
                    return !!a.read("_shopify_fs")
                },
                firstSeen: function() {
                    return e._firstSeen.fetchOrSet()
                }
            };
        f.visitToken = e.shortTerm;
        f.uniqToken = e.longTerm;
        f.hasUniqCookie = e.hasLongTerm;
        f.hasVisitCookie = e.hasShortTerm;
        f.buildUniqToken = e._uniqueId.build;
        f.hasFirstSeen = e.hasFirstSeen;
        f.firstSeen = e.firstSeen
    }, {
        "./cookie.js": 112,
        "./store.js": 113
    }],
    112: [function(c, g, f) {
        var a = c("cookie"),
            b = c("./utils.js"),
            e = {
                read: function(b) {
                    return a(b)
                },
                writeForDomain: function(b, c, f, g) {
                    f = {
                        maxage: e._maxage(f),
                        domain: g,
                        path: "/"
                    };
                    a(b, c, f)
                },
                write: function(a, b, c) {
                    e.isEnabled() && (c = c || {}, e.writeForDomain(a, b, c.permanent, e.shopifyCookieDomain(window.location.hostname)), e.writeForDomain(a, b, c.permanent, ".myshopify.com"), e.writeForDomain(a,
                        b, c.permanent, c.domain))
                },
                _maxage: function(a) {
                    return a ? 62208E6 : 18E5
                },
                shopifyCookieDomain: function(a) {
                    var c = a.indexOf("shopify");
                    return -1 !== c ? b.startsWith(a, "shopify") ? "." + a : a.slice(c - 1) : ".shopify.com"
                },
                isEnabled: function() {
                    return window.navigator.cookieEnabled
                }
            };
        f.read = e.read;
        f.write = e.write;
        f.shopifyCookieDomain = e.shopifyCookieDomain;
        f.isEnabled = e.isEnabled
    }, {
        cookie: 114,
        "./utils.js": 115
    }],
    114: [function(c, g, f) {
        function a() {
            var a;
            try {
                a = document.cookie
            } catch (b) {
                return "undefined" !== typeof console && "function" ===
                    typeof console.error && console.error(b.stack || b), {}
            }
            var c = {};
            a = a.split(/ *; */);
            var d;
            if ("" != a[0])
                for (var f = 0; f < a.length; ++f) d = a[f].split("="), c[e(d[0])] = e(d[1]);
            return c
        }

        function b(a) {
            try {
                return encodeURIComponent(a)
            } catch (b) {
                d("error `encode(%o)` - %o", a, b)
            }
        }

        function e(a) {
            try {
                return decodeURIComponent(a)
            } catch (b) {
                d("error `decode(%o)` - %o", a, b)
            }
        }
        var d = c("debug")("cookie");
        g.exports = function(c, d, e) {
            switch (arguments.length) {
                case 3:
                case 2:
                    var f;
                    f = e || {};
                    var g = b(c) + "=" + b(d);
                    null == d && (f.maxage = -1);
                    f.maxage &&
                        (f.expires = new Date(+new Date + f.maxage));
                    f.path && (g += "; path=" + f.path);
                    f.domain && (g += "; domain=" + f.domain);
                    f.expires && (g += "; expires=" + f.expires.toUTCString());
                    f.secure && (g += "; secure");
                    document.cookie = g;
                    break;
                case 1:
                    return a()[c];
                default:
                    return a()
            }
        }
    }, {
        debug: 116
    }],
    116: [function(c, g, f) {
        function a() {
            var a;
            try {
                a = f.storage.debug
            } catch (b) {}
            return a
        }
        f = g.exports = c("./debug");
        f.log = function() {
            return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        };
        f.formatArgs =
            function() {
                var a = arguments,
                    b = this.useColors;
                a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + f.humanize(this.diff);
                if (!b) return a;
                var b = "color: " + this.color,
                    a = [a[0], b, "color: inherit"].concat(Array.prototype.slice.call(a, 1)),
                    c = 0,
                    g = 0;
                a[0].replace(/%[a-z%]/g, function(a) {
                    "%%" !== a && (c++, "%c" === a && (g = c))
                });
                a.splice(g, 0, b);
                return a
            };
        f.save = function(a) {
            try {
                null == a ? f.storage.removeItem("debug") : f.storage.debug = a
            } catch (b) {}
        };
        f.load = a;
        f.useColors = function() {
            return "WebkitAppearance" in document.documentElement.style ||
                window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10)
        };
        var b;
        if ("undefined" != typeof chrome && "undefined" != typeof chrome.storage) b = chrome.storage.local;
        else a: {
            try {
                b = window.localStorage;
                break a
            } catch (e) {}
            b = void 0
        }
        f.storage = b;
        f.colors = "lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson".split(" ");
        f.formatters.j = function(a) {
            return JSON.stringify(a)
        };
        f.enable(a())
    }, {
        "./debug": 117
    }],
    117: [function(c,
        g, f) {
        f = g.exports = function(c) {
            function d() {}

            function g() {
                var c = +new Date;
                g.diff = c - (b || c);
                g.prev = b;
                b = g.curr = c;
                null == g.useColors && (g.useColors = f.useColors());
                null == g.color && g.useColors && (g.color = f.colors[a++ % f.colors.length]);
                var d = Array.prototype.slice.call(arguments);
                d[0] = f.coerce(d[0]);
                "string" !== typeof d[0] && (d = ["%o"].concat(d));
                var e = 0;
                d[0] = d[0].replace(/%([a-z%])/g, function(a, b) {
                    if ("%%" === a) return a;
                    e++;
                    var c = f.formatters[b];
                    "function" === typeof c && (a = c.call(g, d[e]), d.splice(e, 1), e--);
                    return a
                });
                "function" === typeof f.formatArgs && (d = f.formatArgs.apply(g, d));
                (g.log || f.log || console.log.bind(console)).apply(g, d)
            }
            d.enabled = !1;
            g.enabled = !0;
            var k = f.enabled(c) ? g : d;
            k.namespace = c;
            return k
        };
        f.coerce = function(a) {
            return a instanceof Error ? a.stack || a.message : a
        };
        f.disable = function() {
            f.enable("")
        };
        f.enable = function(a) {
            f.save(a);
            for (var b = (a || "").split(/[\s,]+/), c = b.length, g = 0; g < c; g++) b[g] && (a = b[g].replace(/\*/g, ".*?"), "-" === a[0] ? f.skips.push(new RegExp("^" + a.substr(1) + "$")) : f.names.push(new RegExp("^" + a +
                "$")))
        };
        f.enabled = function(a) {
            var b, c;
            b = 0;
            for (c = f.skips.length; b < c; b++)
                if (f.skips[b].test(a)) return !1;
            b = 0;
            for (c = f.names.length; b < c; b++)
                if (f.names[b].test(a)) return !0;
            return !1
        };
        f.humanize = c("ms");
        f.names = [];
        f.skips = [];
        f.formatters = {};
        var a = 0,
            b
    }, {
        ms: 118
    }],
    118: [function(c, g, f) {
        function a(a) {
            a = "" + a;
            if (!(1E4 < a.length) && (a = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a))) {
                var b = parseFloat(a[1]);
                switch ((a[2] || "ms").toLowerCase()) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return 315576E5 *
                            b;
                    case "days":
                    case "day":
                    case "d":
                        return 864E5 * b;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return 36E5 * b;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return 6E4 * b;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return 1E3 * b;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return b
                }
            }
        }

        function b(a, b, c) {
            if (!(a < b)) return a < 1.5 * b ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
        }
        g.exports = function(c, d) {
            d = d || {};
            return "string" == typeof c ? a(c) :
                d.long ? b(c, 864E5, "day") || b(c, 36E5, "hour") || b(c, 6E4, "minute") || b(c, 1E3, "second") || c + " ms" : 864E5 <= c ? Math.round(c / 864E5) + "d" : 36E5 <= c ? Math.round(c / 36E5) + "h" : 6E4 <= c ? Math.round(c / 6E4) + "m" : 1E3 <= c ? Math.round(c / 1E3) + "s" : c + "ms"
        }
    }, {}],
    115: [function(c, g, f) {
        f.startsWith = function(a, b) {
            return 0 === a.indexOf(b)
        };
        f.endsWith = function(a, b) {
            var c = a.length - b.length,
                d = a.indexOf(b);
            return -1 !== d && d === c
        }
    }, {}],
    113: [function(c, g, f) {
        var a = {
            _storeType: function(a) {
                a = a || {};
                return a.permanent ? window.localStorage : window.sessionStorage
            },
            _isAvailable: function(a) {
                try {
                    a.setItem("t", "t");
                    var c = a.getItem("t");
                    a.removeItem("t");
                    return "t" === c
                } catch (d) {
                    return !1
                }
            },
            read: function(b, c) {
                var d = a._storeType(c);
                return a._isAvailable(d) ? d.getItem(b) : null
            },
            write: function(b, c, d) {
                d = a._storeType(d);
                return a._isAvailable(d) ? d.setItem(b, c) : null
            }
        };
        f.read = a.read;
        f.write = a.write
    }, {}],
    110: [function(c, g, f) {
        var a = c("load-pixel")("https://v.shopify.com/:app/:type"),
            b = c("querystring").parse,
            e = {
                load: function(b, c, f) {
                    return a(f, {
                        app: b,
                        type: c
                    }, e._error)
                },
                _error: function(c) {
                    if (c &&
                        c.event === window.event) {
                        var e = c.source.src.split("?"),
                            f = e[0].split(".com/")[1].split("/");
                        c = f[0];
                        var f = f[1],
                            e = b(e[1]),
                            g = {};
                        e.event && (g.event = e.event);
                        e.url && (g.url = e.url);
                        g.truncated = !0;
                        return a(g, {
                            app: c,
                            type: f
                        })
                    }
                }
            };
        f.load = e.load
    }, {
        "load-pixel": 119,
        querystring: 27
    }],
    119: [function(c, g, f) {
        function a(a, b, c) {
            return function(e) {
                e = e || window.event;
                var f = Error(b);
                f.event = e;
                f.source = c;
                a(f)
            }
        }
        var b = c("querystring").stringify,
            e = c("substitute");
        g.exports = function(c) {
            return function(f, g, m) {
                "function" == typeof g &&
                    (m = g, g = {});
                g = g || {};
                m = m || function() {};
                g = e(c, g);
                var l = new Image;
                l.onerror = a(m, "failed to load pixel", l);
                l.onload = function() {
                    m()
                };
                (f = b(f)) && (f = "?" + f);
                l.src = g + f;
                l.width = 1;
                l.height = 1;
                return l
            }
        }
    }, {
        querystring: 27,
        substitute: 120
    }],
    120: [function(c, g, f) {
        g.exports = function(b, c, d) {
            if (!c) throw new TypeError("expected an object");
            d = d || /:(\w+)/g;
            return b.replace(d, function(b, d) {
                switch (a.call(c)) {
                    case "[object Object]":
                        return null != c[d] ? c[d] : b;
                    case "[object Array]":
                        var f = c.shift();
                        return null != f ? f : b
                }
            })
        };
        var a = Object.prototype.toString
    }, {}],
    111: [function(c, g, f) {
        var a = {
            "Viewed Product": {
                resourceType: "product",
                pageType: "product"
            },
            "Added Product": {
                eventType: "add_to_cart",
                resourceType: "product",
                pageType: "cart"
            },
            "Removed Product": {
                eventType: "remove_from_cart",
                resourceType: "product",
                pageType: "cart"
            },
            "Viewed Cart": {
                pageType: "cart"
            },
            "Cleared Cart": {
                eventType: "clear_cart",
                pageType: "cart"
            },
            "Viewed Product Category": {
                resourceType: "collection",
                pageType: "collection"
            },
            "Viewed Collections": {
                pageType: "collections"
            }
        };
        f.additionalParamsFromEvent =
            function(b) {
                b = a[b];
                var c = {},
                    d;
                for (d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
                return c
            }
    }, {}],
    81: [function(c, g, f) {
        c = c("analytics.js-integration");
        g = g.exports = c("ReportsTracking").option("shopId", null).option("timezoneOffset", null).option("requestId", null).option("pageUrl", null).option("uniqId", null).option("subject", null).option("tag", null).option("customerId", null).option("page", null).option("resourceType", null).option("resourceID", null).tag('<script src="cdn.shopify.com/s/javascripts/shopify_stats.js?v=6">');
        var a = {
            shopId: "a",
            timezoneOffset: "offset",
            requestId: "reqid",
            pageUrl: "pageurl",
            uniqId: "u",
            subject: "s",
            tag: "t",
            customerId: "cid",
            page: "p",
            resourceType: "rtyp",
            resourceID: "rid"
        };
        g.prototype.initialize = function() {
            var b = {},
                c;
            for (c in a) this.options.hasOwnProperty(c) && this.options[c] && (b[a[c]] = this.options[c]);
            window.__st = b;
            this.load(this.ready)
        };
        g.prototype.page = function() {}
    }, {
        "analytics.js-integration": 86
    }],
    82: [function(c, g, f) {
        f = c("analytics.js-integration");
        var a = c("./../lib/perf.js");
        c = g.exports = f("Performance").option("navigationTimingApiMeasurementsEnabled", !1).option("navigationTimingApiMeasurementsSampleRate", .5);
        c.prototype.initialize = function() {
            this.ready()
        };
        c.prototype.page = function(b) {
            b = this._merge(b.properties(), {
                category: b.category(),
                name: b.name()
            });
            this.options.navigationTimingApiMeasurementsEnabled && this.options.navigationTimingApiMeasurementsSampleRate >= Math.random() && (b = this._merge(a.pagePerfomance(), b), this.analytics.track("navigation_performance_metrics", b))
        };
        c.prototype._merge = function(a, c) {
            var d = function(a, b) {
                    for (var c in b) a[c] = b[c];
                    return a
                },
                f = d({}, a);
            return d(f, c)
        }
    }, {
        "analytics.js-integration": 86,
        "./../lib/perf.js": 121
    }],
    121: [function(c, g, f) {
        var a = "navigationStart unloadEventStart unloadEventEnd redirectStart redirectEnd fetchStart domainLookupStart domainLookupEnd connectStart connectEnd secureConnectionStart requestStart responseStart responseEnd domLoading domInteractive domContentLoadedEventStart domContentLoadedEventEnd domComplete loadEventStart loadEventEnd".split(" ");
        f.perfAttrs = a;
        f.pagePerfomance = function() {
            var b = {},
                c = function() {
                    for (var c = 0, d = a.length; c < d; c++) b["nt:" + a[c]] = 0;
                    b["nt:valid"] = !1
                };
            if (window.performance && window.performance.timing && !/MSIE 9.0|Firefox\/7.0|Firefox\/8.0/.test(window.navigator.userAgent)) try {
                for (var d = 0, f = a.length; d < f; d++) b["nt:" + a[d]] = window.performance.timing[a[d]];
                b["nt:valid"] = !0
            } catch (g) {
                c()
            } else c();
            return b
        }
    }, {}],
    83: [function(c, g, f) {
        function a(a) {
            return Number(a || 0).toFixed(2)
        }

        function b(a) {
            return a.properties().productId || a.id() || a.sku() || ""
        }

        function e(a) {
            var b;
            return k(function(a,
                c) {
                (b = c.productId || c.id || c.sku) && -1 === a.indexOf(b) && a.push(b);
                return a
            }, [], a.products() || [])
        }

        function d(a) {
            a = a.products() || [];
            for (var b = 0; b < a.length; b++)
                if (a[b].productId) return "product_group";
            return "product"
        }

        function h(a) {
            return k(function(a, b) {
                return a + (b.quantity || 0)
            }, 0, a.products() || [])
        }
        f = c("analytics.js-integration");
        var k = c("foldl"),
            m = c("each");
        c = g.exports = f("Facebook Pixel").global("fbq").option("pixelId", "").option("pixelIds", []).option("agent", "seg").mapping("standardEvents").mapping("legacyEvents").tag('<script src="//connect.facebook.net/en_US/fbevents.js">');
        c.prototype.initialize = function() {
            window.fbq = window._fbq = function() {
                window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
            };
            window.fbq.push = window.fbq;
            window.fbq.loaded = !0;
            window.fbq.disablePushState = !0;
            window.fbq.version = "2.0";
            window.fbq.queue = [];
            this.load(this.ready);
            var a = this.options.pixelIds.concat([this.options.pixelId]),
                b = this;
            m(function(a) {
                null !== a && "" !== a && (window.fbq("init", a), window.fbq("set", "agent", b.options.agent, a))
            }, a)
        };
        c.prototype.loaded =
            function() {
                return !(!window.fbq || !window.fbq.callMethod)
            };
        c.prototype.page = function() {
            window.fbq("track", "PageView")
        };
        c.prototype.track = function(b) {
            var c = b.event(),
                d = a(b.revenue()),
                e = k(function(a, b, c) {
                    if ("revenue" === c) return a.value = d, a;
                    a[c] = b;
                    return a
                }, {}, b.properties()),
                f = this.standardEvents(c),
                g = this.legacyEvents(c);
            [].concat(f, g).length ? (m(function(a) {
                window.fbq("track", a, e)
            }, f), m(function(a) {
                window.fbq("track", a, {
                    currency: b.currency(),
                    value: d
                })
            }, g)) : window.fbq("trackCustom", c, e)
        };
        c.prototype.viewedProductCategory =
            function() {};
        c.prototype.viewedProduct = function(c) {
            window.fbq("track", "ViewContent", {
                content_ids: [b(c)],
                content_type: c.properties().productId ? "product_group" : "product",
                content_name: c.name() || "",
                content_category: c.category() || "",
                currency: c.currency(),
                value: a(c.price())
            });
            m(function(b) {
                window.fbq("track", b, {
                    currency: c.currency(),
                    value: a(c.revenue())
                })
            }, this.legacyEvents(c.event()))
        };
        c.prototype.addedProduct = function(c) {
            window.fbq("track", "AddToCart", {
                content_ids: [b(c)],
                content_type: c.properties().productId ?
                    "product_group" : "product",
                content_name: c.name() || "",
                content_category: c.category() || "",
                currency: c.currency(),
                value: a(c.price()),
                num_items: c.quantity()
            });
            m(function(b) {
                window.fbq("track", b, {
                    currency: c.currency(),
                    value: a(c.revenue())
                })
            }, this.legacyEvents(c.event()))
        };
        c.prototype.completedOrder = function(b) {
            var c = a(b.revenue());
            window.fbq("track", "Purchase", {
                content_ids: e(b),
                content_type: d(b),
                currency: b.currency(),
                value: c,
                num_items: h(b)
            });
            m(function(c) {
                    window.fbq("track", c, {
                        currency: b.currency(),
                        value: a(b.revenue())
                    })
                },
                this.legacyEvents(b.event()))
        };
        c.prototype.startedOrder = function(b) {
            var c = a(b.revenue());
            window.fbq("track", "InitiateCheckout", {
                content_ids: e(b),
                content_type: d(b),
                currency: b.currency(),
                value: c,
                num_items: h(b)
            });
            m(function(c) {
                window.fbq("track", c, {
                    currency: b.currency(),
                    value: a(b.revenue())
                })
            }, this.legacyEvents(b.event()))
        }
    }, {
        "analytics.js-integration": 86,
        foldl: 16,
        each: 65
    }],
    84: [function(c, g, f) {
        c = c("analytics.js-integration");
        (g.exports = c("Pinterest Pixel").option("pixelId").tag("PinterestCompletedCheckout",
            '<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/v2.5/?tid={{pixelId}}&event=checkout&value=0.00&quantity=1"/>')).prototype.completedOrder = function() {
            this.load("PinterestCompletedCheckout")
        }
    }, {
        "analytics.js-integration": 86
    }]
}, {}, {
    1: "trekkie"
});