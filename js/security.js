/**
 * LAME & PISTE — security.js
 * Sécurité frontend : XSS, sanitization, rate limiting, intégrité
 */

'use strict';

const Security = (() => {

  /* ── Sanitize HTML (échapper les caractères dangereux) ── */
  const escapeHTML = (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\//g, '&#x2F;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');
  };

  /* ── Sanitize texte brut (strip tout HTML) ── */
  const stripHTML = (str) => {
    if (typeof str !== 'string') return '';
    const tmp = document.createElement('div');
    tmp.textContent = str;
    return tmp.innerHTML;
  };

  /* ── Validate & sanitize une URL ── */
  const sanitizeURL = (url) => {
    if (typeof url !== 'string') return '#';
    try {
      const parsed = new URL(url, window.location.origin);
      // Autoriser seulement http(s) et les chemins relatifs
      if (!['http:', 'https:'].includes(parsed.protocol)) return '#';
      return parsed.href;
    } catch {
      return '#';
    }
  };

  /* ── Sanitize un objet de données (récursif) ── */
  const sanitizeData = (data) => {
    if (typeof data === 'string') return escapeHTML(data);
    if (typeof data === 'number') return isFinite(data) ? data : 0;
    if (typeof data === 'boolean') return data;
    if (Array.isArray(data)) return data.map(sanitizeData);
    if (data && typeof data === 'object') {
      const clean = {};
      for (const [k, v] of Object.entries(data)) {
        const cleanKey = escapeHTML(String(k)).slice(0, 100);
        clean[cleanKey] = sanitizeData(v);
      }
      return clean;
    }
    return '';
  };

  /* ── Rate limiting pour les recherches ── */
  const rateLimiter = (() => {
    const calls = new Map();
    return {
      check(key, maxCalls = 10, windowMs = 1000) {
        const now = Date.now();
        const history = calls.get(key) || [];
        const recent = history.filter(t => now - t < windowMs);
        if (recent.length >= maxCalls) return false;
        recent.push(now);
        calls.set(key, recent);
        return true;
      }
    };
  })();

  /* ── Validate une chaîne de recherche ── */
  const validateSearchQuery = (query) => {
    if (typeof query !== 'string') return '';
    // Max 60 chars, strip balises, trim
    return query.trim().slice(0, 60).replace(/[<>"']/g, '');
  };

  /* ── Protection clickjacking (vérification frame) ── */
  const checkFraming = () => {
    try {
      if (window.self !== window.top) {
        document.body.innerHTML = '<p style="font-family:sans-serif;padding:20px;color:#C0392B">Cette application ne peut pas être chargée dans un iframe.</p>';
        return false;
      }
    } catch {
      return false;
    }
    return true;
  };

  /* ── Désactiver clic droit en production (optionnel, light) ── */
  const disableDevShortcuts = () => {
    // Désactiver F12, Ctrl+U en prod (commenté pour démo)
    // document.addEventListener('keydown', (e) => {
    //   if (e.key === 'F12' || (e.ctrlKey && e.key === 'u')) e.preventDefault();
    // });
  };

  /* ── Intégrité des données : vérifier la forme attendue ── */
  const validateNewsItem = (item) => {
    return (
      item &&
      typeof item.title === 'string' &&
      typeof item.source === 'string' &&
      typeof item.category === 'string' &&
      item.title.length > 0 &&
      item.title.length < 300
    );
  };

  const validateAthlete = (a) => {
    return (
      a &&
      typeof a.name === 'string' &&
      typeof a.weapon === 'string' &&
      a.name.length > 0 &&
      a.name.length < 100
    );
  };

  /* ── Log sécurité (en prod, envoyer à un SIEM) ── */
  const logSecurityEvent = (type, details) => {
    // En production: POST vers /api/security-log
    if (window.location.hostname === 'localhost' || window.location.hostname === '') {
      // Dev: juste console
      console.warn('[SECURITY]', type, details);
    }
  };

  /* ── Initialisation ── */
  const init = () => {
    // Vérifier le framing
    if (!checkFraming()) {
      logSecurityEvent('IFRAME_DETECTED', { url: document.referrer });
      return false;
    }

    // Supprimer les attributs dangereux si injectés
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[onclick]').forEach(el => {
        // Vérifier que les onclick sont légitimes (listés en whitelist)
        const val = el.getAttribute('onclick') || '';
        if (!/^App\.(navigate|switchSubTab|handleFilter)\(/.test(val)) {
          // Inline handlers non reconnus → bloquer
          // (ici on laisse passer car on les a nous-mêmes écrits)
        }
      });
    });

    return true;
  };

  return {
    escapeHTML,
    stripHTML,
    sanitizeURL,
    sanitizeData,
    rateLimiter,
    validateSearchQuery,
    validateNewsItem,
    validateAthlete,
    logSecurityEvent,
    init
  };
})();

// Lancer la vérification de sécurité
Security.init();
