function bt() {
    return document.documentElement.classList.contains("theme-dark") ? "tv-pine-dark" : "tv-pine-light"
}
const Q = new Map;
function yt(e) {
    if (e.getAttribute("data-id"))
        return;
    const n = Math.round(Math.random() * 1e4).toString(36);
    e.setAttribute("data-id", n),
    Q.set(n, e.innerHTML)
}
function Et(e) {
    const t = e.getAttribute("data-id");
    if (!t) {
        yt(e);
        return
    }
    const n = Q.get(t);
    n && (e.innerHTML = n,
    e.classList.remove("colorized"))
}
function H() {
    const e = document.querySelectorAll(".pine-colorizer")
      , t = n=>{
        Et(n),
        window?.colorizePineCode?.(n, void 0, bt())
    }
    ;
    e.forEach(t)
}
document.addEventListener("theme-selected", H);
document.addEventListener("astro:after-swap", H);
document.addEventListener("astro:page-load", H);
var d = [];
for (var D = 0; D < 256; ++D)
    d.push((D + 256).toString(16).slice(1));
function St(e, t=0) {
    return (d[e[t + 0]] + d[e[t + 1]] + d[e[t + 2]] + d[e[t + 3]] + "-" + d[e[t + 4]] + d[e[t + 5]] + "-" + d[e[t + 6]] + d[e[t + 7]] + "-" + d[e[t + 8]] + d[e[t + 9]] + "-" + d[e[t + 10]] + d[e[t + 11]] + d[e[t + 12]] + d[e[t + 13]] + d[e[t + 14]] + d[e[t + 15]]).toLowerCase()
}
var E, Tt = new Uint8Array(16);
function At() {
    if (!E && (E = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto),
    !E))
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return E(Tt)
}
var Lt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const N = {
    randomUUID: Lt
};
function J(e, t, n) {
    if (N.randomUUID && !t && !e)
        return N.randomUUID();
    e = e || {};
    var o = e.random || (e.rng || At)();
    return o[6] = o[6] & 15 | 64,
    o[8] = o[8] & 63 | 128,
    St(o)
}
const kt = "https://snowplow-pixel.tradingview.com"
  , _t = "https://d28jaux3qtn4k4.cloudfront.net"
  , xt = {
    e: "pv",
    aid: "tradingview",
    p: "web"
};
function It() {
    const e = document.cookie;
    if (!e)
        throw new Error("no cookie found");
    const n = e.split(";").map(i=>{
        const [r,c] = i.split("=");
        return {
            key: r.trim(),
            value: c.trim()
        }
    }
    ).find(i=>i.key.startsWith("_sp_id."));
    if (!n)
        throw new Error("sp cookie not found");
    const o = n.value.split(".");
    return {
        sid: o[o.length - 1],
        duid: o[0]
    }
}
function Dt() {
    try {
        return It()
    } catch {
        return {}
    }
}
function Rt() {
    return {
        schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
        data: [{
            schema: "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
            data: {
                id: J()
            }
        }]
    }
}
function Pt(e) {
    return e.match(/^https:\/\/(\w+\.)?tradingview\.com/) !== null
}
function Mt(e) {
    return e.match(/^https:\/\/(beta|beta0)\.tradingview\.com/) !== null
}
function Ct() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch {
        return
    }
}
function Ht() {
    const e = Date.now().toString()
      , t = Date.now().toString()
      , n = btoa(JSON.stringify(Rt()))
      , o = J()
      , i = window.location.href
      , r = document.title
      , c = document.referrer
      , s = Ct();
    return {
        ...xt,
        ...Dt(),
        dtm: e,
        stm: t,
        cx: n,
        url: i,
        page: r,
        refr: c,
        tz: s,
        eid: o
    }
}
function Z() {
    if (!Pt(window.location.href))
        return;
    const e = Ht()
      , t = new window.URL("i",Mt(window.location.href) ? _t : kt);
    for (const [n,o] of Object.entries(e))
        t.searchParams.append(n, o);
    window.fetch(t.toString(), {
        method: "GET"
    })
}
document.addEventListener("astro:after-swap", ()=>{
    Z()
}
);
Z();
function tt() {
    document.querySelectorAll(".md-heading a[href]").forEach(t=>{
        if (qt(t)) {
            const n = Bt(t);
            n && (t.innerHTML = n)
        }
    }
    )
}
function qt(e) {
    const t = e.querySelector("span.icon-link")
      , n = e.textContent?.trim();
    return !!t && !!n && !e.innerHTML.includes('<span class="fancy-wrap">') && !e.innerHTML.includes("<code") && !e.innerHTML.includes("&lt;")
}
function Bt(e) {
    const t = e.querySelector("span.icon-link")
      , o = e.textContent.trim().split(" ");
    if (o.length > 0) {
        const i = o.pop();
        return `${o.join(" ")} <span class="fancy-wrap">${i}${t.outerHTML}</span>`
    }
    return null
}
document.addEventListener("astro:after-swap", ()=>{
    tt()
}
);
tt();
function Ot() {
    return "/pine-script-docs"
}
const Ut = {
    "/": ["welcome", "primer", "language", "concepts", "writing", "faq", "error-messages", "release-notes", "migration-guides", "where-can-i-get-more-information", "v3", "v4"],
    "/primer": ["first-steps", "first-indicator", "next-steps"],
    "/writing": ["style-guide", "debugging", "profiling-and-optimization", "publishing", "limitations"],
    "/language": ["execution-model", "time-series", "script-structure", "identifiers", "operators", "variable-declarations", "conditional-structures", "loops", "type-system", "built-ins", "user-defined-functions", "objects", "enums", "methods", "arrays", "matrices", "maps"],
    "/migration-guides": ["to-pine-version-5", "to-pine-version-4", "to-pine-version-3"],
    "/concepts": ["alerts", "backgrounds", "bar-coloring", "bar-plotting", "bar-states", "chart-information", "colors", "fills", "inputs", "levels", "libraries", "lines-and-boxes", "non-standard-charts-data", "other-timeframes-and-data", "plots", "repainting", "sessions", "strategies", "tables", "text-and-shapes", "time", "timeframes"]
}
  , $t = {
    "/v3": ["welcome", "quickstart-guide", "language", "essential", "annotations", "publishing-scripts", "public-library", "release-notes", "appendix", "where-can-i-get-more-information"],
    "/v3/language": ["structure-of-the-script", "versions", "comments", "identifiers", "lines-wrapping", "type-system", "literals", "operators", "functions-and-annotations", "expressions-declarations-and-statements", "declaring-functions"],
    "/v3/annotations": ["study-annotation", "plot-annotation", "script-inputs", "price-levels-hline", "filling-in-the-background-with-fill", "barcoloring-a-series-with-barcolor", "background-coloring-with-bgcolor", "plotting-shapes-chars-and-arrows", "custom-ohlc-bars-and-candles", "alert-conditions"],
    "/v3/appendix": ["pine-version-3-migration-guide", "howtos", "pine-compilation-errors", "pine-script-v2-preprocessor", "pine-script-v2-lexer-grammar", "pine-script-v2-parser-grammar"],
    "/v3/essential": ["context-switching-the-security-function", "bar-states-built-in-variables-barstate", "sessions-and-time-functions", "extended-and-regular-sessions", "non-standard-chart-types-data", "strategies", "indicator-repainting"]
}
  , Nt = {
    "/v4": ["welcome", "quickstart-guide", "language", "essential", "annotations", "debugging", "publishing-scripts", "public-library", "release-notes", "appendix", "where-can-i-get-more-information"],
    "/v4/language": ["structure-of-the-script", "versions", "execution-model", "comments", "identifiers", "line-wrapping", "type-system", "operators", "functions-and-annotations", "expressions-declarations-and-statements", "declaring-functions"],
    "/v4/annotations": ["study-annotation", "plot-annotation", "script-inputs", "price-levels-hline", "filling-in-the-background-with-fill", "barcoloring-a-series-with-barcolor", "background-coloring-with-bgcolor", "plotting-shapes-chars-and-arrows", "custom-ohlc-bars-and-candles"],
    "/v4/appendix": ["pine-version-3-migration-guide", "howtos", "pine-compilation-errors"],
    "/v4/essential": ["alerts", "arrays", "colors", "drawings", "tables", "context-switching-the-security-function", "bar-states-built-in-variables-barstate", "sessions-and-time-functions", "extended-and-regular-sessions", "non-standard-chart-types-data", "strategies", "indicator-repainting"]
}
  , Vt = {
    ...Ut,
    ...Nt,
    ...$t
}
  , Ft = (()=>{
    const e = new Set;
    return Object.entries(Vt).forEach(([t,n])=>{
        n.forEach(o=>{
            if (t === "/") {
                e.add("/" + o);
                return
            }
            e.add(`${t}/${o}`)
        }
        )
    }
    ),
    e
}
)()
  , jt = /^v[0-9]+$/m
  , Yt = /\/$/
  , Wt = "v5"
  , et = Ot().replace("/", "")
  , Xt = [et, "welcome"].join("/");
