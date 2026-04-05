/**
 * LAME & PISTE — data.js
 * Données + Intégration API : Engarde Live · FIE · FFE
 * Mise à jour automatique toutes les 30s
 */

'use strict';

/* ══════════════════════════════════════════════════════
   DONNÉES STATIQUES (fallback si API indisponible)
══════════════════════════════════════════════════════ */

const DATA = {

  /* ── LIVE RESULTS (fallback) ── */
  liveResults: [
    {
      id: 'r1',
      competition: 'CDM Fleuret H · Budapest',
      status: 'live',
      source: 'engarde',
      engardeId: null,
      matches: [
        { left: 'Lefort', leftFlag: '🇫🇷', leftCountry: 'FRA', score: '15–12', phase: 'FINALE', right: 'Vismara', rightFlag: '🇮🇹', rightCountry: 'ITA' },
        { left: 'Cannone', leftFlag: '🇫🇷', leftCountry: 'FRA', score: '11–09', phase: '1/2 FIN.', right: 'Szilagyi', rightFlag: '🇭🇺', rightCountry: 'HUN' },
        { left: 'Bimbo', leftFlag: '🇳🇬', leftCountry: 'NGR', score: '08–08', phase: '1/4 FIN.', right: 'Jung', rightFlag: '🇰🇷', rightCountry: 'KOR' },
      ]
    },
    {
      id: 'r2',
      competition: 'CDM Sabre F · Séoul',
      status: 'live',
      source: 'engarde',
      engardeId: null,
      matches: [
        { left: 'Emura', leftFlag: '🇯🇵', leftCountry: 'JPN', score: '15–10', phase: 'FINALE', right: 'Choi', rightFlag: '🇰🇷', rightCountry: 'KOR' },
        { left: 'Brunet', leftFlag: '🇫🇷', leftCountry: 'FRA', score: '14–11', phase: '1/2 FIN.', right: 'Zagunis', rightFlag: '🇺🇸', rightCountry: 'USA' },
      ]
    },
    {
      id: 'r3',
      competition: 'CDM Épée F · Varsovie',
      status: 'live',
      source: 'engarde',
      matches: [
        { left: 'Mallo', leftFlag: '🇪🇸', leftCountry: 'ESP', score: '07–05', phase: '1/4 FIN.', right: 'Thibus', rightFlag: '🇫🇷', rightCountry: 'FRA' },
      ]
    },
    {
      id: 'r4',
      competition: 'CDM Fleuret F · Athènes',
      status: 'live',
      source: 'engarde',
      matches: [
        { left: 'Lee', leftFlag: '🇰🇷', leftCountry: 'KOR', score: '12–09', phase: '1/2 FIN.', right: 'Batini', rightFlag: '🇫🇷', rightCountry: 'FRA' },
      ]
    },
    {
      id: 'r5',
      competition: 'Chpt de France Épée · Lyon',
      status: 'done',
      source: 'ffe',
      matches: [
        { left: 'Poullain', leftFlag: '🇫🇷', leftCountry: 'FRA', score: '15–13', phase: 'FINALE', right: 'Martin', rightFlag: '🇫🇷', rightCountry: 'FRA' },
      ]
    },
    {
      id: 'r6',
      competition: 'Chpt de France Sabre H · Bordeaux',
      status: 'done',
      source: 'ffe',
      matches: [
        { left: 'Hamelin', leftFlag: '🇫🇷', leftCountry: 'FRA', score: '15–11', phase: 'FINALE', right: 'Limbach', rightFlag: '🇫🇷', rightCountry: 'FRA' },
      ]
    },
  ],

  /* ── NEWS ── */
  newsArticles: [
    { id: 'n1', icon: '🏆', title: 'France triple championne d\'Europe par équipes fleuret — Tbilissi 2026', source: 'FFE', date: '2 avril 2026', category: 'ffe', type: 'news' },
    { id: 'n2', icon: '⚡', title: 'Championnats du Monde 2026 : les qualifiés français officiellement annoncés', source: 'FFE', date: '28 mars 2026', category: 'ffe', type: 'news' },
    { id: 'n3', icon: '🎙️', title: 'Bardenet : "Mon épée, c\'est une extension de moi-même"', source: 'L\'Équipe', date: '25 mars 2026', category: 'interview', type: 'interview' },
    { id: 'n4', icon: '📊', title: 'Analyse : pourquoi la France domine le fleuret mondial depuis 2022', source: 'FIE', date: '20 mars 2026', category: 'news', type: 'news' },
    { id: 'n5', icon: '🥈', title: 'Ganna Rizatdinova, argent à Budapest — une saison record pour l\'Ukraine', source: 'FIE', date: '18 mars 2026', category: 'news', type: 'news' },
    { id: 'n6', icon: '🇫🇷', title: 'Résultats complets des championnats de France junior — Metz 2026', source: 'FFE', date: '15 mars 2026', category: 'ffe', type: 'news' },
    { id: 'n7', icon: '🎬', title: 'Documentaire : Dans les coulisses de l\'équipe de France', source: 'FFE TV', date: '10 mars 2026', category: 'video', type: 'video' },
    { id: 'n8', icon: '📋', title: 'Nouveau règlement FIE 2026 : ce qui change pour les compétitions', source: 'FIE', date: '5 mars 2026', category: 'news', type: 'news' },
  ],

  videos: [
    { id: 'v1', name: 'Enzo Lefort', subtitle: 'Paris 2028, ses ambitions', duration: '12:34', bg: 'var(--dark3)' },
    { id: 'v2', name: 'Manon Brunet', subtitle: 'Championne du monde, le retour', duration: '08:20', bg: '#16161a' },
    { id: 'v3', name: 'Romain Cannone', subtitle: 'De Tokyo à aujourd\'hui', duration: '15:07', bg: '#161410' },
    { id: 'v4', name: 'Ysaora Thibus', subtitle: 'Épée : ma vision du jeu', duration: '09:45', bg: '#0f1616' },
  ],

  newsHighlights: [
    { icon: '🥇', title: 'Lefort s\'impose à Budapest, 1er titre de la saison', source: 'FIE', time: 'Il y a 2h', category: 'Victoire' },
    { icon: '🎤', title: 'Brunet : "Je vise un 3e titre mondial cette année"', source: 'L\'Équipe', time: 'Hier', category: 'Interview' },
    { icon: '🏆', title: 'France triple championne d\'Europe par équipes', source: 'FFE', time: '2 avr.', category: 'Équipe' },
  ],

  /* ── RANKINGS ── */
  rankings: {
    // Classements mondiaux FIE
    world: {
      men: {
        foil: [
          { rank: 1, name: 'Enzo Lefort', country: '🇫🇷 France', pts: 3847, trend: 'eq' },
          { rank: 2, name: 'Tommaso Marini', country: '🇮🇹 Italie', pts: 3612, trend: 'up' },
          { rank: 3, name: 'Alexander Massialas', country: '🇺🇸 USA', pts: 3405, trend: 'dn' },
          { rank: 4, name: 'Cheong Ka Long', country: '🇭🇰 Hong Kong', pts: 3118, trend: 'up' },
          { rank: 5, name: 'Filippo Macchi', country: '🇮🇹 Italie', pts: 2890, trend: 'up' },
          { rank: 6, name: 'Nick Itkin', country: '🇺🇸 USA', pts: 2744, trend: 'dn' },
          { rank: 7, name: 'Erwann Le Péchoux', country: '🇫🇷 France', pts: 2601, trend: 'eq' },
          { rank: 8, name: 'Guilherme Toldo', country: '🇧🇷 Brésil', pts: 2480, trend: 'up' },
          { rank: 9, name: 'Ka Long Cheong', country: '🇭🇰 Hong Kong', pts: 2310, trend: 'dn' },
          { rank: 10, name: 'Daniele Garozzo', country: '🇮🇹 Italie', pts: 2205, trend: 'eq' },
        ],
        epee: [
          { rank: 1, name: 'Romain Cannone', country: '🇫🇷 France', pts: 3620, trend: 'up' },
          { rank: 2, name: 'Sandro Bazadze', country: '🇬🇪 Géorgie', pts: 3410, trend: 'eq' },
          { rank: 3, name: 'Lucas Malcotti', country: '🇨🇭 Suisse', pts: 3105, trend: 'dn' },
          { rank: 4, name: 'Yannick Borel', country: '🇫🇷 France', pts: 2980, trend: 'up' },
          { rank: 5, name: 'Richard Kruse', country: '🇬🇧 Grande-Bretagne', pts: 2755, trend: 'dn' },
          { rank: 6, name: 'Alexandre Bardenet', country: '🇫🇷 France', pts: 2612, trend: 'up' },
          { rank: 7, name: 'Gauthier Grumier', country: '🇫🇷 France', pts: 2490, trend: 'eq' },
          { rank: 8, name: 'Sergei Bida', country: '🇰🇿 Kazakhstan', pts: 2330, trend: 'up' },
          { rank: 9, name: 'Valeria Mosca', country: '🇮🇹 Italie', pts: 2190, trend: 'dn' },
          { rank: 10, name: 'Jérémy Cadot', country: '🇫🇷 France', pts: 2050, trend: 'up' },
        ],
        sabre: [
          { rank: 1, name: 'Oh Sanguk', country: '🇰🇷 Corée du Sud', pts: 4120, trend: 'eq' },
          { rank: 2, name: 'Szilagyi Aron', country: '🇭🇺 Hongrie', pts: 3895, trend: 'dn' },
          { rank: 3, name: 'Gu Bongil', country: '🇰🇷 Corée du Sud', pts: 3650, trend: 'up' },
          { rank: 4, name: 'Max Hartung', country: '🇩🇪 Allemagne', pts: 3210, trend: 'up' },
          { rank: 5, name: 'Daryl Homer', country: '🇺🇸 USA', pts: 2980, trend: 'eq' },
          { rank: 6, name: 'Luigi Samele', country: '🇮🇹 Italie', pts: 2790, trend: 'dn' },
          { rank: 7, name: 'Boladé Apithy', country: '🇫🇷 France', pts: 2640, trend: 'up' },
          { rank: 8, name: 'Junghoon Jung', country: '🇰🇷 Corée du Sud', pts: 2500, trend: 'eq' },
          { rank: 9, name: 'Eli Dershwitz', country: '🇺🇸 USA', pts: 2350, trend: 'up' },
          { rank: 10, name: 'Luca Curatoli', country: '🇮🇹 Italie', pts: 2220, trend: 'dn' },
        ],
      },
      women: {
        foil: [
          { rank: 1, name: 'Lee Kiefer', country: '🇺🇸 USA', pts: 4010, trend: 'up' },
          { rank: 2, name: 'Inna Deriglazova', country: '🇷🇺 Russie', pts: 3780, trend: 'eq' },
          { rank: 3, name: 'Larissa Korobeynikova', country: '🇷🇺 Russie', pts: 3540, trend: 'dn' },
          { rank: 4, name: 'Arianna Errigo', country: '🇮🇹 Italie', pts: 3290, trend: 'up' },
          { rank: 5, name: 'Martina Batini', country: '🇮🇹 Italie', pts: 3120, trend: 'eq' },
          { rank: 6, name: 'Alice Volpi', country: '🇮🇹 Italie', pts: 2990, trend: 'dn' },
          { rank: 7, name: 'Ysaora Thibus', country: '🇫🇷 France', pts: 2810, trend: 'up' },
          { rank: 8, name: 'Jeon Hee-sook', country: '🇰🇷 Corée du Sud', pts: 2640, trend: 'up' },
          { rank: 9, name: 'Sun Yiwen', country: '🇨🇳 Chine', pts: 2490, trend: 'dn' },
          { rank: 10, name: 'Camille Ebert', country: '🇩🇪 Allemagne', pts: 2310, trend: 'eq' },
        ],
        epee: [
          { rank: 1, name: 'Sun Yiwen', country: '🇨🇳 Chine', pts: 4250, trend: 'up' },
          { rank: 2, name: 'Ana Maria Popescu', country: '🇷🇴 Roumanie', pts: 3970, trend: 'eq' },
          { rank: 3, name: 'Laura Flessel-Colovic', country: '🇫🇷 France', pts: 3640, trend: 'up' },
          { rank: 4, name: 'Mara Navarria', country: '🇮🇹 Italie', pts: 3380, trend: 'dn' },
          { rank: 5, name: 'Alexandra Louis', country: '🇫🇷 France', pts: 2990, trend: 'up' },
          { rank: 6, name: 'Katarzyna Mosór', country: '🇵🇱 Pologne', pts: 2780, trend: 'eq' },
          { rank: 7, name: 'Nathalie Moellhausen', country: '🇧🇷 Brésil', pts: 2560, trend: 'dn' },
          { rank: 8, name: 'Entela Rista', country: '🇷🇸 Serbie', pts: 2340, trend: 'up' },
          { rank: 9, name: 'Pauline Ranvier', country: '🇫🇷 France', pts: 2180, trend: 'up' },
          { rank: 10, name: 'Karin Kovacs', country: '🇸🇪 Suède', pts: 2020, trend: 'eq' },
        ],
        sabre: [
          { rank: 1, name: 'Manon Brunet', country: '🇫🇷 France', pts: 4180, trend: 'up' },
          { rank: 2, name: 'Olga Kharlan', country: '🇺🇦 Ukraine', pts: 3920, trend: 'eq' },
          { rank: 3, name: 'Sofya Velikaya', country: '🇷🇺 Russie', pts: 3660, trend: 'dn' },
          { rank: 4, name: 'Mariel Zagunis', country: '🇺🇸 USA', pts: 3410, trend: 'up' },
          { rank: 5, name: 'Bashta Yuliia', country: '🇺🇦 Ukraine', pts: 3140, trend: 'eq' },
          { rank: 6, name: 'Camille Serme', country: '🇫🇷 France', pts: 2890, trend: 'up' },
          { rank: 7, name: 'Kim Ji-yeon', country: '🇰🇷 Corée du Sud', pts: 2650, trend: 'dn' },
          { rank: 8, name: 'Olga Nikitina', country: '🇷🇺 Russie', pts: 2420, trend: 'eq' },
          { rank: 9, name: 'Sofia Pozdniakova', country: '🇷🇺 Russie', pts: 2210, trend: 'up' },
          { rank: 10, name: 'Anne-Elizabeth Stone', country: '🇺🇸 USA', pts: 2050, trend: 'dn' },
        ],
      }
    },

    // Classements européens EFC
    europe: {
      men: {
        foil: [
          { rank: 1, name: 'Enzo Lefort', country: '🇫🇷 France', pts: 960, trend: 'eq' },
          { rank: 2, name: 'Tommaso Marini', country: '🇮🇹 Italie', pts: 880, trend: 'up' },
          { rank: 3, name: 'Erwann Le Péchoux', country: '🇫🇷 France', pts: 720, trend: 'eq' },
          { rank: 4, name: 'Daniele Garozzo', country: '🇮🇹 Italie', pts: 695, trend: 'dn' },
          { rank: 5, name: 'Guilherme Toldo', country: '🇧🇷 Brésil', pts: 640, trend: 'up' },
          { rank: 6, name: 'Dmitry Rigel', country: '🇩🇪 Allemagne', pts: 580, trend: 'eq' },
          { rank: 7, name: 'Maxime Pauty', country: '🇫🇷 France', pts: 530, trend: 'up' },
          { rank: 8, name: 'Giorgio Avola', country: '🇮🇹 Italie', pts: 490, trend: 'dn' },
        ],
        epee: [
          { rank: 1, name: 'Romain Cannone', country: '🇫🇷 France', pts: 900, trend: 'up' },
          { rank: 2, name: 'Lucas Malcotti', country: '🇨🇭 Suisse', pts: 820, trend: 'eq' },
          { rank: 3, name: 'Yannick Borel', country: '🇫🇷 France', pts: 780, trend: 'up' },
          { rank: 4, name: 'Richard Kruse', country: '🇬🇧 G-B', pts: 710, trend: 'dn' },
          { rank: 5, name: 'Alexandre Bardenet', country: '🇫🇷 France', pts: 650, trend: 'up' },
          { rank: 6, name: 'Gauthier Grumier', country: '🇫🇷 France', pts: 600, trend: 'eq' },
          { rank: 7, name: 'Rafael Szabo', country: '🇸🇰 Slovaquie', pts: 545, trend: 'dn' },
          { rank: 8, name: 'Pavel Surov', country: '🇨🇿 Tchéquie', pts: 490, trend: 'up' },
        ],
        sabre: [
          { rank: 1, name: 'Szilagyi Aron', country: '🇭🇺 Hongrie', pts: 980, trend: 'eq' },
          { rank: 2, name: 'Max Hartung', country: '🇩🇪 Allemagne', pts: 840, trend: 'up' },
          { rank: 3, name: 'Luigi Samele', country: '🇮🇹 Italie', pts: 760, trend: 'dn' },
          { rank: 4, name: 'Boladé Apithy', country: '🇫🇷 France', pts: 710, trend: 'up' },
          { rank: 5, name: 'Luca Curatoli', country: '🇮🇹 Italie', pts: 650, trend: 'eq' },
          { rank: 6, name: 'Nicolas Limbach', country: '🇩🇪 Allemagne', pts: 590, trend: 'dn' },
          { rank: 7, name: 'Vincent Anstett', country: '🇫🇷 France', pts: 540, trend: 'up' },
          { rank: 8, name: 'Gvidas Budrys', country: '🇱🇹 Lituanie', pts: 480, trend: 'eq' },
        ],
      },
      women: {
        foil: [
          { rank: 1, name: 'Inna Deriglazova', country: '🇷🇺 Russie', pts: 940, trend: 'eq' },
          { rank: 2, name: 'Arianna Errigo', country: '🇮🇹 Italie', pts: 860, trend: 'up' },
          { rank: 3, name: 'Martina Batini', country: '🇮🇹 Italie', pts: 790, trend: 'eq' },
          { rank: 4, name: 'Alice Volpi', country: '🇮🇹 Italie', pts: 720, trend: 'dn' },
          { rank: 5, name: 'Ysaora Thibus', country: '🇫🇷 France', pts: 680, trend: 'up' },
          { rank: 6, name: 'Camille Ebert', country: '🇩🇪 Allemagne', pts: 610, trend: 'eq' },
          { rank: 7, name: 'Erica Cipressa', country: '🇮🇹 Italie', pts: 560, trend: 'dn' },
          { rank: 8, name: 'Pauline Ranvier', country: '🇫🇷 France', pts: 510, trend: 'up' },
        ],
        epee: [
          { rank: 1, name: 'Ana Maria Popescu', country: '🇷🇴 Roumanie', pts: 920, trend: 'eq' },
          { rank: 2, name: 'Laura Flessel-Colovic', country: '🇫🇷 France', pts: 850, trend: 'up' },
          { rank: 3, name: 'Mara Navarria', country: '🇮🇹 Italie', pts: 790, trend: 'dn' },
          { rank: 4, name: 'Alexandra Louis', country: '🇫🇷 France', pts: 710, trend: 'up' },
          { rank: 5, name: 'Katarzyna Mosór', country: '🇵🇱 Pologne', pts: 660, trend: 'eq' },
          { rank: 6, name: 'Nathalie Moellhausen', country: '🇧🇷 Brésil', pts: 600, trend: 'dn' },
          { rank: 7, name: 'Pauline Ranvier', country: '🇫🇷 France', pts: 545, trend: 'up' },
          { rank: 8, name: 'Karin Kovacs', country: '🇸🇪 Suède', pts: 490, trend: 'eq' },
        ],
        sabre: [
          { rank: 1, name: 'Manon Brunet', country: '🇫🇷 France', pts: 960, trend: 'up' },
          { rank: 2, name: 'Olga Kharlan', country: '🇺🇦 Ukraine', pts: 900, trend: 'eq' },
          { rank: 3, name: 'Sofya Velikaya', country: '🇷🇺 Russie', pts: 820, trend: 'dn' },
          { rank: 4, name: 'Bashta Yuliia', country: '🇺🇦 Ukraine', pts: 740, trend: 'eq' },
          { rank: 5, name: 'Camille Serme', country: '🇫🇷 France', pts: 680, trend: 'up' },
          { rank: 6, name: 'Olga Nikitina', country: '🇷🇺 Russie', pts: 620, trend: 'eq' },
          { rank: 7, name: 'Sofia Pozdniakova', country: '🇷🇺 Russie', pts: 570, trend: 'up' },
          { rank: 8, name: 'Cécilia Berder', country: '🇫🇷 France', pts: 510, trend: 'dn' },
        ],
      }
    },

    // Classements France FFE
    france: {
      men: {
        foil: [
          { rank: 1, name: 'Enzo Lefort', country: 'Île-de-France', pts: 1200, trend: 'eq' },
          { rank: 2, name: 'Erwann Le Péchoux', country: 'Bretagne', pts: 980, trend: 'eq' },
          { rank: 3, name: 'Maxime Pauty', country: 'PACA', pts: 820, trend: 'up' },
          { rank: 4, name: 'Enzo Luperi', country: 'Île-de-France', pts: 710, trend: 'up' },
          { rank: 5, name: 'Théo Rabinot', country: 'Grand Est', pts: 650, trend: 'dn' },
          { rank: 6, name: 'Aurélien Mourette', country: 'Occitanie', pts: 590, trend: 'eq' },
          { rank: 7, name: 'Kevin Clémens', country: 'Hauts-de-France', pts: 540, trend: 'up' },
          { rank: 8, name: 'Grégoire Bastiani', country: 'Nouvelle-Aquitaine', pts: 490, trend: 'dn' },
        ],
        epee: [
          { rank: 1, name: 'Romain Cannone', country: 'Île-de-France', pts: 1150, trend: 'up' },
          { rank: 2, name: 'Yannick Borel', country: 'Île-de-France', pts: 1020, trend: 'up' },
          { rank: 3, name: 'Alexandre Bardenet', country: 'Île-de-France', pts: 890, trend: 'up' },
          { rank: 4, name: 'Gauthier Grumier', country: 'Hauts-de-France', pts: 760, trend: 'eq' },
          { rank: 5, name: 'Jérémy Cadot', country: 'Bourgogne-F-C', pts: 680, trend: 'dn' },
          { rank: 6, name: 'Axel Clermont', country: 'Auvergne-R-A', pts: 620, trend: 'eq' },
          { rank: 7, name: 'Thomas Gare', country: 'Bretagne', pts: 560, trend: 'up' },
          { rank: 8, name: 'Valentin Bardet', country: 'Nouvelle-Aquitaine', pts: 500, trend: 'dn' },
        ],
        sabre: [
          { rank: 1, name: 'Boladé Apithy', country: 'Île-de-France', pts: 1100, trend: 'up' },
          { rank: 2, name: 'Vincent Anstett', country: 'Grand Est', pts: 920, trend: 'up' },
          { rank: 3, name: 'Julien Mertine', country: 'Île-de-France', pts: 800, trend: 'eq' },
          { rank: 4, name: 'Sébastien Patrice', country: 'Hauts-de-France', pts: 710, trend: 'dn' },
          { rank: 5, name: 'Alexis Beaux', country: 'Occitanie', pts: 640, trend: 'up' },
          { rank: 6, name: 'Hugo Bonnin', country: 'PACA', pts: 580, trend: 'eq' },
          { rank: 7, name: 'Maxime Garber', country: 'Île-de-France', pts: 530, trend: 'dn' },
          { rank: 8, name: 'Kamel Kelemen', country: 'Grand Est', pts: 480, trend: 'up' },
        ],
      },
      women: {
        foil: [
          { rank: 1, name: 'Ysaora Thibus', country: 'Île-de-France', pts: 1050, trend: 'up' },
          { rank: 2, name: 'Pauline Ranvier', country: 'Île-de-France', pts: 880, trend: 'eq' },
          { rank: 3, name: 'Astrid Guyard', country: 'Île-de-France', pts: 750, trend: 'up' },
          { rank: 4, name: 'Cyrielle Dumont', country: 'Normandie', pts: 660, trend: 'dn' },
          { rank: 5, name: 'Élisa Guedon', country: 'Bretagne', pts: 600, trend: 'eq' },
          { rank: 6, name: 'Marina Mincheva', country: 'Île-de-France', pts: 540, trend: 'up' },
          { rank: 7, name: 'Lucie Baudin', country: 'Auvergne-R-A', pts: 490, trend: 'dn' },
          { rank: 8, name: 'Inès Paturle', country: 'Grand Est', pts: 430, trend: 'eq' },
        ],
        epee: [
          { rank: 1, name: 'Laura Flessel-Colovic', country: 'Île-de-France', pts: 1100, trend: 'up' },
          { rank: 2, name: 'Alexandra Louis', country: 'Bretagne', pts: 940, trend: 'up' },
          { rank: 3, name: 'Pauline Ranvier', country: 'Île-de-France', pts: 800, trend: 'up' },
          { rank: 4, name: 'Corinne Maitrejean', country: 'Île-de-France', pts: 700, trend: 'eq' },
          { rank: 5, name: 'Naomi Pachon', country: 'PACA', pts: 640, trend: 'dn' },
          { rank: 6, name: 'Marie-Florence Candassamy', country: 'Martinique', pts: 580, trend: 'up' },
          { rank: 7, name: 'Cécile Gaudion', country: 'Occitanie', pts: 520, trend: 'eq' },
          { rank: 8, name: 'Tatiana Mincheva', country: 'Île-de-France', pts: 460, trend: 'dn' },
        ],
        sabre: [
          { rank: 1, name: 'Manon Brunet', country: 'Île-de-France', pts: 1200, trend: 'up' },
          { rank: 2, name: 'Camille Serme', country: 'Île-de-France', pts: 1050, trend: 'up' },
          { rank: 3, name: 'Cécilia Berder', country: 'Bretagne', pts: 880, trend: 'dn' },
          { rank: 4, name: 'Charlotte Lembach', country: 'Grand Est', pts: 760, trend: 'eq' },
          { rank: 5, name: 'Sara Balzer', country: 'Grand Est', pts: 680, trend: 'up' },
          { rank: 6, name: 'Léa Ferré', country: 'Île-de-France', pts: 610, trend: 'dn' },
          { rank: 7, name: 'Marie-Florence Candassamy', country: 'Martinique', pts: 550, trend: 'eq' },
          { rank: 8, name: 'Clémentine Delaunay', country: 'Bretagne', pts: 490, trend: 'up' },
        ],
      }
    }
  },

  /* ── CALENDAR ── */
  calendar: [
    { id: 'c1', day: '12', month: 'AVR', name: 'CDM Épée Individuel — Madrid', location: '📍 Espagne', zone: 'europe', tags: [{ cls: 'world', label: 'Mondial' }, { cls: 'neutral', label: 'H/F · Ind.' }] },
    { id: 'c2', day: '19', month: 'AVR', name: 'Chpt de France Senior Individuel — Grenoble', location: '📍 Grenoble, France', zone: 'france', tags: [{ cls: 'france', label: '🇫🇷 France' }, { cls: 'neutral', label: 'H/F' }] },
    { id: 'c3', day: '26', month: 'AVR', name: 'CDM Sabre — Seoul', location: '📍 Corée du Sud', zone: 'asia', tags: [{ cls: 'asia', label: 'Asie' }, { cls: 'neutral', label: 'H/F · Ind.' }] },
    { id: 'c4', day: '3', month: 'MAI', name: 'Championnats d\'Europe — Tbilissi', location: '📍 Géorgie', zone: 'europe', tags: [{ cls: 'europe', label: 'Européen' }, { cls: 'neutral', label: 'Ind. + Éq.' }] },
    { id: 'c5', day: '10', month: 'MAI', name: 'CDM Fleuret — New York', location: '📍 USA', zone: 'north-america', tags: [{ cls: 'am-n', label: 'Amériques N.' }, { cls: 'neutral', label: 'H/F · Ind.' }] },
    { id: 'c6', day: '17', month: 'MAI', name: 'Pan-American Championships — Buenos Aires', location: '📍 Argentine', zone: 'south-america', tags: [{ cls: 'am-s', label: 'Amériques S.' }, { cls: 'neutral', label: 'Ind. + Éq.' }] },
    { id: 'c7', day: '24', month: 'MAI', name: 'Chpt de France par Équipes — Paris', location: '📍 Paris, France', zone: 'france', tags: [{ cls: 'france', label: '🇫🇷 France' }, { cls: 'neutral', label: 'H/F · Éq.' }] },
    { id: 'c8', day: '31', month: 'MAI', name: 'CDM Épée — Dubaï', location: '📍 Émirats Arabes Unis', zone: 'mena', tags: [{ cls: 'mena', label: 'MENA' }, { cls: 'neutral', label: 'H/F · Ind.' }] },
    { id: 'c9', day: '7', month: 'JUN', name: 'Championnats du Monde — Tachkent', location: '📍 Ouzbékistan', zone: 'world', tags: [{ cls: 'world', label: 'Mondial' }, { cls: 'neutral', label: 'Ind. + Éq.' }] },
    { id: 'c10', day: '20', month: 'JUN', name: 'CDM Sabre — Le Caire', location: '📍 Égypte', zone: 'mena', tags: [{ cls: 'mena', label: 'MENA' }, { cls: 'neutral', label: 'H/F · Ind.' }] },
    { id: 'c11', day: '5', month: 'JUL', name: 'Chpt de France Jeunes — Strasbourg', location: '📍 Strasbourg, France', zone: 'france', tags: [{ cls: 'france', label: '🇫🇷 France' }, { cls: 'neutral', label: 'Cadets · Juniors' }] },
    { id: 'c12', day: '18', month: 'JUL', name: 'CDM Fleuret — Tokyo', location: '📍 Japon', zone: 'asia', tags: [{ cls: 'asia', label: 'Asie' }, { cls: 'neutral', label: 'H/F · Ind.' }] },
  ],

  /* ── ATHLETES ── */
  athletes: [
    { id: 'a1', icon: '🤺', name: 'Enzo Lefort', country: '🇫🇷 France', age: 31, weapon: 'foil', weaponLabel: 'Fleuret Homme', worldRank: '#1', wins: 42, titles: 3, titlesLabel: 'Titres CM' },
    { id: 'a2', icon: '⚔️', name: 'Manon Brunet', country: '🇫🇷 France', age: 33, weapon: 'sabre', weaponLabel: 'Sabre Femme', worldRank: '#1', wins: 38, titles: 2, titlesLabel: 'Titres CM' },
    { id: 'a3', icon: '🥇', name: 'Romain Cannone', country: '🇫🇷 France', age: 27, weapon: 'epee', weaponLabel: 'Épée Homme', worldRank: '#1', wins: 21, titles: 1, titlesLabel: 'Titre JO' },
    { id: 'a4', icon: '🎯', name: 'Oh Sanguk', country: '🇰🇷 Corée du Sud', age: 30, weapon: 'sabre', weaponLabel: 'Sabre Homme', worldRank: '#1', wins: 55, titles: 4, titlesLabel: 'Titres CM' },
    { id: 'a5', icon: '⚡', name: 'Ysaora Thibus', country: '🇫🇷 France', age: 31, weapon: 'foil', weaponLabel: 'Fleuret Femme', worldRank: '#7', wins: 28, titles: 1, titlesLabel: 'Titre CE' },
    { id: 'a6', icon: '🏅', name: 'Yannick Borel', country: '🇫🇷 France', age: 35, weapon: 'epee', weaponLabel: 'Épée Homme', worldRank: '#4', wins: 34, titles: 2, titlesLabel: 'Titres CM' },
    { id: 'a7', icon: '🎪', name: 'Lee Kiefer', country: '🇺🇸 USA', age: 30, weapon: 'foil', weaponLabel: 'Fleuret Femme', worldRank: '#1', wins: 45, titles: 3, titlesLabel: 'Titres CM' },
    { id: 'a8', icon: '🌟', name: 'Sun Yiwen', country: '🇨🇳 Chine', age: 26, weapon: 'epee', weaponLabel: 'Épée Femme', worldRank: '#1', wins: 39, titles: 2, titlesLabel: 'Titres CM' },
    { id: 'a9', icon: '🔥', name: 'Tommaso Marini', country: '🇮🇹 Italie', age: 23, weapon: 'foil', weaponLabel: 'Fleuret Homme', worldRank: '#2', wins: 18, titles: 1, titlesLabel: 'Titre CM' },
    { id: 'a10', icon: '💎', name: 'Olga Kharlan', country: '🇺🇦 Ukraine', age: 33, weapon: 'sabre', weaponLabel: 'Sabre Femme', worldRank: '#2', wins: 61, titles: 4, titlesLabel: 'Titres CM' },
  ]
};


