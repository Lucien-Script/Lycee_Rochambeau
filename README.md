# Association des Anciens Élèves - Lycée Rochambeau

## Déploiement du Site Web

### Option 1: GitHub Pages (Gratuit)

1. Créez un compte GitHub si vous n'en avez pas déjà un sur [github.com](https://github.com)

2. Créez un nouveau repository:
   - Allez sur GitHub.com
   - Cliquez sur le bouton "+" en haut à droite
   - Sélectionnez "New repository"
   - Nommez-le `rochambeau-alumni`
   - Laissez-le en "Public"
   - Cliquez sur "Create repository"

3. Uploadez les fichiers:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/rochambeau-alumni.git
   git push -u origin main
   ```

4. Activez GitHub Pages:
   - Allez dans les "Settings" du repository
   - Naviguez jusqu'à "Pages" dans le menu de gauche
   - Dans "Source", sélectionnez "main" comme branche
   - Cliquez "Save"
   - Votre site sera disponible à: `https://VOTRE-USERNAME.github.io/rochambeau-alumni`

### Option 2: Hébergement Web Traditionnel

Si vous préférez un nom de domaine personnalisé (ex: www.alumni-rochambeau.org):

1. Achetez un nom de domaine chez un registrar (ex: OVH, Gandi, Namecheap)

2. Choisissez un hébergeur web (recommandés):
   - OVH (France)
   - Gandi (France)
   - Netlify (International)
   - Vercel (International)

3. Uploadez les fichiers via FTP ou le panneau de contrôle de l'hébergeur

4. Configurez votre nom de domaine pour pointer vers votre hébergement

### Maintenance

Pour mettre à jour le site:
1. Modifiez les fichiers localement
2. Si vous utilisez GitHub Pages:
   ```bash
   git add .
   git commit -m "Description des changements"
   git push
   ```
3. Si vous utilisez un hébergeur traditionnel:
   - Uploadez les fichiers modifiés via FTP

### Structure des Fichiers

```
rochambeau-alumni/
├── index.html
├── styles.css
├── script.js
└── README.md
