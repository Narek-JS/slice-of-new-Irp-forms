<?php
	include "constantsIRP.php";
	require_once("menu.php");
	global $rowUSER;
	$authName = $rowUSER['username'];
?>

<title><?= TITLE_INDEX ?></title>

<section>
    <div class="welcomeBanner">
        <div class="container">
            <div>
                <!--                <lottie-player src="https://lottie.host/b965a7a0-8afe-4563-991e-655ae18a6403/SoL8zMKFah.json"-->
                <!--                               id="lottie-track-animation"-->
                <!--                               background="transparent" speed="1" loop-->
                <!--                               autoplay></lottie-player>-->
                <div id="lottie-track-animation"></div>

            </div>
            <div class="asideRight">
                <div class="txtsContent">
                    <h2>Welcome <span class="authName"><?= $authName ?></span> <span>Jan</span> !</h2>
                    <p>
                        Utilizing this system will streamline your order tracking process and provide convenient access
                        to
                        customer-submitted orders and reports.
                    </p>
                </div>
                <div class="btnsContent">
                    <a href="<?= returnServerName() ?>/irpNew/orders/permit.php">
                        All Permits
                    </a>
					<?php if ($rowUSER["userrole"] == 'admin') { ?>
                        <div>
                            <a href="/irpNew/reports" class="darkBtn">
                                Reports
                            </a>
                        </div>
					<?php } ?>
                </div>
            </div>
        </div>
    </div>
</section>


<script src="<?= returnServerName() ?>/node_modules/@lottiefiles/lottie-player/dist/lottie-player.js"></script>

<script>

    let trackAnimation = bodymovin.loadAnimation({
        container: document.getElementById("lottie-track-animation"),
        path: 'https://lottie.host/e0f67f3b-66dd-4103-a9a8-125c65429411/Nz2V15PrUr.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: 'demo animation',
    });
</script>