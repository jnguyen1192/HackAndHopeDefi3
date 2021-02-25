
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "liste_quartiers_prioritairesville.csv",
        dataType: "text",
        success: function(data) {processData(data);}
    });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
    for (var i=1; i<lines.length; i++) {
        var test = lines[i][11];
        console.log(typeof(test));
        console.log(lines[i]);
        if(test !== "") {
            newTemp = test.replace(/""/g, '"');
            var json_string = newTemp.slice(1, newTemp.length - 1)
            console.log(json_string);
            console.log(JSON.parse(json_string));
        }
    }
}
