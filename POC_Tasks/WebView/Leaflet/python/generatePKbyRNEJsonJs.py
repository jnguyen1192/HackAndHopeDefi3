import csv, json

csvFile = "../data/ecole.php.phpmygenerator_to_csv.csv"
jsonFile = "../data/ecoles-marseille-audit.json"
jsonJsFile = "../js/data/ecoles-marseille-audit.json.js"
outputJsonFile = "../data/ecoles-marseille-audit-pk.json"
outputJsonJsFile = "../js/data/ecoles-marseille-audit-pk.json.js"


# 1) get list of code rne/pk
tuples_code_rne_pk = []
with open(csvFile) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:
        tuples_code_rne_pk.append((row['Code RNE'], int(row['#']) + 1))
#print(tuples_code_rne_pk)
# 2) Get points from json and add pk
jsonDict = {}
with open(jsonFile) as jsonFile:
    print(jsonFile)
    jsonDict = json.loads(jsonFile.read())
    #print(jsonDict)
    for row in jsonDict['points']:
        for code_rne, pk in tuples_code_rne_pk:
            if code_rne == row['ecole_RNE']:
                row['pk'] = pk
                break
        #print(row)

    print(jsonDict)
# 3) Write on Json file
with open(outputJsonFile, 'w') as outfile:
    json.dump(jsonDict, outfile)
# 4) Write on Json JS file
begin_file = """var donnees;
if (db) {
    donnees = getJsonFromDB()();
}
else {
    donnees = """    #Prepending string
end_file = """
}
"""
with open(outputJsonJsFile, 'w') as outfile:
    outfile.write(begin_file)
    json.dump(jsonDict, outfile)
    outfile.write(end_file)
