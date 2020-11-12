import csv
import mysql.connector

print("Before connection")
mydb = mysql.connector.connect(host='localhost',
                       port='3306',
    user='root',
    passwd='root',
    db='proto_qp')
cursor = mydb.cursor()

print("Before read")
with open('liste_quartiers_prioritairesville.csv', 'r') as file:
    reader = csv.reader(file, delimiter=';')
    next(reader)
    for row in reader:
        print(len(row), row)
        t_row = tuple(row)
        #cursor.execute('SET @json = %s', row)
        point = '\'Point('+ t_row[7].split(",")[0]+' '+t_row[7].split(",")[1]+')\''

        print((t_row[0], t_row[1], t_row[2], t_row[3], t_row[4], t_row[5], t_row[6], point, t_row[8], t_row[9], t_row[10], t_row[11], t_row[12]))
        cursor.execute("INSERT INTO `qp` (`code_quartier`, `num_dept`, `nom_dept`,"
                       " `quartier_prioritaire`, `noms_des_communes_concernees`,"
                       " `nom_epci`, `nom_reg`, `geo_point_2d`, `commune_qp`,"
                       " `nom_qp`, `code_insee`, `geo_shape`, `nom_dep`)"
                       " VALUES (%s, %s, %s, %s, %s, %s, %s, ST_GeomFromText(%s), %s, %s, %s, ST_GeomFromGeoJSON(%s), %s)",
                       (t_row[0], t_row[1], t_row[2], t_row[3], t_row[4], t_row[5], t_row[6], point, t_row[8], t_row[9], t_row[10], t_row[11], t_row[12]), )
#close the connection to the database.
#mydb.commit()
cursor.close()
print("Done")