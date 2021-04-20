<?php

$content = file_get_contents($_GET['url']);
libxml_use_internal_errors(true);
$doc = new DOMDocument();
$doc->loadHtml($content);

$xpath = new DOMXpath($doc);
libxml_clear_errors();
$elements = $xpath->query('//*[@id="pgui-view-grid"]/div[count(preceding-sibling::*)=1]/div[count(preceding-sibling::*)=1]');

$domElemsToRemove = ''; // container of deleted elements
foreach ( $elements as $domElement ) {
    $domElemsToRemove .= $doc->saveHTML($domElement); // concat them
    $domElement->parentNode->removeChild($domElement); // then remove
}

//$form_div = explode("\n", trim(document.querySelector("#pgui-view-grid > div:nth-child(2)")))[0];

echo $domElemsToRemove;

 ?>