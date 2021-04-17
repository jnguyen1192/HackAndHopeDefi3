
window.onload = function() {
  let link = document.createElement("link");
  link.href = "../css/test_iframe.css";     
  link.rel = "stylesheet"; 
  link.type = "text/css"; 
  frames[0].document.head.appendChild(link); // 0 is an index of your iframe 
}

$(document).ready(function(){
    $("#inlineFrameExample0").contents().find("li a").each(function() {
        $(this).on('click', function() {
            $("#inlineFrameExample0").contents().find("li a").each(function() {
                $(this).parent().attr("class","");
            });
            $(this).parent().attr("class","active");
        });

    });
    /*
      $('.nav nav-tabs ul li a', window.parent.document).on('click', function() {
        $('.nav nav-tabs ul li a', window.parent.document).attr("class","");
        $(this).attr("class","active");
        $($($(this).attr("id")).attr("class"), window.parent.document).attr("class","tab-pane");
        $($(this).attr("id"), window.parent.document).attr("class", "tab-pane active in");
      });*/
});