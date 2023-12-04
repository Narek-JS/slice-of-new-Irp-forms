<!-- CSS -->
<link rel="stylesheet" href="../assets/css/orderEdit/edit-page-main.css">
<!-- ORDER STATUSES POPUP CSS -->
<link rel="stylesheet" href="../assets/css/orderEdit/order-statuses.css">
<!-- NOTIFICATIONS PACKAGE CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<!-- DATEPICKER CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/css/datepicker.min.css">



<!-- AGENT NAME FROM PHP -->
<!-- <input type="hidden" id="admin" value="< ?= $agent_Name ?>"> -->

<!-- PAGE LOADER -->
<div class='loadingContainer'>
    <span class="loadingContainer-loader">
        <img src='../assets/images/logo.png' alt="logo"/>
    </span>
</div>

<!-- TOP PANEL LIKE HEADER -->
<div class="topPanel-relative">
    <div class="editPermitPopup__topPanel">
        <div class="editPermitPopup__topPanel__edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M4 23.2803V27.3337C4 27.707 4.29333 28.0003 4.66667 28.0003H8.72C8.89333 28.0003 9.06667 27.9337 9.18667 27.8003L23.7467 13.2537L18.7467 8.25366L4.2 22.8003C4.06667 22.9337 4 23.0937 4 23.2803ZM27.6133 9.387C27.7369 9.26364 27.835 9.11713 27.9019 8.95583C27.9688 8.79453 28.0033 8.62162 28.0033 8.447C28.0033 8.27237 27.9688 8.09946 27.9019 7.93816C27.835 7.77687 27.7369 7.63035 27.6133 7.507L24.4933 4.387C24.37 4.26339 24.2235 4.16533 24.0622 4.09842C23.9009 4.03151 23.728 3.99707 23.5533 3.99707C23.3787 3.99707 23.2058 4.03151 23.0445 4.09842C22.8832 4.16533 22.7367 4.26339 22.6133 4.387L20.1733 6.827L25.1733 11.827L27.6133 9.387Z" fill="#3A9EFE"/>
            </svg>
            <h3>Edit Permit</h3>
        </div>
    </div>
</div>

<!-- PERMIT DETAILS -->
<div class="editPermitPopup__orderInformation">
    <div class="editPermitPopup__orderInformation__node">
        <button class="editPermitPopup__orderInformation__note" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_2260_6891)">
                    <path d="M8 0L8 16" stroke="white" stroke-width="1.5"/>
                    <line x1="16" y1="7.86133" y2="7.86133" stroke="white" stroke-width="1.5"/>
                </g>
                <defs>
                    <clipPath id="clip0_2260_6891">
                        <rect width="16" height="16" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            Notes
        </button>

        <div>
            <p>Order ID: <span class='editPermitPopup__orderInformation-orderId'>NOT FOUND</span></p>
            <p>USDOT: <span class='editPermitPopup__orderInformation-usdot'>NOT FOUND</span></p>
        </div>
    </div>
    <div class="editPermitPopup__orderInformation__node">
        <p>Order Date: <span class='editPermitPopup__orderInformation-date'>NOT FOUND</span></p>
        <p>Order Cost: <span class='editPermitPopup__orderInformation-cost'>NOT FOUND</span></p>
    </div>
    <div class="editPermitPopup__orderInformation__node">
        <div class="permit-status-buttons active">
            <button
                class="editPermitPopup__orderInformation-dispute"
                onclick="openOrderStatusPopup(event)"
                data-status="dispute"
            >
                Dispute
            </button>
            <button
                class="editPermitPopup__orderInformation-void"
                onclick="openOrderStatusPopup(event)"
                data-status="void"
            >
                Void
            </button>
            <button
                class="editPermitPopup__orderInformation-refund"
                onclick="openOrderStatusPopup(event)"
                data-status="refound"
            >
                Refound
            </button>
        </div>
        <div class="permit-status-message">
            <!-- <span><b>By: </b> < ?= $agent_Name ?></span> -->
            <div class="permit-status-message-content">
                <!-- in here I insert status Reason and date from Javascript -->
            </div>
        </div>
        <div class="cancel-selected-permit-status">
            <button class="" onclick="cancelSelectedStatus()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1880_6141)">
                        <path d="M12 5V1L17 6L12 11V7C8.69 7 6 9.69 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13H20C20 17.42 16.42 21 12 21C7.58 21 4 17.42 4 13C4 8.58 7.58 5 12 5Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1880_6141">
                            <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)"/>
                        </clipPath>
                    </defs>
                </svg>
                <span>
                    <!-- in here I insert selected parmit status -->
                </span>
            </button>
            <a href="/client-profile" class="editPermitPopup__orderInformation-toClientProfile">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
                    <path d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9H20V7H0V9Z" fill="#3A9EFE"/>
                </svg>
                <span>See Client Profile</span>
            </a>
        </div>
    </div>
