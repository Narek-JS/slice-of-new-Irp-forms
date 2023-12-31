<?php
	include "../constantsIRP.php";
	include "../head.php";
	include "../menu.php";
?>
<script src="https://cdn.jsdelivr.net/npm/jszip@3.6.0/dist/jszip.min.js"></script>

<!--<title>--><?php //= ORDERS_PERMIT_PAGE ?><!--</title>-->

<div class="page-container">
    <div id="loader" class='loader'>
        <div class="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <!--Css File 2290onlineformPermits.css-->
    <div class="page-content">
        <input type="hidden" value="<?= returnServerName(); ?>" id="domain_path">
        <div id="borderInfoContainer">

            <!--Search Section START-->
            <div class="row">
                <div class="table-top-part">
                    <div class="page-title">
                        <div class="icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66667 24C1.93333 24 1.30533 23.7391 0.782667 23.2173C0.260889 22.6947 0 22.0667 0 21.3333V2.66667C0 1.93333 0.260889 1.30533 0.782667 0.782667C1.30533 0.260889 1.93333 0 2.66667 0H21.3333C22.0667 0 22.6947 0.260889 23.2173 0.782667C23.7391 1.30533 24 1.93333 24 2.66667V21.3333C24 22.0667 23.7391 22.6947 23.2173 23.2173C22.6947 23.7391 22.0667 24 21.3333 24H2.66667ZM6.66667 18.6667C7.04444 18.6667 7.36133 18.5387 7.61733 18.2827C7.87245 18.0276 8 17.7111 8 17.3333C8 16.9556 7.87245 16.6387 7.61733 16.3827C7.36133 16.1276 7.04444 16 6.66667 16C6.28889 16 5.972 16.1276 5.716 16.3827C5.46089 16.6387 5.33333 16.9556 5.33333 17.3333C5.33333 17.7111 5.46089 18.0276 5.716 18.2827C5.972 18.5387 6.28889 18.6667 6.66667 18.6667ZM6.66667 13.3333C7.04444 13.3333 7.36133 13.2053 7.61733 12.9493C7.87245 12.6942 8 12.3778 8 12C8 11.6222 7.87245 11.3053 7.61733 11.0493C7.36133 10.7942 7.04444 10.6667 6.66667 10.6667C6.28889 10.6667 5.972 10.7942 5.716 11.0493C5.46089 11.3053 5.33333 11.6222 5.33333 12C5.33333 12.3778 5.46089 12.6942 5.716 12.9493C5.972 13.2053 6.28889 13.3333 6.66667 13.3333ZM6.66667 8C7.04444 8 7.36133 7.872 7.61733 7.616C7.87245 7.36089 8 7.04444 8 6.66667C8 6.28889 7.87245 5.972 7.61733 5.716C7.36133 5.46089 7.04444 5.33333 6.66667 5.33333C6.28889 5.33333 5.972 5.46089 5.716 5.716C5.46089 5.972 5.33333 6.28889 5.33333 6.66667C5.33333 7.04444 5.46089 7.36089 5.716 7.616C5.972 7.872 6.28889 8 6.66667 8ZM12 18.6667H17.3333C17.7111 18.6667 18.0276 18.5387 18.2827 18.2827C18.5387 18.0276 18.6667 17.7111 18.6667 17.3333C18.6667 16.9556 18.5387 16.6387 18.2827 16.3827C18.0276 16.1276 17.7111 16 17.3333 16H12C11.6222 16 11.3058 16.1276 11.0507 16.3827C10.7947 16.6387 10.6667 16.9556 10.6667 17.3333C10.6667 17.7111 10.7947 18.0276 11.0507 18.2827C11.3058 18.5387 11.6222 18.6667 12 18.6667ZM12 13.3333H17.3333C17.7111 13.3333 18.0276 13.2053 18.2827 12.9493C18.5387 12.6942 18.6667 12.3778 18.6667 12C18.6667 11.6222 18.5387 11.3053 18.2827 11.0493C18.0276 10.7942 17.7111 10.6667 17.3333 10.6667H12C11.6222 10.6667 11.3058 10.7942 11.0507 11.0493C10.7947 11.3053 10.6667 11.6222 10.6667 12C10.6667 12.3778 10.7947 12.6942 11.0507 12.9493C11.3058 13.2053 11.6222 13.3333 12 13.3333ZM12 8H17.3333C17.7111 8 18.0276 7.872 18.2827 7.616C18.5387 7.36089 18.6667 7.04444 18.6667 6.66667C18.6667 6.28889 18.5387 5.972 18.2827 5.716C18.0276 5.46089 17.7111 5.33333 17.3333 5.33333H12C11.6222 5.33333 11.3058 5.46089 11.0507 5.716C10.7947 5.972 10.6667 6.28889 10.6667 6.66667C10.6667 7.04444 10.7947 7.36089 11.0507 7.616C11.3058 7.872 11.6222 8 12 8Z"
                                      fill="#F59720"/>
                            </svg>
                        </div>
                        <div class='title'>Manage Orders</div>
                    </div>

                    <div id="showEntriesBlock">

                        <script>
                            const entries = [10, 25, 50, 100];

                            function generateEntryHTML(entry, idx) {
                                return `<div class="entryQty" data-count=${entry} onclick="showEntriesGroup(this)"><span>${entry}</span></div>`;
                            }

                            const entryHTMLArray = entries.map(generateEntryHTML);
                            const entryHTML = entryHTMLArray.join('');

                            document.getElementById('showEntriesBlock').innerHTML = entryHTML;
                        </script>

                        <div id="showEntries">Show entries</div>
                    </div>
                    <select id="selectPaymentStatusOrder"
                            class="form-control form-select required"
                            onchange="changePaymentStatus(this.value)"
                    >
                        <option selected disabled
                                hidden value=''>Payment Status
                        </option>
                        <script>
                            const optionsData = [{text: 'All', value: ''}, {text: 'Pending', value: 0}, {
                                text: 'Failed',
                                value: -1
                            }, {text: 'Completed', value: 1}];

                            function generateOptionHTML(option, idx) {
                                return `<option id="optionStatusPayment" value=${option.value}>${option.text}</option>`;
                            }

                            const optionHTMLArray = optionsData.map(generateOptionHTML);
                            const optionHTML = optionHTMLArray.join('');
                            document.getElementById('selectPaymentStatusOrder').innerHTML += optionHTML;
                        </script>
                    </select>
                    <form id="search" onsubmit="event.preventDefault(); searchDataHandle();">
                        <input type="text" id='searchValue' class="form-control" placeholder="Search">
                        <button id="searchBtn" type="submit">
                            <i class="fa-solid fa-magnifying-glass" style="color: #FDFDFF;"></i>
                        </button>
                    </form>

                </div>
            </div>
            <!--Search Section END-->

            <div class="table-container">
                <table id="ordersTable" class="table table-striped">
                    <thead>
                    <tr id="sortBy">
                        <th onclick="sortingOrdersTable('orderId', this.querySelector('.sortAscDescButton'))">ID <span
                                    class="sort-icon sortAscDescButton"><i data-slug="orderId" class="fas fa-sort"></i></span>
                        </th>
                        <th onclick="sortingOrdersTable('orderId', this.querySelector('.sortAscDescButton'))">Order
                            Details <span class="sort-icon sortAscDescButton"><i data-slug="orderId"
                                                                                 class="fas fa-sort"></i></span></th>
                        <th onclick="sortingOrdersTable('phone', this.querySelector('.sortAscDescButton'))">Contact Info
                            <span class="sort-icon sortAscDescButton"><i data-slug="phone"
                                                                         class="fas fa-sort"></i></span></th>
                        <th onclick="sortingOrdersTable('ein', this.querySelector('.sortAscDescButton'))">Company Info
                            <span class="sort-icon sortAscDescButton"><i data-slug="ein" class="fas fa-sort"></i></span>
                        </th>
                        <th onclick="sortingOrdersTable('status', this.querySelector('.sortAscDescButton'))">Status
                            <span class="sort-icon sortAscDescButton"><i data-slug="status"
                                                                         class="fas fa-sort"></i></span></th>
                        <th onclick="sortingOrdersTable('paymentStatus', this.querySelector('.sortAscDescButton'))">Pay
                            <span class="sort-icon sortAscDescButton"><i data-slug="paymentStatus"
                                                                         class="fas fa-sort"></i></span></th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </table>
                <div class="row">
                    <div class="form-group d-flex justify-content-between align-items-center">
                        <div class="col-sm-6 d-flex showing-text">
                            <div id="allOrdersCount"><span id="countResponseInIp"></span> orders &nbsp;</div>
                            <div id="showPaginationPage"> ( Showing <span id="pageSizeStart"></span> to <span
                                        id="pageSizeEnd"></span>)
                            </div>
                        </div>
                        <div id="paginationContainer">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="modal pt-6" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="w-75 main-panel mx-auto min-vh-100 position-relative">
            <div id="blockLoader" class='loader'>
                <div class="lds-hourglass"></div>
            </div>
            <div id='content'>
                <div class="modal-dialog modal-xl"></div>
            </div>
        </div>
    </div>
    <div class="modal" id="noteModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-body position-relative" id="orderNotesDetails">
                <div id="blockLoader" class='loader'>
                    <div class="lds-hourglass"></div>
                </div>
                <div class="modal-content" id='content'>
                </div>
            </div>
        </div>
    </div>
    <div class="modal pt-6" id="businessModal">
        <div class="w-75 main-panel mx-auto position-relative">
            <div id="blockLoader" class='loader'>
                <div class="lds-hourglass"></div>
            </div>
            <div id='content'>
                <div class="modal-dialog modal-xl"></div>
            </div>
        </div>
    </div>

    <div class="modal" id="permitActionModal">
        <div class="modal-dialog modal-l">
            <div class="modal-body position-relative" id="orderNotesDetails">
                <div id="blockLoader" class='loader'>
                    <div class="lds-hourglass"></div>
                </div>
                <div id='content'></div>
            </div>
        </div>
    </div>
</div>

<!--Js File dataTable.js-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
<?php include "../footer.php" ?>
