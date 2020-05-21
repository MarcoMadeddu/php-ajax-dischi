$(document).ready(function () {
    // ** V A R I A B I L I ** // 
    var list = $(".main-element");
    var input = $(".input");

    var source = $("#card-template").html();
    var template =Handlebars.compile(source);

    run(list , template);

    input.keypress(function(e){
        if(e.which==13){
            if(input.val()!== ""){
              resetList(list);  
              searchRun(list,template,input); 
            }else{
                alert("inserisci un valore");
            }
        }
    });
    
});// end document ready

//** F U N C T I O N S **//

//R U N 
function run(list , template){
    $.ajax({
        url: 'http://localhost:8888/php-ajax-dischi/dist/partials/db-json.php',
        method:'GET',
        success: function (data) {
           getResults(data , list , template); 
        },
        error: function(){
            console.log("errore chiamata api");
            
     }
    });
}

//R U N 
function searchRun(list , template, input){
    var value= input.val().trim();
    $.ajax({
        url: 'http://localhost:8888/php-ajax-dischi/dist/partials/db-json.php',
        method:'GET',
        data: {
            query: value,
        },
        success: function (data) {
           getResults(data , list , template); 
        },
        error: function(){
            console.log("errore chiamata api");
            
     }
    });
}

//G E T  R E S U L T S 
function getResults(data , list , template){
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
}

//R E S E T  L I S T 
function resetList(list){
    list.children().remove();
}

