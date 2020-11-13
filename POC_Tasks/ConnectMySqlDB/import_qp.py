import csv
import mysql.connector
from tqdm import tqdm


def main():
    mydb = mysql.connector.connect(host='localhost',  # enter the db host
                                   port='3306',  # enter the db port
                                   user='root',  # enter the db user
                                   passwd='root',  # enter the db password
                                   db='proto_qp')  # enter the db name
    cursor = mydb.cursor()  # open a connexion to the db
    with open('liste_quartiers_prioritairesville.csv', 'r') as file:  # open the file containing priority area list
        print("Priority Area List CSV opened")
        reader = csv.reader(file, delimiter=';')  # specify the delimiter between each columns on the file
        next(reader)
        for t_row in tqdm(reader, ascii=True, desc="Priority Area List CSV loading"):  # navigate into csv file and display a progress bar
            point = "ST_GeomFromText(%s, 4326)"  # define NULL value for the point
            geojson = "ST_GeomFromGeoJSON(%s)"  # define NULL value for the geojson
            if t_row[7] == "":  # case no point define
                process_point = 'POINT(0.0000 90.0000)'  # select north pole point
            else:
                process_point = 'POINT(' + str(t_row[7].split(',')[1]) + ' ' + str(t_row[7].split(',')[0]) + ')'  # build the point with correct lat lon
            if t_row[11] == "":  # case no polygon define
                t_row[11] = '{"type": "Polygon",' \
                            ' "coordinates": ' \
                            '[[[0.0000, 90.0000], [0.0000, 90.1000], ' \
                            '[0.1000, 90.1000], [0.0000, 90.0000]]]}'  # select north pole area

            cursor.execute("INSERT INTO `qp` (`code_quartier`, `num_dept`, `nom_dept`,"  # call function INSERT INTO on table qp in MySql
                           " `quartier_prioritaire`, `noms_des_communes_concernees`,"  # first columns of priority area list
                           " `nom_epci`, `nom_reg`, `geo_point_2d`, `commune_qp`,"  # second columns of priority area list
                           " `nom_qp`, `code_insee`, `geo_shape`, `nom_dep`)"  # third columns of priority area list
                           " VALUES (%s, %s, %s, %s, %s, %s, %s, " + point + ", %s, %s, %s, " + geojson + ", %s)",  # convert point and geojson in Geospatial format
                           (t_row[0], t_row[1], t_row[2], t_row[3], t_row[4], t_row[5], t_row[6], process_point,  # fufill the query with first columns of priority area list
                            t_row[8], t_row[9], t_row[10], t_row[11], t_row[12]), )  # fufill the query with second columns of priority area list
    mydb.commit()  # save the transaction
    cursor.close()  # close
    print("Priority Area List CSV loaded")
    print("Done")


if __name__ == '__main__':
    main()
