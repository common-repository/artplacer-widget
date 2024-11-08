(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.tippy = t()
})(this, function() {
    'use strict';

    function t(e) {
        return '[object Object]' === {}.toString.call(e)
    }

    function o(e) {
        return [].slice.call(e)
    }

    function n(e) {
        if (e instanceof Element || t(e)) return [e];
        if (e instanceof NodeList) return o(e);
        if (Array.isArray(e)) return e;
        try {
            return o(document.querySelectorAll(e))
        } catch (e) {
            return []
        }
    }

    function r(e) {
        e.refObj = !0, e.attributes = e.attributes || {}, e.setAttribute = function(t, o) {
            e.attributes[t] = o
        }, e.getAttribute = function(t) {
            return e.attributes[t]
        }, e.removeAttribute = function(t) {
            delete e.attributes[t]
        }, e.addEventListener = function() {}, e.removeEventListener = function() {}, e.classList = {
            classNames: {},
            add: function(t) {
                return e.classList.classNames[t] = !0
            },
            remove: function(t) {
                return delete e.classList.classNames[t], !0
            },
            contains: function(t) {
                return !!e.classList.classNames[t]
            }
        }
    }

    function a(e) {
        for (var t = ['', 'webkit'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n],
                r = i ? i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r
        }
        return null
    }

    function s(e, t, o) {
        var i = document.createElement('div');
        i.setAttribute('class', 'tippy-popper'), i.setAttribute('role', 'tooltip'), i.setAttribute('id', 'tippy-' + e), i.style.zIndex = o.zIndex, i.style.maxWidth = o.maxWidth;
        var n = document.createElement('div');
        if (n.setAttribute('class', 'tippy-tooltip'), n.setAttribute('data-size', o.size), n.setAttribute('data-animation', o.animation), n.setAttribute('data-state', 'hidden'), o.theme.split(' ').forEach(function(e) {
            n.classList.add(e + '-theme')
        }), o.arrow) {
            var r = document.createElement('div');
            r.style[a('transform')] = o.arrowTransform, 'round' === o.arrowType ? (r.classList.add('tippy-roundarrow'), r.innerHTML = '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>') : r.classList.add('tippy-arrow'), n.appendChild(r)
        }
        if (o.animateFill) {
            n.setAttribute('data-animatefill', '');
            var s = document.createElement('div');
            s.setAttribute('data-state', 'hidden'), s.classList.add('tippy-backdrop'), n.appendChild(s)
        }
        o.inertia && n.setAttribute('data-inertia', ''), o.interactive && n.setAttribute('data-interactive', '');
        var p = document.createElement('div');
        p.setAttribute('class', 'tippy-content');
        var l = o.html;
        if (l) {
            var d;
            l instanceof Element ? (p.appendChild(l), d = '#' + l.id || 'tippy-html-template') : (p.innerHTML = document.querySelector(l).innerHTML, d = l), i.setAttribute('data-html', ''), n.setAttribute('data-template-id', d), o.interactive && i.setAttribute('tabindex', '-1')
        } else p[o.allowTitleHTML ? 'innerHTML' : 'textContent'] = t;
        return n.appendChild(p), i.appendChild(n), i
    }

    function p(e, t, o, i) {
        var n = o.onTrigger,
            r = o.onMouseLeave,
            a = o.onBlur,
            s = o.onDelegateShow,
            p = o.onDelegateHide,
            l = [];
        if ('manual' === e) return l;
        var d = function(e, o) {
            t.addEventListener(e, o), l.push({
                event: e,
                handler: o
            })
        };
        return i.target ? (ze.supportsTouch && i.touchHold && (d('touchstart', s), d('touchend', p)), 'mouseenter' === e && (d('mouseover', s), d('mouseout', p)), 'focus' === e && (d('focusin', s), d('focusout', p)), 'click' === e && d('click', s)) : (d(e, n), ze.supportsTouch && i.touchHold && (d('touchstart', n), d('touchend', r)), 'mouseenter' === e && d('mouseleave', r), 'focus' === e && d(qe ? 'focusout' : 'blur', a)), l
    }

    function l(e, t) {
        var o = Ke.reduce(function(o, i) {
            var n = e.getAttribute('data-tippy-' + i.toLowerCase()) || t[i];
            return 'false' === n && (n = !1), 'true' === n && (n = !0), isFinite(n) && !isNaN(parseFloat(n)) && (n = parseFloat(n)), 'target' !== i && 'string' == typeof n && '[' === n.trim().charAt(0) && (n = JSON.parse(n)), o[i] = n, o
        }, {});
        return Qe({}, t, o)
    }

    function d(e, t) {
        return t.arrow && (t.animateFill = !1), t.appendTo && 'function' == typeof t.appendTo && (t.appendTo = t.appendTo()), 'function' == typeof t.html && (t.html = t.html(e)), t
    }

    function c(e) {
        var t = function(t) {
            return e.querySelector(t)
        };
        return {
            tooltip: t(je.TOOLTIP),
            backdrop: t(je.BACKDROP),
            content: t(je.CONTENT),
            arrow: t(je.ARROW) || t(je.ROUND_ARROW)
        }
    }

    function f(e) {
        var t = e.getAttribute('title');
        t && e.setAttribute('data-original-title', t), e.removeAttribute('title')
    }

    function m(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function u(e, t) {
        if (1 !== e.nodeType) return [];
        var o = getComputedStyle(e, null);
        return t ? o[t] : o
    }

    function h(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function g(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var t = u(e),
            o = t.overflow,
            i = t.overflowX,
            n = t.overflowY;
        return /(auto|scroll|overlay)/.test(o + n + i) ? e : g(h(e))
    }

    function b(e) {
        return 11 === e ? ot : 10 === e ? it : ot || it
    }

    function v(e) {
        if (!e) return document.documentElement;
        for (var t = b(10) ? document.body : null, o = e.offsetParent; o === t && e.nextElementSibling;) o = (e = e.nextElementSibling).offsetParent;
        var i = o && o.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === u(o, 'position') ? v(o) : o : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function y(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || v(e.firstElementChild) === e)
    }

    function w(e) {
        return null === e.parentNode ? e : w(e.parentNode)
    }

    function E(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = o ? e : t,
            n = o ? t : e,
            r = document.createRange();
        r.setStart(i, 0), r.setEnd(n, 0);
        var a = r.commonAncestorContainer;
        if (e !== a && t !== a || i.contains(n)) return y(a) ? a : v(a);
        var s = w(e);
        return s.host ? E(s.host, t) : E(e, w(t).host)
    }

    function T(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            i = e.nodeName;
        if ('BODY' === i || 'HTML' === i) {
            var n = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || n;
            return r[o]
        }
        return e[o]
    }

    function L(e, t) {
        var o = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2],
            i = T(t, 'top'),
            n = T(t, 'left'),
            r = o ? -1 : 1;
        return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e
    }

    function O(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            i = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + i + 'Width'], 10)
    }

    function x(e, t, o, i) {
        return Fe(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], b(10) ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0)
    }

    function A() {
        var e = document.body,
            t = document.documentElement,
            o = b(10) && getComputedStyle(t);
        return {
            height: x('Height', e, t, o),
            width: x('Width', e, t, o)
        }
    }

    function k(e) {
        return st({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function C(e) {
        var t = {};
        try {
            if (b(10)) {
                t = e.getBoundingClientRect();
                var o = T(e, 'top'),
                    i = T(e, 'left');
                t.top += o, t.left += i, t.bottom += o, t.right += i
            } else t = e.getBoundingClientRect()
        } catch (t) {}
        var n = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            },
            r = 'HTML' === e.nodeName ? A() : {},
            a = r.width || e.clientWidth || n.right - n.left,
            s = r.height || e.clientHeight || n.bottom - n.top,
            p = e.offsetWidth - a,
            l = e.offsetHeight - s;
        if (p || l) {
            var d = u(e);
            p -= O(d, 'x'), l -= O(d, 'y'), n.width -= p, n.height -= l
        }
        return k(n)
    }

    function S(e, t) {
        var o = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2],
            i = b(10),
            n = 'HTML' === t.nodeName,
            r = C(e),
            a = C(t),
            s = g(e),
            p = u(t),
            l = parseFloat(p.borderTopWidth, 10),
            d = parseFloat(p.borderLeftWidth, 10);
        o && 'HTML' === t.nodeName && (a.top = Fe(a.top, 0), a.left = Fe(a.left, 0));
        var c = k({
            top: r.top - a.top - l,
            left: r.left - a.left - d,
            width: r.width,
            height: r.height
        });
        if (c.marginTop = 0, c.marginLeft = 0, !i && n) {
            var f = parseFloat(p.marginTop, 10),
                m = parseFloat(p.marginLeft, 10);
            c.top -= l - f, c.bottom -= l - f, c.left -= d - m, c.right -= d - m, c.marginTop = f, c.marginLeft = m
        }
        return (i && !o ? t.contains(s) : t === s && 'BODY' !== s.nodeName) && (c = L(c, t)), c
    }

    function P(e) {
        var t = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1],
            o = e.ownerDocument.documentElement,
            i = S(e, o),
            n = Fe(o.clientWidth, window.innerWidth || 0),
            r = Fe(o.clientHeight, window.innerHeight || 0),
            a = t ? 0 : T(o),
            s = t ? 0 : T(o, 'left'),
            p = {
                top: a - i.top + i.marginTop,
                left: s - i.left + i.marginLeft,
                width: n,
                height: r
            };
        return k(p)
    }

    function I(e) {
        var t = e.nodeName;
        return 'BODY' !== t && 'HTML' !== t && ('fixed' === u(e, 'position') || I(h(e)))
    }

    function D(e) {
        if (!e || !e.parentElement || b()) return document.documentElement;
        for (var t = e.parentElement; t && 'none' === u(t, 'transform');) t = t.parentElement;
        return t || document.documentElement
    }

    function R(e, t, o, i) {
        var n = !!(4 < arguments.length && void 0 !== arguments[4]) && arguments[4],
            r = {
                top: 0,
                left: 0
            },
            a = n ? D(e) : E(e, t);
        if ('viewport' === i) r = P(a, n);
        else {
            var s;
            'scrollParent' === i ? (s = g(h(t)), 'BODY' === s.nodeName && (s = e.ownerDocument.documentElement)) : 'window' === i ? s = e.ownerDocument.documentElement : s = i;
            var p = S(s, a, n);
            if ('HTML' === s.nodeName && !I(a)) {
                var l = A(),
                    d = l.height,
                    c = l.width;
                r.top += p.top - p.marginTop, r.bottom = d + p.top, r.left += p.left - p.marginLeft, r.right = c + p.left
            } else r = p
        }
        return r.left += o, r.top += o, r.right -= o, r.bottom -= o, r
    }

    function _(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function H(e, t, o, i, n) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var a = R(o, i, r, n),
            s = {
                top: {
                    width: a.width,
                    height: t.top - a.top
                },
                right: {
                    width: a.right - t.right,
                    height: a.height
                },
                bottom: {
                    width: a.width,
                    height: a.bottom - t.bottom
                },
                left: {
                    width: t.left - a.left,
                    height: a.height
                }
            },
            p = Object.keys(s).map(function(e) {
                return st({
                    key: e
                }, s[e], {
                    area: _(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            l = p.filter(function(e) {
                var t = e.width,
                    i = e.height;
                return t >= o.clientWidth && i >= o.clientHeight
            }),
            d = 0 < l.length ? l[0].key : p[0].key,
            c = e.split('-')[1];
        return d + (c ? '-' + c : '')
    }

    function N(e, t, o) {
        var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            n = i ? D(t) : E(t, o);
        return S(o, n, i)
    }

    function M(e) {
        var t = getComputedStyle(e),
            o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            n = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + o
            };
        return n
    }

    function W(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function B(e, t, o) {
        o = o.split('-')[0];
        var i = M(e),
            n = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            a = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            p = r ? 'height' : 'width',
            l = r ? 'width' : 'height';
        return n[a] = t[a] + t[p] / 2 - i[p] / 2, n[s] = o === s ? t[s] - i[l] : t[W(s)], n
    }

    function U(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function F(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o
        });
        var i = U(e, function(e) {
            return e[t] === o
        });
        return e.indexOf(i)
    }

    function Y(e, t, o) {
        var i = void 0 === o ? e : e.slice(0, F(e, 'name', o));
        return i.forEach(function(e) {
            e['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var o = e['function'] || e.fn;
            e.enabled && m(o) && (t.offsets.popper = k(t.offsets.popper), t.offsets.reference = k(t.offsets.reference), t = o(t, e))
        }), t
    }

    function q(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r
        }
        return null
    }

    function z() {
        if (!this.state.isDestroyed) {
            var e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                },
                t = this.popper.style;
            t.top = '', t.left = '', t[q('transform')] = '', e.offsets.reference = N(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = H(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = B(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = Y(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function j(e, t) {
        return e.some(function(e) {
            var o = e.name,
                i = e.enabled;
            return i && o === t
        })
    }

    function X() {
        return this.state.isDestroyed = !0, j(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[q('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function K(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function V(e, t, o, i) {
        var n = 'BODY' === e.nodeName,
            r = n ? e.ownerDocument.defaultView : e;
        r.addEventListener(t, o, {
            passive: !0
        }), n || V(g(r.parentNode), t, o, i), i.push(r)
    }

    function G(e, t, o, i) {
        o.updateBound = i, K(e).addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var n = g(e);
        return V(n, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = n, o.eventsEnabled = !0, o
    }

    function Q() {
        this.state.eventsEnabled || (this.state = G(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function Z(e, t) {
        return K(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function $() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = Z(this.reference, this.state))
    }

    function J(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function ee(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && J(t[o]) && (i = 'px'), e.style[o] = t[o] + i
        })
    }

    function te(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = t[o];
            !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function oe(e, t, o) {
        var i = U(e, function(e) {
                var o = e.name;
                return o === t
            }),
            n = !!i && e.some(function(e) {
                return e.name === o && e.enabled && e.order < i.order
            });
        if (!n) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return n
    }

    function ie(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function ne(e) {
        var t = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1],
            o = lt.indexOf(e),
            i = lt.slice(o + 1).concat(lt.slice(0, o));
        return t ? i.reverse() : i
    }

    function re(e, t, o, i) {
        var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +n[1],
            a = n[2];
        if (!r) return e;
        if (0 === a.indexOf('%')) {
            var s;
            switch (a) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = i;
            }
            var p = k(s);
            return p[t] / 100 * r
        }
        if ('vh' === a || 'vw' === a) {
            var l;
            return l = 'vh' === a ? Fe(document.documentElement.clientHeight, window.innerHeight || 0) : Fe(document.documentElement.clientWidth, window.innerWidth || 0), l / 100 * r
        }
        return r
    }

    function ae(e, t, o, i) {
        var n = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(i),
            a = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = a.indexOf(U(a, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        a[s] && -1 === a[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var p = /\s*,\s*|\s+/,
            l = -1 === s ? [a] : [a.slice(0, s).concat([a[s].split(p)[0]]), [a[s].split(p)[1]].concat(a.slice(s + 1))];
        return l = l.map(function(e, i) {
            var n = (1 === i ? !r : r) ? 'height' : 'width',
                s = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return re(e, n, t, o)
            })
        }), l.forEach(function(e, t) {
            e.forEach(function(o, i) {
                J(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1))
            })
        }), n
    }

    function se(e, t) {
        var o, i = t.offset,
            n = e.placement,
            r = e.offsets,
            a = r.popper,
            s = r.reference,
            p = n.split('-')[0];
        return o = J(+i) ? [+i, 0] : ae(i, a, s, p), 'left' === p ? (a.top += o[0], a.left -= o[1]) : 'right' === p ? (a.top += o[0], a.left += o[1]) : 'top' === p ? (a.left += o[0], a.top -= o[1]) : 'bottom' === p && (a.left += o[0], a.top += o[1]), e.popper = a, e
    }

    function pe(e) {
        void e.offsetHeight
    }

    function le(e, t, o) {
        var i = e.popper,
            n = e.options,
            r = n.onCreate,
            a = n.onUpdate;
        n.onCreate = n.onUpdate = function() {
            pe(i), t && t(), a(), n.onCreate = r, n.onUpdate = a
        }, o || e.scheduleUpdate()
    }

    function de(e) {
        return e.getAttribute('x-placement').replace(/-.+/, '')
    }

    function ce(e, t, o) {
        if (!t.getAttribute('x-placement')) return !0;
        var i = e.clientX,
            n = e.clientY,
            r = o.interactiveBorder,
            a = o.distance,
            s = t.getBoundingClientRect(),
            p = de(t),
            l = r + a,
            d = {
                top: s.top - n > r,
                bottom: n - s.bottom > r,
                left: s.left - i > r,
                right: i - s.right > r
            };
        return 'top' === p ? d.top = s.top - n > l : 'bottom' === p ? d.bottom = n - s.bottom > l : 'left' === p ? d.left = s.left - i > l : 'right' === p ? d.right = i - s.right > l : void 0, d.top || d.bottom || d.left || d.right
    }

    function fe(e, t, o, i) {
        if (!t.length) return '';
        var n = {
            scale: function() {
                return 1 === t.length ? '' + t[0] : o ? t[0] + ', ' + t[1] : t[1] + ', ' + t[0]
            }(),
            translate: function() {
                return 1 === t.length ? i ? -t[0] + 'px' : t[0] + 'px' : o ? i ? t[0] + 'px, ' + -t[1] + 'px' : t[0] + 'px, ' + t[1] + 'px' : i ? -t[1] + 'px, ' + t[0] + 'px' : t[1] + 'px, ' + t[0] + 'px'
            }()
        };
        return n[e]
    }

    function me(e, t) {
        if (!e) return '';
        return t ? e : {
            X: 'Y',
            Y: 'X'
        } [e]
    }

    function ue(e, t, o) {
        var i = de(e),
            n = 'top' === i || 'bottom' === i,
            r = 'right' === i || 'bottom' === i,
            s = function(e) {
                var t = o.match(e);
                return t ? t[1] : ''
            },
            p = function(e) {
                var t = o.match(e);
                return t ? t[1].split(',').map(parseFloat) : []
            },
            l = {
                translate: /translateX?Y?\(([^)]+)\)/,
                scale: /scaleX?Y?\(([^)]+)\)/
            },
            d = {
                translate: {
                    axis: s(/translate([XY])/),
                    numbers: p(l.translate)
                },
                scale: {
                    axis: s(/scale([XY])/),
                    numbers: p(l.scale)
                }
            },
            c = o.replace(l.translate, 'translate' + me(d.translate.axis, n) + '(' + fe('translate', d.translate.numbers, n, r) + ')').replace(l.scale, 'scale' + me(d.scale.axis, n) + '(' + fe('scale', d.scale.numbers, n, r) + ')');
        t.style[a('transform')] = c
    }

    function he(e) {
        return -(e - Xe.distance) + 'px'
    }

    function ge(e) {
        requestAnimationFrame(function() {
            setTimeout(e, 1)
        })
    }

    function be(t, o) {
        var i = Element.prototype.closest || function(t) {
            for (var o = this; o;) {
                if (e.call(o, t)) return o;
                o = o.parentElement
            }
        };
        return i.call(t, o)
    }

    function ye(e, t) {
        return Array.isArray(e) ? e[t] : e
    }

    function ve(e, t) {
        e.forEach(function(e) {
            e && e.setAttribute('data-state', t)
        })
    }

    function we(e, t) {
        e.filter(Boolean).forEach(function(e) {
            e.style[a('transitionDuration')] = t + 'ms'
        })
    }

    function Ee(e) {
        var t = window.scrollX || window.pageXOffset,
            o = window.scrollY || window.pageYOffset;
        e.focus(), scroll(t, o)
    }

    function Te() {
        var e = this._(ut).lastTriggerEvent;
        return this.options.followCursor && !ze.usingTouch && e && 'focus' !== e.type
    }

    function Le(e) {
        var t = be(e.target, this.options.target);
        if (t && !t._tippy) {
            var o = t.getAttribute('title') || this.title;
            o && (t.setAttribute('title', o), Me(t, Qe({}, this.options, {
                target: null
            })), Oe.call(t._tippy, e))
        }
    }

    function Oe(e) {
        var t = this,
            o = this.options;
        if (Se.call(this), !this.state.visible) {
            if (o.target) return void Le.call(this, e);
            if (this._(ut).isPreparingToShow = !0, o.wait) return void o.wait.call(this.popper, this.show.bind(this), e);
            if (Te.call(this)) {
                this._(ut).followCursorListener || Pe.call(this);
                var i = c(this.popper),
                    n = i.arrow;
                n && (n.style.margin = '0'), document.addEventListener('mousemove', this._(ut).followCursorListener)
            }
            var r = ye(o.delay, 0);
            r ? this._(ut).showTimeout = setTimeout(function() {
                t.show()
            }, r) : this.show()
        }
    }

    function xe() {
        var e = this;
        if (Se.call(this), !!this.state.visible) {
            this._(ut).isPreparingToShow = !1;
            var t = ye(this.options.delay, 1);
            t ? this._(ut).hideTimeout = setTimeout(function() {
                e.state.visible && e.hide()
            }, t) : this.hide()
        }
    }

    function Ae() {
        var e = this;
        return {
            onTrigger: function(t) {
                if (e.state.enabled) {
                    var o = ze.supportsTouch && ze.usingTouch && -1 < ['mouseenter', 'mouseover', 'focus'].indexOf(t.type);
                    o && e.options.touchHold || (e._(ut).lastTriggerEvent = t, 'click' === t.type && 'persistent' !== e.options.hideOnClick && e.state.visible ? xe.call(e) : Oe.call(e, t), o && ze.iOS && e.reference.click && e.reference.click())
                }
            },
            onMouseLeave: function(t) {
                if (!(-1 < ['mouseleave', 'mouseout'].indexOf(t.type) && ze.supportsTouch && ze.usingTouch && e.options.touchHold)) {
                    if (e.options.interactive) {
                        var o = xe.bind(e),
                            i = function t(i) {
                                var n = be(i.target, je.REFERENCE),
                                    r = be(i.target, je.POPPER) === e.popper,
                                    a = n === e.reference;
                                r || a || ce(i, e.popper, e.options) && (document.body.removeEventListener('mouseleave', o), document.removeEventListener('mousemove', t), xe.call(e, t))
                            };
                        return document.body.addEventListener('mouseleave', o), void document.addEventListener('mousemove', i)
                    }
                    xe.call(e)
                }
            },
            onBlur: function(t) {
                if (!(t.target !== e.reference || ze.usingTouch)) {
                    if (e.options.interactive) {
                        if (!t.relatedTarget) return;
                        if (be(t.relatedTarget, je.POPPER)) return
                    }
                    xe.call(e)
                }
            },
            onDelegateShow: function(t) {
                be(t.target, e.options.target) && Oe.call(e, t)
            },
            onDelegateHide: function(t) {
                be(t.target, e.options.target) && xe.call(e)
            }
        }
    }

    function ke() {
        var e = this,
            t = this.popper,
            o = this.reference,
            i = this.options,
            n = c(t),
            r = n.tooltip,
            a = i.popperOptions,
            s = 'round' === i.arrowType ? je.ROUND_ARROW : je.ARROW,
            p = r.querySelector(s),
            l = Qe({
                placement: i.placement
            }, a || {}, {
                modifiers: Qe({}, a ? a.modifiers : {}, {
                    arrow: Qe({
                        element: s
                    }, a && a.modifiers ? a.modifiers.arrow : {}),
                    flip: Qe({
                        enabled: i.flip,
                        padding: i.distance + 5,
                        behavior: i.flipBehavior
                    }, a && a.modifiers ? a.modifiers.flip : {}),
                    offset: Qe({
                        offset: i.offset
                    }, a && a.modifiers ? a.modifiers.offset : {})
                }),
                onCreate: function() {
                    r.style[de(t)] = he(i.distance), p && i.arrowTransform && ue(t, p, i.arrowTransform)
                },
                onUpdate: function() {
                    var e = r.style;
                    e.top = '', e.bottom = '', e.left = '', e.right = '', e[de(t)] = he(i.distance), p && i.arrowTransform && ue(t, p, i.arrowTransform)
                }
            });
        return De.call(this, {
            target: t,
            callback: function() {
                e.popperInstance.update()
            },
            options: {
                childList: !0,
                subtree: !0,
                characterData: !0
            }
        }), new ct(o, t, l)
    }

    function Ce(e) {
        var t = this.options;
        if (this.popperInstance ? (this.popperInstance.scheduleUpdate(), t.livePlacement && !Te.call(this) && this.popperInstance.enableEventListeners()) : (this.popperInstance = ke.call(this), !t.livePlacement && this.popperInstance.disableEventListeners()), !Te.call(this)) {
            var o = c(this.popper),
                i = o.arrow;
            i && (i.style.margin = ''), this.popperInstance.reference = this.reference
        }
        le(this.popperInstance, e, !0), t.appendTo.contains(this.popper) || t.appendTo.appendChild(this.popper)
    }

    function Se() {
        var e = this._(ut),
            t = e.showTimeout,
            o = e.hideTimeout;
        clearTimeout(t), clearTimeout(o)
    }

    function Pe() {
        var e = this;
        this._(ut).followCursorListener = function(t) {
            var o = e._(ut).lastMouseMoveEvent = t,
                i = o.clientX,
                n = o.clientY;
            e.popperInstance && (e.popperInstance.reference = {
                getBoundingClientRect: function() {
                    return {
                        width: 0,
                        height: 0,
                        top: n,
                        left: i,
                        right: i,
                        bottom: n
                    }
                },
                clientWidth: 0,
                clientHeight: 0
            }, e.popperInstance.scheduleUpdate())
        }
    }

    function Ie() {
        var e = this,
            t = function() {
                e.popper.style[a('transitionDuration')] = e.options.updateDuration + 'ms'
            },
            o = function() {
                e.popper.style[a('transitionDuration')] = ''
            };
        ge(function i() {
            e.popperInstance && e.popperInstance.scheduleUpdate(), t(), e.state.visible ? requestAnimationFrame(i) : o()
        })
    }

    function De(e) {
        var t = e.target,
            o = e.callback,
            i = e.options;
        if (window.MutationObserver) {
            var n = new MutationObserver(o);
            n.observe(t, i), this._(ut).mutationObservers.push(n)
        }
    }

    function Re(e, t) {
        if (!e) return t();
        var o = c(this.popper),
            i = o.tooltip,
            n = function(e, t) {
                t && i[e + 'EventListener']('ontransitionend' in window ? 'transitionend' : 'webkitTransitionEnd', t)
            },
            r = function o(r) {
                r.target === i && (n('remove', o), t())
            };
        n('remove', this._(ut).transitionendListener), n('add', r), this._(ut).transitionendListener = r
    }

    function _e(e, t) {
        return e.reduce(function(e, o) {
            var i = bt,
                n = d(o, t.performance ? t : l(o, t)),
                r = o.getAttribute('title');
            if (!r && !n.target && !n.html && !n.dynamicTitle) return e;
            o.setAttribute(n.target ? 'data-tippy-delegate' : 'data-tippy', ''), f(o);
            var a = s(i, r, n),
                m = new gt({
                    id: i,
                    reference: o,
                    popper: a,
                    options: n,
                    title: r,
                    popperInstance: null
                });
            n.createPopperInstanceOnInit && (m.popperInstance = ke.call(m), m.popperInstance.disableEventListeners());
            var u = Ae.call(m);
            return m.listeners = n.trigger.trim().split(' ').reduce(function(e, t) {
                return e.concat(p(t, o, u, n))
            }, []), n.dynamicTitle && De.call(m, {
                target: o,
                callback: function() {
                    var e = c(a),
                        t = e.content,
                        i = o.getAttribute('title');
                    i && (t[n.allowTitleHTML ? 'innerHTML' : 'textContent'] = m.title = i, f(o))
                },
                options: {
                    attributes: !0
                }
            }), o._tippy = m, a._tippy = m, a._reference = o, e.push(m), bt++, e
        }, [])
    }

    function He(e) {
        var t = o(document.querySelectorAll(je.POPPER));
        t.forEach(function(t) {
            var o = t._tippy;
            if (o) {
                var i = o.options;
                (!0 === i.hideOnClick || -1 < i.trigger.indexOf('focus')) && (!e || t !== e.popper) && o.hide()
            }
        })
    }

    function Ne() {
        var t = function() {
                ze.usingTouch || (ze.usingTouch = !0, ze.iOS && document.body.classList.add('tippy-touch'), ze.dynamicInputDetection && window.performance && document.addEventListener('mousemove', i), ze.onUserInputChange('touch'))
            },
            i = function() {
                var e;
                return function() {
                    var t = performance.now();
                    20 > t - e && (ze.usingTouch = !1, document.removeEventListener('mousemove', i), !ze.iOS && document.body.classList.remove('tippy-touch'), ze.onUserInputChange('mouse')), e = t
                }
            }();
        document.addEventListener('click', function(e) {
            if (!(e.target instanceof Element)) return He();
            var t = be(e.target, je.REFERENCE),
                o = be(e.target, je.POPPER);
            if (!(o && o._reference._tippy.options.interactive)) {
                if (t) {
                    var i = t._tippy.options;
                    if (!i.multiple && ze.usingTouch || !i.multiple && -1 < i.trigger.indexOf('click')) return He(t._tippy);
                    if (!0 !== i.hideOnClick || -1 < i.trigger.indexOf('click')) return
                }
                He()
            }
        }), document.addEventListener('touchstart', t), window.addEventListener('blur', function() {
            var t = document,
                o = t.activeElement;
            o && o.blur && e.call(o, je.REFERENCE) && o.blur()
        }), window.addEventListener('resize', function() {
            o(document.querySelectorAll(je.POPPER)).forEach(function(e) {
                var t = e._tippy;
                t.options.livePlacement || t.popperInstance.scheduleUpdate()
            })
        }), !ze.supportsTouch && (navigator.maxTouchPoints || navigator.msMaxTouchPoints) && document.addEventListener('pointerdown', t)
    }

    function Me(e, o) {
        return ze.supported && !yt && (Ne(), yt = !0), t(e) && r(e), o = Qe({}, Xe, o), {
            selector: e,
            options: o,
            tooltips: ze.supported ? _e(n(e), o) : [],
            destroyAll: function() {
                this.tooltips.forEach(function(e) {
                    return e.destroy()
                }), this.tooltips = []
            }
        }
    }
    var We = Math.min,
        Be = Math.round,
        Ue = Math.floor,
        Fe = Math.max,
        Ye = 'undefined' != typeof window,
        qe = Ye && /MSIE |Trident\//.test(navigator.userAgent),
        ze = {};
    Ye && (ze.supported = 'requestAnimationFrame' in window, ze.supportsTouch = 'ontouchstart' in window, ze.usingTouch = !1, ze.dynamicInputDetection = !0, ze.iOS = /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream, ze.onUserInputChange = function() {});
    for (var je = {
        POPPER: '.tippy-popper',
        TOOLTIP: '.tippy-tooltip',
        CONTENT: '.tippy-content',
        BACKDROP: '.tippy-backdrop',
        ARROW: '.tippy-arrow',
        ROUND_ARROW: '.tippy-roundarrow',
        REFERENCE: '[data-tippy]'
    }, Xe = {
        placement: 'top',
        livePlacement: !0,
        trigger: 'mouseenter focus',
        animation: 'shift-away',
        html: !1,
        animateFill: !0,
        arrow: !1,
        delay: 0,
        duration: [350, 300],
        interactive: !1,
        interactiveBorder: 2,
        theme: 'dark',
        size: 'regular',
        distance: 10,
        offset: 0,
        hideOnClick: !0,
        multiple: !1,
        followCursor: !1,
        inertia: !1,
        updateDuration: 350,
        sticky: !1,
        appendTo: function() {
            return document.body
        },
        zIndex: 9999,
        touchHold: !1,
        performance: !1,
        dynamicTitle: !1,
        flip: !0,
        flipBehavior: 'flip',
        arrowType: 'sharp',
        arrowTransform: '',
        maxWidth: '',
        target: null,
        allowTitleHTML: !0,
        popperOptions: {},
        createPopperInstanceOnInit: !1,
        onShow: function() {},
        onShown: function() {},
        onHide: function() {},
        onHidden: function() {}
    }, Ke = ze.supported && Object.keys(Xe), Ve = function(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
    }, Ge = function() {
        function e(e, t) {
            for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, ('value' in o) && (o.writable = !0), Object.defineProperty(e, o.key, o)
        }
        return function(t, o, i) {
            return o && e(t.prototype, o), i && e(t, i), t
        }
    }(), Qe = Object.assign || function(e) {
        for (var t, o = 1; o < arguments.length; o++)
            for (var i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
    }, Ze = 'undefined' != typeof window && 'undefined' != typeof document, $e = ['Edge', 'Trident', 'Firefox'], Je = 0, et = 0; et < $e.length; et += 1)
        if (Ze && 0 <= navigator.userAgent.indexOf($e[et])) {
            Je = 1;
            break
        } var i = Ze && window.Promise,
        tt = i ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, Je))
            }
        },
        ot = Ze && !!(window.MSInputMethodContext && document.documentMode),
        it = Ze && /MSIE 10/.test(navigator.userAgent),
        nt = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        rt = function() {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function(t, o, i) {
                return o && e(t.prototype, o), i && e(t, i), t
            }
        }(),
        at = function(e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        st = Object.assign || function(e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        pt = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        lt = pt.slice(3),
        dt = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        ct = function() {
            function e(t, o) {
                var i = this,
                    n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                nt(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = tt(this.update.bind(this)), this.options = st({}, e.Defaults, n), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = t && t.jquery ? t[0] : t, this.popper = o && o.jquery ? o[0] : o, this.options.modifiers = {}, Object.keys(st({}, e.Defaults.modifiers, n.modifiers)).forEach(function(t) {
                    i.options.modifiers[t] = st({}, e.Defaults.modifiers[t] || {}, n.modifiers ? n.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return st({
                        name: e
                    }, i.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && m(e.onLoad) && e.onLoad(i.reference, i.popper, i.options, e, i.state)
                }), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }
            return rt(e, [{
                key: 'update',
                value: function() {
                    return z.call(this)
                }
            }, {
                key: 'destroy',
                value: function() {
                    return X.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return Q.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return $.call(this)
                }
            }]), e
        }();
    ct.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ct.placements = pt, ct.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = t.split('-')[1];
                    if (i) {
                        var n = e.offsets,
                            r = n.reference,
                            a = n.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            p = s ? 'left' : 'top',
                            l = s ? 'width' : 'height',
                            d = {
                                start: at({}, p, r[p]),
                                end: at({}, p, r[p] + r[l] - a[l])
                            };
                        e.offsets.popper = st({}, a, d[i])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: se,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || v(e.instance.popper);
                    e.instance.reference === o && (o = v(o));
                    var i = R(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                    t.boundaries = i;
                    var n = t.priority,
                        r = e.offsets.popper,
                        a = {
                            primary: function(e) {
                                var o = r[e];
                                return r[e] < i[e] && !t.escapeWithReference && (o = Fe(r[e], i[e])), at({}, e, o)
                            },
                            secondary: function(e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = r[o];
                                return r[e] > i[e] && !t.escapeWithReference && (n = We(r[o], i[e] - ('right' === e ? r.width : r.height))), at({}, o, n)
                            }
                        };
                    return n.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        r = st({}, r, a[t](e))
                    }), e.offsets.popper = r, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        o = t.popper,
                        i = t.reference,
                        n = e.placement.split('-')[0],
                        r = Ue,
                        a = -1 !== ['top', 'bottom'].indexOf(n),
                        s = a ? 'right' : 'bottom',
                        p = a ? 'left' : 'top',
                        l = a ? 'width' : 'height';
                    return o[s] < r(i[p]) && (e.offsets.popper[p] = r(i[p]) - o[l]), o[p] > r(i[s]) && (e.offsets.popper[p] = r(i[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, t) {
                    var o;
                    if (!oe(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = t.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var n = e.placement.split('-')[0],
                        r = e.offsets,
                        a = r.popper,
                        s = r.reference,
                        p = -1 !== ['left', 'right'].indexOf(n),
                        l = p ? 'height' : 'width',
                        d = p ? 'Top' : 'Left',
                        c = d.toLowerCase(),
                        f = p ? 'left' : 'top',
                        m = p ? 'bottom' : 'right',
                        h = M(i)[l];
                    s[m] - h < a[c] && (e.offsets.popper[c] -= a[c] - (s[m] - h)), s[c] + h > a[m] && (e.offsets.popper[c] += s[c] + h - a[m]), e.offsets.popper = k(e.offsets.popper);
                    var g = s[c] + s[l] / 2 - h / 2,
                        b = u(e.instance.popper),
                        y = parseFloat(b['margin' + d], 10),
                        v = parseFloat(b['border' + d + 'Width'], 10),
                        w = g - e.offsets.popper[c] - y - v;
                    return w = Fe(We(a[l] - h, w), 0), e.arrowElement = i, e.offsets.arrow = (o = {}, at(o, c, Be(w)), at(o, f, ''), o), e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (j(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = R(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        i = e.placement.split('-')[0],
                        n = W(i),
                        r = e.placement.split('-')[1] || '',
                        a = [];
                    switch (t.behavior) {
                        case dt.FLIP:
                            a = [i, n];
                            break;
                        case dt.CLOCKWISE:
                            a = ne(i);
                            break;
                        case dt.COUNTERCLOCKWISE:
                            a = ne(i, !0);
                            break;
                        default:
                            a = t.behavior;
                    }
                    return a.forEach(function(s, p) {
                        if (i !== s || a.length === p + 1) return e;
                        i = e.placement.split('-')[0], n = W(i);
                        var l = e.offsets.popper,
                            d = e.offsets.reference,
                            c = Ue,
                            f = 'left' === i && c(l.right) > c(d.left) || 'right' === i && c(l.left) < c(d.right) || 'top' === i && c(l.bottom) > c(d.top) || 'bottom' === i && c(l.top) < c(d.bottom),
                            m = c(l.left) < c(o.left),
                            u = c(l.right) > c(o.right),
                            h = c(l.top) < c(o.top),
                            g = c(l.bottom) > c(o.bottom),
                            b = 'left' === i && m || 'right' === i && u || 'top' === i && h || 'bottom' === i && g,
                            y = -1 !== ['top', 'bottom'].indexOf(i),
                            v = !!t.flipVariations && (y && 'start' === r && m || y && 'end' === r && u || !y && 'start' === r && h || !y && 'end' === r && g);
                        (f || b || v) && (e.flipped = !0, (f || b) && (i = a[p + 1]), v && (r = ie(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = st({}, e.offsets.popper, B(e.instance.popper, e.offsets.reference, e.placement)), e = Y(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = e.offsets,
                        n = i.popper,
                        r = i.reference,
                        a = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return n[a ? 'left' : 'top'] = r[o] - (s ? n[a ? 'width' : 'height'] : 0), e.placement = W(t), e.offsets.popper = k(n), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!oe(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = U(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x,
                        i = t.y,
                        n = e.offsets.popper,
                        r = U(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var a, s, p = void 0 === r ? t.gpuAcceleration : r,
                        l = v(e.instance.popper),
                        d = C(l),
                        c = {
                            position: n.position
                        },
                        f = {
                            left: Ue(n.left),
                            top: Be(n.top),
                            bottom: Be(n.bottom),
                            right: Ue(n.right)
                        },
                        m = 'bottom' === o ? 'top' : 'bottom',
                        u = 'right' === i ? 'left' : 'right',
                        h = q('transform');
                    if (s = 'bottom' == m ? -d.height + f.bottom : f.top, a = 'right' == u ? -d.width + f.right : f.left, p && h) c[h] = 'translate3d(' + a + 'px, ' + s + 'px, 0)', c[m] = 0, c[u] = 0, c.willChange = 'transform';
                    else {
                        var g = 'bottom' == m ? -1 : 1,
                            b = 'right' == u ? -1 : 1;
                        c[m] = s * g, c[u] = a * b, c.willChange = m + ', ' + u
                    }
                    var y = {
                        "x-placement": e.placement
                    };
                    return e.attributes = st({}, y, e.attributes), e.styles = st({}, c, e.styles), e.arrowStyles = st({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return ee(e.instance.popper, e.styles), te(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && ee(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, o, i, n) {
                    var r = N(n, t, e, o.positionFixed),
                        a = H(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', a), ee(t, {
                        position: o.positionFixed ? 'fixed' : 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    };
    var ft = {};
    if (Ye) {
        var mt = Element.prototype;
        ft = mt.matches || mt.matchesSelector || mt.webkitMatchesSelector || mt.mozMatchesSelector || mt.msMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t.length; 0 <= --o && t.item(o) !== this;);
            return -1 < o
        }
    }
    var e = ft,
        ut = {},
        ht = function(e) {
            return function(t) {
                return t === ut && e
            }
        },
        gt = function() {
            function e(t) {
                for (var o in Ve(this, e), t) this[o] = t[o];
                this.state = {
                    destroyed: !1,
                    visible: !1,
                    enabled: !0
                }, this._ = ht({
                    mutationObservers: []
                })
            }
            return Ge(e, [{
                key: 'enable',
                value: function() {
                    this.state.enabled = !0
                }
            }, {
                key: 'disable',
                value: function() {
                    this.state.enabled = !1
                }
            }, {
                key: 'show',
                value: function(e) {
                    var t = this;
                    if (!this.state.destroyed && this.state.enabled) {
                        var o = this.popper,
                            i = this.reference,
                            n = this.options,
                            r = c(o),
                            s = r.tooltip,
                            p = r.backdrop,
                            l = r.content;
                        return n.dynamicTitle && !i.getAttribute('data-original-title') ? void 0 : i.refObj || document.documentElement.contains(i) ? void(n.onShow.call(o, this), e = ye(void 0 === e ? n.duration : e, 0), we([o, s, p], 0), o.style.visibility = 'visible', this.state.visible = !0, Ce.call(this, function() {
                            if (t.state.visible) {
                                if (Te.call(t) || t.popperInstance.scheduleUpdate(), Te.call(t)) {
                                    t.popperInstance.disableEventListeners();
                                    var r = ye(n.delay, 0),
                                        d = t._(ut).lastTriggerEvent;
                                    d && t._(ut).followCursorListener(r && t._(ut).lastMouseMoveEvent ? t._(ut).lastMouseMoveEvent : d)
                                }
                                we([s, p, p ? l : null], e), p && getComputedStyle(p)[a('transform')], n.interactive && i.classList.add('tippy-active'), n.sticky && Ie.call(t), ve([s, p], 'visible'), Re.call(t, e, function() {
                                    n.updateDuration || s.classList.add('tippy-notransition'), n.interactive && Ee(o), i.setAttribute('aria-describedby', 'tippy-' + t.id), n.onShown.call(o, t)
                                })
                            }
                        })) : void this.destroy()
                    }
                }
            }, {
                key: 'hide',
                value: function(e) {
                    var t = this;
                    if (!this.state.destroyed && this.state.enabled) {
                        var o = this.popper,
                            i = this.reference,
                            n = this.options,
                            r = c(o),
                            a = r.tooltip,
                            s = r.backdrop,
                            p = r.content;
                        n.onHide.call(o, this), e = ye(void 0 === e ? n.duration : e, 1), n.updateDuration || a.classList.remove('tippy-notransition'), n.interactive && i.classList.remove('tippy-active'), o.style.visibility = 'hidden', this.state.visible = !1, we([a, s, s ? p : null], e), ve([a, s], 'hidden'), n.interactive && -1 < n.trigger.indexOf('click') && Ee(i), ge(function() {
                            Re.call(t, e, function() {
                                t.state.visible || !n.appendTo.contains(o) || (!t._(ut).isPreparingToShow && (document.removeEventListener('mousemove', t._(ut).followCursorListener), t._(ut).lastMouseMoveEvent = null), i.removeAttribute('aria-describedby'), t.popperInstance.disableEventListeners(), n.appendTo.removeChild(o), n.onHidden.call(o, t))
                            })
                        })
                    }
                }
            }, {
                key: 'destroy',
                value: function() {
                    var e = this,
                        t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
                    if (!this.state.destroyed) {
                        this.state.visible && this.hide(0), this.listeners.forEach(function(t) {
                            e.reference.removeEventListener(t.event, t.handler)
                        }), this.title && this.reference.setAttribute('title', this.title), delete this.reference._tippy;
                        ['data-original-title', 'data-tippy', 'data-tippy-delegate'].forEach(function(t) {
                            e.reference.removeAttribute(t)
                        }), this.options.target && t && o(this.reference.querySelectorAll(this.options.target)).forEach(function(e) {
                            return e._tippy && e._tippy.destroy()
                        }), this.popperInstance && this.popperInstance.destroy(), this._(ut).mutationObservers.forEach(function(e) {
                            e.disconnect()
                        }), this.state.destroyed = !0
                    }
                }
            }]), e
        }(),
        bt = 1,
        yt = !1;
    return Me.version = '2.5.0', Me.browser = ze, Me.defaults = Xe, Me.one = function(e, t) {
        return Me(e, t).tooltips[0]
    }, Me.disableAnimations = function() {
        Xe.updateDuration = Xe.duration = 0, Xe.animateFill = !1
    }, Me
});