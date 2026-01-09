# ValiNum (v1.0.0)

**ValiNum** est une bibliothèque JavaScript légère et universelle conçue pour valider et identifier les numéros de téléphone. La version 1.0.0 est spécifiquement optimisée pour la **République Démocratique du Congo (RDC)**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

---

## ✨ Fonctionnalités
- **Identification de l'opérateur** : Détecte instantanément si le numéro appartient à **Vodacom, Orange, Airtel ou Africell**.
- **Validation en temps réel** : Indique si le numéro est incomplet, trop long ou valide.
- **Nettoyage automatique** : Gère les formats avec ou sans `+243`, `243` ou le `0` initial.
- **Universel** : Compatible avec PHP, Django, React, React Native, Vue, Node.js et TypeScript.

## 🚀 Installation

### Via NPM (Pour React, Vite, Node.js)
```bash
npm install valinum
```

## Via CDN (HTML classique, Pour PHP, Django, ...)
Ajoutez simplement ceci avant la fermeture de votre balise `</body>` :
```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v1.0.0/dist/valinum.js"></script>

```

## 💻 Utilisation
1. Utilisation simple (Web / PHP / Django)
```js
// Le script expose l'objet global 'ValiNum'
const result = ValiNum.validateDRC("+243824708027");

console.log(result.isValid);   // true
console.log(result.operator);  // "Vodacom"
console.log(result.formatted); // "+243824708027"
```

2. Validation en temps réel (Exemple)
```js
const input = document.getElementById('phone');

input.addEventListener('input', (e) => {
  const res = ValiNum.validateDRC(e.target.value);
  
  if (res.operator) {
    console.log("Opérateur détecté : " + res.operator);
  }
  
  if (res.isValid) {
    console.log("Numéro prêt à être envoyé !");
  } else {
    console.log(res.error); // Affiche "Numéro incomplet..." par exemple
  }
});
```

## 📊 Mapping des Opérateurs (RDC)
```plaintext
Opérateur  | Préfixes (NDC)
Vodacom    | "81, 82, 83"
Orange     | "80, 84, 85, 89"
Airtel     | "97, 98, 99"
Africell   | "90, 91"
```

## 🛠️ Développement
1 Clonez le projet : git clone https://github.com/fomadev/valinum.git

2 Installez les dépendances : npm install

3 Compilez le projet : npm run build

## 📄 Licence
Distribué sous la licence MIT. Voir <a href="LICENSE">LICENSE</a> pour plus d'informations.

## 🤝 Contribution
Les contributions pour ajouter d'autres pays (Congo-Brazza, Angola, etc.) sont les bienvenues ! Contactez fomadev sur GitHub.

### Pourquoi ce README est efficace ?
1.  **Badges** : Il montre tout de suite que le projet est sérieux (Licence, Version).
2.  **Tableau des opérateurs** : C'est une référence rapide pour les développeurs congolais.
3.  **Exemples clairs** : On comprend tout de suite comment l'intégrer, qu'on soit sur un vieux projet PHP ou une application React moderne.

### Dernière étape pour lancer votre projet :
Vous avez maintenant tous les fichiers :
1.  `.gitignore`
2.  `package.json`
3.  `tsconfig.json`
4.  `rollup.config.js`
5.  `src/types.ts`, `src/drc.ts`, `src/index.ts`
6.  `README.md`