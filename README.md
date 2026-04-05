# TikoF

Application web responsive (mobile + desktop) dédiée à l'escrime mondiale et française.

## Structure

TikoF/<br>
├── index.html          # Point d'entrée + headers sécurité<br>
├── css/<br>
│   ├── main.css        # Variables, reset, layout, hero<br>
│   ├── components.css  # Cartes, résultats, classements, athlètes<br>
│   └── responsive.css  # Mobile, tablet, desktop, safe areas<br>
├── js/<br>
│   ├── security.js     # Module sécurité (XSS, sanitization, rate limiting)<br>
│   ├── data.js         # Données (à connecter aux APIs)<br>
│   └── app.js          # Logique application<br>
└── README.md<br>

## Fonctionnalités

- **Accueil** : À la une, résultat live, prochains events, top classement
- **Direct** : Tous les matchs en cours / terminés (style Engarde/Fencing Time)
- **Classements** : Classement des championnat par championnat(fr;eu;mena;asie;nordamerique;sudamerique;monde) + par armes(fleuret,sabres,epée) + sexe(h;f)
- **News** : Articles, interviews, vidéos — filtres Tout/News/Interviews/Vidéos/FFE
- **Compétitions** : Calendrier (8 zones géo) + Classements (3 armes × 2 genres + France)
- **Athlètes** : Profils + stats, recherche en temps réel, filtres arme/pays

## Informations
info recolter sur:
