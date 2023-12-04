<?php
	/**
	 * @var mysqli|bool $conn
	 * */
	require_once($_SERVER['DOCUMENT_ROOT'] . '/connection/maindbconn.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
	use DevKraken\CookieDecryption;
	$agent_Name = new CookieDecryption($_COOKIE['__auth']);
	
	use DevKraken\AccessGrant;
	use DevKraken\HeaderMenuDropDown;
	use DevKraken\LoginFMCSA;
	
	$resultB = new HeaderMenuDropDown();
	$access = new AccessGrant();
	$fmcsaLoginAccess = new LoginFMCSA();
//	$fmcsaLoginAccess::FMCSA_AccessHandler('irpNew');  // **********************Error
	$rowUSER = $fmcsaLoginAccess->getLoggedUser();
	
	// if (!isset($_COOKIE['tokenApi'])){
	// 	$login = Auth::getInstance();
	// 	$token = $login->getToken();
	// 	$login->setCookiApiToken();
	// }
?>


<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">

<!-- Logo -->
<link rel="shortcut icon" href="<?= returnServerName() ?>/irpNew/assets/images/logo/logoShort.png" style="width: 30px;height: 30px"/>


<!-- CONNECT `Font-Awesome` node_modules LINK-->
<link rel="stylesheet" type="text/css" href="<?= returnServerName() ?>/node_modules/@fortawesome/fontawesome-free/css/all.css?rnd=1">

<!-- CONNECT `bootstrap` node_modules LINK-->
<link rel="stylesheet" href="<?= returnServerName() ?>/node_modules/bootstrap/dist/css/bootstrap.min.css">

<!-- CONNECT `datatables` node_modules LINK-->
<link rel="stylesheet" type="text/css" href="<?= returnServerName() ?>/node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css">

<!-- CONNECT `jquery-ui` node_modules LINK-->
<link rel="stylesheet" href="<?= returnServerName() ?>/node_modules/jquery-ui-dist/jquery-ui.css">

<!-- MDB -->
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPonlineformMenu.css?rnd=1">
<link rel="stylesheet" href="<?= returnServerName() ?>/node_modules/mdb-ui-kit/css/mdb.min.css">

<!-- CONNECT `toastr` node_modules LINK -->
<link rel="stylesheet" type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

<!-- Custom Css -->
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRP-welcome.css">

<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPonlineform.css?v=0.6">
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPonlineformPermits.css"/>
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPonlineformDetails.css"/>
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPglobals.css"/>
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPtable.css"/>
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/voidRefund.css"/>
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPform.css?v=0.6">
<link rel="stylesheet" href="<?= returnServerName() ?>/irpNew/assets/css/IRPonlineformClients.css"/>

<!-- CONNECT JS -->

<script src="<?= returnServerName() ?>/node_modules/jquery/dist/jquery.min.js"></script>
<script src="<?= returnServerName() ?>/node_modules/jquery-ui-dist/jquery-ui.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.js"></script>
<script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"> </script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>


