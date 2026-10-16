import appConnectedImg from '../assets/images/app-connected.jpg';
import appTooltipImg from '../assets/images/app-tooltip.jpg';
import appFreehomeImg from '../assets/images/app-freehome.jpg';
import appServersImg from '../assets/images/app-servers.jpg';
import appServersPremImg from '../assets/images/app-servers-prem.jpg';
import appFreeServersImg from '../assets/images/app-free-servers.jpg';
import appSplitImg from '../assets/images/app-split.jpg';
import appSettingsImg from '../assets/images/app-settings.jpg';
import appProtocolImg from '../assets/images/app-protocol.jpg';
import appNotifsImg from '../assets/images/app-notifs.jpg';
import appMenuFreeImg from '../assets/images/app-menu-free.jpg';

// The original page script, unchanged apart from being wrapped in a function so
// App can call it once the markup is mounted. It works directly on the DOM by id
// and class, so the ids and classes in the components must stay as they are.
let started = false;
export function initInteractions() {
  if (started) return;
  started = true;

"use strict";
var $  = function(s,c){return (c||document).querySelector(s);};
var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};

/* ---------- reduced motion ----------
   Read live rather than once at load: someone who turns the OS setting on while
   the page is open should not have to reload to be taken seriously. Every
   animation path below reads RM at the moment it runs. */
var motionQ = window.matchMedia('(prefers-reduced-motion: reduce)');
var RM = motionQ.matches;
function onMotionChange(){ RM = motionQ.matches; }
if(motionQ.addEventListener) motionQ.addEventListener('change', onMotionChange);
else if(motionQ.addListener) motionQ.addListener(onMotionChange);

/* ---------- live regions ----------
   say(msg)   — polite: filtering, plan changes, things you asked for
   shout(msg) — assertive: a submit that failed, something that needs you now */
var livePolite = $('#live-polite'), liveAlert = $('#live-alert');
function announce(el, msg){
  if(!el) return;
  /* clearing first forces a re-announcement when the same string repeats — a
     second failed attempt with the same message is still worth hearing */
  el.textContent = '';
  window.setTimeout(function(){ el.textContent = msg; }, 60);
}
function say(msg){ announce(livePolite, msg); }
function shout(msg){ announce(liveAlert, msg); }

/* ==========================================================================
   FACTS — one canonical source for every number on the page
   ==========================================================================
   The copy claimed "700+ servers / 90+ countries" in nine places, each one typed
   by hand, while the animated counters were seeded separately. On a product sold
   on trust, two numbers that disagree read as carelessness at best.

   The region table is the source: every row carries its own counts, the totals
   are summed from it, and every claim in the copy is written from that total.
   Change a row and the headline, the counters, the pricing bullet, the FAQ and
   the account page all follow. There is no second place to edit. */
var REGION_ROWS = $$('.rowi .tag[data-servers]');
var FACTS = (function(){
  var servers = 0, countries = 0;
  REGION_ROWS.forEach(function(t){
    servers   += parseInt(t.dataset.servers, 10) || 0;
    countries += parseInt(t.dataset.countries, 10) || 0;
  });
  return {
    servers: servers,
    countries: countries,
    continents: REGION_ROWS.length,
    continentsWord: ['zero','one','two','three','four','five','six','seven'][REGION_ROWS.length] || String(REGION_ROWS.length),
    devices: 5
  };
})();
$$('[data-fact]').forEach(function(el){
  var v = FACTS[el.dataset.fact];
  if(v !== undefined) el.textContent = v;
});

/* ---------- retire the placeholder once the real photo decodes ---------- */
$$('.media img').forEach(function(img){
  var settle = function(){ if(img.naturalWidth > 0){ var m = img.closest('.media'); if(m) m.classList.add('has-img'); } };
  if(img.complete) settle(); else img.addEventListener('load', settle);
});

/* ---------- reveal on scroll ---------- */
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{rootMargin:'0px 0px -12% 0px',threshold:.06});
$$('.up').forEach(function(el){ io.observe(el); });

/* Sample a cubic-bezier() timing function from a CSS token, so JS-driven motion
   can run the same curve the stylesheet runs instead of an approximation of it.
   Newton from t=x converges in a handful of steps for any curve whose x is
   monotonic, which every legal cubic-bezier() timing function is. */
function cssBezier(prop, fallback){
  var raw = getComputedStyle(document.documentElement).getPropertyValue(prop);
  var m = String(raw).match(/cubic-bezier\(([^)]+)\)/);
  var p = m ? m[1].split(',').map(function(n){ return parseFloat(n); }) : null;
  if(!p || p.length !== 4 || p.some(function(n){ return !isFinite(n); })) p = fallback;
  var x1 = p[0], y1 = p[1], x2 = p[2], y2 = p[3];
  function A(a,b){ return 1 - 3*b + 3*a; }
  function B(a,b){ return 3*b - 6*a; }
  function C(a){ return 3*a; }
  function at(t,a,b){ return ((A(a,b)*t + B(a,b))*t + C(a))*t; }
  function slope(t,a,b){ return 3*A(a,b)*t*t + 2*B(a,b)*t + C(a); }
  return function(x){
    if(x <= 0) return 0;
    if(x >= 1) return 1;
    var t = x;
    for(var i = 0; i < 8; i++){
      var d = at(t,x1,x2) - x;
      if(Math.abs(d) < 1e-6) break;
      var s = slope(t,x1,x2);
      if(Math.abs(s) < 1e-6) break;
      t -= d / s;
    }
    return at(t,y1,y2);
  };
}
var easeEnter = cssBezier('--ease-enter', [.21,.78,.26,1]);

/* ---------- count up ----------
   Targets come from FACTS, never from the markup. The final frame is written
   explicitly rather than left to whatever the easing lands on, so the number you
   are left looking at is the number we claim.

   The curve is no longer a hand-rolled easeOutCubic. It is --ease-enter, read
   off the stylesheet and sampled here, so a number finding its value and a
   panel arriving on screen are the same gesture rather than two systems that
   happen to look similar — change the token and both move.

   Duration follows how far the number actually has to travel. On a flat 1400ms
   the 5 for continents spent as long crossing five integers as 700 spent
   crossing seven hundred, so the small tile visibly stepped while the large one
   blurred. And the tiles start 90ms apart rather than on one frame, because
   four numbers landing together read as a single element repainting rather than
   as four facts being counted. */
$$('[data-count-fact]').forEach(function(el){
  var v = FACTS[el.dataset.countFact];
  if(v !== undefined) el.dataset.count = v;
});
var COUNT_LEAD = 90;
var cio = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting) return;
    cio.unobserve(e.target);
    var el = e.target, end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec||'0',10), t0 = null;
    if(RM || !isFinite(end)){ el.textContent = (isFinite(end) ? end : 0).toFixed(dec); return; }
    var dur = 700 + 260 * Math.abs(Math.round(end)).toString().length;
    var lead = COUNT_LEAD * (parseInt(el.dataset.countOrder || '0', 10) || 0);
    var landed = false;
    function land(){
      if(landed) return;
      landed = true;
      el.textContent = end.toFixed(dec);
    }
    function step(t){
      if(landed) return;
      if(t0 === null) t0 = t;
      var p = (t - t0 - lead) / dur;
      if(p < 0){ requestAnimationFrame(step); return; }   /* still in the stagger */
      if(p >= 1){ land(); return; }
      el.textContent = (end * easeEnter(p)).toFixed(dec);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    /* The loop above only ever stops by reaching the end, so the final frame is
       guaranteed — as long as frames keep coming, and they do not. rAF stops in
       a backgrounded tab and was caught stalling outright here, leaving 429 on
       screen under a heading that claims 700, and 48 under one that claims 90.
       Same lesson as the price roll: a number we assert has to arrive whether
       or not anything painted. The timer is the contract; the animation is only
       how it looks on the way. */
    setTimeout(land, lead + dur + 120);
  });
},{threshold:.5});
/* Stagger order comes from position in the tile group, not from the order the
   observer happens to deliver the entries in — that order is not specified and
   a cascade that runs right-to-left on one engine is worse than none. */
$$('.stats').forEach(function(g){
  $$('[data-count]', g).forEach(function(el, i){ el.dataset.countOrder = i; });
});
$$('[data-count]').forEach(function(el){ cio.observe(el); });

/* ==========================================================================
   SHARED WIDGET BEHAVIOUR
   ========================================================================== */

var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function focusables(root){
  return $$(FOCUSABLE, root).filter(function(el){
    /* offsetParent is null for anything display:none or a hidden ancestor —
       cheaper and more reliable here than walking computed styles */
    return el.offsetParent !== null || el === document.activeElement;
  });
}

/* ---------- tablist ----------
   A row of buttons that swaps one panel is a tablist, and a tablist is a single
   tab stop: you Tab into the selected chip and arrow between the rest. Five
   plans that each eat a Tab press is five presses to get past the pricing block.

   The visual toggling stays where it already lived — this only owns the roving
   tabindex, the arrow keys and the aria state, and activates by clicking the
   real button so the existing handler runs untouched. */
