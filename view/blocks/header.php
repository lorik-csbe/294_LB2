<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop</title>
    <script defer src="controller/index-controller.js"></script>
    <link rel="stylesheet" href="view/stylesheets/style.css">
    <script defer src="controller/auth-controller.js"></script>
    <script defer src="controller/header-controller.js"></script>
    <script defer src="controller/login-controller.js"></script>
    <script defer src="controller/products-controller.js"></script>
    <script defer src="controller/create-product-controller.js"></script>
    <script defer src="controller/product-detail-controller.js"></script>
    <link href="CROS/cros.php">

</head>



<header>
    <div class="logo">
        <h1>Shop</h1>
    </div>

    <nav class="nav">
        <li><a href="/index.php">Startseite</a></li>
        <li><a href="/products.php">Produkte</a></li>
    </nav>

    <div class="user-menu">
        <a id="login" href="/login.php">Login</a>

        <button id="logout">Logout</button>

        <img src="view/images/user-symbol.svg" alt="User" id="user-symbol">
    </div>



</header>