</div>

<!-- STEP BAR -->
<div class="editPermitPopup__stepBar">
    <button class="editPermitPopup__stepBar-edit" onclick="changeEditFormStep('edit')" data-pageName="edit">Edit</button>
    <button class="editPermitPopup__stepBar-document" onclick="changeEditFormStep('document')" data-pageName="document">Document</button>
    <button class="editPermitPopup__stepBar-history" onclick="changeEditFormStep('history')" data-pageName="history">History</button>
    <button class="editPermitPopup__stepBar-payment" onclick="changeEditFormStep('payment')" data-pageName="payment">Payment</button>
</div>

<!-- ORDER STATUSES POPUPS -->
<div class="order-status-modal">
    <div class="order-status-popup dispute-popup" data-name="dispute">
        <div class="status">
            <p>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.877 13.4265L26.7232 21.5154C27.3959 23.5551 27.1358 28.0147 22.561 26.7909L12.6358 16.9434C12.3156 17.2951 11.7263 16.3 11.9954 19.0536C11.8834 20.0734 10.3334 21.8247 8.18056 19.989L4.144 16.5471C3.80762 15.3998 3.86152 12.8146 6.55256 13.4265L10.0744 8.50274C9.85 7.48291 10.1314 5.37996 11.2078 5.07401C12.5533 4.69157 14.3947 5.73347 17.7585 9.55783C17.9829 10.4502 18.3988 12.3714 15.8375 12.0197C14.877 12.0197 13.8002 12.6655 14.877 13.4265Z" fill="#F59720"/>
                    <path d="M14.877 13.4265L26.7232 21.5154C27.3959 23.5551 27.1358 28.0147 22.561 26.7909L12.6358 16.9434M14.877 13.4265C13.8002 12.6655 14.877 12.0197 15.8375 12.0197C18.3988 12.3714 17.9829 10.4502 17.7585 9.55783C14.3947 5.73347 12.5533 4.69157 11.2078 5.07401C10.1314 5.37996 9.85 7.48291 10.0744 8.50274L6.55256 13.4265C3.86152 12.8146 3.80762 15.3998 4.144 16.5471L8.18056 19.989C10.3334 21.8247 11.8834 20.0734 11.9954 19.0536C11.7263 16.3 12.3156 17.2951 12.6358 16.9434M14.877 13.4265L12.6358 16.9434" stroke="#F59720" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.382 13.8595L26.2282 21.9485C26.8686 23.8242 27.0607 27.2943 22.7064 26.1688L12.7812 16.3214C12.2476 16.0869 11.2444 16.2511 11.5005 18.7833C11.3938 19.7211 10.6682 21.1748 8.61915 19.4866L4.77713 16.3214C4.45696 15.2663 4.45696 13.2968 7.01831 13.8595L10.8606 8.93583C10.647 7.99797 10.476 6.05193 11.5005 5.77057C12.7812 5.41888 14.0623 6.12227 17.264 9.63922C17.4776 10.4598 17.2643 12.0308 14.7026 11.7494C14.1687 12.1612 13.3571 13.1597 14.382 13.8595Z" fill="#F59720"/>
                    <path d="M14.382 13.8595L26.2282 21.9485C26.8686 23.8242 27.0607 27.2943 22.7064 26.1688L12.7812 16.3214M14.382 13.8595C13.3571 13.1597 14.1687 12.1612 14.7026 11.7494C17.2643 12.0308 17.4776 10.4598 17.264 9.63922C14.0623 6.12227 12.7812 5.41888 11.5005 5.77057C10.476 6.05193 10.647 7.99797 10.8606 8.93583L7.01831 13.8595C4.45696 13.2968 4.45696 15.2663 4.77713 16.3214L8.61915 19.4866C10.6682 21.1748 11.3938 19.7211 11.5005 18.7833C11.2444 16.2511 12.2476 16.0869 12.7812 16.3214M14.382 13.8595L12.7812 16.3214" stroke="#F59720" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.1804 17.728L7.01819 14.2111V13.8594L10.8602 8.58398L15.0224 11.7492C12.9733 11.7492 13.7417 13.156 14.3821 13.8594L12.7812 15.9696C11.5005 15.6882 11.1804 17.0247 11.1804 17.728Z" fill="#F59720" stroke="#F59720" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>DISPUTE A PERMIT</span>
            </p>
            <div class="close" onclick="closeOrderStatusPopup(event)">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="close" clip-path="url(#clip0_2464_4950)">
                        <path id="Vector" d="M25.3333 8.54699L23.4533 6.66699L16 14.1203L8.54663 6.66699L6.66663 8.54699L14.12 16.0003L6.66663 23.4537L8.54663 25.3337L16 17.8803L23.4533 25.3337L25.3333 23.4537L17.88 16.0003L25.3333 8.54699Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2464_4950">
                            <rect width="32" height="32" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <div class="order-status-popup__content">
            <p class="order-status-popup__message">
                Please confirm that you want to dispute <span>$512.00</span> by GDC TRUCKING INC.
            </p>
            <form class="order-status-popup__form">
                <div class="fieldNode">
                    <label>Reason of the dispute:</label>
                    <textarea name="dispute_message" placeholder="Enter reason here..."></textarea>
                </div>

                <div class="fieldNode">
                    <label>Reason of the dispute:</label>
                    <div class="custom-datepicker">
                        <input name="dispute_date" placeholder="mm/dd/yyyy" readonly/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 14C11.7167 14 11.4793 13.904 11.288 13.712C11.096 13.5207 11 13.2833 11 13C11 12.7167 11.096 12.479 11.288 12.287C11.4793 12.0957 11.7167 12 12 12C12.2833 12 12.521 12.0957 12.713 12.287C12.9043 12.479 13 12.7167 13 13C13 13.2833 12.9043 13.5207 12.713 13.712C12.521 13.904 12.2833 14 12 14ZM8 14C7.71667 14 7.479 13.904 7.287 13.712C7.09567 13.5207 7 13.2833 7 13C7 12.7167 7.09567 12.479 7.287 12.287C7.479 12.0957 7.71667 12 8 12C8.28333 12 8.521 12.0957 8.713 12.287C8.90433 12.479 9 12.7167 9 13C9 13.2833 8.90433 13.5207 8.713 13.712C8.521 13.904 8.28333 14 8 14ZM16 14C15.7167 14 15.4793 13.904 15.288 13.712C15.096 13.5207 15 13.2833 15 13C15 12.7167 15.096 12.479 15.288 12.287C15.4793 12.0957 15.7167 12 16 12C16.2833 12 16.5207 12.0957 16.712 12.287C16.904 12.479 17 12.7167 17 13C17 13.2833 16.904 13.5207 16.712 13.712C16.5207 13.904 16.2833 14 16 14ZM12 18C11.7167 18 11.4793 17.904 11.288 17.712C11.096 17.5207 11 17.2833 11 17C11 16.7167 11.096 16.4793 11.288 16.288C11.4793 16.096 11.7167 16 12 16C12.2833 16 12.521 16.096 12.713 16.288C12.9043 16.4793 13 16.7167 13 17C13 17.2833 12.9043 17.5207 12.713 17.712C12.521 17.904 12.2833 18 12 18ZM8 18C7.71667 18 7.479 17.904 7.287 17.712C7.09567 17.5207 7 17.2833 7 17C7 16.7167 7.09567 16.4793 7.287 16.288C7.479 16.096 7.71667 16 8 16C8.28333 16 8.521 16.096 8.713 16.288C8.90433 16.4793 9 16.7167 9 17C9 17.2833 8.90433 17.5207 8.713 17.712C8.521 17.904 8.28333 18 8 18ZM16 18C15.7167 18 15.4793 17.904 15.288 17.712C15.096 17.5207 15 17.2833 15 17C15 16.7167 15.096 16.4793 15.288 16.288C15.4793 16.096 15.7167 16 16 16C16.2833 16 16.5207 16.096 16.712 16.288C16.904 16.4793 17 16.7167 17 17C17 17.2833 16.904 17.5207 16.712 17.712C16.5207 17.904 16.2833 18 16 18ZM5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20Z" fill="#3A9EFE"/>
                        </svg>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    <div class="order-status-popup void-popup" data-name="void">
        <div class="status">
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2.66699C8.63999 2.66699 2.66666 8.64033 2.66666 16.0003C2.66666 23.3603 8.63999 29.3337 16 29.3337C23.36 29.3337 29.3333 23.3603 29.3333 16.0003C29.3333 8.64033 23.36 2.66699 16 2.66699ZM21.3333 17.3337H10.6667C9.93332 17.3337 9.33332 16.7337 9.33332 16.0003C9.33332 15.267 9.93332 14.667 10.6667 14.667H21.3333C22.0667 14.667 22.6667 15.267 22.6667 16.0003C22.6667 16.7337 22.0667 17.3337 21.3333 17.3337Z" fill="#F93154"/>
                </svg>
                <span>VOID A PERMIT</span>
            </p>
            <div class="close" onclick="closeOrderStatusPopup(event)">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="close" clip-path="url(#clip0_2464_4950)">
                        <path id="Vector" d="M25.3333 8.54699L23.4533 6.66699L16 14.1203L8.54663 6.66699L6.66663 8.54699L14.12 16.0003L6.66663 23.4537L8.54663 25.3337L16 17.8803L23.4533 25.3337L25.3333 23.4537L17.88 16.0003L25.3333 8.54699Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2464_4950">
                            <rect width="32" height="32" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <div class="order-status-popup__content">
            <p class="order-status-popup__message">
                Please confirm that you want to void <span>$512.00</span> by GDC TRUCKING INC.
            </p>
            <form class="order-status-popup__form">
                <div class="fieldNode">
                    <label>Reason of the void:</label>
                    <textarea name="void_message" placeholder="Enter reason here..."></textarea>
                </div>

                <div class="fieldNode">
                    <label>Reason of the void:</label>
                    <div class="custom-datepicker">
                        <input name="void_date" placeholder="mm/dd/yyyy" readonly/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 14C11.7167 14 11.4793 13.904 11.288 13.712C11.096 13.5207 11 13.2833 11 13C11 12.7167 11.096 12.479 11.288 12.287C11.4793 12.0957 11.7167 12 12 12C12.2833 12 12.521 12.0957 12.713 12.287C12.9043 12.479 13 12.7167 13 13C13 13.2833 12.9043 13.5207 12.713 13.712C12.521 13.904 12.2833 14 12 14ZM8 14C7.71667 14 7.479 13.904 7.287 13.712C7.09567 13.5207 7 13.2833 7 13C7 12.7167 7.09567 12.479 7.287 12.287C7.479 12.0957 7.71667 12 8 12C8.28333 12 8.521 12.0957 8.713 12.287C8.90433 12.479 9 12.7167 9 13C9 13.2833 8.90433 13.5207 8.713 13.712C8.521 13.904 8.28333 14 8 14ZM16 14C15.7167 14 15.4793 13.904 15.288 13.712C15.096 13.5207 15 13.2833 15 13C15 12.7167 15.096 12.479 15.288 12.287C15.4793 12.0957 15.7167 12 16 12C16.2833 12 16.5207 12.0957 16.712 12.287C16.904 12.479 17 12.7167 17 13C17 13.2833 16.904 13.5207 16.712 13.712C16.5207 13.904 16.2833 14 16 14ZM12 18C11.7167 18 11.4793 17.904 11.288 17.712C11.096 17.5207 11 17.2833 11 17C11 16.7167 11.096 16.4793 11.288 16.288C11.4793 16.096 11.7167 16 12 16C12.2833 16 12.521 16.096 12.713 16.288C12.9043 16.4793 13 16.7167 13 17C13 17.2833 12.9043 17.5207 12.713 17.712C12.521 17.904 12.2833 18 12 18ZM8 18C7.71667 18 7.479 17.904 7.287 17.712C7.09567 17.5207 7 17.2833 7 17C7 16.7167 7.09567 16.4793 7.287 16.288C7.479 16.096 7.71667 16 8 16C8.28333 16 8.521 16.096 8.713 16.288C8.90433 16.4793 9 16.7167 9 17C9 17.2833 8.90433 17.5207 8.713 17.712C8.521 17.904 8.28333 18 8 18ZM16 18C15.7167 18 15.4793 17.904 15.288 17.712C15.096 17.5207 15 17.2833 15 17C15 16.7167 15.096 16.4793 15.288 16.288C15.4793 16.096 15.7167 16 16 16C16.2833 16 16.5207 16.096 16.712 16.288C16.904 16.4793 17 16.7167 17 17C17 17.2833 16.904 17.5207 16.712 17.712C16.5207 17.904 16.2833 18 16 18ZM5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20Z" fill="#3A9EFE"/>
                        </svg>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    <div class="order-status-popup refound-popup" data-name="refound">
        <div class="status">
            <p>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.7305 21.457V16.5469C13.1992 16.1094 12.0742 15.4492 11.3555 14.5664C10.6445 13.6758 10.2891 12.5977 10.2891 11.332C10.2891 10.0508 10.6914 8.97656 11.4961 8.10938C12.3086 7.23437 13.3867 6.73047 14.7305 6.59766V5.4375H16.4297V6.59766C17.6719 6.74609 18.6602 7.17188 19.3945 7.875C20.1289 8.57031 20.5977 9.50391 20.8008 10.6758L17.8359 11.0625C17.6562 10.1406 17.1875 9.51562 16.4297 9.1875V13.7695C18.3047 14.2773 19.582 14.9375 20.2617 15.75C20.9414 16.5547 21.2812 17.5898 21.2812 18.8555C21.2812 20.2695 20.8516 21.4609 19.9922 22.4297C19.1406 23.3984 17.9531 23.9922 16.4297 24.2109V26.4023H14.7305V24.2695C13.3789 24.1055 12.2812 23.6016 11.4375 22.7578C10.5938 21.9141 10.0547 20.7227 9.82031 19.1836L12.8789 18.8555C13.0039 19.4805 13.2383 20.0195 13.582 20.4727C13.9258 20.9258 14.3086 21.2539 14.7305 21.457ZM14.7305 9.15234C14.2695 9.30859 13.9023 9.57422 13.6289 9.94922C13.3555 10.3242 13.2188 10.7383 13.2188 11.1914C13.2188 11.6055 13.3438 11.9922 13.5938 12.3516C13.8438 12.7031 14.2227 12.9883 14.7305 13.207V9.15234ZM16.4297 21.6211C17.0156 21.5117 17.4922 21.2422 17.8594 20.8125C18.2266 20.375 18.4102 19.8633 18.4102 19.2773C18.4102 18.7539 18.2539 18.3047 17.9414 17.9297C17.6367 17.5469 17.1328 17.2539 16.4297 17.0508V21.6211Z" fill="#001D4A"/>
                </svg>
                <span>REFOUND A PERMIT</span>
            </p>
            <div class="close" onclick="closeOrderStatusPopup(event)">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="close" clip-path="url(#clip0_2464_4950)">
                        <path id="Vector" d="M25.3333 8.54699L23.4533 6.66699L16 14.1203L8.54663 6.66699L6.66663 8.54699L14.12 16.0003L6.66663 23.4537L8.54663 25.3337L16 17.8803L23.4533 25.3337L25.3333 23.4537L17.88 16.0003L25.3333 8.54699Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2464_4950">
                            <rect width="32" height="32" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <div class="order-status-popup__content">
            <p class="order-status-popup__message">
                Please confirm that you want to refund <span>$512.00</span> by GDC TRUCKING INC.
            </p>
            <form class="order-status-popup__form">
                <div class="fieldNode">
                    <label>Reason of the refund:</label>
                    <textarea name="refound_message" placeholder="Enter reason here..."></textarea>
                </div>

                <div class="fieldNode">
                    <label>Reason of the refund:</label>
                    <div class="custom-datepicker">
                        <input name="refound_date" placeholder="mm/dd/yyyy" readonly/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 14C11.7167 14 11.4793 13.904 11.288 13.712C11.096 13.5207 11 13.2833 11 13C11 12.7167 11.096 12.479 11.288 12.287C11.4793 12.0957 11.7167 12 12 12C12.2833 12 12.521 12.0957 12.713 12.287C12.9043 12.479 13 12.7167 13 13C13 13.2833 12.9043 13.5207 12.713 13.712C12.521 13.904 12.2833 14 12 14ZM8 14C7.71667 14 7.479 13.904 7.287 13.712C7.09567 13.5207 7 13.2833 7 13C7 12.7167 7.09567 12.479 7.287 12.287C7.479 12.0957 7.71667 12 8 12C8.28333 12 8.521 12.0957 8.713 12.287C8.90433 12.479 9 12.7167 9 13C9 13.2833 8.90433 13.5207 8.713 13.712C8.521 13.904 8.28333 14 8 14ZM16 14C15.7167 14 15.4793 13.904 15.288 13.712C15.096 13.5207 15 13.2833 15 13C15 12.7167 15.096 12.479 15.288 12.287C15.4793 12.0957 15.7167 12 16 12C16.2833 12 16.5207 12.0957 16.712 12.287C16.904 12.479 17 12.7167 17 13C17 13.2833 16.904 13.5207 16.712 13.712C16.5207 13.904 16.2833 14 16 14ZM12 18C11.7167 18 11.4793 17.904 11.288 17.712C11.096 17.5207 11 17.2833 11 17C11 16.7167 11.096 16.4793 11.288 16.288C11.4793 16.096 11.7167 16 12 16C12.2833 16 12.521 16.096 12.713 16.288C12.9043 16.4793 13 16.7167 13 17C13 17.2833 12.9043 17.5207 12.713 17.712C12.521 17.904 12.2833 18 12 18ZM8 18C7.71667 18 7.479 17.904 7.287 17.712C7.09567 17.5207 7 17.2833 7 17C7 16.7167 7.09567 16.4793 7.287 16.288C7.479 16.096 7.71667 16 8 16C8.28333 16 8.521 16.096 8.713 16.288C8.90433 16.4793 9 16.7167 9 17C9 17.2833 8.90433 17.5207 8.713 17.712C8.521 17.904 8.28333 18 8 18ZM16 18C15.7167 18 15.4793 17.904 15.288 17.712C15.096 17.5207 15 17.2833 15 17C15 16.7167 15.096 16.4793 15.288 16.288C15.4793 16.096 15.7167 16 16 16C16.2833 16 16.5207 16.096 16.712 16.288C16.904 16.4793 17 16.7167 17 17C17 17.2833 16.904 17.5207 16.712 17.712C16.5207 17.904 16.2833 18 16 18ZM5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20Z" fill="#3A9EFE"/>
                        </svg>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>