function wireTablist(list){
  if(!list) return;
  var tabs = function(){ return $$('[role="tab"]', list); };
  function select(tab){
    tabs().forEach(function(t){
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls') || '');
      if(panel && on) panel.setAttribute('aria-labelledby', t.id);
    });
  }
  list.addEventListener('click', function(e){
    var t = e.target.closest('[role="tab"]');
    if(t && list.contains(t)) select(t);
  });
  list.addEventListener('keydown', function(e){
    var vertical = list.getAttribute('aria-orientation') === 'vertical';
    var next = vertical ? 'ArrowDown' : 'ArrowRight';
    var prev = vertical ? 'ArrowUp' : 'ArrowLeft';
    if(['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].indexOf(e.key) === -1) return;
    /* only the axis this list runs along — leave the other one to the page */
    if(e.key !== 'Home' && e.key !== 'End' && e.key !== next && e.key !== prev) return;
    var list2 = tabs(), i = list2.indexOf(document.activeElement);
    if(i === -1) return;
    e.preventDefault();
    var j = e.key === 'Home' ? 0
          : e.key === 'End'  ? list2.length - 1
          : e.key === next   ? (i + 1) % list2.length
          :                    (i - 1 + list2.length) % list2.length;
    list2[j].focus();
    list2[j].click();
  });
  /* sync once at load in case the markup and the .on class ever disagree */
  var on = $('[role="tab"][aria-selected="true"]', list);
  if(on) select(on);
}

/* ---------- roving menu (language picker, account menu) ----------
   Up/Down to move, Home/End to jump, Escape to close and hand focus back to the
   trigger, Tab out to dismiss. Without these a dropdown is a mouse-only control
   even when every item inside it is a perfectly good button. */
function wireMenu(opts){
  var trigger = opts.trigger, menu = opts.menu, isOpen = opts.isOpen, open = opts.open, close = opts.close;
  function items(){ return $$(opts.itemSel || 'button,a', menu); }
  trigger.addEventListener('keydown', function(e){
    if(e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    if(!isOpen()) open();
    /* the menu animates in from visibility:hidden, and focus() on a
       visibility:hidden element is silently dropped — so wait for the frame in
       which it is actually visible before moving there */
    requestAnimationFrame(function(){
      var list = items();
      if(!list.length) return;
      (e.key === 'ArrowDown' ? list[0] : list[list.length-1]).focus();
    });
  });
  menu.addEventListener('keydown', function(e){
    var list = items(), i = list.indexOf(document.activeElement);
    if(e.key === 'Escape'){ e.stopPropagation(); close(); trigger.focus(); return; }
    if(e.key === 'Tab'){ close(); return; }
    if(i === -1) return;
    if(e.key === 'ArrowDown'){ e.preventDefault(); list[(i+1)%list.length].focus(); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); list[(i-1+list.length)%list.length].focus(); }
    else if(e.key === 'Home'){ e.preventDefault(); list[0].focus(); }
    else if(e.key === 'End'){ e.preventDefault(); list[list.length-1].focus(); }
  });
}

/* ---------- focus containment for the full-page overlays ----------
   #auth and #account both declare aria-modal="true", which promises a screen
   reader that nothing outside them exists. Nothing enforced that promise: Tab
   walked straight out into the page behind, and a virtual cursor could read the
   whole marketing site through the "modal".

   `inert` on the siblings is what actually delivers it — unfocusable and removed
   from the accessibility tree in one attribute. Browsers without it fall back to
   the wrap-around trap below, which handles the keyboard case at least. */
/* A focus restore is only as good as the element it points at. Every overlay
   here records document.activeElement on the way in and focuses it again on the
   way out, which is correct right up until the opener stops being focusable —
   and it routinely does. Signing in hides the Login links the auth panel was
   opened from, and opening that panel from the mobile sheet closes the sheet.
   In both cases the recorded element is still in the document and still has a
   focus method, so the usual `el && el.focus` guard passes, focus() then does
   nothing at all, and the user is dropped on <body> at the top of the page —
   the exact outcome the restore exists to prevent, arrived at silently.

   Measured on this page before the fix: opening from the mobile sheet and
   pressing Escape landed on BODY, and so did Escape after a successful sign-in.
   Opening from the nav Login and pressing Escape was always fine, which is why
   this survived — the common path works and the broken ones say nothing. */
var FOCUSABLE = 'a[href],button,input,select,textarea,summary,iframe,audio[controls],video[controls],[contenteditable],[tabindex]';
function canTakeFocus(el){
  if(!el || el.nodeType !== 1 || !el.isConnected || typeof el.focus !== 'function') return false;
  /* <body> is connected, visible, and has a focus() method, so every liveness
     test passes — and focusing it is exactly the failure being guarded against.
     Arriving on the panel by deep link records document.body as the opener,
     because there was no opener. Require something actually focusable. */
  if(!el.matches(FOCUSABLE)) return false;
  if(el.disabled || el.getAttribute('aria-hidden') === 'true') return false;
  if(el.closest('[inert]')) return false;
  if(!el.getClientRects().length) return false;      /* display:none, or a panel that has closed */
  var cs = getComputedStyle(el);
  return cs.visibility !== 'hidden' && cs.display !== 'none';
}
/* Back to the opener when it survived; otherwise to whatever now holds its
   place — the account button is what the Login link becomes once you are signed
   in — and only then to the main landmark, which is at least somewhere a screen
   reader can announce rather than a void at the top of the document. */
function restoreFocus(target, fallbacks){
  if(canTakeFocus(target)){ target.focus(); return target; }
  var list = fallbacks || [];
  for(var i = 0; i < list.length; i++){
    var found = $$(list[i]).filter(canTakeFocus)[0];
    if(found){ found.focus(); return found; }
  }
  var main = $('#main') || $('main');
  if(main){
    /* -1 so it takes programmatic focus without joining the tab order */
    if(!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus();
    return main;
  }
  return null;
}
/* the openers an overlay can fall back to, most-equivalent first */
var AUTH_FALLBACK = ['#acct-btn', 'header .signin[data-auth]', 'header [data-auth]', '.burger', 'footer [data-auth]'];
/* a confirm can be raised from anywhere, so its fallback is the surface that
   raised it — the account page if that is still up — before the header */
var DLG_FALLBACK = ['#account.is-open .ac-nav button.on', '#account.is-open button', '#acct-btn', '.burger'];
var INERT_OK = 'inert' in HTMLElement.prototype;
/* the live regions stay reachable (they are how we speak), and so do the dialog
   and the toast host — a <dialog> that has been marked inert cannot be opened,
   and a confirm raised from inside the account page would be dead on arrival */
var INERT_SKIP = { 'live-polite':1, 'live-alert':1, 'dlg':1, 'toasts':1 };
function setPageInert(overlay, on){
  $$('body > *').forEach(function(el){
    if(INERT_SKIP[el.id] || el.tagName === 'SCRIPT') return;
    /* The overlay being opened must be cleared, not skipped. Skipping it meant an
       overlay that a *previous* overlay had inerted stayed inert when its own
       turn came: sign in (which inerts #account as background), then open the
       account page, and it rendered, took focus, and accepted nothing — no
       click, no Tab, no key. Visible and completely dead. Nothing flagged it,
       because inert content is dropped from the accessibility tree, so an audit
       of that state sees a clean page with almost nothing in it. */
    if(el === overlay){ if(INERT_OK) el.inert = false; else el.removeAttribute('aria-hidden'); return; }
    if(on){ if(INERT_OK) el.inert = true; else el.setAttribute('aria-hidden','true'); }
    else   { if(INERT_OK) el.inert = false; else el.removeAttribute('aria-hidden'); }
  });
}
function trapTab(overlay){
  return function(e){
    if(e.key !== 'Tab') return;
    var f = focusables(overlay);
    if(!f.length) return;
    var first = f[0], last = f[f.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  };
}

/* ---------- toasts ---------- */
var toastHost = $('#toasts');
function toast(msg, kind){
  var t = document.createElement('div');
  t.className = 'toast toast--' + (kind || 'ok');
  var ic = kind === 'bad'
    ? '<path d="M12 3l9 16H3l9-16z"/><path d="M12 9v4M12 16.4h.01"/>'
    : '<path d="M20 6.5 9.5 17 4 11.5"/>';
  t.innerHTML =
    '<svg class="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ic + '</svg>' +
    '<span class="tx"></span>' +
    '<button type="button" class="tclose" aria-label="Dismiss"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>';
  $('.tx', t).textContent = msg;
  toastHost.appendChild(t);
  /* the toast itself is not a live region — the shared one announces it, so a
     screen reader hears it once rather than once per visual element */
  (kind === 'bad' ? shout : say)(msg);
  var gone = false;
  function drop(){
    if(gone) return; gone = true;
    t.classList.add('out');
    window.setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); }, RM ? 0 : 260);
  }
  $('.tclose', t).addEventListener('click', drop);
  window.setTimeout(drop, 5200);
  return t;
}

/* ---------- dialogs ----------
   openDialog({kind, title, body, actions:[{label, style, act}]})
   Native <dialog>.showModal() does the focus trap, Escape, inert background and
   focus restoration. Everything here is presentation on top of that. */
var dlg = $('#dlg'), dlgTitle = $('#dlg-title'), dlgBody = $('#dlg-body'),
    dlgIc = $('#dlg-ic'), dlgActions = $('#dlg-actions');
var DLG_ICON = {
  danger:'<path d="M12 3l9 16H3l9-16z"/><path d="M12 9.5v4M12 16.8h.01"/>',
  warn:  '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16.2h.01"/>',
  ok:    '<circle cx="12" cy="12" r="9"/><path d="M8.2 12.2 11 15l5-5.6"/>',
  info:  '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>'
};
var dlgSupported = typeof dlg.showModal === 'function';
var dlgLastFocus = null;
/* Belt and braces on the focus trap: showModal() traps in a compliant engine,
   but the fallback path (setAttribute('open')) is a non-modal dialog with no
   trap at all, and Tab walks straight out into the page behind it. */
var dlgTrap = trapTab(dlg);
function openDialog(o){
  var kind = o.kind || 'info';
  /* An open landing on top of an exit still in flight. The className below
     clears .is-closing, but the flag and the timer are what would otherwise
     close this dialog a moment after it appeared. */
  clearTimeout(dlgExitTimer);
  dlgClosing = false;
  dlg.className = 'dlg dlg--' + kind;
  dlgTitle.textContent = o.title;
  dlgBody.innerHTML = o.body;
  dlgIc.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (DLG_ICON[kind] || DLG_ICON.info) + '</svg>';
  dlgActions.innerHTML = '';
  (o.actions || [{label:'Close', style:'btn-ghost'}]).forEach(function(a){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn btn-sm ' + (a.style || 'btn-ghost');
    b.textContent = a.label;
    b.addEventListener('click', function(){
      closeDialog();
      if(a.act) a.act();
    });
    dlgActions.appendChild(b);
  });
  /* Remember who opened this. Native <dialog> restores focus on close by itself,
     but only while the opener is still focusable — and here it observably did
     not: Esc left focus on <body>, which drops a keyboard user back at the top
     of the document with no idea where they were. Recording it makes the return
     deterministic instead of dependent on the engine. */
  dlgLastFocus = document.activeElement;
  /* showModal() on an already-open dialog throws InvalidStateError, and after
     the reset above the dialog can still be open — the exit was cancelled, not
     completed. The content has been replaced either way, so re-showing is both
     unnecessary and the only thing that could fail here. */
  if(dlgSupported){ if(!dlg.open) dlg.showModal(); }
  else dlg.setAttribute('open','');
  document.addEventListener('keydown', dlgTrap);
  /* land on the least destructive action, never on "delete everything" */
  var safe = $('.btn-ghost', dlgActions) || $('button', dlgActions);
  if(safe) safe.focus();
}
function restoreDlgFocus(){
  document.removeEventListener('keydown', dlgTrap);
  var target = dlgLastFocus;
  dlgLastFocus = null;
  /* Deferred by a tick on purpose. The engine performs its own focus restore
     *after* dispatching 'close', and it overwrote an immediate call — the
     trigger was focused, then blurred to <body> a moment later, which reads as
     the dialog throwing you back to the top of the page. Going last wins.
     Through restoreFocus for the same reason the auth panel goes through it:
     raising this from inside the account page and pressing Escape was landing
     on a heading rather than on the button that raised it. */
  window.setTimeout(function(){ restoreFocus(target, DLG_FALLBACK); }, 0);
}
/* Esc on a native <dialog> is handled by the browser and fires 'close' without
   ever going through closeDialog() — hanging the restore off the event instead
   of the function is what makes Esc and the buttons behave identically. */
dlg.addEventListener('close', restoreDlgFocus);
/* Esc dismisses the topmost layer and nothing else. Every layer — the mobile
   menu, the tiles, the FAB, the auth panel, the account page — listens for Esc
   on document, so with the dialog open a single press ran all of them: the
   dialog closed *and* the account page underneath it closed, and focus fell to
   <body>. Swallowing Esc in the capture phase while the dialog is up keeps the
   layers independent. The browser's own Esc handling for <dialog> is internal,
   not a listener, so the dialog still closes. */
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && (dlg.open || dlg.hasAttribute('open'))) e.stopPropagation();
}, true);
/* Closing is deferred by exactly one animation. A native <dialog> leaves the
   top layer the instant close() runs, so an exit can only exist if close() is
   held back until the frames have played — there is no CSS-only way to animate
   an element that is already gone.
   Two things have to be true for that to be safe. The dialog must not accept a
   second close while the first is playing, or the restore fires twice. And the
   close must happen even if 'animationend' never arrives — a dismissal that can
   get stuck open is worse than no animation at all — hence the timer, set past
   the animation's own length. */
var dlgClosing = false, dlgExitTimer = 0;
function dlgHardClose(){
  if(!dlgClosing) return;
  dlgClosing = false;
  clearTimeout(dlgExitTimer);
  dlg.classList.remove('is-closing');
  if(dlgSupported && dlg.open){ dlg.close(); return; }  /* 'close' does the rest */
  dlg.removeAttribute('open');
  restoreDlgFocus();
}
function closeDialog(){
  if(dlgClosing) return;
  if(RM || !dlgSupported){ dlgClosing = true; dlgHardClose(); return; }
  dlgClosing = true;
  dlg.classList.add('is-closing');
  dlg.addEventListener('animationend', function onExit(e){
    if(e.target !== dlg || e.animationName !== 'dlgOut') return;
    dlg.removeEventListener('animationend', onExit);
    dlgHardClose();
  });
  dlgExitTimer = setTimeout(dlgHardClose, 600);
}
/* Esc reaches a native <dialog> without passing through closeDialog(), and the
   default action is an immediate close — so the exit only exists for the
   keyboard if the default is taken over. 'cancel' is the documented hook and is
   cancelable; the dialog still closes, just through the same path as the X and
   the backdrop rather than a second one that looks different. */
dlg.addEventListener('cancel', function(e){
  if(RM || !dlgSupported) return;
  e.preventDefault();
  closeDialog();
});
$('#dlg-x').addEventListener('click', closeDialog);
/* a click on the backdrop lands on the <dialog> itself, never on its contents */
dlg.addEventListener('click', function(e){ if(e.target === dlg) closeDialog(); });

/* ---------- header + progress ---------- */
var hdr = $('#hdr'), prog = $('#prog');
function onScroll(){
  var y = window.scrollY || 0;
  hdr.classList.toggle('small', y > 24);
  var h = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (h > 0 ? (y/h)*100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

/* ---------- mobile menu ----------
   The sheet covers the whole viewport, so while it is up the page underneath is
   not a place you should be able to Tab into. It also has to be closable from
   the keyboard and hand focus back to the button that opened it — otherwise you
   dismiss the menu and land at the top of the document with no idea where. */
var burger = $('#burger'), sheet = $('#sheet');
var sheetTrap = trapTab(sheet);
function setMenu(open){
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
  if(open){
    document.addEventListener('keydown', sheetTrap);
    var f = focusables(sheet);
    if(f.length) f[0].focus();
  }else{
    document.removeEventListener('keydown', sheetTrap);
  }
}
burger.setAttribute('aria-controls','sheet');
burger.addEventListener('click', function(){
  var open = !document.body.classList.contains('menu-open');
  setMenu(open);
  if(!open) burger.focus();
});
$$('#sheet a').forEach(function(a){
  a.addEventListener('click', function(){ setMenu(false); });
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && document.body.classList.contains('menu-open')){
    setMenu(false);
    burger.focus();
  }
});

/* ---------- language picker ----------
   both pickers (bar + sheet) stay in sync. copy is English-only for now,
   so this sets the state and the <html lang>; wire the strings in later. */
var pickers = $$('[data-lang-picker]');
function closeLang(except){
  pickers.forEach(function(p){
    if(p === except) return;
    p.classList.remove('on');
    $('.lang-btn', p).setAttribute('aria-expanded','false');
  });
}
function setLang(code){
  document.documentElement.setAttribute('lang', code);
  pickers.forEach(function(p){
    $('[data-lang-code]', p).textContent = code.toUpperCase();
    $$('.lang-menu button', p).forEach(function(b){
      var on = b.dataset.lang === code;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  });
}
pickers.forEach(function(p){
  var btn = $('.lang-btn', p), menu = $('.lang-menu', p);
  function openIt(){
    closeLang(p);
    p.classList.add('on');
    btn.setAttribute('aria-expanded','true');
  }
  function closeIt(){
    p.classList.remove('on');
    btn.setAttribute('aria-expanded','false');
  }
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    if(p.classList.contains('on')) closeIt(); else openIt();
  });
  $$('.lang-menu button', p).forEach(function(b){
    b.addEventListener('click', function(e){
      e.stopPropagation();
      setLang(b.dataset.lang);
      closeLang();
      btn.focus();
      say('Language set to ' + b.textContent.replace(/[A-Z]{2}$/,'').trim());
    });
  });
  /* Arrow keys in, Escape out, focus back on the trigger — 2.1.1 */
  wireMenu({
    trigger: btn, menu: menu,
    isOpen: function(){ return p.classList.contains('on'); },
    open: openIt, close: closeIt
  });
});
document.addEventListener('click', function(){ closeLang(); });
document.addEventListener('keydown', function(e){
  if(e.key !== 'Escape') return;
  /* if focus is inside a picker the menu's own handler already dealt with it */
  var open = $('[data-lang-picker].on');
  if(open && !open.contains(document.activeElement)) closeLang();
});

/* ---------- expanding rail (click to open, siblings shrink) ---------- */
var rail = $('#rail'), rcards = $$('.rcard', rail);
function openCard(card){
  rcards.forEach(function(c){
    var on = c === card;
    c.classList.toggle('is-open', on);
    c.setAttribute('aria-expanded', on ? 'true' : 'false');
  });
  rail.classList.add('has-open');
}
rcards.forEach(function(c){
  c.addEventListener('click', function(){
    if(c.classList.contains('is-open') && window.innerWidth <= 900){
      c.classList.remove('is-open'); c.setAttribute('aria-expanded','false');
      rail.classList.remove('has-open'); return;
    }
    openCard(c);
  });
  c.addEventListener('mouseenter', function(){
    if(window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth > 900) openCard(c);
  });
});
openCard(rcards[0]);

/* ---------- bento focus (open one, dim the rest) ---------- */
var bento = $('#bento'), tiles = $$('.tile', bento);
function closeTiles(){ bento.classList.remove('has-open'); tiles.forEach(function(t){ t.classList.remove('is-open'); }); }
tiles.forEach(function(t){
  t.addEventListener('click', function(e){
    e.stopPropagation();
    var was = t.classList.contains('is-open');
    closeTiles();
    if(!was){ t.classList.add('is-open'); bento.classList.add('has-open'); }
  });
});
document.addEventListener('click', closeTiles);
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeTiles(); });

