# 🛒 Application Client - NovaCommerce (Standalone)

## 📋 Description

Cette application est une **page e-commerce standalone** complètement indépendante du projet admin Angular.

**Location du composant :** `src/app/pages/client/`

## 🏗️ Architecture

```
src/
├── app/
│   └── pages/
│       └── client/                    # Application Client (Indépendante)
│           ├── client.component.ts    # Logique (Panier, Modals, Paiement)
│           ├── client.component.html  # Template (Hero, Produits, Panier)
│           ├── client.component.scss  # Styles (Animations, Responsive)
│           └── client.routes.ts       # Routes (Lazy loading)
│
└── applications/
    └── client-app/                    # Emplacement pour déploiement futur
```

## 📌 Statut d'intégration

- ✅ **Composant créé et fonctionnel**
- ✅ **Complètement isolé** du projet admin
- ✅ **Pas intégré** dans la navigation principale
- ✅ **Accessible** via route directe (si activée)
- ✅ **Standalone** (peut être déployé indépendamment)

## 🚀 Utilisation

### Option 1 : Activer la route (Pour tester)

Si vous voulez accéder au composant en développement, ajoutez la route dans `app.routes.ts` :

```typescript
{
  path: 'client',
  loadChildren: () =>
    import('./pages/client/client.routes').then((m) => m.ClientRoutes),
}
```

Puis accédez via : `http://localhost:4200/client`

### Option 2 : Application standalone (Recommandé pour production)

Vous pouvez convertir ce composant en **application Angular indépendante** :

1. Créer un fichier `main-client.ts` dans `src/applications/client-app/`
2. Bootstrap le composant ClientComponent directement
3. Déployer sur un domaine séparé (ex: `client.novacommerce.com`)

### Option 3 : Iframe (Intégration légère)

Intégrer l'application client dans une iframe d'une autre application :

```html
<iframe src="https://client.novacommerce.com" width="100%" height="100%"></iframe>
```

## 🎯 Fonctionnalités

✅ Panier d'achat persistant (localStorage)  
✅ 3 produits e-commerce  
✅ Modals pour détails produit  
✅ Formulaire de paiement (simulé)  
✅ Responsive design  
✅ Animations smoothes  
✅ Design premium moderne  

## 📦 Dépendances

- Angular 17+
- Bootstrap 5.3.2
- Font Awesome 6.0.0
- SCSS

## 🔧 Détails techniques

**Type:** Composant Angular Standalone  
**Selector:** `app-client`  
**Bootstrap:** Oui (Modal, Offcanvas)  
**localStorage:** Oui (Panier persistant)  

## 📝 Notes importantes

1. **Indépendant** : Ne partage pas les services/modèles avec l'admin
2. **Sécurisé** : Données stockées localement (localStorage)
3. **Scalable** : Peut être converti en app standalone
4. **Testable** : Structure modulaire et bien organisée

## 🔄 Prochaines étapes (Optionnel)

- [ ] Créer une app Angular standalone pour le client
- [ ] Intégrer une API de paiement réelle (Stripe, PayPal)
- [ ] Ajouter une base de données pour les commandes
- [ ] Système d'authentification client
- [ ] Notifications en temps réel

---

**Créé le :** 25/02/2026  
**Dernière mise à jour :** 25/02/2026