<!-- CONTACT US POPUP -->
<div class="contact-us-modal">
    <div class="contact-us-modal__content">
        <svg fill="#F59720" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58 58" xml:space="preserve">
            <g>
                <g>
                    <path d="M53,44V27.5C53,17.299,44.698,9,34.494,9H23.506C13.302,9,5,17.299,5,27.5V44H0v2h6h1h3v2c0,0.552,0.447,1,1,1h3h2h1h2h3 c0.553,0,1-0.448,1-1v-2h12v2c0,0.552,0.447,1,1,1h3h2h1h2h3c0.553,0,1-0.448,1-1v-2h3h1h6v-2H53z M21,47h-2v-3h-2v3h-1v-3h-2v3 h-2v-1v-1c0-1.103,0.899-2,2.006-2h4.988C20.101,43,21,43.897,21,45v1V47z M46,47h-2v-3h-2v3h-1v-3h-2v3h-2v-1v-1 c0-1.103,0.899-2,2.006-2h4.988C45.101,43,46,43.897,46,45v1V47z M47.858,44c-0.448-1.72-2.002-3-3.864-3h-4.988 c-1.861,0-3.416,1.28-3.864,3H22.858c-0.448-1.72-2.003-3-3.864-3h-4.988c-1.861,0-3.416,1.28-3.864,3H7V27.5 C7,18.402,14.404,11,23.506,11h10.988C43.596,11,51,18.402,51,27.5V44H47.858z"/>
                    <path d="M21,26c-3.309,0-6,2.691-6,6v1h2v-1c0-2.206,1.794-4,4-4c1.025,0,1.951,0.398,2.66,1.034C22.719,29.197,22,30.014,22,31 c0,1.103,0.897,2,2,2c0.366,0,0.705-0.106,1-0.278V33h2v-1C27,28.691,24.309,26,21,26z"/>
                    <path d="M39,26c-3.309,0-6,2.691-6,6v1h2v-1c0-2.206,1.794-4,4-4c1.025,0,1.951,0.398,2.66,1.034C40.719,29.197,40,30.014,40,31 c0,1.103,0.897,2,2,2c0.366,0,0.705-0.106,1-0.278V33h2v-1C45,28.691,42.309,26,39,26z"/>
                </g>
            </g>
        </svg>
        <p></p>
        <button type="button" onclick="closeContactUsPopup()">
            Okay
        </button>
    </div>
