#Modifier le contenu de l'iframe
config.txt: changer le paramêtre link

js/ecole-marseille-pk.js: utiliser une autre clé à la ligne 106 (popupHTML.replace("{ecole_pk}",[...])

js/data/ecoles-marseille-audit.json.js: copier ce fichier et le renommer ecoles-marseille-audit-pk.json.js pour ajouter la clé qui sera utiliser pour récupérer le contenu de l'iframe à l'aide de son identifiant

css/test_iframe.css: changer le style de l'iframe

test_popup.html: tester rapidement le rendu de l'iframe

#Utiliser la base de données
index.html: mettre "db = true" au lieu de "db = false";

#Modifier l'affichage des marqueurs
ecoles-marseille-pk.js: modifier le contenu de Object.entries(jsonData.points).forEach(point => {})

#Modifier la requête nous donnant les points de la carte
php/config.php: modifier la variable $sql

#Modifier les données des marqueurs en fonction de la requête
php/config.php: modifier la fonction extract_into_point_iframe()

#Modifier la légende
js/legend.js: modifier la fonction createLegend()

#Modifier les paramêtres de la carte (fond, zoom, ...)
js/class/mapBuilder.js: modifier la fonction create() de la classe MapBuilder

#Modifier le popup
popup.html: changer le contenu, {ecole_pk} représente la clé utilisé pour chaque point et {link} représente l'URL vers le contenu à récupérer

js/ecoles-marseille-pk: si de nouveaux paramètres doivent être utilisés, ajouter ".replace("{new_parametre}",new_value) à "popup = popupHTML."

css/style.css: changer les classes .leaflet-popup