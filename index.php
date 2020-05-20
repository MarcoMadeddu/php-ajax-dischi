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
                <?php include_once __DIR__ . '/dist/partials/database.php' ?>

                <?php foreach($database as $data) {?>
                    <div class="card">
                    <img src="<?php echo $data['poster']; ?>" alt="we">
                    <h2><?php echo$data['title']; ?></h2>
                    <h3><?php echo$data['author']; ?></h3>
                    <h3><?php echo$data['year']; ?></h3>
                    </div>
                    

                <?php } ?>
            </div>
        </main>

    </div>








     <!-- J A V A  S C R I P T -->
     <script src="dist/js/main.js"></script>
</body>
</html>