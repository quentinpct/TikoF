/**
 * LAME & PISTE — app.js v2.0
 * Application principale : navigation, rendu, filtres, live API
 * Intégration : Engarde · FIE · FFE
 */

'use strict';

const App = (() => {

  /* ── État de l'application ── */
  let state = {
    currentPage: 'home',
    currentLeague: 'world',     // world | europe | france
    currentGender: 'men',
    currentWeapon: 'foil',
    currentCalFilter: 'all',
    currentNewsFilter: 'all',
    currentAthleteFilter: 'all',
    searchQuery: '',
    liveCount: 4,
    refreshInterval: 15,        // secondes
  };

  /* ══════════════════════════
     UTILITAIRES DOM
  ══════════════════════════ */

  const el = (tag, attrs = {}, ...children) => {
    const element = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') element.className = v;
      else if (k === 'text') element.textContent = v;
      else if (k.startsWith('data-')) element.setAttribute(k, v);
      else if (k === 'html') element.innerHTML = v; // usage contrôlé uniquement
      else element[k] = v;
    }
    for (const child of children) {
      if (child == null) continue;
      if (typeof child === 'string') element.appendChild(document.createTextNode(child));
      else if (child instanceof Node) element.appendChild(child);
    }
    return element;
  };

  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  /* ══════════════════════════
     RENDERERS
  ══════════════════════════ */

  /* ── Result card ── */
  const renderResultCard = (result) => {
    const card = el('div', { class: `rcard ${result.status === 'done' ? 'done' : ''}` });

    const head = el('div', { class: 'rhead' });
    head.appendChild(el('span', { class: 'rcomp', text: result.competition }));

    if (result.source) {
      head.appendChild(el('span', { class: 'rsource-tag', text: result.source.toUpperCase() }));
    }
    if (result.status === 'live') {
      head.appendChild(el('span', { class: 'rlive', text: '● EN DIRECT' }));
    } else {
      head.appendChild(el('span', { class: 'rdone-tag', text: 'Terminé' }));
    }
    card.appendChild(head);

    const body = el('div', { class: 'rbody' });
    for (const m of result.matches) {
      const row = el('div', { class: 'mrow' });

      const left = el('div', { class: 'fn' });
      left.appendChild(document.createTextNode(`${m.leftFlag} ${m.left}`));
      left.appendChild(el('small', { text: m.leftCountry }));

      const scoreDiv = el('div', { class: 'sc' });
      scoreDiv.appendChild(document.createTextNode(m.score));
      scoreDiv.appendChild(el('small', { text: m.phase }));

      const right = el('div', { class: 'fn right' });
      right.appendChild(document.createTextNode(`${m.right} ${m.rightFlag}`));
      right.appendChild(el('small', { text: m.rightCountry }));

      row.appendChild(left);
      row.appendChild(scoreDiv);
      row.appendChild(right);
      body.appendChild(row);
    }
    card.appendChild(body);
    return card;
  };

  /* ── News card (scroll) ── */
  const renderNewsCard = (item) => {
    const card = el('div', { class: 'ncard', role: 'article', tabindex: '0' });
    card.setAttribute('aria-label', item.title);

    const img = el('div', { class: 'ncard-img' });
    img.textContent = item.icon;
    const cat = el('span', { class: 'ncat', text: item.category.charAt(0).toUpperCase() + item.category.slice(1) });
    img.appendChild(cat);

    const body = el('div', { class: 'ncard-body' });
    body.appendChild(el('div', { class: 'ncard-title', text: item.title }));
    body.appendChild(el('div', { class: 'ncard-meta', text: `${item.source} · ${item.time || item.date || ''}` }));

    card.appendChild(img);
    card.appendChild(body);
    return card;
  };

  /* ── News article ── */
  const renderNewsArticle = (item) => {
    const art = el('div', { class: 'nfull', role: 'article', tabindex: '0' });
    art.setAttribute('aria-label', item.title);
    art.appendChild(el('div', { class: 'nfull-ico', text: item.icon }));
    const b = el('div');
    b.appendChild(el('div', { class: 'nfull-title', text: item.title }));
    b.appendChild(el('div', { class: 'nfull-meta', text: `${item.source} · ${item.date}` }));
    art.appendChild(b);
    return art;
  };

  /* ── Video card ── */
  const renderVideoCard = (v) => {
    const card = el('div', { class: 'icard', role: 'article', tabindex: '0' });
    card.setAttribute('aria-label', `Interview : ${v.name}`);

    const thumb = el('div', { class: 'ithumb' });
    thumb.style.background = v.bg;
    const play = el('div', { class: 'iplay', text: '▶' });
    const dur = el('div', { class: 'idur', text: v.duration });
    thumb.appendChild(play);
    thumb.appendChild(dur);

    const body = el('div', { class: 'ibody' });
    body.appendChild(el('div', { class: 'iname', text: v.name }));
    body.appendChild(el('div', { class: 'isub', text: v.subtitle }));

    card.appendChild(thumb);
    card.appendChild(body);
    return card;
  };

  /* ── Ranking table ── */
  const renderRankingTable = (data, league = 'world') => {
    const ptsLabel = league === 'world' ? 'Points FIE' : league === 'europe' ? 'Points EFC' : 'Points FFE';

    const table = el('div', { class: 'rtable', role: 'table', 'aria-label': 'Classement' });

    const header = el('div', { class: 'rrow rrow-header', role: 'row' });
    header.innerHTML = `<span style="width:24px">#</span><span style="flex:1">Athlète</span><span>${ptsLabel}</span><span style="width:16px"></span>`;
    table.appendChild(header);

    for (const r of data) {
      const row = el('div', { class: 'rrow', role: 'row', tabindex: '0' });

      const numClass = r.rank === 1 ? 'rnum gold-medal' : r.rank === 2 ? 'rnum silver-medal' : r.rank === 3 ? 'rnum bronze-medal' : 'rnum';
      row.appendChild(el('div', { class: numClass, text: String(r.rank) }));

      const name = el('div', { class: 'rname' });
      name.appendChild(el('strong', { text: r.name }));
      name.appendChild(el('span', { text: r.country }));
      row.appendChild(name);

      row.appendChild(el('div', { class: 'rpts', text: r.pts.toLocaleString('fr-FR') }));

      const trendMap = { up: '▲', dn: '▼', eq: '—' };
      const trendClass = `rarr ${r.trend}`;
      row.appendChild(el('div', { class: trendClass, text: trendMap[r.trend] || '—' }));

      table.appendChild(row);
    }
    return table;
  };

  /* ── Calendar card ── */
  const renderCalCard = (ev) => {
    const card = el('div', { class: 'ccal', role: 'article', tabindex: '0' });
    card.setAttribute('aria-label', ev.name);

    const box = el('div', { class: 'cdbox' });
    box.appendChild(el('div', { class: 'cday', text: ev.day }));
    box.appendChild(el('div', { class: 'cmon', text: ev.month }));

    const info = el('div', { class: 'cinfo' });
    info.appendChild(el('div', { class: 'cname', text: ev.name }));
    info.appendChild(el('div', { class: 'cloc', text: ev.location }));

    const tags = el('div', { class: 'ctags' });
    for (const t of ev.tags) {
      tags.appendChild(el('span', { class: `ctag ${t.cls}`, text: t.label }));
    }
    info.appendChild(tags);

    card.appendChild(box);
    card.appendChild(info);
    return card;
  };

  /* ── Athlete card ── */
  const renderAthleteCard = (a) => {
    const card = el('div', { class: 'acard', role: 'article', tabindex: '0' });
    card.setAttribute('aria-label', `${a.name}, ${a.weaponLabel}`);

    const head = el('div', { class: 'ahead' });
    head.appendChild(el('div', { class: 'aav', text: a.icon }));

    const info = el('div', { class: 'ainfo' });
    info.appendChild(el('strong', { text: a.name }));
    info.appendChild(el('span', { text: `${a.country} · ${a.age} ans` }));
    info.appendChild(el('div', { class: 'aweap', text: a.weaponLabel }));
    head.appendChild(info);

    const stats = el('div', { class: 'astats', role: 'list' });
    const addStat = (val, lbl) => {
      const s = el('div', { class: 'astat', role: 'listitem' });
      s.appendChild(el('div', { class: 'asv', text: String(val) }));
      s.appendChild(el('div', { class: 'asl', text: lbl }));
      return s;
    };
    stats.appendChild(addStat(a.worldRank, 'Mondial'));
    stats.appendChild(addStat(a.wins, 'Victoires'));
    stats.appendChild(addStat(a.titles, a.titlesLabel));

    card.appendChild(head);
    card.appendChild(stats);
    return card;
  };

  /* ── Empty state ── */
  const renderEmpty = (msg) => {
    const div = el('div', { class: 'empty-state' });
    div.appendChild(el('div', { class: 'empty-icon', text: '🤺' }));
    div.appendChild(el('p', { text: msg }));
    return div;
  };

  /* ── Skeleton card ── */
  const renderSkeleton = (count = 3) => {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const card = el('div', { class: 'rcard skeleton-card' });
      card.style.cssText = 'height:90px;margin-bottom:12px;border-radius:16px;';
      frag.appendChild(card);
    }
    return frag;
  };

  /* ══════════════════════════
     POPULATE PAGES
  ══════════════════════════ */

  /* ── ACCUEIL ── */
  const populateHome = () => {
    const newsScroll = $('home-news-scroll');
    if (newsScroll) {
      newsScroll.innerHTML = '';
      for (const item of DATA.newsHighlights) {
        newsScroll.appendChild(renderNewsCard(item));
      }
    }

    const homeResult = $('home-result');
    if (homeResult && DATA.liveResults.length > 0) {
      homeResult.innerHTML = '';
      homeResult.appendChild(renderResultCard(DATA.liveResults[0]));
    }

    const homeCal = $('home-calendar');
    if (homeCal) {
      homeCal.innerHTML = '';
      for (const ev of DATA.calendar.slice(0, 3)) {
        homeCal.appendChild(renderCalCard(ev));
      }
    }

    const homeRanking = $('home-ranking');
    if (homeRanking) {
      homeRanking.innerHTML = '';
      const topData = DATA.rankings.world.men.foil.slice(0, 5);
      homeRanking.appendChild(renderRankingTable(topData, 'world'));
    }
  };

  /* ── DIRECT ── */
  const populateDirect = (animate = false) => {
    const wrapper = $('direct-results');
    if (!wrapper) return;

    const liveResults = DATA.liveResults;
    const liveCount = liveResults.filter(r => r.status === 'live').length;

    // Mettre à jour les compteurs
    updateLiveCounts(liveCount);

    // Rendre les cartes
    if (animate) {
      wrapper.classList.add('updating');
      setTimeout(() => wrapper.classList.remove('updating'), 400);
    }

    wrapper.innerHTML = '';
    const div = el('div', { class: 'results-wrapper' });

    // Séparation live / terminé
    const live = liveResults.filter(r => r.status === 'live');
    const done = liveResults.filter(r => r.status === 'done');

    if (live.length > 0) {
      const lbl = el('h2', { class: 'section-label results-sublabel', text: `En cours (${live.length})` });
      div.appendChild(lbl);
      for (const r of live) div.appendChild(renderResultCard(r));
    }

    if (done.length > 0) {
      const lbl = el('h2', { class: 'section-label results-sublabel', style: 'margin-top:20px', text: `Terminés (${done.length})` });
      div.appendChild(lbl);
      for (const r of done) div.appendChild(renderResultCard(r));
    }

    if (live.length === 0 && done.length === 0) {
      div.appendChild(renderEmpty('Aucune compétition en cours'));
    }

    wrapper.appendChild(div);
  };

  /* ── CLASSEMENTS ── */
  const populateClassements = () => {
    const league = state.currentLeague;
    const gender = state.currentGender;
    const weapon = state.currentWeapon;

    const wrapper = $('classements-table');
    if (!wrapper) return;

    // Récupérer les données
    const data = DATA.rankings[league]?.[gender]?.[weapon] || [];

    wrapper.innerHTML = '';
    const div = el('div', { class: 'rankings-wrapper' });

    if (data.length === 0) {
      div.appendChild(renderEmpty('Classement non disponible'));
    } else {
      div.appendChild(renderRankingTable(data, league));
    }

    wrapper.appendChild(div);

    // Note source
    const sourceNote = $('classements-source-note');
    if (sourceNote) {
      const leagueNames = { world: 'FIE (Fédération Internationale d\'Escrime)', europe: 'EFC (Escrime Fédération Continentale)', france: 'FFE (Fédération Française d\'Escrime)' };
      const weaponNames = { foil: 'Fleuret', epee: 'Épée', sabre: 'Sabre' };
      const genderNames = { men: 'Hommes', women: 'Femmes' };
      sourceNote.innerHTML = '';
      const note = el('div', { class: 'source-info' });
      note.appendChild(el('span', { class: 'source-info-icon', text: 'ℹ' }));
      note.appendChild(el('span', {
        text: `Source : ${leagueNames[league]} · ${weaponNames[weapon]} ${genderNames[gender]} · Données indicatives`
      }));
      sourceNote.appendChild(note);
    }
  };

  /* ── NEWS ── */
  const populateNews = (filter = 'all') => {
    const videos = $('news-videos');
    if (videos) {
      videos.innerHTML = '';
      for (const v of DATA.videos) {
        videos.appendChild(renderVideoCard(v));
      }
    }

    const articles = $('news-articles');
    if (!articles) return;
    articles.innerHTML = '';
    const wrapper = el('div', { class: 'news-wrapper' });
    const filtered = filter === 'all'
      ? DATA.newsArticles
      : DATA.newsArticles.filter(a => a.category === filter || a.type === filter);

    if (filtered.length === 0) {
      wrapper.appendChild(renderEmpty('Aucune actualité trouvée'));
    } else {
      for (const item of filtered) {
        wrapper.appendChild(renderNewsArticle(item));
      }
    }
    articles.appendChild(wrapper);
  };

  /* ── CALENDRIER ── */
  const populateCalendar = (filter = 'all') => {
    const wrapper = $('cal-events');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    const div = el('div', { class: 'cal-wrapper' });
    const filtered = filter === 'all'
      ? DATA.calendar
      : DATA.calendar.filter(ev => ev.zone === filter);

    if (filtered.length === 0) {
      div.appendChild(renderEmpty('Aucune compétition dans cette zone'));
    } else {
      for (const ev of filtered) {
        div.appendChild(renderCalCard(ev));
      }
    }
    wrapper.appendChild(div);
  };

  /* ── ATHLETES ── */
  const populateAthletes = (filter = 'all', query = '') => {
    const wrapper = $('athletes-grid');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    const div = el('div', { class: 'athletes-wrapper' });

    const q = Security.validateSearchQuery(query).toLowerCase();
    let data = DATA.athletes;

    if (filter !== 'all') {
      if (filter === 'france') data = data.filter(a => a.country.includes('🇫🇷'));
      else data = data.filter(a => a.weapon === filter);
    }

    if (q) {
      data = data.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.weaponLabel.toLowerCase().includes(q)
      );
    }

    if (data.length === 0) {
      div.appendChild(renderEmpty('Aucun athlète trouvé'));
    } else {
      for (const a of data) {
        div.appendChild(renderAthleteCard(a));
      }
    }
    wrapper.appendChild(div);
  };

  /* ══════════════════════════
     LIVE UPDATE UI
  ══════════════════════════ */

  /* ── Mettre à jour tous les compteurs live ── */
  const updateLiveCounts = (count) => {
    state.liveCount = count;
    const els = ['live-count', 'topbar-live-count', 'direct-count', 'hero-live-count', 'bnav-badge'];
    for (const id of els) {
      const el = $(id);
      if (el) el.textContent = String(count);
    }
  };

  /* ── Mettre à jour le timer depuis la dernière MAJ ── */
  const updateTimer = (seconds) => {
    const timeEl = $('update-time');
    const sidebarEl = $('sidebar-update-time');
    const text = seconds < 60
      ? `Mis à jour il y a ${seconds}s`
      : `Mis à jour il y a ${Math.floor(seconds / 60)}min`;

    if (timeEl) timeEl.textContent = text;
    if (sidebarEl) sidebarEl.textContent = text;

    // Barre de progression
    const bar = $('refresh-bar');
    if (bar) {
      const pct = Math.min((seconds / state.refreshInterval) * 100, 100);
      bar.style.width = `${pct}%`;
      // Couleur : vert → orange → rouge selon l'ancienneté
      if (pct < 50) bar.style.background = 'var(--green)';
      else if (pct < 80) bar.style.background = 'var(--gold)';
      else bar.style.background = 'var(--red)';
    }
  };

  /* ── Mettre à jour l'indicateur de source ── */
  const updateSourceBadge = (source) => {
    const label = $('source-label');
    const dot = document.querySelector('.source-dot');
    if (label) {
      label.textContent = source === 'engarde-live' ? 'Engarde Live' : source === 'simulated' ? 'Simulation' : 'En ligne';
    }
    if (dot) {
      dot.style.background = source === 'engarde-live' ? 'var(--green)' : source === 'simulated' ? 'var(--gold)' : 'var(--text2)';
    }
  };

  /* ── Mettre à jour le statut API ── */
  const updateAPIStatus = () => {
    const dot = $('api-dot');
    const label = $('api-status-label');
    const status = LiveAPI.getStatus();

    let statusText = '';
    let color = '';

    if (status.engarde === 'ok') {
      statusText = 'Engarde connecté';
      color = 'var(--green)';
    } else if (status.engarde === 'error') {
      statusText = 'Mode simulation';
      color = 'var(--gold)';
    } else {
      statusText = 'Connexion…';
      color = 'var(--text2)';
    }

    if (dot) dot.style.background = color;
    if (label) label.textContent = statusText;
  };

  /* ── Animation bouton refresh ── */
  const animateRefreshBtn = (spinning) => {
    const icon = $('refresh-icon');
    if (icon) {
      icon.style.display = 'inline-block';
      icon.style.transition = 'transform 0.5s ease';
      if (spinning) {
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => { icon.style.transform = 'rotate(0deg)'; icon.style.transition = 'none'; }, 500);
      }
    }
  };

  /* ══════════════════════════
     NAVIGATION
  ══════════════════════════ */

  const navigate = (page) => {
    if (state.currentPage === page) return;
    state.currentPage = page;

    $$('.page').forEach(p => p.classList.remove('active'));
    const target = $(`page-${page}`);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }

    $$('.snav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.page === page);
      b.setAttribute('aria-current', b.dataset.page === page ? 'page' : 'false');
    });
    $$('.bnav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.page === page);
    });

    if (page === 'home') populateHome();
    if (page === 'direct') populateDirect();
    if (page === 'classements') populateClassements();
    if (page === 'news') populateNews(state.currentNewsFilter);
    if (page === 'competitions') populateCalendar(state.currentCalFilter);
    if (page === 'athletes') populateAthletes(state.currentAthleteFilter, state.searchQuery);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Switcher de ligue (Classements) ── */
  const switchLeague = (league) => {
    state.currentLeague = league;
    $$('#league-tabs .ltab').forEach(b => b.classList.toggle('active', b.dataset.league === league));
    populateClassements();
  };

  /* ── Forcer un rafraîchissement ── */
  const forceRefresh = () => {
    animateRefreshBtn(true);
    LiveAPI.forceRefresh();
  };

  /* ══════════════════════════
     FILTRES & ÉVÉNEMENTS
  ══════════════════════════ */

  const setupFilters = () => {

    // News
    $('news-filters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.fbtn');
      if (!btn) return;
      $('news-filters').querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentNewsFilter = btn.dataset.filter;
      populateNews(state.currentNewsFilter);
    });

    // Calendrier
    $('cal-filters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.fbtn');
      if (!btn) return;
      $('cal-filters').querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCalFilter = btn.dataset.filter;
      populateCalendar(state.currentCalFilter);
    });

    // Classements — Genre
    $('rank-gender-cls')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.gtbtn');
      if (!btn) return;
      $('rank-gender-cls').querySelectorAll('.gtbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentGender = btn.dataset.gender;
      populateClassements();
    });

    // Classements — Arme
    $('rank-weapon-cls')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.fbtn');
      if (!btn) return;
      $('rank-weapon-cls').querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentWeapon = btn.dataset.weapon;
      populateClassements();
    });

    // Athlètes
    $('athlete-filters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.fbtn');
      if (!btn) return;
      $('athlete-filters').querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentAthleteFilter = btn.dataset.filter;
      populateAthletes(state.currentAthleteFilter, state.searchQuery);
    });
  };

  /* ── Recherche athlètes ── */
  const setupSearch = () => {
    const input = $('athlete-search');
    const clearBtn = $('search-clear');
    if (!input) return;

    let debounceTimer;
    input.addEventListener('input', () => {
      if (!Security.rateLimiter.check('search', 20, 1000)) {
        input.value = input.value.slice(0, -1);
        return;
      }
      state.searchQuery = Security.validateSearchQuery(input.value);
      input.value = state.searchQuery;
      if (clearBtn) clearBtn.style.display = state.searchQuery ? 'block' : 'none';
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => populateAthletes(state.currentAthleteFilter, state.searchQuery), 200);
    });

    clearBtn?.addEventListener('click', () => {
      input.value = '';
      state.searchQuery = '';
      clearBtn.style.display = 'none';
      input.focus();
      populateAthletes(state.currentAthleteFilter, '');
    });
  };

  /* ── Keyboard ── */
  const setupKeyboard = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const si = $('athlete-search');
        if (document.activeElement === si) si.blur();
      }
      if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('tabindex') === '0') {
        if (e.target !== document.body) e.target.click();
      }
    });
  };

  /* ══════════════════════════
     INTÉGRATION LIVE API
  ══════════════════════════ */

  const setupLiveAPI = () => {
    // S'abonner aux événements du LiveAPI
    LiveAPI.subscribe((event, data) => {
      switch (event) {

        case 'tick':
          updateTimer(data);
          break;

        case 'refreshing':
          // Indicateur visuel de rafraîchissement
          const refBtn = $('refresh-btn');
          if (refBtn) refBtn.classList.add('refreshing');
          break;

        case 'live-updated':
          // Données live reçues
          const refBtnDone = $('refresh-btn');
          if (refBtnDone) refBtnDone.classList.remove('refreshing');
          updateAPIStatus();

          // Si la page direct est active → actualiser
          if (state.currentPage === 'direct') {
            populateDirect(true);
          }
          // Si on est sur l'accueil → actualiser le premier résultat
          if (state.currentPage === 'home') {
            const hr = $('home-result');
            if (hr && DATA.liveResults.length > 0) {
              hr.innerHTML = '';
              hr.appendChild(renderResultCard(DATA.liveResults[0]));
            }
          }
          break;

        case 'source':
          updateSourceBadge(data);
          break;
      }
    });

    // Démarrer le rafraîchissement automatique
    LiveAPI.startAutoRefresh();
  };

  /* ══════════════════════════
     INIT
  ══════════════════════════ */

  const init = () => {
    populateHome();
    setupFilters();
    setupSearch();
    setupKeyboard();
    setupLiveAPI();

    // Pré-charger direct en background
    setTimeout(populateDirect, 150);
  };

  /* ── Public API ── */
  return {
    navigate,
    switchLeague,
    forceRefresh,
    init
  };

})();

/* ── Démarrage ── */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
