"""
Plan d'attaque:
I) Croiser les données avec les données actuelles
    1) Utiliser les données de ecoles-marseille.json
    2) Utiliser les données de marseille_audit_ecoles.csv
    3) Fusionner les données
    4) Ajouter le nouvelle données au nouveau fichier ecoles-marseille-audit.json
II) Trouver un pattern pour chaque type:
    1) X_Synthese_Y.pdf avec X un nombre et Y le nom de la synthèse, extraire la page 2
    2) X_Y.zip avec X le code postale et Y le nom du document, c'est les détails des synthèses:
        a) X-nom_GrilleDiag_y avec X un nombre, nom le nom de l'entité et Y une lettre, un tableau à extraire
        b) IX-Y_nom_GrilleDiag_Z avec X un nombre, Y un code, nom le nom de l'entité et Z une lettre, un tableau à extraire
    3) rapport_X-nom avec X un nombre, nom le nom de l'entité, fichier à garder

II)
Tabula NOK
Camelot NOK
pdfminer
"""
# I
print("I")
# 1) get lat long from ecole-marseille.json.js
import json
json_list = []
file_name = '../data/ecoles-marseille.json'
with open(file_name) as f:
    data = json.load(f)
for point in data['points']:
    #print(point)
    obj = (point['ecole_RNE'], point['ecole_lat'][:6], point['ecole_long'][:5])
    #print(obj)
    json_list.append(obj)
# 2) get lat long from marseille_audit_ecoles.csv
print("II")
file_name = "../data/marseille_audit_ecoles.csv"
import csv
csv_list = []
with open(file_name, newline='') as csvfile:
    school_audit_reader = csv.reader(csvfile, delimiter=',')
    beg = True
    num_link = 0
    for row in list(school_audit_reader)[1:]:
        obj = (row[0], row[6][:6], row[5][:5], row[7], row[9])
        #print(obj)
        csv_list.append(obj)
        # credit % 120
# 3) merge data
new_list = []
for school in json_list:
    # create links for each school
    new_str = ""
    for point in csv_list:
        if school[1] == point[1] and school[2] == point[2]:
            new_str += "<a class='link_audit' target='_blank' href='"+ point[4] +"'><span class='link_audit_span'>"+ point[3] + "</a>"
    if new_str == "":
        new_str = "En attente d'audit"
    obj = (school[0], new_str)
    new_list.append(obj)

#print(new_list)
#print(len(new_list))
for point in data['points']:
    # add links in previous json file
    for new_point in new_list:
        if point['ecole_RNE'] == new_point[0]:
            point['LIENS'] = new_point[1]

"""
file_name = '../data/ecoles-marseille.json'
with open(file_name) as f:
    data = json.load(f)
    for point in data['points']:
        point[]
"""
# 4) create new file with new json properties as links
file_name = '../data/ecoles-marseille-audit.json'  # TODO AUTOREFRESH json.js file
with open(file_name, 'w') as outfile:
    json.dump(data, outfile)
src = open(file_name, "r")
fline = "var donnees = "    #Prepending string
oline = src.readlines()
oline.insert(0, fline) #Here, we prepend the string we want at the begining
src.close()
print(oline)
file_name = '../js/ecoles-marseille-audit.json.js'
src = open(file_name, "w") #We again open the file in WRITE mode
src.writelines(oline)
src.close()
# II
import camelot

#file = "https://github.com/jnguyen1192/HackAndHopeDefi3/raw/main/POC_Tasks/WebView/Leaflet/python/marseille_audit/231_Synthese_gymnase_Bouge.pdf"#os.path.join(os.getcwd(), "marseille_audit", "231_Synthese_gymnase_Bouge.pdf")
#print(file)
"""
file = "marseille_audit/231_Synthese_gymnase_Bouge.pdf"
#tables = camelot.read_pdf(file, pages = "1-end")

import tabula
tables = tabula.read_pdf(file, pages="all", multiple_tables=True)
print(tables)
tabula.convert_into_by_batch("marseille_audit_csv", output_format="csv", pages = "all")


"""