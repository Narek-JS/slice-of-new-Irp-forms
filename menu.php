<?php
	global $rowUSER;
	
	require_once ('head.php');
	
	use DevKraken\HeaderMenuDropDown;
	
	$result = new HeaderMenuDropDown();
	
	?>
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
	<div class="container">
		<a class="navbar-brand" href="/2290onlineform/">
			<img src="/irpNew/assets/images/logo.png"/>
		</a>
		<?= businessDropdownList($result) ?>
		
		<div class="collapse navbar-collapse " id="navbarResponsive">
			<ul class="navbar-nav ms-auto">
				<!--    /*** END `Orders` BLOCK**/   -->
				<li class="nav-item <?= $rowUSER["userrole"] === 'content_writer' ? 'd-none' : '' ?>">
					<a class="nav-link <?= checkMenuActivity(['permit.php','/2290onlineform/orders/permit.php','/2290onlineform/orders/permit']) ?> " id="ordersButton"
					   href="<?= returnServerName() ?>/2290onlineform/orders/permit.php">
						<i class="bi bi-files">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
							     class="bi bi-files" viewBox="0 0 16 16">
								<path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
							</svg>
						</i>
						Orders
					</a>
				</li>
				<!--    /*** END `Orders` BLOCK**/   -->
				
				<!--    /*** START `Clients` BLOCK**/   -->
				<li class="nav-item <?= $rowUSER["userrole"] === 'content_writer' ? 'd-none' : '' ?>">
					<a class="nav-link <?= checkMenuActivity(['/2290onlineform/clients/','/2290onlineform/clients', 'orders.php', 'businesses.php']) ?> " id="clientsButton"
					   href="/2290onlineform/clients">
						<i class="bi bi-person-check-fill">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
								<path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
							</svg>
						</i>
						Clients
					</a>
				</li>
				<!--    /*** END `Clients` BLOCK**/   -->
				
				<!--    /*** START `Clients` BLOCK**/   -->
				<li class="nav-item <?= $rowUSER["userrole"] === 'content_writer' ? 'd-none' : '' ?>">
					<a class="nav-link <?= checkMenuActivity(['/2290onlineform/reports', '/2290onlineform/reports/', 'list.php']) ?>"
					   href="/2290onlineform/reports">
						<i class="fas fa-chart-bar"></i>
						Reports
					</a>
				</li>
				<!--    /*** END `Clients` BLOCK**/   -->
				
				<li class="nav-item">
					<a class="nav-link <?= checkMenuActivity(['/2290onlineform/posts', '/2290onlineform/posts/', '/2290onlineform/posts/post', '/2290onlineform/posts/post/']) ?> " id="postsButton"
					   href="<?= returnServerName() ?>/2290onlineform/posts">
						<i class="bi bi-files">
							<svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M27.4944 7H26.0056C26.0041 7 26.0027 7.00059 26.0016 7.00165C26.0006 7.0027 26 7.00413 26 7.00562V26C26 26.5304 26.2107 27.0391 26.5858 27.4142C26.9609 27.7893 27.4696 28 28 28C28.5304 28 29.0391 27.7893 29.4142 27.4142C29.7893 27.0391 30 26.5304 30 26V9.50562C30 8.84109 29.736 8.20378 29.2661 7.73388C28.7962 7.26398 28.1589 7 27.4944 7Z" fill="#707070"/>
								<path d="M24 26V4.5C24 4.1717 23.9353 3.84661 23.8097 3.54329C23.6841 3.23998 23.4999 2.96438 23.2678 2.73223C23.0356 2.50009 22.76 2.31594 22.4567 2.1903C22.1534 2.06466 21.8283 2 21.5 2H4.5C3.83696 2 3.20107 2.26339 2.73223 2.73223C2.26339 3.20107 2 3.83696 2 4.5V26.5C2 27.4283 2.36875 28.3185 3.02513 28.9749C3.6815 29.6313 4.57174 30 5.5 30H26.9281C26.9376 30.0001 26.947 29.9983 26.9557 29.9947C26.9645 29.9911 26.9724 29.9858 26.9791 29.9791C26.9858 29.9724 26.9911 29.9645 26.9947 29.9557C26.9983 29.947 27.0001 29.9376 27 29.9281C27 29.9124 26.9947 29.8972 26.9851 29.8847C26.9755 29.8723 26.9621 29.8634 26.9469 29.8594C26.101 29.6273 25.3546 29.1241 24.8222 28.4269C24.2899 27.7298 24.001 26.8772 24 26ZM6 8C6 7.73478 6.10536 7.48043 6.29289 7.29289C6.48043 7.10536 6.73478 7 7 7H11C11.2652 7 11.5196 7.10536 11.7071 7.29289C11.8946 7.48043 12 7.73478 12 8V12C12 12.2652 11.8946 12.5196 11.7071 12.7071C11.5196 12.8946 11.2652 13 11 13H7C6.73478 13 6.48043 12.8946 6.29289 12.7071C6.10536 12.5196 6 12.2652 6 12V8ZM19 25H7.02812C6.49 25 6.02812 24.5862 6.00125 24.0481C5.99474 23.9129 6.01574 23.7778 6.06299 23.6509C6.11024 23.5241 6.18276 23.4081 6.27614 23.3102C6.36952 23.2122 6.48183 23.1341 6.60625 23.0808C6.73068 23.0275 6.86463 23 7 23H18.9719C19.51 23 19.9719 23.4138 19.9988 23.9519C20.0053 24.0871 19.9843 24.2222 19.937 24.3491C19.8898 24.4759 19.8172 24.5919 19.7239 24.6898C19.6305 24.7878 19.5182 24.8659 19.3937 24.9192C19.2693 24.9725 19.1354 25 19 25ZM19 21H7.02812C6.49 21 6.02812 20.5862 6.00125 20.0481C5.99474 19.9129 6.01574 19.7778 6.06299 19.6509C6.11024 19.5241 6.18276 19.4081 6.27614 19.3102C6.36952 19.2122 6.48183 19.1341 6.60625 19.0808C6.73068 19.0275 6.86463 19 7 19H18.9719C19.51 19 19.9719 19.4138 19.9988 19.9519C20.0053 20.0871 19.9843 20.2222 19.937 20.3491C19.8898 20.4759 19.8172 20.5919 19.7239 20.6898C19.6305 20.7878 19.5182 20.8659 19.3937 20.9192C19.2693 20.9725 19.1354 21 19 21ZM19 17H7.02812C6.49 17 6.02812 16.5862 6.00125 16.0481C5.99474 15.9129 6.01574 15.7778 6.06299 15.6509C6.11024 15.5241 6.18276 15.4081 6.27614 15.3102C6.36952 15.2122 6.48183 15.1341 6.60625 15.0808C6.73068 15.0275 6.86463 15 7 15H18.9719C19.51 15 19.9719 15.4137 19.9988 15.9519C20.0053 16.0871 19.9843 16.2222 19.937 16.3491C19.8898 16.4759 19.8172 16.5919 19.7239 16.6898C19.6305 16.7878 19.5182 16.8659 19.3937 16.9192C19.2693 16.9725 19.1354 17 19 17ZM19 13H15.0281C14.49 13 14.0281 12.5863 14.0013 12.0481C13.9947 11.9129 14.0157 11.7778 14.063 11.6509C14.1102 11.5241 14.1828 11.4081 14.2761 11.3102C14.3695 11.2122 14.4818 11.1341 14.6063 11.0808C14.7307 11.0275 14.8646 11 15 11H18.9719C19.51 11 19.9719 11.4137 19.9988 11.9519C20.0053 12.0871 19.9843 12.2222 19.937 12.3491C19.8898 12.4759 19.8172 12.5919 19.7239 12.6898C19.6305 12.7878 19.5182 12.8659 19.3937 12.9192C19.2693 12.9725 19.1354 13 19 13ZM19 9H15.0281C14.49 9 14.0281 8.58625 14.0013 8.04813C13.9947 7.91292 14.0157 7.77779 14.063 7.65094C14.1102 7.52409 14.1828 7.40815 14.2761 7.31015C14.3695 7.21215 14.4818 7.13413 14.6063 7.08082C14.7307 7.02751 14.8646 7.00001 15 7H18.9719C19.51 7 19.9719 7.41375 19.9988 7.95188C20.0053 8.08708 19.9843 8.22221 19.937 8.34906C19.8898 8.47591 19.8172 8.59185 19.7239 8.68985C19.6305 8.78785 19.5182 8.86587 19.3937 8.91918C19.2693 8.97249 19.1354 8.99999 19 9Z" fill="#707070"/>
							</svg>
						</i>
						Posts
					</a>
				</li>
				
				<?php
					/**
					 * START `PRFERANCE` BLOCK
					 **/
					if ($rowUSER["userrole"] == 'admin' || $rowUSER['userrole'] === 'content_writer') { ?>
						<li class="nav-item ">
							<div class="dropdown mr-1">
								<a class="text-dark px-3 <?= checkMenuActivity([
									'/2290onlineform/users/','/2290onlineform/services/','/2290onlineform/emailTemplates', '/2290onlineform/emailTemplates/', '/2290onlineform/emailTemplates/template', '/2290onlineform/emailTemplates/template/', '/2290onlineform/messageTemplates', '/2290onlineform/messageTemplates/', '/2290onlineform/messageTemplates/template', '/2290onlineform/messageTemplates/template/', '/2290onlineform/services', '/2290onlineform/services/'
								]) ?>" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false" role="button">
									<i class="fa-solid fa-sliders me-1"></i>
									Preferences
								</a>
								<ul class="dropdown-menu " aria-labelledby="dropdownMenuButton" style="min-width: 12rem !important;">
									<li class="nav-item text-start <?= $rowUSER["userrole"] !== 'admin' ? 'd-none' : '' ?>">
										<a class="nav-link <?= checkMenuActivity(['/2290onlineform/users/']) ?>" href="/2290onlineform/users/">
											<i class="fa-solid fa-users-gear me-1"></i>
											Users
										</a>
									</li>
									<li class="nav-item text-start <?= $rowUSER["userrole"] !== 'admin' ? 'd-none' : '' ?>">
										<a class="nav-link <?= checkMenuActivity(['/2290onlineform/services/']) ?>" href="/2290onlineform/services/" id="servicesButton">
											<i class="fa-solid fa-users-gear me-1"></i>
											Services
										</a>
									</li>
									<li class="nav-item text-start">
										
										<a class="nav-link   <?= checkMenuActivity(['/2290onlineform/emailTemplates', '/2290onlineform/emailTemplates/', '/2290onlineform/emailTemplates/template', '/2290onlineform/emailTemplates/template/']) ?> "
										   href="/2290onlineform/emailTemplates">
											<i class="fa-solid fa-envelope"></i>
											Email Template
										</a>
									</li>
									<li class="nav-item text-start">
										<a class="nav-link   <?= checkMenuActivity(['/2290onlineform/messageTemplates', '/2290onlineform/messageTemplates/', '/2290onlineform/messageTemplates/template', '/2290onlineform/messageTemplates/template/']) ?> "
										   href="/2290onlineform/messageTemplates">
											<i class="fa-solid fa-message"></i>
											Message Template
										</a>
									</li>
								</ul>
							</div>
						</li>
					
					<?php }
					/**
					 * END `PRFERANCE` BLOCK
					 **/
				?>
				<li class="nav-item ">
					<div class="dropdown mr-1">
						<a class="text-dark px-1" id="dropdownMenuButton" data-mdb-toggle="dropdown"
						   aria-expanded="false" role="button">
							<i class="fa-solid fa-circle-user me-1"></i><?= $rowUSER['username'] ?>
						</a>
						<ul class="dropdown-menu " aria-labelledby="dropdownMenuButton">
							<?php
								if ($_COOKIE['__businessID'] === '0') {
									echo '<li><a class="dropdown-item"  href="/"><i class="fa-solid fa-table-columns me-1"></i>
                                    Main Dashboard
                                </a>
                            </li>';
								}
							?>
							<li><a class="dropdown-item" href="/login/logout.php"><i
										class="fa-solid fa-arrow-right-from-bracket me-1"></i>
									Log Out
								</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
