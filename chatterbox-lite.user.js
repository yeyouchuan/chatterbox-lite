// ==UserScript==
// @name         Chatterbox Lite
// @namespace    https://greasyfork.org/users/1524935
// @version      2.3.3
// @author       laplace-live; Chatterbox Lite fork
// @description  A slim Bilibili Live danmaku helper with audio-only mode, keyword replacement, and manual sending.
// @license      AGPL-3.0
// @icon         https://laplace.live/favicon.ico
// @downloadURL  https://yeyouchuan.github.io/chatterbox-lite/chatterbox-lite.user.js
// @updateURL    https://yeyouchuan.github.io/chatterbox-lite/chatterbox-lite.meta.js
// @match        https://live.bilibili.com/*
// @connect      127.0.0.1
// @connect      localhost
// @connect      127.0.0.1:31873
// @connect      127.0.0.1:31874
// @connect      127.0.0.1:31875
// @connect      localhost:31873
// @connect      localhost:31874
// @connect      localhost:31875
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  var n$1, l$4, u$3, t$3, i$2, r$6, o$6, e$a, f$2, c$3, a$7, s$2, h$3, p$4, v$2, y$3, d$2 = {}, w$3 = [], _$2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g$3 = Array.isArray;
  function m$2(n2, l2) {
    for (var u2 in l2) n2[u2] = l2[u2];
    return n2;
  }
  function b$2(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k$1(l2, u2, t2) {
    var i2, r2, o2, e2 = {};
    for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return x$3(l2, e2, i2, r2, null);
  }
  function x$3(n2, t2, i2, r2, o2) {
    var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$3 : o2, __i: -1, __u: 0 };
    return null == o2 && null != l$4.vnode && l$4.vnode(e2), e2;
  }
  function S$1(n2) {
    return n2.children;
  }
  function C$1(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function $$1(n2, l2) {
    if (null == l2) return n2.__ ? $$1(n2.__, n2.__i + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
    return "function" == typeof n2.type ? $$1(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u2 = n2.__v, t2 = u2.__e, i2 = [], r2 = [], o2 = m$2({}, u2);
      o2.__v = u2.__v + 1, l$4.vnode && l$4.vnode(o2), q$2(n2.__P, o2, u2, n2.__n, n2.__P.namespaceURI, 32 & u2.__u ? [t2] : null, i2, null == t2 ? $$1(u2) : t2, !!(32 & u2.__u), r2), o2.__v = u2.__v, o2.__.__k[o2.__i] = o2, D$2(i2, o2, r2), u2.__e = u2.__ = null, o2.__e != t2 && P$1(o2);
    }
  }
  function P$1(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
      if (null != l2 && null != l2.__e) return n2.__e = n2.__c.base = l2.__e;
    }), P$1(n2);
  }
  function A$2(n2) {
    (!n2.__d && (n2.__d = true) && i$2.push(n2) && !H$1.__r++ || r$6 != l$4.debounceRendering) && ((r$6 = l$4.debounceRendering) || o$6)(H$1);
  }
  function H$1() {
    try {
      for (var n2, l2 = 1; i$2.length; ) i$2.length > l2 && i$2.sort(e$a), n2 = i$2.shift(), l2 = i$2.length, I(n2);
    } finally {
      i$2.length = H$1.__r = 0;
    }
  }
  function L(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, a2) {
    var s2, h2, p2, v2, y2, _2, g2, m2 = t2 && t2.__k || w$3, b2 = l2.length;
    for (f2 = T$2(u2, l2, m2, f2, b2), s2 = 0; s2 < b2; s2++) null != (p2 = u2.__k[s2]) && (h2 = -1 != p2.__i && m2[p2.__i] || d$2, p2.__i = s2, _2 = q$2(n2, p2, h2, i2, r2, o2, e2, f2, c2, a2), v2 = p2.__e, p2.ref && h2.ref != p2.ref && (h2.ref && J$1(h2.ref, null, p2), a2.push(p2.ref, p2.__c || v2, p2)), null == y2 && null != v2 && (y2 = v2), (g2 = !!(4 & p2.__u)) || h2.__k === p2.__k ? (f2 = j$3(p2, f2, n2, g2), g2 && h2.__e && (h2.__e = null)) : "function" == typeof p2.type && void 0 !== _2 ? f2 = _2 : v2 && (f2 = v2.nextSibling), p2.__u &= -7);
    return u2.__e = y2, f2;
  }
  function T$2(n2, l2, u2, t2, i2) {
    var r2, o2, e2, f2, c2, a2 = u2.length, s2 = a2, h2 = 0;
    for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = x$3(null, o2, null, null, null) : g$3(o2) ? o2 = n2.__k[r2] = x$3(S$1, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = x$3(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = O$1(o2, u2, f2, s2)) && (s2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > a2 ? h2-- : i2 < a2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (s2) for (r2 = 0; r2 < a2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = $$1(e2)), K$1(e2, e2));
    return t2;
  }
  function j$3(n2, l2, u2, t2) {
    var i2, r2;
    if ("function" == typeof n2.type) {
      for (i2 = n2.__k, r2 = 0; i2 && r2 < i2.length; r2++) i2[r2] && (i2[r2].__ = n2, l2 = j$3(i2[r2], l2, u2, t2));
      return l2;
    }
    n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = $$1(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function F$1(n2, l2) {
    return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (g$3(n2) ? n2.some(function(n3) {
      F$1(n3, l2);
    }) : l2.push(n2)), l2;
  }
  function O$1(n2, l2, u2, t2) {
    var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], a2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == e2 || a2 && e2 == c2.key && f2 == c2.type) return u2;
    if (t2 > (a2 ? 1 : 0)) {
      for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
    }
    return -1;
  }
  function z$1(n2, l2, u2) {
    "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || _$2.test(l2) ? u2 : u2 + "px";
  }
  function N(n2, l2, u2, t2, i2) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || z$1(n2.style, l2, "");
      if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || z$1(n2.style, l2, u2[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(s$2, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2[a$7] = t2[a$7] : (u2[a$7] = h$3, n2.addEventListener(l2, r2 ? v$2 : p$4, r2)) : n2.removeEventListener(l2, r2 ? v$2 : p$4, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u2 ? "" : u2;
        break n;
      } catch (n3) {
      }
      "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
    }
  }
  function V$1(n2) {
    return function(u2) {
      if (this.l) {
        var t2 = this.l[u2.type + n2];
        if (null == u2[c$3]) u2[c$3] = h$3++;
        else if (u2[c$3] < t2[a$7]) return;
        return t2(l$4.event ? l$4.event(u2) : u2);
      }
    };
  }
  function q$2(n2, u2, t2, i2, r2, o2, e2, f2, c2, a2) {
    var s2, h2, p2, v2, y2, d2, _2, k2, x2, M2, $2, I2, P2, A2, H2, T2 = u2.type;
    if (void 0 !== u2.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (s2 = l$4.__b) && s2(u2);
    n: if ("function" == typeof T2) try {
      if (k2 = u2.props, x2 = T2.prototype && T2.prototype.render, M2 = (s2 = T2.contextType) && i2[s2.__c], $2 = s2 ? M2 ? M2.props.value : s2.__ : i2, t2.__c ? _2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (x2 ? u2.__c = h2 = new T2(k2, $2) : (u2.__c = h2 = new C$1(k2, $2), h2.constructor = T2, h2.render = Q$1), M2 && M2.sub(h2), h2.state || (h2.state = {}), h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), x2 && null == h2.__s && (h2.__s = h2.state), x2 && null != T2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = m$2({}, h2.__s)), m$2(h2.__s, T2.getDerivedStateFromProps(k2, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u2, p2) x2 && null == T2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), x2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (x2 && null == T2.getDerivedStateFromProps && k2 !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(k2, $2), u2.__v == t2.__v || !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(k2, h2.__s, $2)) {
          u2.__v != t2.__v && (h2.props = k2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
            n3 && (n3.__ = u2);
          }), w$3.push.apply(h2.__h, h2._sb), h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(k2, h2.__s, $2), x2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v2, y2, d2);
        });
      }
      if (h2.context = $2, h2.props = k2, h2.__P = n2, h2.__e = false, I2 = l$4.__r, P2 = 0, x2) h2.state = h2.__s, h2.__d = false, I2 && I2(u2), s2 = h2.render(h2.props, h2.state, h2.context), w$3.push.apply(h2.__h, h2._sb), h2._sb = [];
      else do {
        h2.__d = false, I2 && I2(u2), s2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++P2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i2 = m$2(m$2({}, i2), h2.getChildContext())), x2 && !p2 && null != h2.getSnapshotBeforeUpdate && (d2 = h2.getSnapshotBeforeUpdate(v2, y2)), A2 = null != s2 && s2.type === S$1 && null == s2.key ? E$2(s2.props.children) : s2, f2 = L(n2, g$3(A2) ? A2 : [A2], u2, t2, i2, r2, o2, e2, f2, c2, a2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), _2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u2.__v = null, c2 || null != o2) if (n3.then) {
        for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
        o2[o2.indexOf(f2)] = null, u2.__e = f2;
      } else {
        for (H2 = o2.length; H2--; ) b$2(o2[H2]);
        B$2(u2);
      }
      else u2.__e = t2.__e, u2.__k = t2.__k, n3.then || B$2(u2);
      l$4.__e(n3, u2, t2);
    }
    else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = G$1(t2.__e, u2, t2, i2, r2, o2, e2, c2, a2);
    return (s2 = l$4.diffed) && s2(u2), 128 & u2.__u ? void 0 : f2;
  }
  function B$2(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B$2));
  }
  function D$2(n2, u2, t2) {
    for (var i2 = 0; i2 < t2.length; i2++) J$1(t2[i2], t2[++i2], t2[++i2]);
    l$4.__c && l$4.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l$4.__e(n3, u3.__v);
      }
    });
  }
  function E$2(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g$3(n2) ? n2.map(E$2) : void 0 !== n2.constructor ? null : m$2({}, n2);
  }
  function G$1(u2, t2, i2, r2, o2, e2, f2, c2, a2) {
    var s2, h2, p2, v2, y2, w2, _2, m2 = i2.props || d$2, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (s2 = 0; s2 < e2.length; s2++) if ((y2 = e2[s2]) && "setAttribute" in y2 == !!x2 && (x2 ? y2.localName == x2 : 3 == y2.nodeType)) {
        u2 = y2, e2[s2] = null;
        break;
      }
    }
    if (null == u2) {
      if (null == x2) return document.createTextNode(k2);
      u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$4.__m && l$4.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x2) m2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
    else {
      if (e2 = "textarea" == x2 && null != k2.defaultValue ? null : e2 && n$1.call(u2.childNodes), !c2 && null != e2) for (m2 = {}, s2 = 0; s2 < u2.attributes.length; s2++) m2[(y2 = u2.attributes[s2]).name] = y2.value;
      for (s2 in m2) y2 = m2[s2], "dangerouslySetInnerHTML" == s2 ? p2 = y2 : "children" == s2 || s2 in k2 || "value" == s2 && "defaultValue" in k2 || "checked" == s2 && "defaultChecked" in k2 || N(u2, s2, null, y2, o2);
      for (s2 in k2) y2 = k2[s2], "children" == s2 ? v2 = y2 : "dangerouslySetInnerHTML" == s2 ? h2 = y2 : "value" == s2 ? w2 = y2 : "checked" == s2 ? _2 = y2 : c2 && "function" != typeof y2 || m2[s2] === y2 || N(u2, s2, y2, m2[s2], o2);
      if (h2) c2 || p2 && (h2.__html == p2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
      else if (p2 && (u2.innerHTML = ""), L("template" == t2.type ? u2.content : u2, g$3(v2) ? v2 : [v2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && $$1(i2, 0), c2, a2), null != e2) for (s2 = e2.length; s2--; ) b$2(e2[s2]);
      c2 && "textarea" != x2 || (s2 = "value", "progress" == x2 && null == w2 ? u2.removeAttribute("value") : null != w2 && (w2 !== u2[s2] || "progress" == x2 && !w2 || "option" == x2 && w2 != m2[s2]) && N(u2, s2, w2, m2[s2], o2), s2 = "checked", null != _2 && _2 != u2[s2] && N(u2, s2, _2, m2[s2], o2));
    }
    return u2;
  }
  function J$1(n2, u2, t2) {
    try {
      if ("function" == typeof n2) {
        var i2 = "function" == typeof n2.__u;
        i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
      } else n2.current = u2;
    } catch (n3) {
      l$4.__e(n3, t2);
    }
  }
  function K$1(n2, u2, t2) {
    var i2, r2;
    if (l$4.unmount && l$4.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || J$1(i2, null, u2)), null != (i2 = n2.__c)) {
      if (i2.componentWillUnmount) try {
        i2.componentWillUnmount();
      } catch (n3) {
        l$4.__e(n3, u2);
      }
      i2.base = i2.__P = null;
    }
    if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && K$1(i2[r2], u2, t2 || "function" != typeof n2.type);
    t2 || b$2(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q$1(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function R(u2, t2, i2) {
    var r2, o2, e2, f2;
    t2 == document && (t2 = document.documentElement), l$4.__ && l$4.__(u2, t2), o2 = (r2 = false) ? null : t2.__k, e2 = [], f2 = [], q$2(t2, u2 = t2.__k = k$1(S$1, null, [u2]), o2 || d$2, d$2, t2.namespaceURI, o2 ? null : t2.firstChild ? n$1.call(t2.childNodes) : null, e2, o2 ? o2.__e : t2.firstChild, r2, f2), D$2(e2, u2, f2);
  }
  function W$1(l2, u2, t2) {
    var i2, r2, o2, e2, f2 = m$2({}, l2.props);
    for (o2 in l2.type && l2.type.defaultProps && (e2 = l2.type.defaultProps), u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = void 0 === u2[o2] && null != e2 ? e2[o2] : u2[o2];
    return arguments.length > 2 && (f2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), x$3(l2.type, f2, i2 || l2.key, r2 || l2.ref, null);
  }
  function X$1(n2) {
    function l2(n3) {
      var u2, t2;
      return this.getChildContext || (u2 = new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
        return t2;
      }, this.componentWillUnmount = function() {
        u2 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u2.forEach(function(n5) {
          n5.__e = true, A$2(n5);
        });
      }, this.sub = function(n4) {
        u2.add(n4);
        var l3 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u2 && u2.delete(n4), l3 && l3.call(n4);
        };
      }), n3.children;
    }
    return l2.__c = "__cC" + y$3++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
      return n3.children(l3);
    }).contextType = l2, l2;
  }
  n$1 = w$3.slice, l$4 = { __e: function(n2, l2, u2, t2) {
    for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
      if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u$3 = 0, t$3 = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, C$1.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$2({}, this.state), "function" == typeof n2 && (n2 = n2(m$2({}, u2), this.props)), n2 && m$2(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), A$2(this));
  }, C$1.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A$2(this));
  }, C$1.prototype.render = S$1, i$2 = [], o$6 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$a = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, H$1.__r = 0, f$2 = Math.random().toString(8), c$3 = "__d" + f$2, a$7 = "__a" + f$2, s$2 = /(PointerCapture)$|Capture$/i, h$3 = 0, p$4 = V$1(false), v$2 = V$1(true), y$3 = 0;
  var f$1 = 0;
  function u$2(e2, t2, n2, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l$4.vnode && l$4.vnode(l2), l2;
  }
  const css = '@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-white:#fff;--spacing:.25rem;--font-weight-normal:400;--font-weight-medium:500;--font-weight-bold:700;--leading-tight:1.25;--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--ease-out:cubic-bezier(0, 0, .2, 1);--animate-spin:spin 1s linear infinite;--blur-md:12px;--blur-xl:24px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-ga2:var(--Ga2,#eee);--color-ga3:var(--Ga3,#ddd);--color-ga4:var(--Ga4,#999);--color-ga5:var(--Ga5,#9499a0);--color-ga6:var(--Ga6,#5f6670);--color-acrylic-panel:var(--chatterbox-lite-acrylic-panel);--color-acrylic-popover:var(--chatterbox-lite-acrylic-popover);--color-acrylic-control:var(--chatterbox-lite-acrylic-control);--color-brand:#2563d9;--color-danger:#c83f46;--color-link:#1d5fd2}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.pointer-events-auto{pointer-events:auto}.pointer-events-none{pointer-events:none}.\\!visible{visibility:visible!important}.collapse{visibility:collapse}.invisible{visibility:hidden}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.top-0{top:calc(var(--spacing) * 0)}.top-full{top:100%}.top-px{top:1px}.right-0{right:calc(var(--spacing) * 0)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-px{right:1px}.bottom-0{bottom:calc(var(--spacing) * 0)}.bottom-1\\.5{bottom:calc(var(--spacing) * 1.5)}.bottom-3{bottom:calc(var(--spacing) * 3)}.bottom-full{bottom:100%}.left-0{left:calc(var(--spacing) * 0)}.left-1\\/2{left:50%}.left-3{left:calc(var(--spacing) * 3)}.left-px{left:1px}.z-10{z-index:10}.z-50{z-index:50}.z-2147483647{z-index:2147483647}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.m-0{margin:calc(var(--spacing) * 0)}.mt-1{margin-top:calc(var(--spacing) * 1)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mb-1{margin-bottom:calc(var(--spacing) * 1)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.ml-2{margin-left:calc(var(--spacing) * 2)}.box-border{box-sizing:border-box}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.size-4{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.size-\\[52px\\]{width:52px;height:52px}.size-full{width:100%;height:100%}.h-3{height:calc(var(--spacing) * 3)}.h-3\\.5{height:calc(var(--spacing) * 3.5)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-20{height:calc(var(--spacing) * 20)}.max-h-24{max-height:calc(var(--spacing) * 24)}.max-h-\\[calc\\(100vh-112px\\)\\]{max-height:calc(100vh - 112px)}.min-h-5{min-height:calc(var(--spacing) * 5)}.min-h-6{min-height:calc(var(--spacing) * 6)}.min-h-7{min-height:calc(var(--spacing) * 7)}.min-h-10{min-height:calc(var(--spacing) * 10)}.min-h-\\[18px\\]{min-height:18px}.min-h-\\[auto\\]{min-height:auto}.w-0\\.75{width:calc(var(--spacing) * .75)}.w-3\\.5{width:calc(var(--spacing) * 3.5)}.w-6{width:calc(var(--spacing) * 6)}.w-16{width:calc(var(--spacing) * 16)}.w-\\[230px\\]{width:230px}.w-\\[calc\\(var\\(--chatterbox-lite-dialog-width\\)-24px\\)\\]{width:calc(var(--chatterbox-lite-dialog-width) - 24px)}.w-full{width:100%}.min-w-0{min-width:calc(var(--spacing) * 0)}.flex-1{flex:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.-translate-x-1\\/2{--tw-translate-x: -50% ;translate:var(--tw-translate-x) var(--tw-translate-y)}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-spin{animation:var(--animate-spin)}.cursor-ew-resize{cursor:ew-resize}.cursor-move{cursor:move}.cursor-pointer{cursor:pointer}.cursor-text{cursor:text}.resize{resize:both}.resize-none{resize:none}.resize-y{resize:vertical}.\\[scrollbar-width\\:thin\\]{scrollbar-width:thin}.list-none{list-style-type:none}.grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.grid-cols-\\[1fr_auto_1fr_auto\\]{grid-template-columns:1fr auto 1fr auto}.grid-cols-\\[repeat\\(auto-fit\\,minmax\\(52px\\,1fr\\)\\)\\]{grid-template-columns:repeat(auto-fit,minmax(52px,1fr))}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-0\\.5{gap:calc(var(--spacing) * .5)}.gap-1{gap:calc(var(--spacing) * 1)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}:where(.space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}.gap-x-1{column-gap:calc(var(--spacing) * 1)}.gap-y-0\\.5{row-gap:calc(var(--spacing) * .5)}.self-stretch{align-self:stretch}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-y-auto{overflow-y:auto}.rounded{border-radius:.25rem}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-sm{border-radius:var(--radius-sm)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-none{--tw-border-style:none;border-style:none}.border-solid{--tw-border-style:solid;border-style:solid}.border-\\[\\#FF6699\\]{border-color:#f69}.border-\\[color\\:var\\(--chatterbox-lite-acrylic-border\\)\\]{border-color:var(--chatterbox-lite-acrylic-border)}.border-\\[color\\:var\\(--chatterbox-lite-acrylic-divider\\)\\]{border-color:var(--chatterbox-lite-acrylic-divider)}.border-brand{border-color:var(--color-brand)}.border-danger{border-color:var(--color-danger)}.border-ga2{border-color:var(--color-ga2)}.border-ga6{border-color:var(--color-ga6)}.border-transparent{border-color:#0000}.border-b-\\[color\\:var\\(--chatterbox-lite-acrylic-border-bottom\\)\\]{border-bottom-color:var(--chatterbox-lite-acrylic-border-bottom)}.bg-\\[\\#FF6699\\]{background-color:#f69}.bg-acrylic-control{background-color:var(--color-acrylic-control)}.bg-acrylic-panel{background-color:var(--color-acrylic-panel)}.bg-acrylic-popover{background-color:var(--color-acrylic-popover)}.bg-brand{background-color:var(--color-brand)}.bg-ga6{background-color:var(--color-ga6)}.bg-transparent{background-color:#0000}.object-contain{object-fit:contain}.p-0{padding:calc(var(--spacing) * 0)}.p-0\\.5{padding:calc(var(--spacing) * .5)}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.px-0{padding-inline:calc(var(--spacing) * 0)}.px-1{padding-inline:calc(var(--spacing) * 1)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3\\.5{padding-inline:calc(var(--spacing) * 3.5)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:calc(var(--spacing) * 1)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-px{padding-block:1px}.pt-1{padding-top:calc(var(--spacing) * 1)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pt-3{padding-top:calc(var(--spacing) * 3)}.pr-10{padding-right:calc(var(--spacing) * 10)}.pb-3{padding-bottom:calc(var(--spacing) * 3)}.text-\\[9px\\]{font-size:9px}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.leading-\\[1\\.2\\]{--tw-leading:1.2;line-height:1.2}.leading-\\[1\\.4\\]{--tw-leading:1.4;line-height:1.4}.leading-none{--tw-leading:1;line-height:1}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.whitespace-nowrap{white-space:nowrap}.text-\\[var\\(--Ga7\\,\\#5f6670\\)\\]{color:var(--Ga7,#5f6670)}.text-\\[var\\(--Ga10\\,\\#172033\\)\\]{color:var(--Ga10,#172033)}.text-brand{color:var(--color-brand)}.text-danger{color:var(--color-danger)}.text-ga5{color:var(--color-ga5)}.text-ga6{color:var(--color-ga6)}.text-inherit{color:inherit}.text-link{color:var(--color-link)}.text-white{color:var(--color-white)}.lowercase{text-transform:lowercase}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.underline{text-decoration-line:underline}.underline-offset-2{text-underline-offset:2px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.accent-brand{accent-color:var(--color-brand)}.opacity-60{opacity:.6}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\\[0_8px_18px_rgba\\(37\\,99\\,217\\,\\.18\\)\\,inset_0_1px_0_rgba\\(255\\,255\\,255\\,\\.24\\)\\]{--tw-shadow:0 8px 18px var(--tw-shadow-color,#2563d92e), inset 0 1px 0 var(--tw-shadow-color,#ffffff3d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\\[var\\(--chatterbox-lite-acrylic-popover-shadow\\)\\]{--tw-shadow:var(--chatterbox-lite-acrylic-popover-shadow);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\\[var\\(--chatterbox-lite-acrylic-shadow\\)\\]{--tw-shadow:var(--chatterbox-lite-acrylic-shadow);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-blur-xl{--tw-backdrop-blur:blur(var(--blur-xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.backdrop-saturate-150{--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[background-color\\,border-color\\,color\\,filter\\,outline-color\\,scale\\,box-shadow\\]{transition-property:background-color,border-color,color,filter,outline-color,scale,box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[background-color\\,outline-color\\,box-shadow\\]{transition-property:background-color,outline-color,box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[border-color\\,outline-color\\,box-shadow\\]{transition-property:border-color,outline-color,box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-150{--tw-duration:.15s;transition-duration:.15s}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.\\[contain-intrinsic-size\\:58px_68px\\]{contain-intrinsic-size:58px 68px}.\\[content-visibility\\:auto\\]{content-visibility:auto}.placeholder\\:text-ga5::placeholder{color:var(--color-ga5)}.last\\:mb-0:last-child{margin-bottom:calc(var(--spacing) * 0)}@media(hover:hover){.hover\\:border-brand:hover{border-color:var(--color-brand)}.hover\\:bg-ga3:hover{background-color:var(--color-ga3)}.hover\\:text-brand:hover{color:var(--color-brand)}}.focus\\:border-brand:focus{border-color:var(--color-brand)}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-brand\\/15:focus-visible{--tw-ring-color:#2563d926}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:ring-brand\\/15:focus-visible{--tw-ring-color:color-mix(in oklab, var(--color-brand) 15%, transparent)}}.focus-visible\\:ring-brand\\/20:focus-visible{--tw-ring-color:#2563d933}@supports (color:color-mix(in lab,red,red)){.focus-visible\\:ring-brand\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--color-brand) 20%, transparent)}}.focus-visible\\:outline:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.focus-visible\\:outline-2:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}.focus-visible\\:outline-offset-2:focus-visible{outline-offset:2px}.focus-visible\\:outline-brand:focus-visible{outline-color:var(--color-brand)}.active\\:scale-\\[0\\.96\\]:active{scale:.96}.active\\:bg-ga4:active{background-color:var(--color-ga4)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:block svg{display:block}.\\[\\&_svg\\]\\:size-3\\.5 svg{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&\\:\\:-webkit-details-marker\\]\\:hidden::-webkit-details-marker{display:none}.\\[\\&\\:\\:-webkit-scrollbar\\]\\:w-1\\.5::-webkit-scrollbar{width:calc(var(--spacing) * 1.5)}.\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:rounded-full::-webkit-scrollbar-thumb{border-radius:3.40282e38px}.\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:bg-brand\\/35::-webkit-scrollbar-thumb{background-color:#2563d959}@supports (color:color-mix(in lab,red,red)){.\\[\\&\\:\\:-webkit-scrollbar-thumb\\]\\:bg-brand\\/35::-webkit-scrollbar-thumb{background-color:color-mix(in oklab,var(--color-brand) 35%,transparent)}}.\\[\\&\\:not\\(\\:disabled\\)\\:active\\]\\:brightness-\\[\\.9\\]:not(:disabled):active{--tw-brightness:brightness(.9);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.\\[\\&\\:not\\(\\:disabled\\)\\:hover\\]\\:brightness-\\[\\.96\\]:not(:disabled):hover{--tw-brightness:brightness(.96);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}@media(pointer:coarse){.\\[\\@media\\(pointer\\:coarse\\)\\]\\:size-11{width:calc(var(--spacing) * 11);height:calc(var(--spacing) * 11)}.\\[\\@media\\(pointer\\:coarse\\)\\]\\:min-h-11{min-height:calc(var(--spacing) * 11)}.\\[\\@media\\(pointer\\:coarse\\)\\]\\:px-3{padding-inline:calc(var(--spacing) * 3)}.\\[\\@media\\(pointer\\:coarse\\)\\]\\:px-4{padding-inline:calc(var(--spacing) * 4)}}details[open] .\\[details\\[open\\]_\\&\\]\\:rotate-180{rotate:180deg}}:host{--chatterbox-lite-acrylic-panel:#f2f8ffd1;--chatterbox-lite-acrylic-popover:#f4f9ffe0;--chatterbox-lite-acrylic-control:#ffffff7a;--chatterbox-lite-acrylic-control-strong:#ffffffa8;--chatterbox-lite-acrylic-border:#4e76aa42;--chatterbox-lite-acrylic-border-bottom:#4e76aa12;--chatterbox-lite-acrylic-divider:#4e76aa29;--chatterbox-lite-acrylic-shadow:0 24px 64px #1d365933, 0 4px 18px #1d36591a;--chatterbox-lite-acrylic-popover-shadow:0 18px 44px #1d36592e, 0 2px 10px #1d365914;-webkit-font-smoothing:antialiased;text-rendering:optimizelegibility}html,body,#app{-webkit-font-smoothing:antialiased;text-rendering:optimizelegibility;background:0 0;min-width:0;min-height:0;margin:0;overflow:visible}textarea,input,button,select,a,label,summary,[role=button],[contenteditable=true],[data-chatterbox-lite-no-drag=true],[data-chatterbox-lite-popover=true]{-webkit-app-region:no-drag}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}';
  const EMPTY_STATE = new Int32Array(4);
  class Md5 {
    static hashStr(str, raw = false) {
      return Md5.onePassHasher.start().appendStr(str).end(raw);
    }
    static hashAsciiStr(str, raw = false) {
      return Md5.onePassHasher.start().appendAsciiStr(str).end(raw);
    }
static stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
    static buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    static hexChars = "0123456789abcdef";
    static hexOut = [];
static onePassHasher = new Md5();
    static _hex(x2) {
      const hc = Md5.hexChars;
      const ho = Md5.hexOut;
      let n2;
      let offset;
      let j2;
      let i2;
      for (i2 = 0; i2 < 4; i2 += 1) {
        offset = i2 * 8;
        n2 = x2[i2];
        for (j2 = 0; j2 < 8; j2 += 2) {
          ho[offset + 1 + j2] = hc.charAt(n2 & 15);
          n2 >>>= 4;
          ho[offset + 0 + j2] = hc.charAt(n2 & 15);
          n2 >>>= 4;
        }
      }
      return ho.join("");
    }
    static _md5cycle(x2, k2) {
      let a2 = x2[0];
      let b2 = x2[1];
      let c2 = x2[2];
      let d2 = x2[3];
      a2 += (b2 & c2 | ~b2 & d2) + k2[0] - 680876936 | 0;
      a2 = (a2 << 7 | a2 >>> 25) + b2 | 0;
      d2 += (a2 & b2 | ~a2 & c2) + k2[1] - 389564586 | 0;
      d2 = (d2 << 12 | d2 >>> 20) + a2 | 0;
      c2 += (d2 & a2 | ~d2 & b2) + k2[2] + 606105819 | 0;
      c2 = (c2 << 17 | c2 >>> 15) + d2 | 0;
      b2 += (c2 & d2 | ~c2 & a2) + k2[3] - 1044525330 | 0;
      b2 = (b2 << 22 | b2 >>> 10) + c2 | 0;
      a2 += (b2 & c2 | ~b2 & d2) + k2[4] - 176418897 | 0;
      a2 = (a2 << 7 | a2 >>> 25) + b2 | 0;
      d2 += (a2 & b2 | ~a2 & c2) + k2[5] + 1200080426 | 0;
      d2 = (d2 << 12 | d2 >>> 20) + a2 | 0;
      c2 += (d2 & a2 | ~d2 & b2) + k2[6] - 1473231341 | 0;
      c2 = (c2 << 17 | c2 >>> 15) + d2 | 0;
      b2 += (c2 & d2 | ~c2 & a2) + k2[7] - 45705983 | 0;
      b2 = (b2 << 22 | b2 >>> 10) + c2 | 0;
      a2 += (b2 & c2 | ~b2 & d2) + k2[8] + 1770035416 | 0;
      a2 = (a2 << 7 | a2 >>> 25) + b2 | 0;
      d2 += (a2 & b2 | ~a2 & c2) + k2[9] - 1958414417 | 0;
      d2 = (d2 << 12 | d2 >>> 20) + a2 | 0;
      c2 += (d2 & a2 | ~d2 & b2) + k2[10] - 42063 | 0;
      c2 = (c2 << 17 | c2 >>> 15) + d2 | 0;
      b2 += (c2 & d2 | ~c2 & a2) + k2[11] - 1990404162 | 0;
      b2 = (b2 << 22 | b2 >>> 10) + c2 | 0;
      a2 += (b2 & c2 | ~b2 & d2) + k2[12] + 1804603682 | 0;
      a2 = (a2 << 7 | a2 >>> 25) + b2 | 0;
      d2 += (a2 & b2 | ~a2 & c2) + k2[13] - 40341101 | 0;
      d2 = (d2 << 12 | d2 >>> 20) + a2 | 0;
      c2 += (d2 & a2 | ~d2 & b2) + k2[14] - 1502002290 | 0;
      c2 = (c2 << 17 | c2 >>> 15) + d2 | 0;
      b2 += (c2 & d2 | ~c2 & a2) + k2[15] + 1236535329 | 0;
      b2 = (b2 << 22 | b2 >>> 10) + c2 | 0;
      a2 += (b2 & d2 | c2 & ~d2) + k2[1] - 165796510 | 0;
      a2 = (a2 << 5 | a2 >>> 27) + b2 | 0;
      d2 += (a2 & c2 | b2 & ~c2) + k2[6] - 1069501632 | 0;
      d2 = (d2 << 9 | d2 >>> 23) + a2 | 0;
      c2 += (d2 & b2 | a2 & ~b2) + k2[11] + 643717713 | 0;
      c2 = (c2 << 14 | c2 >>> 18) + d2 | 0;
      b2 += (c2 & a2 | d2 & ~a2) + k2[0] - 373897302 | 0;
      b2 = (b2 << 20 | b2 >>> 12) + c2 | 0;
      a2 += (b2 & d2 | c2 & ~d2) + k2[5] - 701558691 | 0;
      a2 = (a2 << 5 | a2 >>> 27) + b2 | 0;
      d2 += (a2 & c2 | b2 & ~c2) + k2[10] + 38016083 | 0;
      d2 = (d2 << 9 | d2 >>> 23) + a2 | 0;
      c2 += (d2 & b2 | a2 & ~b2) + k2[15] - 660478335 | 0;
      c2 = (c2 << 14 | c2 >>> 18) + d2 | 0;
      b2 += (c2 & a2 | d2 & ~a2) + k2[4] - 405537848 | 0;
      b2 = (b2 << 20 | b2 >>> 12) + c2 | 0;
      a2 += (b2 & d2 | c2 & ~d2) + k2[9] + 568446438 | 0;
      a2 = (a2 << 5 | a2 >>> 27) + b2 | 0;
      d2 += (a2 & c2 | b2 & ~c2) + k2[14] - 1019803690 | 0;
      d2 = (d2 << 9 | d2 >>> 23) + a2 | 0;
      c2 += (d2 & b2 | a2 & ~b2) + k2[3] - 187363961 | 0;
      c2 = (c2 << 14 | c2 >>> 18) + d2 | 0;
      b2 += (c2 & a2 | d2 & ~a2) + k2[8] + 1163531501 | 0;
      b2 = (b2 << 20 | b2 >>> 12) + c2 | 0;
      a2 += (b2 & d2 | c2 & ~d2) + k2[13] - 1444681467 | 0;
      a2 = (a2 << 5 | a2 >>> 27) + b2 | 0;
      d2 += (a2 & c2 | b2 & ~c2) + k2[2] - 51403784 | 0;
      d2 = (d2 << 9 | d2 >>> 23) + a2 | 0;
      c2 += (d2 & b2 | a2 & ~b2) + k2[7] + 1735328473 | 0;
      c2 = (c2 << 14 | c2 >>> 18) + d2 | 0;
      b2 += (c2 & a2 | d2 & ~a2) + k2[12] - 1926607734 | 0;
      b2 = (b2 << 20 | b2 >>> 12) + c2 | 0;
      a2 += (b2 ^ c2 ^ d2) + k2[5] - 378558 | 0;
      a2 = (a2 << 4 | a2 >>> 28) + b2 | 0;
      d2 += (a2 ^ b2 ^ c2) + k2[8] - 2022574463 | 0;
      d2 = (d2 << 11 | d2 >>> 21) + a2 | 0;
      c2 += (d2 ^ a2 ^ b2) + k2[11] + 1839030562 | 0;
      c2 = (c2 << 16 | c2 >>> 16) + d2 | 0;
      b2 += (c2 ^ d2 ^ a2) + k2[14] - 35309556 | 0;
      b2 = (b2 << 23 | b2 >>> 9) + c2 | 0;
      a2 += (b2 ^ c2 ^ d2) + k2[1] - 1530992060 | 0;
      a2 = (a2 << 4 | a2 >>> 28) + b2 | 0;
      d2 += (a2 ^ b2 ^ c2) + k2[4] + 1272893353 | 0;
      d2 = (d2 << 11 | d2 >>> 21) + a2 | 0;
      c2 += (d2 ^ a2 ^ b2) + k2[7] - 155497632 | 0;
      c2 = (c2 << 16 | c2 >>> 16) + d2 | 0;
      b2 += (c2 ^ d2 ^ a2) + k2[10] - 1094730640 | 0;
      b2 = (b2 << 23 | b2 >>> 9) + c2 | 0;
      a2 += (b2 ^ c2 ^ d2) + k2[13] + 681279174 | 0;
      a2 = (a2 << 4 | a2 >>> 28) + b2 | 0;
      d2 += (a2 ^ b2 ^ c2) + k2[0] - 358537222 | 0;
      d2 = (d2 << 11 | d2 >>> 21) + a2 | 0;
      c2 += (d2 ^ a2 ^ b2) + k2[3] - 722521979 | 0;
      c2 = (c2 << 16 | c2 >>> 16) + d2 | 0;
      b2 += (c2 ^ d2 ^ a2) + k2[6] + 76029189 | 0;
      b2 = (b2 << 23 | b2 >>> 9) + c2 | 0;
      a2 += (b2 ^ c2 ^ d2) + k2[9] - 640364487 | 0;
      a2 = (a2 << 4 | a2 >>> 28) + b2 | 0;
      d2 += (a2 ^ b2 ^ c2) + k2[12] - 421815835 | 0;
      d2 = (d2 << 11 | d2 >>> 21) + a2 | 0;
      c2 += (d2 ^ a2 ^ b2) + k2[15] + 530742520 | 0;
      c2 = (c2 << 16 | c2 >>> 16) + d2 | 0;
      b2 += (c2 ^ d2 ^ a2) + k2[2] - 995338651 | 0;
      b2 = (b2 << 23 | b2 >>> 9) + c2 | 0;
      a2 += (c2 ^ (b2 | ~d2)) + k2[0] - 198630844 | 0;
      a2 = (a2 << 6 | a2 >>> 26) + b2 | 0;
      d2 += (b2 ^ (a2 | ~c2)) + k2[7] + 1126891415 | 0;
      d2 = (d2 << 10 | d2 >>> 22) + a2 | 0;
      c2 += (a2 ^ (d2 | ~b2)) + k2[14] - 1416354905 | 0;
      c2 = (c2 << 15 | c2 >>> 17) + d2 | 0;
      b2 += (d2 ^ (c2 | ~a2)) + k2[5] - 57434055 | 0;
      b2 = (b2 << 21 | b2 >>> 11) + c2 | 0;
      a2 += (c2 ^ (b2 | ~d2)) + k2[12] + 1700485571 | 0;
      a2 = (a2 << 6 | a2 >>> 26) + b2 | 0;
      d2 += (b2 ^ (a2 | ~c2)) + k2[3] - 1894986606 | 0;
      d2 = (d2 << 10 | d2 >>> 22) + a2 | 0;
      c2 += (a2 ^ (d2 | ~b2)) + k2[10] - 1051523 | 0;
      c2 = (c2 << 15 | c2 >>> 17) + d2 | 0;
      b2 += (d2 ^ (c2 | ~a2)) + k2[1] - 2054922799 | 0;
      b2 = (b2 << 21 | b2 >>> 11) + c2 | 0;
      a2 += (c2 ^ (b2 | ~d2)) + k2[8] + 1873313359 | 0;
      a2 = (a2 << 6 | a2 >>> 26) + b2 | 0;
      d2 += (b2 ^ (a2 | ~c2)) + k2[15] - 30611744 | 0;
      d2 = (d2 << 10 | d2 >>> 22) + a2 | 0;
      c2 += (a2 ^ (d2 | ~b2)) + k2[6] - 1560198380 | 0;
      c2 = (c2 << 15 | c2 >>> 17) + d2 | 0;
      b2 += (d2 ^ (c2 | ~a2)) + k2[13] + 1309151649 | 0;
      b2 = (b2 << 21 | b2 >>> 11) + c2 | 0;
      a2 += (c2 ^ (b2 | ~d2)) + k2[4] - 145523070 | 0;
      a2 = (a2 << 6 | a2 >>> 26) + b2 | 0;
      d2 += (b2 ^ (a2 | ~c2)) + k2[11] - 1120210379 | 0;
      d2 = (d2 << 10 | d2 >>> 22) + a2 | 0;
      c2 += (a2 ^ (d2 | ~b2)) + k2[2] + 718787259 | 0;
      c2 = (c2 << 15 | c2 >>> 17) + d2 | 0;
      b2 += (d2 ^ (c2 | ~a2)) + k2[9] - 343485551 | 0;
      b2 = (b2 << 21 | b2 >>> 11) + c2 | 0;
      x2[0] = a2 + x2[0] | 0;
      x2[1] = b2 + x2[1] | 0;
      x2[2] = c2 + x2[2] | 0;
      x2[3] = d2 + x2[3] | 0;
    }
    _dataLength = 0;
    _bufferLength = 0;
    _state = new Int32Array(4);
    _buffer = new ArrayBuffer(68);
    _buffer8;
    _buffer32;
    constructor() {
      this._buffer8 = new Uint8Array(this._buffer, 0, 68);
      this._buffer32 = new Uint32Array(this._buffer, 0, 17);
      this.start();
    }
start() {
      this._dataLength = 0;
      this._bufferLength = 0;
      this._state.set(Md5.stateIdentity);
      return this;
    }



appendStr(str) {
      const buf8 = this._buffer8;
      const buf32 = this._buffer32;
      let bufLen = this._bufferLength;
      let code;
      let i2;
      for (i2 = 0; i2 < str.length; i2 += 1) {
        code = str.charCodeAt(i2);
        if (code < 128) {
          buf8[bufLen++] = code;
        } else if (code < 2048) {
          buf8[bufLen++] = (code >>> 6) + 192;
          buf8[bufLen++] = code & 63 | 128;
        } else if (code < 55296 || code > 56319) {
          buf8[bufLen++] = (code >>> 12) + 224;
          buf8[bufLen++] = code >>> 6 & 63 | 128;
          buf8[bufLen++] = code & 63 | 128;
        } else {
          code = (code - 55296) * 1024 + (str.charCodeAt(++i2) - 56320) + 65536;
          if (code > 1114111) {
            throw new Error("Unicode standard supports code points up to U+10FFFF");
          }
          buf8[bufLen++] = (code >>> 18) + 240;
          buf8[bufLen++] = code >>> 12 & 63 | 128;
          buf8[bufLen++] = code >>> 6 & 63 | 128;
          buf8[bufLen++] = code & 63 | 128;
        }
        if (bufLen >= 64) {
          this._dataLength += 64;
          Md5._md5cycle(this._state, buf32);
          bufLen -= 64;
          buf32[0] = buf32[16];
        }
      }
      this._bufferLength = bufLen;
      return this;
    }
appendAsciiStr(str) {
      const buf8 = this._buffer8;
      const buf32 = this._buffer32;
      let bufLen = this._bufferLength;
      let i2;
      let j2 = 0;
      for (; ; ) {
        i2 = Math.min(str.length - j2, 64 - bufLen);
        while (i2--) {
          buf8[bufLen++] = str.charCodeAt(j2++);
        }
        if (bufLen < 64) {
          break;
        }
        this._dataLength += 64;
        Md5._md5cycle(this._state, buf32);
        bufLen = 0;
      }
      this._bufferLength = bufLen;
      return this;
    }
appendByteArray(input) {
      const buf8 = this._buffer8;
      const buf32 = this._buffer32;
      let bufLen = this._bufferLength;
      let i2;
      let j2 = 0;
      for (; ; ) {
        i2 = Math.min(input.length - j2, 64 - bufLen);
        while (i2--) {
          buf8[bufLen++] = input[j2++];
        }
        if (bufLen < 64) {
          break;
        }
        this._dataLength += 64;
        Md5._md5cycle(this._state, buf32);
        bufLen = 0;
      }
      this._bufferLength = bufLen;
      return this;
    }
getState() {
      const s2 = this._state;
      return {
        buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
        buflen: this._bufferLength,
        length: this._dataLength,
        state: [s2[0], s2[1], s2[2], s2[3]]
      };
    }
setState(state) {
      const buf = state.buffer;
      const x2 = state.state;
      const s2 = this._state;
      let i2;
      this._dataLength = state.length;
      this._bufferLength = state.buflen;
      s2[0] = x2[0];
      s2[1] = x2[1];
      s2[2] = x2[2];
      s2[3] = x2[3];
      for (i2 = 0; i2 < buf.length; i2 += 1) {
        this._buffer8[i2] = buf.charCodeAt(i2);
      }
    }
end(raw = false) {
      const bufLen = this._bufferLength;
      const buf8 = this._buffer8;
      const buf32 = this._buffer32;
      const i2 = (bufLen >> 2) + 1;
      this._dataLength += bufLen;
      const dataBitsLen = this._dataLength * 8;
      buf8[bufLen] = 128;
      buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
      buf32.set(Md5.buffer32Identity.subarray(i2), i2);
      if (bufLen > 55) {
        Md5._md5cycle(this._state, buf32);
        buf32.set(Md5.buffer32Identity);
      }
      if (dataBitsLen <= 4294967295) {
        buf32[14] = dataBitsLen;
      } else {
        const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
        if (matches === null) return raw ? EMPTY_STATE : "";
        const lo = parseInt(matches[2], 16);
        const hi = parseInt(matches[1], 16) || 0;
        buf32[14] = lo;
        buf32[15] = hi;
      }
      Md5._md5cycle(this._state, buf32);
      return raw ? this._state : Md5._hex(this._state);
    }
  }
  if (Md5.hashStr("hello") !== "5d41402abc4b2a76b9719d911017c592") {
    throw new Error("Md5 self test failed.");
  }
  let cachedWbiKeys = null;
  function setCachedWbiKeys(keys) {
    cachedWbiKeys = keys;
  }
  (() => {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
      this._url = typeof url === "string" ? url : url.toString();
      return originalOpen.call(this, method, url, async ?? true, username ?? null, password ?? null);
    };
    XMLHttpRequest.prototype.send = function(body) {
      const url = this._url;
      if (url?.includes("/x/web-interface/nav")) {
        console.log("[Chatterbox Lite] Intercepted request:", url);
        this.addEventListener("load", function() {
          try {
            const data = JSON.parse(this.responseText);
            if (data?.data?.wbi_img) {
              console.log("[Chatterbox Lite] wbi_img:", data.data.wbi_img);
              const img_url = data.data.wbi_img.img_url;
              const sub_url = data.data.wbi_img.sub_url;
              const img_key = img_url?.split("/").pop()?.split(".")[0] ?? "";
              const sub_key = sub_url?.split("/").pop()?.split(".")[0] ?? "";
              setCachedWbiKeys({ img_key, sub_key });
              console.log("[Chatterbox Lite] Extracted WBI keys:", cachedWbiKeys);
            } else {
              console.log("[Chatterbox Lite] Response received but wbi_img not found:", data);
            }
          } catch (err) {
            console.error("[Chatterbox Lite] Error parsing response:", err);
          }
        });
      }
      return originalSend.call(this, body);
    };
  })();
  async function waitForWbiKeys(timeout = 5e3, interval = 100) {
    const startTime = Date.now();
    while (!cachedWbiKeys) {
      if (Date.now() - startTime > timeout) {
        return false;
      }
      await new Promise((r2) => setTimeout(r2, interval));
    }
    return true;
  }
  const mixinKeyEncTab = [
    46,
    47,
    18,
    2,
    53,
    8,
    23,
    32,
    15,
    50,
    10,
    31,
    58,
    3,
    45,
    35,
    27,
    43,
    5,
    49,
    33,
    9,
    42,
    19,
    29,
    28,
    14,
    39,
    12,
    38,
    41,
    13,
    37,
    48,
    7,
    16,
    24,
    55,
    40,
    61,
    26,
    17,
    0,
    1,
    60,
    51,
    30,
    4,
    22,
    25,
    54,
    21,
    56,
    59,
    6,
    63,
    57,
    62,
    11,
    36,
    20,
    34,
    44,
    52
  ];
  function getMixinKey(orig) {
    return mixinKeyEncTab.map((n2) => orig[n2]).join("").slice(0, 32);
  }
  function encodeWbi(params, wbiKeys) {
    const mixin_key = getMixinKey(wbiKeys.img_key + wbiKeys.sub_key);
    const currentTime = Math.round(Date.now() / 1e3);
    const charaFilter = /[!'()*]/g;
    const paramsWithWts = { ...params, wts: currentTime };
    const sortedQuery = Object.keys(paramsWithWts).sort().map((key) => {
      const resolvedValue = paramsWithWts[key]?.toString() ?? "";
      const value = resolvedValue.replace(charaFilter, "");
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join("&");
    const wbi_sign = Md5.hashStr(sortedQuery + mixin_key);
    const unsortedQuery = Object.keys(params).map((key) => {
      const resolvedValue = params[key]?.toString() ?? "";
      const value = resolvedValue.replace(charaFilter, "");
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join("&");
    return `${unsortedQuery}&w_rid=${wbi_sign}&wts=${currentTime}`;
  }
  var t$2, r$5, u$1, i$1, o$5 = 0, f = [], c$2 = l$4, e$9 = c$2.__b, a$6 = c$2.__r, v$1 = c$2.diffed, l$3 = c$2.__c, m$1 = c$2.unmount, s$1 = c$2.__;
  function p$3(n2, t2) {
    c$2.__h && c$2.__h(r$5, n2, o$5 || t2), o$5 = 0;
    var u2 = r$5.__H || (r$5.__H = { __: [], __h: [] });
    return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
  }
  function d$1(n2) {
    return o$5 = 1, h$2(D$1, n2);
  }
  function h$2(n2, u2, i2) {
    var o2 = p$3(t$2++, 2);
    if (o2.t = n2, !o2.__c && (o2.__ = [D$1(void 0, u2), function(n3) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r$5, !r$5.__f)) {
      var f2 = function(n3, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u3.every(function(n4) {
          return !n4.__N;
        })) return !c2 || c2.call(this, n3, t2, r2);
        var i3 = o2.__c.props !== n3;
        return u3.some(function(n4) {
          if (n4.__N) {
            var t3 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n3, t2, r2) || i3;
      };
      r$5.__f = true;
      var c2 = r$5.shouldComponentUpdate, e2 = r$5.componentWillUpdate;
      r$5.componentWillUpdate = function(n3, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n3, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n3, t2, r2);
      }, r$5.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y$2(n2, u2) {
    var i2 = p$3(t$2++, 3);
    !c$2.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$5.__H.__h.push(i2));
  }
  function A$1(n2) {
    return o$5 = 5, T$1(function() {
      return { current: n2 };
    }, []);
  }
  function T$1(n2, r2) {
    var u2 = p$3(t$2++, 7);
    return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  }
  function x$2(n2) {
    var u2 = r$5.context[n2.__c], i2 = p$3(t$2++, 9);
    return i2.c = n2, u2 ? (null == i2.__ && (i2.__ = true, u2.sub(r$5)), u2.props.value) : n2.__;
  }
  function j$2() {
    for (var n2; n2 = f.shift(); ) {
      var t2 = n2.__H;
      if (n2.__P && t2) try {
        t2.__h.some(z), t2.__h.some(B$1), t2.__h = [];
      } catch (r2) {
        t2.__h = [], c$2.__e(r2, n2.__v);
      }
    }
  }
  c$2.__b = function(n2) {
    r$5 = null, e$9 && e$9(n2);
  }, c$2.__ = function(n2, t2) {
    n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s$1 && s$1(n2, t2);
  }, c$2.__r = function(n2) {
    a$6 && a$6(n2), t$2 = 0;
    var i2 = (r$5 = n2.__c).__H;
    i2 && (u$1 === r$5 ? (i2.__h = [], r$5.__h = [], i2.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i2.__h.some(z), i2.__h.some(B$1), i2.__h = [], t$2 = 0)), u$1 = r$5;
  }, c$2.diffed = function(n2) {
    v$1 && v$1(n2);
    var t2 = n2.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i$1 === c$2.requestAnimationFrame || ((i$1 = c$2.requestAnimationFrame) || w$2)(j$2)), t2.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u$1 = r$5 = null;
  }, c$2.__c = function(n2, t2) {
    t2.some(function(n3) {
      try {
        n3.__h.some(z), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B$1(n4);
        });
      } catch (r2) {
        t2.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t2 = [], c$2.__e(r2, n3.__v);
      }
    }), l$3 && l$3(n2, t2);
  }, c$2.unmount = function(n2) {
    m$1 && m$1(n2);
    var t2, r2 = n2.__c;
    r2 && r2.__H && (r2.__H.__.some(function(n3) {
      try {
        z(n3);
      } catch (n4) {
        t2 = n4;
      }
    }), r2.__H = void 0, t2 && c$2.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w$2(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n2) {
    var t2 = r$5, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r$5 = t2;
  }
  function B$1(n2) {
    var t2 = r$5;
    n2.__c = n2.__(), r$5 = t2;
  }
  function C(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  function D$1(n2, t2) {
    return "function" == typeof t2 ? t2(n2) : t2;
  }
  typeof GM_info !== "undefined" && GM_info.script?.version ? GM_info.script.version : "2.3.2";
  const BASE_URL = {
    BILIBILI_ROOM_INIT: "https://api.live.bilibili.com/room/v1/Room/room_init",
    BILIBILI_MSG_SEND: "https://api.live.bilibili.com/msg/send",
    BILIBILI_GET_EMOTICONS: "https://api.live.bilibili.com/xlive/web-ucenter/v2/emoticon/GetEmoticons",
    REMOTE_KEYWORDS: "https://workers.vrp.moe/gh-raw/laplace-live/public/master/artifacts/livesrtream-keywords.json"
  };
  var i = Symbol.for("preact-signals");
  function t$1() {
    if (!(s > 1)) {
      var i2, t2 = false;
      !(function() {
        var i3 = c$1;
        c$1 = void 0;
        while (void 0 !== i3) {
          if (i3.S.v === i3.v) i3.S.i = i3.i;
          i3 = i3.o;
        }
      })();
      while (void 0 !== h$1) {
        var n2 = h$1;
        h$1 = void 0;
        v++;
        while (void 0 !== n2) {
          var r2 = n2.u;
          n2.u = void 0;
          n2.f &= -3;
          if (!(8 & n2.f) && w$1(n2)) try {
            n2.c();
          } catch (n3) {
            if (!t2) {
              i2 = n3;
              t2 = true;
            }
          }
          n2 = r2;
        }
      }
      v = 0;
      s--;
      if (t2) throw i2;
    } else s--;
  }
  function n(i2) {
    if (s > 0) return i2();
    e$8 = ++u;
    s++;
    try {
      return i2();
    } finally {
      t$1();
    }
  }
  var r$4 = void 0;
  function o$4(i2) {
    var t2 = r$4;
    r$4 = void 0;
    try {
      return i2();
    } finally {
      r$4 = t2;
    }
  }
  var h$1 = void 0, s = 0, v = 0, u = 0, e$8 = 0, c$1 = void 0, d = 0;
  function a$5(i2) {
    if (void 0 !== r$4) {
      var t2 = i2.n;
      if (void 0 === t2 || t2.t !== r$4) {
        t2 = { i: 0, S: i2, p: r$4.s, n: void 0, t: r$4, e: void 0, x: void 0, r: t2 };
        if (void 0 !== r$4.s) r$4.s.n = t2;
        r$4.s = t2;
        i2.n = t2;
        if (32 & r$4.f) i2.S(t2);
        return t2;
      } else if (-1 === t2.i) {
        t2.i = 0;
        if (void 0 !== t2.n) {
          t2.n.p = t2.p;
          if (void 0 !== t2.p) t2.p.n = t2.n;
          t2.p = r$4.s;
          t2.n = void 0;
          r$4.s.n = t2;
          r$4.s = t2;
        }
        return t2;
      }
    }
  }
  function l$2(i2, t2) {
    this.v = i2;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.l = 0;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  l$2.prototype.brand = i;
  l$2.prototype.h = function() {
    return true;
  };
  l$2.prototype.S = function(i2) {
    var t2 = this, n2 = this.t;
    if (n2 !== i2 && void 0 === i2.e) {
      i2.x = n2;
      this.t = i2;
      if (void 0 !== n2) n2.e = i2;
      else o$4(function() {
        var i3;
        null == (i3 = t2.W) || i3.call(t2);
      });
    }
  };
  l$2.prototype.U = function(i2) {
    var t2 = this;
    if (void 0 !== this.t) {
      var n2 = i2.e, r2 = i2.x;
      if (void 0 !== n2) {
        n2.x = r2;
        i2.e = void 0;
      }
      if (void 0 !== r2) {
        r2.e = n2;
        i2.x = void 0;
      }
      if (i2 === this.t) {
        this.t = r2;
        if (void 0 === r2) o$4(function() {
          var i3;
          null == (i3 = t2.Z) || i3.call(t2);
        });
      }
    }
  };
  l$2.prototype.subscribe = function(i2) {
    var t2 = this;
    return j$1(function() {
      var n2 = t2.value, o2 = r$4;
      r$4 = void 0;
      try {
        i2(n2);
      } finally {
        r$4 = o2;
      }
    }, { name: "sub" });
  };
  l$2.prototype.valueOf = function() {
    return this.value;
  };
  l$2.prototype.toString = function() {
    return this.value + "";
  };
  l$2.prototype.toJSON = function() {
    return this.value;
  };
  l$2.prototype.peek = function() {
    var i2 = r$4;
    r$4 = void 0;
    try {
      return this.value;
    } finally {
      r$4 = i2;
    }
  };
  Object.defineProperty(l$2.prototype, "value", { get: function() {
    var i2 = a$5(this);
    if (void 0 !== i2) i2.i = this.i;
    return this.v;
  }, set: function(i2) {
    if (i2 !== this.v) {
      if (v > 100) throw new Error("Cycle detected");
      !(function(i3) {
        if (0 !== s && 0 === v) {
          if (i3.l !== e$8) {
            i3.l = e$8;
            c$1 = { S: i3, v: i3.v, i: i3.i, o: c$1 };
          }
        }
      })(this);
      this.v = i2;
      this.i++;
      d++;
      s++;
      try {
        for (var n2 = this.t; void 0 !== n2; n2 = n2.x) n2.t.N();
      } finally {
        t$1();
      }
    }
  } });
  function y$1(i2, t2) {
    return new l$2(i2, t2);
  }
  function w$1(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
    return false;
  }
  function _$1(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
      var n2 = t2.S.n;
      if (void 0 !== n2) t2.r = n2;
      t2.S.n = t2;
      t2.i = -1;
      if (void 0 === t2.n) {
        i2.s = t2;
        break;
      }
    }
  }
  function b$1(i2) {
    var t2 = i2.s, n2 = void 0;
    while (void 0 !== t2) {
      var r2 = t2.p;
      if (-1 === t2.i) {
        t2.S.U(t2);
        if (void 0 !== r2) r2.n = t2.n;
        if (void 0 !== t2.n) t2.n.p = r2;
      } else n2 = t2;
      t2.S.n = t2.r;
      if (void 0 !== t2.r) t2.r = void 0;
      t2 = r2;
    }
    i2.s = n2;
  }
  function p$2(i2, t2) {
    l$2.call(this, void 0);
    this.x = i2;
    this.s = void 0;
    this.g = d - 1;
    this.f = 4;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  p$2.prototype = new l$2();
  p$2.prototype.h = function() {
    this.f &= -3;
    if (1 & this.f) return false;
    if (32 == (36 & this.f)) return true;
    this.f &= -5;
    if (this.g === d) return true;
    this.g = d;
    this.f |= 1;
    if (this.i > 0 && !w$1(this)) {
      this.f &= -2;
      return true;
    }
    var i2 = r$4;
    try {
      _$1(this);
      r$4 = this;
      var t2 = this.x();
      if (16 & this.f || this.v !== t2 || 0 === this.i) {
        this.v = t2;
        this.f &= -17;
        this.i++;
      }
    } catch (i3) {
      this.v = i3;
      this.f |= 16;
      this.i++;
    }
    r$4 = i2;
    b$1(this);
    this.f &= -2;
    return true;
  };
  p$2.prototype.S = function(i2) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
    }
    l$2.prototype.S.call(this, i2);
  };
  p$2.prototype.U = function(i2) {
    if (void 0 !== this.t) {
      l$2.prototype.U.call(this, i2);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
      }
    }
  };
  p$2.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
    }
  };
  Object.defineProperty(p$2.prototype, "value", { get: function() {
    if (1 & this.f) throw new Error("Cycle detected");
    var i2 = a$5(this);
    this.h();
    if (void 0 !== i2) i2.i = this.i;
    if (16 & this.f) throw this.v;
    return this.v;
  } });
  function g$2(i2, t2) {
    return new p$2(i2, t2);
  }
  function S(i2) {
    var n2 = i2.m;
    i2.m = void 0;
    if ("function" == typeof n2) {
      s++;
      var o2 = r$4;
      r$4 = void 0;
      try {
        n2();
      } catch (t2) {
        i2.f &= -2;
        i2.f |= 8;
        m(i2);
        throw t2;
      } finally {
        r$4 = o2;
        t$1();
      }
    }
  }
  function m(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    i2.x = void 0;
    i2.s = void 0;
    S(i2);
  }
  function x$1(i2) {
    if (r$4 !== this) throw new Error("Out-of-order effect");
    b$1(this);
    r$4 = i2;
    this.f &= -2;
    if (8 & this.f) m(this);
    t$1();
  }
  function E$1(i2, t2) {
    this.x = i2;
    this.m = void 0;
    this.s = void 0;
    this.u = void 0;
    this.f = 32;
    this.name = null == t2 ? void 0 : t2.name;
  }
  E$1.prototype.c = function() {
    var i2 = this.S();
    try {
      if (8 & this.f) return;
      if (void 0 === this.x) return;
      var t2 = this.x();
      if ("function" == typeof t2) this.m = t2;
    } finally {
      i2();
    }
  };
  E$1.prototype.S = function() {
    if (1 & this.f) throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    S(this);
    _$1(this);
    s++;
    var i2 = r$4;
    r$4 = this;
    return x$1.bind(this, i2);
  };
  E$1.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.u = h$1;
      h$1 = this;
    }
  };
  E$1.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f)) m(this);
  };
  E$1.prototype.dispose = function() {
    this.d();
  };
  function j$1(i2, t2) {
    var n2 = new E$1(i2, t2);
    try {
      n2.c();
    } catch (i3) {
      n2.d();
      throw i3;
    }
    var r2 = n2.d.bind(n2);
    r2[Symbol.dispose] = r2;
    return r2;
  }
  var l$1, h, p$1 = "undefined" != typeof window && !!window.__PREACT_SIGNALS_DEVTOOLS__, _ = [];
  j$1(function() {
    l$1 = this.N;
  })();
  function g$1(i2, r2) {
    l$4[i2] = r2.bind(null, l$4[i2] || function() {
    });
  }
  function b(i2) {
    if (h) {
      var n2 = h;
      h = void 0;
      n2();
    }
    h = i2 && i2.S();
  }
  function y(i2) {
    var n2 = this, t2 = i2.data, e2 = useSignal(t2);
    e2.value = t2;
    var f2 = T$1(function() {
      var i3 = n2, t3 = n2.__v;
      while (t3 = t3.__) if (t3.__c) {
        t3.__c.__$f |= 4;
        break;
      }
      var o2 = g$2(function() {
        var i4 = e2.value.value;
        return 0 === i4 ? 0 : true === i4 ? "" : i4 || "";
      }), f3 = g$2(function() {
        return !Array.isArray(o2.value) && !t$3(o2.value);
      }), a3 = j$1(function() {
        this.N = F;
        if (f3.value) {
          var n3 = o2.value;
          if (i3.__v && i3.__v.__e && 3 === i3.__v.__e.nodeType) i3.__v.__e.data = n3;
        }
      }), v3 = n2.__$u.d;
      n2.__$u.d = function() {
        a3();
        v3.call(this);
      };
      return [f3, o2];
    }, []), a2 = f2[0], v2 = f2[1];
    return a2.value ? v2.peek() : v2.value;
  }
  y.displayName = "ReactiveTextNode";
  Object.defineProperties(l$2.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: y }, props: { configurable: true, get: function() {
    var i2 = this;
    return { data: { get value() {
      return i2.value;
    } } };
  } }, __b: { configurable: true, value: 1 } });
  g$1("__b", function(i2, n2) {
    if ("string" == typeof n2.type) {
      var r2, t2 = n2.props;
      for (var o2 in t2) if ("children" !== o2) {
        var e2 = t2[o2];
        if (e2 instanceof l$2) {
          if (!r2) n2.__np = r2 = {};
          r2[o2] = e2;
          t2[o2] = e2.peek();
        }
      }
    }
    i2(n2);
  });
  g$1("__r", function(i2, n2) {
    i2(n2);
    if (n2.type !== S$1) {
      b();
      var r2, o2 = n2.__c;
      if (o2) {
        o2.__$f &= -2;
        if (void 0 === (r2 = o2.__$u)) o2.__$u = r2 = (function(i3, n3) {
          var r3;
          j$1(function() {
            r3 = this;
          }, { name: n3 });
          r3.c = i3;
          return r3;
        })(function() {
          var i3;
          if (p$1) null == (i3 = r2.y) || i3.call(r2);
          o2.__$f |= 1;
          o2.setState({});
        }, "function" == typeof n2.type ? n2.type.displayName || n2.type.name : "");
      }
      b(r2);
    }
  });
  g$1("__e", function(i2, n2, r2, t2) {
    b();
    i2(n2, r2, t2);
  });
  g$1("diffed", function(i2, n2) {
    b();
    var r2;
    if ("string" == typeof n2.type && (r2 = n2.__e)) {
      var t2 = n2.__np, o2 = n2.props;
      if (t2) {
        var e2 = r2.U;
        if (e2) for (var f2 in e2) {
          var u2 = e2[f2];
          if (void 0 !== u2 && !(f2 in t2)) {
            u2.d();
            e2[f2] = void 0;
          }
        }
        else {
          e2 = {};
          r2.U = e2;
        }
        for (var a2 in t2) {
          var c2 = e2[a2], v2 = t2[a2];
          if (void 0 === c2) {
            c2 = w(r2, a2, v2);
            e2[a2] = c2;
          } else c2.o(v2, o2);
        }
        for (var s2 in t2) o2[s2] = t2[s2];
      }
    }
    i2(n2);
  });
  function w(i2, n2, r2, t2) {
    var o2 = n2 in i2 && void 0 === i2.ownerSVGElement, e2 = y$1(r2), f2 = r2.peek();
    return { o: function(i3, n3) {
      e2.value = i3;
      f2 = i3.peek();
    }, d: j$1(function() {
      this.N = F;
      var r3 = e2.value.value;
      if (f2 !== r3) {
        f2 = void 0;
        if (o2) i2[n2] = r3;
        else if (null != r3 && (false !== r3 || "-" === n2[4])) i2.setAttribute(n2, r3);
        else i2.removeAttribute(n2);
      } else f2 = void 0;
    }) };
  }
  g$1("unmount", function(i2, n2) {
    if ("string" == typeof n2.type) {
      var r2 = n2.__e;
      if (r2) {
        var t2 = r2.U;
        if (t2) {
          r2.U = void 0;
          for (var o2 in t2) {
            var e2 = t2[o2];
            if (e2) e2.d();
          }
        }
      }
      n2.__np = void 0;
    } else {
      var f2 = n2.__c;
      if (f2) {
        var u2 = f2.__$u;
        if (u2) {
          f2.__$u = void 0;
          u2.d();
        }
      }
    }
    i2(n2);
  });
  g$1("__h", function(i2, n2, r2, t2) {
    if (t2 < 3 || 9 === t2) n2.__$f |= 2;
    i2(n2, r2, t2);
  });
  C$1.prototype.shouldComponentUpdate = function(i2, n2) {
    if (this.__R) return true;
    var r2 = this.__$u, t2 = r2 && void 0 !== r2.s;
    for (var o2 in n2) return true;
    if (this.__f || "boolean" == typeof this.u && true === this.u) {
      var e2 = 2 & this.__$f;
      if (!(t2 || e2 || 4 & this.__$f)) return true;
      if (1 & this.__$f) return true;
    } else {
      if (!(t2 || 4 & this.__$f)) return true;
      if (3 & this.__$f) return true;
    }
    for (var f2 in i2) if ("__source" !== f2 && i2[f2] !== this.props[f2]) return true;
    for (var u2 in this.props) if (!(u2 in i2)) return true;
    return false;
  };
  function useSignal(i2, n2) {
    return T$1(function() {
      return y$1(i2, n2);
    }, []);
  }
  var q$1 = function(i2) {
    queueMicrotask(function() {
      queueMicrotask(i2);
    });
  };
  function x() {
    n(function() {
      var i2;
      while (i2 = _.shift()) l$1.call(i2);
    });
  }
  function F() {
    if (1 === _.push(this)) (l$4.requestAnimationFrame || q$1)(x);
  }
  const OLD_DIALOG_DEFAULT_WIDTH = 340;
  const PREVIOUS_DIALOG_DEFAULT_WIDTH = 380;
  const DIALOG_DEFAULT_WIDTH = 381;
  function getInitialDialogWidth(storedWidth) {
    if (storedWidth === OLD_DIALOG_DEFAULT_WIDTH || storedWidth === PREVIOUS_DIALOG_DEFAULT_WIDTH || storedWidth === 382) {
      return DIALOG_DEFAULT_WIDTH;
    }
    return typeof storedWidth === "number" ? storedWidth : DIALOG_DEFAULT_WIDTH;
  }
  const STORAGE_PREFIX = "chatterbox-lite:";
  function canUseGmStorage() {
    return typeof GM_getValue === "function" && typeof GM_setValue === "function";
  }
  function readLocalStorage(key, defaultValue) {
    try {
      const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return raw === null ? defaultValue : JSON.parse(raw);
    } catch {
      return defaultValue;
    }
  }
  function writeLocalStorage(key, value) {
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch {
    }
  }
  function getStoredValue(key, defaultValue) {
    if (canUseGmStorage()) return GM_getValue(key, defaultValue);
    return readLocalStorage(key, defaultValue);
  }
  function setStoredValue(key, value) {
    if (canUseGmStorage()) {
      GM_setValue(key, value);
      return;
    }
    writeLocalStorage(key, value);
  }
  function gmSignal(key, defaultValue) {
    const s2 = y$1(getStoredValue(key, defaultValue));
    j$1(() => setStoredValue(key, s2.value));
    return s2;
  }
  const storedDialogWidth = getStoredValue("dialogWidth", void 0);
  const initialDialogWidth = getInitialDialogWidth(storedDialogWidth);
  if (storedDialogWidth === OLD_DIALOG_DEFAULT_WIDTH || storedDialogWidth === PREVIOUS_DIALOG_DEFAULT_WIDTH || storedDialogWidth === 382) {
    setStoredValue("dialogWidth", DIALOG_DEFAULT_WIDTH);
  }
  const msgSendInterval = gmSignal("msgSendInterval", 1);
  const maxLength = gmSignal("maxLength", 38);
  const audioOnlyEnabled = gmSignal("audioOnlyEnabled", false);
  const autoSeekEnabled = gmSignal("autoSeekEnabled", false);
  const autoSeekBufferThreshold = gmSignal("autoSeekBufferThreshold", 1.7);
  const dialogOpen = gmSignal("dialogOpen", false);
  const dialogWidth = gmSignal("dialogWidth", initialDialogWidth);
  const dialogLeft = gmSignal("dialogLeft", null);
  const dialogTop = gmSignal("dialogTop", null);
  gmSignal("normalSendPanelOpen", true);
  const replacementPanelOpen = gmSignal("replacementPanelOpen", true);
  const logPanelOpen = gmSignal("logPanelOpen", false);
  const settingsPanelOpen = gmSignal("settingsPanelOpen", false);
  const showAudioOnlyButton = gmSignal("showAudioOnlyButton", true);
  const showNormalSendPanel = gmSignal("showNormalSendPanel", true);
  const showReplacementPanel = gmSignal("showReplacementPanel", true);
  const showLogPanel = gmSignal("showLogPanel", true);
  const blockedRetryEnabled = gmSignal("blockedRetryEnabled", false);
  const pinnedEmoticonUniques = gmSignal("pinnedEmoticonUniques", []);
  const danmakuDirectEnabled = gmSignal("danmakuDirectEnabled", true);
  const sendHistory = gmSignal("sendHistory", []);
  const localGlobalRules = gmSignal("localGlobalRules", []);
  const localRoomRules = gmSignal("localRoomRules", {});
  const remoteKeywords = gmSignal("remoteKeywords", null);
  const remoteKeywordsLastSync = gmSignal("remoteKeywordsLastSync", null);
  const cachedRoomId = y$1(null);
  const cachedStreamerUid = y$1(null);
  const cachedEmoticonPackages = y$1([]);
  const replacementMap = y$1(null);
  const fasongText = y$1("");
  const autoSeekCurrentBufferLen = y$1(0);
  const autoSeekCurrentRate = y$1(1);
  function isEmoticonUnique(msg) {
    return cachedEmoticonPackages.value.some((pkg) => pkg.emoticons.some((e2) => e2.emoticon_unique === msg));
  }
  function findEmoticon(msg) {
    for (const pkg of cachedEmoticonPackages.value) {
      for (const e2 of pkg.emoticons) {
        if (e2.emoticon_unique === msg) return e2;
      }
    }
    return null;
  }
  function isLockedEmoticon(msg) {
    const emo = findEmoticon(msg);
    return emo !== null && emo.perm === 0;
  }
  function formatLockedEmoticonReject(msg, label) {
    const reqText = findEmoticon(msg)?.unlock_show_text?.trim();
    const reason = reqText ? `需要 ${reqText}` : "权限不足";
    return `🔒 ${label}：${msg} 已被平台锁定（${reason}），已阻止发送`;
  }
  const EMOTICON_UNIQUE_PATTERN = /^[a-z]+(_\d+)+$/;
  function isUnavailableEmoticon(msg) {
    if (!EMOTICON_UNIQUE_PATTERN.test(msg)) return false;
    if (cachedEmoticonPackages.value.length === 0) return false;
    return !isEmoticonUnique(msg);
  }
  function formatUnavailableEmoticonReject(msg, label) {
    return `🚫 ${label}：${msg} 不在当前房间表情包内，已阻止发送`;
  }
  const LIVE_LIKE_COUNT = 30;
  const LIVE_LIKE_ENDPOINT = "https://api.live.bilibili.com/xlive/app-ucenter/v1/like_info_v3/like/likeReportV3";
  function getResponseMessage$1(body) {
    return body.message?.trim() || body.msg?.trim() || "unknown API error";
  }
  function buildLiveLikeBody({
    roomId,
    anchorId,
    userId,
    csrfToken,
    count = LIVE_LIKE_COUNT
  }) {
    return new URLSearchParams({
      click_time: String(count),
      room_id: String(roomId),
      anchor_id: String(anchorId),
      uid: userId,
      csrf: csrfToken,
      csrf_token: csrfToken,
      visit_id: ""
    });
  }
  function buildLiveLikeResult(response, body, count) {
    if (!response.ok) {
      return {
        success: false,
        count,
        error: `HTTP ${response.status}: ${response.statusText || "request failed"}`
      };
    }
    if (body.code !== 0) {
      const detail = body.code === void 0 ? "missing code" : `code=${body.code}`;
      return {
        success: false,
        count,
        error: `${detail}: ${getResponseMessage$1(body)}`
      };
    }
    return { success: true, count };
  }
  const REMOTE_KEYWORDS_SYNC_INTERVAL_MS = 10 * 60 * 1e3;
  let backgroundSyncPromise = null;
  async function fetchRemoteKeywords() {
    const response = await fetch(BASE_URL.REMOTE_KEYWORDS);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return await response.json();
  }
  async function syncRemoteKeywords() {
    remoteKeywords.value = await fetchRemoteKeywords();
    remoteKeywordsLastSync.value = Date.now();
    buildReplacementMap();
  }
  async function ensureRemoteKeywordsSynced(force = false) {
    const last = remoteKeywordsLastSync.value;
    if (force || !last || Date.now() - last > REMOTE_KEYWORDS_SYNC_INTERVAL_MS) {
      await syncRemoteKeywords();
      return;
    }
    buildReplacementMap();
  }
  function warmRemoteKeywordsInBackground(force = false) {
    const last = remoteKeywordsLastSync.value;
    if (!force && last && Date.now() - last <= REMOTE_KEYWORDS_SYNC_INTERVAL_MS) {
      buildReplacementMap();
      return;
    }
    if (backgroundSyncPromise) return;
    backgroundSyncPromise = syncRemoteKeywords().catch(() => {
      buildReplacementMap();
    }).finally(() => {
      backgroundSyncPromise = null;
    });
  }
  function buildReplacementMap() {
    const map = new Map();
    const rk = remoteKeywords.value;
    if (rk) {
      const globalKeywords = rk.global?.keywords ?? {};
      for (const [from, to] of Object.entries(globalKeywords)) {
        if (from) map.set(from, to);
      }
      const rid2 = cachedRoomId.value;
      if (rid2 !== null) {
        const roomData = rk.rooms?.find((r2) => String(r2.room) === String(rid2));
        const roomKeywords = roomData?.keywords ?? {};
        for (const [from, to] of Object.entries(roomKeywords)) {
          if (from) map.set(from, to);
        }
      }
    }
    for (const rule of localGlobalRules.value) {
      if (rule.from) map.set(rule.from, rule.to ?? "");
    }
    const rid = cachedRoomId.value;
    if (rid !== null) {
      const roomRules = localRoomRules.value[String(rid)] ?? [];
      for (const rule of roomRules) {
        if (rule.from) map.set(rule.from, rule.to ?? "");
      }
    }
    replacementMap.value = map;
  }
  function applyReplacements(text) {
    if (replacementMap.value === null) {
      buildReplacementMap();
    }
    let result = text;
    for (const [from, to] of (replacementMap.value ?? new Map()).entries()) {
      result = result.split(from).join(to);
    }
    return result;
  }
  function getReplacementEntries() {
    if (replacementMap.value === null) {
      buildReplacementMap();
    }
    return Array.from((replacementMap.value ?? new Map()).entries());
  }
  function getGraphemes(str) {
    const segmenter = new Intl.Segmenter("zh", { granularity: "grapheme" });
    return Array.from(segmenter.segment(str), ({ segment }) => segment);
  }
  function trimText(text, maxLength2) {
    if (!text) return [text];
    const graphemes = getGraphemes(text);
    if (graphemes.length <= maxLength2) return [text];
    const parts = [];
    let currentPart = [];
    for (const char of graphemes) {
      if (currentPart.length >= maxLength2) {
        parts.push(currentPart.join(""));
        currentPart = [char];
      } else {
        currentPart.push(char);
      }
    }
    if (currentPart.length > 0) {
      parts.push(currentPart.join(""));
    }
    return parts;
  }
  function extractRoomNumber(url) {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split("/").filter((segment) => segment !== "");
    return pathSegments.find((segment) => Number.isInteger(Number(segment)));
  }
  function isBilibiliLiveRoomPage(url, isTopWindow = true) {
    if (!isTopWindow) return false;
    const urlObj = new URL(url);
    return urlObj.protocol === "https:" && urlObj.hostname === "live.bilibili.com" && /^\/\d+\/?$/.test(urlObj.pathname);
  }
  function formatDanmakuError(error) {
    if (!error) return "未知错误";
    if (error === "f") return "f - 包含全局屏蔽词";
    if (error === "k") return "k - 包含房间屏蔽词";
    return error;
  }
  function processMessages(text, maxLength2) {
    return text.split("\n").flatMap((line) => trimText(line, maxLength2)).filter((line) => line?.trim());
  }
  function getRoomCacheKey(url) {
    return extractRoomNumber(url) ?? null;
  }
  function shouldRefreshRoomCache(cachedRoomKey2, currentRoomKey) {
    return cachedRoomKey2 !== currentRoomKey;
  }
  const SEND_DANMAKU_TIMEOUT_MS = 1e4;
  function getResponseMessage(body) {
    return body.message?.trim() || body.msg?.trim() || "unknown API error";
  }
  function buildSendDanmakuResult(response, body, message, isEmoticon) {
    if (!response.ok) {
      return {
        success: false,
        message,
        isEmoticon,
        error: `HTTP ${response.status}: ${response.statusText || "request failed"}`
      };
    }
    if (body.code !== 0) {
      const detail = body.code === void 0 ? "missing code" : `code=${body.code}`;
      return {
        success: false,
        message,
        isEmoticon,
        error: `${detail}: ${getResponseMessage(body)}`
      };
    }
    return { success: true, message, isEmoticon };
  }
  async function fetchWithTimeout(fetcher, input, init = {}, timeoutMs = SEND_DANMAKU_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);
    try {
      return await fetcher(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }
  let cachedRoomKey = null;
  function getCookie(name) {
    const prefix = `${name}=`;
    return document.cookie.split(";").map((c2) => c2.trim()).find((c2) => c2.startsWith(prefix))?.slice(prefix.length);
  }
  function getSpmPrefix() {
    const metaTag = document.querySelector('meta[name="spm_prefix"]');
    return metaTag?.getAttribute("content") ?? "444.8";
  }
  function getCsrfToken() {
    return getCookie("bili_jct");
  }
  function getCurrentUserId() {
    return getCookie("DedeUserID");
  }
  async function getRoomId(url = window.location.href) {
    const shortUid = extractRoomNumber(url);
    if (!shortUid) throw new Error("无法从当前 URL 解析直播间号");
    const room = await fetch(`${BASE_URL.BILIBILI_ROOM_INIT}?id=${shortUid}`, {
      method: "GET",
      credentials: "include"
    });
    if (!room.ok) {
      throw new Error(`HTTP ${room.status}: ${room.statusText}`);
    }
    const roomData = await room.json();
    cachedStreamerUid.value = roomData.data.uid;
    return roomData.data.room_id;
  }
  function resetRoomScopedCache() {
    cachedRoomId.value = null;
    cachedStreamerUid.value = null;
    cachedEmoticonPackages.value = [];
    replacementMap.value = null;
  }
  async function ensureRoomId(url = window.location.href) {
    const currentRoomKey = getRoomCacheKey(url);
    if (shouldRefreshRoomCache(cachedRoomKey, currentRoomKey)) {
      resetRoomScopedCache();
    }
    let roomId = cachedRoomId.value;
    if (roomId === null) {
      roomId = await getRoomId(url);
      cachedRoomId.value = roomId;
      cachedRoomKey = currentRoomKey;
      buildReplacementMap();
    }
    return roomId;
  }
  async function fetchEmoticons(roomId) {
    const resp = await fetch(`${BASE_URL.BILIBILI_GET_EMOTICONS}?platform=pc&room_id=${roomId}`, {
      method: "GET",
      credentials: "include"
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    const json = await resp.json();
    if (json?.code === 0 && json.data?.data) {
      cachedEmoticonPackages.value = json.data.data.filter((pkg) => pkg.pkg_id !== 100);
    }
  }
  async function sendDanmaku(message, roomId, csrfToken) {
    const emoticon = isEmoticonUnique(message);
    const form = new FormData();
    form.append("bubble", "2");
    form.append("msg", message);
    form.append("color", "16777215");
    form.append("mode", "1");
    form.append("room_type", "0");
    form.append("jumpfrom", "0");
    form.append("reply_mid", "0");
    form.append("reply_attr", "0");
    form.append("replay_dmid", "");
    form.append("statistics", '{"appId":100,"platform":5}');
    form.append("fontsize", "25");
    form.append("rnd", String(Math.floor(Date.now() / 1e3)));
    form.append("roomid", String(roomId));
    form.append("csrf", csrfToken);
    form.append("csrf_token", csrfToken);
    if (emoticon) {
      form.append("dm_type", "1");
      form.append("emoticon_options", "{}");
    }
    try {
      if (!cachedWbiKeys) {
        await waitForWbiKeys(800, 100);
      }
      let query = "";
      if (cachedWbiKeys) {
        query = encodeWbi({ web_location: getSpmPrefix() }, cachedWbiKeys);
      }
      const querySuffix = query ? `?${query}` : "";
      const resp = await fetchWithTimeout(
        fetch,
        `${BASE_URL.BILIBILI_MSG_SEND}${querySuffix}`,
        {
          method: "POST",
          credentials: "include",
          body: form
        },
        SEND_DANMAKU_TIMEOUT_MS
      );
      let json;
      try {
        json = await resp.json();
      } catch (err) {
        return {
          success: false,
          message,
          isEmoticon: emoticon,
          error: err instanceof Error ? `Invalid JSON response: ${err.message}` : "Invalid JSON response"
        };
      }
      return buildSendDanmakuResult(
        { ok: resp.ok, status: resp.status, statusText: resp.statusText },
        json,
        message,
        emoticon
      );
    } catch (err) {
      return {
        success: false,
        message,
        isEmoticon: emoticon,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }
  async function sendLiveLike(roomId, anchorId, userId, csrfToken) {
    const body = buildLiveLikeBody({ roomId, anchorId, userId, csrfToken });
    try {
      const resp = await fetch(LIVE_LIKE_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });
      let json;
      try {
        json = await resp.json();
      } catch (err) {
        return {
          success: false,
          count: LIVE_LIKE_COUNT,
          error: err instanceof Error ? `Invalid JSON response: ${err.message}` : "Invalid JSON response"
        };
      }
      return buildLiveLikeResult({ ok: resp.ok, status: resp.status, statusText: resp.statusText }, json, LIVE_LIKE_COUNT);
    } catch (err) {
      return {
        success: false,
        count: LIVE_LIKE_COUNT,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }
  var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const inFlight = new Map();
  function loadScript(url, getGlobal) {
    const existing = getGlobal();
    if (existing) return Promise.resolve(existing);
    const cached = inFlight.get(url);
    if (cached) return cached;
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        const g2 = getGlobal();
        if (g2) resolve(g2);
        else {
          inFlight.delete(url);
          reject(new Error(`script loaded but expected global not found: ${url}`));
        }
      };
      script.onerror = () => {
        inFlight.delete(url);
        reject(new Error(`failed to load script from ${url}`));
      };
      document.head.appendChild(script);
    });
    inFlight.set(url, promise);
    return promise;
  }
  const MAX_LOG_LINES = 300;
  const logLines = y$1([]);
  function appendLog(arg, label, display) {
    const message = typeof arg === "string" ? arg : arg.cancelled ? `⏭ ${label}: ${display}（已跳过）` : arg.success ? `✅ ${label}: ${display}` : `❌ ${label}: ${display}，原因：${formatDanmakuError(arg.error)}`;
    const lines = logLines.value;
    logLines.value = lines.length >= MAX_LOG_LINES ? [...lines.slice(lines.length - MAX_LOG_LINES + 1), message] : [...lines, message];
  }
  const HTML_FLAG_CLASS = "lc-audio-only";
  const STYLE_ID$1 = "lc-audio-only-style";
  const AUDIO_EL_ID = "lc-audio-only-stream";
  const MPEGTS_CDN_URL = "https://unpkg.com/mpegts.js@1.8.0/dist/mpegts.js";
  const STREAM_REFRESH_MS = 50 * 60 * 1e3;
  const STYLE$1 = `
/* Hide the actual video element while audio keeps playing. The static
 * MP4 poster that bilibili's player shows after stopPlayback() also
 * lives inside #live-player, so this rule covers the "stopped" state
 * too without revealing a frozen frame. */
html.${HTML_FLAG_CLASS} #live-player video {
  visibility: hidden;
}

/* Visual hint that the player frame is intentionally blank rather than
 * broken: a centered "🎧 仅音频模式" label fades in while the flag is
 * set. Anchored to #live-player so it tracks the player size on resize. */
html.${HTML_FLAG_CLASS} #live-player {
  position: relative;
}
html.${HTML_FLAG_CLASS} #live-player::after {
  content: '🎧 Chatterbox Lite - 仅音频模式';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.55);
  font-size: 16px;
  letter-spacing: 0.5px;
  pointer-events: none;
  z-index: 1;
}

/* Bilibili overlays a streamer-uploaded cover image (.web-player-video-
 * cover-img-wrap) on top of the video during pre-roll / connection
 * loading. In audio-only mode the video element is hidden but this
 * overlay sits on a separate layer and would otherwise stay visible
 * — obscuring our "🎧 仅音频模式" hint label. Scope to the audio-only
 * flag (matching every other rule in this stylesheet) so we don't
 * hide the cover during normal video playback. */
html.${HTML_FLAG_CLASS} .web-player-video-cover-img-wrap {
  display: none !important;
}
`;
  function getLivePlayer() {
    const candidate = _unsafeWindow.livePlayer;
    return candidate ?? null;
  }
  function getMpegtsFromWindow() {
    const candidate = _unsafeWindow.mpegts;
    return candidate ?? null;
  }
  function loadMpegts() {
    return loadScript(MPEGTS_CDN_URL, getMpegtsFromWindow);
  }
  async function fetchAudioOnlyStreamUrl(roomId) {
    const params = new URLSearchParams({
      appkey: "iVGUTjsxvpLeuDCf",
      build: "6215200",
      c_locale: "zh_CN",
      channel: "bili",
      codec: "0",
      device: "android",
      device_name: "VTR-AL00",
      dolby: "1",
      format: "0,2",
      free_type: "0",
      http: "1",
      mask: "0",
      mobi_app: "android",
      network: "wifi",
      no_playurl: "0",
      only_audio: "1",
      only_video: "0",
      platform: "android",
      play_type: "0",
      protocol: "0,1",
      qn: "10000",
      s_locale: "zh_CN",
      statistics: '{"appId":1,"platform":3,"version":"6.21.5","abtest":""}',
      ts: String(Math.floor(Date.now() / 1e3)),
      room_id: String(roomId)
    });
    const url = `https://api.live.bilibili.com/xlive/app-room/v2/index/getRoomPlayInfo?${params.toString()}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    const data = await resp.json();
    if (data.code !== 0) throw new Error(`API error code=${data.code} message=${data.message ?? ""}`);
    if (data.data?.live_status !== 1) {
      return { url: "", unavailable: true };
    }
    const streams = data.data?.playurl_info?.playurl?.stream ?? [];
    for (const stream of streams) {
      if (stream.protocol_name !== "http_stream") continue;
      for (const format of stream.format ?? []) {
        if (format.format_name !== "flv") continue;
        const codec = format.codec?.[0];
        const urlInfo = codec?.url_info?.[0];
        if (!codec?.base_url || !urlInfo?.host) continue;
        const full = `${urlInfo.host}${codec.base_url}${urlInfo.extra ?? ""}`;
        return { url: full.replace(/^http:\/\//, "https://") };
      }
    }
    return { url: "", unavailable: true };
  }
  let audioEl = null;
  let mpegtsPlayer = null;
  let activeRoomId = null;
  let streamRefreshTimer = null;
  let watchdogTimer = null;
  let engagementGen = 0;
  let nativePlayerStopped = false;
  function clearStreamRefreshTimer() {
    if (streamRefreshTimer !== null) {
      clearTimeout(streamRefreshTimer);
      streamRefreshTimer = null;
    }
  }
  function clearWatchdog() {
    if (watchdogTimer !== null) {
      clearInterval(watchdogTimer);
      watchdogTimer = null;
    }
  }
  function startWatchdog() {
    clearWatchdog();
    watchdogTimer = setInterval(() => {
      if (!audioOnlyEnabled.value) return;
      const v2 = document.querySelector("#live-player video");
      if (!v2) return;
      if (v2.src.startsWith("blob:")) {
        const player = getLivePlayer();
        try {
          player?.stopPlayback?.();
        } catch (err) {
          console.warn("[audio-only] watchdog stopPlayback failed:", err);
        }
      }
    }, 1500);
  }
  let preservedVolume = 1;
  let preservedMuted = false;
  function captureNativeVolume() {
    const info = getLivePlayer()?.getPlayerInfo?.();
    const v2 = info?.volume?.value;
    if (typeof v2 === "number" && Number.isFinite(v2)) {
      preservedVolume = Math.max(0, Math.min(1, v2 / 100));
    } else {
      const ve = document.querySelector("#live-player video");
      if (ve && Number.isFinite(ve.volume)) preservedVolume = ve.volume;
    }
    const muted = info?.volume?.disabled;
    if (typeof muted === "boolean") preservedMuted = muted;
  }
  function syncVolumeToAudioEl() {
    if (!audioEl) return;
    if (Math.abs(audioEl.volume - preservedVolume) > 5e-3) audioEl.volume = preservedVolume;
    if (audioEl.muted !== preservedMuted) audioEl.muted = preservedMuted;
  }
  function destroyAudioPipeline() {
    clearStreamRefreshTimer();
    clearWatchdog();
    if (mpegtsPlayer) {
      try {
        mpegtsPlayer.pause();
      } catch {
      }
      try {
        mpegtsPlayer.unload();
      } catch {
      }
      try {
        mpegtsPlayer.detachMediaElement();
      } catch {
      }
      try {
        mpegtsPlayer.destroy();
      } catch {
      }
      mpegtsPlayer = null;
    }
    if (audioEl) {
      audioEl.pause();
      audioEl.removeAttribute("src");
      audioEl.remove();
      audioEl = null;
    }
    activeRoomId = null;
  }
  async function attachMpegtsPlayer(url, mpegts) {
    if (!audioEl) {
      audioEl = document.createElement("audio");
      audioEl.id = AUDIO_EL_ID;
      audioEl.style.display = "none";
      document.body.appendChild(audioEl);
    } else if (mpegtsPlayer) {
      try {
        mpegtsPlayer.destroy();
      } catch {
      }
      mpegtsPlayer = null;
    }
    mpegtsPlayer = mpegts.createPlayer({
      type: "flv",
      isLive: true,
      hasVideo: false,
      hasAudio: true,
      url
    });
    mpegtsPlayer.attachMediaElement(audioEl);
    mpegtsPlayer.load();
    syncVolumeToAudioEl();
    try {
      await audioEl.play();
    } catch (err) {
      console.warn("[audio-only] autoplay blocked or play() failed:", err);
    }
  }
  function scheduleStreamRefresh(roomId, gen) {
    clearStreamRefreshTimer();
    streamRefreshTimer = setTimeout(() => {
      streamRefreshTimer = null;
      if (gen !== engagementGen) return;
      if (!audioOnlyEnabled.value) return;
      void refreshStream(roomId, gen);
    }, STREAM_REFRESH_MS);
  }
  async function refreshStream(roomId, gen) {
    try {
      const [{ url, unavailable }, mpegts] = await Promise.all([fetchAudioOnlyStreamUrl(roomId), loadMpegts()]);
      if (gen !== engagementGen) return;
      if (unavailable || !url) {
        appendLog("⚠️ 仅音频流刷新失败：直播间未在直播");
        return;
      }
      await attachMpegtsPlayer(url, mpegts);
      if (gen !== engagementGen) return;
      scheduleStreamRefresh(roomId, gen);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      appendLog(`⚠️ 仅音频流刷新失败：${msg}`);
      if (gen === engagementGen) scheduleStreamRefresh(roomId, gen);
    }
  }
  async function engageAudioOnly() {
    const gen = ++engagementGen;
    const roomId = await ensureRoomId();
    if (gen !== engagementGen) return;
    const [info, mpegts] = await Promise.all([fetchAudioOnlyStreamUrl(roomId), loadMpegts()]);
    if (gen !== engagementGen) return;
    if (info.unavailable || !info.url) {
      throw new Error("该直播间未提供仅音频流（可能未开播）");
    }
    captureNativeVolume();
    const player = getLivePlayer();
    if (player?.stopPlayback) {
      try {
        player.stopPlayback();
        nativePlayerStopped = true;
      } catch (err) {
        console.warn("[audio-only] stopPlayback failed:", err);
      }
    }
    activeRoomId = roomId;
    await attachMpegtsPlayer(info.url, mpegts);
    if (gen !== engagementGen) {
      return;
    }
    startWatchdog();
    scheduleStreamRefresh(roomId, gen);
    appendLog("🎧 已开启仅音频模式");
  }
  function disengageAudioOnly() {
    const hadPipeline = mpegtsPlayer !== null || nativePlayerStopped;
    engagementGen++;
    destroyAudioPipeline();
    if (!hadPipeline) return;
    if (nativePlayerStopped) {
      nativePlayerStopped = false;
      const player = getLivePlayer();
      if (player?.reload) {
        try {
          player.reload();
          appendLog("🎬 已关闭仅音频模式，正在恢复直播");
          return;
        } catch (err) {
          console.warn("[audio-only] reload failed:", err);
          appendLog("⚠️ 恢复直播失败，请刷新页面");
          return;
        }
      }
    }
    appendLog("🎬 已关闭仅音频模式");
  }
  let pendingApplyTimer = null;
  function clearPendingApply() {
    if (pendingApplyTimer !== null) {
      clearTimeout(pendingApplyTimer);
      pendingApplyTimer = null;
    }
  }
  function applyAudioOnlyMode(enabled) {
    ensureStyleEl();
    document.documentElement.classList.toggle(HTML_FLAG_CLASS, enabled);
    clearPendingApply();
    pendingApplyTimer = setTimeout(async () => {
      pendingApplyTimer = null;
      const desired = audioOnlyEnabled.value;
      try {
        if (desired) {
          if (mpegtsPlayer && activeRoomId !== null) return;
          await engageAudioOnly();
        } else {
          disengageAudioOnly();
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn("[audio-only] apply failed:", err);
        appendLog(`⚠️ 仅音频模式启动失败：${msg}`);
        destroyAudioPipeline();
        if (nativePlayerStopped) {
          nativePlayerStopped = false;
          const player = getLivePlayer();
          if (player?.reload) {
            try {
              player.reload();
            } catch {
            }
          }
        }
      }
    }, 0);
  }
  function ensureStyleEl() {
    if (document.getElementById(STYLE_ID$1)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID$1;
    el.textContent = STYLE$1;
    document.head.appendChild(el);
  }
  function removeStyleEl() {
    document.getElementById(STYLE_ID$1)?.remove();
  }
  let stateEffectDispose$1 = null;
  function startAudioOnly() {
    if (stateEffectDispose$1) return;
    ensureStyleEl();
    stateEffectDispose$1 = j$1(() => {
      applyAudioOnlyMode(audioOnlyEnabled.value);
    });
  }
  function stopAudioOnly() {
    if (stateEffectDispose$1) {
      stateEffectDispose$1();
      stateEffectDispose$1 = null;
    }
    clearPendingApply();
    destroyAudioPipeline();
    nativePlayerStopped = false;
    document.documentElement.classList.remove(HTML_FLAG_CLASS);
    removeStyleEl();
  }
  const SPEEDUP_LADDER = [
    [2, 1.3],
    [1, 1.2],
    [0, 1.1]
  ];
  const SLOWDOWN_LADDER = [
    [0.2, 0.1],
    [0.3, 0.3],
    [0.6, 0.6]
  ];
  function getAutoSeekPlaybackRate({ bufferLen, threshold, currentRate }) {
    if (!Number.isFinite(threshold) || threshold <= 0) return currentRate;
    for (const [bufferLimit, rate] of SLOWDOWN_LADDER) {
      if (bufferLen < bufferLimit) return rate;
    }
    const over = bufferLen - threshold;
    for (const [delta, rate] of SPEEDUP_LADDER) {
      if (over > delta) return rate;
    }
    return 1;
  }
  const TICK_THROTTLE_MS = 80;
  const RATE_EPSILON = 5e-3;
  const EVENTS_OF_INTEREST = [
    "progress",
    "waiting",
    "timeupdate",
    "playing",
    "ratechange"
  ];
  let attachedMedia = null;
  let containerObserver = null;
  let lastTickAt = 0;
  let pendingTickTimer = null;
  let stateEffectDispose = null;
  function getMediaTarget() {
    if (audioOnlyEnabled.value) {
      const el = document.getElementById(AUDIO_EL_ID);
      return el instanceof HTMLAudioElement ? el : null;
    }
    return document.querySelector("#live-player video");
  }
  function getBufferLen(media) {
    try {
      if (media.buffered.length === 0) return null;
      const len = media.buffered.end(media.buffered.length - 1) - media.currentTime;
      return Number.isFinite(len) ? len : null;
    } catch {
      return null;
    }
  }
  function setRate(media, rate) {
    if (Math.abs(media.playbackRate - rate) < RATE_EPSILON) {
      autoSeekCurrentRate.value = media.playbackRate;
      return;
    }
    media.playbackRate = rate;
    autoSeekCurrentRate.value = rate;
  }
  function tick() {
    if (document.hidden) return;
    const media = getMediaTarget();
    if (!media) return;
    const bufferLen = getBufferLen(media);
    if (bufferLen !== null) autoSeekCurrentBufferLen.value = bufferLen;
    if (media.paused || bufferLen === null) {
      autoSeekCurrentRate.value = media.playbackRate;
      return;
    }
    setRate(
      media,
      getAutoSeekPlaybackRate({
        bufferLen,
        threshold: autoSeekBufferThreshold.value,
        currentRate: media.playbackRate
      })
    );
  }
  function scheduleTick() {
    const now = Date.now();
    const elapsed = now - lastTickAt;
    if (elapsed >= TICK_THROTTLE_MS) {
      lastTickAt = now;
      tick();
      return;
    }
    if (pendingTickTimer !== null) return;
    pendingTickTimer = setTimeout(() => {
      pendingTickTimer = null;
      lastTickAt = Date.now();
      tick();
    }, TICK_THROTTLE_MS - elapsed);
  }
  function attachListeners(media) {
    if (attachedMedia === media) return;
    detachListeners();
    for (const evt of EVENTS_OF_INTEREST) {
      media.addEventListener(evt, scheduleTick, { passive: true });
    }
    attachedMedia = media;
    scheduleTick();
  }
  function detachListeners() {
    if (!attachedMedia) return;
    for (const evt of EVENTS_OF_INTEREST) {
      attachedMedia.removeEventListener(evt, scheduleTick);
    }
    attachedMedia = null;
  }
  function resetMetrics() {
    autoSeekCurrentBufferLen.value = 0;
    autoSeekCurrentRate.value = 1;
  }
  function applyCurrentTarget() {
    const target = getMediaTarget();
    if (target) {
      attachListeners(target);
      return;
    }
    if (attachedMedia) detachListeners();
    resetMetrics();
  }
  function ensureContainerObserver() {
    if (containerObserver) return;
    applyCurrentTarget();
    containerObserver = new MutationObserver(applyCurrentTarget);
    containerObserver.observe(document.documentElement, { childList: true, subtree: true });
  }
  function destroyContainerObserver() {
    containerObserver?.disconnect();
    containerObserver = null;
  }
  function clearPendingTick() {
    if (pendingTickTimer === null) return;
    clearTimeout(pendingTickTimer);
    pendingTickTimer = null;
  }
  function resetMediaRate() {
    const video = document.querySelector("#live-player video");
    if (video && Math.abs(video.playbackRate - 1) > RATE_EPSILON) video.playbackRate = 1;
    const audio = document.getElementById(AUDIO_EL_ID);
    if (audio instanceof HTMLAudioElement && Math.abs(audio.playbackRate - 1) > RATE_EPSILON) audio.playbackRate = 1;
  }
  function onVisibilityChange() {
    if (!document.hidden) scheduleTick();
  }
  function startAutoSeek() {
    if (stateEffectDispose) return;
    stateEffectDispose = j$1(() => {
      const enabled = autoSeekEnabled.value;
      void audioOnlyEnabled.value;
      if (enabled) {
        ensureContainerObserver();
        applyCurrentTarget();
        document.addEventListener("visibilitychange", onVisibilityChange);
        return;
      }
      destroyContainerObserver();
      detachListeners();
      clearPendingTick();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resetMetrics();
      resetMediaRate();
    });
  }
  function stopAutoSeek() {
    stateEffectDispose?.();
    stateEffectDispose = null;
    destroyContainerObserver();
    detachListeners();
    clearPendingTick();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    resetMetrics();
    resetMediaRate();
  }
  function buildSendableDanmakuMessage(info) {
    const text = info.text.trim();
    if (!text || info.hasLargeEmote) return null;
    if (!info.isReply) return text;
    const uname = info.uname?.trim();
    return uname ? `@${uname} ${text}` : null;
  }
  const SEND_HISTORY_LIMIT = 30;
  function addSendHistoryEntry(history, message, limit = SEND_HISTORY_LIMIT) {
    const trimmed = message.trim();
    if (!trimmed) return history;
    return [trimmed, ...history.filter((item) => item !== trimmed)].slice(0, limit);
  }
  function navigateSendHistory(history, currentText, state, direction) {
    if (history.length === 0) return { text: currentText, state };
    if (direction === "older") {
      const nextIndex2 = state.index < 0 ? 0 : Math.min(state.index + 1, history.length - 1);
      return {
        text: history[nextIndex2] ?? currentText,
        state: {
          index: nextIndex2,
          draft: state.index < 0 ? currentText : state.draft
        }
      };
    }
    if (state.index < 0) return { text: currentText, state };
    if (state.index === 0) {
      return {
        text: state.draft,
        state: { index: -1, draft: "" }
      };
    }
    const nextIndex = state.index - 1;
    return {
      text: history[nextIndex] ?? currentText,
      state: { ...state, index: nextIndex }
    };
  }
  const SendPriority = {
    MANUAL: 0
  };
  const HARD_MIN_GAP_MS = 1010;
  const queue = [];
  let processing = false;
  let lastSendCompletedAt = 0;
  async function processQueue() {
    if (processing) return;
    processing = true;
    try {
      while (queue.length > 0) {
        const item = queue.shift();
        if (!item) break;
        if (lastSendCompletedAt > 0) {
          const sinceLast = Date.now() - lastSendCompletedAt;
          if (sinceLast < HARD_MIN_GAP_MS) {
            await new Promise((r2) => setTimeout(r2, HARD_MIN_GAP_MS - sinceLast));
          }
        }
        try {
          const result = await sendDanmaku(item.message, item.roomId, item.csrfToken);
          lastSendCompletedAt = Date.now();
          item.resolve(result);
        } catch (err) {
          lastSendCompletedAt = Date.now();
          item.reject(err);
        }
      }
    } finally {
      processing = false;
    }
  }
  function enqueueDanmaku(message, roomId, csrfToken, _priority = SendPriority.MANUAL) {
    return new Promise((resolve, reject) => {
      queue.push({ message, roomId, csrfToken, resolve, reject });
      void processQueue();
    });
  }
  const MARKER = "chatterbox-lite-dm-direct";
  const STYLE_ID = "chatterbox-lite-dm-direct-style";
  const STYLE = `
.${MARKER} {
  display: inline-flex;
  vertical-align: middle;
  margin-left: 4px;
  gap: 3px;
  opacity: 0;
  transition: opacity .12s;
  user-select: none;
}
.chat-item.danmaku-item:hover .${MARKER},
html.chatterbox-lite-dm-direct-always .${MARKER} {
  opacity: 1;
}
.${MARKER} button {
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.36);
  color: inherit;
  font-size: 11px;
  line-height: 1;
  opacity: .72;
}
.${MARKER} button:hover {
  opacity: 1;
  border-color: currentColor;
}
`;
  function isValidDanmakuNode(node) {
    return node.classList.contains("chat-item") && node.classList.contains("danmaku-item");
  }
  function extractMessageFromNode(node) {
    const text = node.dataset.danmaku;
    if (text === void 0) return null;
    return buildSendableDanmakuMessage({
      text,
      isReply: node.dataset.replymid !== void 0 && node.dataset.replymid !== "0",
      uname: node.dataset.uname ?? node.querySelector("[data-uname]")?.dataset.uname ?? null,
      hasLargeEmote: node.querySelector(".danmaku-item-right.emoticon.bulge img") !== null
    });
  }
  function injectButtons(node, message) {
    if (node.querySelector(`.${MARKER}`)) return;
    const anchor = node.querySelector(".danmaku-item-right") ?? node;
    const container2 = document.createElement("span");
    container2.className = MARKER;
    container2.dataset.message = message;
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = "复制";
    copyButton.title = "复制到 Chatterbox Lite 发送框";
    copyButton.dataset.action = "copy";
    const repeatButton = document.createElement("button");
    repeatButton.type = "button";
    repeatButton.textContent = "+1";
    repeatButton.title = "+1 发送这条弹幕";
    repeatButton.dataset.action = "repeat";
    container2.append(copyButton, repeatButton);
    anchor.after(container2);
  }
  function scanExisting(container2) {
    for (const node of container2.querySelectorAll(".chat-item.danmaku-item")) {
      if (!isValidDanmakuNode(node)) continue;
      const message = extractMessageFromNode(node);
      if (message) injectButtons(node, message);
    }
  }
  function handleCopy(message) {
    fasongText.value = message;
    dialogOpen.value = true;
    appendLog(`复制弹幕：${message}`);
  }
  async function handleRepeat(message) {
    try {
      const roomId = await ensureRoomId();
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        appendLog("❌ 未找到登录信息，请先登录 Bilibili");
        return;
      }
      const processed = applyReplacements(message);
      const result = await enqueueDanmaku(processed, roomId, csrfToken, SendPriority.MANUAL);
      sendHistory.value = addSendHistoryEntry(sendHistory.value, message);
      appendLog(result, "+1", message !== processed ? `${message} → ${processed}` : processed);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      appendLog(`🔴 +1 出错：${msg}`);
    }
  }
  function handleClick(e2) {
    const target = e2.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(`.${MARKER} button`);
    if (!button) return;
    e2.preventDefault();
    e2.stopPropagation();
    const message = button.closest(`.${MARKER}`)?.dataset.message;
    if (!message) return;
    if (button.dataset.action === "copy") {
      handleCopy(message);
    } else if (button.dataset.action === "repeat") {
      void handleRepeat(message);
    }
  }
  let observer = null;
  let pollTimer = null;
  let container = null;
  let styleEl = null;
  let settingsDispose = null;
  function removeInjectedButtons() {
    for (const el of document.querySelectorAll(`.${MARKER}`)) {
      el.remove();
    }
  }
  function attach(nextContainer) {
    container = nextContainer;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.textContent = STYLE;
      document.head.appendChild(styleEl);
    }
    if (danmakuDirectEnabled.value) scanExisting(nextContainer);
    nextContainer.addEventListener("click", handleClick, true);
    observer = new MutationObserver((mutations) => {
      if (!danmakuDirectEnabled.value) return;
      for (const mutation of mutations) {
        for (const added of mutation.addedNodes) {
          if (!(added instanceof HTMLElement) || !isValidDanmakuNode(added)) continue;
          const message = extractMessageFromNode(added);
          if (message) injectButtons(added, message);
        }
      }
    });
    observer.observe(nextContainer, { childList: true });
  }
  function detachContainer() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (container) {
      container.removeEventListener("click", handleClick, true);
      container = null;
    }
  }
  function reattachIfNeeded() {
    const nextContainer = document.querySelector(".chat-items");
    if (!nextContainer) {
      if (container && !container.isConnected) detachContainer();
      return false;
    }
    if (container === nextContainer && container.isConnected) return true;
    detachContainer();
    attach(nextContainer);
    return true;
  }
  function startDanmakuDirect() {
    if (pollTimer) return;
    settingsDispose = j$1(() => {
      if (!container) return;
      if (danmakuDirectEnabled.value) {
        scanExisting(container);
      } else {
        removeInjectedButtons();
      }
    });
    reattachIfNeeded();
    pollTimer = setInterval(() => {
      reattachIfNeeded();
    }, 1e3);
  }
  function stopDanmakuDirect() {
    if (settingsDispose) {
      settingsDispose();
      settingsDispose = null;
    }
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
    detachContainer();
    styleEl?.remove();
    styleEl = null;
    removeInjectedButtons();
  }
  const BRIDGE_PORTS = [31873, 31874, 31875];
  const BRIDGE_HOST = "127.0.0.1";
  const BRIDGE_PROTOCOL_VERSION = 1;
  function getSettingsSnapshot() {
    return {
      msgSendInterval: msgSendInterval.value,
      maxLength: maxLength.value,
      dialogWidth: dialogWidth.value,
      pageDevicePixelRatio: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      pageRootFontSize: typeof window !== "undefined" ? Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 12 : 12,
      showNormalSendPanel: showNormalSendPanel.value,
      showReplacementPanel: showReplacementPanel.value,
      showLogPanel: showLogPanel.value,
      blockedRetryEnabled: blockedRetryEnabled.value,
      pinnedEmoticonUniques: pinnedEmoticonUniques.value,
      sendHistory: sendHistory.value,
      localGlobalRules: localGlobalRules.value,
      localRoomRules: localRoomRules.value,
      autoSeekEnabled: autoSeekEnabled.value,
      autoSeekBufferThreshold: autoSeekBufferThreshold.value
    };
  }
  async function getUserscriptRoomState() {
    const roomId = await ensureRoomId();
    return {
      roomId,
      streamerUid: cachedStreamerUid.value,
      roomUrl: window.location.href,
      title: document.title,
      connectedAt: Date.now()
    };
  }
  const userscriptRuntime = {
    mode: "userscript",
    ensureRoomState: getUserscriptRoomState,
    async sendDanmaku(message) {
      const roomId = await ensureRoomId();
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        return {
          success: false,
          message,
          isEmoticon: false,
          error: "未找到登录信息，请先登录 Bilibili"
        };
      }
      return await enqueueDanmaku(message, roomId, csrfToken, SendPriority.MANUAL);
    },
    async sendLiveLike() {
      const roomId = await ensureRoomId();
      const anchorId = cachedStreamerUid.value;
      const csrfToken = getCsrfToken();
      const userId = getCurrentUserId();
      if (!csrfToken || !userId) {
        return { success: false, count: 30, error: "未找到登录信息，请先登录 Bilibili" };
      }
      if (anchorId === null) {
        return { success: false, count: 30, error: "未识别到主播 UID，无法点赞" };
      }
      return await sendLiveLike(roomId, anchorId, userId, csrfToken);
    },
    async fetchEmoticons() {
      const roomId = await ensureRoomId();
      await fetchEmoticons(roomId);
      return cachedEmoticonPackages.value;
    },
    getSettingsSnapshot
  };
  const RETRY_DELAY_MS = 2e3;
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function gmJsonRequest(method, url, body, timeout = 3e4) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method,
        url,
        timeout,
        headers: body ? { "Content-Type": "application/json" } : void 0,
        data: body ? JSON.stringify(body) : void 0,
        onload: (response) => {
          if (response.status < 200 || response.status >= 300) {
            reject(new Error(`HTTP ${response.status}: ${response.responseText}`));
            return;
          }
          try {
            resolve(JSON.parse(response.responseText || "{}"));
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        },
        onerror: () => reject(new Error("Bridge request failed")),
        ontimeout: () => reject(new Error("Bridge request timed out"))
      });
    });
  }
  async function findBridgeBaseUrl() {
    for (const port of BRIDGE_PORTS) {
      const baseUrl = `http://${BRIDGE_HOST}:${port}`;
      try {
        await gmJsonRequest("GET", `${baseUrl}/ping`, void 0, 800);
        return baseUrl;
      } catch {
      }
    }
    return null;
  }
  async function executeCommand(command) {
    if (command.type === "getRoomState") return await getUserscriptRoomState();
    if (command.type === "sendDanmaku") return await userscriptRuntime.sendDanmaku(command.payload.message);
    if (command.type === "sendLiveLike") return await userscriptRuntime.sendLiveLike();
    if (command.type === "fetchEmoticons") return await userscriptRuntime.fetchEmoticons();
    if (command.type === "updateAutoSeekSettings") {
      const { enabled, bufferThreshold } = command.payload;
      if (typeof enabled === "boolean") autoSeekEnabled.value = enabled;
      if (typeof bufferThreshold === "number" && Number.isFinite(bufferThreshold)) {
        autoSeekBufferThreshold.value = Math.max(0.3, Math.min(bufferThreshold, 10));
      }
      return getSettingsSnapshot();
    }
    return getSettingsSnapshot();
  }
  async function postCommandResult(baseUrl, agentId, command, ok, result, error) {
    const body = {
      agentId,
      commandId: command.id,
      ok,
      result,
      error
    };
    await gmJsonRequest("POST", `${baseUrl}/agent/result`, body, 5e3);
  }
  function startDesktopBridgeAgent() {
    let stopped = false;
    let baseUrl = null;
    let agentId;
    let connected = false;
    const run = async () => {
      while (!stopped) {
        try {
          baseUrl ??= await findBridgeBaseUrl();
          if (!baseUrl) {
            if (connected) appendLog("桌面桥接已断开");
            connected = false;
            await sleep(RETRY_DELAY_MS);
            continue;
          }
          const hello = await gmJsonRequest(
            "POST",
            `${baseUrl}/agent/hello`,
            {
              protocolVersion: BRIDGE_PROTOCOL_VERSION,
              agentId,
              roomState: await getUserscriptRoomState(),
              settingsSnapshot: getSettingsSnapshot()
            },
            5e3
          );
          agentId = hello.agentId;
          if (!connected) {
            connected = true;
            appendLog("桌面桥接已连接");
          }
          const poll = await gmJsonRequest(
            "GET",
            `${baseUrl}/agent/poll?agentId=${encodeURIComponent(agentId)}`,
            void 0,
            3e4
          );
          if (!poll.command) continue;
          try {
            const result = await executeCommand(poll.command);
            await postCommandResult(baseUrl, agentId, poll.command, true, result);
          } catch (err) {
            await postCommandResult(
              baseUrl,
              agentId,
              poll.command,
              false,
              void 0,
              err instanceof Error ? err.message : String(err)
            );
          }
        } catch {
          baseUrl = null;
          if (connected) appendLog("桌面桥接已断开");
          connected = false;
          await sleep(RETRY_DELAY_MS);
        }
      }
    };
    if (typeof GM_xmlhttpRequest === "function") {
      void run();
    }
    return {
      stop: () => {
        stopped = true;
      }
    };
  }
  let runtime = null;
  function setRuntimeAdapter(adapter) {
    runtime = adapter;
  }
  function getRuntimeAdapter() {
    if (!runtime) throw new Error("Chatterbox runtime has not been initialized");
    return runtime;
  }
  function r$3(e2) {
    var t2, f2, n2 = "";
    if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
    else if ("object" == typeof e2) if (Array.isArray(e2)) {
      var o2 = e2.length;
      for (t2 = 0; t2 < o2; t2++) e2[t2] && (f2 = r$3(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
    } else for (f2 in e2) e2[f2] && (n2 && (n2 += " "), n2 += f2);
    return n2;
  }
  function clsx() {
    for (var e2, t2, f2 = 0, n2 = "", o2 = arguments.length; f2 < o2; f2++) (e2 = arguments[f2]) && (t2 = r$3(e2)) && (n2 && (n2 += " "), n2 += t2);
    return n2;
  }
  const concatArrays = (array1, array2) => {
    const combinedArray = new Array(array1.length + array2.length);
    for (let i2 = 0; i2 < array1.length; i2++) {
      combinedArray[i2] = array1[i2];
    }
    for (let i2 = 0; i2 < array2.length; i2++) {
      combinedArray[array1.length + i2] = array2[i2];
    }
    return combinedArray;
  };
  const createClassValidatorObject = (classGroupId, validator) => ({
    classGroupId,
    validator
  });
  const createClassPartObject = (nextPart = new Map(), validators = null, classGroupId) => ({
    nextPart,
    validators,
    classGroupId
  });
  const CLASS_PART_SEPARATOR = "-";
  const EMPTY_CONFLICTS = [];
  const ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
  const createClassGroupUtils = (config) => {
    const classMap = createClassMap(config);
    const {
      conflictingClassGroups,
      conflictingClassGroupModifiers
    } = config;
    const getClassGroupId = (className) => {
      if (className.startsWith("[") && className.endsWith("]")) {
        return getGroupIdForArbitraryProperty(className);
      }
      const classParts = className.split(CLASS_PART_SEPARATOR);
      const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
      return getGroupRecursive(classParts, startIndex, classMap);
    };
    const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
      if (hasPostfixModifier) {
        const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
        const baseConflicts = conflictingClassGroups[classGroupId];
        if (modifierConflicts) {
          if (baseConflicts) {
            return concatArrays(baseConflicts, modifierConflicts);
          }
          return modifierConflicts;
        }
        return baseConflicts || EMPTY_CONFLICTS;
      }
      return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
    };
    return {
      getClassGroupId,
      getConflictingClassGroupIds
    };
  };
  const getGroupRecursive = (classParts, startIndex, classPartObject) => {
    const classPathsLength = classParts.length - startIndex;
    if (classPathsLength === 0) {
      return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[startIndex];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    if (nextClassPartObject) {
      const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
      if (result) return result;
    }
    const validators = classPartObject.validators;
    if (validators === null) {
      return void 0;
    }
    const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
    const validatorsLength = validators.length;
    for (let i2 = 0; i2 < validatorsLength; i2++) {
      const validatorObj = validators[i2];
      if (validatorObj.validator(classRest)) {
        return validatorObj.classGroupId;
      }
    }
    return void 0;
  };
  const getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
    const content = className.slice(1, -1);
    const colonIndex = content.indexOf(":");
    const property = content.slice(0, colonIndex);
    return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
  })();
  const createClassMap = (config) => {
    const {
      theme,
      classGroups
    } = config;
    return processClassGroups(classGroups, theme);
  };
  const processClassGroups = (classGroups, theme) => {
    const classMap = createClassPartObject();
    for (const classGroupId in classGroups) {
      const group = classGroups[classGroupId];
      processClassesRecursively(group, classMap, classGroupId, theme);
    }
    return classMap;
  };
  const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
    const len = classGroup.length;
    for (let i2 = 0; i2 < len; i2++) {
      const classDefinition = classGroup[i2];
      processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
    }
  };
  const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    if (typeof classDefinition === "string") {
      processStringDefinition(classDefinition, classPartObject, classGroupId);
      return;
    }
    if (typeof classDefinition === "function") {
      processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
      return;
    }
    processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
  };
  const processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
    const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
    classPartObjectToEdit.classGroupId = classGroupId;
  };
  const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    if (isThemeGetter(classDefinition)) {
      processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
      return;
    }
    if (classPartObject.validators === null) {
      classPartObject.validators = [];
    }
    classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
  };
  const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    const entries = Object.entries(classDefinition);
    const len = entries.length;
    for (let i2 = 0; i2 < len; i2++) {
      const [key, value] = entries[i2];
      processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
    }
  };
  const getPart = (classPartObject, path) => {
    let current = classPartObject;
    const parts = path.split(CLASS_PART_SEPARATOR);
    const len = parts.length;
    for (let i2 = 0; i2 < len; i2++) {
      const part = parts[i2];
      let next = current.nextPart.get(part);
      if (!next) {
        next = createClassPartObject();
        current.nextPart.set(part, next);
      }
      current = next;
    }
    return current;
  };
  const isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
  const createLruCache = (maxCacheSize) => {
    if (maxCacheSize < 1) {
      return {
        get: () => void 0,
        set: () => {
        }
      };
    }
    let cacheSize = 0;
    let cache = Object.create(null);
    let previousCache = Object.create(null);
    const update = (key, value) => {
      cache[key] = value;
      cacheSize++;
      if (cacheSize > maxCacheSize) {
        cacheSize = 0;
        previousCache = cache;
        cache = Object.create(null);
      }
    };
    return {
      get(key) {
        let value = cache[key];
        if (value !== void 0) {
          return value;
        }
        if ((value = previousCache[key]) !== void 0) {
          update(key, value);
          return value;
        }
      },
      set(key, value) {
        if (key in cache) {
          cache[key] = value;
        } else {
          update(key, value);
        }
      }
    };
  };
  const IMPORTANT_MODIFIER = "!";
  const MODIFIER_SEPARATOR = ":";
  const EMPTY_MODIFIERS = [];
  const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
    modifiers,
    hasImportantModifier,
    baseClassName,
    maybePostfixModifierPosition,
    isExternal
  });
  const createParseClassName = (config) => {
    const {
      prefix,
      experimentalParseClassName
    } = config;
    let parseClassName = (className) => {
      const modifiers = [];
      let bracketDepth = 0;
      let parenDepth = 0;
      let modifierStart = 0;
      let postfixModifierPosition;
      const len = className.length;
      for (let index = 0; index < len; index++) {
        const currentCharacter = className[index];
        if (bracketDepth === 0 && parenDepth === 0) {
          if (currentCharacter === MODIFIER_SEPARATOR) {
            modifiers.push(className.slice(modifierStart, index));
            modifierStart = index + 1;
            continue;
          }
          if (currentCharacter === "/") {
            postfixModifierPosition = index;
            continue;
          }
        }
        if (currentCharacter === "[") bracketDepth++;
        else if (currentCharacter === "]") bracketDepth--;
        else if (currentCharacter === "(") parenDepth++;
        else if (currentCharacter === ")") parenDepth--;
      }
      const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
      let baseClassName = baseClassNameWithImportantModifier;
      let hasImportantModifier = false;
      if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
        baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
        hasImportantModifier = true;
      } else if (
baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
      ) {
        baseClassName = baseClassNameWithImportantModifier.slice(1);
        hasImportantModifier = true;
      }
      const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
      return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
    };
    if (prefix) {
      const fullPrefix = prefix + MODIFIER_SEPARATOR;
      const parseClassNameOriginal = parseClassName;
      parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
    }
    if (experimentalParseClassName) {
      const parseClassNameOriginal = parseClassName;
      parseClassName = (className) => experimentalParseClassName({
        className,
        parseClassName: parseClassNameOriginal
      });
    }
    return parseClassName;
  };
  const createSortModifiers = (config) => {
    const modifierWeights = new Map();
    config.orderSensitiveModifiers.forEach((mod, index) => {
      modifierWeights.set(mod, 1e6 + index);
    });
    return (modifiers) => {
      const result = [];
      let currentSegment = [];
      for (let i2 = 0; i2 < modifiers.length; i2++) {
        const modifier = modifiers[i2];
        const isArbitrary = modifier[0] === "[";
        const isOrderSensitive = modifierWeights.has(modifier);
        if (isArbitrary || isOrderSensitive) {
          if (currentSegment.length > 0) {
            currentSegment.sort();
            result.push(...currentSegment);
            currentSegment = [];
          }
          result.push(modifier);
        } else {
          currentSegment.push(modifier);
        }
      }
      if (currentSegment.length > 0) {
        currentSegment.sort();
        result.push(...currentSegment);
      }
      return result;
    };
  };
  const createConfigUtils = (config) => ({
    cache: createLruCache(config.cacheSize),
    parseClassName: createParseClassName(config),
    sortModifiers: createSortModifiers(config),
    postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
    ...createClassGroupUtils(config)
  });
  const createPostfixLookupClassGroupIds = (config) => {
    const lookup = Object.create(null);
    const classGroupIds = config.postfixLookupClassGroups;
    if (classGroupIds) {
      for (let i2 = 0; i2 < classGroupIds.length; i2++) {
        lookup[classGroupIds[i2]] = true;
      }
    }
    return lookup;
  };
  const SPLIT_CLASSES_REGEX = /\s+/;
  const mergeClassList = (classList, configUtils) => {
    const {
      parseClassName,
      getClassGroupId,
      getConflictingClassGroupIds,
      sortModifiers,
      postfixLookupClassGroupIds
    } = configUtils;
    const classGroupsInConflict = [];
    const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
    let result = "";
    for (let index = classNames.length - 1; index >= 0; index -= 1) {
      const originalClassName = classNames[index];
      const {
        isExternal,
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition
      } = parseClassName(originalClassName);
      if (isExternal) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      let hasPostfixModifier = !!maybePostfixModifierPosition;
      let classGroupId;
      if (hasPostfixModifier) {
        const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
        classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
        const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
        if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
          classGroupId = classGroupIdWithPostfix;
          hasPostfixModifier = false;
        }
      } else {
        classGroupId = getClassGroupId(baseClassName);
      }
      if (!classGroupId) {
        if (!hasPostfixModifier) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        classGroupId = getClassGroupId(baseClassName);
        if (!classGroupId) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        hasPostfixModifier = false;
      }
      const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
      const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
      const classId = modifierId + classGroupId;
      if (classGroupsInConflict.indexOf(classId) > -1) {
        continue;
      }
      classGroupsInConflict.push(classId);
      const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
      for (let i2 = 0; i2 < conflictGroups.length; ++i2) {
        const group = conflictGroups[i2];
        classGroupsInConflict.push(modifierId + group);
      }
      result = originalClassName + (result.length > 0 ? " " + result : result);
    }
    return result;
  };
  const twJoin = (...classLists) => {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < classLists.length) {
      if (argument = classLists[index++]) {
        if (resolvedValue = toValue(argument)) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  };
  const toValue = (mix) => {
    if (typeof mix === "string") {
      return mix;
    }
    let resolvedValue;
    let string = "";
    for (let k2 = 0; k2 < mix.length; k2++) {
      if (mix[k2]) {
        if (resolvedValue = toValue(mix[k2])) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  };
  const createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall;
    const initTailwindMerge = (classList) => {
      const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
      configUtils = createConfigUtils(config);
      cacheGet = configUtils.cache.get;
      cacheSet = configUtils.cache.set;
      functionToCall = tailwindMerge;
      return tailwindMerge(classList);
    };
    const tailwindMerge = (classList) => {
      const cachedResult = cacheGet(classList);
      if (cachedResult) {
        return cachedResult;
      }
      const result = mergeClassList(classList, configUtils);
      cacheSet(classList, result);
      return result;
    };
    functionToCall = initTailwindMerge;
    return (...args) => functionToCall(twJoin(...args));
  };
  const fallbackThemeArr = [];
  const fromTheme = (key) => {
    const themeGetter = (theme) => theme[key] || fallbackThemeArr;
    themeGetter.isThemeGetter = true;
    return themeGetter;
  };
  const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
  const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
  const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
  const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
  const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
  const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
  const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
  const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
  const isFraction = (value) => fractionRegex.test(value);
  const isNumber = (value) => !!value && !Number.isNaN(Number(value));
  const isInteger = (value) => !!value && Number.isInteger(Number(value));
  const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
  const isTshirtSize = (value) => tshirtUnitRegex.test(value);
  const isAny = () => true;
  const isLengthOnly = (value) => (


lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
  );
  const isNever = () => false;
  const isShadow = (value) => shadowRegex.test(value);
  const isImage = (value) => imageRegex.test(value);
  const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
  const isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
  const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
  const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
  const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
  const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
  const isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
  const isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
  const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
  const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
  const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
  const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
  const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
  const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
  const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
  const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
  const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
  const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
  const isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
  const getIsArbitraryValue = (value, testLabel, testValue) => {
    const result = arbitraryValueRegex.exec(value);
    if (result) {
      if (result[1]) {
        return testLabel(result[1]);
      }
      return testValue(result[2]);
    }
    return false;
  };
  const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
    const result = arbitraryVariableRegex.exec(value);
    if (result) {
      if (result[1]) {
        return testLabel(result[1]);
      }
      return shouldMatchNoLabel;
    }
    return false;
  };
  const isLabelPosition = (label) => label === "position" || label === "percentage";
  const isLabelImage = (label) => label === "image" || label === "url";
  const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
  const isLabelLength = (label) => label === "length";
  const isLabelNumber = (label) => label === "number";
  const isLabelFamilyName = (label) => label === "family-name";
  const isLabelWeight = (label) => label === "number" || label === "weight";
  const isLabelShadow = (label) => label === "shadow";
  const getDefaultConfig = () => {
    const themeColor = fromTheme("color");
    const themeFont = fromTheme("font");
    const themeText = fromTheme("text");
    const themeFontWeight = fromTheme("font-weight");
    const themeTracking = fromTheme("tracking");
    const themeLeading = fromTheme("leading");
    const themeBreakpoint = fromTheme("breakpoint");
    const themeContainer = fromTheme("container");
    const themeSpacing = fromTheme("spacing");
    const themeRadius = fromTheme("radius");
    const themeShadow = fromTheme("shadow");
    const themeInsetShadow = fromTheme("inset-shadow");
    const themeTextShadow = fromTheme("text-shadow");
    const themeDropShadow = fromTheme("drop-shadow");
    const themeBlur = fromTheme("blur");
    const themePerspective = fromTheme("perspective");
    const themeAspect = fromTheme("aspect");
    const themeEase = fromTheme("ease");
    const themeAnimate = fromTheme("animate");
    const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
    const scalePosition = () => [
      "center",
      "top",
      "bottom",
      "left",
      "right",
      "top-left",
"left-top",
      "top-right",
"right-top",
      "bottom-right",
"right-bottom",
      "bottom-left",
"left-bottom"
    ];
    const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
    const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
    const scaleOverscroll = () => ["auto", "contain", "none"];
    const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
    const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
    const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
    const scaleGridColRowStartAndEnd = () => ["auto", {
      span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
    }, isInteger, isArbitraryVariable, isArbitraryValue];
    const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
    const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
    const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
    const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
    const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
    const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
    const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
      position: [isArbitraryVariable, isArbitraryValue]
    }];
    const scaleBgRepeat = () => ["no-repeat", {
      repeat: ["", "x", "y", "space", "round"]
    }];
    const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
      size: [isArbitraryVariable, isArbitraryValue]
    }];
    const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
    const scaleRadius = () => [
"",
      "none",
      "full",
      themeRadius,
      isArbitraryVariable,
      isArbitraryValue
    ];
    const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
    const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
    const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
    const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
    const scaleBlur = () => [
"",
      "none",
      themeBlur,
      isArbitraryVariable,
      isArbitraryValue
    ];
    const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [isTshirtSize],
        breakpoint: [isTshirtSize],
        color: [isAny],
        container: [isTshirtSize],
        "drop-shadow": [isTshirtSize],
        ease: ["in", "out", "in-out"],
        font: [isAnyNonArbitrary],
        "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
        "inset-shadow": [isTshirtSize],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [isTshirtSize],
        shadow: [isTshirtSize],
        spacing: ["px", isNumber],
        text: [isTshirtSize],
        "text-shadow": [isTshirtSize],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
      },
      classGroups: {



aspect: [{
          aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
        }],
container: ["container"],
"container-type": [{
          "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue]
        }],
"container-named": [isNamedContainerQuery],
columns: [{
          columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
        }],
"break-after": [{
          "break-after": scaleBreak()
        }],
"break-before": [{
          "break-before": scaleBreak()
        }],
"break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
"box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
box: [{
          box: ["border", "content"]
        }],
display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
sr: ["sr-only", "not-sr-only"],
float: [{
          float: ["right", "left", "none", "start", "end"]
        }],
clear: [{
          clear: ["left", "right", "both", "none", "start", "end"]
        }],
isolation: ["isolate", "isolation-auto"],
"object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
"object-position": [{
          object: scalePositionWithArbitrary()
        }],
overflow: [{
          overflow: scaleOverflow()
        }],
"overflow-x": [{
          "overflow-x": scaleOverflow()
        }],
"overflow-y": [{
          "overflow-y": scaleOverflow()
        }],
overscroll: [{
          overscroll: scaleOverscroll()
        }],
"overscroll-x": [{
          "overscroll-x": scaleOverscroll()
        }],
"overscroll-y": [{
          "overscroll-y": scaleOverscroll()
        }],
position: ["static", "fixed", "absolute", "relative", "sticky"],
inset: [{
          inset: scaleInset()
        }],
"inset-x": [{
          "inset-x": scaleInset()
        }],
"inset-y": [{
          "inset-y": scaleInset()
        }],
start: [{
          "inset-s": scaleInset(),
start: scaleInset()
        }],
end: [{
          "inset-e": scaleInset(),
end: scaleInset()
        }],
"inset-bs": [{
          "inset-bs": scaleInset()
        }],
"inset-be": [{
          "inset-be": scaleInset()
        }],
top: [{
          top: scaleInset()
        }],
right: [{
          right: scaleInset()
        }],
bottom: [{
          bottom: scaleInset()
        }],
left: [{
          left: scaleInset()
        }],
visibility: ["visible", "invisible", "collapse"],
z: [{
          z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
        }],



basis: [{
          basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
        }],
"flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
"flex-wrap": [{
          flex: ["nowrap", "wrap", "wrap-reverse"]
        }],
flex: [{
          flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
        }],
grow: [{
          grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
shrink: [{
          shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
order: [{
          order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
        }],
"grid-cols": [{
          "grid-cols": scaleGridTemplateColsRows()
        }],
"col-start-end": [{
          col: scaleGridColRowStartAndEnd()
        }],
"col-start": [{
          "col-start": scaleGridColRowStartOrEnd()
        }],
"col-end": [{
          "col-end": scaleGridColRowStartOrEnd()
        }],
"grid-rows": [{
          "grid-rows": scaleGridTemplateColsRows()
        }],
"row-start-end": [{
          row: scaleGridColRowStartAndEnd()
        }],
"row-start": [{
          "row-start": scaleGridColRowStartOrEnd()
        }],
"row-end": [{
          "row-end": scaleGridColRowStartOrEnd()
        }],
"grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
"auto-cols": [{
          "auto-cols": scaleGridAutoColsRows()
        }],
"auto-rows": [{
          "auto-rows": scaleGridAutoColsRows()
        }],
gap: [{
          gap: scaleUnambiguousSpacing()
        }],
"gap-x": [{
          "gap-x": scaleUnambiguousSpacing()
        }],
"gap-y": [{
          "gap-y": scaleUnambiguousSpacing()
        }],
"justify-content": [{
          justify: [...scaleAlignPrimaryAxis(), "normal"]
        }],
"justify-items": [{
          "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
        }],
"justify-self": [{
          "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
        }],
"align-content": [{
          content: ["normal", ...scaleAlignPrimaryAxis()]
        }],
"align-items": [{
          items: [...scaleAlignSecondaryAxis(), {
            baseline: ["", "last"]
          }]
        }],
"align-self": [{
          self: ["auto", ...scaleAlignSecondaryAxis(), {
            baseline: ["", "last"]
          }]
        }],
"place-content": [{
          "place-content": scaleAlignPrimaryAxis()
        }],
"place-items": [{
          "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
        }],
"place-self": [{
          "place-self": ["auto", ...scaleAlignSecondaryAxis()]
        }],

p: [{
          p: scaleUnambiguousSpacing()
        }],
px: [{
          px: scaleUnambiguousSpacing()
        }],
py: [{
          py: scaleUnambiguousSpacing()
        }],
ps: [{
          ps: scaleUnambiguousSpacing()
        }],
pe: [{
          pe: scaleUnambiguousSpacing()
        }],
pbs: [{
          pbs: scaleUnambiguousSpacing()
        }],
pbe: [{
          pbe: scaleUnambiguousSpacing()
        }],
pt: [{
          pt: scaleUnambiguousSpacing()
        }],
pr: [{
          pr: scaleUnambiguousSpacing()
        }],
pb: [{
          pb: scaleUnambiguousSpacing()
        }],
pl: [{
          pl: scaleUnambiguousSpacing()
        }],
m: [{
          m: scaleMargin()
        }],
mx: [{
          mx: scaleMargin()
        }],
my: [{
          my: scaleMargin()
        }],
ms: [{
          ms: scaleMargin()
        }],
me: [{
          me: scaleMargin()
        }],
mbs: [{
          mbs: scaleMargin()
        }],
mbe: [{
          mbe: scaleMargin()
        }],
mt: [{
          mt: scaleMargin()
        }],
mr: [{
          mr: scaleMargin()
        }],
mb: [{
          mb: scaleMargin()
        }],
ml: [{
          ml: scaleMargin()
        }],
"space-x": [{
          "space-x": scaleUnambiguousSpacing()
        }],
"space-x-reverse": ["space-x-reverse"],
"space-y": [{
          "space-y": scaleUnambiguousSpacing()
        }],
"space-y-reverse": ["space-y-reverse"],



size: [{
          size: scaleSizing()
        }],
"inline-size": [{
          inline: ["auto", ...scaleSizingInline()]
        }],
"min-inline-size": [{
          "min-inline": ["auto", ...scaleSizingInline()]
        }],
"max-inline-size": [{
          "max-inline": ["none", ...scaleSizingInline()]
        }],
"block-size": [{
          block: ["auto", ...scaleSizingBlock()]
        }],
"min-block-size": [{
          "min-block": ["auto", ...scaleSizingBlock()]
        }],
"max-block-size": [{
          "max-block": ["none", ...scaleSizingBlock()]
        }],
w: [{
          w: [themeContainer, "screen", ...scaleSizing()]
        }],
"min-w": [{
          "min-w": [
            themeContainer,
            "screen",
"none",
            ...scaleSizing()
          ]
        }],
"max-w": [{
          "max-w": [
            themeContainer,
            "screen",
            "none",
"prose",
{
              screen: [themeBreakpoint]
            },
            ...scaleSizing()
          ]
        }],
h: [{
          h: ["screen", "lh", ...scaleSizing()]
        }],
"min-h": [{
          "min-h": ["screen", "lh", "none", ...scaleSizing()]
        }],
"max-h": [{
          "max-h": ["screen", "lh", ...scaleSizing()]
        }],



"font-size": [{
          text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
        }],
"font-smoothing": ["antialiased", "subpixel-antialiased"],
"font-style": ["italic", "not-italic"],
"font-weight": [{
          font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
        }],
"font-stretch": [{
          "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
        }],
"font-family": [{
          font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
        }],
"font-features": [{
          "font-features": [isArbitraryValue]
        }],
"fvn-normal": ["normal-nums"],
"fvn-ordinal": ["ordinal"],
"fvn-slashed-zero": ["slashed-zero"],
"fvn-figure": ["lining-nums", "oldstyle-nums"],
"fvn-spacing": ["proportional-nums", "tabular-nums"],
"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
tracking: [{
          tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
        }],
"line-clamp": [{
          "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
        }],
leading: [{
          leading: [
themeLeading,
            ...scaleUnambiguousSpacing()
          ]
        }],
"list-image": [{
          "list-image": ["none", isArbitraryVariable, isArbitraryValue]
        }],
"list-style-position": [{
          list: ["inside", "outside"]
        }],
"list-style-type": [{
          list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
        }],
"text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
"placeholder-color": [{
          placeholder: scaleColor()
        }],
"text-color": [{
          text: scaleColor()
        }],
"text-decoration": ["underline", "overline", "line-through", "no-underline"],
"text-decoration-style": [{
          decoration: [...scaleLineStyle(), "wavy"]
        }],
"text-decoration-thickness": [{
          decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
        }],
"text-decoration-color": [{
          decoration: scaleColor()
        }],
"underline-offset": [{
          "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
        }],
"text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
"text-overflow": ["truncate", "text-ellipsis", "text-clip"],
"text-wrap": [{
          text: ["wrap", "nowrap", "balance", "pretty"]
        }],
indent: [{
          indent: scaleUnambiguousSpacing()
        }],
"tab-size": [{
          tab: [isInteger, isArbitraryVariable, isArbitraryValue]
        }],
"vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
        }],
whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
break: [{
          break: ["normal", "words", "all", "keep"]
        }],
wrap: [{
          wrap: ["break-word", "anywhere", "normal"]
        }],
hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
content: [{
          content: ["none", isArbitraryVariable, isArbitraryValue]
        }],



"bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
"bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
"bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
"bg-position": [{
          bg: scaleBgPosition()
        }],
"bg-repeat": [{
          bg: scaleBgRepeat()
        }],
"bg-size": [{
          bg: scaleBgSize()
        }],
"bg-image": [{
          bg: ["none", {
            linear: [{
              to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, isInteger, isArbitraryVariable, isArbitraryValue],
            radial: ["", isArbitraryVariable, isArbitraryValue],
            conic: [isInteger, isArbitraryVariable, isArbitraryValue]
          }, isArbitraryVariableImage, isArbitraryImage]
        }],
"bg-color": [{
          bg: scaleColor()
        }],
"gradient-from-pos": [{
          from: scaleGradientStopPosition()
        }],
"gradient-via-pos": [{
          via: scaleGradientStopPosition()
        }],
"gradient-to-pos": [{
          to: scaleGradientStopPosition()
        }],
"gradient-from": [{
          from: scaleColor()
        }],
"gradient-via": [{
          via: scaleColor()
        }],
"gradient-to": [{
          to: scaleColor()
        }],



rounded: [{
          rounded: scaleRadius()
        }],
"rounded-s": [{
          "rounded-s": scaleRadius()
        }],
"rounded-e": [{
          "rounded-e": scaleRadius()
        }],
"rounded-t": [{
          "rounded-t": scaleRadius()
        }],
"rounded-r": [{
          "rounded-r": scaleRadius()
        }],
"rounded-b": [{
          "rounded-b": scaleRadius()
        }],
"rounded-l": [{
          "rounded-l": scaleRadius()
        }],
"rounded-ss": [{
          "rounded-ss": scaleRadius()
        }],
"rounded-se": [{
          "rounded-se": scaleRadius()
        }],
"rounded-ee": [{
          "rounded-ee": scaleRadius()
        }],
"rounded-es": [{
          "rounded-es": scaleRadius()
        }],
"rounded-tl": [{
          "rounded-tl": scaleRadius()
        }],
"rounded-tr": [{
          "rounded-tr": scaleRadius()
        }],
"rounded-br": [{
          "rounded-br": scaleRadius()
        }],
"rounded-bl": [{
          "rounded-bl": scaleRadius()
        }],
"border-w": [{
          border: scaleBorderWidth()
        }],
"border-w-x": [{
          "border-x": scaleBorderWidth()
        }],
"border-w-y": [{
          "border-y": scaleBorderWidth()
        }],
"border-w-s": [{
          "border-s": scaleBorderWidth()
        }],
"border-w-e": [{
          "border-e": scaleBorderWidth()
        }],
"border-w-bs": [{
          "border-bs": scaleBorderWidth()
        }],
"border-w-be": [{
          "border-be": scaleBorderWidth()
        }],
"border-w-t": [{
          "border-t": scaleBorderWidth()
        }],
"border-w-r": [{
          "border-r": scaleBorderWidth()
        }],
"border-w-b": [{
          "border-b": scaleBorderWidth()
        }],
"border-w-l": [{
          "border-l": scaleBorderWidth()
        }],
"divide-x": [{
          "divide-x": scaleBorderWidth()
        }],
"divide-x-reverse": ["divide-x-reverse"],
"divide-y": [{
          "divide-y": scaleBorderWidth()
        }],
"divide-y-reverse": ["divide-y-reverse"],
"border-style": [{
          border: [...scaleLineStyle(), "hidden", "none"]
        }],
"divide-style": [{
          divide: [...scaleLineStyle(), "hidden", "none"]
        }],
"border-color": [{
          border: scaleColor()
        }],
"border-color-x": [{
          "border-x": scaleColor()
        }],
"border-color-y": [{
          "border-y": scaleColor()
        }],
"border-color-s": [{
          "border-s": scaleColor()
        }],
"border-color-e": [{
          "border-e": scaleColor()
        }],
"border-color-bs": [{
          "border-bs": scaleColor()
        }],
"border-color-be": [{
          "border-be": scaleColor()
        }],
"border-color-t": [{
          "border-t": scaleColor()
        }],
"border-color-r": [{
          "border-r": scaleColor()
        }],
"border-color-b": [{
          "border-b": scaleColor()
        }],
"border-color-l": [{
          "border-l": scaleColor()
        }],
"divide-color": [{
          divide: scaleColor()
        }],
"outline-style": [{
          outline: [...scaleLineStyle(), "none", "hidden"]
        }],
"outline-offset": [{
          "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"outline-w": [{
          outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
        }],
"outline-color": [{
          outline: scaleColor()
        }],



shadow: [{
          shadow: [
"",
            "none",
            themeShadow,
            isArbitraryVariableShadow,
            isArbitraryShadow
          ]
        }],
"shadow-color": [{
          shadow: scaleColor()
        }],
"inset-shadow": [{
          "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
        }],
"inset-shadow-color": [{
          "inset-shadow": scaleColor()
        }],
"ring-w": [{
          ring: scaleBorderWidth()
        }],
"ring-w-inset": ["ring-inset"],
"ring-color": [{
          ring: scaleColor()
        }],
"ring-offset-w": [{
          "ring-offset": [isNumber, isArbitraryLength]
        }],
"ring-offset-color": [{
          "ring-offset": scaleColor()
        }],
"inset-ring-w": [{
          "inset-ring": scaleBorderWidth()
        }],
"inset-ring-color": [{
          "inset-ring": scaleColor()
        }],
"text-shadow": [{
          "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
        }],
"text-shadow-color": [{
          "text-shadow": scaleColor()
        }],
opacity: [{
          opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"mix-blend": [{
          "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
        }],
"bg-blend": [{
          "bg-blend": scaleBlendMode()
        }],
"mask-clip": [{
          "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
        }, "mask-no-clip"],
"mask-composite": [{
          mask: ["add", "subtract", "intersect", "exclude"]
        }],
"mask-image-linear-pos": [{
          "mask-linear": [isNumber]
        }],
        "mask-image-linear-from-pos": [{
          "mask-linear-from": scaleMaskImagePosition()
        }],
        "mask-image-linear-to-pos": [{
          "mask-linear-to": scaleMaskImagePosition()
        }],
        "mask-image-linear-from-color": [{
          "mask-linear-from": scaleColor()
        }],
        "mask-image-linear-to-color": [{
          "mask-linear-to": scaleColor()
        }],
        "mask-image-t-from-pos": [{
          "mask-t-from": scaleMaskImagePosition()
        }],
        "mask-image-t-to-pos": [{
          "mask-t-to": scaleMaskImagePosition()
        }],
        "mask-image-t-from-color": [{
          "mask-t-from": scaleColor()
        }],
        "mask-image-t-to-color": [{
          "mask-t-to": scaleColor()
        }],
        "mask-image-r-from-pos": [{
          "mask-r-from": scaleMaskImagePosition()
        }],
        "mask-image-r-to-pos": [{
          "mask-r-to": scaleMaskImagePosition()
        }],
        "mask-image-r-from-color": [{
          "mask-r-from": scaleColor()
        }],
        "mask-image-r-to-color": [{
          "mask-r-to": scaleColor()
        }],
        "mask-image-b-from-pos": [{
          "mask-b-from": scaleMaskImagePosition()
        }],
        "mask-image-b-to-pos": [{
          "mask-b-to": scaleMaskImagePosition()
        }],
        "mask-image-b-from-color": [{
          "mask-b-from": scaleColor()
        }],
        "mask-image-b-to-color": [{
          "mask-b-to": scaleColor()
        }],
        "mask-image-l-from-pos": [{
          "mask-l-from": scaleMaskImagePosition()
        }],
        "mask-image-l-to-pos": [{
          "mask-l-to": scaleMaskImagePosition()
        }],
        "mask-image-l-from-color": [{
          "mask-l-from": scaleColor()
        }],
        "mask-image-l-to-color": [{
          "mask-l-to": scaleColor()
        }],
        "mask-image-x-from-pos": [{
          "mask-x-from": scaleMaskImagePosition()
        }],
        "mask-image-x-to-pos": [{
          "mask-x-to": scaleMaskImagePosition()
        }],
        "mask-image-x-from-color": [{
          "mask-x-from": scaleColor()
        }],
        "mask-image-x-to-color": [{
          "mask-x-to": scaleColor()
        }],
        "mask-image-y-from-pos": [{
          "mask-y-from": scaleMaskImagePosition()
        }],
        "mask-image-y-to-pos": [{
          "mask-y-to": scaleMaskImagePosition()
        }],
        "mask-image-y-from-color": [{
          "mask-y-from": scaleColor()
        }],
        "mask-image-y-to-color": [{
          "mask-y-to": scaleColor()
        }],
        "mask-image-radial": [{
          "mask-radial": [isArbitraryVariable, isArbitraryValue]
        }],
        "mask-image-radial-from-pos": [{
          "mask-radial-from": scaleMaskImagePosition()
        }],
        "mask-image-radial-to-pos": [{
          "mask-radial-to": scaleMaskImagePosition()
        }],
        "mask-image-radial-from-color": [{
          "mask-radial-from": scaleColor()
        }],
        "mask-image-radial-to-color": [{
          "mask-radial-to": scaleColor()
        }],
        "mask-image-radial-shape": [{
          "mask-radial": ["circle", "ellipse"]
        }],
        "mask-image-radial-size": [{
          "mask-radial": [{
            closest: ["side", "corner"],
            farthest: ["side", "corner"]
          }]
        }],
        "mask-image-radial-pos": [{
          "mask-radial-at": scalePosition()
        }],
        "mask-image-conic-pos": [{
          "mask-conic": [isNumber]
        }],
        "mask-image-conic-from-pos": [{
          "mask-conic-from": scaleMaskImagePosition()
        }],
        "mask-image-conic-to-pos": [{
          "mask-conic-to": scaleMaskImagePosition()
        }],
        "mask-image-conic-from-color": [{
          "mask-conic-from": scaleColor()
        }],
        "mask-image-conic-to-color": [{
          "mask-conic-to": scaleColor()
        }],
"mask-mode": [{
          mask: ["alpha", "luminance", "match"]
        }],
"mask-origin": [{
          "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
        }],
"mask-position": [{
          mask: scaleBgPosition()
        }],
"mask-repeat": [{
          mask: scaleBgRepeat()
        }],
"mask-size": [{
          mask: scaleBgSize()
        }],
"mask-type": [{
          "mask-type": ["alpha", "luminance"]
        }],
"mask-image": [{
          mask: ["none", isArbitraryVariable, isArbitraryValue]
        }],



filter: [{
          filter: [
"",
            "none",
            isArbitraryVariable,
            isArbitraryValue
          ]
        }],
blur: [{
          blur: scaleBlur()
        }],
brightness: [{
          brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
contrast: [{
          contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"drop-shadow": [{
          "drop-shadow": [
"",
            "none",
            themeDropShadow,
            isArbitraryVariableShadow,
            isArbitraryShadow
          ]
        }],
"drop-shadow-color": [{
          "drop-shadow": scaleColor()
        }],
grayscale: [{
          grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"hue-rotate": [{
          "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
invert: [{
          invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
saturate: [{
          saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
sepia: [{
          sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-filter": [{
          "backdrop-filter": [
"",
            "none",
            isArbitraryVariable,
            isArbitraryValue
          ]
        }],
"backdrop-blur": [{
          "backdrop-blur": scaleBlur()
        }],
"backdrop-brightness": [{
          "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-contrast": [{
          "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-grayscale": [{
          "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-invert": [{
          "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-opacity": [{
          "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-saturate": [{
          "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
"backdrop-sepia": [{
          "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],



"border-collapse": [{
          border: ["collapse", "separate"]
        }],
"border-spacing": [{
          "border-spacing": scaleUnambiguousSpacing()
        }],
"border-spacing-x": [{
          "border-spacing-x": scaleUnambiguousSpacing()
        }],
"border-spacing-y": [{
          "border-spacing-y": scaleUnambiguousSpacing()
        }],
"table-layout": [{
          table: ["auto", "fixed"]
        }],
caption: [{
          caption: ["top", "bottom"]
        }],



transition: [{
          transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
        }],
"transition-behavior": [{
          transition: ["normal", "discrete"]
        }],
duration: [{
          duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
        }],
ease: [{
          ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
        }],
delay: [{
          delay: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
animate: [{
          animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
        }],



backface: [{
          backface: ["hidden", "visible"]
        }],
perspective: [{
          perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
        }],
"perspective-origin": [{
          "perspective-origin": scalePositionWithArbitrary()
        }],
rotate: [{
          rotate: scaleRotate()
        }],
"rotate-x": [{
          "rotate-x": scaleRotate()
        }],
"rotate-y": [{
          "rotate-y": scaleRotate()
        }],
"rotate-z": [{
          "rotate-z": scaleRotate()
        }],
scale: [{
          scale: scaleScale()
        }],
"scale-x": [{
          "scale-x": scaleScale()
        }],
"scale-y": [{
          "scale-y": scaleScale()
        }],
"scale-z": [{
          "scale-z": scaleScale()
        }],
"scale-3d": ["scale-3d"],
skew: [{
          skew: scaleSkew()
        }],
"skew-x": [{
          "skew-x": scaleSkew()
        }],
"skew-y": [{
          "skew-y": scaleSkew()
        }],
transform: [{
          transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
        }],
"transform-origin": [{
          origin: scalePositionWithArbitrary()
        }],
"transform-style": [{
          transform: ["3d", "flat"]
        }],
translate: [{
          translate: scaleTranslate()
        }],
"translate-x": [{
          "translate-x": scaleTranslate()
        }],
"translate-y": [{
          "translate-y": scaleTranslate()
        }],
"translate-z": [{
          "translate-z": scaleTranslate()
        }],
"translate-none": ["translate-none"],
zoom: [{
          zoom: [isInteger, isArbitraryVariable, isArbitraryValue]
        }],



accent: [{
          accent: scaleColor()
        }],
appearance: [{
          appearance: ["none", "auto"]
        }],
"caret-color": [{
          caret: scaleColor()
        }],
"color-scheme": [{
          scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
        }],
cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
        }],
"field-sizing": [{
          "field-sizing": ["fixed", "content"]
        }],
"pointer-events": [{
          "pointer-events": ["auto", "none"]
        }],
resize: [{
          resize: ["none", "", "y", "x"]
        }],
"scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
"scrollbar-thumb-color": [{
          "scrollbar-thumb": scaleColor()
        }],
"scrollbar-track-color": [{
          "scrollbar-track": scaleColor()
        }],
"scrollbar-gutter": [{
          "scrollbar-gutter": ["auto", "stable", "both"]
        }],
"scrollbar-w": [{
          scrollbar: ["auto", "thin", "none"]
        }],
"scroll-m": [{
          "scroll-m": scaleUnambiguousSpacing()
        }],
"scroll-mx": [{
          "scroll-mx": scaleUnambiguousSpacing()
        }],
"scroll-my": [{
          "scroll-my": scaleUnambiguousSpacing()
        }],
"scroll-ms": [{
          "scroll-ms": scaleUnambiguousSpacing()
        }],
"scroll-me": [{
          "scroll-me": scaleUnambiguousSpacing()
        }],
"scroll-mbs": [{
          "scroll-mbs": scaleUnambiguousSpacing()
        }],
"scroll-mbe": [{
          "scroll-mbe": scaleUnambiguousSpacing()
        }],
"scroll-mt": [{
          "scroll-mt": scaleUnambiguousSpacing()
        }],
"scroll-mr": [{
          "scroll-mr": scaleUnambiguousSpacing()
        }],
"scroll-mb": [{
          "scroll-mb": scaleUnambiguousSpacing()
        }],
"scroll-ml": [{
          "scroll-ml": scaleUnambiguousSpacing()
        }],
"scroll-p": [{
          "scroll-p": scaleUnambiguousSpacing()
        }],
"scroll-px": [{
          "scroll-px": scaleUnambiguousSpacing()
        }],
"scroll-py": [{
          "scroll-py": scaleUnambiguousSpacing()
        }],
"scroll-ps": [{
          "scroll-ps": scaleUnambiguousSpacing()
        }],
"scroll-pe": [{
          "scroll-pe": scaleUnambiguousSpacing()
        }],
"scroll-pbs": [{
          "scroll-pbs": scaleUnambiguousSpacing()
        }],
"scroll-pbe": [{
          "scroll-pbe": scaleUnambiguousSpacing()
        }],
"scroll-pt": [{
          "scroll-pt": scaleUnambiguousSpacing()
        }],
"scroll-pr": [{
          "scroll-pr": scaleUnambiguousSpacing()
        }],
"scroll-pb": [{
          "scroll-pb": scaleUnambiguousSpacing()
        }],
"scroll-pl": [{
          "scroll-pl": scaleUnambiguousSpacing()
        }],
"snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
"snap-stop": [{
          snap: ["normal", "always"]
        }],
"snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
"snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
"touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
"touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
"touch-pz": ["touch-pinch-zoom"],
select: [{
          select: ["none", "text", "all", "auto"]
        }],
"will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
        }],



fill: [{
          fill: ["none", ...scaleColor()]
        }],
"stroke-w": [{
          stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
        }],
stroke: [{
          stroke: ["none", ...scaleColor()]
        }],



"forced-color-adjust": [{
          "forced-color-adjust": ["auto", "none"]
        }]
      },
      conflictingClassGroups: {
        "container-named": ["container-type"],
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      },
      postfixLookupClassGroups: ["container-type"],
      orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
    };
  };
  const twMerge = createTailwindMerge(getDefaultConfig);
  function cn$1(...inputs) {
    return twMerge(clsx(inputs));
  }
  function g(n2, t2) {
    for (var e2 in t2) n2[e2] = t2[e2];
    return n2;
  }
  function E(n2, t2) {
    for (var e2 in n2) if ("__source" !== e2 && !(e2 in t2)) return true;
    for (var r2 in t2) if ("__source" !== r2 && n2[r2] !== t2[r2]) return true;
    return false;
  }
  function M(n2, t2) {
    this.props = n2, this.context = t2;
  }
  (M.prototype = new C$1()).isPureReactComponent = true, M.prototype.shouldComponentUpdate = function(n2, t2) {
    return E(this.props, n2) || E(this.state, t2);
  };
  var T = l$4.__b;
  l$4.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T && T(n2);
  };
  var A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  function D(n2) {
    function t2(t3) {
      var e2 = g({}, t3);
      return delete e2.ref, n2(e2, t3.ref || null);
    }
    return t2.$$typeof = A, t2.render = n2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t2;
  }
  var O = l$4.__e;
  l$4.__e = function(n2, t2, e2, r2) {
    if (n2.then) {
      for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n2, t2);
    }
    O(n2, t2, e2, r2);
  };
  var U = l$4.unmount;
  function V(n2, t2, e2) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = g({}, n2)).__c && (n2.__c.__P === e2 && (n2.__c.__P = t2), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return V(n3, t2, e2);
    })), n2;
  }
  function W(n2, t2, e2) {
    return n2 && e2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return W(n3, t2, e2);
    }), n2.__c && n2.__c.__P === t2 && (n2.__e && e2.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e2)), n2;
  }
  function P() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j(n2) {
    var t2 = n2.__ && n2.__.__c;
    return t2 && t2.__a && t2.__a(n2);
  }
  function B() {
    this.i = null, this.l = null;
  }
  l$4.unmount = function(n2) {
    var t2 = n2.__c;
    t2 && (t2.__z = true), t2 && t2.__R && t2.__R(), t2 && 32 & n2.__u && (n2.type = null), U && U(n2);
  }, (P.prototype = new C$1()).__c = function(n2, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.o && (r2.o = []), r2.o.push(e2);
    var u2 = j(r2.__v), o2 = false, i2 = function() {
      o2 || r2.__z || (o2 = true, e2.__R = null, u2 ? u2(c2) : c2());
    };
    e2.__R = i2;
    var l2 = e2.__P;
    e2.__P = null;
    var c2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n3 = r2.state.__a;
          r2.__v.__k[0] = W(n3, n3.__c.__P, n3.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.__P = l2, t3.forceUpdate();
      }
    };
    r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(i2, i2);
  }, P.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P.prototype.render = function(n2, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && k$1(S$1, null, n2.fallback);
    return i2 && (i2.__u &= -33), [k$1(S$1, null, e2.__a ? null : n2.children), i2];
  };
  var H = function(n2, t2, e2) {
    if (++e2[1] === e2[0] && n2.l.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e2 = n2.i; e2; ) {
      for (; e2.length > 3; ) e2.pop()();
      if (e2[1] < e2[0]) break;
      n2.i = e2 = e2[2];
    }
  };
  function Z(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function Y(n2) {
    var e2 = this, r2 = n2.h;
    if (e2.componentWillUnmount = function() {
      R(null, e2.v), e2.v = null, e2.h = null;
    }, e2.h && e2.h !== r2 && e2.componentWillUnmount(), !e2.v) {
      for (var u2 = e2.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
      e2.h = r2, e2.v = { nodeType: 1, parentNode: r2, childNodes: [], __k: { __m: u2.__m }, contains: function() {
        return true;
      }, namespaceURI: r2.namespaceURI, insertBefore: function(n3, t2) {
        this.childNodes.push(n3), e2.h.insertBefore(n3, t2);
      }, removeChild: function(n3) {
        this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e2.h.removeChild(n3);
      } };
    }
    R(k$1(Z, { context: e2.context }, n2.__v), e2.v);
  }
  function $(n2, e2) {
    var r2 = k$1(Y, { __v: n2, h: e2 });
    return r2.containerInfo = e2, r2;
  }
  (B.prototype = new C$1()).__a = function(n2) {
    var t2 = this, e2 = j(t2.__v), r2 = t2.l.get(n2);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), H(t2, n2, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, B.prototype.render = function(n2) {
    this.i = null, this.l = new Map();
    var t2 = F$1(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
    return n2.children;
  }, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
    var n2 = this;
    this.l.forEach(function(t2, e2) {
      H(n2, e2, t2);
    });
  };
  var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
  };
  C$1.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(C$1.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n2) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n2 });
    } });
  });
  var en = l$4.event;
  l$4.event = function(n2) {
    return en && (n2 = en(n2)), n2.persist = function() {
    }, n2.isPropagationStopped = function() {
      return this.cancelBubble;
    }, n2.isDefaultPrevented = function() {
      return this.defaultPrevented;
    }, n2.nativeEvent = n2;
  };
  var un = { configurable: true, get: function() {
    return this.class;
  } }, on = l$4.vnode;
  l$4.vnode = function(n2) {
    "string" == typeof n2.type && (function(n3) {
      var t2 = n3.props, e2 = n3.type, u2 = {}, o2 = -1 == e2.indexOf("-");
      for (var i2 in t2) {
        var l2 = t2[i2];
        if (!("value" === i2 && "defaultValue" in t2 && null == l2 || Q && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
          var c2 = i2.toLowerCase();
          "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === l2 ? l2 = "" : "translate" === c2 && "no" === l2 ? l2 = false : "o" === c2[0] && "n" === c2[1] ? "ondoubleclick" === c2 ? i2 = "ondblclick" : "onchange" !== c2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === c2 ? i2 = "onfocusin" : "onblur" === c2 ? i2 = "onfocusout" : J.test(i2) && (i2 = c2) : c2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K, "-$&").toLowerCase() : null === l2 && (l2 = void 0), "oninput" === c2 && u2[i2 = c2] && (i2 = "oninputCapture"), u2[i2] = l2;
        }
      }
      "select" == e2 && (u2.multiple && Array.isArray(u2.value) && (u2.value = F$1(t2.children).forEach(function(n4) {
        n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
      })), null != u2.defaultValue && (u2.value = F$1(t2.children).forEach(function(n4) {
        n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
      }))), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", un)) : t2.className && (u2.class = u2.className = t2.className), n3.props = u2;
    })(n2), n2.$$typeof = q, on && on(n2);
  };
  var ln = l$4.__r;
  l$4.__r = function(n2) {
    ln && ln(n2), n2.__c;
  };
  var cn = l$4.diffed;
  l$4.diffed = function(n2) {
    cn && cn(n2);
    var t2 = n2.props, e2 = n2.__e;
    null != e2 && "textarea" === n2.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value);
  };
  const e$7 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1("path", { d: "M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z", opacity: "0.2" }), k$1("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M222,128a94,94,0,0,1-92.74,94H128a93.43,93.43,0,0,1-64.5-25.65,6,6,0,1,1,8.24-8.72A82,82,0,1,0,70,70l-.19.19L39.44,98H72a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V56a6,6,0,0,1,12,0V90.34L61.63,61.4A94,94,0,0,1,222,128Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M220,128a92,92,0,0,1-90.77,92H128a91.47,91.47,0,0,1-63.13-25.1,4,4,0,1,1,5.5-5.82A84,84,0,1,0,68.6,68.57l-.13.12L34.3,100H72a4,4,0,0,1,0,8H24a4,4,0,0,1-4-4V56a4,4,0,0,1,8,0V94.89l35-32A92,92,0,0,1,220,128Z" }))
    ]
  ]);
  const e$6 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M228,48V96a12,12,0,0,1-12,12H168a12,12,0,0,1,0-24h19l-7.8-7.8a75.55,75.55,0,0,0-53.32-22.26h-.43A75.49,75.49,0,0,0,72.39,75.57,12,12,0,1,1,55.61,58.41a99.38,99.38,0,0,1,69.87-28.47H126A99.42,99.42,0,0,1,196.2,59.23L204,67V48a12,12,0,0,1,24,0ZM183.61,180.43a75.49,75.49,0,0,1-53.09,21.63h-.43A75.55,75.55,0,0,1,76.77,179.8L69,172H88a12,12,0,0,0,0-24H40a12,12,0,0,0-12,12v48a12,12,0,0,0,24,0V189l7.8,7.8A99.42,99.42,0,0,0,130,226.06h.56a99.38,99.38,0,0,0,69.87-28.47,12,12,0,0,0-16.78-17.16Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1("path", { d: "M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z", opacity: "0.2" }), k$1("path", { d: "M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L180.65,72a79.48,79.48,0,0,0-54.72-22.09h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27,96,96,0,0,1,192,60.7l18.36-18.36A8,8,0,0,1,224,48ZM186.41,183.29A80,80,0,0,1,75.35,184l18.31-18.31A8,8,0,0,0,88,152H40a8,8,0,0,0-8,8v48a8,8,0,0,0,13.66,5.66L64,195.3a95.42,95.42,0,0,0,66,26.76h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M222,48V96a6,6,0,0,1-6,6H168a6,6,0,0,1,0-12h33.52L183.47,72a81.51,81.51,0,0,0-57.53-24h-.46A81.5,81.5,0,0,0,68.19,71.28a6,6,0,1,1-8.38-8.58,93.38,93.38,0,0,1,65.67-26.76H126a93.45,93.45,0,0,1,66,27.53l18,18V48a6,6,0,0,1,12,0ZM187.81,184.72a81.5,81.5,0,0,1-57.29,23.34h-.46a81.51,81.51,0,0,1-57.53-24L54.48,166H88a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6v48a6,6,0,0,0,12,0V174.48l18,18.05a93.45,93.45,0,0,0,66,27.53h.52a93.38,93.38,0,0,0,65.67-26.76,6,6,0,1,0-8.38-8.58Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M220,48V96a4,4,0,0,1-4,4H168a4,4,0,0,1,0-8h38.34L184.89,70.54A84,84,0,0,0,66.8,69.85a4,4,0,1,1-5.6-5.72,92,92,0,0,1,129.34.76L212,86.34V48a4,4,0,0,1,8,0ZM189.2,186.15a83.44,83.44,0,0,1-58.68,23.91h-.47a83.52,83.52,0,0,1-58.94-24.6L49.66,164H88a4,4,0,0,0,0-8H40a4,4,0,0,0-4,4v48a4,4,0,0,0,8,0V169.66l21.46,21.45A91.43,91.43,0,0,0,130,218.06h.51a91.45,91.45,0,0,0,64.28-26.19,4,4,0,1,0-5.6-5.72Z" }))
    ]
  ]);
  const t = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1("path", { d: "M208,96l-80,80L48,96Z", opacity: "0.2" }), k$1("path", { d: "M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z" }))
    ]
  ]);
  const a$4 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M236,128a108,108,0,0,1-216,0c0-42.52,24.73-81.34,63-98.9A12,12,0,1,1,93,50.91C63.24,64.57,44,94.83,44,128a84,84,0,0,0,168,0c0-33.17-19.24-63.43-49-77.09A12,12,0,1,1,173,29.1C211.27,46.66,236,85.48,236,128Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1("path", { d: "M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z", opacity: "0.2" }), k$1("path", { d: "M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,176A72,72,0,0,1,92,65.64a8,8,0,0,1,8,13.85,56,56,0,1,0,56,0,8,8,0,0,1,8-13.85A72,72,0,0,1,128,200Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M230,128a102,102,0,0,1-204,0c0-40.18,23.35-76.86,59.5-93.45a6,6,0,0,1,5,10.9C58.61,60.09,38,92.49,38,128a90,90,0,0,0,180,0c0-35.51-20.61-67.91-52.5-82.55a6,6,0,0,1,5-10.9C206.65,51.14,230,87.82,230,128Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M228,128a100,100,0,0,1-200,0c0-39.4,22.9-75.37,58.33-91.63a4,4,0,1,1,3.34,7.27C57.07,58.6,36,91.71,36,128a92,92,0,0,0,184,0c0-36.29-21.07-69.4-53.67-84.36a4,4,0,1,1,3.34-7.27C205.1,52.63,228,88.6,228,128Z" }))
    ]
  ]);
  const l = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M128,76a52,52,0,1,0,52,52A52.06,52.06,0,0,0,128,76Zm0,80a28,28,0,1,1,28-28A28,28,0,0,1,128,156Zm113.86-49.57A12,12,0,0,0,236,98.34L208.21,82.49l-.11-31.31a12,12,0,0,0-4.25-9.12,116,116,0,0,0-38-21.41,12,12,0,0,0-9.68.89L128,37.27,99.83,21.53a12,12,0,0,0-9.7-.9,116.06,116.06,0,0,0-38,21.47,12,12,0,0,0-4.24,9.1l-.14,31.34L20,98.35a12,12,0,0,0-5.85,8.11,110.7,110.7,0,0,0,0,43.11A12,12,0,0,0,20,157.66l27.82,15.85.11,31.31a12,12,0,0,0,4.25,9.12,116,116,0,0,0,38,21.41,12,12,0,0,0,9.68-.89L128,218.73l28.14,15.74a12,12,0,0,0,9.7.9,116.06,116.06,0,0,0,38-21.47,12,12,0,0,0,4.24-9.1l.14-31.34,27.81-15.81a12,12,0,0,0,5.85-8.11A110.7,110.7,0,0,0,241.86,106.43Zm-22.63,33.18-26.88,15.28a11.94,11.94,0,0,0-4.55,4.59c-.54,1-1.11,1.93-1.7,2.88a12,12,0,0,0-1.83,6.31L184.13,199a91.83,91.83,0,0,1-21.07,11.87l-27.15-15.19a12,12,0,0,0-5.86-1.53h-.29c-1.14,0-2.3,0-3.44,0a12.08,12.08,0,0,0-6.14,1.51L93,210.82A92.27,92.27,0,0,1,71.88,199l-.11-30.24a12,12,0,0,0-1.83-6.32c-.58-.94-1.16-1.91-1.7-2.88A11.92,11.92,0,0,0,63.7,155L36.8,139.63a86.53,86.53,0,0,1,0-23.24l26.88-15.28a12,12,0,0,0,4.55-4.58c.54-1,1.11-1.94,1.7-2.89a12,12,0,0,0,1.83-6.31L71.87,57A91.83,91.83,0,0,1,92.94,45.17l27.15,15.19a11.92,11.92,0,0,0,6.15,1.52c1.14,0,2.3,0,3.44,0a12.08,12.08,0,0,0,6.14-1.51L163,45.18A92.27,92.27,0,0,1,184.12,57l.11,30.24a12,12,0,0,0,1.83,6.32c.58.94,1.16,1.91,1.7,2.88A11.92,11.92,0,0,0,192.3,101l26.9,15.33A86.53,86.53,0,0,1,219.23,139.61Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1(
        "path",
        {
          d: "M230.1,108.76,198.25,90.62c-.64-1.16-1.31-2.29-2-3.41l-.12-36A104.61,104.61,0,0,0,162,32L130,49.89c-1.34,0-2.69,0-4,0L94,32A104.58,104.58,0,0,0,59.89,51.25l-.16,36c-.7,1.12-1.37,2.26-2,3.41l-31.84,18.1a99.15,99.15,0,0,0,0,38.46l31.85,18.14c.64,1.16,1.31,2.29,2,3.41l.12,36A104.61,104.61,0,0,0,94,224l32-17.87c1.34,0,2.69,0,4,0L162,224a104.58,104.58,0,0,0,34.08-19.25l.16-36c.7-1.12,1.37-2.26,2-3.41l31.84-18.1A99.15,99.15,0,0,0,230.1,108.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z",
          opacity: "0.2"
        }
      ), k$1("path", { d: "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A111.92,111.92,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.63a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.1,8.1,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8,8,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M237.94,107.21a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A111.92,111.92,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.63a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Zm108-54.4a6,6,0,0,0-2.92-4L202.64,86.22l-.42-.71L202.1,51.2A6,6,0,0,0,200,46.64a110.12,110.12,0,0,0-36.07-20.31,6,6,0,0,0-4.84.45L128.46,43.86h-1L96.91,26.76a6,6,0,0,0-4.86-.44A109.92,109.92,0,0,0,56,46.68a6,6,0,0,0-2.12,4.55l-.16,34.34c-.14.23-.28.47-.41.71L22.91,103.57A6,6,0,0,0,20,107.62a104.81,104.81,0,0,0,0,40.78,6,6,0,0,0,2.92,4l30.42,17.33.42.71.12,34.31A6,6,0,0,0,56,209.36a110.12,110.12,0,0,0,36.07,20.31,6,6,0,0,0,4.84-.45l30.61-17.08h1l30.56,17.1A6.09,6.09,0,0,0,162,230a5.83,5.83,0,0,0,1.93-.32,109.92,109.92,0,0,0,36-20.36,6,6,0,0,0,2.12-4.55l.16-34.34c.14-.23.28-.47.41-.71l30.42-17.29a6,6,0,0,0,2.92-4.05A104.81,104.81,0,0,0,236,107.6Zm-11.25,35.79L195.32,160.1a6.07,6.07,0,0,0-2.28,2.3c-.59,1-1.21,2.11-1.86,3.14a6,6,0,0,0-.91,3.16l-.16,33.21a98.15,98.15,0,0,1-27.52,15.53L133,200.88a6,6,0,0,0-2.93-.77h-.14c-1.24,0-2.5,0-3.74,0a6,6,0,0,0-3.07.76L93.45,217.43a98,98,0,0,1-27.56-15.49l-.12-33.17a6,6,0,0,0-.91-3.16c-.64-1-1.27-2.08-1.86-3.14a6,6,0,0,0-2.27-2.3L31.3,143.4a93,93,0,0,1,0-30.79L60.68,95.9A6.07,6.07,0,0,0,63,93.6c.59-1,1.21-2.11,1.86-3.14a6,6,0,0,0,.91-3.16l.16-33.21A98.15,98.15,0,0,1,93.41,38.56L123,55.12a5.81,5.81,0,0,0,3.07.76c1.24,0,2.5,0,3.74,0a6,6,0,0,0,3.07-.76l29.65-16.56a98,98,0,0,1,27.56,15.49l.12,33.17a6,6,0,0,0,.91,3.16c.64,1,1.27,2.08,1.86,3.14a6,6,0,0,0,2.27,2.3L224.7,112.6A93,93,0,0,1,224.73,143.39Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36,36,0,0,1,128,164Zm106-56a4,4,0,0,0-2-2.7l-30.89-17.6q-.47-.82-1-1.62L200.1,51.2a3.94,3.94,0,0,0-1.42-3,107.8,107.8,0,0,0-35.41-19.94,4,4,0,0,0-3.23.29L129,45.87h-2l-31-17.36a4,4,0,0,0-3.23-.3,108.05,108.05,0,0,0-35.39,20,4,4,0,0,0-1.41,3l-.16,34.9-1,1.62L23.9,105.3A4,4,0,0,0,22,108a102.76,102.76,0,0,0,0,40,4,4,0,0,0,1.95,2.7l30.89,17.6q.47.83,1,1.62l.12,34.87a3.94,3.94,0,0,0,1.42,3,107.8,107.8,0,0,0,35.41,19.94,4,4,0,0,0,3.23-.29L127,210.13h2l31,17.36a4,4,0,0,0,3.23.3,108.05,108.05,0,0,0,35.39-20,4,4,0,0,0,1.41-3l.16-34.9,1-1.62L232.1,150.7a4,4,0,0,0,2-2.71A102.76,102.76,0,0,0,234,108Zm-7.48,36.67L196.3,161.84a4,4,0,0,0-1.51,1.53c-.61,1.09-1.25,2.17-1.91,3.24a3.92,3.92,0,0,0-.61,2.1l-.16,34.15a99.8,99.8,0,0,1-29.7,16.77l-30.4-17a4.06,4.06,0,0,0-2-.51H130c-1.28,0-2.57,0-3.84,0a4.1,4.1,0,0,0-2.05.51l-30.45,17A100.23,100.23,0,0,1,63.89,202.9l-.12-34.12a3.93,3.93,0,0,0-.61-2.11c-.66-1-1.3-2.14-1.91-3.23a4,4,0,0,0-1.51-1.53L29.49,144.68a94.78,94.78,0,0,1,0-33.34L59.7,94.16a4,4,0,0,0,1.51-1.53c.61-1.09,1.25-2.17,1.91-3.23a4,4,0,0,0,.61-2.11l.16-34.15a99.8,99.8,0,0,1,29.7-16.77l30.4,17a4.1,4.1,0,0,0,2.05.51c1.28,0,2.57,0,3.84,0a4,4,0,0,0,2.05-.51l30.45-17A100.23,100.23,0,0,1,192.11,53.1l.12,34.12a3.93,3.93,0,0,0,.61,2.11c.66,1,1.3,2.14,1.91,3.23a4,4,0,0,0,1.51,1.53l30.25,17.23A94.78,94.78,0,0,1,226.54,144.66Z" }))
    ]
  ]);
  const a$3 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1(
        "path",
        {
          d: "M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z",
          opacity: "0.2"
        }
      ), k$1("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M178,42c-21,0-39.26,9.47-50,25.34C117.26,51.47,99,42,78,42a60.07,60.07,0,0,0-60,60c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,161.59,238,131.2,238,102A60.07,60.07,0,0,0,178,42ZM128,217.11C111.59,207.64,30,157.72,30,102A48.05,48.05,0,0,1,78,54c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,64.83,157.72,54,178,54a48.05,48.05,0,0,1,48,48C226,157.72,144.41,207.64,128,217.11Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M178,44c-21.44,0-39.92,10.19-50,27.07C117.92,54.19,99.44,44,78,44a58.07,58.07,0,0,0-58,58c0,28.59,18,58.47,53.4,88.79a333.81,333.81,0,0,0,52.7,36.73,4,4,0,0,0,3.8,0,333.81,333.81,0,0,0,52.7-36.73C218,160.47,236,130.59,236,102A58.07,58.07,0,0,0,178,44ZM128,219.42c-14-8-100-59.35-100-117.42A50.06,50.06,0,0,1,78,52c21.11,0,38.85,11.31,46.3,29.51a4,4,0,0,0,7.4,0C139.15,63.31,156.89,52,178,52a50.06,50.06,0,0,1,50,50C228,160,142,211.46,128,219.42Z" }))
    ]
  ]);
  const e$5 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1(
        "path",
        {
          d: "M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L108,148,20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z",
          opacity: "0.2"
        }
      ), k$1("path", { d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.85l85.56,41.64L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a2,2,0,0,1-3.76.26l-40.68-83.58,49-49a6,6,0,1,0-8.49-8.49l-49,49L23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M224.47,31.52a11.87,11.87,0,0,0-11.82-3L20.74,86.67a12,12,0,0,0-1.91,22.38L105,151l41.92,86.15A11.88,11.88,0,0,0,157.74,244c.34,0,.69,0,1,0a11.89,11.89,0,0,0,10.52-8.63l58.21-192,0-.08A11.85,11.85,0,0,0,224.47,31.52Zm-4.62,9.54-58.23,192a4,4,0,0,1-7.48.59l-41.3-84.86,50-50a4,4,0,1,0-5.66-5.66l-50,50-84.9-41.31a3.88,3.88,0,0,1-2.27-4,3.93,3.93,0,0,1,3-3.54L214.9,36.16A3.93,3.93,0,0,1,216,36a4,4,0,0,1,2.79,1.19A3.93,3.93,0,0,1,219.85,41.06Z" }))
    ]
  ]);
  const a$2 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1(
        "path",
        {
          d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
          opacity: "0.2"
        }
      ), k$1("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z" }))
    ]
  ]);
  const e$4 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M238.15,78.54,177.46,17.86a20,20,0,0,0-28.3,0L97.2,70c-12.43-3.33-36.68-5.72-61.74,14.5a20,20,0,0,0-1.6,29.73l45.46,45.47-39.8,39.8a12,12,0,0,0,17,17l39.8-39.81,45.47,45.46A20,20,0,0,0,155.91,228c.46,0,.93,0,1.4-.05A20,20,0,0,0,171.87,220c4.69-6.23,11-16.13,14.44-28s3.45-22.88.16-33.4l51.7-51.87A20,20,0,0,0,238.15,78.54Zm-74.26,68.79a12,12,0,0,0-2.23,13.84c3.43,6.86,6.9,21-6.28,40.65L54.08,100.53c21.09-14.59,39.53-6.64,41-6a11.67,11.67,0,0,0,13.81-2.29l54.43-54.61,55,55Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1(
        "path",
        {
          d: "M229.66,98.34,172.39,155.8c11.46,22.93-1.72,45.86-10.11,57a8,8,0,0,1-12,.83L42.34,105.76A8,8,0,0,1,43,93.85c29.65-23.92,57.4-10,57.4-10l57.27-57.46a8,8,0,0,1,11.31,0L229.66,87A8,8,0,0,1,229.66,98.34Z",
          opacity: "0.2"
        }
      ), k$1("path", { d: "M235.32,81.37,174.63,20.69a16,16,0,0,0-22.63,0L98.37,74.49c-10.66-3.34-35-7.37-60.4,13.14a16,16,0,0,0-1.29,23.78L85,159.71,42.34,202.34a8,8,0,0,0,11.32,11.32L96.29,171l48.29,48.29A16,16,0,0,0,155.9,224c.38,0,.75,0,1.13,0a15.93,15.93,0,0,0,11.64-6.33c19.64-26.1,17.75-47.32,13.19-60L235.33,104A16,16,0,0,0,235.32,81.37ZM224,92.69h0l-57.27,57.46a8,8,0,0,0-1.49,9.22c9.46,18.93-1.8,38.59-9.34,48.62L48,100.08c12.08-9.74,23.64-12.31,32.48-12.31A40.13,40.13,0,0,1,96.81,91a8,8,0,0,0,9.25-1.51L163.32,32,224,92.68Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M235.33,104l-53.47,53.65c4.56,12.67,6.45,33.89-13.19,60A15.93,15.93,0,0,1,157,224c-.38,0-.75,0-1.13,0a16,16,0,0,1-11.32-4.69L96.29,171,53.66,213.66a8,8,0,0,1-11.32-11.32L85,159.71l-48.3-48.3A16,16,0,0,1,38,87.63c25.42-20.51,49.75-16.48,60.4-13.14L152,20.7a16,16,0,0,1,22.63,0l60.69,60.68A16,16,0,0,1,235.33,104Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M233.91,82.79,173.22,22.1a14,14,0,0,0-19.81,0L98.93,76.77c-9.52-3.25-34-8.34-59.71,12.41A14,14,0,0,0,38.1,110l49.71,49.71-44.05,44a6,6,0,1,0,8.48,8.48l44.05-44.05L146,217.89a14,14,0,0,0,9.9,4.11q.49,0,1,0a14,14,0,0,0,10.19-5.54c19.72-26.21,17.15-47.23,12.46-59.3l54.37-54.55A14,14,0,0,0,233.91,82.79ZM225.42,94.1h0l-57.27,57.46a6,6,0,0,0-1.11,6.92c9.94,19.88-1.71,40.32-9.54,50.72a2,2,0,0,1-3,.2L46.58,101.51a2,2,0,0,1,.18-3c12.5-10.09,24.5-12.76,33.7-12.76a42.13,42.13,0,0,1,17.25,3.41A6,6,0,0,0,104.64,88L161.9,30.59a2,2,0,0,1,2.83,0l60.69,60.68A2,2,0,0,1,225.42,94.1Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M235.32,81.37,174.63,20.69a16,16,0,0,0-22.63,0L98.37,74.49c-10.66-3.34-35-7.37-60.4,13.14a16,16,0,0,0-1.29,23.78L85,159.71,42.34,202.34a8,8,0,0,0,11.32,11.32L96.29,171l48.29,48.29A16,16,0,0,0,155.9,224c.38,0,.75,0,1.13,0a15.93,15.93,0,0,0,11.64-6.33c19.64-26.1,17.75-47.32,13.19-60L235.33,104A16,16,0,0,0,235.32,81.37ZM224,92.69h0l-57.27,57.46a8,8,0,0,0-1.49,9.22c9.46,18.93-1.8,38.59-9.34,48.62L48,100.08c12.08-9.74,23.64-12.31,32.48-12.31A40.13,40.13,0,0,1,96.81,91a8,8,0,0,0,9.25-1.51L163.32,32,224,92.68Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M232.49,84.2,171.8,23.51a12,12,0,0,0-17,0L99.45,79.07c-8.08-3-32.79-9.45-59,11.67a12,12,0,0,0-1,17.84l51.13,51.13L45.17,205.17a4,4,0,0,0,5.66,5.66l45.46-45.47,51.12,51.12A12,12,0,0,0,155.9,220c.28,0,.57,0,.85,0a12,12,0,0,0,8.73-4.74c19.83-26.36,16.51-47.18,11.71-58.57l55.3-55.49A12,12,0,0,0,232.49,84.2Zm-5.66,11.31h0L169.56,153a4,4,0,0,0-.75,4.61c10.43,20.85-1.62,42-9.73,52.83a4,4,0,0,1-6,.4L45.17,102.93a4,4,0,0,1,.33-6C58.44,86.53,70.86,83.74,80.44,83.74A43.9,43.9,0,0,1,98.6,87.38a4,4,0,0,0,4.62-.75l57.27-57.46a4,4,0,0,1,5.66,0l60.68,60.69A4,4,0,0,1,226.83,95.51Z" }))
    ]
  ]);
  const a$1 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M178.39,158c-11,19.06-29.39,30-50.39,30s-39.36-10.93-50.39-30a12,12,0,0,1,20.78-12c3.89,6.73,12.91,18,29.61,18s25.72-11.28,29.61-18a12,12,0,1,1,20.78,12ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM92,124a16,16,0,1,0-16-16A16,16,0,0,0,92,124Zm72-32a16,16,0,1,0,16,16A16,16,0,0,0,164,92Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1("path", { d: "M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z", opacity: "0.2" }), k$1("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.08,48c-10.29,17.79-27.39,28-46.92,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.08-20a8,8,0,1,1,13.84,8Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM92,96a12,12,0,1,1-12,12A12,12,0,0,1,92,96Zm82.92,60c-10.29,17.79-27.39,28-46.92,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.08-20a8,8,0,1,1,13.84,8ZM164,120a12,12,0,1,1,12-12A12,12,0,0,1,164,120Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M173.19,155c-9.92,17.16-26.39,27-45.19,27s-35.27-9.84-45.19-27a6,6,0,0,1,10.38-6c7.84,13.54,20.2,21,34.81,21s27-7.46,34.81-21a6,6,0,1,1,10.38,6ZM230,128A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128ZM92,118a10,10,0,1,0-10-10A10,10,0,0,0,92,118Zm72-20a10,10,0,1,0,10,10A10,10,0,0,0,164,98Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M171.46,154c-9.55,16.52-25.39,26-43.46,26s-33.91-9.48-43.46-26a4,4,0,0,1,6.92-4c8.21,14.19,21.19,22,36.54,22s28.33-7.81,36.54-22a4,4,0,1,1,6.92,4ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128ZM92,116a8,8,0,1,0-8-8A8,8,0,0,0,92,116Zm72-16a8,8,0,1,0,8,8A8,8,0,0,0,164,100Z" }))
    ]
  ]);
  const e$3 = new Map([
    [
      "bold",
k$1(S$1, null, k$1("path", { d: "M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z" }))
    ],
    [
      "duotone",
k$1(S$1, null, k$1("path", { d: "M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z", opacity: "0.2" }), k$1("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" }))
    ],
    [
      "fill",
k$1(S$1, null, k$1("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z" }))
    ],
    [
      "light",
k$1(S$1, null, k$1("path", { d: "M216,50H174V40a22,22,0,0,0-22-22H104A22,22,0,0,0,82,40V50H40a6,6,0,0,0,0,12H50V208a14,14,0,0,0,14,14H192a14,14,0,0,0,14-14V62h10a6,6,0,0,0,0-12ZM94,40a10,10,0,0,1,10-10h48a10,10,0,0,1,10,10V50H94ZM194,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V62H194ZM110,104v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Zm48,0v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Z" }))
    ],
    [
      "regular",
k$1(S$1, null, k$1("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" }))
    ],
    [
      "thin",
k$1(S$1, null, k$1("path", { d: "M216,52H172V40a20,20,0,0,0-20-20H104A20,20,0,0,0,84,40V52H40a4,4,0,0,0,0,8H52V208a12,12,0,0,0,12,12H192a12,12,0,0,0,12-12V60h12a4,4,0,0,0,0-8ZM92,40a12,12,0,0,1,12-12h48a12,12,0,0,1,12,12V52H92ZM196,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V60H196ZM108,104v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Zm48,0v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Z" }))
    ]
  ]);
  const o$3 = X$1({
    color: "currentColor",
    size: "1em",
    weight: "regular",
    mirrored: false
  });
  const p = D(
    (s2, a2) => {
      const {
        alt: n2,
        color: r2,
        size: t2,
        weight: o2,
        mirrored: c2,
        children: i2,
        weights: m2,
        ...x2
      } = s2, {
        color: d2 = "currentColor",
        size: l2,
        weight: f2 = "regular",
        mirrored: g2 = false,
        ...w2
      } = x$2(o$3);
      return k$1(
        "svg",
        {
          ref: a2,
          xmlns: "http://www.w3.org/2000/svg",
          width: t2 != null ? t2 : l2,
          height: t2 != null ? t2 : l2,
          fill: r2 != null ? r2 : d2,
          viewBox: "0 0 256 256",
          transform: c2 || g2 ? "scale(-1, 1)" : void 0,
          ...w2,
          ...x2
        },
        !!n2 && k$1("title", null, n2),
        i2,
        m2.get(o2 != null ? o2 : f2)
      );
    }
  );
  p.displayName = "IconBase";
  const r$2 = D((e2, t2) => k$1(p, { ref: t2, ...e2, weights: e$7 }));
  r$2.displayName = "ArrowCounterClockwiseIcon";
  const r$1 = D((e2, s2) => k$1(p, { ref: s2, ...e2, weights: e$6 }));
  r$1.displayName = "ArrowsClockwiseIcon";
  const e$2 = D((r2, t$12) => k$1(p, { ref: t$12, ...r2, weights: t }));
  e$2.displayName = "CaretDownIcon";
  const c = D((e2, r2) => k$1(p, { ref: r2, ...e2, weights: a$4 }));
  c.displayName = "CircleNotchIcon";
  const o$2 = D((r2, a2) => k$1(p, { ref: a2, ...r2, weights: l }));
  o$2.displayName = "GearSixIcon";
  const o$1 = D((r2, t2) => k$1(p, { ref: t2, ...r2, weights: a$3 }));
  o$1.displayName = "HeartIcon";
  const a = D((o2, r2) => k$1(p, { ref: r2, ...o2, weights: e$5 }));
  a.displayName = "PaperPlaneTiltIcon";
  const e$1 = D((r2, s2) => k$1(p, { ref: s2, ...r2, weights: a$2 }));
  e$1.displayName = "PlusIcon";
  const e = D((r2, s2) => k$1(p, { ref: s2, ...r2, weights: e$4 }));
  e.displayName = "PushPinIcon";
  const o = D((m2, r2) => k$1(p, { ref: r2, ...m2, weights: a$1 }));
  o.displayName = "SmileyIcon";
  const r = D((a2, e2) => k$1(p, { ref: e2, ...a2, weights: e$3 }));
  r.displayName = "TrashIcon";
  function AccordionItem({ open, onOpenChange, className, children, ...props }) {
    return u$2(
      "details",
      {
        open,
        onToggle: (e2) => {
          onOpenChange?.(e2.currentTarget.open);
        },
        class: cn$1(className) || void 0,
        ...props,
        children
      }
    );
  }
  function AccordionTrigger({ className, children, ...props }) {
    return u$2(
      "summary",
      {
        class: cn$1(
          "flex items-center justify-between gap-2",
          "cursor-pointer select-none font-bold",
          "rounded-md bg-acrylic-control px-1 py-0.5 backdrop-blur-md",
          "outline-none transition-[background-color,outline-color,box-shadow] duration-150 ease-out",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-brand/15",

"list-none",
          "[&::-webkit-details-marker]:hidden",
          className
        ),
        ...props,
        children: [
u$2("span", { class: "min-w-0 flex-1", children }),
u$2(
            e$2,
            {
              size: 13,
              weight: "bold",
              "aria-hidden": "true",
              className: "shrink-0 transition-transform [details[open]_&]:rotate-180"
            }
          )
        ]
      }
    );
  }
  function AccordionContent({ className, children, ...props }) {
    return u$2("div", { class: cn$1(className) || void 0, ...props, children });
  }
  const Textarea = D(function Textarea2({ disabled, className, ...props }, ref) {
    return u$2(
      "textarea",
      {
        ref,
        disabled,
        class: cn$1(
          "box-border w-full",
          "px-2 py-1.5",
          "rounded-lg border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid",
          "bg-acrylic-control text-inherit backdrop-blur-md",
          "leading-[1.4] outline-none",
          "placeholder:text-ga5",
          "min-h-10 resize-y",
          "cursor-text disabled:cursor-not-allowed disabled:opacity-60",
          "shadow-none",
          "transition-[border-color,outline-color,box-shadow] duration-150 ease-out",
          "focus:border-brand",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-brand/15",
          className
        ),
        ...props
      }
    );
  });
  function LogPanel() {
    const ref = A$1(null);
    y$2(() => {
      if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [logLines.value]);
    return u$2(
      AccordionItem,
      {
        open: logPanelOpen.value,
        onOpenChange: (v2) => {
          logPanelOpen.value = v2;
        },
        className: "border-[color:var(--chatterbox-lite-acrylic-divider)] border-t border-solid pt-3",
        children: [
u$2(AccordionTrigger, { children: "日志" }),
u$2(AccordionContent, { className: "pt-2", children: u$2(
            Textarea,
            {
              ref,
              readOnly: true,
              value: logLines.value.join("\n"),
              placeholder: `此处将输出日志（最多保留 ${MAX_LOG_LINES} 条）`,
              className: "h-20 resize-none text-[12px]"
            }
          ) })
        ]
      }
    );
  }
  const LAPLACE_CHAT_AUDIT_URL = "https://edge-workers.laplace.cn/laplace/chat-audit";
  function sanitizeDetectionResult(input, value) {
    const rawWords = Array.isArray(value?.sensitiveWords) ? value.sensitiveWords : [];
    const sensitiveWords = Array.from(
      new Set(
        rawWords.filter((word) => typeof word === "string" && word.length > 0 && input.includes(word))
      )
    );
    return {
      hasSensitiveContent: Boolean(value?.hasSensitiveContent) && sensitiveWords.length > 0,
      sensitiveWords
    };
  }
  async function detectSensitiveWords(text, fetcher = fetch) {
    try {
      const response = await fetcher(LAPLACE_CHAT_AUDIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completionMetadata: { input: text }
        })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText || "chat-audit request failed"}`);
      const body = await response.json();
      return sanitizeDetectionResult(text, body.completion);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      appendLog(`⚠️ AI检测服务出错：${msg}`);
      return { hasSensitiveContent: false, sensitiveWords: [] };
    }
  }
  function insertInvisibleChars(word) {
    return getGraphemes(word).join("­");
  }
  function replaceSensitiveWords(text, sensitiveWords) {
    let result = text;
    for (const word of sensitiveWords) {
      result = result.split(word).join(insertInvisibleChars(word));
    }
    return result;
  }
  async function tryAiEvasion(message, logPrefix, sendRetry) {
    const prefix = logPrefix ? `${logPrefix} ` : "";
    appendLog(`🤖 ${prefix}AI规避：正在检测敏感词…`);
    const detection = await detectSensitiveWords(message);
    const sensitiveWords = detection.sensitiveWords ?? [];
    if (!detection.hasSensitiveContent || sensitiveWords.length === 0) {
      appendLog(`⚠️ ${prefix}无法检测到敏感词，请手动检查`);
      return { success: false };
    }
    appendLog(`🤖 ${prefix}检测到敏感词：${sensitiveWords.join(", ")}，正在尝试规避…`);
    const evadedMessage = replaceSensitiveWords(message, sensitiveWords);
    const retryResult = await sendRetry(evadedMessage);
    if (retryResult.success) {
      appendLog(`✅ ${prefix}AI规避成功: ${evadedMessage}`);
      return { success: true, evadedMessage };
    }
    appendLog(`❌ ${prefix}AI规避失败: ${evadedMessage}，原因：${retryResult.error}`);
    return { success: false, evadedMessage, error: retryResult.error };
  }
  const SOFT_HYPHEN = "­";
  function isBlockedDanmakuError(error) {
    if (!error) return false;
    const text = error.toLowerCase();
    if (text === "f" || text === "k") return true;
    return ["屏蔽", "敏感", "违禁", "违规", "blocked", "sensitive"].some((keyword) => text.includes(keyword));
  }
  function getBracketSafePositions(graphemes) {
    const forbidden = new Set();
    let openAt = -1;
    for (let i2 = 0; i2 < graphemes.length; i2++) {
      const grapheme = graphemes[i2];
      if (grapheme === "[") {
        openAt = i2;
      } else if (grapheme === "]" && openAt !== -1) {
        for (let pos = openAt + 1; pos <= i2; pos++) forbidden.add(pos);
        openAt = -1;
      }
    }
    const positions = [];
    for (let pos = 1; pos <= graphemes.length; pos++) {
      if (!forbidden.has(pos)) positions.push(pos);
    }
    return positions.length > 0 ? positions : [graphemes.length];
  }
  function insertSoftHyphens(text, count) {
    const graphemes = getGraphemes(text);
    if (graphemes.length === 0) return text;
    const positions = getBracketSafePositions(graphemes);
    const insertCount = Math.max(1, Math.min(count, positions.length));
    const selected = new Set();
    for (let i2 = 0; i2 < insertCount; i2++) {
      const index = Math.floor((i2 + 1) * positions.length / (insertCount + 1));
      selected.add(positions[Math.min(index, positions.length - 1)]);
    }
    let result = "";
    for (let i2 = 0; i2 < graphemes.length; i2++) {
      if (selected.has(i2)) result += SOFT_HYPHEN;
      result += graphemes[i2];
    }
    if (selected.has(graphemes.length)) result += SOFT_HYPHEN;
    return result;
  }
  function buildBlockedRetryMessages(message, maxAttempts = 3) {
    const attempts = Math.max(0, Math.floor(maxAttempts));
    const candidates = [];
    for (let i2 = 1; i2 <= attempts; i2++) {
      const candidate = insertSoftHyphens(message, i2);
      if (candidate !== message && !candidates.includes(candidate)) {
        candidates.push(candidate);
      }
    }
    return candidates;
  }
  function buildReplacementRetryMessage(message, replacements) {
    let result = message;
    const matched = [];
    for (const [from, to] of replacements) {
      if (!from || !result.includes(from)) continue;
      matched.push(from);
      result = result.split(from).join(to);
    }
    if (result === message) return null;
    return { message: result, matched };
  }
  const scheduleNextFrame = (callback) => window.requestAnimationFrame(callback);
  function focusTextareaAfterSend(textarea, schedule = scheduleNextFrame) {
    if (!textarea) return;
    schedule(() => {
      if (!textarea.isConnected || textarea.disabled) return;
      textarea.focus();
      const cursor = textarea.value.length;
      try {
        textarea.setSelectionRange(cursor, cursor);
      } catch {
      }
    });
  }
  function getVisibleEmoticonPackages(packages) {
    return packages.slice(1).filter((pkg) => pkg.emoticons.length > 0);
  }
  function getPinnedEmoticons(packages, pinnedUniques) {
    const byUnique = new Map();
    for (const pkg of getVisibleEmoticonPackages(packages)) {
      for (const emoticon of pkg.emoticons) {
        if (!byUnique.has(emoticon.emoticon_unique)) byUnique.set(emoticon.emoticon_unique, emoticon);
      }
    }
    const seen = new Set();
    const result = [];
    for (const unique of pinnedUniques) {
      if (seen.has(unique)) continue;
      seen.add(unique);
      const emoticon = byUnique.get(unique);
      if (emoticon) result.push(emoticon);
    }
    return result;
  }
  function togglePinnedEmoticon(pinnedUniques, unique) {
    if (pinnedUniques.includes(unique)) {
      return pinnedUniques.filter((item) => item !== unique);
    }
    return [unique, ...pinnedUniques.filter((item) => item !== unique)];
  }
  const BASE_CLASS = [
    "inline-flex items-center justify-center",
    "gap-1.5 rounded-lg",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    "font-medium leading-[1.2]",
    "select-none whitespace-nowrap box-border",
    "outline-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-3.5",
    "transition-[background-color,border-color,color,filter,outline-color,scale,box-shadow] duration-150 ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
    "focus-visible:ring-2 focus-visible:ring-brand/20",
    "[&:not(:disabled):hover]:brightness-[.96]",
    "[&:not(:disabled):active]:brightness-[.9]",
    "active:scale-[0.96]"
  ].join(" ");
  const SIZE_CLASS = {
    sm: "px-1.5 py-px min-h-[18px] text-[12px] [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3",
    default: "px-2.5 py-1 min-h-6 text-[13px] [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3",
    lg: "px-3.5 py-1.5 min-h-7 text-[13px] [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-4",
    icon: "p-0 w-6 h-6 [@media(pointer:coarse)]:size-11"
  };
  const VARIANT_CLASS = {
    default: "border border-brand border-solid bg-brand text-white shadow-[0_8px_18px_rgba(37,99,217,.18),inset_0_1px_0_rgba(255,255,255,.24)]",
    secondary: "border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid bg-acrylic-control text-inherit shadow-none backdrop-blur-md",
    destructive: "bg-transparent text-danger border border-solid border-danger",
    outline: "border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid bg-acrylic-control text-inherit shadow-none backdrop-blur-md",
    ghost: "bg-transparent text-inherit border border-solid border-transparent",
    link: "border border-transparent border-solid bg-transparent p-0 text-link underline underline-offset-2 min-h-[auto]"
  };
  function Button({
    variant = "default",
    size = "default",
    type = "button",
    disabled,
    className,
    children,
    ...props
  }) {
    return u$2(
      "button",
      {
        type,
        disabled,
        class: cn$1(BASE_CLASS, SIZE_CLASS[size], VARIANT_CLASS[variant], className),
        "data-variant": variant,
        "data-size": size,
        ...props,
        children
      }
    );
  }
  function getFixedPopoverStyle({
    triggerRect,
    side,
    align,
    viewportWidth,
    viewportHeight,
    offset = 4,
    viewportMargin = 8
  }) {
    const style = {
      position: "fixed"
    };
    if (align === "end") {
      style.right = `${Math.max(viewportMargin, viewportWidth - triggerRect.right)}px`;
    } else if (align === "center") {
      const center = Math.max(
        viewportMargin,
        Math.min(triggerRect.left + triggerRect.width / 2, viewportWidth - viewportMargin)
      );
      style.left = `${center}px`;
      style.transform = "translateX(-50%)";
    } else {
      style.left = `${Math.max(viewportMargin, Math.min(triggerRect.left, viewportWidth - viewportMargin))}px`;
    }
    if (side === "top") {
      style.bottom = `${Math.max(viewportMargin, viewportHeight - triggerRect.top + offset)}px`;
      style.maxHeight = `${Math.max(80, triggerRect.top - viewportMargin - offset)}px`;
    } else {
      style.top = `${Math.min(triggerRect.bottom + offset, viewportHeight - viewportMargin)}px`;
      style.maxHeight = `${Math.max(80, viewportHeight - triggerRect.bottom - viewportMargin - offset)}px`;
    }
    return style;
  }
  const PopoverContext = X$1(null);
  function usePopover() {
    const ctx = x$2(PopoverContext);
    if (!ctx) throw new Error("Popover.* must be used inside <Popover>");
    return ctx;
  }
  function Popover({ open, onOpenChange, className, children }) {
    const wrapperRef = A$1(null);
    const contentRef = A$1(null);
    return u$2(PopoverContext.Provider, { value: { open, setOpen: onOpenChange, wrapperRef, contentRef }, children: u$2("div", { ref: wrapperRef, class: cn$1("relative inline-block", className), children }) });
  }
  function PopoverTrigger({ children }) {
    const { open, setOpen } = usePopover();
    if (!t$3(children)) return children;
    const originalOnClick = children.props?.onClick;
    return W$1(children, {
      onClick: (e2) => {
        if (typeof originalOnClick === "function") originalOnClick(e2);
        setOpen(!open);
      }
    });
  }
  function getPortalRoot(wrapper) {
    if (!wrapper) return null;
    const root = wrapper.getRootNode();
    if (root instanceof ShadowRoot) {
      const existing = root.getElementById("chatterbox-lite-portal-root");
      if (existing) return existing;
      const created = document.createElement("div");
      created.id = "chatterbox-lite-portal-root";
      root.appendChild(created);
      return created;
    }
    return wrapper.ownerDocument.body;
  }
  function getCurrentFixedStyle(wrapper, side, align) {
    if (!wrapper) return void 0;
    const fixedStyle = getFixedPopoverStyle({
      triggerRect: wrapper.getBoundingClientRect(),
      side,
      align,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    });
    return {
      ...fixedStyle,
      "--chatterbox-lite-popover-max-height": fixedStyle.maxHeight
    };
  }
  function requestLayoutChange() {
    window.dispatchEvent(new CustomEvent("chatterbox-lite:layout-change"));
  }
  function PopoverContent({
    children,
    side = "bottom",
    align = "start",
    className,
    portal = false
  }) {
    const { open, setOpen, wrapperRef, contentRef } = usePopover();
    const [fixedStyle, setFixedStyle] = d$1(void 0);
    y$2(() => {
      if (!open) return;
      const onDoc = (e2) => {
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        const path = e2.composedPath();
        if (wrapper && path.includes(wrapper)) return;
        if (content && path.includes(content)) return;
        setOpen(false);
      };
      const onKey = (e2) => {
        if (e2.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onDoc);
        document.removeEventListener("keydown", onKey);
      };
    }, [open]);
    y$2(() => {
      if (!open || !portal) {
        setFixedStyle(void 0);
        requestLayoutChange();
        return;
      }
      const update = () => {
        setFixedStyle(getCurrentFixedStyle(wrapperRef.current, side, align));
        requestLayoutChange();
      };
      update();
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, true);
      return () => {
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update, true);
        requestLayoutChange();
      };
    }, [open, portal, side, align]);
    if (!open) return null;
    const sideClass = side === "top" ? "bottom-full mb-1" : "top-full mt-1";
    const alignClass = align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";
    const node = u$2(
      "div",
      {
        ref: contentRef,
        role: "dialog",
        "data-chatterbox-lite-popover": "true",
        "data-chatterbox-lite-no-drag": "true",
        style: portal ? fixedStyle ?? getCurrentFixedStyle(wrapperRef.current, side, align) : void 0,
        class: cn$1(
          portal ? "fixed z-2147483647" : "absolute z-50",
          !portal && sideClass,
          !portal && alignClass,
          "rounded-lg border border-[color:var(--chatterbox-lite-acrylic-border)] border-b-[color:var(--chatterbox-lite-acrylic-border-bottom)] border-solid",
          "bg-acrylic-popover text-inherit shadow-[var(--chatterbox-lite-acrylic-popover-shadow)]",
          "backdrop-blur-xl backdrop-saturate-150",
          "pointer-events-auto overflow-visible outline-none",
          className
        ),
        children
      }
    );
    if (!portal) return node;
    const portalRoot = getPortalRoot(wrapperRef.current);
    return portalRoot ? $(node, portalRoot) : node;
  }
  const EMOTE_GRID_CLASS = "grid grid-cols-[repeat(auto-fit,minmax(52px,1fr))] gap-x-1 gap-y-0.5";
  function normalizeImageUrl(url) {
    if (url.startsWith("//")) return `https:${url}`;
    if (url.startsWith("http://")) return `https://${url.slice("http://".length)}`;
    return url;
  }
  function EmoteSelector({ side = "top" }) {
    const open = useSignal(false);
    const copiedId = useSignal(null);
    const packages = cachedEmoticonPackages.value;
    const visiblePackages = getVisibleEmoticonPackages(packages);
    const pinnedEmoticons = getPinnedEmoticons(packages, pinnedEmoticonUniques.value);
    const handleSend = async (unique) => {
      open.value = false;
      if (isLockedEmoticon(unique)) {
        appendLog(formatLockedEmoticonReject(unique, "手动表情"));
        return;
      }
      try {
        const result = await getRuntimeAdapter().sendDanmaku(unique);
        appendLog(result, "手动表情", unique);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 发送出错：${msg}`);
      }
    };
    const handleCopy2 = async (unique) => {
      try {
        await navigator.clipboard.writeText(unique);
      } catch {
        alert(`复制失败，请手动复制：${unique}`);
        return;
      }
      copiedId.value = unique;
      setTimeout(() => {
        if (copiedId.peek() === unique) copiedId.value = null;
      }, 1500);
    };
    const handleTogglePin = (unique) => {
      pinnedEmoticonUniques.value = togglePinnedEmoticon(pinnedEmoticonUniques.value, unique);
    };
    const handleOpenChange = (value) => {
      open.value = value;
      if (!value || cachedEmoticonPackages.value.length > 0) return;
      void (async () => {
        try {
          await getRuntimeAdapter().fetchEmoticons();
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          appendLog(`⚠️ 表情数据加载失败：${msg}`);
        }
      })();
    };
    const renderEmote = (emo) => {
      const unique = emo.emoticon_unique;
      const isLocked = emo.perm === 0;
      const isCopied = copiedId.value === unique;
      const isPinned = pinnedEmoticonUniques.value.includes(unique);
      const lockText = emo.unlock_show_text?.trim() || "";
      return u$2(
        "div",
        {
          class: "relative flex min-w-0 flex-col items-center gap-0.5 [contain-intrinsic-size:58px_68px] [content-visibility:auto]",
          children: [
u$2(
              "button",
              {
                type: "button",
                title: isPinned ? "取消置顶" : "置顶到常用",
                "aria-label": isPinned ? "取消置顶" : "置顶到常用",
                onClick: (e2) => {
                  e2.preventDefault();
                  e2.stopPropagation();
                  handleTogglePin(unique);
                },
                class: cn$1(
                  "absolute top-px left-px z-10 m-0 flex size-4 items-center justify-center",
                  "rounded-sm border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid bg-acrylic-control p-0 text-[11px] leading-none backdrop-blur-md",
                  "cursor-pointer transition hover:border-brand hover:text-brand",
                  isPinned ? "border-brand text-brand" : "text-ga5"
                ),
                children: u$2(e, { size: 11, weight: isPinned ? "fill" : "regular", "aria-hidden": "true" })
              }
            ),
u$2(
              Button,
              {
                type: "button",
                variant: "outline",
                title: `${emo.emoji}
点击发送: ${unique}`,
                onClick: () => void handleSend(unique),
                className: cn$1("relative size-[52px] p-0.5", isLocked && "opacity-60"),
                children: [
u$2(
                    "img",
                    {
                      src: normalizeImageUrl(emo.url),
                      alt: emo.emoji,
                      class: "size-full object-contain",
                      decoding: "async",
                      draggable: false,
                      fetchPriority: "low",
                      loading: "lazy",
                      referrerPolicy: "no-referrer"
                    }
                  ),
                  isLocked && u$2(
                    "span",
                    {
                      class: "pointer-events-none absolute top-px right-px rounded-sm p-0.5 text-[9px] text-white leading-none",
                      style: { background: emo.unlock_show_color || "rgba(0, 0, 0, 0.6)" },
                      children: lockText || "锁"
                    }
                  )
                ]
              }
            ),
u$2(
              "button",
              {
                type: "button",
                title: `点击复制: ${unique}`,
                onClick: () => void handleCopy2(unique),
                class: cn$1(
                  "m-0 w-full truncate border-none bg-transparent p-0 text-[10px] leading-tight",
                  "cursor-pointer transition hover:text-brand",
                  isCopied && "font-bold text-brand"
                ),
                children: isCopied ? "已复制" : emo.emoji
              }
            )
          ]
        },
        unique
      );
    };
    return u$2(Popover, { open: open.value, onOpenChange: handleOpenChange, children: [
u$2(PopoverTrigger, { children: u$2(Button, { variant: open.value ? "default" : "outline", size: "sm", title: "表情", "aria-label": "表情", children: u$2(o, { weight: "bold", "aria-hidden": "true" }) }) }),
u$2(PopoverContent, { side, align: "start", portal: true, className: "w-[calc(var(--chatterbox-lite-dialog-width)-24px)]", children: u$2(
        "div",
        {
          class: "overflow-y-auto p-1.5 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/35 [&::-webkit-scrollbar]:w-1.5",
          style: { maxHeight: "min(360px, var(--chatterbox-lite-popover-max-height, 44vh))" },
          children: packages.length === 0 ? u$2("div", { class: "text-ga6", children: "表情数据加载中…" }) : visiblePackages.length === 0 ? u$2("div", { class: "text-ga6", children: "暂无可用表情" }) : u$2(S$1, { children: [
            pinnedEmoticons.length > 0 && u$2("div", { class: "mb-3 border-[color:var(--chatterbox-lite-acrylic-divider)] border-b border-solid pb-3", children: [
u$2("div", { class: "mb-1 font-bold text-[11px] text-ga6", children: [
                "常用置顶",
u$2("span", { class: "ml-2 font-normal", children: [
                  "(",
                  pinnedEmoticons.length,
                  ")"
                ] })
              ] }),
u$2("div", { class: EMOTE_GRID_CLASS, children: pinnedEmoticons.map(renderEmote) })
            ] }),
            visiblePackages.map((pkg) => u$2("div", { class: "mb-3 last:mb-0", children: [
u$2("div", { class: "mb-1 font-bold text-[11px] text-ga6", children: [
                pkg.pkg_name,
u$2("span", { class: "ml-2 font-normal", children: [
                  "(",
                  pkg.emoticons.length,
                  ")"
                ] })
              ] }),
u$2("div", { class: EMOTE_GRID_CLASS, children: pkg.emoticons.map(renderEmote) })
            ] }, pkg.pkg_id))
          ] })
        }
      ) })
    ] });
  }
  function Input({ type = "text", disabled, className, ...props }) {
    return u$2(
      "input",
      {
        type,
        disabled,
        class: cn$1(
          "box-border w-full min-w-0",
          "px-1 py-px",
          "rounded-lg border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid",
          "bg-acrylic-control text-inherit backdrop-blur-md",
          "min-h-5 leading-none outline-none",
          "placeholder:text-ga5",
          "cursor-text disabled:cursor-not-allowed disabled:opacity-60",
          "shadow-none",
          "transition-[border-color,outline-color,box-shadow] duration-150 ease-out",
          "focus:border-brand",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-brand/15",
          className
        ),
        ...props
      }
    );
  }
  function SettingCheckbox({
    label,
    checked,
    onChange
  }) {
    return u$2("label", { class: "flex cursor-pointer items-center gap-2 text-[12px]", children: [
u$2(
        "input",
        {
          type: "checkbox",
          checked,
          class: "h-3.5 w-3.5 accent-brand",
          onInput: (e2) => {
            onChange(e2.currentTarget.checked);
          }
        }
      ),
u$2("span", { children: label })
    ] });
  }
  function SettingsPanel() {
    const autoSeekDelayDelta = autoSeekCurrentBufferLen.value - autoSeekBufferThreshold.value;
    const autoSeekDelayColor = autoSeekCurrentBufferLen.value < 0.2 ? "#f44" : autoSeekDelayDelta > 1 ? "#e8a200" : "#36a185";
    const autoSeekRateColor = Math.abs(autoSeekCurrentRate.value - 1) < 5e-3 ? "#666" : autoSeekCurrentRate.value > 1 ? "#e8a200" : "#f44";
    const updateAutoSeekEnabled = (value) => {
      autoSeekEnabled.value = value;
    };
    const updateAutoSeekBufferThreshold = (value) => {
      autoSeekBufferThreshold.value = value;
    };
    return u$2("div", { class: "space-y-2", children: [
u$2("div", { class: "flex items-center justify-between gap-2", children: [
u$2("div", { class: "font-bold text-[12px]", children: "显示与行为" }),
u$2(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              dialogLeft.value = null;
              dialogTop.value = null;
            },
            children: [
u$2(r$2, { weight: "bold", "aria-hidden": "true" }),
              "重置位置"
            ]
          }
        )
      ] }),
u$2("div", { class: "grid gap-1", children: [
u$2(
          SettingCheckbox,
          {
            label: "显示仅音频按钮",
            checked: showAudioOnlyButton.value,
            onChange: (v2) => {
              showAudioOnlyButton.value = v2;
            }
          }
        ),
u$2(
          SettingCheckbox,
          {
            label: "显示发送功能",
            checked: showNormalSendPanel.value,
            onChange: (v2) => {
              showNormalSendPanel.value = v2;
            }
          }
        ),
u$2(
          SettingCheckbox,
          {
            label: "显示词库功能",
            checked: showReplacementPanel.value,
            onChange: (v2) => {
              showReplacementPanel.value = v2;
            }
          }
        ),
u$2(
          SettingCheckbox,
          {
            label: "显示日志功能",
            checked: showLogPanel.value,
            onChange: (v2) => {
              showLogPanel.value = v2;
            }
          }
        ),
u$2(
          SettingCheckbox,
          {
            label: "屏蔽词失败后自动重试",
            checked: blockedRetryEnabled.value,
            onChange: (v2) => {
              blockedRetryEnabled.value = v2;
            }
          }
        ),
u$2(
          SettingCheckbox,
          {
            label: "显示弹幕 +1 / 复制",
            checked: danmakuDirectEnabled.value,
            onChange: (v2) => {
              danmakuDirectEnabled.value = v2;
            }
          }
        ),
u$2("div", { class: "mt-1 border-[color:var(--chatterbox-lite-acrylic-divider)] border-t border-t-solid pt-1 font-bold text-[12px]", children: "播放器追帧" }),
u$2(
          SettingCheckbox,
          {
            label: "启用自动追帧",
            checked: autoSeekEnabled.value,
            onChange: (v2) => {
              updateAutoSeekEnabled(v2);
            }
          }
        ),
u$2("label", { htmlFor: "autoSeekBufferThreshold", class: "flex items-center gap-1 text-[12px]", children: [
u$2("span", { children: "目标延迟" }),
u$2(
            Input,
            {
              id: "autoSeekBufferThreshold",
              type: "number",
              min: "0.3",
              max: "10",
              step: "0.1",
              disabled: !autoSeekEnabled.value,
              value: autoSeekBufferThreshold.value,
              className: "w-16",
              onInput: (e2) => {
                const value = Number.parseFloat(e2.currentTarget.value);
                if (Number.isFinite(value) && value >= 0.3 && value <= 10) {
                  updateAutoSeekBufferThreshold(value);
                }
              },
              onBlur: (e2) => {
                let value = Number.parseFloat(e2.currentTarget.value);
                if (!Number.isFinite(value) || value < 0.3) value = 0.3;
                if (value > 10) value = 10;
                updateAutoSeekBufferThreshold(value);
              }
            }
          ),
u$2("span", { children: "秒" })
        ] }),
        autoSeekEnabled.value && u$2("div", { class: "rounded border border-[color:var(--chatterbox-lite-acrylic-border)] border-solid bg-acrylic-control p-1.5 text-[12px] backdrop-blur-md", children: [
u$2("div", { children: [
            "当前延迟",
            " ",
u$2("span", { style: { color: autoSeekDelayColor, fontWeight: 600 }, children: [
              autoSeekCurrentBufferLen.value.toFixed(2),
              " 秒"
            ] })
          ] }),
u$2("div", { children: [
            "播放速度",
            " ",
u$2("span", { style: { color: autoSeekRateColor, fontWeight: 600 }, children: [
              autoSeekCurrentRate.value.toFixed(2),
              "×"
            ] })
          ] })
        ] })
      ] })
    ] });
  }
  function SettingsPopoverButton({ side = "top", align = "end" }) {
    return u$2(
      Popover,
      {
        open: settingsPanelOpen.value,
        onOpenChange: (v2) => {
          settingsPanelOpen.value = v2;
        },
        children: [
u$2(PopoverTrigger, { children: u$2(Button, { variant: "outline", size: "sm", className: "w-6 px-0", "aria-label": "打开设置", title: "设置", children: u$2(o$2, { size: 15, weight: "bold", "aria-hidden": "true" }) }) }),
u$2(PopoverContent, { side, align, portal: true, className: "w-[230px]", children: u$2(
            "div",
            {
              class: "overflow-y-auto p-2",
              style: { maxHeight: "min(320px, var(--chatterbox-lite-popover-max-height, 44vh))" },
              children: u$2(SettingsPanel, {})
            }
          ) })
        ]
      }
    );
  }
  function NormalSendTab({ inputOnly = false }) {
    const sending = useSignal(false);
    const liking = useSignal(false);
    const historyState = useSignal({ index: -1, draft: "" });
    const textareaRef = A$1(null);
    const sendMessage = async () => {
      if (sending.value) return;
      const originalMessage = fasongText.value.trim();
      if (!originalMessage) {
        appendLog("⚠️ 消息内容不能为空");
        return;
      }
      if (isLockedEmoticon(originalMessage)) {
        appendLog(formatLockedEmoticonReject(originalMessage, "手动表情"));
        fasongText.value = "";
        focusTextareaAfterSend(textareaRef.current);
        return;
      }
      if (isUnavailableEmoticon(originalMessage)) {
        appendLog(formatUnavailableEmoticonReject(originalMessage, "手动表情"));
        fasongText.value = "";
        focusTextareaAfterSend(textareaRef.current);
        return;
      }
      sending.value = true;
      try {
        const runtime2 = getRuntimeAdapter();
        const isEmote = isEmoticonUnique(originalMessage);
        if (!isEmote) {
          warmRemoteKeywordsInBackground();
        }
        const processedMessage = isEmote ? originalMessage : applyReplacements(originalMessage);
        const segments = isEmote ? [processedMessage] : processMessages(processedMessage, maxLength.value);
        const total = segments.length;
        let allSegmentsSent = true;
        for (let i2 = 0; i2 < total; i2++) {
          const segment = segments[i2];
          const result = await runtime2.sendDanmaku(segment);
          let segmentSent = result.success;
          const baseLabel = result.isEmoticon ? "手动表情" : "手动";
          const label = total > 1 ? `${baseLabel} [${i2 + 1}/${total}]` : baseLabel;
          const displayMsg = !isEmote && originalMessage !== processedMessage && total === 1 ? `${originalMessage} -> ${segment}` : segment;
          appendLog(result, label, displayMsg);
          if (!result.success && !result.isEmoticon && blockedRetryEnabled.value && isBlockedDanmakuError(result.error)) {
            let retryStillBlocked = true;
            const aiResult = await tryAiEvasion(segment, label, (message) => runtime2.sendDanmaku(message));
            if (aiResult.success) {
              segmentSent = true;
            } else if (aiResult.error && !isBlockedDanmakuError(aiResult.error)) {
              retryStillBlocked = false;
            }
            if (!segmentSent && retryStillBlocked) {
              try {
                await ensureRemoteKeywordsSynced(true);
              } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                appendLog(`⚠️ ${label} 重试前同步云端词库失败：${msg}`);
              }
              const replacementRetry = buildReplacementRetryMessage(segment, getReplacementEntries());
              if (replacementRetry) {
                appendLog(`-> ${label} 词库重试：${replacementRetry.matched.join(", ")}`);
                const retryResult = await runtime2.sendDanmaku(replacementRetry.message);
                appendLog(retryResult, `${label} 词库重试`, replacementRetry.message);
                if (retryResult.success) {
                  segmentSent = true;
                } else {
                  retryStillBlocked = isBlockedDanmakuError(retryResult.error);
                }
              }
            }
            if (!segmentSent && retryStillBlocked) {
              const retryMessages = buildBlockedRetryMessages(segment, 3);
              for (let retryIndex = 0; retryIndex < retryMessages.length; retryIndex++) {
                const retryMessage = retryMessages[retryIndex];
                appendLog(`-> ${label} 软字符重试 ${retryIndex + 1}/${retryMessages.length}`);
                const retryResult = await runtime2.sendDanmaku(retryMessage);
                appendLog(retryResult, `${label} 软字符重试 ${retryIndex + 1}`, retryMessage);
                if (retryResult.success) {
                  segmentSent = true;
                  break;
                }
                if (!isBlockedDanmakuError(retryResult.error)) break;
              }
            }
          }
          if (!segmentSent) allSegmentsSent = false;
          if (i2 < total - 1) {
            await new Promise((r2) => setTimeout(r2, msgSendInterval.value * 1e3));
          }
        }
        if (allSegmentsSent) {
          fasongText.value = "";
          historyState.value = { index: -1, draft: "" };
          sendHistory.value = addSendHistoryEntry(sendHistory.value, originalMessage);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 发送出错：${msg}`);
      } finally {
        sending.value = false;
        focusTextareaAfterSend(textareaRef.current);
      }
    };
    const handleInput = (e2) => {
      fasongText.value = e2.currentTarget.value;
      historyState.value = { index: -1, draft: "" };
    };
    const sendLike = async () => {
      if (liking.value) return;
      liking.value = true;
      try {
        const result = await getRuntimeAdapter().sendLiveLike();
        if (result.success) {
          appendLog(`👍 点赞x${result.count} 已发送`);
        } else {
          appendLog(`❌ 点赞失败：${formatDanmakuError(result.error)}`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        appendLog(`🔴 点赞出错：${msg}`);
      } finally {
        liking.value = false;
      }
    };
    const handleKeyDown = (e2) => {
      if ((e2.key === "ArrowUp" || e2.key === "ArrowDown") && !e2.isComposing && sendHistory.value.length > 0) {
        e2.preventDefault();
        const next = navigateSendHistory(
          sendHistory.value,
          fasongText.value,
          historyState.value,
          e2.key === "ArrowUp" ? "older" : "newer"
        );
        fasongText.value = next.text;
        historyState.value = next.state;
        return;
      }
      if (e2.key === "Enter" && !e2.shiftKey && !e2.isComposing) {
        e2.preventDefault();
        void sendMessage();
      }
    };
    if (inputOnly) {
      return u$2("div", { class: "relative", children: [
u$2(
          Textarea,
          {
            ref: textareaRef,
            value: fasongText.value,
            disabled: sending.value,
            onInput: handleInput,
            onKeyDown: handleKeyDown,
            placeholder: "输入弹幕内容",
            className: "h-20 resize-none pr-10"
          }
        ),
u$2("div", { class: "pointer-events-none absolute right-2 bottom-1.5 text-[11px] text-[var(--Ga7,#5f6670)] tabular-nums", children: fasongText.value.length })
      ] });
    }
    return u$2("div", { class: "space-y-2", children: [
u$2("div", { class: "relative", children: [
u$2(
          Textarea,
          {
            ref: textareaRef,
            value: fasongText.value,
            disabled: sending.value,
            onInput: handleInput,
            onKeyDown: handleKeyDown,
            placeholder: "输入弹幕内容",
            className: "h-20 resize-none pr-10"
          }
        ),
u$2("div", { class: "pointer-events-none absolute right-2 bottom-1.5 text-[11px] text-[var(--Ga7,#5f6670)] tabular-nums", children: fasongText.value.length })
      ] }),
u$2("div", { class: "flex items-center justify-between gap-2", children: [
u$2(
          "div",
          {
            class: "flex min-w-0 flex-1 cursor-move items-center gap-2 self-stretch",
            "data-chatterbox-lite-drag-surface": "true",
            children: u$2(EmoteSelector, { side: "top" })
          }
        ),
u$2("div", { class: "flex shrink-0 items-center gap-1", children: [
u$2(SettingsPopoverButton, { side: "top" }),
u$2(
            Button,
            {
              size: "sm",
              variant: "outline",
              disabled: liking.value,
              className: "w-6 px-0 leading-[1.2] [&_svg]:block [&_svg]:size-3.5",
              "aria-label": "点赞 30 次",
              title: "点赞 30 次",
              onClick: () => void sendLike(),
              children: liking.value ? u$2(c, { className: "animate-spin", "aria-hidden": "true" }) : u$2(o$1, { weight: "fill", "aria-hidden": "true" })
            }
          ),
u$2(Button, { size: "sm", disabled: sending.value || !fasongText.value.trim(), onClick: () => void sendMessage(), children: sending.value ? u$2(S$1, { children: [
u$2(c, { className: "animate-spin", "aria-hidden": "true" }),
            "发送中…"
          ] }) : u$2(S$1, { children: [
u$2(a, { weight: "bold", "aria-hidden": "true" }),
            "发送"
          ] }) })
        ] })
      ] })
    ] });
  }
  function formatSyncStatus() {
    const data = remoteKeywords.value;
    const syncedAt = remoteKeywordsLastSync.value;
    if (!data || !syncedAt) return "未同步";
    const globalCount = Object.keys(data.global?.keywords ?? {}).length;
    const roomId = cachedRoomId.value;
    const roomKeywords = roomId === null ? {} : data.rooms?.find((room) => String(room.room) === String(roomId))?.keywords ?? {};
    const roomCount = Object.keys(roomKeywords).length;
    const time = new Date(syncedAt).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    return `${time} · 全局 ${globalCount} / 本房间 ${roomCount}`;
  }
  function RuleList({
    rules,
    empty,
    onRemove
  }) {
    if (rules.length === 0) {
      return u$2("div", { class: "rounded bg-acrylic-control px-2 py-2 text-[12px] text-ga6 backdrop-blur-md", children: empty });
    }
    return u$2("div", { class: "max-h-24 space-y-1 overflow-y-auto", children: rules.map((rule, index) => u$2(
      "div",
      {
        class: "flex items-center gap-2 rounded bg-acrylic-control px-2 py-1 backdrop-blur-md",
        children: [
u$2("span", { class: "min-w-0 flex-1 truncate text-[12px]", children: [
            rule.from || "(空)",
            " ",
            "->",
            " ",
            rule.to || "(空)"
          ] }),
u$2(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-5 px-1 text-danger",
              onClick: () => onRemove(index),
              children: [
u$2(r, { weight: "bold", "aria-hidden": "true" }),
                "删除"
              ]
            }
          )
        ]
      },
      `${rule.from}-${index}`
    )) });
  }
  function ReplacementPanel() {
    const syncing = useSignal(false);
    const status = useSignal(formatSyncStatus());
    const globalFrom = useSignal("");
    const globalTo = useSignal("");
    const roomFrom = useSignal("");
    const roomTo = useSignal("");
    const syncRemote = async () => {
      if (syncing.value) return;
      syncing.value = true;
      status.value = "正在同步…";
      try {
        await syncRemoteKeywords();
        status.value = formatSyncStatus();
        appendLog("✅ 云端词库同步完成");
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        status.value = `同步失败：${msg}`;
        appendLog(`❌ 云端词库同步失败：${msg}`);
      } finally {
        syncing.value = false;
      }
    };
    y$2(() => {
      void (async () => {
        try {
          await getRuntimeAdapter().ensureRoomState();
        } catch {
          return;
        }
        const last = remoteKeywordsLastSync.value;
        if (!last || Date.now() - last > REMOTE_KEYWORDS_SYNC_INTERVAL_MS) {
          await syncRemote();
        } else {
          buildReplacementMap();
          status.value = formatSyncStatus();
        }
      })();
    }, []);
    const addGlobalRule = () => {
      const from = globalFrom.value.trim();
      if (!from) {
        appendLog("⚠️ 替换前内容不能为空");
        return;
      }
      localGlobalRules.value = [...localGlobalRules.value, { from, to: globalTo.value }];
      buildReplacementMap();
      globalFrom.value = "";
      globalTo.value = "";
    };
    const addRoomRule = () => {
      const from = roomFrom.value.trim();
      const roomId = cachedRoomId.value;
      if (!from) {
        appendLog("⚠️ 替换前内容不能为空");
        return;
      }
      if (roomId === null) {
        appendLog("⚠️ 尚未识别当前直播间");
        return;
      }
      const key = String(roomId);
      const next = { ...localRoomRules.value };
      next[key] = [...next[key] ?? [], { from, to: roomTo.value }];
      localRoomRules.value = next;
      buildReplacementMap();
      roomFrom.value = "";
      roomTo.value = "";
    };
    const removeGlobalRule = (index) => {
      const next = [...localGlobalRules.value];
      next.splice(index, 1);
      localGlobalRules.value = next;
      buildReplacementMap();
    };
    const removeRoomRule = (index) => {
      const roomId = cachedRoomId.value;
      if (roomId === null) return;
      const key = String(roomId);
      const rules = [...localRoomRules.value[key] ?? []];
      rules.splice(index, 1);
      const next = { ...localRoomRules.value };
      if (rules.length === 0) delete next[key];
      else next[key] = rules;
      localRoomRules.value = next;
      buildReplacementMap();
    };
    const roomKey = cachedRoomId.value === null ? null : String(cachedRoomId.value);
    const roomRules = roomKey === null ? [] : localRoomRules.value[roomKey] ?? [];
    return u$2(
      AccordionItem,
      {
        open: replacementPanelOpen.value,
        onOpenChange: (v2) => {
          replacementPanelOpen.value = v2;
        },
        className: "border-[color:var(--chatterbox-lite-acrylic-divider)] border-t border-solid pt-3",
        children: [
u$2(AccordionTrigger, { children: "词库" }),
u$2(AccordionContent, { className: "pt-2", children: [
u$2("div", { class: "mb-2 flex items-center justify-between gap-2", children: [
u$2("div", { class: "min-w-0 truncate text-[11px] text-ga6", children: status.value }),
u$2(Button, { variant: "outline", size: "sm", disabled: syncing.value, onClick: () => void syncRemote(), children: [
u$2(r$1, { className: syncing.value ? "animate-spin" : void 0, "aria-hidden": "true" }),
                syncing.value ? "同步中…" : "同步云端"
              ] })
            ] }),
u$2("div", { class: "space-y-3", children: [
u$2("div", { children: [
u$2("div", { class: "mb-1 font-bold text-[12px]", children: "本地全局" }),
u$2(RuleList, { rules: localGlobalRules.value, empty: "暂无全局替换规则", onRemove: removeGlobalRule }),
u$2("div", { class: "mt-2 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-1", children: [
u$2(
                    Input,
                    {
                      placeholder: "替换前",
                      value: globalFrom.value,
                      onInput: (e2) => {
                        globalFrom.value = e2.currentTarget.value;
                      }
                    }
                  ),
u$2("span", { class: "text-ga6", children: "->" }),
u$2(
                    Input,
                    {
                      placeholder: "替换后",
                      value: globalTo.value,
                      onInput: (e2) => {
                        globalTo.value = e2.currentTarget.value;
                      }
                    }
                  ),
u$2(Button, { size: "sm", onClick: addGlobalRule, children: [
u$2(e$1, { weight: "bold", "aria-hidden": "true" }),
                    "加"
                  ] })
                ] })
              ] }),
u$2("div", { children: [
u$2("div", { class: "mb-1 flex items-center justify-between gap-2", children: [
u$2("span", { class: "font-bold text-[12px]", children: "当前房间" }),
u$2("span", { class: "text-[11px] text-ga6", children: roomKey ? `房间 ${roomKey}` : "识别中" })
                ] }),
u$2(RuleList, { rules: roomRules, empty: "暂无当前房间替换规则", onRemove: removeRoomRule }),
u$2("div", { class: "mt-2 grid grid-cols-[1fr_auto_1fr_auto] items-center gap-1", children: [
u$2(
                    Input,
                    {
                      placeholder: "替换前",
                      value: roomFrom.value,
                      onInput: (e2) => {
                        roomFrom.value = e2.currentTarget.value;
                      }
                    }
                  ),
u$2("span", { class: "text-ga6", children: "->" }),
u$2(
                    Input,
                    {
                      placeholder: "替换后",
                      value: roomTo.value,
                      onInput: (e2) => {
                        roomTo.value = e2.currentTarget.value;
                      }
                    }
                  ),
u$2(Button, { size: "sm", onClick: addRoomRule, children: [
u$2(e$1, { weight: "bold", "aria-hidden": "true" }),
                    "加"
                  ] })
                ] })
              ] })
            ] })
          ] })
        ]
      }
    );
  }
  const DIALOG_MIN_WIDTH = 280;
  const DIALOG_MAX_WIDTH = 680;
  const DIALOG_VIEWPORT_MARGIN = 40;
  const DIALOG_DEFAULT_BOTTOM = 88;
  const DIALOG_EDGE_MARGIN = 8;
  function clamp(raw, min, max) {
    return Math.max(min, Math.min(raw, max));
  }
  function clampWidth(raw) {
    const viewportMax = Math.min(DIALOG_MAX_WIDTH, window.innerWidth - DIALOG_VIEWPORT_MARGIN);
    return Math.max(DIALOG_MIN_WIDTH, Math.min(raw, viewportMax));
  }
  function isInteractiveTarget(target) {
    return target instanceof HTMLElement && Boolean(
      target.closest('button, input, textarea, select, a, label, summary, [role="button"], [contenteditable="true"]')
    );
  }
  function Configurator() {
    const dialogRef = A$1(null);
    const [, setViewportVersion] = d$1(0);
    const visible = dialogOpen.value;
    const width = clampWidth(dialogWidth.value);
    const customPosition = dialogLeft.value !== null && dialogTop.value !== null;
    const positionStyle = customPosition ? {
      left: `${clamp(dialogLeft.value ?? DIALOG_EDGE_MARGIN, DIALOG_EDGE_MARGIN, window.innerWidth - width - DIALOG_EDGE_MARGIN)}px`,
      top: `${clamp(dialogTop.value ?? DIALOG_EDGE_MARGIN, DIALOG_EDGE_MARGIN, window.innerHeight - 120)}px`
    } : {
      right: "1rem",
      bottom: `${DIALOG_DEFAULT_BOTTOM}px`
    };
    y$2(() => {
      const rerenderForViewport = () => {
        setViewportVersion((version) => version + 1);
      };
      window.addEventListener("resize", rerenderForViewport);
      window.addEventListener("orientationchange", rerenderForViewport);
      return () => {
        window.removeEventListener("resize", rerenderForViewport);
        window.removeEventListener("orientationchange", rerenderForViewport);
      };
    }, []);
    y$2(() => {
      const root = dialogRef.current?.getRootNode();
      if (!(root instanceof ShadowRoot)) return;
      root.getElementById("chatterbox-lite-portal-root")?.style.setProperty("--chatterbox-lite-dialog-width", `${width}px`);
    }, [width]);
    const startDrag = (e2) => {
      if (e2.button !== 0) return;
      if (isInteractiveTarget(e2.target)) return;
      const dragSurface = e2.target === e2.currentTarget || e2.target instanceof HTMLElement && e2.target.closest('[data-chatterbox-lite-drag-surface="true"]');
      if (!dragSurface) return;
      e2.preventDefault();
      const target = e2.currentTarget;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const rect = dialog.getBoundingClientRect();
      const startX = e2.clientX;
      const startY = e2.clientY;
      const startLeft = rect.left;
      const startTop = rect.top;
      const maxLeft = Math.max(DIALOG_EDGE_MARGIN, window.innerWidth - rect.width - DIALOG_EDGE_MARGIN);
      const maxTop = Math.max(
        DIALOG_EDGE_MARGIN,
        window.innerHeight - Math.min(rect.height, window.innerHeight) - DIALOG_EDGE_MARGIN
      );
      target.setPointerCapture(e2.pointerId);
      const previousCursor = document.body.style.cursor;
      const previousUserSelect = document.body.style.userSelect;
      document.body.style.cursor = "move";
      document.body.style.userSelect = "none";
      const onMove = (ev) => {
        dialogLeft.value = clamp(startLeft + ev.clientX - startX, DIALOG_EDGE_MARGIN, maxLeft);
        dialogTop.value = clamp(startTop + ev.clientY - startY, DIALOG_EDGE_MARGIN, maxTop);
      };
      const onEnd = (ev) => {
        target.releasePointerCapture(ev.pointerId);
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onEnd);
        target.removeEventListener("pointercancel", onEnd);
        document.body.style.cursor = previousCursor;
        document.body.style.userSelect = previousUserSelect;
      };
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onEnd);
      target.addEventListener("pointercancel", onEnd);
    };
    return u$2(
      "div",
      {
        ref: dialogRef,
        id: "chatterbox-lite-dialog",
        className: cn$1(
          "pointer-events-auto fixed z-2147483647",
          "max-h-[calc(100vh-112px)] overflow-y-auto",
          "rounded-xl border border-[color:var(--chatterbox-lite-acrylic-border)] border-b-[color:var(--chatterbox-lite-acrylic-border-bottom)] border-solid",
          "bg-acrylic-panel text-[13px] text-[var(--Ga10,#172033)] shadow-[var(--chatterbox-lite-acrylic-shadow)]",
          "backdrop-blur-xl backdrop-saturate-150",
          !visible && "hidden"
        ),
        style: { ...positionStyle, width: `${width}px`, "--chatterbox-lite-dialog-width": `${width}px` },
        children: [
u$2(ResizeHandle, {}),
u$2(
            "div",
            {
              class: "absolute top-0 right-3 left-3 z-10 h-3 cursor-move select-none",
              style: { touchAction: "none" },
              onPointerDown: startDrag,
              title: "拖动移动窗口"
            }
          ),
u$2("div", { class: "space-y-3 p-3", onPointerDown: startDrag, children: [
            showNormalSendPanel.value ? u$2(NormalSendTab, {}) : u$2("div", { class: "flex justify-end", children: u$2(SettingsPopoverButton, { side: "bottom" }) }),
            showReplacementPanel.value && u$2(ReplacementPanel, {}),
            showLogPanel.value && u$2(LogPanel, {})
          ] })
        ]
      }
    );
  }
  function ResizeHandle() {
    const onPointerDown = (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      const target = e2.currentTarget;
      const startX = e2.clientX;
      const startWidth = clampWidth(dialogWidth.value);
      target.setPointerCapture(e2.pointerId);
      const previousCursor = document.body.style.cursor;
      const previousUserSelect = document.body.style.userSelect;
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
      const onMove = (ev) => {
        const delta = startX - ev.clientX;
        dialogWidth.value = clampWidth(startWidth + delta);
      };
      const onEnd = (ev) => {
        target.releasePointerCapture(ev.pointerId);
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onEnd);
        target.removeEventListener("pointercancel", onEnd);
        document.body.style.cursor = previousCursor;
        document.body.style.userSelect = previousUserSelect;
      };
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onEnd);
      target.addEventListener("pointercancel", onEnd);
    };
    return u$2(
      "div",
      {
        class: cn$1(
          "absolute top-0 bottom-0 left-0 z-10 w-0.75 cursor-ew-resize select-none",
          "hover:bg-ga3 active:bg-ga4"
        ),
        "data-chatterbox-lite-no-drag": "true",
        style: { touchAction: "none" },
        onPointerDown,
        title: "拖动以调整面板宽度"
      }
    );
  }
  function AudioOnlyButton() {
    const active = audioOnlyEnabled.value;
    const toggle = () => {
      audioOnlyEnabled.value = !audioOnlyEnabled.value;
    };
    return u$2(
      Button,
      {
        type: "button",
        id: "chatterbox-lite-audio-only-toggle",
        variant: "secondary",
        onClick: toggle,
        title: active ? "点击恢复视频流" : "点击切换为仅音频模式（节省 ~90% 带宽）",
        className: cn$1(
          "px-2 py-1 text-white",
          "active:scale-[0.96]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
          "[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3",


active ? "border-[#FF6699] bg-[#FF6699]" : "border-ga6 bg-ga6"
        ),
        children: active ? "恢复视频" : "仅音频"
      }
    );
  }
  function ToggleButton() {
    return u$2("div", { class: "pointer-events-auto fixed right-2 bottom-3 z-2147483647 flex items-center gap-1", children: [
      showAudioOnlyButton.value && u$2(AudioOnlyButton, {}),
u$2(
        Button,
        {
          type: "button",
          id: "chatterbox-lite-toggle",
          variant: "secondary",
          onClick: () => {
            dialogOpen.value = !dialogOpen.value;
          },
          className: cn$1(
            "px-2 py-1 text-white",
            "active:scale-[0.96]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
            "[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:px-3",
            dialogOpen.value ? "border-brand bg-brand" : "border-ga6 bg-ga6"
          ),
          children: "弹幕助手"
        }
      )
    ] });
  }
  function App() {
    y$2(() => {
      setRuntimeAdapter(userscriptRuntime);
      void (async () => {
        try {
          const roomId = await ensureRoomId();
          try {
            await ensureRemoteKeywordsSynced();
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            appendLog(`⚠️ 云端词库同步失败，将使用本地词库：${msg}`);
          }
          await fetchEmoticons(roomId);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          appendLog(`❌ 初始化失败：${msg}`);
        }
      })();
      const desktopBridgeAgent = startDesktopBridgeAgent();
      startAudioOnly();
      startAutoSeek();
      startDanmakuDirect();
      return () => {
        desktopBridgeAgent.stop();
        stopAudioOnly();
        stopAutoSeek();
        stopDanmakuDirect();
      };
    }, []);
    return u$2(S$1, { children: [
u$2(ToggleButton, {}),
u$2(Configurator, {})
    ] });
  }
  function mount() {
    const host = document.createElement("div");
    host.id = "chatterbox-lite-host";
    Object.assign(host.style, {
      position: "fixed",
      inset: "0",
      zIndex: "2147483647",
      pointerEvents: "none"
    });
    const root = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = css;
    root.appendChild(style);
    const app = document.createElement("div");
    root.appendChild(app);
    const portalRoot = document.createElement("div");
    portalRoot.id = "chatterbox-lite-portal-root";
    root.appendChild(portalRoot);
    document.body.appendChild(host);
    R( u$2(App, {}), app);
  }
  if (isBilibiliLiveRoomPage(window.location.href, window.self === window.top)) {
    if (typeof GM_registerMenuCommand === "function") {
      GM_registerMenuCommand("Open Chatterbox Lite", () => {
        dialogOpen.value = true;
      });
    }
    if (document.body) {
      mount();
    } else {
      const observer2 = new MutationObserver(() => {
        if (!document.body) return;
        observer2.disconnect();
        mount();
      });
      observer2.observe(document.documentElement, { childList: true });
    }
  }

})();