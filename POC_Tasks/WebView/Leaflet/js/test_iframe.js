
window.onload = function() {
    for(var i = 0; i < frames.length;i = i + 1) {
        let link = document.createElement("link");
        link.href = "../css/test_iframe.css";
        link.rel = "stylesheet";
        link.type = "text/css";
        [i].framesdocument.head.appendChild(link); // 0 is an index of your iframe
    }


    $(document).ready(function(){
        // tab link behavior
        $("#inlineFrameExample0").contents().find("li a").each(function() {
            $(this).on('click', function() {
                $("#inlineFrameExample0").contents().find("li a").each(function() {
                    $(this).parent().attr("class","");
                });
                $(this).parent().attr("class","active");
                $("#inlineFrameExample0").contents().find(".tab-pane").each(function() {
                    $(this).attr("class","tab-pane");
                });
                //console.log($(this).attr("href"));
                var id = $(this).attr("href");
                $("#inlineFrameExample0").contents().find(".tab-pane").each(function() {
                    //console.log($(this).attr("id"));
                    if(id == "#" + $(this).attr("id")) {
                        $(this).attr("class","tab-pane active in");
                    }
                });
                //$("div"+$(this).attr("href")).setAttribute("class", "tab-pane active in");


            });

        });
        // tab content behavior
        /*
          $('.nav nav-tabs ul li a', window.parent.document).on('click', function() {
            $('.nav nav-tabs ul li a', window.parent.document).attr("class","");
            $(this).attr("class","active");
            $($($(this).attr("id")).attr("class"), window.parent.document).attr("class","tab-pane");
            $($(this).attr("id"), window.parent.document).attr("class", "tab-pane active in");
          });*/
    });
}

    $(document).ready(function(){
        // tab link behavior
        $("#inlineFrameExample0").contents().find("li a").each(function() {
            $(this).on('click', function() {
                $("#inlineFrameExample0").contents().find("li a").each(function() {
                    $(this).parent().attr("class","");
                });
                $(this).parent().attr("class","active");
                $("#inlineFrameExample0").contents().find(".tab-pane").each(function() {
                    $(this).attr("class","tab-pane");
                });
                //console.log($(this).attr("href"));
                var id = $(this).attr("href");
                $("#inlineFrameExample0").contents().find(".tab-pane").each(function() {
                    //console.log($(this).attr("id"));
                    if(id == "#" + $(this).attr("id")) {
                        $(this).attr("class","tab-pane active in");
                    }
                });
                //$("div"+$(this).attr("href")).setAttribute("class", "tab-pane active in");


            });

        });
});