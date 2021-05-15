#Pour changer le contenu de l'iframe
config.txt: changer le paramêtre link

js/ecole-marseille-pk.js: utiliser une autre clé à la ligne 106 (popupHTML.replace("{ecole_pk}",[...])

js/data/ecoles-marseille-audit.json.js: copier ce fichier et le renommer ecoles-marseille-audit-pk.json.js pour ajouter la clé qui sera utiliser pour récupérer le contenu de l'iframe à l'aide de son identifiant

css/test_iframe.css: changer le style de l'iframe

test_popup.html: tester rapidement le rendu de l'iframe

#Utiliser la base de données
index.html: mettre "db = true" au lieu de "db = false";

#Modifier l'affichage des marqueurs
ecoles-marseille-pk.js: modifier le contenu de Object.entries(jsonData.points).forEach(point => {})

#Modifier la requête
php/config.php: modifier la variable $sql

#Modifier les données des marqueurs en fonction de la requête
php/config.php: modifier la fonction extract_into_point_iframe()