/* ---------- region row hover preview ---------- */
var peek = $('#peek'), peekImg = $('img', peek), px = 0, py = 0, tx = 0, ty = 0, raf = null;
function loop(){
  px += (tx-px)*.14; py += (ty-py)*.14;
  peek.style.left = px+'px'; peek.style.top = py+'px';
  raf = requestAnimationFrame(loop);
}
$$('.rowi').forEach(function(r){
  r.addEventListener('mouseenter', function(e){
    if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    /* a panel that chases the cursor is exactly the kind of motion the setting
       exists to stop — the CSS hides it, this stops the rAF loop behind it */
    if(RM) return;
    /* Oceania has no photo yet — no data-peek means no preview, rather than a
       broken request and an empty frame following the cursor. */
    if(!r.dataset.peek) return;
    peekImg.src = r.dataset.peek;
    tx = px = e.clientX; ty = py = e.clientY;
    peek.classList.add('on');
    if(!raf) loop();
  });
  r.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
  r.addEventListener('mouseleave', function(){
    peek.classList.remove('on');
    if(raf){ cancelAnimationFrame(raf); raf = null; }
  });
});
peekImg.addEventListener('error', function(){ peekImg.style.visibility = 'hidden'; });
peekImg.addEventListener('load',  function(){ peekImg.style.visibility = 'visible'; });

/* ---------- app tabs ----------
   the screenshots are baked in below by tools/bake-rusvpn-v2-phones.ps1, so
   the phones still render when this file is moved away from images/. */
var SHOT = {
  connected: appConnectedImg,
  tooltip: appTooltipImg,
  freehome: appFreehomeImg,
  servers: appServersImg,
  serversPrem: appServersPremImg,
  freeServers: appFreeServersImg,
  split: appSplitImg,
  settings: appSettingsImg,
  protocol: appProtocolImg,
  notifs: appNotifsImg,
  menuFree: appMenuFreeImg,
};

var APP = [
  { m:'connected', l:'tooltip', r:'freehome',
    c:['We are a no-log VPN meaning that we don’t store any of your traffic logs.',
       'VesperVPN is committed to independent, no-log auditing — that audit is in progress.',
       'No third-party access to your VPN traffic. All data is securely managed from Moscow, free from Western interference.'] },
  { m:'servers', l:'serversPrem', r:'freeServers',
    c:['700+ servers worldwide, spanning North America, South America, Europe, Asia, Africa, and Oceania.',
       'Automatic server switching prevents slowdowns for uninterrupted service.',
       'We have optimized streaming servers around the globe, allowing you to get the most from your existing streaming subscription.'] },
  { m:'split', l:'settings', r:'protocol',
    c:['Select the apps for which you want to route through our secure VPN.',
       'Protect your privacy by ensuring your DNS isn’t being leaked to any entity.',
       'Experience advanced security, blazing-fast speed, and unrestricted access with our VPN.'] },
  { m:'settings', l:'notifs', r:'menuFree',
    c:['We offer the most advanced VPN protocols for the fastest and most secure connection.',
       'Advanced hardware ensures fast speeds and smooth streaming.',
       'Owned and operated in-house, following strict Russian security standards.'] }
];
var phM = $('#ph-m'), phL = $('#ph-l'), phR = $('#ph-r'), appcopy = $('#appcopy');
phM.src = SHOT[APP[0].m]; phL.src = SHOT[APP[0].l]; phR.src = SHOT[APP[0].r];
var TICK = '<span class="tick"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 5"/></svg></span>';
$$('#apptabs button').forEach(function(b){
  b.addEventListener('click', function(){
    $$('#apptabs button').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on');
    var d = APP[+b.dataset.app];
    [phM,phL,phR].forEach(function(el){ el.style.opacity = 0; });
    setTimeout(function(){
      phM.src = SHOT[d.m]; phL.src = SHOT[d.l]; phR.src = SHOT[d.r];
      [phM,phL,phR].forEach(function(el){ el.style.transition = 'opacity .45s'; el.style.opacity = 1; });
    }, 180);
    /* Rewrite the whole list, not just its items — #appcopy is the tabpanel
       wrapper now, so the <ul> has to be reinstated with it or the <li> lose
       their list parent. */
    appcopy.innerHTML = '<ul class="applist">' +
      d.c.map(function(t){ return '<li>'+TICK+'<span>'+t+'</span></li>'; }).join('') + '</ul>';
  });
});

/* every chip strip on the page is one tab stop with arrow keys inside it */
['#apptabs','#pctabs','#seg','#ac-tabs','#auth-tabs'].forEach(function(sel){ wireTablist($(sel)); });

/* ---------- pros & cons ---------- */
var PC = [
  { pro:['Security &amp; Safety','Automatic Updates','Official &amp; Verified','Easier Management','Better Compatibility'],
    con:['Regional Restrictions','Delayed Updates','Limited Apps','Forced Updates/Removals'] },
  { pro:['Access to Restricted Apps','Early Updates','Modified Apps','No Google Dependency'],
    con:['Security Risks','Manual Updates','Compatibility Issues','No Official Support'] },
  { pro:['Best performance on desktop','Supports all app features','Stable for long sessions','Easy installation and setup'],
    con:['Only for Windows devices','Needs manual update for new installer versions'] },
  { pro:['Native macOS experience','Best performance on Apple Silicon','Easy drag-and-drop installation'],
    con:['Only for Mac devices'] }
];
function renderPC(i){
  var d = PC[i];
  $('#pc-pro').innerHTML = d.pro.map(function(x){ return '<li><i></i><span>'+x+'</span></li>'; }).join('');
  $('#pc-con').innerHTML = d.con.map(function(x){ return '<li><i></i><span>'+x+'</span></li>'; }).join('');
}
$$('#pctabs button').forEach(function(b){
  b.addEventListener('click', function(){
    $$('#pctabs button').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on'); renderPC(+b.dataset.pc);
  });
});
renderPC(0);

/* ==========================================================================
   PRICING
   ==========================================================================
   PLACEHOLDER PRICES — swap `price` for the real ones from the live site at
   https://rusnetvpn.vercel.app. Only
   the price and the term are typed; the per-month equivalent, the "Save 25%"
   badge and the comparison table are all derived from them, so a price change is
   one edit and the discount can never be stale.

   Savings are measured against the 1-month rate — the shortest plan a buyer
   would realistically compare against — and that baseline is stated in the
   table's caption rather than left for them to reverse-engineer. */
var PLANS = [
  { n:'1-Week plan',   short:'1 Week',   price:2.99,  months:1/4.345, term:'Week'     },
  { n:'1-Month plan',  short:'1 Month',  price:7.99,  months:1,       term:'Month'    },
  { n:'3-Months plan', short:'3 Months', price:17.99, months:3,       term:'3-Months' },
  { n:'6-Months plan', short:'6 Months', price:29.99, months:6,       term:'6-Months' },
  { n:'1-Year plan',   short:'1 Year',   price:47.99, months:12,      term:'Year'     }
];
/* One primary CTA, so it is one string rather than a per-plan field that five
   rows have to keep agreeing on. The plan is already named in the card above
   the button; the button says what pressing it does. */
var BUY_CTA = 'Get VesperVPN';
var BASE_PLAN = 1;                                   /* the 1-month rate */
var money = function(n){ return '$' + n.toFixed(2); };
PLANS.forEach(function(p){
  p.perMonth = p.price / p.months;
  p.v   = p.price.toFixed(2);
  p.per = money(p.price) + ' / ' + p.term;
});
var BASE_RATE = PLANS[BASE_PLAN].perMonth;
PLANS.forEach(function(p){
  var pct = Math.round((1 - p.perMonth / BASE_RATE) * 100);
  p.savePct  = pct > 0 ? pct : 0;
  /* what the same coverage would have cost month-to-month, minus what it costs */
  p.saveCash = p.savePct ? (BASE_RATE * p.months) - p.price : 0;
  p.save     = p.savePct ? 'Save ' + p.savePct + '%' : '';
});
var BEST = PLANS.reduce(function(a,b){ return b.savePct > a.savePct ? b : a; });
BEST.save = 'Save ' + BEST.savePct + '% · best deal';

var pAmt = $('#p-amt'), pVal = $('#p-val'), pName = $('#p-name'), pPer = $('#p-per'), pSave = $('#p-save'), pCta = $('#p-cta');
var pPanel = $('#plan-panel');
/* The swap used to sit on a setTimeout(180) with no relation to the 300ms and
   350ms transitions it was meant to land between, so the duration lived in two
   places and any change to one silently desynced the other. It now reads the
   exit's duration straight off --t-1, so the stylesheet stays the one place a
   duration is written and the figure is replaced exactly as the old one
   finishes leaving.

   Deliberately a timer and not 'animationend'. Hanging it off the event was
   the first shape of this and it is wrong for a number: an animation on an
   element the engine is not currently rendering stays pending, and traced
   here it sat pending for 590ms before dispatching start and end 1ms apart.
   The event is a report that painting happened, and the price has to be
   correct whether or not anyone painted it. */
function cssMs(prop, fallback){
  var v = String(getComputedStyle(document.documentElement).getPropertyValue(prop)).trim();
  var n = parseFloat(v);
  if(!isFinite(n)) return fallback;
  return /ms\s*$/.test(v) ? n : n * 1000;      /* CSS time is s unless it says ms */
}
var ROLL_OUT_MS = cssMs('--t-1', 150), ROLL_IN_MS = cssMs('--t-4', 420);
var pPending = null, pRollTimer = 0, pLandTimer = 0;
function commitPrice(){
  if(pPending === null) return;
  pVal.textContent = pPending;
  pPending = null;
  /* Park the new figure below with transitions off, force the reflow that
     commits that state, then drop back to the resting style so the rise is a
     transition from where it now is. All in one synchronous block: waiting a
     frame to remove the parked class would mean the price stays hidden for as
     long as frames are not arriving, which is exactly the failure this whole
     approach exists to avoid. */
  pAmt.classList.remove('roll-out');
  pAmt.classList.add('roll-set');
  void pAmt.offsetWidth;
  pAmt.classList.remove('roll-set');
  clearTimeout(pLandTimer);
  pLandTimer = setTimeout(function(){ pAmt.classList.add('roll-done'); }, ROLL_IN_MS + 80);
}
function rollPrice(v){
  pPending = v;
  /* off and on with a reflow between, so switching plans faster than the roll
     finishes restarts the exit rather than leaving the old figure mid-flight */
  pAmt.classList.remove('roll-out','roll-set','roll-done');
  void pAmt.offsetWidth;
  pAmt.classList.add('roll-out');
  clearTimeout(pRollTimer);
  clearTimeout(pLandTimer);
  pRollTimer = setTimeout(commitPrice, ROLL_OUT_MS + 16);
}
function paintPlan(i, announceIt){
  var d = PLANS[i];
  if(RM) pVal.textContent = d.v;
  else   rollPrice(d.v);
  pName.textContent = d.n;
  pPer.textContent = d.per;
  pSave.style.display = d.save ? '' : 'none';
  pSave.lastChild.textContent = d.save;
  pCta.childNodes[0].nodeValue = BUY_CTA;
  if(announceIt){
    say(d.n + ', ' + money(d.price) + ' ' + d.per.split('/')[1].trim() +
        ', ' + money(d.perMonth) + ' a month' + (d.savePct ? ', saving ' + d.savePct + ' percent' : ''));
  }
}
/* Written from savePct rather than typed into the markup, so the switcher can
   never advertise a discount the price no longer supports. */