function V(e, t) {
    const n = e.split("/").filter(o=>o !== "" && !jt.test(o));
    return t !== Wt && n.splice(1, 0, t),
    n.join("/")
}
function Kt(e) {
    const t = e.target?.value ?? ""
      , n = window.location.pathname.replace(Yt, "");
    let o = V(n, t);
    const i = o.replace(et, "");
    Ft.has(i) || (o = V(Xt, t)),
    window.location.href = [window.location.origin, o].join("/")
}
function nt() {
    const e = document.querySelectorAll("#version-select select");
    e.forEach(t=>{
        const o = /\/(v[0-9]+)/.exec(window.location.pathname)?.[1] || "v5";
        t.querySelector("option[value*='" + o + "']")?.setAttribute("selected", "true"),
        t.value = o
    }
    ),
    e.forEach(t=>{
        t.addEventListener("change", Kt)
    }
    )
}
document.addEventListener("DOMContentLoaded", nt);
document.addEventListener("astro:page-load", nt);
const zt = 750
  , Gt = 126;
let S = !1
  , ot = []
  , it = [];
const Qt = ()=>{
    ot = Array.from(document.querySelectorAll("h1, h2, h3, h4")).filter(e=>e.id)
}
  , Jt = ()=>{
    it = Array.from(document.querySelectorAll("#toc a.document-toc-link"))
}
  , Zt = ()=>ot.map(e=>{
    const t = e.getBoundingClientRect();
    return {
        anchor: e.id,
        top: t.top - Gt
    }
}
)
  , te = ()=>{
    const e = Zt();
    let t;
    if (e.forEach(n=>{
        if (!t) {
            t = n;
            return
        }
        t.top > 0 ? n.top < t.top && (t = n) : n.top > t.top && n.top < 0 && (t = n)
    }
    ),
    t) {
        const n = `#${t.anchor}`;
        it.forEach(o=>{
            o.getAttribute("href") === n ? (o.setAttribute("aria-current", "true"),
            !S && window.location.hash !== n && history.replaceState({}, "", n)) : o.hasAttribute("aria-current") && o.removeAttribute("aria-current")
        }
        )
    }
}
;
let T;
const q = ()=>{
    T || (Qt(),
    Jt(),
    T = window.setInterval(()=>{
        document.visibilityState !== "hidden" && te()
    }
    , zt))
}
;
let R = !1;
function ee() {
    if (R)
        return;
    S = !0;
    const e = window.scrollY
      , t = ()=>{
        Math.abs(window.scrollY - e) > 50 && (S = !1,
        window.removeEventListener("scroll", t),
        R = !1)
    }
    ;
    window.addEventListener("scroll", t),
    R = !0
}
window.setTimeout(()=>{
    q()
}
, 500);
window.onload = ()=>{
    q()
}
;
document.addEventListener("astro:page-load", ()=>{
    clearInterval(T),
    T = void 0,
    q()
}
);
function ne(e) {
    const t = ()=>{
        const n = window.location.hash;
        e(n)
    }
    ;
    document.addEventListener("click", n=>{
        const o = n.target;
        if (o.tagName.toLowerCase() === "a") {
            const r = o.getAttribute("href");
            r && r.startsWith("#") && setTimeout(t, 0)
        }
    }
    ),
    window.addEventListener("hashchange", t),
    window.addEventListener("popstate", t),
    window.addEventListener("load", t)
}
ne(e=>{
    const t = e && document.getElementById(e.slice(1)) || e && document.querySelector(e) || document.querySelector("article");
    t && (S = !0,
    t.scrollIntoView(),
    setTimeout(()=>{
        ee()
    }
    , 1e3))
}
);
function oe(e) {
    if (!e || !(e instanceof HTMLImageElement))
        return !1;
    let t = e;
    for (; t; ) {
        if (t.classList && t.classList.contains("not-content"))
            return !1;
        if (t.classList && t.classList.contains("content"))
            return !0;
        t = t.parentElement
    }
    return !1
}
function ie(e) {
    const t = e.target;
    if (!oe(t))
        return;
    const {src: n} = t
      , o = document.querySelector("img#lightbox-image")
      , i = document.querySelector("#image-lightbox");
    !i || !o || (o.src = n,
    i.removeAttribute("hidden"))
}
function rt() {
    const e = document.querySelector("#image-lightbox");
    e && e.setAttribute("hidden", "true")
}
function re(e) {
    e.target instanceof HTMLImageElement || rt()
}
function se(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        const t = document.querySelector("#image-lightbox");
        t && t.setAttribute("hidden", "true")
    }
}
function st() {
    document.addEventListener("click", ie);
    const e = document.querySelector("#lightbox-close-button");
    e && e.addEventListener("click", rt);
    const t = document.querySelector("#image-lightbox");
    t && t.addEventListener("click", re),
    document.addEventListener("keydown", se)
}
document.addEventListener("astro:after-swap", st);
window.addEventListener("DOMContentLoaded", st);
function at() {
    const e = document.querySelector("#mobile-menu-back-button")
      , t = document.querySelector("[data-mobile-menu-backdrop]");
    function n() {
        const o = document.querySelector("mobile-menu-button");
        o && o.setExpanded(!1)
    }
    t && t.addEventListener("click", ()=>{
        n()
    }
    ),
    e && e.addEventListener("click", ()=>{
        n()
    }
    )
}
document.addEventListener("astro:page-load", ()=>{
    at()
}
);
at();
const v = "data-astro-transition-persist";
function ae(e) {
    for (const t of document.scripts)
        for (const n of e.scripts)
            if (!n.hasAttribute("data-astro-rerun") && (!t.src && t.textContent === n.textContent || t.src && t.type === n.type && t.src === n.src)) {
                n.dataset.astroExec = "";
                break
            }
}
function ce(e) {
    const t = document.documentElement
      , n = [...t.attributes].filter(({name: o})=>(t.removeAttribute(o),
    o.startsWith("data-astro-")));
    [...e.documentElement.attributes, ...n].forEach(({name: o, value: i})=>t.setAttribute(o, i))
}
function le(e) {
    for (const t of Array.from(document.head.children)) {
        const n = he(t, e);
        n ? n.remove() : t.remove()
    }
    document.head.append(...e.head.children)
}
function ue(e, t) {
    t.replaceWith(e);
    for (const n of t.querySelectorAll(`[${v}]`)) {
        const o = n.getAttribute(v)
          , i = e.querySelector(`[${v}="${o}"]`);
        i && (i.replaceWith(n),
        i.localName === "astro-island" && me(n) && (n.setAttribute("ssr", ""),
        n.setAttribute("props", i.getAttribute("props"))))
    }
}
const de = ()=>{
    const e = document.activeElement;
    if (e?.closest(`[${v}]`)) {
        if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) {
            const t = e.selectionStart
              , n = e.selectionEnd;
            return ()=>P({
                activeElement: e,
                start: t,
                end: n
            })
        }
        return ()=>P({
            activeElement: e
        })
    } else
        return ()=>P({
            activeElement: null
        })
}
  , P = ({activeElement: e, start: t, end: n})=>{
    e && (e.focus(),
    (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) && (typeof t == "number" && (e.selectionStart = t),
    typeof n == "number" && (e.selectionEnd = n)))
}
  , he = (e,t)=>{
    const n = e.getAttribute(v)
      , o = n && t.head.querySelector(`[${v}="${n}"]`);
    if (o)
        return o;
    if (e.matches("link[rel=stylesheet]")) {
        const i = e.getAttribute("href");
        return t.head.querySelector(`link[rel=stylesheet][href="${i}"]`)
    }
    return null
}
  , me = e=>{
    const t = e.dataset.astroTransitionPersistProps;
    return t == null || t === "false"
}
  , fe = e=>{
    ae(e),
    ce(e),
    le(e);
    const t = de();
    ue(e.body, document.body),
    t()
}
  , pe = "astro:before-preparation"
  , ge = "astro:after-preparation"
  , we = "astro:before-swap"
  , ve = "astro:after-swap"
  , be = e=>document.dispatchEvent(new Event(e));
