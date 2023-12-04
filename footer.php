<!-- Custom JS -->
<?php
	class Menus2290 {
		const ORDERS = 'permit';
		const CLIENTS = 'clients';
		const REPORTS = 'reports';
		const REPORTS_LIST = 'list';
		const POST = 'post';
		const SERVICES = 'services';
		const MESSAGE_TEMPLATES = 'messageTemplates';
		const TRUCK = 'truck';
	}
	$menuItem = basename($_SERVER['REQUEST_URI']);
?>
<?php if(strpos($menuItem, Menus2290::TRUCK)) :?>
	
	<?php //elseif():?>

<?php endif;?>
<script src="<?= returnServerName() ?>/irpNew/env.js"></script>
<script src="<?= returnServerName() ?>/irpNew/assets/js/voidRefund.js"></script>
<script src="<?= returnServerName() ?>/irpNew/assets/js/router.js"></script>
<script src="<?= returnServerName() ?>/irpNew/assets/js/details.js"></script>
<script src="<?= returnServerName() ?>/irpNew/assets/js/posts.js"></script>
<script src="<?= returnServerName() ?>/irpNew/assets/js/dataTables.js"></script>
<script src="<?= returnServerName() ?>/irpNew/assets/js/clients.js"></script>


<script src="<?= returnServerName() ?>/node_modules/mdb-ui-kit/js/mdb.min.js"></script>

<!-- CONNECT `bootstrap` node_modules LINK-->
<script src="<?= returnServerName() ?>/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

<!-- CONNECT `datatables` node_modules LINK-->
<script src="<?= returnServerName() ?>/node_modules/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="<?= returnServerName() ?>/node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
