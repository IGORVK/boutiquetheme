/*! mailcheck v1.1.1 @licence MIT */
var Mailcheck = {
    domainThreshold: 2,
    secondLevelThreshold: 2,
    topLevelThreshold: 2,
    defaultDomains: ["msn.com", "bellsouth.net", "telus.net", "comcast.net", "optusnet.com.au", "earthlink.net", "qq.com", "sky.com", "icloud.com", "mac.com", "sympatico.ca", "googlemail.com", "att.net", "xtra.co.nz", "web.de", "cox.net", "gmail.com", "ymail.com", "aim.com", "rogers.com", "verizon.net", "rocketmail.com", "google.com", "optonline.net", "sbcglobal.net", "aol.com", "me.com", "btinternet.com", "charter.net", "shaw.ca"],
    defaultSecondLevelDomains: ["yahoo", "hotmail", "mail", "live", "outlook", "gmx"],
    defaultTopLevelDomains: ["com", "com.au", "com.tw", "ca", "co.nz", "co.uk", "de", "fr", "it", "ru", "net", "org", "edu", "gov", "jp", "nl", "kr", "se", "eu", "ie", "co.il", "us", "at", "be", "dk", "hk", "es", "gr", "ch", "no", "cz", "in", "net", "net.au", "info", "biz", "mil", "co.jp", "sg", "hu"],
    run: function(a) {
        a.domains = a.domains || Mailcheck.defaultDomains, a.secondLevelDomains = a.secondLevelDomains || Mailcheck.defaultSecondLevelDomains, a.topLevelDomains = a.topLevelDomains || Mailcheck.defaultTopLevelDomains, a.distanceFunction = a.distanceFunction || Mailcheck.sift3Distance;
        var b = function(a) {
                return a
            },
            c = a.suggested || b,
            d = a.empty || b,
            e = Mailcheck.suggest(Mailcheck.encodeEmail(a.email), a.domains, a.secondLevelDomains, a.topLevelDomains, a.distanceFunction);
        return e ? c(e) : d()
    },
    suggest: function(a, b, c, d, e) {
        a = a.toLowerCase();
        var f = this.splitEmail(a);
        if (c && d && -1 !== c.indexOf(f.secondLevelDomain) && -1 !== d.indexOf(f.topLevelDomain)) return !1;
        var g = this.findClosestDomain(f.domain, b, e, this.domainThreshold);
        if (g) return g == f.domain ? !1 : {
            address: f.address,
            domain: g,
            full: f.address + "@" + g
        };
        var h = this.findClosestDomain(f.secondLevelDomain, c, e, this.secondLevelThreshold),
            i = this.findClosestDomain(f.topLevelDomain, d, e, this.topLevelThreshold);
        if (f.domain) {
            var g = f.domain,
                j = !1;
            if (h && h != f.secondLevelDomain && (g = g.replace(f.secondLevelDomain, h), j = !0), i && i != f.topLevelDomain && (g = g.replace(f.topLevelDomain, i), j = !0), 1 == j) return {
                address: f.address,
                domain: g,
                full: f.address + "@" + g
            }
        }
        return !1
    },
    findClosestDomain: function(a, b, c, d) {
        d = d || this.topLevelThreshold;
        var e, f = 99,
            g = null;
        if (!a || !b) return !1;
        c || (c = this.sift3Distance);
        for (var h = 0; h < b.length; h++) {
            if (a === b[h]) return a;
            e = c(a, b[h]), f > e && (f = e, g = b[h])
        }
        return d >= f && null !== g ? g : !1
    },
    sift3Distance: function(a, b) {
        if (null == a || 0 === a.length) return null == b || 0 === b.length ? 0 : b.length;
        if (null == b || 0 === b.length) return a.length;
        for (var c = 0, d = 0, e = 0, f = 0, g = 5; c + d < a.length && c + e < b.length;) {
            if (a.charAt(c + d) == b.charAt(c + e)) f++;
            else {
                d = 0, e = 0;
                for (var h = 0; g > h; h++) {
                    if (c + h < a.length && a.charAt(c + h) == b.charAt(c)) {
                        d = h;
                        break
                    }
                    if (c + h < b.length && a.charAt(c) == b.charAt(c + h)) {
                        e = h;
                        break
                    }
                }
            }
            c++
        }
        return (a.length + b.length) / 2 - f
    },
    splitEmail: function(a) {
        var b = a.trim().split("@");
        if (b.length < 2) return !1;
        for (var c = 0; c < b.length; c++)
            if ("" === b[c]) return !1;
        var d = b.pop(),
            e = d.split("."),
            f = "",
            g = "";
        if (0 == e.length) return !1;
        if (1 == e.length) g = e[0];
        else {
            f = e[0];
            for (var c = 1; c < e.length; c++) g += e[c] + ".";
            g = g.substring(0, g.length - 1)
        }
        return {
            topLevelDomain: g,
            secondLevelDomain: f,
            domain: d,
            address: b.join("@")
        }
    },
    encodeEmail: function(a) {
        var b = encodeURI(a);
        return b = b.replace("%20", " ").replace("%25", "%").replace("%5E", "^").replace("%60", "`").replace("%7B", "{").replace("%7C", "|").replace("%7D", "}")
    }
};
"undefined" != typeof module && module.exports && (module.exports = Mailcheck), "function" == typeof define && define.amd && define("mailcheck", [], function() {
    return Mailcheck
}), "undefined" != typeof window && window.jQuery && ! function(a) {
    a.fn.mailcheck = function(a) {
        var b = this;
        if (a.suggested) {
            var c = a.suggested;
            a.suggested = function(a) {
                c(b, a)
            }
        }
        if (a.empty) {
            var d = a.empty;
            a.empty = function() {
                d.call(null, b)
            }
        }
        a.email = this.val(), Mailcheck.run(a)
    }
}(jQuery);
