/* =====================================================================
   TRIP TO CHICAGO — APP
   You normally won’t need to edit this file. Words, questions, sources,
   and images live in js/content.js.
   ===================================================================== */
(function () {
  'use strict';

  var T = window.TRIP;
  var KEY = 'tripToChicago.v1';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var txt = function (s) { return String(s || '').trim(); };
  var reduced = function () { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); };
  var EMOJI = { downtown: '🌆', neighborhoods: '🚇', map: '🗺️', housing: '🏢', headlines: '📰', chicagoans: '🎨' };

  /* ------------------------------------------------------------------
     STATE (saved in this browser only, via localStorage)
     ------------------------------------------------------------------ */
  function fresh() {
    return {
      v: 1, name: '', arrival: null, last: '',
      pre: { w: ['', '', ''], sources: [], other: '', explain: '' },
      arrivalW: ['', '', ''],
      order: [], status: {}, r: {}, suitcase: {}, meter: {}, vocab: [], notes: '', side: [], sidePoll: {},
      guide: { title: '', tiles: [null, null, null, null, null, null], why: {}, leavesOut: '', different: '', want: '', locked: false },
      rv: { step: 0, falseQ: null, selection: '', orderQ: '' },
      after: { w: ['', '', ''], changed: '', caused: '', shown: false },
      eq: '', real: { choice: null, other: '', step: 0 },
      done: {}, settings: { large: false, rate: 1 }
    };
  }
  function merge(base, saved) {
    if (!saved || typeof saved !== 'object') return base;
    Object.keys(saved).forEach(function (k) {
      var b = base[k], s = saved[k];
      if (b && typeof b === 'object' && !Array.isArray(b) && s && typeof s === 'object' && !Array.isArray(s)) base[k] = merge(b, s);
      else base[k] = s;
    });
    return base;
  }
  var S;
  try { S = merge(fresh(), JSON.parse(localStorage.getItem(KEY) || 'null')); } catch (e) { S = fresh(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: trip still works this session */ } }
  function getP(path) { return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, S); }
  function setP(path, val) {
    var ks = path.split('.'), o = S;
    for (var i = 0; i < ks.length - 1; i++) {
      if (o[ks[i]] == null || typeof o[ks[i]] !== 'object') o[ks[i]] = /^\d+$/.test(ks[i + 1]) ? [] : {};
      o = o[ks[i]];
    }
    o[ks[ks.length - 1]] = val; save();
  }
  function rr(id) { if (!S.r[id]) S.r[id] = {}; return S.r[id]; }
  var U = { starters: false, teacher: false, resetAsk: false, decoded: '' }; // not saved
  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  /* ------------------------------------------------------------------
     ILLUSTRATIONS (built-in, always load, no internet needed)
     ------------------------------------------------------------------ */
  var gid = 0;
  function G(a, b, h) { var id = 'g' + (++gid); return { id: id, d: '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="' + (h ? 1 : 0) + '" y2="' + (h ? 0 : 1) + '"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs>', u: 'url(#' + id + ')' }; }
  function R(x, y, w, h, f, ex) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '" ' + (ex || '') + '/>'; }
  function C(x, y, r, f, ex) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '" ' + (ex || '') + '/>'; }
  function P(d, f, ex) { return '<path d="' + d + '" fill="' + f + '" ' + (ex || '') + '/>'; }
  function sky(a, b) { var g = G(a, b); return g.d + R(0, 0, 320, 200, g.u); }
  var BLD = [[0, 26, 58], [24, 20, 88], [42, 30, 66], [70, 16, 112], [84, 28, 80], [110, 24, 124], [132, 34, 94], [164, 18, 118], [180, 30, 84], [208, 22, 106], [228, 32, 70], [258, 20, 96], [276, 44, 62]];
  function city(base, fill, lit) {
    return BLD.map(function (b, i) {
      var s = R(b[0], base - b[2], b[1], b[2], fill);
      if (lit) for (var y = base - b[2] + 8; y < base - 6; y += 11) for (var x = b[0] + 4; x < b[0] + b[1] - 4; x += 7) if ((x * 3 + y * 7 + i * 11) % 9 < 3) s += R(x, y, 3, 4, lit, 'opacity=".8"');
      return s;
    }).join('') + R(121, base - 138, 2, 14, fill);
  }
  function people(y, n, seed) {
    var skins = ['#8D5524', '#C68642', '#5C3A21', '#E0AC69', '#A0683C'], shirts = ['#0B1F33', '#41B6E6', '#F7F6F2', '#E4002B', '#2D4A66', '#F2B33D'];
    var s = ''; for (var i = 0; i < n; i++) { var x = 14 + i * (292 / n) + ((i * 37 + seed) % 9); var h = 22 + ((i * 13 + seed) % 10); s += '<rect x="' + (x - 8) + '" y="' + (y - h) + '" width="16" height="' + (h + 4) + '" rx="7" fill="' + shirts[(i + seed) % shirts.length] + '"/>' + C(x, y - h - 7, 7, skins[(i * 3 + seed) % skins.length]); }
    return s;
  }
  function tree(x, y, r) { return R(x - 2, y, 4, r * 1.2, '#5B4636') + C(x, y, r, '#3E7C59') + C(x - r * .5, y + r * .3, r * .7, '#4C8F66'); }
  function wrapLines(t, n) { var w = String(t || '').split(' '), out = [], l = ''; w.forEach(function (x) { if ((l + ' ' + x).trim().length > n) { out.push(l.trim()); l = x; } else l += ' ' + x; }); if (l.trim()) out.push(l.trim()); return out; }
  function textLines(lines, x, y, size, fill, lh) { return lines.map(function (l, i) { return '<text x="' + x + '" y="' + (y + i * (lh || size * 1.25)) + '" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="' + size + '" fill="' + fill + '">' + esc(l) + '</text>'; }).join(''); }

  var ART = {
    skyline: function () { var s = sky('#0B1F33', '#3E8FB8') + C(252, 62, 14, '#F2B33D', 'opacity=".85"') + city(150, '#0B1F33', '#F2B33D') + R(0, 150, 320, 50, '#16324F'); for (var i = 0; i < 9; i++) s += R((i * 47) % 300, 158 + i * 4, 30 + (i * 13) % 30, 1.5, '#41B6E6', 'opacity=".45"'); return s; },
    bean: function () { var b = G('#F7F6F2', '#6F7F8C', true); return sky('#BFE6F6', '#F7F6F2') + city(142, '#A9BCC9') + R(0, 140, 320, 60, '#D9D4C7') + b.d + '<ellipse cx="160" cy="166" rx="100" ry="10" fill="#B8B2A3"/><ellipse cx="160" cy="126" rx="92" ry="40" fill="' + b.u + '"/><ellipse cx="128" cy="112" rx="38" ry="10" fill="#fff" opacity=".55"/>' + '<g transform="translate(70 104) scale(.55)" opacity=".5">' + city(40, '#0B1F33') + '</g>' + people(186, 9, 2); },
    river: function () { return sky('#41B6E6', '#BFE6F6') + '<g>' + city(130, '#16324F', '#BFE6F6') + '</g>' + P('M118 200 L150 128 L172 128 L206 200Z', '#16324F') + P('M60 200 L138 132 L150 128 L118 200Z', '#E9DFC9') + R(136, 120, 52, 7, '#202124') + R(140, 112, 3, 8, '#202124') + R(181, 112, 3, 8, '#202124') + R(150, 160, 18, 2, '#41B6E6', 'opacity=".6"') + R(158, 176, 22, 2, '#41B6E6', 'opacity=".6"') + C(96, 170, 5, '#E4002B') + C(108, 160, 5, '#41B6E6'); },
    lake: function () { var w = G('#41B6E6', '#1F7FAD'); return sky('#BFE6F6', '#F7F6F2') + '<g transform="translate(0 70) scale(.42)">' + city(110, '#2D4A66') + '</g>' + w.d + R(0, 112, 320, 44, w.u) + R(0, 150, 320, 50, '#E9DFC9') + P('M0 150 Q40 144 80 150 T160 150 T240 150 T320 150 V156 H0Z', '#F7F6F2', 'opacity=".8"') + P('M200 168 L214 150 L228 168Z', '#E4002B') + R(213, 150, 2, 26, '#5B4636') + P('M250 172 L264 154 L278 172Z', '#0B1F33') + R(263, 154, 2, 24, '#5B4636') + R(60, 128, 30, 2, '#fff', 'opacity=".6"') + R(140, 136, 40, 2, '#fff', 'opacity=".5"'); },
    pier: function () { var s = sky('#F2B33D', '#41B6E6') + R(0, 140, 320, 60, '#16324F') + R(40, 134, 280, 8, '#E9DFC9') + '<g stroke="#F7F6F2" stroke-width="2" fill="none"><circle cx="112" cy="80" r="50"/><circle cx="112" cy="80" r="6"/>'; for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; s += '<line x1="112" y1="80" x2="' + (112 + 50 * Math.cos(a)).toFixed(1) + '" y2="' + (80 + 50 * Math.sin(a)).toFixed(1) + '"/>'; } s += '<line x1="112" y1="80" x2="92" y2="134"/><line x1="112" y1="80" x2="132" y2="134"/></g>'; for (var j = 0; j < 12; j++) { var b = j * Math.PI / 6; s += C((112 + 50 * Math.cos(b)).toFixed(1), (80 + 50 * Math.sin(b)).toFixed(1), 4, j % 3 ? '#0B1F33' : '#E4002B'); } return s + R(190, 116, 70, 18, '#F7F6F2') + R(200, 104, 50, 12, '#BFE6F6') + R(0, 150, 320, 1.5, '#41B6E6', 'opacity=".5"'); },
    food: function () { var s = R(0, 0, 320, 200, '#E9DFC9') + R(0, 150, 320, 50, '#D9CBB0') + C(110, 104, 64, '#C9822B') + C(110, 104, 55, '#B8322A'); for (var i = 0; i < 14; i++) s += C(110 + Math.cos(i * 2.4) * (12 + (i * 7) % 38), 104 + Math.sin(i * 2.4) * (12 + (i * 7) % 38), 6, '#F2D27A'); s += '<g stroke="#E9DFC9" stroke-width="2"><line x1="110" y1="40" x2="110" y2="168"/><line x1="46" y1="104" x2="174" y2="104"/><line x1="65" y1="59" x2="155" y2="149"/><line x1="155" y1="59" x2="65" y2="149"/></g>'; return s + '<g transform="rotate(-14 248 110)"><rect x="196" y="96" width="108" height="30" rx="15" fill="#E3B36B"/><rect x="190" y="102" width="120" height="16" rx="8" fill="#9C4A3A"/><polyline points="198,108 210,104 222,110 234,104 246,110 258,104 270,110 282,104 296,108" fill="none" stroke="#F2C230" stroke-width="3"/>' + C(214, 98, 3, '#3E7C59') + C(236, 97, 3, '#3E7C59') + C(258, 98, 3, '#3E7C59') + R(226, 92, 12, 6, '#E4002B', 'rx="2"') + R(266, 91, 22, 6, '#4C8F66', 'rx="3"') + '</g>'; },
    tower: function () { return sky('#41B6E6', '#BFE6F6') + '<g opacity=".45">' + city(170, '#2D4A66') + '</g>' + R(132, 70, 56, 130, '#0B1F33') + R(140, 46, 40, 30, '#0B1F33') + R(146, 24, 28, 30, '#0B1F33') + R(150, 2, 3, 24, '#0B1F33') + R(167, 6, 3, 20, '#0B1F33') + R(132, 112, 56, 3, '#2D4A66') + R(140, 74, 40, 2, '#2D4A66'); },
    museum: function () { var s = sky('#BFE6F6', '#F7F6F2') + R(0, 170, 320, 30, '#C9C2B0') + R(70, 158, 180, 6, '#D9D4C7') + R(60, 164, 200, 6, '#CFC8B6') + R(80, 92, 160, 66, '#E9E4D6') + P('M72 92 L160 52 L248 92Z', '#DCD5C4'); for (var i = 0; i < 7; i++) s += R(88 + i * 22, 98, 8, 60, '#F7F6F2'); return s + R(96, 104, 10, 40, '#E4002B', 'opacity=".85"') + R(214, 104, 10, 40, '#41B6E6'); },
    stadium: function () { var f = G('#4C8F66', '#2F6B49'); var s = sky('#41B6E6', '#BFE6F6') + R(0, 96, 320, 40, '#2F5D3E'); for (var i = 0; i < 60; i++) s += C((i * 53) % 320, 100 + (i * 17) % 34, 3, '#3E7C59'); return s + R(120, 40, 80, 50, '#1E4A33') + R(128, 48, 64, 10, '#F7F6F2', 'opacity=".9"') + R(128, 64, 64, 4, '#F7F6F2', 'opacity=".5"') + R(128, 72, 64, 4, '#F7F6F2', 'opacity=".5"') + f.d + R(0, 136, 320, 64, f.u) + P('M160 150 L200 172 L160 194 L120 172Z', '#B98A5E'); },
    headline: function (t) { return R(0, 0, 320, 200, '#F7F6F2') + R(0, 0, 320, 34, '#0B1F33') + textLines(['CITY NEWS'], 18, 24, 18, '#F7F6F2') + textLines(wrapLines(t || 'Latest headlines', 20), 18, 74, 28, '#202124', 30) + R(18, 176, 180, 4, '#B3B3B3') + R(18, 186, 120, 4, '#B3B3B3'); },
    'headline-dark': function (t) { return R(0, 0, 320, 200, '#0B1F33') + R(18, 22, 70, 20, '#41B6E6') + textLines(['NEWS'], 30, 38, 16, '#0B1F33') + textLines(wrapLines(t || 'Latest headlines', 18), 18, 86, 30, '#F7F6F2', 32); },
    truecomplete: function () { return R(0, 0, 320, 200, '#0B1F33') + '<text x="30" y="92" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="62" fill="#F7F6F2">TRUE</text><text x="30" y="152" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="46" fill="#41B6E6" textLength="260" lengthAdjust="spacingAndGlyphs">≠ COMPLETE</text>'; },
    vacant: function () { var s = sky('#C9D1D8', '#E8EBEE') + R(0, 150, 320, 50, '#A49C88') + R(20, 50, 110, 104, '#8C8478'); [[34, 66], [74, 66], [34, 108], [74, 108]].forEach(function (p) { s += R(p[0], p[1], 30, 30, '#6B5E4E') + '<path d="M' + p[0] + ' ' + p[1] + ' l30 30 M' + (p[0] + 30) + ' ' + p[1] + ' l-30 30" stroke="#B9A88A" stroke-width="4"/>'; }); s += '<g stroke="#7A7F84" stroke-width="1.2">'; for (var x = 140; x < 320; x += 10) s += '<line x1="' + x + '" y1="112" x2="' + (x + 30) + '" y2="152"/><line x1="' + (x + 30) + '" y1="112" x2="' + x + '" y2="152"/>'; s += '</g>' + R(140, 110, 180, 3, '#7A7F84'); for (var i = 0; i < 18; i++) s += P('M' + (150 + i * 9) + ' 162 q2 -10 4 0', 'none', 'stroke="#5E7D4F" stroke-width="2"'); return s; },
    police: function () { var s = sky('#0B1F33', '#16324F') + '<g opacity=".7">' + city(140, '#08182A', '#F2B33D') + '</g>' + R(0, 140, 320, 60, '#202124') + R(0, 140, 320, 4, '#3B3F45') + R(264, 60, 4, 82, '#3B3F45') + C(266, 60, 18, '#F2B33D', 'opacity=".18"') + C(266, 60, 6, '#F2D27A'); s += '<rect x="70" y="140" width="150" height="30" rx="10" fill="#E8EBEE"/><path d="M100 140 L118 118 H178 L198 140Z" fill="#E8EBEE"/>' + R(122, 122, 26, 16, '#16324F') + R(152, 122, 24, 16, '#16324F') + R(130, 112, 18, 6, '#41B6E6') + R(148, 112, 18, 6, '#E4002B') + R(70, 154, 150, 4, '#0B1F33') + C(102, 172, 12, '#0B1F33') + C(190, 172, 12, '#0B1F33'); return s; },
    highrise: function () { var s = R(0, 0, 320, 200, '#E3D8C0') + R(0, 168, 320, 32, '#B9AC90'); [[24, 52, 60], [100, 40, 52], [176, 60, 60], [252, 48, 52]].forEach(function (b) { s += R(b[0], b[1], b[2], 168 - b[1], '#8E8068'); for (var y = b[1] + 8; y < 164; y += 8) s += R(b[0] + 4, y, b[2] - 8, 2, '#6E6250'); }); return s + tree(92, 160, 8) + tree(240, 158, 9) + R(0, 0, 320, 200, '#E3D8C0', 'opacity=".12"'); },
    redmap: function () { var s = R(0, 0, 320, 200, '#EFE6D2'), cols = { A: '#8FB87A', B: '#7FA9CF', C: '#E3CF6B', D: '#D46A5E' }; for (var r = 0; r < 6; r++) for (var c = 0; c < 9; c++) { var d = Math.hypot(c - 3.6, r - 2.6), g = d < 1.5 ? 'D' : d < 2.6 ? 'C' : d < 3.8 ? 'B' : 'A'; if (c === 8) g = 'A'; s += R(8 + c * 32, 8 + r * 31, 30, 29, cols[g], 'opacity=".85" stroke="#6B5E4E" stroke-width=".8"'); } return s + '<path d="M0 190 L300 0" stroke="#202124" stroke-width="3" stroke-dasharray="8 4"/>'; },
    storefront: function () { var s = sky('#C9D1D8', '#E8EBEE') + R(0, 170, 320, 30, '#A9A497'); for (var i = 0; i < 3; i++) { var x = 10 + i * 102; s += R(x, 60, 98, 110, '#B9B3A8') + R(x + 10, 96, 78, 56, '#6B6F74') + R(x + 24, 112, 50, 18, '#F7F6F2') + textLines(['FOR LEASE'], x + 27, 126, 13, '#202124'); for (var y = 96; y < 152; y += 6) s += R(x + 10, y, 78, 1, '#8A8F94'); } return s; },
    'storefront-open': function () { var s = sky('#41B6E6', '#BFE6F6') + R(0, 170, 320, 30, '#A9A497'); for (var i = 0; i < 3; i++) { var x = 10 + i * 102; s += R(x, 60, 98, 110, i === 1 ? '#E9DFC9' : '#C9C2B0') + R(x + 10, 96, 78, 56, '#F2D27A') + R(x, 86, 98, 10, i === 1 ? '#41B6E6' : '#2D4A66'); } return s + R(126, 66, 66, 16, '#0B1F33') + textLines(['NOW OPEN'], 132, 79, 13, '#F7F6F2') + people(170, 5, 3); },
    mural: function () { var s = R(0, 0, 320, 200, '#B5654E'); for (var y = 0; y < 170; y += 10) s += R(0, y, 320, 1, '#9B5442'); s += R(0, 170, 320, 30, '#C9C2B0') + C(90, 70, 40, '#F2B33D') + P('M0 130 Q80 90 160 130 T320 120 V170 H0Z', '#41B6E6') + P('M180 40 q30 -20 60 0 q-10 40 -30 60 q-20 -20 -30 -60Z', '#3E7C59') + C(220, 112, 16, '#5C3A21') + '<rect x="200" y="128" width="40" height="44" rx="18" fill="#0B1F33"/>' + C(140, 108, 14, '#C68642') + '<rect x="122" y="122" width="36" height="48" rx="16" fill="#E4002B"/>' + P('M260 30 l12 24 l26 4 l-19 18 l5 26 l-24 -12 l-24 12 l5 -26 l-19 -18 l26 -4z', '#F7F6F2', 'opacity=".9"'); return s; },
    festival: function () { var s = sky('#16324F', '#41B6E6'); for (var k = 0; k < 3; k++) { var y = 30 + k * 26; s += '<path d="M0 ' + y + ' Q160 ' + (y + 40) + ' 320 ' + y + '" stroke="#0B1F33" fill="none"/>'; for (var i = 0; i <= 16; i++) { var t = i / 16, x = 320 * t, yy = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + 40) + t * t * y; s += C(x.toFixed(1), (yy + 3).toFixed(1), 3, '#F2D27A'); } } s += P('M30 160 L70 118 L110 160Z', '#F7F6F2') + P('M200 160 L245 112 L290 160Z', '#41B6E6') + R(0, 158, 320, 42, '#2D4A66'); return s + people(196, 12, 5); },
    hoops: function () { return sky('#41B6E6', '#BFE6F6') + R(0, 130, 320, 70, '#2D4A66') + '<path d="M60 200 Q160 140 260 200" stroke="#BFE6F6" stroke-width="2" fill="none"/>' + R(0, 130, 320, 2, '#BFE6F6') + R(206, 40, 6, 100, '#3B3F45') + R(170, 30, 70, 46, '#F7F6F2', 'stroke="#202124" stroke-width="2"') + R(192, 46, 26, 18, 'none', 'stroke="#E4002B" stroke-width="2"') + '<ellipse cx="205" cy="80" rx="16" ry="4" fill="none" stroke="#E07B39" stroke-width="3"/><path d="M190 81 L196 100 M205 84 L205 102 M220 81 L214 100" stroke="#F7F6F2" stroke-width="1.5"/>' + C(110, 96, 16, '#E07B39') + '<path d="M94 96 H126 M110 80 V112" stroke="#5C2E12" stroke-width="1.5"/>'; },
    garden: function () { var s = sky('#BFE6F6', '#F7F6F2') + R(0, 30, 320, 100, '#9C4A3A'); for (var i = 0; i < 6; i++) s += R(20 + i * 50, 50, 24, 30, '#BFE6F6', 'opacity=".7"'); s += R(0, 120, 320, 80, '#8A7A5A'); [[20, 140], [120, 150], [220, 140]].forEach(function (b) { s += R(b[0], b[1], 84, 30, '#6B4F35'); for (var j = 0; j < 6; j++) s += C(b[0] + 8 + j * 14, b[1] - 2, 7 + (j % 3), '#3E7C59'); }); return s + R(280, 96, 3, 50, '#4C8F66') + C(281, 92, 9, '#F2B33D') + C(281, 92, 3, '#5B4636') + R(300, 106, 3, 40, '#4C8F66') + C(301, 102, 8, '#F2B33D'); },
    restaurant: function () { var s = R(0, 0, 320, 200, '#E9DFC9') + R(0, 172, 320, 28, '#B9B3A8') + R(40, 20, 240, 32, '#2D4A66') + R(60, 30, 200, 4, '#F7F6F2', 'opacity=".7"') + R(60, 40, 120, 4, '#F7F6F2', 'opacity=".5"'); for (var i = 0; i < 10; i++) s += P('M' + (40 + i * 24) + ' 60 h24 l-4 22 h-16z', i % 2 ? '#F7F6F2' : '#E4002B'); return s + R(50, 88, 140, 76, '#F2D27A') + R(206, 88, 56, 84, '#5B4636') + C(250, 132, 3, '#F2B33D') + C(90, 128, 9, '#5C3A21') + '<rect x="78" y="138" width="24" height="26" rx="10" fill="#0B1F33"/>' + C(140, 126, 9, '#C68642') + '<rect x="128" y="136" width="24" height="28" rx="10" fill="#41B6E6"/>' + R(50, 156, 140, 8, '#9C4A3A'); },
    gathering: function () { var s = sky('#BFE6F6', '#F7F6F2') + R(0, 120, 320, 80, '#5E9C6E') + tree(40, 80, 30) + tree(280, 76, 34) + R(70, 150, 180, 10, '#8A5A3C') + R(80, 160, 8, 24, '#6B4F35') + R(232, 160, 8, 24, '#6B4F35'); return s + people(150, 9, 7) + C(120, 146, 5, '#E4002B') + C(180, 145, 6, '#F2B33D'); },
    train: function () { var s = sky('#BFE6F6', '#F7F6F2') + '<g opacity=".5">' + city(120, '#2D4A66') + '</g>' + R(0, 120, 320, 80, '#C9C2B0'); for (var x = 10; x < 320; x += 60) s += R(x, 120, 10, 80, '#3B3F45'); s += R(0, 112, 320, 10, '#202124'); for (var c = 0; c < 3; c++) { var cx = 20 + c * 98; s += '<rect x="' + cx + '" y="68" width="94" height="44" rx="6" fill="#D5DADF"/>' + R(cx, 92, 94, 5, '#41B6E6'); for (var w = 0; w < 5; w++) s += R(cx + 8 + w * 17, 74, 12, 14, '#16324F'); } return s; },
    music: function () { var s = R(0, 0, 320, 200, '#0B1F33') + C(110, 100, 74, '#202124'); for (var r = 20; r < 74; r += 6) s += C(110, 100, r, 'none', 'stroke="#3B3F45" stroke-width="1"'); s += C(110, 100, 18, '#41B6E6') + C(110, 100, 3, '#0B1F33'); for (var i = 0; i < 12; i++) { var h = 20 + ((i * 37) % 70); s += R(206 + i * 9, 100 - h / 2, 5, h, i === 6 ? '#E4002B' : '#41B6E6', 'rx="2"'); } return s; },
    greystone: function () { var s = sky('#BFE6F6', '#F7F6F2') + R(0, 172, 320, 28, '#C9C2B0'); for (var i = 0; i < 3; i++) { var x = 30 + i * 90; s += R(x, 54, 84, 118, i === 1 ? '#B5AE9F' : '#A9A497') + R(x - 2, 50, 88, 8, '#8E8879') + R(x + 10, 70, 22, 30, '#2D4A66') + R(x + 50, 70, 22, 30, '#2D4A66') + R(x + 10, 116, 22, 30, '#2D4A66') + R(x + 50, 120, 22, 40, '#5B4636') + R(x + 44, 160, 34, 12, '#8E8879'); } return s + tree(14, 120, 18) + tree(306, 116, 20); },
    monument: function () { return sky('#BFE6F6', '#F7F6F2') + R(0, 160, 320, 40, '#5E9C6E') + tree(50, 100, 34) + tree(270, 96, 36) + R(130, 120, 60, 44, '#8E8068') + R(124, 116, 72, 8, '#6E6250') + P('M148 116 L152 54 Q160 40 168 54 L172 116Z', '#7A5A3A') + C(160, 46, 9, '#7A5A3A'); },
    university: function () { var s = sky('#BFE6F6', '#F7F6F2') + R(0, 166, 320, 34, '#5E9C6E') + R(40, 80, 240, 86, '#A9A497') + R(60, 40, 40, 126, '#B5AE9F') + P('M58 42 L80 8 L102 42Z', '#8E8879') + R(220, 40, 40, 126, '#B5AE9F') + P('M218 42 L240 8 L262 42Z', '#8E8879'); for (var i = 0; i < 5; i++) s += P('M' + (114 + i * 20) + ' 150 v-34 q6 -12 12 0 v34z', '#2D4A66'); return s; },
    church: function () { return sky('#BFE6F6', '#F7F6F2') + R(0, 170, 320, 30, '#C9C2B0') + R(90, 80, 140, 90, '#9C4A3A') + P('M84 82 L160 38 L236 82Z', '#7E3A2D') + R(144, 10, 32, 72, '#9C4A3A') + P('M140 12 L160 -10 L180 12Z', '#7E3A2D') + C(160, 100, 14, '#41B6E6', 'stroke="#F2B33D" stroke-width="3"') + P('M144 170 v-30 q16 -20 32 0 v30z', '#5B4636') + tree(40, 120, 26) + tree(286, 124, 22); },
    zoo: function () { return sky('#BFE6F6', '#F7F6F2') + R(0, 140, 320, 60, '#8DBE7A') + P('M0 200 Q160 130 320 200Z', '#E9DFC9') + tree(40, 90, 30) + tree(290, 94, 28) + '<ellipse cx="170" cy="116" rx="38" ry="20" fill="#E3B36B"/><path d="M190 112 L216 40 L228 44 L206 116Z" fill="#E3B36B"/>' + '<ellipse cx="226" cy="40" rx="14" ry="8" fill="#E3B36B"/>' + R(144, 126, 6, 30, '#E3B36B') + R(184, 126, 6, 30, '#E3B36B') + C(160, 112, 5, '#9C6B3A') + C(176, 120, 4, '#9C6B3A') + C(208, 76, 3, '#9C6B3A') + C(230, 38, 2, '#202124'); },
    park: function () { return sky('#BFE6F6', '#F7F6F2') + R(0, 110, 320, 90, '#6FA67A') + '<ellipse cx="170" cy="160" rx="120" ry="26" fill="#41B6E6"/>' + P('M120 160 Q170 116 220 160', 'none', 'stroke="#C9C2B0" stroke-width="10"') + tree(40, 96, 30) + tree(290, 92, 32) + tree(240, 100, 18); },
    flags: function () { var s = sky('#BFE6F6', '#F7F6F2') + R(0, 150, 320, 50, '#C9C2B0'); [[40, '#41B6E6'], [110, '#F7F6F2'], [180, '#F2B33D'], [250, '#41B6E6']].forEach(function (p, i) { s += R(p[0] + 18, 60 + (i % 2) * 10, 3, 90, '#5B4636') + R(p[0], 40 + (i % 2) * 10, 50, 32, p[1], 'stroke="#0B1F33" stroke-width="2"') + R(p[0] + 8, 50 + (i % 2) * 10, 34, 4, '#0B1F33') + R(p[0] + 8, 58 + (i % 2) * 10, 24, 4, '#0B1F33'); }); return s + people(196, 11, 4); },
    books: function () { var s = R(0, 0, 320, 200, '#E9DFC9'), cols = ['#0B1F33', '#41B6E6', '#E4002B', '#2D4A66', '#F2B33D', '#3E7C59', '#B3B3B3']; for (var r = 0; r < 3; r++) { s += R(0, 60 + r * 60, 320, 8, '#8A5A3C'); var x = 10; for (var i = 0; x < 300; i++) { var w = 10 + (i * 7 + r * 3) % 12, h = 34 + (i * 11 + r) % 16; s += R(x, 60 + r * 60 - h, w, h, cols[(i + r * 2) % cols.length]); x += w + 2; } } return s; },
    transitmap: function () { var s = R(0, 0, 320, 200, '#0B1F33'), L = [['#C60C30', 'M160 0 V200'], ['#00A1DE', 'M0 40 Q120 60 160 100 T320 190'], ['#62361B', 'M60 0 Q140 70 160 100'], ['#009B3A', 'M0 100 H320'], ['#F9461C', 'M160 100 Q200 160 260 200'], ['#522398', 'M200 0 Q170 60 160 100'], ['#E27EA6', 'M0 150 Q100 110 160 100'], ['#F9E300', 'M240 0 V40']]; L.forEach(function (l) { s += '<path d="' + l[1] + '" stroke="' + l[0] + '" stroke-width="6" fill="none"/>'; }); [[160, 100], [160, 40], [80, 100], [240, 100], [104, 66], [214, 150], [160, 160]].forEach(function (p) { s += C(p[0], p[1], 6, '#F7F6F2', 'stroke="#0B1F33" stroke-width="2"'); }); return s; },
    lens: function () { return R(0, 0, 320, 200, '#F7F6F2') + C(130, 84, 54, '#41B6E6', 'opacity=".35" stroke="#0B1F33" stroke-width="2"') + C(190, 84, 54, '#B3B3B3', 'opacity=".45" stroke="#0B1F33" stroke-width="2"') + C(160, 132, 54, '#E4002B', 'opacity=".22" stroke="#0B1F33" stroke-width="2"'); },
    chain: function () { var s = R(0, 0, 320, 200, '#F7F6F2'); for (var i = 0; i < 5; i++) { s += R(14 + i * 62, 80, 44, 40, i === 4 ? '#0B1F33' : '#41B6E6', 'rx="6"'); if (i < 4) s += P('M' + (60 + i * 62) + ' 100 l12 0 m-5 -5 l5 5 l-5 5', 'none', 'stroke="#0B1F33" stroke-width="3"'); } return s; }
  };
  function art(key, alt, t) {
    var fn = ART[key] || ART.skyline;
    return '<svg class="art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" ' + (alt ? 'role="img" aria-label="' + esc(alt) + '"' : 'aria-hidden="true" focusable="false"') + '>' + fn(t) + '</svg>';
  }
  function imgOrArt(it, alt, decorative) {
    if (it.img) return '<img src="' + esc(it.img) + '" alt="' + (decorative ? '' : esc(alt)) + '" loading="lazy" data-art="' + esc(it.art) + '" data-t="' + esc(it.text || '') + '">';
    return art(it.art, decorative ? '' : alt, it.headline || it.text);
  }
  function pic(it, cls) { return '<figure class="pic ' + (cls || '') + '"><div class="pic-frame">' + imgOrArt(it, it.alt || it.caption || it.title) + '</div>' + (it.caption ? '<figcaption>' + esc(it.caption) + (it.credit ? ' <span class="credit">' + esc(it.credit) + '</span>' : '') + '</figcaption>' : '') + '</figure>'; }
  function thumb(it) { return '<span class="thumb">' + imgOrArt(it, '', true) + '</span>'; }
  // External image failed? Swap in the illustration so nobody is stranded.
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && t.dataset && t.dataset.art != null) {
      var w = document.createElement('div'); w.className = 'img-fallback';
      var noted = !!document.querySelector('#main .fail-note');
      w.innerHTML = art(t.dataset.art, t.alt, t.dataset.t) + (t.alt && !noted ? '<p class="fail-note">That image didn’t load. No problem—you can continue your trip.</p>' : '');
      t.replaceWith(w);
    }
  }, true);
  function star6(cx, cy, R0) { var p = ''; for (var i = 0; i < 12; i++) { var a = Math.PI / 6 * i - Math.PI / 2, r = i % 2 ? R0 * .5 : R0; p += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); } return p + 'Z'; }
  function stars(n, size) { var s = ''; for (var i = 0; i < n; i++) s += '<path d="' + star6(size + i * size * 2.6, size, size) + '"/>'; return '<svg class="stars" viewBox="0 0 ' + (size * 2.6 * n) + ' ' + (size * 2) + '" aria-hidden="true" focusable="false"><g fill="#E4002B">' + s + '</g></svg>'; }

  /* ------------------------------------------------------------------
     ITEMS (everything that can be packed or placed in the final guide)
     ------------------------------------------------------------------ */
  var ITEMS = {};
  function reg(o) { ITEMS[o.id] = o; }
  function firstSentence(s) { var m = String(s).match(/^[^.!?]+[.!?]/); return m ? m[0] : s; }
  function buildItems() {
    T.downtown.cards.forEach(function (c) { reg({ id: c.id, kind: 'Image', title: c.name, text: c.why, art: c.art, img: c.img, stop: 'downtown' }); });
    T.neighborhoods.list.forEach(function (n) { reg({ id: 'nb-' + n.id, kind: 'Neighborhood', title: n.name, text: n.reduce, art: n.see[0].art, img: n.see[0].img, stop: 'neighborhoods' }); });
    [{ id: 'map-map', kind: 'Map', title: 'The 1930s lending map', text: 'Neighborhoods graded green to red for lending “risk.” Race was part of the grade.', art: 'redmap' },
     { id: 'map-chain', kind: 'Idea', title: 'The consequence chain', text: 'Lending decisions → home loans → homeownership → family wealth → neighborhood investment → generations.', art: 'chain' },
     { id: 'map-1968', kind: 'Fact', title: 'The Fair Housing Act (1968)', text: 'Housing discrimination became illegal in 1968, but its effects didn’t disappear overnight.', art: 'books' }
    ].forEach(function (x) { x.stop = 'map'; reg(x); });
    [{ id: 'hs-why', kind: 'Fact', title: 'Why public housing was built', text: 'Chicago needed safe, affordable homes. CHA was created in 1937 to provide them.', art: 'highrise' },
     { id: 'hs-wrong', kind: 'Fact', title: 'What went wrong', text: 'Segregated site choices, too little repair money, and concentrated poverty, not the residents themselves.', art: 'vacant' },
     { id: 'hs-home', kind: 'Voice', title: 'What “home” looked like', text: 'Neighbors, kids, cookouts, church, and lifelong friendships.', art: 'gathering' },
     { id: 'hs-lens', kind: 'Idea', title: 'Three lenses', text: 'Policy, news, and residents can all be true and still tell different stories.', art: 'lens' }
    ].forEach(function (x) { x.stop = 'housing'; reg(x); });
    [{ id: 'hl-feed1', kind: 'Headline', title: 'The first feed', text: 'Six true-to-type stories, all about crime and safety.', art: 'headline-dark', headline: 'Six stories about crime' },
     { id: 'hl-feed2', kind: 'Headline', title: 'The second feed', text: 'Robotics, gardens, bakeries, festivals, basketball, and a warm Saturday.', art: 'festival' },
     { id: 'hl-true', kind: 'Idea', title: 'True ≠ complete', text: 'A collection of true stories can still leave a misleading impression.', art: 'truecomplete' },
     { id: 'hl-selection', kind: 'Idea', title: 'Selection', text: 'Someone chooses what becomes a story, and what gets little or no attention.', art: 'lens' }
    ].forEach(function (x) { x.stop = 'headlines'; reg(x); });
    T.chicagoans.categories.forEach(function (c) { reg({ id: 'ch-' + c.id, kind: 'Voice', title: c.name + ': ' + c.line, text: firstSentence(c.chunks[0]), art: c.art, img: c.img, stop: 'chicagoans' }); });
    T.creatorBank.forEach(function (b) { var o = {}; for (var k in b) o[k] = b[k]; o.stop = 'bank'; reg(o); });
  }

  /* ------------------------------------------------------------------
     FORM HELPERS
     ------------------------------------------------------------------ */
  function fid(path) { return 'f-' + path.replace(/\./g, '-'); }
  function field(path, o) {
    o = o || {}; var id = o.id || fid(path), v = getP(path) || '';
    var desc = o.desc ? '<p class="field-desc" id="' + id + '-d">' + esc(o.desc) + '</p>' : '';
    var attrs = 'id="' + id + '" data-bind="' + path + '"' + (o.desc ? ' aria-describedby="' + id + '-d"' : '') + (o.aria ? ' aria-label="' + esc(o.aria) + '"' : '') + (o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + (o.rerender ? ' data-rerender' : '') + (o.readonly ? ' readonly' : '');
    var ctl = o.rows ? '<textarea ' + attrs + ' rows="' + o.rows + '">' + esc(v) + '</textarea>' : '<input type="text" ' + attrs + ' value="' + esc(v) + '" maxlength="' + (o.max || 200) + '" autocomplete="off" spellcheck="true">';
    return '<div class="field ' + (o.cls || '') + '">' + (o.label ? '<label for="' + id + '" class="q-label">' + esc(o.label) + '</label>' : '') + desc + ctl + '</div>';
  }
  function threeWords(path, legend, ro) {
    var base = path.replace(/\./g, '-');
    return '<fieldset class="three"><legend class="q-label">' + esc(legend) + '</legend><div class="three-row">' + [0, 1, 2].map(function (i) {
      return '<div class="word"><span class="word-n" aria-hidden="true">' + (i + 1) + '</span>' + field(path + '.' + i, { id: 'w-' + base + '-' + i, max: 24, aria: 'Word ' + (i + 1), readonly: ro }) + '</div>';
    }).join('') + '</div></fieldset>';
  }
  function radios(path, options, legend) {
    var v = getP(path), base = path.replace(/\./g, '-');
    return '<fieldset class="choices"><legend class="q-label">' + esc(legend) + '</legend>' + options.map(function (o, i) {
      return '<label class="choice" for="' + base + '-' + i + '"><input type="radio" id="' + base + '-' + i + '" name="' + base + '" data-bind="' + path + '" value="' + i + '"' + (v === i ? ' checked' : '') + '><span>' + esc(o) + '</span></label>';
    }).join('') + '</fieldset>';
  }
  function checks(path, options, legend) {
    var v = getP(path) || [], base = path.replace(/\./g, '-');
    return '<fieldset class="choices"><legend class="q-label">' + esc(legend) + '</legend>' + options.map(function (o, i) {
      return '<label class="choice" for="' + base + '-' + i + '"><input type="checkbox" id="' + base + '-' + i + '" data-list="' + path + '" value="' + i + '"' + (v.indexOf(i) > -1 ? ' checked' : '') + '><span>' + esc(o) + '</span></label>';
    }).join('') + '</fieldset>';
  }
  function missingBox(id) { return '<div class="missing" id="miss-' + id + '" role="alert"></div>'; }
  function showMissing(id, list) {
    $$('[aria-invalid="true"]').forEach(function (e) { e.removeAttribute('aria-invalid'); });
    var box = $('#miss-' + id); if (!box) return list.length === 0;
    if (!list.length) { box.innerHTML = ''; return true; }
    list.forEach(function (m) { var f = document.getElementById(m.id); if (f) f.setAttribute('aria-invalid', 'true'); });
    box.innerHTML = '<p><strong>Almost there.</strong> Before you continue:</p><ul>' + list.map(function (m) { return '<li><button type="button" class="linklike" data-act="focus" data-id="' + m.id + '">' + esc(m.msg) + '</button></li>'; }).join('') + '</ul>';
    return false;
  }
  function wordsBlank(arr, base) { var m = []; [0, 1, 2].forEach(function (i) { if (!txt(arr[i])) m.push({ id: 'w-' + base + '-' + i, msg: 'Add word ' + (i + 1) + '. One word is enough.' }); }); return m; }
  function wordRow(arr) { return '<p class="wordrow">' + (arr || []).map(function (w) { return '<span class="wordtag">' + esc(w || '—') + '</span>'; }).join('') + '</p>'; }
  function lis(target, label) {
    if (!Speech.ok) return '';
    return '<button type="button" class="listen" data-act="listen" data-target="' + target + '" data-label="' + esc(label || 'this section') + '"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>Listen</button>';
  }
  function ext(url, label) { return url ? '<a class="ext" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + '<span class="sr-only"> (opens in a new tab; optional)</span></a>' : ''; }
  function storyCheck(q) { return '<aside class="storycheck" aria-label="Story check"><span class="sc-badge">Story check</span><p>' + esc(q) + '</p></aside>'; }

  /* ------------------------------------------------------------------
     READ ALOUD (free, built into Chrome / ChromeOS; student starts it)
     ------------------------------------------------------------------ */
  var Speech = {
    ok: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    text: '', label: '', state: 'idle', tok: 0,
    play: function (text, label) {
      if (!this.ok) return; var self = this; window.speechSynthesis.cancel();
      this.text = text; this.label = label; this.state = 'playing'; var tok = ++this.tok;
      var parts = String(text).replace(/\s+/g, ' ').match(/[^.!?…]+[.!?…]*[”"’)]*\s*/g) || [text];
      parts.forEach(function (p, i) {
        var u = new SpeechSynthesisUtterance(p.trim()); u.lang = 'en-US'; u.rate = S.settings.rate || 1;
        if (i === parts.length - 1) u.onend = function () { if (tok === self.tok && self.state === 'playing') { self.state = 'idle'; player(); } };
        window.speechSynthesis.speak(u);
      });
      player();
    },
    pause: function () { window.speechSynthesis.pause(); this.state = 'paused'; player(); },
    resume: function () { window.speechSynthesis.resume(); this.state = 'playing'; player(); },
    restart: function () { this.play(this.text, this.label); },
    stop: function () { if (this.ok) { this.tok++; window.speechSynthesis.cancel(); } this.state = 'idle'; player(); }
  };
  function player() {
    var p = $('#player'); if (!p) return;
    if (Speech.state === 'idle') { p.hidden = true; p.innerHTML = ''; return; }
    p.hidden = false;
    p.innerHTML = '<p class="pl-label"><span class="pl-dot" aria-hidden="true"></span>Reading aloud: <strong>' + esc(Speech.label) + '</strong> <span class="pl-note">The words are on the page.</span></p><div class="pl-btns">' +
      (Speech.state === 'playing' ? '<button type="button" data-act="spPause">Pause</button>' : '<button type="button" data-act="spResume">Resume</button>') +
      '<button type="button" data-act="spRestart">Restart</button><button type="button" data-act="spStop">Stop</button></div>';
  }

  /* ------------------------------------------------------------------
     PROGRESS
     ------------------------------------------------------------------ */
  var ROUTE = [{ k: 'ATL', lab: 'ATL' }, { k: 'arrival', lab: 'Arrival' }].concat(T.stops.map(function (s) { return { k: s.id, lab: s.route }; })).concat([{ k: 'yours', lab: 'Your Chicago' }, { k: 'return', lab: 'Return' }]);
  function routeDone(k) { if (k === 'ATL') return !!S.done.pre; if (k === 'arrival') return !!S.done.arrival; if (k === 'yours') return !!S.guide.locked; if (k === 'return') return !!S.done.book; return S.status[k] === 'explored'; }
  function routeCurrent(name, param) {
    if (name === 'preflight' || name === 'takeoff') return 'ATL'; if (name === 'arrival') return 'arrival'; if (name === 'stop') return param;
    if (name === 'gate' || name === 'creator') return 'yours'; if (['reveal', 'after', 'eq', 'real', 'flighthome', 'book', 'receipt'].indexOf(name) > -1) return 'return'; return null;
  }
  function stopsDone() { return ROUTE.filter(function (r) { return routeDone(r.k); }).length; }
  function exploredCount() { return T.stops.filter(function (s) { return S.status[s.id] === 'explored'; }).length; }
  function allExplored() { return exploredCount() === T.stops.length; }
  function stopById(id) { return T.stops.filter(function (s) { return s.id === id; })[0]; }
  function furthest() {
    if (!allExplored()) return 'hub'; if (!S.guide.locked) return 'creator'; if (!S.done.reveal) return 'reveal'; if (!S.done.after) return 'after';
    if (!S.done.eq) return 'eq'; if (!S.done.real) return 'real'; if (!S.done.ret) return 'flighthome'; if (!S.done.book) return 'book'; return 'receipt';
  }
  var FINAL = ['gate', 'creator', 'reveal', 'after', 'eq', 'real', 'flighthome', 'book', 'receipt'];
  function guard(name, param) {
    if (['welcome', 'checkin', 'preflight'].indexOf(name) > -1) return null;
    if (!S.done.pre) return 'preflight';
    if (name === 'takeoff' || name === 'arrival') return null;
    if (!S.done.arrival) return 'arrival';
    if (name === 'stop' && !stopById(param)) return 'hub';
    if (name === 'side' && !T.sideQuests.some(function (q) { return q.id === param; })) return 'hub';
    var i = FINAL.indexOf(name);
    if (i > -1) { var f = furthest(); if (f === 'hub') return 'hub'; if (name !== 'gate' && i > FINAL.indexOf(f)) return f; }
    return null;
  }

  /* ------------------------------------------------------------------
     VOCAB + TOASTS + STAMP + FLY ANIMATION
     ------------------------------------------------------------------ */
  function toast(html) {
    var box = $('#toasts'); if (!box) return; var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html; box.appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 5200);
  }
  function unlock() {
    Array.prototype.slice.call(arguments).forEach(function (k) {
      if (S.vocab.indexOf(k) > -1 || !T.vocab[k]) return; S.vocab.push(k); save();
      toast('<span class="t-k">Word discovered</span><strong>' + esc(T.vocab[k].term) + '</strong><span>' + esc(T.vocab[k].def) + '</span>');
    });
  }
  function stampFx(label) {
    if (reduced()) return; var d = document.createElement('div'); d.className = 'stamp-fx'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<div class="stamp-ring">' + stars(1, 10) + '<span>Destination explored</span><b>' + esc(label) + '</b></div>'; document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1300);
  }
  function fly(fromEl, title) {
    var to = $('#passport-btn'); if (!to || !fromEl || reduced()) { pulsePassport(); return; }
    var a = fromEl.getBoundingClientRect(), b = to.getBoundingClientRect();
    var f = document.createElement('div'); f.className = 'flycard'; f.textContent = title; f.setAttribute('aria-hidden', 'true');
    f.style.left = a.left + 'px'; f.style.top = a.top + 'px'; f.style.width = Math.min(a.width, 260) + 'px'; document.body.appendChild(f);
    var dx = b.left + b.width / 2 - (a.left + Math.min(a.width, 260) / 2), dy = b.top + b.height / 2 - (a.top + 24);
    var anim = f.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.18)', opacity: .2 }], { duration: 700, easing: 'cubic-bezier(.5,0,.3,1)' });
    anim.onfinish = function () { f.remove(); pulsePassport(); };
  }
  function pulsePassport() { var p = $('#passport-btn'); if (!p) return; p.classList.remove('pulse'); void p.offsetWidth; p.classList.add('pulse'); }

  /* ------------------------------------------------------------------
     SHARED STOP PIECES
     ------------------------------------------------------------------ */
  function stopShell(id, inner, extraCls) {
    var s = stopById(id);
    return '<article class="stop stop-' + id + ' ' + (extraCls || '') + '"><div class="stop-bar wrap"><a class="back" href="#/hub"><span aria-hidden="true">‹</span> Back to the map</a>' + (S.status[id] === 'explored' ? '<span class="stamped">● Explored</span>' : '<span class="inprog">◐ In progress</span>') + '</div>' +
      '<header class="stop-head wrap"><p class="stop-line"><span class="line-dot" aria-hidden="true"></span>' + esc(s.route) + ' stop</p><h1>' + esc(s.title) + '</h1><p class="tagline">' + esc(s.tagline) + '</p></header>' + inner + '</article>';
  }
  function packSection(stop, items) {
    var cur = S.suitcase[stop];
    return '<section class="wrap block pack"><h2 class="h-section" id="pack-' + stop + '" tabindex="-1">Pack one thing</h2><p>Choose one piece of evidence for your suitcase. You’ll use it at the end of the trip, so choose something worth keeping.</p>' +
      '<div class="pack-grid" role="radiogroup" aria-labelledby="pack-' + stop + '">' + items.map(function (it) {
        var on = cur === it.id;
        return '<button type="button" class="pack-item' + (on ? ' is-on' : '') + '" role="radio" aria-checked="' + on + '" id="pk-' + it.id + '" data-act="pack" data-stop="' + stop + '" data-id="' + it.id + '">' + thumb(it) + '<span class="pk-body"><span class="kind">' + esc(it.kind) + '</span><span class="pk-title">' + esc(it.title) + '</span><span class="pk-text">' + esc(it.text) + '</span></span><span class="pk-check" aria-hidden="true">' + (on ? '✓ Packed' : 'Pack') + '</span></button>';
      }).join('') + '</div>' + (cur ? '<p class="packed" role="status">In your suitcase: <strong>' + esc(ITEMS[cur].title) + '</strong>. You can swap it any time.</p>' : '') + '</section>';
  }
  function meterSection(stop) {
    var sel = S.meter[stop] || [];
    return '<section class="wrap block meter"><h2 class="h-section">Your impression so far <span class="opt">optional</span></h2><p>Choose up to three words for the Chicago you just encountered. This tracks <em>your</em> impression, not what Chicago “is.”</p>' +
      '<div class="chips" role="group" aria-label="Impression words, choose up to three">' + T.meterWords.map(function (w) {
        var on = sel.indexOf(w) > -1, dis = !on && sel.length >= 3;
        return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" id="mt-' + stop + '-' + w + '" aria-pressed="' + on + '" data-act="meter" data-stop="' + stop + '" data-w="' + w + '"' + (dis ? ' aria-disabled="true"' : '') + '>' + esc(w) + '</button>';
      }).join('') + '</div>' + (sel.length >= 3 ? '<p class="small">Three chosen. Unselect one to swap.</p>' : '') + '</section>';
  }
  function finishSection(stop) {
    return '<section class="wrap block finish">' + missingBox(stop) + (S.status[stop] === 'explored'
      ? '<p class="stamped-note">● Passport stamped. Changes you make here are still saved.</p><a class="btn btn-primary" href="#/hub">Back to the map</a>'
      : '<button type="button" class="btn btn-primary btn-xl" data-act="finish" data-stop="' + stop + '">Stamp my passport</button>') + '</section>';
  }
  function needPack(stop) { return S.suitcase[stop] ? [] : [{ id: 'pack-' + stop, msg: 'Pack one thing for your suitcase.' }]; }
  function needText(path, msg) { return txt(getP(path)) ? [] : [{ id: fid(path), msg: msg }]; }

  /* ------------------------------------------------------------------
     SCREENS
     ------------------------------------------------------------------ */
  function boardingPass() {
    return '<div class="pass" role="group" aria-label="Boarding pass"><div class="pass-main"><div class="pass-top"><span>Boarding pass</span><span>Flight ' + esc(T.meta.flight) + '</span></div>' +
      '<div class="pass-cities"><div><span class="lbl">Departure</span><b>ATL</b><span>Atlanta</span></div><svg class="pass-plane" viewBox="0 0 64 24" aria-hidden="true" focusable="false"><path d="M2 12h52" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M50 6l10 6-10 6z" fill="currentColor"/></svg><div class="to"><span class="lbl">Destination</span><b>CHI</b><span>Chicago, Illinois</span></div></div>' +
      '<dl class="pass-grid"><div><dt>Passenger</dt><dd>' + esc(txt(S.name) || 'You') + '</dd></div><div><dt>Purpose</dt><dd>Investigation</dd></div><div><dt>Duration</dt><dd>' + esc(T.meta.duration) + '</dd></div></dl></div>' +
      '<div class="pass-stub" aria-hidden="true"><span class="lbl">Seat</span><b>7A</b><span class="barcode"></span></div></div>';
  }
  function flagBand() { return '<div class="flagband" aria-hidden="true"><span class="fb-stripe"></span>' + stars(4, 14) + '<span class="fb-stripe"></span></div>'; }

  var SCREENS = {};

  SCREENS.welcome = function () {
    return '<section class="hero"><div class="hero-inner"><p class="hero-route"><span>ATL</span><span class="dash" aria-hidden="true"></span><span>CHI</span><span class="sr-only">Atlanta to Chicago</span></p>' +
      '<h1 class="hero-title">Trip to Chicago</h1><p class="hero-sub">One city. Many stories.</p>' + flagBand() + boardingPass() +
      '<div class="hero-cta"><a class="btn btn-red btn-xl" href="#/checkin">Check in</a>' + (S.done.pre ? '<a class="btn btn-ghost-light" href="#/' + (S.done.arrival ? (allExplored() ? furthest() : 'hub') : 'arrival') + '">Resume my trip</a>' : '') + '</div>' +
      '<p class="hero-note">Put on headphones if you have them. Your answers save on this computer as you go.</p></div></section>';
  };

  SCREENS.checkin = function () {
    return '<section class="screen-dark"><div class="wrap narrow screen-pad"><h1 class="h-display">Check in</h1>' +
      field('name', { label: 'First name or initials (optional)', desc: 'This stays on this computer only. It isn’t sent anywhere.', max: 20 }) +
      '<div class="mission" id="mission"><h2>Your mission</h2><p>You’ve probably already encountered a version of Chicago.</p><p class="stack-lines">Maybe through sports.<br>Music.<br>Movies.<br>TikTok.<br>News.<br>Family.<br>School.</p><p>Today, you’re going there yourself.</p><p>You will encounter different versions of the same city. Your job isn’t to decide immediately which one is “correct.”</p><p class="em">Your job is to collect evidence.</p></div>' + lis('mission', 'Your mission') +
      '<div class="rule"><h2>One rule</h2><p>Never assume one source tells the whole story.</p></div>' +
      '<a class="btn btn-primary btn-xl" href="#/preflight">Get my boarding pass</a></div></section>';
  };

  SCREENS.preflight = function () {
    var other = (S.pre.sources || []).indexOf(9) > -1;
    return '<section class="wrap narrow screen-pad">' + boardingPass() + '<h1>Before we go…</h1><p class="lede">Answer from what you already know. There are no wrong answers here, and nobody is grading these words.</p>' +
      '<div class="block">' + threeWords('pre.w', 'What three words come to mind when you hear “Chicago”?') + '</div>' +
      '<div class="block">' + checks('pre.sources', T.preflightSources, 'Where have you encountered Chicago before? Choose all that apply.') + (other ? field('pre.other', { label: 'Other: where?', max: 80 }) : '') + '</div>' +
      '<div class="block">' + field('pre.explain', { label: 'Imagine a student from another country asks, “What’s Chicago like?” What would you tell them right now?', rows: 3 }) + '</div>' +
      missingBox('pre') + '<button type="button" class="btn btn-primary btn-xl" data-act="boardFlight">Board flight</button></section>';
  };

  function flaps(t, n) { t = String(t).toUpperCase(); while (t.length < n) t += ' '; return t.split('').map(function (c, i) { return '<span class="flap" style="--i:' + i + '">' + (c === ' ' ? '&nbsp;' : esc(c)) + '</span>'; }).join(''); }
  function flightMap(from, to) {
    var A = { ATL: [470, 210], CHI: [190, 60] }, a = A[from], b = A[to], still = reduced();
    return '<svg class="fmap" viewBox="0 0 640 270" role="img" aria-label="Flight path from ' + (from === 'ATL' ? 'Atlanta to Chicago' : 'Chicago to Atlanta') + '"><defs><pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#41B6E6" opacity=".35"/></pattern></defs><rect width="640" height="270" fill="url(#dots)"/>' +
      '<path id="fpath" d="M' + a[0] + ' ' + a[1] + ' Q' + ((a[0] + b[0]) / 2 + 40) + ' ' + (Math.min(a[1], b[1]) - 40) + ' ' + b[0] + ' ' + b[1] + '" stroke="#41B6E6" stroke-width="3" fill="none" stroke-dasharray="6 6" class="fpath"/>' +
      '<circle cx="' + A.ATL[0] + '" cy="' + A.ATL[1] + '" r="8" fill="#F7F6F2"/><text x="' + (A.ATL[0] + 16) + '" y="' + (A.ATL[1] + 6) + '" fill="#F7F6F2" font-family="Barlow Condensed, sans-serif" font-size="22" font-weight="700">ATL</text>' +
      '<circle cx="' + A.CHI[0] + '" cy="' + A.CHI[1] + '" r="8" fill="#E4002B"/><text x="' + (A.CHI[0] - 58) + '" y="' + (A.CHI[1] + 6) + '" fill="#F7F6F2" font-family="Barlow Condensed, sans-serif" font-size="22" font-weight="700">CHI</text>' +
      (still ? '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="13" fill="none" stroke="#F7F6F2" stroke-width="2"/>' : '<circle class="plane" cx="' + a[0] + '" cy="' + a[1] + '" r="8" fill="#F7F6F2" stroke="#41B6E6" stroke-width="3"/>') + '</svg>';
  }
  function flyPlane(dur) {
    var path = $('#fpath'), pl = $('.plane'); if (!path || !pl || !path.getTotalLength) return;
    var L = path.getTotalLength(), t0 = null;
    function step(ts) { if (!document.body.contains(pl)) return; if (t0 == null) t0 = ts; var k = Math.min(1, (ts - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, pt = path.getPointAtLength(L * e); pl.setAttribute('cx', pt.x); pl.setAttribute('cy', pt.y); if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  function board(rows) {
    return '<div class="board" role="group" aria-label="Departure board">' + rows.map(function (r) {
      return '<div class="board-row"><span class="board-k">' + esc(r[0]) + '</span><span class="board-v" ' + (r[2] ? 'id="' + r[2] + '" aria-live="polite"' : '') + '><span class="sr-only">' + esc(r[1]) + '</span><span aria-hidden="true" class="flaps">' + flaps(r[1], r[3] || 0) + '</span></span></div>';
    }).join('') + '</div>';
  }
  SCREENS.takeoff = function () {
    return '<section class="takeoff"><h1 class="sr-only">Takeoff: Atlanta to Chicago</h1>' + board([['Flight', T.meta.flight], ['Route', 'Atlanta → Chicago'], ['Status', 'Boarding', 'board-status', 9]]) +
      '<div class="fmap-wrap" id="fmap"></div><div class="takeoff-actions"><a class="btn btn-ghost-light" href="#/arrival" data-act="skipFlight" id="skip">Skip flight</a></div></section>';
  };

  function arrivalItems(v) {
    return T.arrival[v].items.map(function (it) { var o = {}; for (var k in it) o[k] = it[k]; if (o.art === 'redmap' && T.map.realMapImg) o.img = T.map.realMapImg; if (!T.arrivalUsePhotos) o.img = ''; return o; });
  }
  SCREENS.arrival = function () {
    var v = { items: arrivalItems(T.arrival[S.arrival] ? S.arrival : 'A') };
    return '<section class="wrap screen-pad arrival"><p class="arr-tag"><span class="line-dot" aria-hidden="true"></span>Now arriving · Chicago</p><h1>You just arrived.</h1><p class="lede">Look around.</p>' +
      '<div class="gallery">' + v.items.map(function (it) { return pic(it); }).join('') + '</div>' +
      '<div class="arrival-q block">' + threeWords('arrivalW', 'You just arrived. Based ONLY on what you’ve seen, describe Chicago in THREE words.', S.done.arrival) + missingBox('arr') +
      (S.done.arrival ? '<a class="btn btn-primary btn-xl" href="#/hub">Enter the city</a>' : '<button type="button" class="btn btn-primary btn-xl" data-act="enterCity">Enter the city</button>') + '</div></section>';
  };

  SCREENS.hub = function () {
    var n = exploredCount(), sym = { none: '○', progress: '◐', explored: '●' }, lab = { none: 'Not visited', progress: 'In progress', explored: 'Explored' };
    var line = T.stops.map(function (s) {
      var st = S.status[s.id] || 'none';
      return '<li class="station st-' + st + '"><a class="station-btn" href="#/stop/' + s.id + '"><span class="st-dot" aria-hidden="true">' + sym[st] + '</span><span class="st-icon" aria-hidden="true">' + EMOJI[s.id] + '</span><span class="st-text"><span class="st-title">' + esc(s.title) + '</span><span class="st-tag">' + esc(s.tagline) + '</span></span><span class="st-status">' + lab[st] + '</span></a></li>';
    }).join('');
    var open = allExplored();
    line += '<li class="station station-final ' + (open ? 'is-open' : 'is-locked') + '"><button type="button" class="station-btn" data-act="final"><span class="st-dot" aria-hidden="true">' + (open ? '★' : '◇') + '</span><span class="st-icon" aria-hidden="true">🧳</span><span class="st-text"><span class="st-title">Your Chicago</span><span class="st-tag">' + (open ? 'Unlocked: become the storyteller' : 'Locked until all six are explored') + '</span></span><span class="st-status">' + (open ? 'Open' : 'Locked') + '</span></button></li>';
    return '<section class="hub wrap screen-pad"><header class="hub-head"><h1>Where will you go?</h1><p class="lede">Chicago doesn’t have one story.<br>Choose a route and investigate.</p><p class="count"><strong>' + n + ' of 6</strong> destinations explored · visit them in any order</p></header>' +
      '<ol class="line">' + line + '</ol><div id="lockmsg" class="lockmsg" aria-live="polite"></div>' +
      '<section class="sidequests" aria-labelledby="sq-h"><h2 id="sq-h">Side quests <span class="opt">optional</span></h2><p>Extra stops for the curious. They don’t count toward finishing.</p><ul class="sq-list">' +
      T.sideQuests.map(function (q) { var d = S.side.indexOf(q.id) > -1; return '<li><a class="sq' + (d ? ' is-done' : '') + '" href="#/side/' + q.id + '">' + thumb(q) + '<span>' + esc(q.name) + (d ? ' <span class="sq-v">✓<span class="sr-only"> visited</span></span>' : '') + '</span></a></li>'; }).join('') +
      '</ul></section></section>';
  };

  /* ---------- DOWNTOWN ---------- */
  function downtownHTML() {
    var D = rr('downtown'), opened = D.opened || [], n = opened.length, need = T.downtown.required, sel = T.downtown.cards.filter(function (c) { return c.id === D.sel; })[0];
    var detail = sel ? '<div class="detail" id="dt-detail" tabindex="-1"><div class="detail-media">' + pic({ art: sel.art, img: sel.img, alt: sel.alt }) + '</div><div class="detail-body"><div id="dt-text"><h2>' + esc(sel.name) + '</h2><p class="loc">' + esc(sel.location) + '</p><p>' + esc(sel.text) + '</p><h3>Why visitors come here</h3><p>' + esc(sel.why) + '</p></div><div class="detail-actions">' + lis('dt-text', sel.name) + ext(sel.url, 'Learn more') + '</div></div></div>' : '';
    var cards = T.downtown.cards.map(function (c) {
      var o = opened.indexOf(c.id) > -1;
      return '<button type="button" class="attr' + (o ? ' is-open' : '') + (D.sel === c.id ? ' is-sel' : '') + '" id="at-' + c.id + '" data-act="dtOpen" data-id="' + c.id + '" aria-pressed="' + (D.sel === c.id) + '">' + thumb(c) + '<span class="attr-name">' + esc(c.name) + '</span><span class="attr-loc">' + esc(c.location) + '</span>' + (o ? '<span class="attr-seen">✓ Explored</span>' : '') + '</button>';
    }).join('');
    var h = '<section class="wrap block"><div class="tour-site"><div class="tour-nav"><span class="tour-logo">Chicago Getaways</span><span class="tour-links" aria-hidden="true">Stay · Eat · Play · Plan</span><span class="sim-tag">Simulated tourism page</span></div>' +
      '<div class="tour-hero">' + imgOrArt({ art: 'skyline', img: T.downtown.heroImg }, 'Chicago skyline') + '<div class="tour-hero-text"><p class="tour-h">Make it a Chicago weekend.</p><p>World-class food, art, architecture, and a lake that looks like an ocean.</p></div></div></div>' +
      '<p class="instr">Explore at least four attractions. <span class="count">' + Math.min(n, need) + ' of ' + need + ' explored</span></p>' + detail + '<div class="attr-grid">' + cards + '</div></section>';
    if (n < need) return h + '<p class="wrap hint">Explore ' + (need - n) + ' more to unlock the Media Detective.</p>';
    var q1 = D.q1, q2 = D.q2 || [], fitBad = q2.some(function (i) { return T.downtown.q2.fit.indexOf(i) < 0; });
    h += '<section class="wrap block detective"><h2 class="h-section">Media detective</h2>' + storyCheck('Who created this? What is the purpose?') +
      radios('r.downtown.q1', T.downtown.q1.options, T.downtown.q1.prompt) + (q1 != null ? '<p class="fb" role="status">' + esc(q1 === T.downtown.q1.best ? T.downtown.q1.feedback : T.downtown.q1.retry) + '</p>' : '') +
      checks('r.downtown.q2', T.downtown.q2.options, T.downtown.q2.prompt) + (q2.length ? '<p class="fb" role="status">' + esc(fitBad ? 'Look again at one of your choices. Would a tourism site really want that?' : T.downtown.q2.feedback) + '</p>' : '') +
      field('r.downtown.q3', { label: T.downtown.q3, rows: 4 }) + '</section>';
    return h + packSection('downtown', opened.map(function (id) { return ITEMS[id]; })) + meterSection('downtown') + finishSection('downtown');
  }

  /* ---------- NEIGHBORHOODS ---------- */
  function chiMap(sel, opened) {
    var svg = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><rect width="100" height="100" fill="#E8EEF2"/>' +
      '<polygon points="64,0 100,0 100,100 84,100 80,85 76,70 72,50 70,38 66,20" fill="#41B6E6" opacity=".55"/>' +
      '<polygon points="8,6 64,0 66,20 70,38 72,50 76,70 80,85 84,100 36,100 30,92 8,86" fill="#F7F6F2" stroke="#0B1F33" stroke-width=".4"/>' +
      '<polyline points="70,40 52,40 44,22 40,4" fill="none" stroke="#41B6E6" stroke-width=".9"/><polyline points="52,40 48,52 30,60" fill="none" stroke="#41B6E6" stroke-width=".9"/>' +
      '<rect x="64" y="38" width="5" height="4" fill="#0B1F33"/></svg>';
    var labels = '<span class="map-lbl" style="left:86%;top:40%">Lake Michigan</span><span class="map-lbl dark" style="left:66%;top:34%">Downtown</span><span class="map-lbl soft" style="left:30%;top:16%">North Side</span><span class="map-lbl soft" style="left:14%;top:52%">West Side</span><span class="map-lbl soft" style="left:44%;top:90%">South Side</span>';
    var pins = T.neighborhoods.list.map(function (nb) {
      var o = opened.indexOf(nb.id) > -1;
      return '<button type="button" class="nb-pin' + (o ? ' is-open' : '') + (sel === nb.id ? ' is-sel' : '') + '" id="pin-' + nb.id + '" style="left:' + nb.x + '%;top:' + nb.y + '%" data-act="nbOpen" data-id="' + nb.id + '" aria-pressed="' + (sel === nb.id) + '">' + esc(nb.name) + (o ? '<span class="sr-only"> (explored)</span>' : '') + '</button>';
    }).join('');
    return '<div class="chimap">' + svg + labels + pins + '</div><p class="map-note">Simplified map, not to scale.</p>';
  }
  function neighborhoodsHTML() {
    var N = rr('neighborhoods'), opened = N.opened || [], n = opened.length, need = T.neighborhoods.required, nb = T.neighborhoods.list.filter(function (x) { return x.id === N.sel; })[0];
    var detail = nb ? '<div class="nb-detail" id="nb-detail" tabindex="-1"><div id="nb-text"><p class="nb-side">' + esc(nb.side) + '</p><h2>' + esc(nb.name) + '</h2>' +
      '<h3 class="lbl-h">See it</h3></div><div class="see-row">' + nb.see.map(function (p) { return pic(p); }).join('') + '</div><div id="nb-text2">' +
      '<h3 class="lbl-h">Find it</h3><p>' + esc(nb.find) + '</p><h3 class="lbl-h">Notice</h3><p>' + esc(nb.notice) + '</p><h3 class="lbl-h">Story</h3><p>' + esc(nb.story) + '</p></div>' +
      '<div class="dont-reduce"><h3 class="lbl-h">Don’t reduce it</h3><p>' + esc(nb.reduce) + '</p></div>' + lis('nb-text2', nb.name) + '</div>'
      : '<div class="nb-detail empty"><p>Pick a neighborhood on the map to start exploring.</p></div>';
    var h = '<section class="wrap block" id="nb-intro"><p class="big-quote">Downtown is Chicago.<br>But downtown is not all of Chicago.</p><p>' + esc(T.neighborhoods.intro) + '</p></section><div class="wrap">' + lis('nb-intro', 'Neighborhoods introduction') + '</div>' +
      '<section class="wrap block"><h2 class="h-section">Choose three neighborhoods</h2><p class="count">' + Math.min(n, need) + ' of ' + need + ' explored</p><div class="nb-layout"><div>' + chiMap(N.sel, opened) + '</div>' + detail + '</div></section>';
    if (n < need) return h + '<p class="wrap hint">Explore ' + (need - n) + ' more to continue.</p>';
    h += '<section class="wrap block"><h2 class="h-section">Think it through</h2>' + storyCheck('What gets emphasized? What’s missing?') +
      T.neighborhoods.questions.map(function (q, i) { return field('r.neighborhoods.q' + i, { label: q, rows: 3 }); }).join('') + '</section>';
    return h + packSection('neighborhoods', opened.map(function (id) { return ITEMS['nb-' + id]; })) + meterSection('neighborhoods') + finishSection('neighborhoods');
  }

  /* ---------- THE MAP ---------- */
  function bigRedmap() {
    var cols = { A: '#8FB87A', B: '#7FA9CF', C: '#E3CF6B', D: '#D46A5E' }, n = { A: 0, B: 0, C: 0, D: 0 };
    var s = '<svg class="redmap-big" viewBox="0 0 600 420" role="img" aria-label="An old city map divided into numbered areas. Each area is shaded green, blue, yellow, or red and labeled with a letter A, B, C, or D. Red D areas cluster in the center near a rail line and factories. Yellow C areas surround them. Blue B and green A areas sit at the edges and along the lake.">' +
      '<rect width="600" height="420" fill="#EFE6D2"/><path d="M520 0 H600 V420 H540 Q520 300 530 200 T520 0Z" fill="#BFD4DE"/>';
    for (var r = 0; r < 8; r++) for (var c = 0; c < 10; c++) {
      var d = Math.hypot(c - 4.2, r - 3.6), g = d < 1.7 ? 'D' : d < 3 ? 'C' : d < 4.3 ? 'B' : 'A';
      if (c === 9) g = (r % 3 === 0) ? 'B' : 'A'; if (Math.abs((r * 50 + 20) - (380 - (c * 50 + 20) * 0.66)) < 26 && g !== 'A') g = 'D';
      n[g]++; var x = 14 + c * 50, y = 14 + r * 49;
      s += '<rect x="' + x + '" y="' + y + '" width="46" height="45" fill="' + cols[g] + '" opacity=".8" stroke="#6B5E4E" stroke-width="1"/><text x="' + (x + 6) + '" y="' + (y + 16) + '" font-size="12" font-family="Georgia, serif" fill="#3A3127">' + g + n[g] + '</text>';
    }
    s += '<path d="M0 400 L560 30" stroke="#202124" stroke-width="5" stroke-dasharray="14 6"/>';
    [[200, 210], [240, 180], [275, 225]].forEach(function (p) { s += '<path d="M' + p[0] + ' ' + p[1] + ' l10 -10 v10 l10 -10 v10 l10 -10 v18 h-30z" fill="#3A3127"/>'; });
    return s + '<rect x="22" y="352" width="200" height="44" fill="#F7F1E3" stroke="#3A3127"/><text x="32" y="372" font-size="13" font-family="Georgia, serif" fill="#3A3127">RESIDENTIAL SECURITY MAP</text><text x="32" y="388" font-size="10" font-family="Georgia, serif" fill="#3A3127">Prepared 1930s</text><text x="548" y="210" font-size="13" font-family="Georgia, serif" fill="#2D4A66" transform="rotate(90 548 210)">LAKE</text></svg>';
  }
  function mapHTML() {
    var M = rr('map'), z = M.zoom || 1, rev = !!M.revealed, k = M.chain || 0, C = T.map.chain;
    var img = T.map.realMapImg ? '<img src="' + esc(T.map.realMapImg) + '" alt="Historical HOLC residential security map of Chicago" data-art="redmap">' : bigRedmap();
    var cap = T.map.realMapImg ? (rev ? esc(T.map.realMapCredit || 'Historical map.') : 'A historical map of Chicago. Who made it, and why, is revealed after you investigate.') : 'An illustration modeled on a real 1930s map of an American city. It is not exact Chicago geography. ' + (rev ? 'You can see the authentic Chicago map at Mapping Inequality (link below).' : 'The original is linked after you investigate.');
    var h = '<section class="wrap block"><p class="big-quote">Something is going on with this map.</p><p class="instr"><strong>Don’t click “Reveal the map” yet.</strong> Investigate first.</p>' +
      '<div class="mapviewer"><div class="mv-tools" role="group" aria-label="Map zoom"><button type="button" data-act="zoom" data-z="1" id="zin">Zoom in</button><button type="button" data-act="zoom" data-z="-1" id="zout">Zoom out</button><button type="button" data-act="zoom" data-z="0" id="zreset">Reset</button><span class="mv-z">' + Math.round(z * 100) + '%</span></div>' +
      '<div class="mv-frame" tabindex="0" aria-label="Map viewer. When zoomed in, scroll or use arrow keys to move around."><div class="mv-inner" style="width:' + (z * 100) + '%">' + img + '</div></div><p class="mv-cap">' + cap + '</p></div>' +
      T.map.prompts.map(function (q, i) { return field('r.map.p' + i, { label: q, rows: 2 }); }).join('') + field('r.map.pred', { label: T.map.prediction, rows: 2 });
    if (!rev) return h + missingBox('mapr') + '<button type="button" class="btn btn-primary btn-xl" data-act="mapReveal">Reveal the map</button></section>';
    h += '</section><section class="wrap block reveal-box" id="map-reveal"><h2 class="h-section">The map, revealed</h2><div id="map-rev-text">' + T.map.reveal.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
      '<ul class="legend"><li><span class="sw" style="background:#8FB87A"></span><b>A · Green</b> “Best”</li><li><span class="sw" style="background:#7FA9CF"></span><b>B · Blue</b> “Still desirable”</li><li><span class="sw" style="background:#E3CF6B"></span><b>C · Yellow</b> “Declining”</li><li><span class="sw" style="background:#D46A5E"></span><b>D · Red</b> “Hazardous”</li></ul>' +
      lis('map-rev-text', 'The map, revealed') + '<aside class="caution"><p>' + esc(T.map.caution) + '</p></aside><p>' + ext('https://dsl.richmond.edu/panorama/redlining/', 'See the authentic 1940 Chicago map at Mapping Inequality') + '</p></section>' +
      '<section class="wrap block"><h2 class="h-section">Follow the chain</h2><p>Click each step to see how one decision leads to the next.</p><ol class="chain">';
    for (var i = 0; i <= Math.min(k, C.length - 1); i++) {
      var open = i < k;
      h += (i ? '<li class="chain-arrow" aria-hidden="true">↓</li>' : '') + '<li class="chain-step' + (open ? ' is-open' : '') + '"><button type="button" id="ch-' + i + '" data-act="chain" data-i="' + i + '" aria-expanded="' + open + '">' + esc(C[i].label) + '</button>' + (open ? '<p>' + esc(C[i].text) + '</p>' : '') + '</li>';
    }
    h += '</ol>' + (k < C.length ? '<p class="hint">' + (C.length - k) + ' step' + (C.length - k > 1 ? 's' : '') + ' left in the chain.</p></section>' : '</section>');
    if (k < C.length) return h;
    h += '<section class="wrap block">' + storyCheck('Who created this map? Who was the audience?') + field('r.map.q', { label: T.map.question, rows: 4 }) + '</section>';
    return h + packSection('map', ['map-map', 'map-chain', 'map-1968'].map(function (id) { return ITEMS[id]; })) + meterSection('map') + finishSection('map');
  }

  /* ---------- HOUSING ---------- */
  function housingHTML() {
    var H = rr('housing'), seen = H.seen || [], cur = H.tab || 'why';
    var h = '<section class="wrap block"><h2 class="h-section">Before exploring</h2>' + field('r.housing.priv', { label: T.housing.privatePrompt, rows: 3, desc: 'Your response is private. Nobody else in class can see it. It won’t appear on your Trip Receipt.' });
    if (!H.started) return h + missingBox('hs0') + '<button type="button" class="btn btn-primary" data-act="housingStart">Start exploring</button></section>';
    h += '</section>';
    var L = T.housing.lenses, lens = L.filter(function (l) { return l.id === cur; })[0];
    h += '<section class="wrap block"><h2 class="h-section">One place. Three lenses.</h2><p class="count">' + seen.length + ' of 3 lenses opened</p>' +
      '<div class="tabs" role="tablist" aria-label="Three lenses">' + L.map(function (l, i) {
        var on = l.id === cur;
        return '<button type="button" role="tab" id="tab-' + l.id + '" aria-selected="' + on + '" aria-controls="lens-panel" tabindex="' + (on ? 0 : -1) + '" data-act="lens" data-id="' + l.id + '"><span class="tab-n">Lens ' + (i + 1) + (seen.indexOf(l.id) > -1 ? ' ✓' : '') + '</span><span class="tab-t">' + esc(l.tab) + '</span></button>';
      }).join('') + '</div><div class="tabpanel" role="tabpanel" id="lens-panel" aria-labelledby="tab-' + cur + '" tabindex="0"><figure class="tp-fig"><div class="tp-art">' + imgOrArt(lens, lens.alt || '', !lens.alt) + '</div>' + (lens.img && lens.caption ? '<figcaption class="tp-cap">' + esc(lens.caption) + '</figcaption>' : '') + '</figure><div id="lens-text">' +
      lens.chunks.map(function (c) { if (cur === 'wrong') { var p = c.indexOf('. '); return '<p><strong>' + esc(c.slice(0, p + 1)) + '</strong> ' + esc(c.slice(p + 2)) + '</p>'; } return '<p>' + esc(c) + '</p>'; }).join('') + '</div>' + lis('lens-text', lens.tab) + '</div>' +
      '<p class="note">' + esc(T.housing.note) + '</p></section>';
    if (seen.length < 3) return h + '<p class="wrap hint">Open all three lenses to continue.</p>';
    h += '<section class="wrap block"><h2 class="h-section">Same place, three tellers</h2><div class="venn" role="img" aria-label="Three overlapping circles: Government and policy, News and historical reporting, Residents">' +
      T.housing.circles.map(function (c, i) { return '<span class="vc vc' + i + '"><span>' + esc(c) + '</span></span>'; }).join('') + '</div>' +
      field('r.housing.q1', { label: T.housing.q1, rows: 3 }) + checks('r.housing.q2', T.housing.circles.concat(['Other voices we haven’t heard yet']), T.housing.q2) + field('r.housing.q2x', { label: 'Explain your choice.', rows: 3 }) + storyCheck('Whose voice do we hear? Whose voice don’t we hear?') + '</section>';
    return h + packSection('housing', ['hs-why', 'hs-wrong', 'hs-home', 'hs-lens'].map(function (id) { return ITEMS[id]; })) + meterSection('housing') + finishSection('housing');
  }

  /* ---------- HEADLINES ---------- */
  function post(p, fresh) {
    return '<article class="post' + (fresh ? ' is-new' : '') + '"><div class="post-thumb">' + art(p.art, '', p.tag) + '</div><div class="post-body"><p class="post-meta"><span class="tag">' + esc(p.tag) + '</span>' + esc(p.time || 'Today') + '</p><h3 class="post-h">' + esc(p.text) + '</h3><p class="post-src">Simulated headline · representative type of coverage</p></div></article>';
  }
  function headlinesHTML() {
    var Hh = rr('headlines'), st = Hh.stage || 0, X = T.headlines;
    var h = '<section class="wrap block"><p class="sim-banner" role="note"><strong>Simulated news feed — built from real types of Chicago coverage.</strong> ' + esc(X.banner) + '</p>' +
      '<div class="feed' + (st >= 3 ? ' feed-mixed' : '') + '" aria-label="Simulated news feed">' + (st >= 3 ? '<p class="feed-new" role="status">10 more stories loaded</p>' + X.round2.map(function (p) { return post(p, true); }).join('') : '') + X.round1.map(function (p) { return post(p); }).join('') + '</div>';
    if (st === 0) h += '<button type="button" class="btn btn-primary btn-xl" data-act="hlStage" data-s="1">I’ve read these stories</button>';
    if (st === 2) h += '<button type="button" class="btn btn-primary btn-xl" data-act="hlStage" data-s="3" id="loadmore">Load more stories</button>';
    h += '</section>';
    if (st === 1) h += '<div class="stop-overlay" role="dialog" aria-modal="true" aria-labelledby="stop-h"><div class="stop-card"><p class="stop-word" id="stop-h">Stop.</p><p class="stop-lede">Imagine these are the ONLY Chicago stories you’ve encountered for an entire year.</p>' + threeWords('r.headlines.w', 'Describe Chicago in three words.') + missingBox('hl1') + '<button type="button" class="btn btn-primary" data-act="hlStopDone">Continue</button></div></div>';
    if (st < 3) return h;
    h += '<section class="wrap block">' + radios('r.headlines.q1', ['Yes', 'No', 'I’m not sure'], X.q1) + '</section>';
    if (Hh.q1 == null) return h;
    h += '<section class="wrap block selection" id="sel-box"><h2 class="h-section">Selection</h2><div id="sel-text"><p>Media creators cannot show everything. Someone chooses:</p><ul class="sel-list">' + X.selection.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' + lis('sel-text', 'Selection') +
      '<p class="truth"><span>True</span> does not always mean <span>complete.</span></p></section>' +
      '<section class="wrap block">' + storyCheck('What gets emphasized? What’s missing?') + field('r.headlines.q2', { label: X.q2, rows: 4, desc: 'Write 2–4 sentences.' }) + '</section>';
    return h + packSection('headlines', ['hl-feed1', 'hl-feed2', 'hl-true', 'hl-selection'].map(function (id) { return ITEMS[id]; })) + meterSection('headlines') + finishSection('headlines');
  }

  /* ---------- CHICAGOANS ---------- */
  function chicagoansHTML() {
    var V = rr('chicagoans'), opened = V.opened || [], n = opened.length, need = T.chicagoans.required, cat = T.chicagoans.categories.filter(function (c) { return c.id === V.sel; })[0];
    var h = '<section class="wrap block voices-intro"><p class="big-quote">Now hear from the city itself.</p><p>So far you’ve seen Chicago through visitors’ eyes, maps, policies, and headlines. This stop is different: art, music, food, and traditions made by Chicagoans.</p></section>' +
      '<section class="wrap block"><h2 class="h-section">Choose three</h2><p class="count">' + Math.min(n, need) + ' of ' + need + ' explored</p><div class="voice-grid">' +
      T.chicagoans.categories.map(function (c) { var o = opened.indexOf(c.id) > -1; return '<button type="button" class="voice' + (o ? ' is-open' : '') + (V.sel === c.id ? ' is-sel' : '') + '" id="vc-' + c.id + '" data-act="chOpen" data-id="' + c.id + '" aria-pressed="' + (V.sel === c.id) + '">' + thumb(c) + '<span class="v-name">' + esc(c.name) + '</span><span class="v-line">' + esc(c.line) + '</span>' + (o ? '<span class="attr-seen">✓ Explored</span>' : '') + '</button>'; }).join('') + '</div>';
    if (cat) h += '<div class="detail warm" id="ch-detail" tabindex="-1"><div class="detail-media">' + pic({ art: cat.art, img: cat.img, alt: cat.caption || cat.line, caption: cat.img ? cat.caption : '' }) + '</div><div class="detail-body"><div id="ch-text"><h2>' + esc(cat.name) + '</h2><p class="loc">' + esc(cat.line) + '</p>' + cat.chunks.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div><div class="detail-actions">' + lis('ch-text', cat.name) + ext(cat.source.url, 'Source: ' + cat.source.title) + '</div></div></div>';
    h += '</section>';
    if (n < need) return h + '<p class="wrap hint">Explore ' + (need - n) + ' more to continue.</p>';
    h += '<section class="wrap block">' + storyCheck('Whose voice do we hear?') + field('r.chicagoans.q1', { label: T.chicagoans.q1, rows: 3 }) + field('r.chicagoans.q2', { label: T.chicagoans.q2, rows: 3 }) + '</section>';
    return h + packSection('chicagoans', opened.map(function (id) { return ITEMS['ch-' + id]; })) + meterSection('chicagoans') + finishSection('chicagoans');
  }

  var STOP_HTML = { downtown: downtownHTML, neighborhoods: neighborhoodsHTML, map: mapHTML, housing: housingHTML, headlines: headlinesHTML, chicagoans: chicagoansHTML };
  SCREENS.stop = function (id) { return stopShell(id, STOP_HTML[id](), id === 'chicagoans' ? 'warm' : ''); };

  var VALID = {
    downtown: function () { var D = rr('downtown'), m = []; if (D.q1 == null) m.push({ id: 'r-downtown-q1-0', msg: 'Choose the likely audience for tourism advertising.' }); if (!(D.q2 || []).length) m.push({ id: 'r-downtown-q2-0', msg: 'Choose at least one thing a tourism organization wants its audience to do.' }); return m.concat(needText('r.downtown.q3', 'Explain whether a tourism website has to lie. A few sentences is plenty.')); },
    neighborhoods: function () { var m = []; [0, 1, 2].forEach(function (i) { m = m.concat(needText('r.neighborhoods.q' + i, 'Answer: “' + T.neighborhoods.questions[i] + '”')); }); return m; },
    map: function () { return needText('r.map.q', 'Explain how decisions from decades ago could still matter today.'); },
    housing: function () { var H = rr('housing'), m = needText('r.housing.q1', 'Explain why the three perspectives don’t tell the same story.'); if (!(H.q2 || []).length) m.push({ id: 'r-housing-q2-0', msg: 'Choose the perspective(s) you’d need.' }); return m.concat(needText('r.housing.q2x', 'Explain your choice of perspectives.')); },
    headlines: function () { return needText('r.headlines.q2', 'Explain how true stories can still create a misleading impression.'); },
    chicagoans: function () { return needText('r.chicagoans.q1', 'Answer what Chicagoans show us that outsiders might overlook.').concat(needText('r.chicagoans.q2', 'Answer whether one person can speak for every Chicagoan.')); }
  };

  /* ---------- SIDE QUESTS ---------- */
  SCREENS.side = function (id) {
    var q = T.sideQuests.filter(function (x) { return x.id === id; })[0];
    return '<article class="side wrap narrow screen-pad"><div class="stop-bar"><a class="back" href="#/hub"><span aria-hidden="true">‹</span> Back to the map</a><span class="sq-tag">Side quest · optional</span></div><h1>' + esc(q.name) + '</h1>' + pic({ art: q.art, img: q.img, alt: q.caption || q.name, caption: q.img ? q.caption : '' }) +
      '<div id="sq-text">' + q.chunks.map(function (c) { return '<p>' + esc(c) + '</p>'; }).join('') + '</div>' + lis('sq-text', q.name) +
      (q.poll ? '<div class="block">' + radios('sidePoll.' + q.id, q.poll, 'Cast your vote. It stays on this computer.') + '</div>' : '') + (q.url ? '<p>' + ext(q.url, 'Learn more') + '</p>' : '') + '<a class="btn btn-primary" href="#/hub">Back to the map</a></article>';
  };

  /* ---------- GATE ---------- */
  SCREENS.gate = function () {
    return '<section class="gate wrap screen-pad"><h1 class="h-display">You’ve seen six Chicagos.</h1><p class="lede">Here’s what you packed, in the order you traveled:</p><ol class="suitcase-row">' +
      S.order.filter(function (id) { return S.suitcase[id]; }).map(function (id) { var it = ITEMS[S.suitcase[id]]; return '<li class="evidence">' + thumb(it) + '<span class="kind">' + esc(it.kind) + '</span><span class="ev-title">' + esc(it.title) + '</span><span class="ev-from">From ' + esc(stopById(id).title) + '</span></li>'; }).join('') +
      '</ol><p class="problem">But here’s the problem:</p><p class="big-quote">You can’t show someone everything you’ve seen.</p><a class="btn btn-primary btn-xl" href="#/creator">Become the storyteller</a></section>';
  };

  /* ---------- CREATOR ---------- */
  SCREENS.creator = function () {
    var G = S.guide, lk = G.locked, used = G.tiles.filter(Boolean);
    var pool1 = T.stops.map(function (s) { return S.suitcase[s.id]; }).filter(Boolean), have = pool1.map(function (id) { return ITEMS[id].title.toLowerCase(); }), pool2 = T.creatorBank.map(function (b) { return b.id; }).filter(function (id) { return pool1.indexOf(id) < 0 && have.indexOf(ITEMS[id].title.toLowerCase()) < 0; });
    var poolList = function (ids) { return '<ul class="pool">' + ids.map(function (id) { var it = ITEMS[id], u = used.indexOf(id) > -1; return '<li><button type="button" class="pool-item' + (u ? ' is-used' : '') + '" id="pl-' + id + '" draggable="' + (!u) + '" data-act="slot" data-id="' + id + '"' + (u ? ' aria-disabled="true"' : '') + '>' + thumb(it) + '<span class="pk-body"><span class="kind">' + esc(it.kind) + '</span><span class="pk-title">' + esc(it.title) + '</span></span><span class="pool-add">' + (u ? 'Added' : 'Add') + '</span></button></li>'; }).join('') + '</ul>'; };
    var slots = G.tiles.map(function (id, i) {
      if (!id) return '<li class="slot is-empty" data-slot="' + i + '"><span class="slot-n">Tile ' + (i + 1) + '</span><span class="slot-empty">Empty</span></li>';
      var it = ITEMS[id]; return '<li class="slot is-filled" data-slot="' + i + '">' + thumb(it) + '<span class="slot-cap"><span class="kind">' + esc(it.kind) + '</span><span class="slot-title">' + esc(it.title) + '</span></span>' + (lk ? '' : '<button type="button" class="slot-x" id="sx-' + i + '" data-act="unslot" data-i="' + i + '" aria-label="Remove ' + esc(it.title) + ' from tile ' + (i + 1) + '">✕</button>') + '</li>';
    }).join('');
    var tried = txt(G.title).length > 0;
    var why = G.tiles.map(function (id, i) { if (!id) return ''; return field('guide.why.' + id, { label: 'Tile ' + (i + 1) + ', ' + ITEMS[id].title + ': Why did you include this?', readonly: lk }); }).join('');
    return '<section class="creator screen-pad"><header class="wrap"><h1>Your Chicago</h1><div class="scenario" id="scenario"><p>A sixth grader living somewhere else knows almost nothing about Chicago.</p><p><strong>You control the first screen they will see.</strong></p><p>You only get six tiles. What will you show them?</p></div>' + lis('scenario', 'Your Chicago') + '</header>' +
      '<div class="creator-grid wrap-wide"><div class="cr-preview"><div class="device"><div class="device-bar" aria-hidden="true"><span></span><span></span><span></span><span class="device-url">your-chicago-guide</span></div><div class="device-body">' +
      '<div class="title-field"><label for="f-guide-title" class="title-pre">Chicago:</label><input type="text" id="f-guide-title" data-bind="guide.title" data-rerender value="' + esc(G.title) + '" maxlength="48" placeholder="Write your own title" autocomplete="off"' + (lk ? ' readonly' : '') + '></div>' +
      '<ol class="slots" aria-label="Your six tiles">' + slots + '</ol></div></div>' +
      (tried && !lk ? '<details class="examples"><summary>Compare with other possible titles</summary><ul>' + T.titleExamples.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><p class="small">Yours doesn’t need to sound like these. They’re just other choices a storyteller could make.</p></details>' : '') + '</div>' +
      (lk ? '' : '<div class="cr-pool"><h2>Choose your tiles</h2><p class="instr">Click a tile to add it to the next empty spot, or drag it onto a spot. Use ✕ to remove one.</p><h3>From your suitcase</h3>' + poolList(pool1) + '<h3>More from the trip</h3>' + poolList(pool2) + '</div>') + '</div>' +
      (why ? '<section class="wrap block"><h2 class="h-section">Why these tiles? <span class="opt">optional</span></h2>' + why + '</section>' : '') +
      '<section class="wrap block"><h2 class="h-section">Your choices as a storyteller</h2>' + field('guide.leavesOut', { label: T.reflection.leavesOut, rows: 3, readonly: lk }) + field('guide.different', { label: T.reflection.differentGuide, rows: 3, readonly: lk }) + field('guide.want', { label: T.reflection.wantImpression, rows: 3, readonly: lk }) + '</section>' +
      '<div class="wrap block">' + missingBox('cr') + (lk ? '<p class="stamped-note">● Guide locked.</p><a class="btn btn-primary btn-xl" href="#/' + furthest() + '">Continue</a>' : '<p class="small">When you lock your guide, it goes on your Trip Receipt and can’t be changed.</p><button type="button" class="btn btn-primary btn-xl" data-act="lockGuide">Lock my guide</button>') + '</div></section>';
  };

  /* ---------- REVEAL ---------- */
  SCREENS.reveal = function () {
    var st = S.rv.step || 0;
    if (st === 0) return '<section class="reveal wrap narrow screen-pad"><h1>Remember when you first arrived?</h1><p class="lede">Based only on what you saw, you described Chicago as:</p>' + wordRow(S.arrivalW) + '<button type="button" class="btn btn-primary btn-xl" data-act="rvNext">Continue</button></section>';
    if (st === 1) {
      return '<section class="reveal wrap screen-pad"><h1>Not everyone saw what you saw.</h1><div class="versions">' + ['A', 'B', 'C'].map(function (v, i) {
        var a = T.arrival[v], mine = v === S.arrival;
        return '<div class="version' + (mine ? ' is-mine' : '') + '" style="--d:' + i + '"><p class="v-some">Some students saw:</p><h2>' + esc(a.label) + '</h2><div class="v-thumbs">' + arrivalItems(v).map(function (it) { return thumb(it); }).join('') + '</div><p class="v-short">' + esc(a.short) + '</p>' + (mine ? '<p class="v-mine">This is the one you saw.</p>' : '') + '</div>';
      }).join('') + '</div><p class="lede center">Everyone was asked the same question.<br>But everyone wasn’t given the same evidence.</p>' +
        '<div class="narrow-inner block"><h2 class="h-section">Did the website influence you?</h2>' + radios('rv.falseQ', ['Yes', 'No', 'I’m not sure'], 'Did I have to show you something false to influence your first impression?') +
        field('rv.selection', { label: 'How did the selection of images affect the story you began telling yourself about Chicago?', rows: 4 }) + missingBox('rv1') + '<button type="button" class="btn btn-primary btn-xl" data-act="rvNext">Continue</button></div></section>';
    }
    return '<section class="reveal wrap narrow screen-pad"><h1>You also chose your own route through the city.</h1><p class="lede">Your route was:</p><ol class="myroute">' + S.order.map(function (id, i) { return '<li><span class="mr-n">' + (i + 1) + '</span><span>' + EMOJI[id] + ' ' + esc(stopById(id).title) + '</span></li>'; }).join('') + '</ol>' +
      field('rv.orderQ', { label: 'Could the ORDER in which someone receives information also influence their thinking? Why?', rows: 4 }) + missingBox('rv2') + '<button type="button" class="btn btn-primary btn-xl" data-act="rvNext">Continue</button></section>';
  };

  /* ---------- BEFORE / AFTER ---------- */
  function journey() {
    var rows = [['Before the trip', S.pre.w], ['When you arrived', S.arrivalW]];
    S.order.forEach(function (id) { rows.push([stopById(id).title, S.meter[id] || []]); if (id === 'headlines' && (S.r.headlines || {}).w) rows.push(['If headlines were all you saw', S.r.headlines.w]); });
    rows.push(['After the trip', S.after.w]);
    return '<section class="block journey"><h2 class="h-section">Your impression of Chicago</h2><p class="small">This shows how <em>your</em> impression moved during the trip. It isn’t a measurement of what Chicago is.</p><ol class="jr">' +
      rows.map(function (r) { var w = (r[1] || []).filter(function (x) { return txt(x); }); return '<li><span class="jr-k">' + esc(r[0]) + '</span><span class="jr-v">' + (w.length ? w.map(function (x) { return '<span class="wordtag sm">' + esc(x) + '</span>'; }).join('') : '<span class="muted">no words chosen</span>') + '</span></li>'; }).join('') + '</ol></section>';
  }
  SCREENS.after = function () {
    var A = S.after;
    return '<section class="wrap screen-pad"><h1>Before and after</h1><div class="ba"><div class="ba-col"><h2>Before Chicago</h2>' + wordRow(S.pre.w) + '</div><div class="ba-arrow" aria-hidden="true">→</div><div class="ba-col"><h2>After Chicago</h2>' +
      (A.shown ? wordRow(A.w) : threeWords('after.w', 'Describe Chicago in three new words.') + missingBox('ba0') + '<button type="button" class="btn btn-primary" data-act="baCompare">Compare</button>') + '</div></div>' +
      (A.shown ? journey() + '<section class="block narrow-inner">' + field('after.changed', { label: 'What changed?', rows: 3 }) + field('after.caused', { label: 'What caused your thinking to change?', rows: 3 }) + missingBox('ba1') + '<button type="button" class="btn btn-primary btn-xl" data-act="afterNext">Continue</button></section>' : '') + '</section>';
  };

  /* ---------- ESSENTIAL QUESTION ---------- */
  SCREENS.eq = function () {
    return '<section class="eq"><div class="eq-inner"><h1 class="eq-q">Who gets to tell the story,<br>and what changes when someone else tells it?</h1><p class="eq-prompt">Use something from today’s trip to answer. 3–5 thoughtful sentences.</p>' +
      field('eq', { label: 'Your answer', rows: 8, cls: 'eq-field' }) + '<button type="button" class="linklike starters-btn" data-act="starters" aria-expanded="' + U.starters + '" aria-controls="starters">' + (U.starters ? 'Hide sentence starters' : 'Need a start?') + '</button>' +
      (U.starters ? '<ul class="starters" id="starters">' + T.reflection.eqStarters.map(function (s, i) { return '<li><button type="button" class="chip" data-act="insertStarter" data-i="' + i + '">' + esc(s) + '</button></li>'; }).join('') + '</ul>' : '') +
      missingBox('eq') + '<button type="button" class="btn btn-light btn-xl" data-act="eqNext">Continue</button></div></section>';
  };

  /* ---------- WHICH CHICAGO WAS REAL? ---------- */
  SCREENS.real = function () {
    var R0 = S.real, st = R0.step || 0;
    return '<section class="real wrap narrow screen-pad"><h1>Which Chicago was the real Chicago?</h1><div class="chips big" role="radiogroup" aria-label="Choose one">' + T.realChoices.map(function (c, i) {
      var on = R0.choice === i; return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" role="radio" aria-checked="' + on + '" id="rc-' + i + '" data-act="realPick" data-i="' + i + '"' + (st ? ' aria-disabled="true"' : '') + '>' + esc(c) + '</button>';
    }).join('') + '</div>' + (R0.choice === T.realChoices.length - 1 ? field('real.other', { label: 'Something else:', max: 80 }) : '') + missingBox('real') +
      (st === 0 ? '<button type="button" class="btn btn-primary btn-xl" data-act="realReveal">Lock in my answer</button>' :
        '<div class="real-reveal" aria-live="polite"><p class="rr rr1">All of them can be real.</p>' + (st >= 2 ? '<p class="rr rr2">But none of them is Chicago by itself.</p>' : '') + (st >= 3 ? '<p class="rr rr3">Places, just like people, are more complicated than one story.</p><a class="btn btn-red btn-xl" href="#/flighthome" data-act="toHome">Return to Atlanta</a>' : '') + '</div>') + '</section>';
  };

  /* ---------- RETURN FLIGHT ---------- */
  SCREENS.flighthome = function () {
    return '<section class="takeoff"><h1 class="sr-only">Return flight: Chicago to Atlanta</h1>' + board([['Flight', '313'], ['Route', 'Chicago → Atlanta'], ['Status', S.done.ret ? 'Next destination available' : 'Trip complete', 'board-status', 26]]) +
      '<div class="fmap-wrap" id="fmap"></div><div class="takeoff-actions" id="home-actions">' + (S.done.ret ? '<button type="button" class="btn btn-red btn-xl" data-act="seeNext">See what’s next</button>' : '') + '</div></section>';
  };

  /* ---------- BOOK REVEAL (first and only appearance of the novel) ---------- */
  SCREENS.book = function () {
    var F = T.finale;
    var cover = F.coverImg ? '<img src="' + esc(F.coverImg) + '" alt="Cover of ' + esc(F.bookTitle) + ' by ' + esc(F.author) + '">' : '<div class="cover-card" role="img" aria-label="' + esc(F.bookTitle) + ' by ' + esc(F.author) + '"><span class="cover-title">' + esc(F.bookTitle) + '</span><span class="cover-author">' + esc(F.author) + '</span></div>';
    return '<section class="book-reveal"><div class="book-inner"><div class="cover">' + cover + '</div><div class="book-text"><p class="next-label">Next destination</p><h1 class="book-title">' + esc(F.bookTitle) + '</h1><p class="book-author">' + esc(F.author) + '</p>' +
      F.lines.map(function (l) { return '<p class="bline">' + esc(l) + '</p>'; }).join('') + '<p class="ask">As we read, keep asking:</p><ul class="book-qs">' + F.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul>' +
      '<button type="button" class="btn btn-light btn-xl" data-act="tripComplete">Trip complete</button></div></div></section>';
  };

  /* ---------- RECEIPT ---------- */
  function tileTitles() { return S.guide.tiles.filter(Boolean).map(function (id) { return ITEMS[id] ? ITEMS[id].title : id; }); }
  function responsesText() {
    var w = function (a) { return (a || []).map(function (x) { return txt(x) || '___'; }).join(', '); };
    return ['TRIP TO CHICAGO — REFLECTION', txt(S.name) ? 'Traveler: ' + txt(S.name) : '', '',
      'Before: ' + w(S.pre.w), 'Arrival: ' + w(S.arrivalW), 'After: ' + w(S.after.w), '',
      'My Chicago Title: Chicago: ' + (txt(S.guide.title) || '___'), 'My six tiles: ' + tileTitles().join('; '), '',
      'My guide leaves out: ' + (txt(S.guide.leavesOut) || '___'), 'A different guide could come from: ' + (txt(S.guide.different) || '___'), 'Impression I want my audience to have: ' + (txt(S.guide.want) || '___'), '',
      'Selection & first impressions: ' + (txt(S.rv.selection) || '___'), 'Order of information: ' + (txt(S.rv.orderQ) || '___'), 'What changed: ' + (txt(S.after.changed) || '___'), 'What caused it: ' + (txt(S.after.caused) || '___'), '',
      'Essential Question (Who gets to tell the story, and what changes when someone else tells it?):', txt(S.eq) || '___', '',
      'My route: ' + S.order.map(function (id) { return stopById(id).title; }).join(' → ')].filter(function (l, i, a) { return !(l === '' && a[i - 1] === ''); }).join('\n');
  }
  function tripCode() {
    var o = { v: 1, n: txt(S.name), a: S.arrival, pre: S.pre.w, arr: S.arrivalW, aft: S.after.w, t: S.guide.title, tiles: tileTitles(), lo: S.guide.leavesOut, dg: S.guide.different, want: S.guide.want, sel: S.rv.selection, ord: S.order, oq: S.rv.orderQ, ch: S.after.changed, ca: S.after.caused, eq: S.eq, real: S.real.choice != null ? T.realChoices[S.real.choice] : '' };
    try { return 'TTC1:' + btoa(unescape(encodeURIComponent(JSON.stringify(o)))); } catch (e) { return ''; }
  }
  SCREENS.receipt = function () {
    var d = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    return '<section class="receipt-wrap wrap screen-pad"><div class="receipt" id="receipt"><header class="r-head"><p class="r-brand">Trip to Chicago</p><h1>Trip complete</h1>' + (txt(S.name) ? '<p>Traveler: <strong>' + esc(S.name) + '</strong></p>' : '') + '<p class="r-date">' + esc(d) + '</p></header>' +
      '<dl class="r-list"><div><dt>Before Chicago</dt><dd>' + wordRow(S.pre.w) + '</dd></div><div><dt>After Chicago</dt><dd>' + wordRow(S.after.w) + '</dd></div>' +
      '<div><dt>My Chicago title</dt><dd class="r-title">Chicago: ' + esc(S.guide.title) + '</dd></div><div><dt>My six selected Chicago items</dt><dd><ol class="r-tiles">' + tileTitles().map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></dd></div>' +
      '<div><dt>Something my guide leaves out</dt><dd>' + esc(S.guide.leavesOut) + '</dd></div><div><dt>Essential question</dt><dd>' + esc(S.eq) + '</dd></div>' +
      '<div><dt>Stops completed</dt><dd>' + S.order.map(function (id) { return esc(stopById(id).title); }).join(' → ') + (S.side.length ? '<br><span class="small">Side quests: ' + S.side.length + '</span>' : '') + '</dd></div></dl><div class="r-barcode" aria-hidden="true"></div></div>' +
      '<div class="receipt-actions"><button type="button" class="btn btn-primary" data-act="print">Print or save as PDF</button><button type="button" class="btn btn-outline" data-act="copyResponses">Copy my responses</button><button type="button" class="btn btn-outline" data-act="copyCode">Copy trip code</button></div>' +
      '<p class="copy-status" id="copy-status" role="status"></p><div id="copy-fallback"></div><p class="small no-print">“Copy my responses” gives you text to paste into Google Classroom. The trip code is a compact copy of your answers your teacher can decode; it doesn’t prove who you are.</p></section>';
  };

  /* ------------------------------------------------------------------
     PANELS: Passport, Help & settings, About, Sources, Accessibility, Teacher
     ------------------------------------------------------------------ */
  function currentImpression() {
    for (var i = S.order.length - 1; i >= 0; i--) { var m = S.meter[S.order[i]]; if (m && m.length) return { from: 'after ' + stopById(S.order[i]).title, w: m }; }
    if (S.done.arrival) return { from: 'when you arrived', w: S.arrivalW }; return { from: 'before the trip', w: S.pre.w };
  }
  var PANELS = {
    passport: function () {
      var k = stopsDone(), ci = currentImpression();
      var packed = T.stops.filter(function (s) { return S.suitcase[s.id]; });
      return '<h2 id="panel-h" class="panel-title">Passport</h2>' + (txt(S.name) ? '<p class="pp-name">Issued to ' + esc(S.name) + '</p>' : '') +
        '<section class="pp-sec"><p><strong>' + k + ' of ' + ROUTE.length + ' stops explored</strong></p><div class="bar" aria-hidden="true"><span style="width:' + (k / ROUTE.length * 100) + '%"></span></div><ul class="pp-stamps">' + ROUTE.map(function (r) { var d = routeDone(r.k); return '<li class="' + (d ? 'is-done' : '') + '"><span aria-hidden="true">' + (d ? '●' : '○') + '</span> ' + esc(r.lab) + '<span class="sr-only">' + (d ? ' (explored)' : ' (not yet)') + '</span></li>'; }).join('') + '</ul></section>' +
        '<section class="pp-sec"><h3>Suitcase <span class="opt">' + packed.length + ' of 6 packed</span></h3>' + (packed.length ? '<ul class="pp-suitcase">' + packed.map(function (s) { var it = ITEMS[S.suitcase[s.id]]; return '<li>' + thumb(it) + '<span><span class="kind">' + esc(it.kind) + ' · ' + esc(s.title) + '</span><b>' + esc(it.title) + '</b></span></li>'; }).join('') + '</ul>' : '<p class="muted">Nothing packed yet. At each destination you’ll choose one thing to pack.</p>') + '</section>' +
        '<section class="pp-sec"><h3>Your impression of Chicago <span class="opt">' + esc(ci.from) + '</span></h3>' + ((ci.w || []).some(txt) ? wordRow(ci.w) : '<p class="muted">Not recorded yet.</p>') + '</section>' +
        '<section class="pp-sec"><h3>Words discovered <span class="opt">' + S.vocab.length + '</span></h3>' + (S.vocab.length ? '<dl class="pp-vocab">' + S.vocab.map(function (k2) { return '<div><dt>' + esc(T.vocab[k2].term) + '</dt><dd>' + esc(T.vocab[k2].def) + '</dd></div>'; }).join('') + '</dl>' : '<p class="muted">Words unlock as you explore.</p>') + '</section>' +
        '<section class="pp-sec"><h3><label for="f-notes">My notes</label></h3><textarea id="f-notes" data-bind="notes" rows="5">' + esc(S.notes) + '</textarea><p class="small">Notes stay on this computer.</p></section>';
    },
    help: function () {
      return '<h2 id="panel-h" class="panel-title">Help & settings</h2><section class="pp-sec"><h3>How this trip works</h3><ul class="plain"><li>Visit all six destinations, in any order.</li><li>At each one, pack one thing for your suitcase.</li><li>Your answers save automatically on this computer.</li><li>Use <strong>Listen</strong> buttons to hear text read aloud.</li><li>The Passport (top right) shows what you’ve collected.</li></ul></section>' +
        '<section class="pp-sec"><h3>Reading</h3><button type="button" class="btn btn-outline" data-act="toggleLarge" aria-pressed="' + !!S.settings.large + '">Larger text: ' + (S.settings.large ? 'On' : 'Off') + '</button>' +
        (Speech.ok ? '<p class="small" style="margin-top:1rem">Read-aloud speed</p><div class="seg" role="group" aria-label="Read-aloud speed">' + [[0.8, 'Slower'], [1, 'Normal'], [1.2, 'Faster']].map(function (r) { return '<button type="button" data-act="setRate" data-r="' + r[0] + '" aria-pressed="' + ((S.settings.rate || 1) === r[0]) + '">' + r[1] + '</button>'; }).join('') + '</div>' : '<p class="small">Read-aloud isn’t available in this browser. All text is on the page.</p>') + '</section>' +
        '<section class="pp-sec danger"><h3>Reset trip</h3><p class="small">Erases every answer on this computer and starts over. Only do this if your teacher tells you to.</p>' +
        (U.resetAsk ? '<div class="confirm" role="alertdialog" aria-labelledby="rc-h"><p id="rc-h"><strong>Erase this whole trip?</strong> This can’t be undone.</p><button type="button" class="btn btn-red" data-act="resetConfirm" data-autofocus>Yes, erase and start over</button> <button type="button" class="btn btn-outline" data-act="resetCancel">Cancel</button></div>' : '<button type="button" class="btn btn-outline" data-act="resetAsk">Reset trip…</button>') + '</section>';
    },
    about: function () {
      return '<h2 id="panel-h" class="panel-title">About this trip</h2><p>Trip to Chicago is a self-paced virtual field trip for 6th-grade ELA. You’ll explore Chicago through tourism, neighborhoods, history, housing, headlines, and the voices of people who live there, then build your own guide to the city.</p><p>The essential question: <strong>' + esc(T.meta.essentialQuestion) + '</strong></p><p>Nothing you type leaves this computer. There are no accounts, no tracking, and no ads.</p><p class="small">Illustrations are built into the site. Headlines in the Headlines stop are simulated and labeled that way. Facts come from the sources listed in Sources.</p>';
    },
    sources: function () {
      return '<h2 id="panel-h" class="panel-title">Sources</h2><p class="small">Organized by destination. Links open in a new tab and are optional; everything you need is on the trip itself.</p>' +
        T.sources.map(function (g) { return '<section class="pp-sec"><h3>' + esc(g.group) + '</h3><ul class="src">' + g.items.map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title) + '<span class="sr-only"> (opens in a new tab)</span></a><span class="src-org">' + esc(s.org) + '</span><span class="src-sup">Supports: ' + esc(s.supports) + '</span></li>'; }).join('') + '</ul></section>'; }).join('') +
        photoCredits() + '<section class="pp-sec"><h3>About the simulated headlines</h3><p class="small">The Headlines stop uses invented headlines written to represent common types of Chicago news coverage. They are not real articles and contain no real quotes.</p></section>';
    },
    a11y: function () {
      return '<h2 id="panel-h" class="panel-title">Accessibility</h2><ul class="plain"><li>Everything works with a keyboard: Tab to move, Enter or Space to choose, Esc to close panels.</li><li>Listen buttons read text aloud with your computer’s built-in voice. You start, pause, restart, and stop it. Nothing plays automatically. The words being read are always on the page.</li><li>Turn on Larger text in Help & settings.</li><li>If your computer is set to reduce motion, animations are skipped.</li><li>Every image has a description for screen readers. Colors are always paired with words or letters.</li><li>Drag-and-drop in the final activity also works by clicking.</li></ul>';
    },
    teacher: function () {
      if (!U.teacher) return '<h2 id="panel-h" class="panel-title">Teacher info</h2><p>This page is for teachers. It explains how the trip works, including surprises that are meant for students to discover.</p><p><strong>Students:</strong> please close this and keep exploring.</p><button type="button" class="btn btn-primary" data-act="teacherUnlock" data-autofocus>I’m a teacher, show info</button>';
      return '<h2 id="panel-h" class="panel-title">Teacher info</h2>' +
        '<section class="pp-sec"><h3>Purpose</h3><p>A pre-reading context and media-literacy experience. Students build a picture of Chicago as a setting and practice asking who tells a story and what selection does.</p><p><strong>Essential question:</strong> ' + esc(T.meta.essentialQuestion) + '</p></section>' +
        '<section class="pp-sec"><h3>Approximate time</h3><p>45–60 minutes. Side quests are optional enrichment for fast finishers.</p></section>' +
        '<section class="pp-sec"><h3>Student directions</h3><ol><li>Open the link.</li><li>Use headphones.</li><li>Complete all six required stops.</li><li>Finish the reflection.</li><li>Submit the Trip Receipt or pasted responses as directed.</li></ol></section>' +
        '<section class="pp-sec"><h3>Sensitive content note</h3><p>Students encounter age-appropriate discussion of racism, segregation, redlining, public housing, poverty and disinvestment, gang and community violence, crime, and policing. No graphic images or violent footage appear.</p></section>' +
        '<section class="pp-sec"><h3>The arrival experiment</h3><p>Each browser is randomly assigned to one of three arrival galleries: Tourist (A), Crisis (B), or Community (C). All students get the same question. The reveal near the end shows them all three. Avoid mentioning this before students reach it.</p><p class="small">To preview a version, add <code>?arrival=A</code>, <code>?arrival=B</code>, or <code>?arrival=C</code> to the link, then use Reset trip when you’re done.</p></section>' +
        '<section class="pp-sec"><h3>Important</h3><p>Do not reveal the anchor novel (named in the README) until students reach the final screen. The site never mentions it before then.</p></section>' +
        '<section class="pp-sec"><h3>Decode a trip code</h3><label for="f-decode" class="small">Paste a student’s trip code (starts with TTC1:)</label><textarea id="f-decode" rows="3"></textarea><button type="button" class="btn btn-outline" data-act="decode">Decode</button><pre class="decoded" aria-live="polite">' + esc(U.decoded) + '</pre></section>';
    }
  };
  function allPhotos() {
    var urls = [], add = function (u) { if (u && urls.indexOf(u) < 0) urls.push(u); };
    ['A', 'B', 'C'].forEach(function (v) { T.arrival[v].items.forEach(function (i) { add(i.img); }); });
    add(T.downtown.heroImg); T.downtown.cards.forEach(function (c) { add(c.img); });
    T.neighborhoods.list.forEach(function (n) { n.see.forEach(function (p) { add(p.img); }); });
    add(T.map.realMapImg); T.housing.lenses.forEach(function (l) { add(l.img); });
    T.chicagoans.categories.forEach(function (c) { add(c.img); }); T.sideQuests.forEach(function (q) { add(q.img); });
    return urls;
  }
  function photoCredits() {
    var list = allPhotos(); if (!list.length) return '';
    var C0 = window.PHOTO_CREDITS || {};
    return '<section class="pp-sec"><h3>Photo credits</h3><p class="small">Photos from Wikimedia Commons, including public-domain photos from the U.S. National Archives. Each file page lists the photographer and license.</p><ul class="src">' + list.map(function (u) {
      var m = u.match(/Special:FilePath\/([^?]+)/), f = m ? decodeURIComponent(m[1]) : null;
      if (!f) { var pf = (window.PHOTO_FILES || []).filter(function (x) { return u.indexOf(x.local) > -1; })[0]; if (pf) f = pf.file.replace(/ /g, '_'); }
      var page = f ? 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(f) : u;
      var key = f && (C0[f] ? f : C0[f.replace(/_/g, ' ')] ? f.replace(/_/g, ' ') : null), cr = key ? C0[key] : null;
      var LC = (window.LOCAL_CREDITS || {})[u]; if (LC) return '<li><strong>' + esc(LC.title) + '</strong><span class="src-org">' + esc(LC.credit) + '</span></li>';
      return '<li><a href="' + esc(page) + '" target="_blank" rel="noopener noreferrer">' + esc(cr && cr.title ? cr.title : (f ? f.replace(/_/g, ' ') : u)) + '<span class="sr-only"> (opens in a new tab)</span></a><span class="src-org">' + esc(cr ? cr.credit : 'Wikimedia Commons; see file page for photographer and license') + '</span></li>';
    }).join('') + '</ul></section>';
  }
  var panelOpen = null, lastFocus = null;
  function openPanel(kind) { lastFocus = document.activeElement; panelOpen = kind; drawPanel(); }
  function drawPanel() {
    var p = $('#panel');
    if (!panelOpen) { p.hidden = true; p.innerHTML = ''; document.body.classList.remove('panel-open'); return; }
    p.hidden = false; document.body.classList.add('panel-open');
    p.innerHTML = '<div class="scrim" data-act="closePanel"></div><div class="panel ' + (panelOpen === 'passport' ? 'drawer' : 'sheet') + '" role="dialog" aria-modal="true" aria-labelledby="panel-h"><button type="button" class="panel-x" data-act="closePanel">✕ Close</button><div class="panel-body">' + PANELS[panelOpen]() + '</div></div>';
    var f = $('[data-autofocus]', p) || $('.panel-x', p); if (f) f.focus();
  }
  function closePanel() { panelOpen = null; U.resetAsk = false; drawPanel(); if (lastFocus && lastFocus.focus && document.body.contains(lastFocus)) lastFocus.focus(); }

  /* ------------------------------------------------------------------
     HEADER
     ------------------------------------------------------------------ */
  function renderHeader(name, param) {
    var top = $('#topbar'), hide = ['welcome', 'checkin', 'takeoff', 'book'].indexOf(name) > -1;
    top.hidden = hide; document.body.classList.toggle('no-header', hide); if (hide) return;
    var cur = routeCurrent(name, param), idx = -1;
    var items = ROUTE.map(function (r, i) {
      var d = routeDone(r.k), c = r.k === cur; if (c) idx = i;
      return '<li class="rt' + (d ? ' is-done' : '') + (c ? ' is-current' : '') + '"' + (c ? ' aria-current="step"' : '') + '><span class="rt-dot" aria-hidden="true"></span><span class="rt-lab">' + esc(r.lab) + '</span><span class="sr-only">' + (d ? ', explored' : c ? ', you are here' : ', not yet') + '</span></li>';
    }).join('');
    var count = Object.keys(S.suitcase).length;
    top.innerHTML = (S.done.arrival ? '<a class="brand" href="#/hub" aria-label="Trip to Chicago, go to the Chicago map">Trip to Chicago</a>' : '<span class="brand">Trip to Chicago</span>') +
      '<nav class="route" aria-label="Trip progress"><ol>' + items + '</ol><p class="route-mini">' + (idx > -1 ? 'Stop ' + (idx + 1) + ' of ' + ROUTE.length + ': ' + esc(ROUTE[idx].lab) : stopsDone() + ' of ' + ROUTE.length + ' stops explored') + '</p></nav>' +
      '<div class="top-actions"><button type="button" class="icon-btn" data-act="openPanel" data-p="help" aria-label="Help and settings">?</button><button type="button" class="pp-btn" id="passport-btn" data-act="openPanel" data-p="passport">Passport' + (count ? '<span class="pp-count" aria-label="' + count + ' items packed">' + count + '</span>' : '') + '</button></div>';
  }

  /* ------------------------------------------------------------------
     ROUTER
     ------------------------------------------------------------------ */
  var main, curRoute = null;
  function parse() { var h = (location.hash || '').replace(/^#\/?/, ''), p = h.split('/'); return { name: p[0] || '', param: p[1] }; }
  function go(r) { if (location.hash === '#/' + r) render(false); else location.hash = '#/' + r; }
  function onEnter(name, param) {
    if (name === 'arrival' && !S.arrival) { S.arrival = ['A', 'B', 'C'][Math.floor(Math.random() * 3)]; save(); }
    if (name === 'stop') { if (S.order.indexOf(param) < 0) S.order.push(param); if (!S.status[param]) S.status[param] = 'progress'; save(); }
    if (name === 'side' && S.side.indexOf(param) < 0) { S.side.push(param); save(); }
  }
  function render(keep) {
    var p = parse(), name = p.name, param = p.param;
    if (!name || !SCREENS[name]) { location.replace('#/' + (S.last && SCREENS[S.last.split('/')[0]] ? S.last : 'welcome')); return; }
    var g = guard(name, param); if (g) { location.replace('#/' + g); return; }
    var key = name + (param ? '/' + param : ''), same = keep && curRoute === key;
    var sy = window.scrollY, ae = document.activeElement, fidv = ae && ae.id, sel = null;
    try { if (ae && typeof ae.selectionStart === 'number') sel = [ae.selectionStart, ae.selectionEnd]; } catch (e) { }
    if (curRoute !== key) { Speech.stop(); clearTimers(); document.body.classList.remove('locked'); onEnter(name, param); }
    curRoute = key; if (name !== 'takeoff') { S.last = key; save(); }
    main.innerHTML = SCREENS[name](param);
    document.body.dataset.screen = name;
    renderHeader(name, param);
    if (same) {
      window.scrollTo(0, sy);
      var f = fidv && document.getElementById(fidv);
      if (f) { f.focus({ preventScroll: true }); if (sel && f.setSelectionRange) try { f.setSelectionRange(sel[0], sel[1]); } catch (e) { } }
    } else {
      window.scrollTo(0, 0); var h = $('#main h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
    if (AFTER[name]) AFTER[name](param, same);
  }
  function rerender() { render(true); }
  function focusScroll(sel) { var el = $(sel); if (!el) return; el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); }

  var AFTER = {
    takeoff: function () {
      var st = $('#board-status'), fm = $('#fmap');
      var depart = function () { if (st) { st.innerHTML = '<span class="sr-only">Departed</span><span aria-hidden="true" class="flaps flip">' + flaps('Departed', 9) + '</span>'; } };
      if (reduced()) { depart(); fm.innerHTML = flightMap('ATL', 'CHI'); fm.classList.add('show'); $('#skip').textContent = 'Continue to Chicago'; return; }
      later(depart, 1400);
      later(function () { fm.innerHTML = flightMap('ATL', 'CHI'); fm.classList.add('show'); flyPlane(3200); }, 2400);
      later(function () { go('arrival'); }, 7600);
    },
    flighthome: function () {
      var st = $('#board-status'), fm = $('#fmap'), act = $('#home-actions');
      var done = function () {
        S.done.ret = true; save();
        if (st) st.innerHTML = '<span class="sr-only">Next destination available</span><span aria-hidden="true" class="flaps flip">' + flaps('Next destination available', 26) + '</span>';
        if (act && !act.innerHTML) { act.innerHTML = '<button type="button" class="btn btn-red btn-xl" data-act="seeNext">See what’s next</button>'; }
      };
      fm.innerHTML = flightMap('CHI', 'ATL'); fm.classList.add('show');
      if (S.done.ret || reduced()) { done(); return; }
      flyPlane(3000); later(done, 3400);
    },
    stop: function (id, same) {
      if (id === 'headlines') { var Hh = rr('headlines'); document.body.classList.toggle('locked', Hh.stage === 1); if (Hh.stage === 1 && !same) { var w = $('#w-r-headlines-w-0'); if (w) w.focus(); } if (Hh.q1 != null) unlock('selection', 'source'); }
      if (id === 'downtown' && (rr('downtown').opened || []).length >= T.downtown.required) unlock('media', 'audience', 'purpose');
      if (id === 'neighborhoods') unlock('neighborhood');
      if (id === 'chicagoans' && (rr('chicagoans').opened || []).length >= T.chicagoans.required) unlock('representation');
    },
    hub: function () { unlock('setting'); },
    real: function () {
      var R0 = S.real; if (!R0.step || R0.step >= 3) return;
      var adv = function (n) { S.real.step = n; if (n === 3) S.done.real = true; save(); rerender(); };
      if (reduced()) { adv(3); return; }
      if (R0.step === 1) later(function () { adv(2); }, 1800); else if (R0.step === 2) later(function () { adv(3); }, 1800);
    }
  };

  /* ------------------------------------------------------------------
     ACTIONS
     ------------------------------------------------------------------ */
  var A = {
    skipMain: function () { var h = $('#main h1') || $('#main'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); } },
    focus: function (el) { var f = document.getElementById(el.dataset.id); if (f) { f.focus(); f.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' }); } },
    openPanel: function (el) { openPanel(el.dataset.p); },
    closePanel: closePanel,
    boardFlight: function () {
      var m = wordsBlank(S.pre.w, 'pre-w').concat(needText('pre.explain', 'Write a sentence or two about what you’d tell them.'));
      if (!showMissing('pre', m)) return; S.done.pre = true; save(); go('takeoff');
    },
    skipFlight: function (el, e) { go('arrival'); },
    enterCity: function () { if (!showMissing('arr', wordsBlank(S.arrivalW, 'arrivalW'))) return; S.done.arrival = true; save(); unlock('perspective'); go('hub'); },
    final: function () {
      if (allExplored()) { go(S.guide.locked ? furthest() : 'gate'); return; }
      var left = T.stops.filter(function (s) { return S.status[s.id] !== 'explored'; });
      $('#lockmsg').innerHTML = '<p><strong>Your suitcase isn’t ready yet.</strong> Explore the remaining destinations first:</p><ul>' + left.map(function (s) { return '<li><a href="#/stop/' + s.id + '">' + EMOJI[s.id] + ' ' + esc(s.title) + '</a> <span class="muted">(' + (S.status[s.id] === 'progress' ? 'in progress' : 'not visited') + ')</span></li>'; }).join('') + '</ul>';
    },
    dtOpen: function (el) { var D = rr('downtown'); D.opened = D.opened || []; if (D.opened.indexOf(el.dataset.id) < 0) D.opened.push(el.dataset.id); D.sel = el.dataset.id; save(); rerender(); focusScroll('#dt-detail'); },
    nbOpen: function (el) { var N = rr('neighborhoods'); N.opened = N.opened || []; if (N.opened.indexOf(el.dataset.id) < 0) N.opened.push(el.dataset.id); N.sel = el.dataset.id; save(); rerender(); focusScroll('#nb-detail'); },
    chOpen: function (el) { var V = rr('chicagoans'); V.opened = V.opened || []; if (V.opened.indexOf(el.dataset.id) < 0) V.opened.push(el.dataset.id); V.sel = el.dataset.id; save(); rerender(); focusScroll('#ch-detail'); },
    pack: function (el) { var stop = el.dataset.stop, id = el.dataset.id, was = S.suitcase[stop]; S.suitcase[stop] = id; save(); if (was !== id) fly(el, ITEMS[id].title); rerender(); },
    meter: function (el) {
      var stop = el.dataset.stop, w = el.dataset.w, a = (S.meter[stop] || []).slice(), i = a.indexOf(w);
      if (i > -1) a.splice(i, 1); else { if (a.length >= 3) return; a.push(w); } S.meter[stop] = a; save(); rerender();
    },
    finish: function (el) {
      var stop = el.dataset.stop, m = VALID[stop]().concat(needPack(stop));
      if (!showMissing(stop, m)) return;
      S.status[stop] = 'explored'; save(); stampFx(stopById(stop).title);
      toast('<span class="t-k">Passport stamped</span><strong>' + esc(stopById(stop).title) + '</strong><span>' + exploredCount() + ' of 6 destinations explored</span>');
      setTimeout(function () { go('hub'); }, reduced() ? 0 : 1100);
    },
    zoom: function (el) { var M = rr('map'), z = M.zoom || 1, lv = [1, 1.5, 2, 3], i = lv.indexOf(z), d = +el.dataset.z; M.zoom = d === 0 ? 1 : lv[Math.max(0, Math.min(lv.length - 1, i + d))]; save(); rerender(); },
    mapReveal: function () {
      var M = rr('map'), m = [];
      if (![0, 1, 2].some(function (i) { return txt(M['p' + i]); })) m.push({ id: 'f-r-map-p0', msg: 'Write at least one thing you notice about the map.' });
      if (!txt(M.pred)) m.push({ id: 'f-r-map-pred', msg: 'Make your prediction first. A guess is fine.' });
      if (!showMissing('mapr', m)) return; M.revealed = true; save(); unlock('redlining', 'segregation'); rerender(); focusScroll('#map-reveal');
    },
    chain: function (el) { var M = rr('map'), i = +el.dataset.i; if (i === (M.chain || 0)) { M.chain = i + 1; save(); rerender(); var nx = document.getElementById('ch-' + (i + 1)); if (nx) nx.focus(); } },
    housingStart: function () { if (!showMissing('hs0', needText('r.housing.priv', 'Write what comes to mind first. It’s private.'))) return; var H = rr('housing'); H.started = true; H.tab = 'why'; H.seen = ['why']; save(); unlock('publicHousing', 'stereotype'); rerender(); focusScroll('#tab-why'); },
    lens: function (el) { var H = rr('housing'); H.tab = el.dataset.id; H.seen = H.seen || []; if (H.seen.indexOf(H.tab) < 0) H.seen.push(H.tab); save(); rerender(); var t = document.getElementById('tab-' + H.tab); if (t) t.focus(); },
    hlStage: function (el) { var Hh = rr('headlines'); Hh.stage = +el.dataset.s; save(); rerender(); if (Hh.stage === 3) focusScroll('.feed'); },
    hlStopDone: function () { var Hh = rr('headlines'); if (!showMissing('hl1', wordsBlank(Hh.w || [], 'r-headlines-w'))) return; Hh.stage = 2; save(); rerender(); var b = $('#loadmore'); if (b) { b.focus(); b.scrollIntoView({ block: 'center' }); } },
    slot: function (el) { if (el.getAttribute('aria-disabled') === 'true') return; var G0 = S.guide, i = G0.tiles.indexOf(null); if (i < 0) { $('#miss-cr').innerHTML = '<p>All six tiles are full. Remove one (✕) to make room.</p>'; return; } G0.tiles[i] = el.dataset.id; save(); rerender(); },
    unslot: function (el) { S.guide.tiles[+el.dataset.i] = null; save(); rerender(); },
    lockGuide: function () {
      var G0 = S.guide, m = [];
      if (!txt(G0.title)) m.push({ id: 'f-guide-title', msg: 'Give your guide a title: “Chicago: …”' });
      var empty = G0.tiles.filter(function (t) { return !t; }).length; if (empty) m.push({ id: 'f-guide-title', msg: 'Fill all six tiles (' + empty + ' still empty).' });
      m = m.concat(needText('guide.leavesOut', 'Finish: “Something important my guide leaves out is…”'), needText('guide.different', 'Finish: “Someone who might create a very different Chicago guide is… because…”'), needText('guide.want', 'Describe the impression you want your audience to have.'));
      if (!showMissing('cr', m)) return; G0.locked = true; save(); go('reveal');
    },
    rvNext: function () {
      var st = S.rv.step || 0;
      if (st === 1) { var m = []; if (S.rv.falseQ == null) m.push({ id: 'rv-falseQ-0', msg: 'Answer: did the website have to show you something false?' }); m = m.concat(needText('rv.selection', 'Explain how the selection of images affected your first story about Chicago.')); if (!showMissing('rv1', m)) return; }
      if (st === 2) { if (!showMissing('rv2', needText('rv.orderQ', 'Explain whether the order of information could influence thinking.'))) return; S.done.reveal = true; save(); go('after'); return; }
      S.rv.step = st + 1; save(); render(false);
    },
    baCompare: function () { if (!showMissing('ba0', wordsBlank(S.after.w, 'after-w'))) return; S.after.shown = true; save(); rerender(); },
    afterNext: function () { var m = needText('after.changed', 'Describe what changed.').concat(needText('after.caused', 'Describe what caused the change.')); if (!showMissing('ba1', m)) return; S.done.after = true; save(); go('eq'); },
    starters: function () { U.starters = !U.starters; rerender(); },
    insertStarter: function (el) { var s = T.reflection.eqStarters[+el.dataset.i], cur = S.eq || ''; S.eq = (cur && !/\s$/.test(cur) ? cur + ' ' : cur) + s.replace(/…$/, ' '); save(); rerender(); var f = $('#f-eq'); if (f) { f.focus(); f.setSelectionRange(f.value.length, f.value.length); } },
    eqNext: function () {
      var t0 = txt(S.eq), words = t0 ? t0.split(/\s+/).length : 0;
      if (!t0) { showMissing('eq', [{ id: 'f-eq', msg: 'Write your answer. Use something from today’s trip.' }]); return; }
      if (words < 20) { showMissing('eq', [{ id: 'f-eq', msg: 'You’re on your way. Aim for 3–5 sentences: add one more idea or example from the trip.' }]); return; }
      S.done.eq = true; save(); go('real');
    },
    realPick: function (el) { if ((S.real.step || 0) > 0) return; S.real.choice = +el.dataset.i; save(); rerender(); },
    realReveal: function () { if (S.real.choice == null) { showMissing('real', [{ id: 'rc-0', msg: 'Choose one answer first.' }]); return; } S.real.step = 1; save(); rerender(); },
    toHome: function () { go('flighthome'); },
    seeNext: function () { S.done.ret = true; save(); go('book'); },
    tripComplete: function () { S.done.book = true; save(); go('receipt'); },
    print: function () { window.print(); },
    copyResponses: function () { copy(responsesText(), 'Responses copied. Paste them into your Google Classroom assignment.'); },
    copyCode: function () { copy(tripCode(), 'Trip code copied.'); },
    toggleLarge: function () { S.settings.large = !S.settings.large; save(); applySettings(); drawPanel(); },
    setRate: function (el) { S.settings.rate = +el.dataset.r; save(); drawPanel(); },
    resetAsk: function () { U.resetAsk = true; drawPanel(); },
    resetCancel: function () { U.resetAsk = false; drawPanel(); },
    resetConfirm: function () { try { localStorage.removeItem(KEY); } catch (e) { } S = fresh(); U.resetAsk = false; panelOpen = null; drawPanel(); applySettings(); curRoute = null; location.hash = '#/welcome'; render(false); },
    teacherUnlock: function () { U.teacher = true; drawPanel(); },
    decode: function () {
      var v = txt(($('#f-decode') || {}).value).replace(/^TTC1:/, '');
      try { var o = JSON.parse(decodeURIComponent(escape(atob(v)))); U.decoded = ['Name: ' + (o.n || '—'), 'Arrival version: ' + o.a, 'Before: ' + (o.pre || []).join(', '), 'Arrival: ' + (o.arr || []).join(', '), 'After: ' + (o.aft || []).join(', '), 'Title: Chicago: ' + o.t, 'Tiles: ' + (o.tiles || []).join('; '), 'Leaves out: ' + o.lo, 'Different guide: ' + o.dg, 'Wanted impression: ' + o.want, 'Selection: ' + o.sel, 'Route: ' + (o.ord || []).join(' → '), 'Order question: ' + o.oq, 'What changed: ' + o.ch, 'Caused by: ' + o.ca, 'Real Chicago: ' + o.real, '', 'Essential question:', o.eq].join('\n'); }
      catch (e) { U.decoded = 'That code couldn’t be read. Check that the whole code was pasted.'; }
      drawPanel();
    },
    listen: function (el) { var t = document.getElementById(el.dataset.target); if (t) Speech.play(t.innerText || t.textContent, el.dataset.label); },
    spPause: function () { Speech.pause(); }, spResume: function () { Speech.resume(); }, spRestart: function () { Speech.restart(); }, spStop: function () { Speech.stop(); }
  };
  function copy(text, okMsg) {
    var status = $('#copy-status'), fb = $('#copy-fallback');
    var manual = function () { if (status) status.textContent = 'Couldn’t copy automatically. Select the text below and press Ctrl+C.'; if (fb) { fb.innerHTML = '<label class="small" for="copy-ta">Your text</label><textarea id="copy-ta" rows="8" readonly>' + esc(text) + '</textarea>'; var ta = $('#copy-ta'); ta.focus(); ta.select(); } };
    var legacy = function () { var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) { } ta.remove(); if (ok) { if (status) status.textContent = okMsg; } else manual(); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { if (status) status.textContent = okMsg; if (fb) fb.innerHTML = ''; }, legacy); else legacy();
  }
  function applySettings() { document.documentElement.classList.toggle('large-text', !!S.settings.large); }

  /* ------------------------------------------------------------------
     EVENTS
     ------------------------------------------------------------------ */
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t.dataset || !t.dataset.bind || t.type === 'radio' || t.type === 'checkbox') return;
    setP(t.dataset.bind, t.value); if (t.getAttribute('aria-invalid')) t.removeAttribute('aria-invalid');
  });
  document.addEventListener('change', function (e) {
    var t = e.target; if (!t.dataset) return;
    if (t.type === 'radio' && t.dataset.bind) { setP(t.dataset.bind, Number(t.value)); rerender(); }
    else if (t.type === 'checkbox' && t.dataset.list) { var arr = (getP(t.dataset.list) || []).slice(), v = Number(t.value), i = arr.indexOf(v); if (t.checked && i < 0) arr.push(v); if (!t.checked && i > -1) arr.splice(i, 1); setP(t.dataset.list, arr); rerender(); }
    else if (t.dataset.rerender != null) rerender();
  });
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return; var fn = A[el.dataset.act]; if (!fn) return;
    if (el.tagName === 'A' && el.dataset.act !== 'skipFlight' && el.dataset.act !== 'toHome') return;
    e.preventDefault(); fn(el, e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panelOpen) { closePanel(); return; }
    if (e.target.getAttribute && e.target.getAttribute('role') === 'tab' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      var tabs = $$('[role="tab"]'), i = tabs.indexOf(e.target), n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]; e.preventDefault(); A.lens(n); return;
    }
    if (e.key === 'Tab') {
      var modal = panelOpen ? $('#panel .panel') : $('.stop-overlay'); if (!modal) return;
      var f = $$('a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])', modal); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      else if (!modal.contains(document.activeElement)) { e.preventDefault(); f[0].focus(); }
    }
  });
  // Drag and drop for the final guide (click works too)
  document.addEventListener('dragstart', function (e) { var b = e.target.closest && e.target.closest('.pool-item'); if (b && b.getAttribute('aria-disabled') !== 'true') { e.dataTransfer.setData('text/plain', b.dataset.id); e.dataTransfer.effectAllowed = 'copy'; } });
  document.addEventListener('dragover', function (e) { var s = e.target.closest && e.target.closest('.slot'); if (s && !S.guide.locked) { e.preventDefault(); s.classList.add('is-over'); } });
  document.addEventListener('dragleave', function (e) { var s = e.target.closest && e.target.closest('.slot'); if (s) s.classList.remove('is-over'); });
  document.addEventListener('drop', function (e) {
    var s = e.target.closest && e.target.closest('.slot'); if (!s || S.guide.locked) return; e.preventDefault();
    var id = e.dataTransfer.getData('text/plain'); if (!ITEMS[id] || S.guide.tiles.indexOf(id) > -1) return; S.guide.tiles[+s.dataset.slot] = id; save(); rerender();
  });
  window.addEventListener('hashchange', function () { if (panelOpen) { panelOpen = null; drawPanel(); } render(false); });

  /* ------------------------------------------------------------------
     START
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    main = $('#main');
    try { var fa = new URLSearchParams(location.search).get('arrival'); if (fa && /^[abc]$/i.test(fa)) { S.arrival = fa.toUpperCase(); save(); } } catch (e) { }
    buildItems(); applySettings();
    $$('[data-footer]').forEach(function (b) { b.addEventListener('click', function () { openPanel(b.dataset.footer); }); });
    render(false);
  });
})();
