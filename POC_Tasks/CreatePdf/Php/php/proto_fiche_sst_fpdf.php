<?php

require('fpdf.php'); // Don't forget to add this file with the font directory

class proto_fiche_sst_PDF extends FPDF // TODO for each pdf we want to create we need to change this file
{
    # Image to PDF

    function pdf_image($name)  # crée une image qui prend toute la page A4
    {
        $this->Image($name, 0, 0, 210, 297);
    }

    function school($school_name)  # Remplir le nom de l'école du formulaire SST page 1
    {
        $this->SetXY(47, 15);
        $this->SetFont('Times', '', 12); // Don't forget the font directory
        $this->MultiCell(0, 0, $school_name);
    }

    function city($city)  # Remplir la ville du formulaire SST page 1
    {
        $this->SetXY(25, 30);
        $this->SetFont('Times', '', 12);
        $this->MultiCell(0, 0, $city);
    }

    function suites_donnees($suites_donnees)  # Remplir la suite données du formulaire SST page 4
    {
        $this->SetXY(52, 52);
        $this->SetFont('Times', '', 12);
        $this->MultiCell(144, intval(strlen($suites_donnees) / 36), $suites_donnees, '', 'LT', 0);
    }

    function directeur_trice($directeur_trice)  # Remplir le nom du directeur_trice du formulaire SST page 4
    {
        $this->SetXY(66, 147);
        $this->SetFont('Times', '', 12);
        $this->MultiCell(0, 10, $directeur_trice);
    }

    function signature_directeur_trice_image($name)  # Signer à partir d'une image donnée le formulaire SST page 4
    {
    	$this->Image($name, 60, 155, 20, 30);
	}
	/* TODO Other span to complete*/
}


?>