$$('#seg button').forEach(function(b){
  var d = PLANS[+b.dataset.p];
  if(!d || !d.savePct) return;
  var s = document.createElement('span');
  s.className = 'segsave';
  s.textContent = 'Save ' + d.savePct + '%';
  b.appendChild(s);
});
$$('#seg button').forEach(function(b){
  b.addEventListener('click', function(){
    $$('#seg button').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on');
    paintPlan(+b.dataset.p, true);
  });
});
paintPlan(4, false);

/* ==========================================================================
   CHECKOUT
   ==========================================================================
   Same overlay contract as the auth panel and the account page: role="dialog",
   the rest of the page inert, Tab trapped, Esc closes, focus returns to the
   trigger. Written against the existing helpers — markField for validation,
   toast for the transient confirmation, say for the live region — so the
   behaviour a keyboard or screen-reader user gets here is the behaviour they
   already learned everywhere else on the page. */
var co = $('#checkout'), coForm = $('#co-form'), coAlert = $('#co-alert');
var coEmail = $('#co-email'), coName = $('#co-name'), coNum = $('#co-num'),
    coExp = $('#co-exp'), coCsc = $('#co-csc');
var coCardFields = $('#co-card-fields'), coOffsite = $('#co-offsite');
var coSubmit = $('#co-submit'), coSubmitLabel = $('#co-submit-label');
var coDone = $('#co-done'), coLastFocus = null, coTrap = trapTab(co);
var coPlan = 4;

/* Every offsite method carries its own note and its own button label, so
   adding one is a row here rather than another arm on a ternary. */
var CO_METHOD_COPY = {
  paypal:    { note:'You will finish paying on PayPal, then come straight back here. Nothing is charged until PayPal confirms.',
               go:'Continue to PayPal' },
  applepay:  { note:'You will confirm with Face ID, Touch ID or your passcode, then come straight back here. Nothing is charged until Apple Pay confirms.',
               go:'Continue to Apple Pay' },
  googlepay: { note:'You will finish paying in Google Pay, then come straight back here. Nothing is charged until Google Pay confirms.',
               go:'Continue to Google Pay' }
};

function coMethod(){
  var on = $('input[name="co-method"]:checked', coForm);
  return on ? on.value : 'card';
}
/* The method governs which fields exist, so it is answered first and the form
   changes under it — rather than collecting card details and then asking. */
function coSyncMethod(){
  var m = coMethod();
  var card = m === 'card';
  coCardFields.style.display = card ? '' : 'none';
  coOffsite.style.display = card ? 'none' : '';
  coOffsite.textContent = card ? '' : CO_METHOD_COPY[m].note;
  var d = PLANS[coPlan];
  coSubmitLabel.textContent = card ? 'Pay ' + money(d.price) : CO_METHOD_COPY[m].go;
}
$$('input[name="co-method"]', coForm).forEach(function(r){
  r.addEventListener('change', coSyncMethod);
});

function coPaint(){
  var d = PLANS[coPlan];
  $('#co-plan').textContent = d.n;
  /* "3-Months" is a label, not a sentence — it has to become "3 months" before
     it can follow the word "every" without reading like a product code */
  var term = d.term.toLowerCase().replace('-', ' ');
  $('#co-term').textContent = 'every ' + term;
  $('#co-per').textContent = money(d.perMonth) + ' / month';
  $('#co-total').textContent = money(d.price);
  $('#co-renew-amt').textContent = money(d.price);
  $('#co-renew-term').textContent = term;
  coSyncMethod();
}

/* ---------- validation ----------
   Every rule names what is wrong and what to do about it. "Invalid input" tells
   someone the form disagrees with them but not how to proceed (3.3.3). */
function coLuhn(s){
  var n = s.replace(/\D/g,''), sum = 0, alt = false;
  for(var i = n.length - 1; i >= 0; i--){
    var v = +n[i];
    if(alt){ v *= 2; if(v > 9) v -= 9; }
    sum += v; alt = !alt;
  }
  return n.length >= 13 && n.length <= 19 && sum % 10 === 0;
}
var CO_FIELDS = {
  email: { input: coEmail, fld: $('#co-fld-email'), err: $('#co-er-email'), test: function(v){
    if(!v) return 'Enter the email address your receipt should go to.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'That address is missing an @ or a domain — check it reads like name@example.com.';
    return '';
  }},
  name: { input: coName, fld: $('#co-fld-name'), err: $('#co-er-name'), card: true, test: function(v){
    if(!v) return 'Enter the name printed on the card.';
    if(v.length < 2) return 'That looks too short — use the full name as printed.';
    return '';
  }},
  num: { input: coNum, fld: $('#co-fld-num'), err: $('#co-er-num'), card: true, test: function(v){
    var digits = v.replace(/\D/g,'');
    if(!digits) return 'Enter your card number.';
    if(digits.length < 13) return 'That is only ' + digits.length + ' digits — a card number has at least 13.';
    if(!coLuhn(digits)) return 'That card number does not check out. Compare it with the card and try again.';
    return '';
  }},
  exp: { input: coExp, fld: $('#co-fld-exp'), err: $('#co-er-exp'), card: true, test: function(v){
    var m = v.match(/^(\d{2})\s*\/?\s*(\d{2})$/);
    if(!v) return 'Enter the expiry date.';
    if(!m) return 'Write the expiry as MM/YY, like 04/28.';
    var mo = +m[1], yr = 2000 + +m[2];
    if(mo < 1 || mo > 12) return 'There is no month ' + m[1] + ' — the first two digits are the month.';
    var now = new Date(2026, 7);      /* fixed clock: this is a static demo */
    if(yr < now.getFullYear() || (yr === now.getFullYear() && mo < now.getMonth() + 1))
      return 'That date has passed. Use a card that is still in date.';
    return '';
  }},
  csc: { input: coCsc, fld: $('#co-fld-csc'), err: $('#co-er-csc'), card: true, test: function(v){
    if(!v) return 'Enter the security code.';
    if(!/^\d{3,4}$/.test(v)) return 'The security code is 3 digits, or 4 on an Amex.';
    return '';
  }}
};
function coActiveFields(){
  var card = coMethod() === 'card';
  return Object.keys(CO_FIELDS).filter(function(k){ return card || !CO_FIELDS[k].card; });
}
function coCheck(key, force){
  var f = CO_FIELDS[key];
  var v = f.input.value.trim();
  /* Nothing is marked wrong before it has been left once — validating as the
     first character lands tells people they are failing while they type. */
  if(!force && !f.touched) return '';
  var msg = f.test(v);
  markField(f.fld, f.input, f.err, msg);
  return msg;
}
Object.keys(CO_FIELDS).forEach(function(k){
  var f = CO_FIELDS[k];
  f.input.addEventListener('blur', function(){ f.touched = true; coCheck(k, true); });
  f.input.addEventListener('input', function(){ if(f.touched) coCheck(k, true); });
});
/* group the card number as it is typed — easier to check against the card, and
   the value is stripped back to digits before anything looks at it */
coNum.addEventListener('input', function(){
  var d = coNum.value.replace(/\D/g,'').slice(0,19);
  coNum.value = d.replace(/(.{4})/g,'$1 ').trim();
});
coExp.addEventListener('input', function(){
  var d = coExp.value.replace(/\D/g,'').slice(0,4);
  coExp.value = d.length > 2 ? d.slice(0,2) + '/' + d.slice(2) : d;
});

function coReset(){
  coAlert.classList.remove('on');
  coAlert.textContent = '';
  Object.keys(CO_FIELDS).forEach(function(k){
    var f = CO_FIELDS[k];
    f.touched = false;
    markField(f.fld, f.input, f.err, '');
  });
  coForm.style.display = '';
  coDone.style.display = 'none';
  coSubmit.classList.remove('is-busy');
  coSubmit.disabled = false;
}

function openCheckout(i){
  if(typeof i === 'number') coPlan = i;
  coLastFocus = document.activeElement;
  coReset();
  coPaint();
  /* 3.3.7 Redundant Entry — the address is already known from signup or from
     the CTA band, so asking for it again is asking someone to re-key data we
     are holding. Prefilled, still editable. */
  if(!coEmail.value){
    /* in priority order: the signed-in identity, then whatever was typed into
       the signup panel, then the CTA band — the same address, wherever the
       person happened to give it to us first */
    var signedIn = document.body.classList.contains('is-auth') ? $('#acct-mail').textContent.trim() : '';
    var known = signedIn ||
                (aEmail && aEmail.value.trim()) ||
                (ctaEmail && ctaEmail.value.trim()) || '';
    if(known) coEmail.value = known;
  }
  co.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setPageInert(co, true);
  document.addEventListener('keydown', coTrap);
  window.setTimeout(function(){ $('#co-title').setAttribute('tabindex','-1'); $('#co-title').focus(); }, RM ? 0 : 120);
  say('Checkout. ' + PLANS[coPlan].n + ', total ' + money(PLANS[coPlan].price) + '.');
}
function closeCheckout(){
  co.classList.remove('is-open');
  document.body.style.overflow = document.body.classList.contains('menu-open') ? 'hidden' : '';
  setPageInert(co, false);
  document.removeEventListener('keydown', coTrap);
  if(coLastFocus && coLastFocus.focus) coLastFocus.focus();
  coLastFocus = null;
}
$('#co-x').addEventListener('click', closeCheckout);
$$('[data-co-close]').forEach(function(el){ el.addEventListener('click', closeCheckout); });
$('#co-change').addEventListener('click', function(){
  closeCheckout();
  var seg = $('#seg-' + coPlan) || $('#seg button');
  var pricing = $('#pricing');
  if(pricing) pricing.scrollIntoView({behavior: RM ? 'auto' : 'smooth', block:'start'});
  window.setTimeout(function(){ if(seg) seg.focus(); }, RM ? 0 : 500);
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && co.classList.contains('is-open')) closeCheckout();
});

coForm.addEventListener('submit', function(e){
  e.preventDefault();
  var active = coActiveFields();
  var firstBad = null;
  active.forEach(function(k){
    CO_FIELDS[k].touched = true;
    if(coCheck(k, true) && !firstBad) firstBad = CO_FIELDS[k].input;
  });
  if(firstBad){
    /* Say how many, then move to the first one. A count turns "something is
       wrong somewhere" into a finite job. */
    var n = active.filter(function(k){ return CO_FIELDS[k].test(CO_FIELDS[k].input.value.trim()); }).length;
    coAlert.textContent = n === 1
      ? 'One field needs fixing before this can go through.'
      : n + ' fields need fixing before this can go through.';
    coAlert.classList.add('on');
    firstBad.focus();
    return;
  }
  coSubmit.classList.add('is-busy');
  coSubmit.disabled = true;
  coAlert.classList.remove('on');
  coAlert.textContent = '';
  say('Taking payment, one moment.');

  window.setTimeout(function(){
    /* Static page: a card ending 0000 fails so the decline path is reachable
       and reviewable. Everything else succeeds. */
    var declined = coMethod() === 'card' && /0000\s*$/.test(coNum.value.trim());
    coSubmit.classList.remove('is-busy');
    coSubmit.disabled = false;
    if(declined){
      coAlert.textContent = 'Your bank declined the payment. Nothing has been charged. Check the number and expiry, or try another card or PayPal.';
      coAlert.classList.add('on');
      coNum.focus();
      return;
    }
    var d = PLANS[coPlan];
    coForm.style.display = 'none';
    coDone.style.display = '';
    $('#co-done-body').textContent =
      d.n + ' is active. We sent the receipt and your licence key to ' + coEmail.value.trim() +
      '. It renews at ' + money(d.price) + ' on 11 August 2027 unless you cancel first.';
    $('#co-done-title').focus();
    toast('Payment received — your plan is active', 'ok');
    if(typeof signInAs === 'function' && !document.body.classList.contains('is-auth')){
      signInAs(coEmail.value.trim());
    }
  }, RM ? 0 : 1400);
});
$('#co-done-go').addEventListener('click', function(){
  closeCheckout();
  window.setTimeout(function(){ openAccount('subscription'); }, 80);
});

$$('#seg button').forEach(function(b){
  b.addEventListener('click', function(){ coPlan = +b.dataset.p; });
});

/* ---------- comparison table ----------
   Five plans one at a time is enough to pick from and not enough to choose
   between: a percentage only means something next to the thing it is a
   percentage of. */
