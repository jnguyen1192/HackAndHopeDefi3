
$(function () { // Function to use php script without loading page

  $('form').on('submit', function (e) { // select the form balise

    e.preventDefault(); // use default configuration of environment for IE

    $.ajax({ // use ajax which permits to send a php script without changing the current page
        url:'php/get_route.php', // use the script save.php when submitting the form
        type:'POST', // send data using POST request
        data:{ // the POST object
            school:$("#origin").val(), // the data of school as "school"
            city:$("#destination").val(), // the data of city as "city"
            /* TODO add other data form*/
        }
        ,
        success: function (data) {
          $('#wktStringTextArea').html(data);
    }
    });

  });

});