</nav>

<?php
	$contentUri = ''; // Set a default value or handle the case when parsing fails
	$urlComponents = parse_url($_SERVER['REQUEST_URI']);
	if ($urlComponents !== false && isset($urlComponents['path'])) {
		$contentUri = $urlComponents['path'];
	}
	$messageUri = [
		'/irpNew/test/',
		'/irpNew/test',
//		'/2290onlineform/emailTemplates',
//		'/2290onlineform/messageTemplates/',
//		'/2290onlineform/messageTemplates',
//		'/2290onlineform/posts/',
//		'/2290onlineform/posts',
//		'/2290onlineform/posts/post/',
//		'/2290onlineform/posts/post',
//		'/2290onlineform/emailTemplates/template/',
//		'/2290onlineform/emailTemplates/template',
//		'/2290onlineform/messageTemplates/template/',
//		'/2290onlineform/messageTemplates/template'
	];
	if (
		$rowUSER['userrole'] === 'content_writer' &&
		!in_array($contentUri, $messageUri, true)
	) {
		echo "<div class='container text-center' style='margin-top:150px;'>
           <div class='w-50 shadow mx-auto py-5'>
               <i style='font-size: 50px' class='fa-solid fa-ban text-danger'></i>
               <h4 class='py-3'>Oops, you don't have access to this page</h4>
                <h6 class='py-2'>You have access only this pages</h6>
               <a href='" .
			returnServerName() .
			"/2290onlineform/emailTemplates' class='btn btn-primary text-white'>Email Template</a>
               <a href='" .
			returnServerName() .
			"/2290onlineform/messageTemplates' class='btn btn-primary text-white'>Message Template</a>
            </div>
          </div>";
		include 'footer.php';
		die();
	}