</div>

<!-- CHANGE STAP POPUP -->
<div class="change-step-modal">
    <div class="change-step-modal__content">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 47.5 47.5" viewBox="0 0 47.5 47.5" id="warning">
            <defs>
                <clipPath id="a">
                    <path d="M0 38h38V0H0v38Z"></path>
                </clipPath>
            </defs>
            <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path fill="#ffcc4d" d="M0 0c-1.842 0-2.654 1.338-1.806 2.973l15.609 30.055c.848 1.635 2.238 1.635 3.087 0L32.499 2.973C33.349 1.338 32.536 0 30.693 0H0Z" transform="translate(3.653 2)"></path>
                <path fill="#231f20" d="M0 0c0 1.302.961 2.108 2.232 2.108 1.241 0 2.233-.837 2.233-2.108v-11.938c0-1.271-.992-2.108-2.233-2.108-1.271 0-2.232.807-2.232 2.108V0Zm-.187-18.293a2.422 2.422 0 0 0 2.419 2.418 2.422 2.422 0 0 0 2.419-2.418 2.422 2.422 0 0 0-2.419-2.419 2.422 2.422 0 0 0-2.419 2.419" transform="translate(16.769 26.34)"></path>
            </g>
        </svg>
        <p>are you sure, to reset your changes<span>?</span></p>
        <div class="wrapperButtons">
            <button type="button" onclick="closeChangeStepPopup('reset')">
                Yes
            </button>
            <button type="button" onclick="closeChangeStepPopup('just-close')" >
                No
            </button>
        </div>
    </div>
</div>

<!-- NOTIFICATIONS PACKAGE JS -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<!-- JQUERY JS-->
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
<!-- JQUERY INPUT MASK JS -->
<script type='text/javascript' src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js"></script>
<!-- JQUERY VALIDATE JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.20.0/jquery.validate.min.js"></script>
<!-- DATEPICKER JS -->
<script src="https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.3.4/dist/js/datepicker.min.js"></script>


<!-- ORDER EDIT PAGE MAIN JS-->
<script src="../assets/js/orderEdit/edit-page-main.js"></script>
<!-- ORDER STATUSES POPUPS JS-->
<script src="../assets/js/orderEdit/order-statuses.js"></script>
