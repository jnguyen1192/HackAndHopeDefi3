<?php
/*

	Save the pdf using a tmp image of the signature

*/

$data = $_POST['data']; // data retrieve from form
$school_input_form = $_POST['school'];
$city = $_POST['city'];
$data_suite = $_POST['data_suite'];
$director = $_POST['director'];

require('proto_fiche_sst_fpdf.php'); // Don't forget to add this file with the font directory

$tmp_sign_file = 'tmp_signature.png'; // name of the temporary image
$pdf_name = "test_php_image.pdf";


$data = substr($data,strpos($data,",")+1); // data transforming into correct format for encoding
$data = base64_decode($data);  // data encoding to png

file_put_contents($tmp_sign_file, $data); // create the image with the signature


$pdf = new proto_fiche_sst_PDF('P', 'mm', 'A4'); // prepare a document with portrait as orientation, mm as unit and A4 as dimensions
$pdf->AddPage(); // prepare a new page
$pdf->pdf_image("../fiche_sst_pages/fiche_sst_2014_protocole_sanitaire_non_respecte-1.png"); // add the fiche sst part 1 image

$pdf->school($school);
$pdf->city($city);
$pdf->AddPage(); // prepare a new page
$pdf->pdf_image("../fiche_sst_pages/fiche_sst_2014_protocole_sanitaire_non_respecte-2.png"); // add the fiche sst part 2 image
$pdf->AddPage(); // prepare a new page
$pdf->pdf_image("../fiche_sst_pages/fiche_sst_2014_protocole_sanitaire_non_respecte-3.png"); // add the fiche sst part 3 image
$pdf->AddPage(); // prepare a new page
$pdf->pdf_image("../fiche_sst_pages/fiche_sst_2014_protocole_sanitaire_non_respecte-4.png"); // add the fiche sst part 4 image

$pdf->suites_donnees($data_suite); // add the setence data suite
$pdf->directeur_trice($director); // add the director
$pdf->signature_directeur_trice_image($tmp_sign_file); // add signature from the temporary image

$pdf->Output('F', "../". $pdf_name, true); // create fiche sst pdf using previous form and signature

unlink($tmp_sign_file); // remove tmp file


?>