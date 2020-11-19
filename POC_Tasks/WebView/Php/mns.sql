CREATE TABLE `proto_qp`.`mns` (`Nom du site` VARCHAR(3000) NOT NULL , `Categorie` VARCHAR(1000) NOT NULL , `Adresse 1` VARCHAR(3000), `Adresse 2` VARCHAR(3000) ,`Code Postal` VARCHAR(1000), `Ville` VARCHAR(1000), `Numero de telephone` VARCHAR(1000), `Email` VARCHAR(3000) , `geo_point_2d` POINT) ENGINE = MyISAM;


--Nom du site;Categorie;Adresse 1;Adresse 2;Code Postal;Ville;Numero de telephone;Email;Longitude;Latitude
--"Nom du site" => "Ecole Bergers", "Categorie" => "Ecoles maternelles", "Adresse 1" => "11 rue Perrin Solliers", "Adresse 2" => "", "Code Postal" => "13006", "Ville" => "Marseille", "Numero de telephone" => "04 91 47 63 62", "Email" => "ecole.mat.bergers@cime.org", "longitude" => "5.38485384024201", "latitude" => "43.2909458085538"
--Ecole Bergers;Ecoles maternelles;11 rue Perrin Solliers;;13006;Marseille;04 91 47 63 62;ecole.mat.bergers@cime.org;5.38485384024201;43.2909458085538
