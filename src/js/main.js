$(document).ready(function () {
    // ** V A R I A B I L I ** // 
    var list = $(".main-element");
    var input = $(".input");
    var status = false;
    var result = $(".result");
    var home = $("#home");

    var source = $("#card-template").html();
    var template =Handlebars.compile(source);

    run(list , template,status);

    input.keypress(function(e){
        if(e.which==13){
            if(input.val()!== ""){
              status = true;
              resetList(list);  
              searchRun(list,template,input,status,result);; 
            }else{
                resetList(list);
                result.text("Inserisci un valore");
                status = false;
            }
        }
    });

    home.click(function(){
        resetList(list);
        run(list , template,status);
    })
    
});// end document ready

//** F U N C T I O N S **//

//R U N 
function run(list , template,status){
    $.ajax({
        url: 'http://localhost:8888/php-ajax-dischi/dist/partials/db-json.php',
        method:'GET',
        success: function (data) {
           getResults(data , list , template,status); 
        },
        error: function(){
            console.log("errore chiamata api");
     }
    });
}

//S E A R C H  R U N 
function searchRun(list , template, input,status,text){
    var value= input.val().trim().toLowerCase();
    $.ajax({
        url: 'http://localhost:8888/php-ajax-dischi/dist/partials/db-json.php',
        method:'GET',
        success: function (data) {
           getResults(data , list , template,value,status,text); 
        },
        error: function(){
            console.log("errore chiamata api");
            
     }
    });
}

//G E T  R E S U L T S 
function getResults(data , list , template, value,status,text){
    if(status){
        text.text("nessun risultato per:" +value);
        for(var i =0; i<data.length; i++){
            if(value == data[i].author.toLowerCase()){
                var current = data[i];
            var result={
                poster: current.poster,
                title: current.title,
                author: current.author,
                year: current.year,
            };
            text.text("I tuoi risultati per: " + value);
            append(result, list,template);
            }
        }

    }else{
        for(var i =0; i<data.length; i++){
            var current = data[i];
            var result={
                poster: current.poster,
                title: current.title,
                author: current.author,
                year: current.year,
            };
            append(result, list,template);
        }
    }
}

//R E S E T  L I S T 
function resetList(list){
    list.children().remove();
}

//A P P E N D
function append(result, list , template){
    var set= template(result);
        list.append(set);
}