var cmpBody = $('#cmp-body'), cmp = $('#cmp'), cmpBtn = $('#cmp-btn'), cmpBtnLabel = $('#cmp-btn-label');
$('#cmp-base').textContent = PLANS[BASE_PLAN].short.toLowerCase().replace(' ', '-');
cmpBody.innerHTML = PLANS.map(function(p, i){
  var saving = p.savePct
    ? '<span class="sv">Save ' + p.savePct + '%<br><span style="font-weight:500;font-size:var(--fs-200)">' + money(p.saveCash) + ' over the term</span></span>'
    : '<span class="sv none">' + (i === BASE_PLAN ? 'Baseline rate' : '—') + '</span>';
  return '<tr' + (p === BEST ? ' class="is-best"' : '') + '>' +
      '<th scope="row" class="plan">' + p.short + (p === BEST ? ' <span class="ac-tag good" style="font-size:10px;padding:4px 8px;margin-left:6px">Best deal</span>' : '') + '</th>' +
      '<td class="mo">' + money(p.perMonth) + '</td>' +
      '<td class="tot">' + money(p.price) + ' <span style="color:var(--muted)">once</span></td>' +
      '<td>' + saving + '</td>' +
      '<td class="pick"><button type="button" class="btn btn-ghost" data-pick="' + i + '">Choose</button></td>' +
    '</tr>';
}).join('');
cmpBody.addEventListener('click', function(e){
  var b = e.target.closest('[data-pick]');
  if(!b) return;
  var i = +b.dataset.pick;
  var tab = $('#seg-' + i);
  if(tab) tab.click();
  /* send them back to the card they just chose, and put focus on it, so the
     choice does not silently happen off-screen */
  pPanel.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block:'center' });
  if(tab) tab.focus();
});
cmpBtn.addEventListener('click', function(){
  var open = !cmp.classList.contains('on');
  cmp.classList.toggle('on', open);
  cmpBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  cmpBtnLabel.textContent = open ? 'Hide the comparison' : 'Compare all five plans';
  say(open ? 'Plan comparison shown, five plans' : 'Plan comparison hidden');
});

/* ---------- faq: split master / detail ---------- */
var qsplit = $('#qsplit'), qpanel = $('#qpanel');
/* [data-off] rows are out of the FAQ, not just off screen. Everything below
   counts, searches, paints and arrow-keys through qrows, so dropping them here
   is the one place that has to know — the total, the search and the keyboard
   walk all follow from it. */
var qrows = $$('.qrow', qsplit).filter(function(r){ return !r.hasAttribute('data-off'); });
var qpCount = $('#qp-count'), qpCat = $('#qp-cat'), qpQ = $('#qp-q'), qpA = $('#qp-a'), qpGhost = $('#qp-ghost');
var qTotal = ('0'+qrows.length).slice(-2), qActive = 0;
function paintQ(i){
  var r = qrows[i], num = ('0'+(i+1)).slice(-2);
  qpCount.textContent = num + ' / ' + qTotal;
  qpCat.textContent = r.dataset.cat;
  qpQ.textContent = $('.qt', r).textContent;
  qpA.textContent = $('.qinline p', r).textContent;
  qpGhost.textContent = num;
  /* the panel scrolls internally once an answer outruns a short window, and
     that offset is the old answer's, not the new one's — every question opens
     at its first line */
  qpanel.scrollTop = 0;
}
function setQ(i, instant){
  qActive = i;
  qrows.forEach(function(r, j){
    r.classList.toggle('is-on', j === i);
    $('.qitem', r).setAttribute('aria-expanded', j === i ? 'true' : 'false');
  });
  if(instant || RM){ paintQ(i); return; }
  qpanel.classList.add('swap');
  setTimeout(function(){ paintQ(i); qpanel.classList.remove('swap'); }, 200);
}
qrows.forEach(function(r, i){
  $('.qitem', r).addEventListener('click', function(){ if(i !== qActive) setQ(i); });
});
qsplit.addEventListener('keydown', function(e){
  if(['ArrowDown','ArrowUp','Home','End'].indexOf(e.key) === -1) return;
  /* only when the caret is actually on a question — otherwise Arrow keys inside
     the answer panel would jump the list out from under the reader */
  if(!document.activeElement || !document.activeElement.classList.contains('qitem')) return;
  /* search may have hidden most of the list; walk what is on screen */
  var live = qrows.filter(function(r){ return !r.hidden; });
  if(live.length < 2) return;
  e.preventDefault();
  var here = live.indexOf(qrows[qActive]);
  if(here === -1) here = 0;
  var j = e.key === 'Home' ? 0
        : e.key === 'End'  ? live.length - 1
        : e.key === 'ArrowDown' ? (here + 1) % live.length
        :                         (here - 1 + live.length) % live.length;
  var target = live[j];
  setQ(qrows.indexOf(target));
  $('.qitem', target).focus();
});
setQ(0, true);

/* ---------- cta spotlight ---------- */
var cta = $('#cta');
cta.addEventListener('mousemove', function(e){
  if(RM) return;
  var r = cta.getBoundingClientRect();
  cta.style.setProperty('--mx', (e.clientX-r.left)+'px');
  cta.style.setProperty('--my', (e.clientY-r.top)+'px');
});

/* ---------- chat fab ---------- */
var fab = $('#fab');
$('#fabtoggle').addEventListener('click', function(e){
  e.stopPropagation();
  var on = fab.classList.toggle('on');
  this.setAttribute('aria-expanded', on ? 'true' : 'false');
});
document.addEventListener('click', function(){
  if(!fab.classList.contains('on')) return;
  fab.classList.remove('on');
  $('#fabtoggle').setAttribute('aria-expanded','false');
});
document.addEventListener('keydown', function(e){
  if(e.key !== 'Escape' || !fab.classList.contains('on')) return;
  fab.classList.remove('on');
  $('#fabtoggle').setAttribute('aria-expanded','false');
  $('#fabtoggle').focus();
});
/* 2.4.11 Focus Not Obscured. The FAB is fixed over the bottom-right corner and
   sat squarely on top of the footer's "Chat on Telegram" link — tabbing there
   put the focus ring completely behind the button, so a keyboard user could not
   see where they were. A tab walkthrough is the only thing that finds this: the
   markup is fine and both elements pass on their own.
   The FAB steps aside while anything underneath it holds focus, and comes back
   the moment focus leaves. */
function fabYield(){
  var t = document.activeElement;
  if(!t || t === document.body || fab.contains(t)){ fab.classList.remove('yield'); return; }
  var f = fab.getBoundingClientRect(), r = t.getBoundingClientRect();
  fab.classList.toggle('yield',
    r.left < f.right && r.right > f.left && r.top < f.bottom && r.bottom > f.top);
}
document.addEventListener('focusin', fabYield);
document.addEventListener('focusout', function(){ fab.classList.remove('yield'); });
/* Re-checked on scroll, not only on focus. focusin fires before the browser
   scrolls the new element into view, so the first measurement uses the geometry
   the element had *before* it moved — it read as clear of the button and then
   slid underneath it. Checking again once the scroll lands is what makes this
   hold for the tall cards, which is exactly where it was failing. */
window.addEventListener('scroll', fabYield, {passive:true});

/* ---------- auth modal ---------- */
var auth = $('#auth'), aForm = $('#auth-form'), aDone = $('#auth-done');
var aTitle = $('#auth-title'), aSub = $('#auth-sub'), aFine = $('#auth-fine'), aTerms = $('#auth-terms');
var aEmail = $('#au-email'), aPass = $('#au-pass'), aConfirm = $('#au-confirm');
var fldEmail = $('#fld-email'), fldPass = $('#fld-pass'), fldConfirm = $('#fld-confirm');
var aForgot = $('#auth-forgot'), aTabs = $('#auth-tabs'), aGoogle = $('#auth-google'), aOr = $('#auth-or');
var aHint = $('#auth-hint');
var aSubmitLabel = $('#au-submit-label'), aGoogleLabel = $('#auth-google-label');
var aView = 'in', aLastFocus = null;

/* Four views share one form. Each one declares which fields it wants rather
   than the form branching on "is this the register view" in five places. */
var AUTH_COPY = {
  in: { title:'Sign in to your account', sub:'High-speed and secure Russian VPN that protects your privacy.',
        google:'Continue with Google', submit:'Sign in', passHint:'',
        fields:{ email:1, pass:1 }, social:1, tabs:1, forgot:1,
        passLabel:'Password', passHold:'Enter your password', passAuto:'current-password',
        fine:'Don\'t have an account? <button type="button" class="lnk" data-view="up">Register</button>' },

  up: { title:'Create your account', sub:'Security. Privacy. Freedom. For everyone.',
        google:'Sign up with Google', submit:'Create Account',
        fields:{ email:1, pass:1, confirm:1 }, social:1, tabs:1, terms:1,
        passLabel:'Password', passHold:'Password must be at least 6 characters', passAuto:'new-password',
        passHint:'At least 6 characters. Longer beats complicated.',
        confirmLabel:'Confirm Password', confirmHold:'Confirm your password',
        fine:'Already have an account? <button type="button" class="lnk" data-view="in">Sign in</button>' },

  reset: { title:'Forgot your password?', sub:'Enter the email you signed up with and we will send you a link to set a new one.',
        submit:'Send reset link',
        fields:{ email:1 },
        hint:'The link is good for <b>60 minutes</b>. If it expires, just ask for another one.',
        fine:'Remembered it? <button type="button" class="lnk" data-view="in">Back to sign in</button>' },

  newpw: { title:'Set a new password', sub:'Almost done. Pick a password you have not used on VesperVPN before.',
        submit:'Save new password',
        fields:{ pass:1, confirm:1 },
        passLabel:'New password', passHold:'At least 6 characters', passAuto:'new-password',
        passHint:'At least 6 characters, and not one you have used on VesperVPN before.',
        confirmLabel:'Confirm new password', confirmHold:'Type it once more',
        hint:'Signing out of every device you are currently logged in on.',
        fine:'<button type="button" class="lnk" data-view="in">Back to sign in</button>' }
};

function show(el, on){ el.style.display = on ? '' : 'none'; }

/* ==========================================================================
   VALIDATION — WCAG 3.3.1 Error Identification / 3.3.3 Error Suggestion
   ==========================================================================
   The form used to check nothing until you pressed the button, then turned a
   border red. Three things were missing and all three are the difference
   between "an error happened" and "here is how to fix it":

     · the error is text, and it names the fix, not just the fault
     · aria-invalid + aria-describedby put that text on the field itself, so it
       is read when you land there rather than only seen if you look
     · a summary at the top lists everything wrong with links to each field, for
       the case where the first broken field is off-screen

   Timing follows "reward early, punish late": a field is checked when you leave
   it, and once it is wrong it is re-checked on every keystroke so the error
   disappears the moment you fix it — never while you are still mid-word. */
var ALERT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3l9 16H3l9-16z"/><path d="M12 9v4M12 16.4h.01"/></svg>';
var OK_ICON    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 6.5 9.5 17 4 11.5"/></svg>';

function showAlert(el, kind, html){
  el.className = 'f-alert f-alert--' + kind + ' on';
  el.innerHTML = (kind === 'ok' ? OK_ICON : ALERT_ICON) + '<div>' + html + '</div>';
}
function hideAlert(el){ el.className = 'f-alert f-alert--bad'; el.innerHTML = ''; }

function setBusy(form, btn, on){
  if(btn){
    btn.classList.toggle('is-busy', on);
    /* aria-disabled, not disabled: a disabled button drops out of the tab order
       and the focus you were on vanishes mid-submit */
    if(on) btn.setAttribute('aria-disabled','true'); else btn.removeAttribute('aria-disabled');
  }
  if(form) form.setAttribute('aria-busy', on ? 'true' : 'false');
}

/* Generic field marker, shared by the auth form and the change-password form. */
function markField(fld, input, err, msg){
  if(msg){
    fld.classList.add('bad');
    fld.classList.remove('good');
    err.textContent = msg;
    input.setAttribute('aria-invalid','true');
  }else{
    fld.classList.remove('bad');
    err.textContent = '';
    input.removeAttribute('aria-invalid');
    fld.classList.toggle('good', !!input.value);
  }
}
/* wires blur/input on a field so it self-corrects */
function liveValidate(fld, input, err, check){
  input.addEventListener('blur', function(){ markField(fld, input, err, check()); });
  input.addEventListener('input', function(){
    if(fld.classList.contains('bad')) markField(fld, input, err, check());
    else fld.classList.remove('good');
  });
}

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

var AUTH_F = {
  email:   { fld:fldEmail,   input:aEmail,   err:null, label:'Email address' },
  pass:    { fld:fldPass,    input:aPass,    err:null, label:'Password' },
  confirm: { fld:fldConfirm, input:aConfirm, err:null, label:'Confirm password' }
};
AUTH_F.email.err   = $('#er-email');
AUTH_F.pass.err    = $('#er-pass');
AUTH_F.confirm.err = $('#er-confirm');

function checkAuth(key){
  var d = AUTH_COPY[aView];
  if(!d.fields[key]) return null;                    /* not on screen in this view */
  var v = AUTH_F[key].input.value;
  if(key === 'email'){
    if(!v.trim()) return 'Enter the email address you use for VesperVPN';
    if(!EMAIL_RE.test(v.trim())) return 'That is not a complete email address — check for a missing @ or a typo after the dot';
  }
  if(key === 'pass'){
    if(!v) return 'Enter your password';
    /* only enforce length where we are *setting* one. On sign-in the server
       decides, and "too short" would leak the rule to someone guessing. */
    if((aView === 'up' || aView === 'newpw') && v.length < 6) return 'Use at least 6 characters';
  }
  if(key === 'confirm'){
    if(!v) return 'Type the password a second time to confirm it';
    if(v !== aPass.value) return 'The two passwords do not match';
  }
  return null;
}
function clearErr(){
  Object.keys(AUTH_F).forEach(function(k){
    var f = AUTH_F[k];
    f.fld.classList.remove('bad','good');
    f.err.textContent = '';
    f.input.removeAttribute('aria-invalid');
  });
  hideAlert($('#auth-alert'));
}
Object.keys(AUTH_F).forEach(function(k){
  var f = AUTH_F[k];
  liveValidate(f.fld, f.input, f.err, function(){ return checkAuth(k); });
});

/* Validates every field the current view actually shows and, if anything is
   wrong, publishes the summary and moves focus to the first offender. */