/* ══════════════════════════════════════════════════════
   COUCHE API — ENGARDE + FIE + FFE
══════════════════════════════════════════════════════ */

const LiveAPI = (() => {

  /* ── Configuration des sources API ── */
  const CONFIG = {
    // Engarde-service : API REST publique pour les compétitions en direct
    // Endpoint officiel : https://engarde-service.com/api/
    ENGARDE_BASE: 'https://engarde-service.com/api',
    // FIE rankings : disponibles sur fie.org (CORS limité → proxy ou scraping)
    FIE_BASE: 'https://fie.org/athletes',
    // Intervalle de rafraîchissement
    REFRESH_INTERVAL_LIVE: 15000,   // 15s pour les matchs en direct
    REFRESH_INTERVAL_DATA: 60000,   // 60s pour classements/calendrier
    // Timeout par requête
    FETCH_TIMEOUT: 8000,
  };

  /* ── État interne ── */
  let _state = {
    lastLiveUpdate: null,
    lastRankingUpdate: null,
    liveRefreshId: null,
    dataRefreshId: null,
    apiStatus: { engarde: 'unknown', fie: 'unknown', ffe: 'unknown' },
    liveData: null,     // données Engarde actuelles
    listeners: [],      // callbacks à notifier lors d'un update
    secondsSinceUpdate: 0,
    tickId: null,
  };

  /* ── Fetch sécurisé avec timeout ── */
  const safeFetch = async (url, options = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT);
    try {
      const resp = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.json();
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  };

  /* ── Notifier les listeners ── */
  const notify = (event, data) => {
    _state.listeners.forEach(fn => { try { fn(event, data); } catch(e) {} });
  };

  /* ── Parser un match Engarde → format interne ── */
  const parseEngardeMatch = (match) => {
    // Format Engarde :
    // { leftName, leftCountry, rightName, rightCountry, leftScore, rightScore, phase, status }
    const flagMap = {
      'FRA': '🇫🇷', 'ITA': '🇮🇹', 'GER': '🇩🇪', 'ESP': '🇪🇸', 'USA': '🇺🇸',
      'KOR': '🇰🇷', 'JPN': '🇯🇵', 'CHN': '🇨🇳', 'HUN': '🇭🇺', 'RUS': '🇷🇺',
      'GBR': '🇬🇧', 'POL': '🇵🇱', 'UKR': '🇺🇦', 'ROU': '🇷🇴', 'AUT': '🇦🇹',
      'SUI': '🇨🇭', 'BEL': '🇧🇪', 'NED': '🇳🇱', 'CZE': '🇨🇿', 'SVK': '🇸🇰',
      'GEO': '🇬🇪', 'KAZ': '🇰🇿', 'BRA': '🇧🇷', 'ARG': '🇦🇷', 'NGR': '🇳🇬',
      'HKG': '🇭🇰', 'EGY': '🇪🇬', 'TUN': '🇹🇳', 'MAR': '🇲🇦', 'SWE': '🇸🇪',
    };

    const lc = (match.leftCountry || '').toUpperCase();
    const rc = (match.rightCountry || '').toUpperCase();

    return {
      left: match.leftName || '—',
      leftFlag: flagMap[lc] || '🏳️',
      leftCountry: lc,
      right: match.rightName || '—',
      rightFlag: flagMap[rc] || '🏳️',
      rightCountry: rc,
      score: `${match.leftScore || 0}–${match.rightScore || 0}`,
      phase: parsePhase(match.phase || match.tableau || ''),
    };
  };

  /* ── Normaliser le nom de la phase ── */
  const parsePhase = (raw) => {
    const r = String(raw).toUpperCase();
    if (r.includes('FINAL') && !r.includes('SEMI') && !r.includes('QUART') && !r.includes('1/')) return 'FINALE';
    if (r.includes('SEMI') || r.includes('1/2')) return '1/2 FIN.';
    if (r.includes('QUART') || r.includes('1/4')) return '1/4 FIN.';
    if (r.includes('1/8')) return '1/8 FIN.';
    if (r.includes('1/16')) return '1/16 FIN.';
    if (r.includes('POOL') || r.includes('POULE')) return 'POULES';
    return raw || 'MATCH';
  };

  /* ── Récupérer les compétitions Engarde en cours ── */
  const fetchEngardeCompetitions = async () => {
    try {
      // Endpoint public Engarde : liste des compétitions du jour
      const data = await safeFetch(`${CONFIG.ENGARDE_BASE}/competitions/live`);

      if (!Array.isArray(data)) throw new Error('Format inattendu');

      const results = data.map(comp => ({
        id: `engarde-${comp.id}`,
        competition: Security.escapeHTML(comp.name || comp.title || 'Compétition'),
        status: comp.status === 'finished' ? 'done' : 'live',
        source: 'engarde',
        engardeId: comp.id,
        matches: (comp.matches || comp.currentMatches || []).slice(0, 6).map(parseEngardeMatch),
      })).filter(r => r.matches.length > 0);

      _state.apiStatus.engarde = 'ok';
      return results;

    } catch (err) {
      _state.apiStatus.engarde = 'error';
      console.info('[LiveAPI] Engarde indisponible, données statiques utilisées:', err.message);
      return null;
    }
  };

  /* ── Récupérer les résultats d'une compétition Engarde spécifique ── */
  const fetchEngardeCompetition = async (engardeId) => {
    try {
      const data = await safeFetch(`${CONFIG.ENGARDE_BASE}/competitions/${engardeId}/results`);
      return data;
    } catch (err) {
      console.info(`[LiveAPI] Détails compétition ${engardeId} indisponibles`);
      return null;
    }
  };

  /* ── Simuler des variations réalistes pour les scores live ── */
  const simulateLiveUpdate = (results) => {
    return results.map(comp => {
      if (comp.status !== 'live') return comp;
      return {
        ...comp,
        matches: comp.matches.map(match => {
          const [ls, rs] = match.score.split('–').map(Number);
          // Incrémenter aléatoirement ±1 touche (simulation réaliste)
          const delta = Math.random() < 0.3 ? 1 : 0;
          const side = Math.random() < 0.5 ? 'left' : 'right';
          const newLs = side === 'left' ? Math.min(ls + delta, 15) : ls;
          const newRs = side === 'right' ? Math.min(rs + delta, 15) : rs;
          const isFinished = newLs >= 15 || newRs >= 15;
          return {
            ...match,
            score: `${String(newLs).padStart(2,'0')}–${String(newRs).padStart(2,'0')}`,
            phase: isFinished && match.phase === '1/4 FIN.' ? '1/2 FIN.' : match.phase,
          };
        })
      };
    });
  };

  /* ── Rafraîchissement principal des données live ── */
  const refreshLive = async () => {
    _state.secondsSinceUpdate = 0;
    notify('refreshing', null);

    // Tenter l'API Engarde
    const engardeData = await fetchEngardeCompetitions();

    let results;
    if (engardeData && engardeData.length > 0) {
      // Données réelles Engarde
      DATA.liveResults = engardeData;
      results = engardeData;
      notify('source', 'engarde-live');
    } else {
      // Simulation réaliste sur les données statiques
      DATA.liveResults = simulateLiveUpdate(DATA.liveResults);
      results = DATA.liveResults;
      notify('source', 'simulated');
    }

    _state.lastLiveUpdate = new Date();
    _state.liveData = results;
    notify('live-updated', results);
  };

  /* ── Ticker : incrémente le compteur depuis la dernière MAJ ── */
  const startTicker = () => {
    if (_state.tickId) clearInterval(_state.tickId);
    _state.tickId = setInterval(() => {
      _state.secondsSinceUpdate++;
      notify('tick', _state.secondsSinceUpdate);
    }, 1000);
  };

  /* ── Démarrer le rafraîchissement automatique ── */
  const startAutoRefresh = () => {
    // Premier chargement
    refreshLive();
    startTicker();

    // Rafraîchissement périodique live
    if (_state.liveRefreshId) clearInterval(_state.liveRefreshId);
    _state.liveRefreshId = setInterval(refreshLive, CONFIG.REFRESH_INTERVAL_LIVE);
  };

  /* ── Arrêter le rafraîchissement ── */
  const stopAutoRefresh = () => {
    if (_state.liveRefreshId) clearInterval(_state.liveRefreshId);
    if (_state.tickId) clearInterval(_state.tickId);
  };

  /* ── S'abonner aux mises à jour ── */
  const subscribe = (fn) => {
    _state.listeners.push(fn);
    return () => { _state.listeners = _state.listeners.filter(f => f !== fn); };
  };

  /* ── Statut de l'API ── */
  const getStatus = () => ({ ..._state.apiStatus });

  /* ── Forcer un rafraîchissement manuel ── */
  const forceRefresh = () => {
    refreshLive();
  };

  return {
    startAutoRefresh,
    stopAutoRefresh,
    subscribe,
    getStatus,
    forceRefresh,
    get secondsSince() { return _state.secondsSinceUpdate; }
  };

})();
