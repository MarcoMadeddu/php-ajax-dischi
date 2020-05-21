$(document).ready(function () {
    var list = $(".main-element");
    var source = $("#card-template").html();
    var template =Handlebars.compile(source);

   $.ajax({
       url: 'http://localhost:8888/php-ajax-dischi/dist/partials/db-json.php',
       method:'GET',
       success: function (data) {
           for(var i =0; i<data.length; i++){
               var current = data[i];
               var result={
                   poster: current.poster,
                   title: current.title,
                   author: current.author,
                   year: current.year,
               }
               var set= template(result);
               list.append(set);
           }
           
       },
       error: function(){
           console.log("errore chiamata api");
           
    }
   });
});

