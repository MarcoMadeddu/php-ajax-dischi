<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotify with php</title>
     <!-- M A I N  C S S -->
     <link rel="stylesheet" href="dist/css/main.css">
     
</head>
<body>
    <div class="app">
        <header>
            <div class="header-element">
                <img src="dist/img/logo-small.svg" alt="">
            </div>
        </header>

        <main>
            <div class="main-element">
                
            </div>
        </main>

    </div>


    <script id="card-template" type="text/x-handlebars-template">
     <div class="card">
        <img src="{{poster}}" alt="we">
        <h2>{{title}}</h2>
        <h3>{{author}}</h3>
        <h3>{{year}}</h3>
     </div>
    </script>






    <!-- J  Q U E R Y -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- H A N D L E B A R S -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js"></script>
    <!-- J A V A  S C R I P T -->
     <script src="dist/js/main.js"></script>
</body>
</html>