function validateAuth(){
  var bad = [];
  Object.keys(AUTH_F).forEach(function(k){
    var msg = checkAuth(k);
    markField(AUTH_F[k].fld, AUTH_F[k].input, AUTH_F[k].err, msg);
    if(msg) bad.push({ key:k, msg:msg });
  });
  var alertEl = $('#auth-alert');
  if(!bad.length){ hideAlert(alertEl); return true; }
  var lead = bad.length === 1 ? 'One thing needs fixing' : bad.length + ' things need fixing';
  showAlert(alertEl, 'bad', '<b>' + lead + '</b><ul>' + bad.map(function(b){
    return '<li><a href="#' + AUTH_F[b.key].input.id + '" data-goto="' + AUTH_F[b.key].input.id + '">' +
           AUTH_F[b.key].label + ' — ' + b.msg + '</a></li>';
  }).join('') + '</ul>');
  shout(lead + '. ' + bad.map(function(b){ return AUTH_F[b.key].label + ', ' + b.msg; }).join('. '));
  AUTH_F[bad[0].key].input.focus();
  return false;
}
/* the summary entries are jump links, so a long form does not make you hunt */
document.addEventListener('click', function(e){
  var g = e.target.closest('[data-goto]');
  if(!g) return;
  e.preventDefault();
  var t = document.getElementById(g.dataset.goto);
  if(t) t.focus();
});

function setView(v){
  aView = v;
  var d = AUTH_COPY[v], f = d.fields;
  $$('#auth-tabs button').forEach(function(b){
    var on = b.dataset.view === v;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
    b.tabIndex = on ? 0 : -1;
  });
  aTitle.textContent = d.title;
  aSub.textContent = d.sub;
  aSubmitLabel.textContent = d.submit;
  aFine.innerHTML = d.fine;

  show(aTabs, d.tabs);
  show(aGoogle, d.social);
  show(aOr, d.social);
  if(d.social) aGoogleLabel.textContent = d.google;

  show(fldEmail, f.email);
  show(fldPass, f.pass);
  show(fldConfirm, f.confirm);
  show(aForgot, d.forgot);
  show(aTerms, d.terms);

  aHint.innerHTML = d.hint || '';
  show(aHint, !!d.hint);

  if(f.pass){
    $('#lbl-pass').textContent = d.passLabel;
    aPass.placeholder = d.passHold;
    aPass.setAttribute('autocomplete', d.passAuto);
    /* 3.3.2: the rule is stated before you can break it, not after */
    $('#hint-pass').textContent = d.passHint || '';
  }
  if(f.confirm){
    $('#lbl-confirm').textContent = d.confirmLabel;
    aConfirm.placeholder = d.confirmHold;
  }
  /* a password typed on the sign-in screen must not follow you into the reset
     flow and sit there pre-filled as your "new" one */
  if(v === 'reset' || v === 'newpw'){ aPass.value = ''; aConfirm.value = ''; }
  clearErr();
}

/* it behaves like a real page: the URL changes and browser Back returns to the site */
var AUTH_HASH = { in:'#sign-in', up:'#create-account', reset:'#forgot-password', newpw:'#set-new-password' };
var authTrap = trapTab(auth);
function firstField(){
  var d = AUTH_COPY[aView];
  if(!d.fields.email) return aPass;
  return aEmail.value ? (d.fields.pass ? aPass : aEmail) : aEmail;
}
function openAuth(v, email, silent){
  if(!AUTH_COPY[v]) v = 'in';
  aLastFocus = document.activeElement;
  aForm.style.display = '';
  aDone.style.display = 'none';
  setView(v);
  /* 3.3.7 Redundant Entry. The email survives a view switch and survives closing
     and reopening, because the field is never reset. The gap was the other
     entrance: typing into the CTA band and then clicking a pricing button
     instead of submitting it: the address was on screen, and the panel asked
     for it again anyway. Carry whatever has already been typed. */
  if(email) aEmail.value = email;
  else if(!aEmail.value && ctaEmail && ctaEmail.value.trim()) aEmail.value = ctaEmail.value.trim();
  auth.classList.add('is-open');
  auth.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  /* aria-modal="true" was already declared here; this is what makes it true.
     Without it Tab walked straight out of the "modal" into the page behind. */
  setPageInert(auth, true);
  document.addEventListener('keydown', authTrap);
  if(!silent) history.pushState({ rvAuth:v }, '', AUTH_HASH[v]);
  setTimeout(function(){ firstField().focus(); }, RM ? 0 : 300);
}
function closeAuth(silent){
  auth.classList.remove('is-open');
  document.body.style.overflow = document.body.classList.contains('menu-open') ? 'hidden' : '';
  setPageInert(auth, false);
  document.removeEventListener('keydown', authTrap);
  /* 2.4.3 — focus goes back to whatever opened this, not to the top of the page.
     Via restoreFocus because the opener is often not there any more: the Login
     link that raised this panel is hidden by the time a successful sign-in
     closes it, and the sheet's copy of that link is hidden the moment the sheet
     shuts behind you. */
  restoreFocus(aLastFocus, AUTH_FALLBACK);
  aLastFocus = null;
  if(silent) return;
  if(history.state && history.state.rvAuth) history.back();
  else history.replaceState(null, '', location.pathname + location.search);
}
window.addEventListener('popstate', function(){
  var s = history.state;
  if(s && s.rvAuth) openAuth(s.rvAuth, null, true);
  else if(auth.classList.contains('is-open')) closeAuth(true);
});

document.addEventListener('click', function(e){
  /* Every purchase CTA lands here — the pricing button and both "Try VesperVPN
     Now" buttons. They used to carry data-auth="up", which meant that once you
     were signed in, asking to buy re-opened a *registration* form: the page was
     inviting someone who already had an account to make a second one. */
  var buy = e.target.closest('[data-buy]');
  if(buy){ e.preventDefault(); openCheckout(coPlan); return; }

  var open = e.target.closest('[data-auth]');
  if(open){
    e.preventDefault();
    /* Signed in already? Then a sign-in form is never the answer. The nav and
       the mobile sheet hide their Login links once you are authenticated, but
       the footer's "My Account" does not — and it was opening the login panel
       for someone who was already logged in. Send them where they were asking
       to go. */
    if(document.body.classList.contains('is-auth')){ openAccount('overview'); return; }
    openAuth(open.dataset.auth);
    return;
  }
  if(e.target.closest('[data-close]')){ e.preventDefault(); closeAuth(); return; }
  var tab = e.target.closest('[data-view]');
  if(tab && auth.contains(tab)){
    e.preventDefault();
    var v = tab.dataset.view;
    aForm.style.display = '';
    aDone.style.display = 'none';
    setView(v);
    auth.scrollTop = 0;
    history.replaceState({ rvAuth:v }, '', AUTH_HASH[v]);
    firstField().focus();
  }
});
document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && auth.classList.contains('is-open')) closeAuth(); });

$('#au-peek').addEventListener('click', function(){
  var reveal = aPass.type === 'password';
  aPass.type = reveal ? 'text' : 'password';
  if(aConfirm) aConfirm.type = aPass.type;
  /* the button's job never changes, only whether it is currently pressed —
     so the state moves to aria-pressed and the name stays put (4.1.2) */
  this.setAttribute('aria-pressed', reveal ? 'true' : 'false');
  say(reveal ? 'Password shown' : 'Password hidden');
});

/* ---------- signed-in state: the nav swaps once you come back to the site ---------- */
var acct = $('#acct'), acctBtn = $('#acct-btn');
function signInAs(mail){
  var local = mail.split('@')[0], ini = (mail.charAt(0) || '?').toUpperCase();
  document.body.classList.add('is-auth');
  $('#acct-name').textContent = local.length > 12 ? local.slice(0, 12) + '…' : local;
  $('#acct-mail').textContent = mail;
  $('#sheet-mail').textContent = mail;
  /* the account page reads the same identity, so it is never out of step */
  $('#ac-name').textContent = local;
  $('#ac-hello').textContent = local;
  $('#ac-mail').textContent = mail;
  $('#ac-bill-mail').textContent = mail;
  ['#acct-ava','#acct-ava2','#acct-ava3','#ac-ava','#ac-ava2'].forEach(function(s){ var el = $(s); if(el) el.textContent = ini; });
}
function signOut(){
  document.body.classList.remove('is-auth');
  acct.classList.remove('on');
  acctBtn.setAttribute('aria-expanded','false');
}
acctBtn.addEventListener('click', function(e){
  e.stopPropagation();
  /* below 1180 the dropdown is hidden by CSS, so the avatar goes straight
     into the account page instead of opening a menu that cannot be seen */
  if(window.innerWidth <= 1180){ openAccount('overview'); return; }
  var on = acct.classList.toggle('on');
  acctBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
});
document.addEventListener('click', function(){
  if(!acct.classList.contains('on')) return;
  acct.classList.remove('on');
  acctBtn.setAttribute('aria-expanded','false');
});
$$('.acct-menu a').forEach(function(a){ a.addEventListener('click', function(){ acct.classList.remove('on'); }); });
$('#acct-out').addEventListener('click', signOut);
$('#sheet-out').addEventListener('click', function(){
  signOut();
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
});

/* ---------- my account ----------
   same shape as the auth page: a full-screen view with its own URL, and one
   panel per feature instead of a modal stack you have to back out of. */
var acPage = $('#account'), acLastFocus = null, acTrap = null;
var AC_HASH = {
  overview:'#account', subscription:'#subscription', billing:'#billing',
  devices:'#devices', security:'#security', notifications:'#notifications', support:'#support'
};
var acTabs = $('#ac-tabs');
acTrap = trapTab(acPage);
/* on phones the tabs are a scrolling row, so the fade hint has to know whether
   there is anything left to scroll to, and the active chip has to come to you */
function tabsOverflow(){
  acTabs.classList.toggle('can-scroll', acTabs.scrollWidth - acTabs.clientWidth - acTabs.scrollLeft > 4);
}
acTabs.addEventListener('scroll', tabsOverflow, { passive:true });
window.addEventListener('resize', tabsOverflow);

function setPanel(p){
  if(!AC_HASH[p]) p = 'overview';
  var live = null;
  $$('#ac-tabs .ac-link').forEach(function(b){
    var on = b.dataset.panel === p;
    b.classList.toggle('on', on);
    /* deep links and the account menu reach this without a click on the tab, so
       the aria state is set here too rather than only in the tablist handler */
    b.setAttribute('aria-selected', on ? 'true' : 'false');
    b.tabIndex = on ? 0 : -1;
    if(on) live = b;
  });
  $$('.ac-panel', acPage).forEach(function(s){ s.classList.toggle('on', s.dataset.p === p); });
  acPage.scrollTop = 0;
  /* centre, not nearest: "nearest" parks the active chip right under the fade
     at the edge, which is the one chip you most need to be able to read */
  if(live && live.scrollIntoView) live.scrollIntoView({ block:'nearest', inline:'center', behavior:RM ? 'auto' : 'smooth' });
  tabsOverflow();
  return p;
}
function openAccount(p, silent){
  if(!document.body.classList.contains('is-auth')){ openAuth('in'); return; }
  acLastFocus = document.activeElement;
  acPage.classList.add('is-open');
  p = setPanel(p);
  document.body.style.overflow = 'hidden';
  setPageInert(acPage, true);
  document.addEventListener('keydown', acTrap);
  /* the panel that just appeared is where you are, so put focus on it — its
     heading is the first thing read rather than the brand mark up in the bar */
  var panel = $('#acp-' + p);
  if(panel) window.setTimeout(function(){ panel.focus(); }, RM ? 0 : 120);
  if(!silent) history.pushState({ rvAcct:p }, '', AC_HASH[p]);
}
function closeAccount(silent){
  acPage.classList.remove('is-open');
  document.body.style.overflow = document.body.classList.contains('menu-open') ? 'hidden' : '';
  setPageInert(acPage, false);
  document.removeEventListener('keydown', acTrap);
  /* same fault as the auth panel: the account page is routinely opened from the
     account menu, which is closed by the time you come back out of it */
  restoreFocus(acLastFocus, AUTH_FALLBACK);
  acLastFocus = null;
  if(silent) return;
  if(history.state && history.state.rvAcct) history.back();
  else history.replaceState(null, '', location.pathname + location.search);
}
window.addEventListener('popstate', function(){
  var s = history.state;
  if(s && s.rvAcct) openAccount(s.rvAcct, true);
  else if(acPage.classList.contains('is-open')) closeAccount(true);
});

document.addEventListener('click', function(e){
  var go = e.target.closest('[data-account]');
  if(go){
    e.preventDefault();
    acct.classList.remove('on');
    if(document.body.classList.contains('menu-open')){
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded','false');
    }
    openAccount(go.dataset.account);
    return;
  }
  var acClose = e.target.closest('[data-ac-close]');
  if(acClose){
    e.preventDefault();
    /* "Download the app" and "Open FAQ" close the page AND take you there.
       closing rewinds the URL first, so the jump waits for that to settle. */
    var href = acClose.getAttribute('href');
    closeAccount();
    if(href && href.charAt(0) === '#'){
      setTimeout(function(){
        if(href === '#top'){ window.scrollTo({ top:0, behavior:RM ? 'auto' : 'smooth' }); return; }
        var t = document.querySelector(href);
        if(t) t.scrollIntoView({ behavior:RM ? 'auto' : 'smooth', block:'start' });
      }, 380);
    }
    return;
  }
  var tab = e.target.closest('[data-panel]');
  if(tab && acPage.contains(tab)){
    var p = setPanel(tab.dataset.panel);
    history.replaceState({ rvAcct:p }, '', AC_HASH[p]);
  }
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && acPage.classList.contains('is-open')) closeAccount();
});
$('#ac-out').addEventListener('click', function(){ signOut(); closeAccount(); });