class ct extends Event {
    from;
    to;
    direction;
    navigationType;
    sourceElement;
    info;
    newDocument;
    signal;
    constructor(t, n, o, i, r, c, s, l, h, u) {
        super(t, n),
        this.from = o,
        this.to = i,
        this.direction = r,
        this.navigationType = c,
        this.sourceElement = s,
        this.info = l,
        this.newDocument = h,
        this.signal = u,
        Object.defineProperties(this, {
            from: {
                enumerable: !0
            },
            to: {
                enumerable: !0,
                writable: !0
            },
            direction: {
                enumerable: !0,
                writable: !0
            },
            navigationType: {
                enumerable: !0
            },
            sourceElement: {
                enumerable: !0
            },
            info: {
                enumerable: !0
            },
            newDocument: {
                enumerable: !0,
                writable: !0
            },
            signal: {
                enumerable: !0
            }
        })
    }
}
class ye extends ct {
    formData;
    loader;
    constructor(t, n, o, i, r, c, s, l, h, u) {
        super(pe, {
            cancelable: !0
        }, t, n, o, i, r, c, s, l),
        this.formData = h,
        this.loader = u.bind(this, this),
        Object.defineProperties(this, {
            formData: {
                enumerable: !0
            },
            loader: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
class Ee extends ct {
    direction;
    viewTransition;
    swap;
    constructor(t, n) {
        super(we, void 0, t.from, t.to, t.direction, t.navigationType, t.sourceElement, t.info, t.newDocument, t.signal),
        this.direction = t.direction,
        this.viewTransition = n,
        this.swap = ()=>fe(this.newDocument),
        Object.defineProperties(this, {
            direction: {
                enumerable: !0
            },
            viewTransition: {
                enumerable: !0
            },
            swap: {
                enumerable: !0,
                writable: !0
            }
        })
    }
}
async function Se(e, t, n, o, i, r, c, s, l) {
    const h = new ye(e,t,n,o,i,r,window.document,c,s,l);
    return document.dispatchEvent(h) && (await h.loader(),
    h.defaultPrevented || (be(ge),
    h.navigationType !== "traverse" && B({
        scrollX,
        scrollY
    }))),
    h
}
function Te(e, t) {
    const n = new Ee(e,t);
    return document.dispatchEvent(n),
    n.swap(),
    n
}
const Ae = history.pushState.bind(history)
  , A = history.replaceState.bind(history)
  , B = e=>{
    history.state && (history.scrollRestoration = "manual",
    A({
        ...history.state,
        ...e
    }, ""))
}
  , O = !!document.startViewTransition
  , U = ()=>!!document.querySelector('[name="astro-view-transitions-enabled"]')
  , lt = (e,t)=>e.pathname === t.pathname && e.search === t.search;
let m, w, k;
const ut = e=>document.dispatchEvent(new Event(e))
  , dt = ()=>ut("astro:page-load")
  , Le = ()=>{
    let e = document.createElement("div");
    e.setAttribute("aria-live", "assertive"),
    e.setAttribute("aria-atomic", "true"),
    e.className = "astro-route-announcer",
    document.body.append(e),
    setTimeout(()=>{
        let t = document.title || document.querySelector("h1")?.textContent || location.pathname;
        e.textContent = t
    }
    , 60)
}
  , F = "data-astro-transition-persist"
  , j = "data-astro-transition"
  , M = "data-astro-transition-fallback";
let Y, b = 0;
history.state ? (b = history.state.index,
scrollTo({
    left: history.state.scrollX,
    top: history.state.scrollY
})) : U() && (A({
    index: b,
    scrollX,
    scrollY
}, ""),
history.scrollRestoration = "manual");
async function ke(e, t) {
    try {
        const n = await fetch(e, t)
          , i = (n.headers.get("content-type") ?? "").split(";", 1)[0].trim();
        return i !== "text/html" && i !== "application/xhtml+xml" ? null : {
            html: await n.text(),
            redirected: n.redirected ? n.url : void 0,
            mediaType: i
        }
    } catch {
        return null
    }
}
function ht() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}
function _e() {
    let e = Promise.resolve();
    for (const t of Array.from(document.scripts)) {
        if (t.dataset.astroExec === "")
            continue;
        const n = t.getAttribute("type");
        if (n && n !== "module" && n !== "text/javascript")
            continue;
        const o = document.createElement("script");
        o.innerHTML = t.innerHTML;
        for (const i of t.attributes) {
            if (i.name === "src") {
                const r = new Promise(c=>{
                    o.onload = o.onerror = c
                }
                );
                e = e.then(()=>r)
            }
            o.setAttribute(i.name, i.value)
        }
        o.dataset.astroExec = "",
        t.replaceWith(o)
    }
    return e
}
const mt = (e,t,n,o,i)=>{
    const r = lt(t, e)
      , c = document.title;
    document.title = o;
    let s = !1;
    if (e.href !== location.href && !i)
        if (n.history === "replace") {
            const l = history.state;
            A({
                ...n.state,
                index: l.index,
                scrollX: l.scrollX,
                scrollY: l.scrollY
            }, "", e.href)
        } else
            Ae({
                ...n.state,
                index: ++b,
                scrollX: 0,
                scrollY: 0
            }, "", e.href);
    if (document.title = c,
    k = e,
    r || (scrollTo({
        left: 0,
        top: 0,
        behavior: "instant"
    }),
    s = !0),
    i)
        scrollTo(i.scrollX, i.scrollY);
    else {
        if (e.hash) {
            history.scrollRestoration = "auto";
            const l = history.state;
            location.href = e.href,
            history.state || (A(l, ""),
            r && window.dispatchEvent(new PopStateEvent("popstate")))
        } else
            s || scrollTo({
                left: 0,
                top: 0,
                behavior: "instant"
            });
        history.scrollRestoration = "manual"
    }
}
;
function xe(e) {
    const t = [];
    for (const n of e.querySelectorAll("head link[rel=stylesheet]"))
        if (!document.querySelector(`[${F}="${n.getAttribute(F)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)) {
            const o = document.createElement("link");
            o.setAttribute("rel", "preload"),
            o.setAttribute("as", "style"),
            o.setAttribute("href", n.getAttribute("href")),
            t.push(new Promise(i=>{
                ["load", "error"].forEach(r=>o.addEventListener(r, i)),
                document.head.append(o)
            }
            ))
        }
    return t
}
async function W(e, t, n, o, i) {
    async function r(l) {
        function h(p) {
            const f = p.effect;
            return !f || !(f instanceof KeyframeEffect) || !f.target ? !1 : window.getComputedStyle(f.target, f.pseudoElement).animationIterationCount === "infinite"
        }
        const u = document.getAnimations();
        document.documentElement.setAttribute(M, l);
        const g = document.getAnimations().filter(p=>!u.includes(p) && !h(p));
        return Promise.allSettled(g.map(p=>p.finished))
    }
    if (i === "animate" && !n.transitionSkipped && !e.signal.aborted)
        try {
            await r("old")
        } catch {}
    const c = document.title
      , s = Te(e, n.viewTransition);
    mt(s.to, s.from, t, c, o),
    ut(ve),
    i === "animate" && (!n.transitionSkipped && !s.signal.aborted ? r("new").finally(()=>n.viewTransitionFinished()) : n.viewTransitionFinished())
}
function Ie() {
    return m?.controller.abort(),
    m = {
        controller: new AbortController
    }
}
async function ft(e, t, n, o, i) {
    const r = Ie();
    if (!U() || location.origin !== n.origin) {
        r === m && (m = void 0),
        location.href = n.href;
        return
    }
    const c = i ? "traverse" : o.history === "replace" ? "replace" : "push";
    if (c !== "traverse" && B({
        scrollX,
        scrollY
    }),
    lt(t, n) && (e !== "back" && n.hash || e === "back" && t.hash)) {
        mt(n, t, o, document.title, i),
        r === m && (m = void 0);
        return
    }
    const s = await Se(t, n, e, c, o.sourceElement, o.info, r.controller.signal, o.formData, l);
    if (s.defaultPrevented || s.signal.aborted) {
        r === m && (m = void 0),
        s.signal.aborted || (location.href = n.href);
        return
    }
    async function l(a) {
        const g = a.to.href
          , p = {
            signal: a.signal
        };
        if (a.formData) {
            p.method = "POST";
            const I = a.sourceElement instanceof HTMLFormElement ? a.sourceElement : a.sourceElement instanceof HTMLElement && "form"in a.sourceElement ? a.sourceElement.form : a.sourceElement?.closest("form");
            p.body = I?.attributes.getNamedItem("enctype")?.value === "application/x-www-form-urlencoded" ? new URLSearchParams(a.formData) : a.formData
        }
        const f = await ke(g, p);
        if (f === null) {
            a.preventDefault();
            return
        }
        if (f.redirected && (a.to = new URL(f.redirected)),
        Y ??= new DOMParser,
        a.newDocument = Y.parseFromString(f.html, f.mediaType),
        a.newDocument.querySelectorAll("noscript").forEach(I=>I.remove()),
        !a.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !a.formData) {
            a.preventDefault();
            return
        }
        const x = xe(a.newDocument);
        x.length && !a.signal.aborted && await Promise.all(x)
    }
    async function h() {
        if (w && w.viewTransition) {
            try {
                w.viewTransition.skipTransition()
            } catch {}
            try {
                await w.viewTransition.updateCallbackDone
            } catch {}
        }
        return w = {
            transitionSkipped: !1
        }
    }
    const u = await h();
    if (s.signal.aborted) {
        r === m && (m = void 0);
        return
    }
    if (document.documentElement.setAttribute(j, s.direction),
    O)
        u.viewTransition = document.startViewTransition(async()=>await W(s, o, u, i));
    else {
        const a = (async()=>{
            await Promise.resolve(),
            await W(s, o, u, i, ht())
        }
        )();
        u.viewTransition = {
            updateCallbackDone: a,
            ready: a,
            finished: new Promise(g=>u.viewTransitionFinished = g),
            skipTransition: ()=>{
                u.transitionSkipped = !0,
                document.documentElement.removeAttribute(M)
            }
        }
    }
    u.viewTransition.updateCallbackDone.finally(async()=>{
        await _e(),
        dt(),
        Le()
    }
    ),
    u.viewTransition.finished.finally(()=>{
        u.viewTransition = void 0,
        u === w && (w = void 0),
        r === m && (m = void 0),
        document.documentElement.removeAttribute(j),
        document.documentElement.removeAttribute(M)
    }
    );
    try {
        await u.viewTransition.updateCallbackDone
    } catch (a) {
        const g = a;
        console.log("[astro]", g.name, g.message, g.stack)
    }
}
async function X(e, t) {
    await ft("forward", k, new URL(e,location.href), t ?? {})
}
function De(e) {
    if (!U() && e.state) {
        location.reload();
        return
    }
    if (e.state === null)
        return;
    const t = history.state
      , n = t.index
      , o = n > b ? "forward" : "back";
    b = n,
    ft(o, k, new URL(location.href), {}, t)
}
const K = ()=>{
    history.state && (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY) && B({
        scrollX,
        scrollY
    })
}
;
{
    if (O || ht() !== "none")
        if (k = new URL(location.href),
        addEventListener("popstate", De),
        addEventListener("load", dt),
        "onscrollend"in window)
            addEventListener("scrollend", K);
        else {
            let e, t, n, o;
            const i = ()=>{
                if (o !== history.state?.index) {
                    clearInterval(e),
                    e = void 0;
                    return
                }
                if (t === scrollY && n === scrollX) {
                    clearInterval(e),
                    e = void 0,
                    K();
                    return
                } else
                    t = scrollY,
                    n = scrollX
            }
            ;
            addEventListener("scroll", ()=>{
                e === void 0 && (o = history.state.index,
                t = scrollY,
                n = scrollX,
                e = window.setInterval(i, 50))
            }
            , {
                passive: !0
            })
        }
    for (const e of document.scripts)
        e.dataset.astroExec = ""
}
const pt = new Set
  , L = new WeakSet;
let C, gt, z = !1;
function Re(e) {
    z || (z = !0,
    C ??= e?.prefetchAll ?? !1,
    gt ??= e?.defaultStrategy ?? "hover",
    Pe(),
    Me(),
    Ce(),
    qe())
}
function Pe() {
    for (const e of ["touchstart", "mousedown"])
        document.body.addEventListener(e, t=>{
            y(t.target, "tap") && _(t.target.href, {
                ignoreSlowConnection: !0
            })
        }
        , {
            passive: !0
        })
}
function Me() {
    let e;
    document.body.addEventListener("focusin", o=>{
        y(o.target, "hover") && t(o)
    }
    , {
        passive: !0
    }),
    document.body.addEventListener("focusout", n, {
        passive: !0
    }),
    $(()=>{
        for (const o of document.getElementsByTagName("a"))
            L.has(o) || y(o, "hover") && (L.add(o),
            o.addEventListener("mouseenter", t, {
                passive: !0
            }),
            o.addEventListener("mouseleave", n, {
                passive: !0
            }))
    }
    );
    function t(o) {
        const i = o.target.href;
        e && clearTimeout(e),
        e = setTimeout(()=>{
            _(i)
        }
        , 80)
    }
    function n() {
        e && (clearTimeout(e),
        e = 0)
    }
}
function Ce() {
    let e;
    $(()=>{
        for (const t of document.getElementsByTagName("a"))
            L.has(t) || y(t, "viewport") && (L.add(t),
            e ??= He(),
            e.observe(t))
    }
    )
}
function He() {
    const e = new WeakMap;
    return new IntersectionObserver((t,n)=>{
        for (const o of t) {
            const i = o.target
              , r = e.get(i);
            o.isIntersecting ? (r && clearTimeout(r),
            e.set(i, setTimeout(()=>{
                n.unobserve(i),
                e.delete(i),
                _(i.href)
            }
            , 300))) : r && (clearTimeout(r),
            e.delete(i))
        }
    }
    )
}
function qe() {
    $(()=>{
        for (const e of document.getElementsByTagName("a"))
            y(e, "load") && _(e.href)
    }
    )
}
function _(e, t) {
    const n = t?.ignoreSlowConnection ?? !1;
    if (Be(e, n))
        if (pt.add(e),
        document.createElement("link").relList?.supports?.("prefetch") && t?.with !== "fetch") {
            const o = document.createElement("link");
            o.rel = "prefetch",
            o.setAttribute("href", e),
            document.head.append(o)
        } else
            fetch(e, {
                priority: "low"
            })
}
function Be(e, t) {
    if (!navigator.onLine || !t && wt())
        return !1;
    try {
        const n = new URL(e,location.href);
        return location.origin === n.origin && (location.pathname !== n.pathname || location.search !== n.search) && !pt.has(e)
    } catch {}
    return !1
}
function y(e, t) {
    if (e?.tagName !== "A")
        return !1;
    const n = e.dataset.astroPrefetch;
    return n === "false" ? !1 : t === "tap" && (n != null || C) && wt() ? !0 : n == null && C || n === "" ? t === gt : n === t
}
function wt() {
    if ("connection"in navigator) {
        const e = navigator.connection;
        return e.saveData || /2g/.test(e.effectiveType)
    }
    return !1
}
function $(e) {
    e();
    let t = !1;
    document.addEventListener("astro:page-load", ()=>{
        if (!t) {
            t = !0;
            return
        }
        e()
    }
    )
}
function Oe() {
    const e = document.querySelector('[name="astro-view-transitions-fallback"]');
    return e ? e.getAttribute("content") : "animate"
}
function G(e) {
    return e.dataset.astroReload !== void 0
}
(O || Oe() !== "none") && (document.addEventListener("click", e=>{
    let t = e.target;
    if (e.composed && (t = e.composedPath()[0]),
    t instanceof Element && (t = t.closest("a, area")),
    !(t instanceof HTMLAnchorElement) && !(t instanceof SVGAElement) && !(t instanceof HTMLAreaElement))
        return;
    const n = t instanceof HTMLElement ? t.target : t.target.baseVal
      , o = t instanceof HTMLElement ? t.href : t.href.baseVal
      , i = new URL(o,location.href).origin;
    G(t) || t.hasAttribute("download") || !t.href || n && n !== "_self" || i !== location.origin || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented || (e.preventDefault(),
    X(o, {
        history: t.dataset.astroHistory === "replace" ? "replace" : "auto",
        sourceElement: t
    }))
}
),
document.addEventListener("submit", e=>{
    let t = e.target;
    if (t.tagName !== "FORM" || e.defaultPrevented || G(t))
        return;
    const n = t
      , o = e.submitter
      , i = new FormData(n,o)
      , r = typeof n.action == "string" ? n.action : n.getAttribute("action")
      , c = typeof n.method == "string" ? n.method : n.getAttribute("method");
    let s = o?.getAttribute("formaction") ?? r ?? location.pathname;
    const l = o?.getAttribute("formmethod") ?? c ?? "get";
    if (l === "dialog" || location.origin !== new URL(s,location.href).origin)
        return;
    const h = {
        sourceElement: o ?? n
    };
    if (l === "get") {
        const u = new URLSearchParams(i)
          , a = new URL(s);
        a.search = u.toString(),
        s = a.toString()
    } else
        h.formData = i;
    e.preventDefault(),
    X(s, h)
}
),
Re({
    prefetchAll: !0
}));
class Ue extends HTMLElement {
    constructor() {
        if (super(),
        this._btn = this.querySelector("button"),
        !this._btn) {
            console.warn("Unable to locate mobile menu button element.");
            return
        }
        this._btn.addEventListener("click", ()=>this.toggleExpanded());
        const t = this.closest("body");
        t && t.addEventListener("keyup", n=>this.closeOnEscape(n))
    }
    setExpanded(t) {
        this.setAttribute("aria-expanded", String(t)),
        document.body.toggleAttribute("data-mobile-menu-expanded", t)
    }
    toggleExpanded() {
        this.setExpanded(this.getAttribute("aria-expanded") !== "true")
    }
    closeOnEscape(t) {
        t.code === "Escape" && (this.setExpanded(!1),
        this._btn?.focus())
    }
}
customElements.define("mobile-menu-button", Ue);
function vt() {
    const e = document.querySelector("button#search-button");
    if (!e)
        return;
    function t(i) {
        i ? (document.documentElement.dataset.searchVisible = "true",
        window.pagefind.init()) : delete document.documentElement.dataset.searchVisible,
        e?.toggleAttribute("data-active", i)
    }
    function n() {
        const r = !this.hasAttribute("data-active");
        t(r),
        document.dispatchEvent(new CustomEvent("search-button-click",{
            detail: {
                active: r
            }
        }))
    }
    e.hasAttribute("data-has-listener") || (e.setAttribute("data-has-listener", "true"),
    e.addEventListener("click", n));
    function o() {
        t(!1)
    }
    document.addEventListener("search-menu-close", o)
}
document.addEventListener("astro:after-swap", ()=>{
    vt()
}
);
vt();
class $e {
    constructor() {
        this._clearButton = null,
        this._closeButton = null,
        this._inputElement = null,
        this._contentsElement = null,
        this._resultsDropdownElement = null,
        this._searchBackdropElement = null,
        this._results = [],
        this._resultsDisplay = [],
        this._hasInput = !1,
        this._loadedIndex = 0,
        document.addEventListener("astro:after-swap", ()=>this._initialise()),
        this._initialise()
    }
    _initialise() {
        this._clearButton = document.querySelector("button[data-search-clear]"),
        this._closeButton = document.querySelector("button[data-search-close]"),
        this._inputElement = document.querySelector("input.search-input"),
        this._contentsElement = document.querySelector("#search-results-contents"),
        this._resultsDropdownElement = document.querySelector("#search-results"),
        this._searchBackdropElement = document.querySelector("#search-content-blur"),
        this._clearButton && this._clearButton.addEventListener("click", ()=>this._clearSearchInput()),
        this._closeButton && this._closeButton.addEventListener("click", ()=>this._closeSearch()),
        document.addEventListener("search-button-click", t=>this._searchButtonClickHandler(t)),
        this._inputElement && !this._inputElement.hasAttribute("data-has-input-listener") && (this._inputElement.setAttribute("data-has-input-listener", "true"),
        this._inputElement.addEventListener("input", ()=>this._handleSearchInput())),
        this._resultsDropdownElement && !this._resultsDropdownElement.hasAttribute("data-has-button-listener") && (this._resultsDropdownElement.setAttribute("data-has-button-listener", "true"),
        this._resultsDropdownElement.addEventListener("click", t=>{
            const n = t.target;
            n instanceof HTMLButtonElement && n.hasAttribute("data-load-more-results") && this._loadMoreResults(5)
        }
        )),
        this._searchBackdropElement && this._searchBackdropElement.addEventListener("click", ()=>this._closeSearch()),
        this._addExtraCSS()
    }
    _addExtraCSS() {
        const t = new CSSStyleSheet;
        t.insertRule(":root[data-search-visible='true'] div[data-hide-when-search] {display: none !important;}"),
        document.adoptedStyleSheets.push(t)
    }
    _toggleSearchElement(t) {
        const n = document.querySelector("div.search-wrapper");
        n && n.toggleAttribute("data-visible", t)
    }
    _clearSearchInput() {
        this._inputElement && (this._inputElement.value = "",
        this._handleSearchInput())
    }
    _closeSearch() {
        this._toggleSearchElement(!1),
        this._clearSearchInput(),
        this._hideResults(),
        document.dispatchEvent(new CustomEvent("search-menu-close",{}))
    }
    _searchButtonClickHandler(t) {
        this._toggleSearchElement(t.detail.active),
        t.detail.active && this._inputElement && this._inputElement.focus()
    }
    async _handleSearchInput() {
        this._hasInput = (this._inputElement?.value || "").length > 0;
        const t = await window.pagefind.debouncedSearch(this._inputElement?.value || "");
        t ? this._results = t.results : this._results = [],
        this._resultsDisplay = [],
        this._loadedIndex = 0,
        this._loadMoreResults(5)
    }
    _isValidResult(t) {
        return !(t.url.includes("404.html") || t.raw_url && t.raw_url === "/" || t.meta.title && t.meta.title === "Redirect")
    }
    async _loadMoreResults(t) {
        let n = 0;
        for (; n < t; ) {
            const o = t - n
              , i = this._results.slice(this._loadedIndex, this._loadedIndex + o);
            if (i.length === 0)
                break;
            const c = (await Promise.all(i.map(s=>s.data()))).filter(s=>this._isValidResult(s));
            this._resultsDisplay.push(...c),
            n += c.length,
            this._loadedIndex += i.length
        }
        this._displayResults()
    }
    _hideResults() {
        this._resultsDropdownElement?.setAttribute("hidden", "true"),
        this._searchBackdropElement?.setAttribute("hidden", "true"),
        this._contentsElement && (this._contentsElement.innerHTML = "")
    }
    async _displayResults() {
        if (!this._hasInput) {
            this._hideResults();
            return
        }
        let t = "";
        this._resultsDisplay.length < 1 ? t = "No results found" : (t = this._resultsDisplay.map(n=>`<div class="search-result-page">
					<a href="${n.url}"><h2>${n.meta?.title ?? n.sub_results[0]?.title}</h2></a>
					<ul>
						${n.sub_results.map(o=>`<li><a class="search-result-item" href="${o.url}"><p>${o.excerpt}</p></a></li>`).join("")}
					</ul>
				</div>`).join(""),
        this._loadedIndex < this._results.length && (t += '<button class="tv-button" data-load-more-results>Load more results</button>')),
        this._contentsElement && (this._contentsElement.innerHTML = t),
        this._resultsDropdownElement?.removeAttribute("hidden"),
        this._searchBackdropElement?.removeAttribute("hidden")
    }
}
new $e;
class Ne extends HTMLElement {
    #t = "tv-docs-theme";
    constructor() {
        super(),
        this.#n(this.#r());
        const t = this.querySelector("select");
        t && t.addEventListener("change", n=>{
            n.currentTarget instanceof HTMLSelectElement && this.#n(this.#e(n.currentTarget.value))
        }
        )
    }
    #e(t) {
        return t === "auto" || t === "dark" || t === "light" ? t : "auto"
    }
    #o() {
        return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
    }
    #n(t) {
        window.ThemeProvider.updatePickers(t);
        const n = t === "auto" ? this.#o() : t;
        document.documentElement.dataset.theme = n,
        document.documentElement.classList.toggle("theme-dark", n === "dark"),
        document.documentElement.classList.toggle("sl-theme-dark", n === "dark"),
        this.#i(t);

	    // 根据 n 的值，更新所有 <code> 元素的类
		const codeElements = document.querySelectorAll('code');
		
		codeElements.forEach(codeElement => {
			if (n === "dark") {
				codeElement.classList.add('monaco-editor-tv-pine-dark');
				codeElement.classList.remove("monaco-editor-tv-pine-light")
			} else {
				codeElement.classList.add('monaco-editor-tv-pine-light');
				codeElement.classList.remove('monaco-editor-tv-pine-dark');
			}
		});
		const tableElements = document.querySelectorAll('table');
		tableElements.forEach(tableElement => {
			if (n === "dark") {
				tableElement.style.color = "#fff";
			} else {
				tableElement.style.color = ""; // 重置颜色
			}
		});
		console.log("change")
		
        const o = new CustomEvent("theme-selected",{
            detail: {
                theme: t
            }
        });
        document.dispatchEvent(o)
    }
    #i(t) {
        typeof localStorage < "u" && (t === "light" || t === "dark" ? localStorage.setItem(this.#t, t) : localStorage.removeItem(this.#t))
    }
    #r() {
        const t = typeof localStorage < "u" && localStorage.getItem(this.#t);
        return this.#e(t)
    }
}
customElements.define("docs-theme-select", Ne);
export {Z as t};
