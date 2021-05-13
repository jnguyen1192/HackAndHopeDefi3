<?php

$content = file_get_contents($_GET['url']);
libxml_use_internal_errors(true); // hide warning
$doc = new DOMDocument();
$doc->loadHtml($content);

$xpath = new DOMXpath($doc);
libxml_clear_errors(); // hide warning
$elements = $xpath->query('//*[@id="pgui-view-grid"]/div[count(preceding-sibling::*)=1]/div[count(preceding-sibling::*)=1]'); // https://css-selector-to-xpath.appspot.com/

$domElemsToRemove = ''; // container of deleted elements
foreach ( $elements as $domElement ) {
    $domElemsToRemove .= $doc->saveHTML($domElement); // concat them
    $domElement->parentNode->removeChild($domElement); // then remove
}

//$form_div = explode("\n", trim(document.querySelector("#pgui-view-grid > div:nth-child(2)")))[0];
echo '<link href="../css/test_iframe.css" rel="stylesheet" type="text/css">';
echo $domElemsToRemove;
echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>
//console.log($(".row"));
$(".row").contents().find("li a").each(function() {
            $(this).on("click", function() {
                $(".row").contents().find("li a").each(function() {
                    $(this).parent().attr("class","");
                });
                $(this).parent().attr("class","active");
                $(".row").contents().find(".tab-pane").each(function() {
                    $(this).attr("class","tab-pane");
                });
                //console.log($(this).attr("href"));
                var id = $(this).attr("href");
                $(".row").contents().find(".tab-pane").each(function() {
                    //console.log($(this).attr("id"));
                    if(id == "#" + $(this).attr("id")) {
                        $(this).attr("class","tab-pane active in");
                    }
                });
                //$("div"+$(this).attr("href")).setAttribute("class", "tab-pane active in");


            });

        });</script>'

 ?>