/* every switch on the page behaves the same, so wire them in one pass */
$$('.sw', acPage).forEach(function(sw){
  sw.addEventListener('click', function(){
    var on = sw.classList.toggle('on');
    sw.setAttribute('aria-checked', on ? 'true' : 'false');
    if(sw.id === 'ac-auto'){
      $('#ac-auto-note').textContent = on
        ? 'On. We will charge $47.99 on 6 Aug 2027 and your access carries on without a gap.'
        : 'Off. Premium access remains active until 6 Aug 2027. Your subscription will not renew after this date.';
      $('#ac-renew-note').textContent = on ? 'Auto-renewal is on' : 'Auto-renewal is off';
      $('#ac-sub-endlabel').textContent = on ? 'Renews' : 'Ends';
    }
  });
});

/* devices: the counter, the meter and the free-slot line all follow the list */
function refreshDevices(){
  var n = $$('#ac-dev-list [data-device]').length;
  $('#ac-dev-n').textContent = n;
  $('#ac-dev-count').textContent = n;
  $('#ac-dev-free').textContent = (5 - n) + ' free';
  $('#ac-dev-bar').style.width = (n / 5 * 100) + '%';
  $('#ac-dev-pip').style.display = n > 1 ? '' : 'none';
}
$('#ac-dev-list').addEventListener('click', function(e){
  var b = e.target.closest('[data-signout]');
  if(!b) return;
  var row = b.closest('[data-device]');
  row.style.transition = 'opacity .3s, transform .3s';
  row.style.opacity = 0;
  row.style.transform = 'translateX(-10px)';
  setTimeout(function(){ row.remove(); refreshDevices(); }, 300);
});
$('#ac-dev-all').addEventListener('click', function(){
  var n = $$('#ac-dev-list [data-device]').length - 1;
  openDialog({
    kind:'warn',
    title:'Sign out other devices?',
    body:'This signs out <b>' + n + ' device' + (n === 1 ? '' : 's') + '</b> and leaves this one signed in. ' +
         'Anyone using them will need your password to get back on.',
    actions:[
      { label:'Leave them signed in', style:'btn-ghost' },
      { label:'Sign them out', style:'btn-red', act:function(){
          $$('#ac-dev-list [data-device]').forEach(function(row, i){ if(i > 0) row.remove(); });
          refreshDevices();
          $('#ac-dev-ok').classList.add('on');
          toast(n + ' device' + (n === 1 ? '' : 's') + ' signed out.', 'ok');
          $('#ac-dev-all').focus();
        } }
    ]
  });
});
refreshDevices();

/* ---------- destructive actions ----------
   All three go through the same dialog: what it does, what you keep, what it
   costs, and a way out that is the default focus. Cancelling is reversible and
   says so; deleting is not and says that too. */
$('#ac-cancel').addEventListener('click', function(){
  openDialog({
    kind:'warn',
    title:'Cancel your subscription?',
    body:'You keep every premium feature until <b>6 Aug 2027</b> — nothing switches off today. ' +
         'After that your subscription ends, your account remains available, and you can resubscribe at any time.',
    actions:[
      { label:'Keep my plan', style:'btn-ghost' },
      { label:'Cancel subscription', style:'btn-red', act:function(){
          $('#ac-cancel-ok').classList.add('on');
          var tag = $('#ac-sub-state');
          tag.textContent = 'Cancels 6 Aug 2027';
          tag.classList.remove('good'); tag.classList.add('warn');
          $('#ac-sub-endlabel').textContent = 'Ends';
          $('#ac-renew-note').textContent = 'Will not renew';
          var auto = $('#ac-auto');
          auto.classList.remove('on'); auto.setAttribute('aria-checked','false');
          $('#ac-auto-note').textContent = 'Off. Premium access remains active until 6 Aug 2027. Your subscription will not renew after this date.';
          toast('Subscription cancelled. Premium stays on until 6 Aug 2027.', 'ok');
          $('#ac-cancel').focus();
        } }
    ]
  });
});

$('#ac-del').addEventListener('click', function(){
  openDialog({
    kind:'danger',
    title:'Delete your account?',
    body:'This removes the account, every device signed in on it, and your invoice history. ' +
         '<b>It cannot be undone</b>, and the time left on your plan is not refunded.<br><br>' +
         'If you only want the billing to stop, cancelling the subscription keeps your account and your invoices.',
    actions:[
      { label:'Keep my account', style:'btn-ghost' },
      { label:'Delete everything', style:'btn-red', act:function(){ signOut(); closeAccount(); toast('Account deleted.', 'ok'); } }
    ]
  });
});

/* change password: the same rules and the same timing the auth page uses, so a
   form inside the account never behaves differently from one outside it */
var acPwForm = $('#ac-pw-form'), acPwBtn = $('button[type="submit"]', acPwForm), acPwAlert = $('#ac-pw-alert');
var PW_F = {
  cur:   { fld:$('#fld-cur'),   input:$('#ac-cur'),   err:$('#er-cur'),   label:'Current password' },
  new:   { fld:$('#fld-new'),   input:$('#ac-new'),   err:$('#er-new'),   label:'New password' },
  again: { fld:$('#fld-again'), input:$('#ac-again'), err:$('#er-again'), label:'Confirm new password' }
};
function checkPw(k){
  var v = PW_F[k].input.value;
  if(k === 'cur'   && !v) return 'Enter the password you use now';
  if(k === 'new'){
    if(!v) return 'Enter the password you want to switch to';
    if(v.length < 6) return 'Use at least 6 characters';
    if(v === PW_F.cur.input.value) return 'This is your current password — pick a different one';
  }
  if(k === 'again'){
    if(!v) return 'Type the new password a second time to confirm it';
    if(v !== PW_F.new.input.value) return 'The two passwords do not match';
  }
  return null;
}
Object.keys(PW_F).forEach(function(k){
  var f = PW_F[k];
  liveValidate(f.fld, f.input, f.err, function(){ return checkPw(k); });
});
acPwForm.addEventListener('submit', function(e){
  e.preventDefault();
  if(acPwBtn.getAttribute('aria-disabled') === 'true') return;
  $('#ac-pw-ok').classList.remove('on');

  var bad = [];
  Object.keys(PW_F).forEach(function(k){
    var msg = checkPw(k);
    markField(PW_F[k].fld, PW_F[k].input, PW_F[k].err, msg);
    if(msg) bad.push({ key:k, msg:msg });
  });
  if(bad.length){
    var lead = bad.length === 1 ? 'One thing needs fixing' : bad.length + ' things need fixing';
    showAlert(acPwAlert, 'bad', '<b>' + lead + '</b><ul>' + bad.map(function(b){
      return '<li><a href="#' + PW_F[b.key].input.id + '" data-goto="' + PW_F[b.key].input.id + '">' +
             PW_F[b.key].label + ' — ' + b.msg + '</a></li>';
    }).join('') + '</ul>');
    shout(lead + '. ' + bad.map(function(b){ return PW_F[b.key].label + ', ' + b.msg; }).join('. '));
    PW_F[bad[0].key].input.focus();
    return;
  }
  hideAlert(acPwAlert);

  setBusy(acPwForm, acPwBtn, true);
  window.setTimeout(function(){
    setBusy(acPwForm, acPwBtn, false);
    acPwForm.reset();
    Object.keys(PW_F).forEach(function(k){ PW_F[k].fld.classList.remove('good','bad'); });
    $('#ac-pw-ok').classList.add('on');
    say('Password updated. Other devices have been signed out.');
    $$('#ac-dev-list [data-device]').forEach(function(row, i){ if(i > 0) row.remove(); });
    refreshDevices();
  }, RM ? 0 : 850);
});

$('#ac-chat').addEventListener('click', function(){
  closeAccount();
  setTimeout(function(){ $('#fab').classList.add('on'); }, 400);
});

/* the done screen doubles as the step between "we sent you a link" and
   "set a new password", so it can carry the next step instead of dead-ending */
var doneNext = $('#done-next'), doneNextLabel = $('#done-next-label');
function showDone(title, sub, next){
  var h = $('#done-title');
  h.textContent = title;
  $('#done-sub').innerHTML = sub;
  if(next){ doneNextLabel.textContent = next.label; doneNext.dataset.go = next.view; }
  show(doneNext, !!next);
  aForm.style.display = 'none';
  aDone.style.display = '';
  auth.scrollTop = 0;
  /* the form vanishes, so whatever had focus went with it. Land on the heading
     of the screen that replaced it (2.4.3) and read the outcome out. */
  h.focus();
  say(title + '. ' + $('#done-sub').textContent);
}
doneNext.addEventListener('click', function(){
  var v = doneNext.dataset.go;
  aForm.style.display = '';
  aDone.style.display = 'none';
  setView(v);
  history.replaceState({ rvAuth:v }, '', AUTH_HASH[v]);
  firstField().focus();
});

var auSubmit = $('#au-submit');
aForm.addEventListener('submit', function(e){
  e.preventDefault();
  if(auSubmit.getAttribute('aria-disabled') === 'true') return;   /* already in flight */
  if(!validateAuth()) return;

  var mail = aEmail.value.trim();

  /* ---------- pending ----------
     A real submit is not instant, and pretending it is leaves no room to design
     the two states that actually matter. The button holds a spinner, the form is
     aria-busy, and a second press does nothing. */
  setBusy(aForm, auSubmit, true);
  say('Submitting…');

  window.setTimeout(function(){
    setBusy(aForm, auSubmit, false);

    /* ---------- the failure path ----------
       Deterministic on purpose: any address at @fail.test is rejected by the
       "server", so the error state can be demonstrated and reviewed without
       random failures making the prototype miserable to click through. Delete
       this branch when the real endpoint goes in — the surrounding handling is
       what you keep. */
    if(/@fail\.test$/i.test(mail)){
      showAlert($('#auth-alert'), 'bad',
        '<b>We could not sign you in.</b><br>The email or password did not match an account. ' +
        'Check the address, or <button type="button" class="lnk" data-view="reset">reset your password</button>.');
      shout('Sign in failed. The email or password did not match an account.');
      aPass.focus();
      return;
    }

    if(aView === 'reset'){
      showDone('Check your email',
        'We have sent a password reset link to <b>' + mail + '</b>. Open it on this device and you will land straight on the new password screen.',
        { label:'Open the reset link', view:'newpw' });
      return;
    }
    if(aView === 'newpw'){
      aPass.value = ''; aConfirm.value = '';
      showDone('Password updated',
        'Your password has been changed' + (mail ? ' for <b>' + mail + '</b>' : '') + '. Every other device has been signed out.',
        { label:'Sign in', view:'in' });
      return;
    }

    signInAs(mail);
    if(aView === 'up'){
      showDone('Check Your Email',
        'We have sent a verification email to <b>' + mail + '</b>. Please check your inbox and click the verification link to activate your account.');
    } else {
      showDone('Sign in as',
        'Signed in as <b>' + mail + '</b>. An email to download the VesperVPN has been sent to you.');
    }
  }, RM ? 0 : 850);
});

$('#auth-google').addEventListener('click', function(){
  var mail = aEmail.value.trim() || 'you@gmail.com';
  signInAs(mail);
  $('#done-title').textContent = 'Sign in as';
  $('#done-sub').innerHTML = 'Signed in as <b>' + mail + '</b> through Google. An email to download the VesperVPN has been sent to you.';
  aForm.style.display = 'none';
  aDone.style.display = '';
});

/* ---------- the closing CTA ----------
   This is the top of the funnel, so it gets the same treatment as the real form:
   validated where you leave the field, a named error rather than a red pill, and
   a pending state so a slow hand-off does not look like a dead button. */
var ctaForm = $('#cta-form'), ctaEmail = $('#cta-email'), ctaErr = $('#cta-err');
var ctaBtn = ctaForm ? $('button', ctaForm) : null;
function ctaSetErr(msg){
  ctaForm.classList.toggle('bad', !!msg);
  ctaErr.classList.toggle('on', !!msg);
  ctaErr.textContent = msg || '';
  if(msg) ctaEmail.setAttribute('aria-invalid','true'); else ctaEmail.removeAttribute('aria-invalid');
}
function ctaCheck(){
  var v = ctaEmail.value.trim();
  if(!v) return 'Enter an email address to create your account';
  if(!EMAIL_RE.test(v)) return 'That is not a complete email address — check for a missing @ or a typo after the dot';
  return '';
}
if(ctaForm){
  ctaEmail.addEventListener('blur', function(){ ctaSetErr(ctaCheck()); });
  ctaEmail.addEventListener('input', function(){ if(ctaErr.classList.contains('on')) ctaSetErr(ctaCheck()); });
  ctaForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(ctaBtn && ctaBtn.getAttribute('aria-disabled') === 'true') return;
    var msg = ctaCheck();
    ctaSetErr(msg);
    if(msg){ shout(msg); ctaEmail.focus(); return; }
    setBusy(ctaForm, ctaBtn, true);
    window.setTimeout(function(){
      setBusy(ctaForm, ctaBtn, false);
      openAuth('up', ctaEmail.value.trim());
    }, RM ? 0 : 550);
  });
}

