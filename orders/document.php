<!-- HEADER, MENU, VARIABLES -->
<?php
	include "../constantsIRP.php";
	include "../head.php";
	include "../menu.php";
?>

<!-- ORDER EDIT CSS -->
<link rel="stylesheet" href="../assets/css/orderEdit/order-edit.css">
<!-- NOTIFICATIONS PACKAGE CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

<div class='page-container editPermitPopupContainer'>
    <div class="editPermitPopup">
        <?php
            include "../editPageMain.php";
        ?>
    </div>

    <!-- DOCUMENT STEP FORM -->
    <div class="editPermitPopup__document informationBlockContainer">

    </div>
</div>


<!-- FOOTER -->
<?php include "../footer.php" ?>

<!-- NOTIFICATIONS PACKAGE JS -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<!-- JQUERY JS-->
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
<!-- JQUERY INPUT MASK JS -->
<script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js"></script>
<!-- JQUERY VALIDATE JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.20.0/jquery.validate.min.js"></script>
<!-- EDIT FORM JS -->