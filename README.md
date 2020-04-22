

Lettreinfo2
==============================

Lettreinfo2 est un logiciel qui permet de supprimer les trackers d’une lettre réalisée avec Mailchimp et d’en préparer l’envoi.



## Usage

1. Ouvrir l’application par un double clic.
2. Cliquer sur `Parcourir` et sélectionner le fichier HTML récupéré de Mailchimp.
3. Cliquer sur `Convertir`
4. Dans la partie gauche de la fenêtre le code de la lettre s’affiche. On peut le copier dans le presse-papier en utilisant le bouton `Copier`.
5. Un fichier `lettreexport.html` contenant la lettre modifiée est créé sur le bureau.

## Construction de l’application

L’application est construite en JS avec le framework Electron.

- installer une version de node.js 
- installer le framework Electron
- pour produire un exécutable, installer tous les modules avec `npm install` à la racine du projet.

Pour construire les exécutables, utiliser `npm run dist`. La commande est produite dans le fichier package.json. Options importantes : -l -m -w construisent pour linux, mac, windows respectivement.



## Particularité de Thunderbird



Par défaut, Thunderbird produit parfois un e-mail plus lourd en encodant le HTML inséré en base64, ce qui conduit à accroître la taille du message de 25 à 30%.

Pour corriger ce problème, il faut modifier l’option de configuration de Thunderbird : `mail.strictly_mime` en lui donnant la valeur `true`.