setView('in');
/* deep link: every auth view has its own URL, so a reset link mailed to someone
   can point straight at #set-new-password and land on the right screen */
Object.keys(AUTH_HASH).forEach(function(v){
  if(location.hash === AUTH_HASH[v]) openAuth(v, null, true);
});

/* ---------- review mode: ?demo=1 ----------
   An auditor cannot type an email or a password into a form that is not theirs.
   That is a fixed constraint on their side, not a defect on ours — but the
   effect is that signup and checkout stay "cannot assess" however well they are
   built, and 3.3.7 Redundant Entry in particular can only be judged by watching
   a value carry from one step to the next.

   ?demo=1 fills the fields with visibly fake values and opens the signup panel,
   so the whole path — inline validation, the error and success states, and the
   carry-over — can be walked without anyone entering a real credential. The
   banner is deliberate: prefilled credentials with no explanation would be more
   alarming than helpful. Absent the flag none of this runs. */
if(/[?&]demo=1(&|$)/.test(location.search) || location.hash === '#demo'){
  (function(){
    var DEMO_MAIL = 'auditor@example.org', DEMO_PASS = 'Demo-Passw0rd!';
    var note = document.createElement('p');
    note.id = 'demo-note';
    note.setAttribute('role', 'status');
    note.textContent = 'Review mode — fields are prefilled with dummy data. No real account is created.';
    note.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);top:10px;z-index:500;' +
      'margin:0;padding:10px 18px;border-radius:999px;background:var(--ink);color:#fff;' +
      'font-size:var(--fs-200);font-weight:600;box-shadow:var(--shadow-md);max-width:calc(100vw - 28px);text-align:center;';
    document.body.appendChild(note);
    if(ctaEmail) ctaEmail.value = DEMO_MAIL;
    window.setTimeout(function(){
      openAuth('up', DEMO_MAIL);
      if(aPass) aPass.value = DEMO_PASS;
      if(aConfirm) aConfirm.value = DEMO_PASS;
      [aEmail, aPass, aConfirm].forEach(function(f){
        if(f) f.dispatchEvent(new Event('input', { bubbles:true }));
      });
    }, RM ? 0 : 450);
  })();
}
/* the account URLs only mean anything once you are signed in, so a cold visit
   to #billing lands on the sign-in page instead of an empty shell */
Object.keys(AC_HASH).forEach(function(p){
  if(location.hash === AC_HASH[p]) openAccount(p, true);
});

/* ==========================================================================
   FAQ SEARCH
   ==========================================================================
   Thirteen answers is past the point where a list is scannable. Search runs over
   the question, the answer and the category, so "money back", "refund" and
   "Billing" all reach the same row. The result count is a live region — a list
   that silently rearranges itself is invisible to anyone not watching it. */
var qQ = $('#q-q'), qSrch = $('#q-srch'), qClr = $('#q-clr'),
    qCount = $('#q-count'), qEmpty = $('#q-empty'), qEmptyTerm = $('#q-empty-term');
function qText(r){
  return ($('.qt', r).textContent + ' ' + $('.qinline p', r).textContent + ' ' + (r.dataset.cat || '')).toLowerCase();
}
function filterQ(){
  var term = qQ.value.trim().toLowerCase();
  qSrch.classList.toggle('has', !!term);
  var shown = 0, first = null;
  qrows.forEach(function(r){
    var hit = !term || qText(r).indexOf(term) !== -1;
    r.hidden = !hit;
    if(hit){ shown++; if(!first) first = r; }
  });
  qEmpty.classList.toggle('on', shown === 0);
  qEmptyTerm.textContent = qQ.value.trim();
  qpanel.style.display = shown === 0 ? 'none' : '';
  qCount.textContent = !term ? '' : shown + (shown === 1 ? ' answer' : ' answers') + ' for “' + qQ.value.trim() + '”';
  if(term) say(shown === 0 ? 'No answers match ' + qQ.value.trim() : qCount.textContent);
  /* keep the detail panel on something that is actually still on screen */
  if(first && qrows[qActive] && qrows[qActive].hidden) setQ(qrows.indexOf(first), true);
}
var qDebounce;
qQ.addEventListener('input', function(){
  window.clearTimeout(qDebounce);
  qDebounce = window.setTimeout(filterQ, 160);
});
function clearQ(){ qQ.value = ''; filterQ(); qQ.focus(); }
qClr.addEventListener('click', clearQ);
$('#q-empty-clear').addEventListener('click', clearQ);
qQ.addEventListener('keydown', function(e){ if(e.key === 'Escape' && qQ.value){ e.stopPropagation(); clearQ(); } });

/* ==========================================================================
   SERVER LIST — filter, loading, empty, error
   ==========================================================================
   The list is static markup here, but the states a real one needs are designed
   rather than assumed away: it loads, it can come back empty, and it can fail
   with a way to retry. */
var srvQ = $('#srv-q'), srvSrch = $('#srv-srch'), srvClr = $('#srv-clr'), srvCount = $('#srv-count'),
    srvRows = $('#rows'), srvSkel = $('#srv-skel'), srvEmpty = $('#srv-empty'),
    srvError = $('#srv-error'), srvEmptyTerm = $('#srv-empty-term');
var rowiAll = $$('.rowi', srvRows);
function filterSrv(){
  var term = srvQ.value.trim().toLowerCase();
  srvSrch.classList.toggle('has', !!term);
  var shown = 0;
  rowiAll.forEach(function(r){
    var hay = ($('.nm', r).textContent + ' ' + $('.tag', r).textContent).toLowerCase();
    var hit = !term || hay.indexOf(term) !== -1;
    r.hidden = !hit;
    if(hit) shown++;
  });
  srvEmpty.classList.toggle('on', shown === 0);
  srvEmptyTerm.textContent = srvQ.value.trim();
  var msg = !term
    ? FACTS.servers + ' servers across ' + FACTS.countries + ' countries, in ' + FACTS.continents + ' regions'
    : shown + (shown === 1 ? ' region' : ' regions') + ' matching “' + srvQ.value.trim() + '”';
  srvCount.textContent = msg;
  if(term) say(msg);
}
var srvDebounce;
srvQ.addEventListener('input', function(){
  window.clearTimeout(srvDebounce);
  srvDebounce = window.setTimeout(filterSrv, 160);
});
function clearSrv(){ srvQ.value = ''; filterSrv(); srvQ.focus(); }
srvClr.addEventListener('click', clearSrv);
$('#srv-empty-clear').addEventListener('click', clearSrv);
srvQ.addEventListener('keydown', function(e){ if(e.key === 'Escape' && srvQ.value){ e.stopPropagation(); clearSrv(); } });

/* the loading state is real: shown on the retry path, which is the only way the
   list gets re-fetched in a static page */
function loadServers(){
  srvError.classList.remove('on');
  srvEmpty.classList.remove('on');
  srvRows.hidden = true;
  srvSkel.classList.add('on');
  say('Loading regions…');
  window.setTimeout(function(){
    srvSkel.classList.remove('on');
    srvRows.hidden = false;
    filterSrv();
    say('Regions loaded.');
  }, RM ? 0 : 900);
}
$('#srv-retry').addEventListener('click', loadServers);
filterSrv();

/* ==========================================================================
   CONNECTION WIDGET
   ==========================================================================
   Opens on "Connecting" and settles, so the hero shows the handshake rather than
   asserting a permanent green light. The failure branch is built and reachable
   (see connFail) — a privacy product that never draws a dropped tunnel is hiding
   the one moment its user needs a next step. */
var connEl = $('#conn'), connSt = $('#conn-st'), connDot = $('#conn-dot'),
    connLabel = $('#conn-label'), connMs = $('#conn-ms');
function connState(state){
  connEl.classList.remove('is-connecting','is-error');
  connSt.classList.remove('is-connecting','is-error');
  connDot.classList.remove('amber','red');
  if(state === 'connecting'){
    connEl.classList.add('is-connecting'); connSt.classList.add('is-connecting');
    connDot.classList.add('amber');
    connLabel.textContent = 'Connecting…'; connMs.textContent = '— ms';
    connEl.setAttribute('aria-label', 'VesperVPN app, connecting to Frankfurt from Moscow.');
  }else if(state === 'error'){
    connEl.classList.add('is-error'); connSt.classList.add('is-error');
    connDot.classList.add('red');
    connLabel.textContent = 'Could not connect'; connMs.textContent = '— ms';
    connEl.setAttribute('aria-label', 'VesperVPN app showing a failed connection to Frankfurt, with a button to try another server.');
  }else{
    connLabel.textContent = 'Connected'; connMs.textContent = '12 ms';
    connEl.setAttribute('aria-label', 'VesperVPN app, connected to Frankfurt from Moscow at 12 milliseconds.');
  }
}
/* expose the failure state for review without wiring it to a random chance */
window.rusvpnConnFail = function(){ connState('error'); };
if(RM) connState('connected');
else window.setTimeout(function(){ connState('connected'); }, 1600);

/* ==========================================================================
   TOOLTIPS
   ========================================================================== */
var openTip = null;
function closeTip(){
  if(!openTip) return;
  openTip.el.classList.remove('on');
  openTip.btn.setAttribute('aria-expanded','false');
  openTip = null;
}
/* Places the popup under its button and pulls it back inside the viewport if it
   would hang off either edge, then moves the arrow to stay pointing at the
   button. Flips above the button when there is no room below. */
function positionTip(tip, btn){
  var pop = $('.tip-pop', tip);
  if(!pop) return;
  var GAP = 10, EDGE = 14;
  var b = btn.getBoundingClientRect();
  /* measure while it is laid out but not yet shown */
  var w = pop.offsetWidth, h = pop.offsetHeight;
  var left = b.left + b.width / 2 - 26;
  left = Math.max(EDGE, Math.min(left, window.innerWidth - w - EDGE));
  var top = b.bottom + GAP, flip = false;
  if(top + h > window.innerHeight - EDGE && b.top - GAP - h > EDGE){
    top = b.top - GAP - h; flip = true;
  }
  pop.classList.toggle('flip', flip);
  pop.style.left = Math.round(left) + 'px';
  pop.style.top  = Math.round(top) + 'px';
  /* keep the arrow under the button even after the clamp moved the box */
  var arrow = b.left + b.width / 2 - left - 5;
  pop.style.setProperty('--tip-arrow', Math.round(Math.max(10, Math.min(arrow, w - 20))) + 'px');
}
function showTip(tip, btn, pinned){
  closeTip();
  positionTip(tip, btn);
  tip.classList.add('on');
  btn.setAttribute('aria-expanded','true');
  openTip = { el:tip, btn:btn, pinned:!!pinned };
}
/* an anchored popup has to follow its anchor or leave */
window.addEventListener('scroll', function(){ if(openTip) positionTip(openTip.el, openTip.btn); }, {passive:true});
window.addEventListener('resize', function(){ if(openTip) positionTip(openTip.el, openTip.btn); });
function hoverable(){ return window.matchMedia('(hover:hover) and (pointer:fine)').matches; }
$$('.tip').forEach(function(tip){
  var btn = $('.tip-btn', tip);
  if(!btn) return;
  /* Pinned vs hovered matters more than it looks. On a mouse, moving to the
     button already opened the tip via mouseenter — so a plain "toggle on click"
     reads the tip as open and *closes* it, and clicking the thing you want to
     read makes it disappear. A click always pins; only a second click unpins. */
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    if(openTip && openTip.el === tip && openTip.pinned){ closeTip(); return; }
    showTip(tip, btn, true);
  });
  tip.addEventListener('mouseenter', function(){
    if(!hoverable()) return;
    if(openTip && openTip.el === tip) return;   /* already up — leave the pin alone */
    showTip(tip, btn, false);
  });
  tip.addEventListener('mouseleave', function(){
    if(!hoverable()) return;
    if(!openTip || openTip.el !== tip) return;
    /* a pinned tip, or one the keyboard is sitting on, outlives the pointer */
    if(openTip.pinned || document.activeElement === btn) return;
    closeTip();
  });
  btn.addEventListener('focus', function(){ showTip(tip, btn, false); });
  btn.addEventListener('blur', function(){
    if(openTip && openTip.el === tip && !openTip.pinned) closeTip();
  });
});
document.addEventListener('click', closeTip);
document.addEventListener('keydown', function(e){
  /* 1.4.13 — a hover/focus popup must be dismissable without moving the pointer */
  if(e.key === 'Escape' && openTip){ e.stopPropagation(); var b = openTip.btn; closeTip(); b.focus(); }
});

/* ---------- chat launcher ---------- */
var fabToggle = $('#fabtoggle');
document.addEventListener('click', function(e){
  var t = e.target.closest('[data-fab-open]');
  if(!t) return;
  e.preventDefault();
  fab.classList.add('on');
  fabToggle.setAttribute('aria-expanded','true');
  var first = $('.opts a', fab);
  if(first) first.focus();
});

/* ---------- magnetic primary buttons ---------- */
if(!RM && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  $$('.btn-red, .btn-primary, .btn-white').filter(function(b){ return !auth.contains(b); }).forEach(function(b){
    b.addEventListener('mousemove', function(e){
      var r = b.getBoundingClientRect();
      b.style.transform = 'translate(' + ((e.clientX-r.left-r.width/2)*.12) + 'px,' + ((e.clientY-r.top-r.height/2)*.22) + 'px)';
    });
    b.addEventListener('mouseleave', function(){ b.style.transform = ''; });
  });
}

}
