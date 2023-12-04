/**
 * pageSizeGlobal Global available, For Ajax Request
 */
var pageGlobal = [] || '';
var pageSizeGlobal = [] || '';
var paymentStatus = '';
let pageButton = []
let paymentStatusForChange = '';
const blockDetailsOrderModelId = document.querySelector('#detailsOrderModelId');
const loaderBlock = document.getElementById('loader');

/**
 * Paginator Params
 */
let currentPage = 1; // Example current page
let maxButtons = 3; // Maximum number of visible buttons

const blockCountResponseInIp = document.querySelector('#countResponseInIp');
// section Footer
const blockPageSizeStart = document.querySelector('#pageSizeStart');
const blockPageSizeEnd = document.querySelector('#pageSizeEnd');
// show entries
const entriesElements = document.querySelectorAll('.entryQty');

class CustomDataTable {
    constructor(tableId, data) {
        this.tableId = tableId;
        this.data = data;
    }

    render() {

        const table = document.getElementById(this.tableId);
        try {
            // table.childNodes[3].remove();
        } catch (error) {
        } finally {
            const tbody = document.createElement("tbody");
            table.appendChild(tbody);
            const tablesIdDisplayFunc = {
                ordersTable: ordersBody,
                clientOrdersTable: ordersBody,
                clientsTable: clientsBody,
                businessesTable: businessesBody,
                reportsTable: reportsBody,
                postsTable: postsBody,
                servicesTable: servicesBody,
                emailTemplateTable: templateBody,
                messageTemplateTable: templateBody
            }
            tablesIdDisplayFunc[this.tableId](tbody, this.data, this.tableId)
        }
    }
}

// Services Table body HTML

function servicesBody(tbody, data, action) {
    let counter = 1;

    console.log(data, 'data')
    for (const iterator of data) {
        let picture = `
        <div class="position-relative service-img" id="serviceImg" style="background-image: url('data:image/png;base64,${iterator.imageBase64}');">
            <div class="service-backdrop"></div>
        </div>`
        const rows = [[
            counter,
            `<span id='priceTd'>$${iterator.ServicePrice.price}</span>`,
            `<span id='titleTd'>${iterator.title}</span>`,
            picture,
            action ?
                (`<a  class='actionBtn edit-btn' style="width: 120px;" 
                    href=${(iterator.max ? domain + '/2290onlineform/form/truck.php' :
                        domain + "/2290onlineform/form" + iterator.pagePath + ".php") + "?id=" + iterator.id} >` +
                    'Fill This Form' +
                    `</a>`) :
                (`<button type='button' class='actionBtn edit-btn' style="width: 120px;"
                    onclick='openServiceDetails(this, ${JSON.stringify(iterator)})'>` +
                    'Edit' +
                    `</button>`)
        ]];
        for (const row of rows) {
            const tr = document.createElement("tr");
            tr.dataset.position = counter;
            for (const cell of row) {
                const td = document.createElement("td");
                td.innerHTML = cell
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        counter++;
    }
};

// Reports Table body HTML

function postsBody(tbody, data) {
    let counter = 1;
    for (const iterator of data) {
        let orderId = iterator.orderId;
        let ID =
            '<table class="w-50"> ' +
            '        <tr class="text-center" style="height: 50%;">' +
            '            <td id="position">' +
            counter +
            '</td>' +
            '        </tr>' +
            '</table>';

        let title = `<p class="post-title">${iterator.title}</p>`;
        let category = `<span style="color: var(--color-s);">${iterator.newsType.title}</span>`
        let picture = `<img src=${`data:image/png;base64,${iterator.imageBase64}`} style="width: 50px; height: 38px; object-fit: cover;" alt='Post' />`;

        const comment = iterator.commentCount ?
            `<div class="position-relative d-inline-block">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.92308 0H27.0769C29.7846 0 32 1.8 32 4V18C32 20.2 29.7846 22 27.0769 22H22.1538L9.84615 32V22H4.92308C2.21538 22 0 20.2 0 18V4C0 1.8 2.21538 0 4.92308 0Z" fill="#2975F2"/>
            </svg>
        <div class="comment-count"><span>${iterator.commentCount}</span></div>
        </div>` : 'N/A';

        const like = iterator.likeCount ?
            `<div class="position-relative d-inline-block">
            <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_964_8247" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="26">
                <path d="M8.99935 1.33333C4.94935 1.33333 1.66602 4.61666 1.66602 8.66666C1.66602 16 10.3327 22.6667 14.9993 24.2173C19.666 22.6667 28.3327 16 28.3327 8.66666C28.3327 4.61666 25.0493 1.33333 20.9993 1.33333C18.5193 1.33333 16.326 2.56466 14.9993 4.44933C14.3231 3.48613 13.4248 2.70006 12.3804 2.15765C11.336 1.61525 10.1762 1.3325 8.99935 1.33333Z" fill="white" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </mask>
                <g mask="url(#mask0_964_8247)">
                <path d="M-1 -4H31V28H-1V-4Z" fill="#F59720"/>
                </g>
            </svg>
            <div class="comment-count"><span>${iterator.likeCount}</span></div>
            </div>` : 'N/A';
        const date =
            '<table class="w-100">' +
            '<tr><th>Updated: ' +
            checkDataFormatInOrderDetails(iterator.updateTime) +
            '</th>' +
            '</tr>' +
            '<tr><th>Created: ' +
            checkDataFormatInOrderDetails(iterator.publishTime) +
            '</th>' +
            '</tr>' +
            '</table>';
        const status = `<div class="active-status ${iterator.isActive ? '' : 'voidButton'}">${iterator.isActive ? 'Active' : 'Inactive'}</div>`
        const actions = `<div class="d-flex gap-2">
       <button type="button" class='actionBtn details' id="postViewBtn" onclick="handleViewPost('${iterator.id}')">View</button>
         <a href='${domain}/2290onlineform/posts/post?id=${iterator.id}'><button class='actionBtn edit-btn'>Edit</button></a>
      <button class='actionBtn incomplete' onclick="openRemovePostModal(this, '${iterator.id}')">Delete</button></div>`
        const rows = [[
            ID,
            title,
            category,
            picture,
            comment,
            like,
            date,
            status,
            actions
        ]];

        for (const row of rows) {
            const tr = document.createElement("tr");
            tr.dataset.position = counter;
            for (const cell of row) {
                const td = document.createElement("td");
                td.innerHTML = cell
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        counter++;
    }
};


// Reports Table body HTML

function reportsBody(tbody, data) {
    let counter = 1;
    for (const iterator of data) {
        let orderId = iterator.orderId;
        let ID =
            '<table class="w-50"> ' +
            '        <tr class="text-center" style="height: 50%;">' +
            '            <td>' +
            counter +
            '</td>' +
            '        </tr>' +
            '</table>';

        let orderDetails =
            '<table class="w-100 customDetailsTable">' +
            '<tr><th>Business Name: ' +
            (iterator.businessName || 'N/A') +
            '</th>' +
            '</tr>' +
            '<tr><th>Order ID: ' +
            iterator.orderId +
            '</th>' +
            '</tr>' +
            '</table>';

        let appliedOn =
            '<table class="w-100 customDetailsTable">' +
            '<tr><th>' +
            checkDataFormatInOrderDetails(iterator.paymentTime) +
            '</th>' +
            '</tr>' +
            '</table>'

        let netAmount =
            '<table class="w-100 customDetailsTable">' +
            '<tr><th>$' +
            iterator.amount +
            '</th>' +
            '</tr>' +
            '</table>';

        const statusKind = {
            0: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6 11.8L6.45 9.65C6.26667 9.46667 6.03333 9.375 5.75 9.375C5.46667 9.375 5.23333 9.46667 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.1 14.1 8.33333 14.2 8.6 14.2C8.86667 14.2 9.1 14.1 9.3 13.9L14.95 8.25C15.1333 8.06667 15.225 7.83333 15.225 7.55C15.225 7.26667 15.1333 7.03333 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20Z" fill="#05A656"/>
                    </svg>`,
            1: `<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.77539 13.8809V9.78906C3.49935 9.42448 2.56185 8.87435 1.96289 8.13867C1.37044 7.39648 1.07422 6.49805 1.07422 5.44336C1.07422 4.37565 1.40951 3.48047 2.08008 2.75781C2.75716 2.02865 3.6556 1.60872 4.77539 1.49805V0.53125H6.19141V1.49805C7.22656 1.62174 8.05013 1.97656 8.66211 2.5625C9.27409 3.14193 9.66471 3.91992 9.83398 4.89648L7.36328 5.21875C7.21354 4.45052 6.82292 3.92969 6.19141 3.65625V7.47461C7.75391 7.89779 8.81836 8.44792 9.38477 9.125C9.95117 9.79557 10.2344 10.6582 10.2344 11.7129C10.2344 12.8913 9.8763 13.8841 9.16016 14.6914C8.45052 15.4987 7.46094 15.9935 6.19141 16.1758V18.002H4.77539V16.2246C3.64909 16.0879 2.73438 15.668 2.03125 14.9648C1.32812 14.2617 0.878906 13.2689 0.683594 11.9863L3.23242 11.7129C3.33659 12.2337 3.5319 12.6829 3.81836 13.0605C4.10482 13.4382 4.42383 13.7116 4.77539 13.8809ZM4.77539 3.62695C4.39128 3.75716 4.08529 3.97852 3.85742 4.29102C3.62956 4.60352 3.51562 4.94857 3.51562 5.32617C3.51562 5.67122 3.61979 5.99349 3.82812 6.29297C4.03646 6.58594 4.35221 6.82357 4.77539 7.00586V3.62695ZM6.19141 14.0176C6.67969 13.9264 7.07682 13.7018 7.38281 13.3438C7.6888 12.9792 7.8418 12.5527 7.8418 12.0645C7.8418 11.6283 7.71159 11.2539 7.45117 10.9414C7.19727 10.6224 6.77734 10.3783 6.19141 10.209V14.0176Z" fill="#0B4777"/>
                    </svg>`,
            2: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14 11H6C5.45 11 5 10.55 5 10C5 9.45 5.45 9 6 9H14C14.55 9 15 9.45 15 10C15 10.55 14.55 11 14 11Z" fill="#F93154"/>
                    </svg>`,
            3: `<i class="fa fa-gavel" style='color: var(--color-s)' aria-hidden="true">`
        };


        let status = iterator.permitStaus ? statusKind[iterator.permitStaus]
            : `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.6 11.8L6.45 9.65C6.26667 9.46667 6.03333 9.375 5.75 9.375C5.46667 9.375 5.23333 9.46667 5.05 9.65C4.86667 9.83333 4.775 10.0667 4.775 10.35C4.775 10.6333 4.86667 10.8667 5.05 11.05L7.9 13.9C8.1 14.1 8.33333 14.2 8.6 14.2C8.86667 14.2 9.1 14.1 9.3 13.9L14.95 8.25C15.1333 8.06667 15.225 7.83333 15.225 7.55C15.225 7.26667 15.1333 7.03333 14.95 6.85C14.7667 6.66667 14.5333 6.575 14.25 6.575C13.9667 6.575 13.7333 6.66667 13.55 6.85L8.6 11.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20Z" fill="#05A656"/>
                    </svg>`;

        let actions = '' +
            `<button type='button' class='actionBtn details' data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getOrderDetails('${orderId}')" title='Details' data-content='Some content inside the popover'>` +
            `<i class='fas fa-info-circle'></i>` +
            'Details' +
            `</button>`;

        const rows = [[
            ID,
            orderDetails,
            appliedOn,
            netAmount,
            status,
            actions
        ]];

        for (const row of rows) {
            const tr = document.createElement("tr");
            for (const cell of row) {
                const td = document.createElement("td");
                td.innerHTML = cell
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        counter++;
    }
};

//  Email Templates Table body HTML

function templateBody(tbody, data, tableId) {
    for (const iterator of data) {
        const rows = [[
            iterator.title,
            '2290 Online Form',
            `<div class="active-status">Active</div>`,
            `<a href='${domain}/2290onlineform/${tableId === 'messageTemplateTable' ? 'messageTemplates' : 'emailTemplates'}/template?id=${iterator.id}'>` +
            `<button type='button' class='actionBtn edit-btn'>` +
            'Edit' +
            `</button>` +
            `</a>`

        ]];
        for (const row of rows) {
            const tr = document.createElement("tr");
            for (const cell of row) {
                const td = document.createElement("td");
                td.innerHTML = cell
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }
};

// Businesses Table body HTML

function businessesBody(tbody, data) {
    let counter = 1;
    for (const iterator of data) {
        const rows = [[
            counter,
            `${iterator.ein.substring(0, 2)}-${iterator.ein.substring(2)}`,
            iterator.name,
            iterator.address + ', ' + iterator.state.abbreviation + ' ' + iterator.zip,
            `<button type='button' class='actionBtn details' onclick="getBusinessDetails('${iterator.id}', '${iterator.user.id}')" title='Details' data-content='Some content inside the popover'>` +
            `<i class='fas fa-info-circle'></i>` +
            'See Business Details' +
            `</button>`

        ]];
        for (const row of rows) {
            const tr = document.createElement("tr");
            for (const cell of row) {
                const td = document.createElement("td");
                td.innerHTML = cell
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        counter++;
    }
};

// Clients Table body HTML

function clientsBody(tbody, data) {
    let counter = 1;
    for (const iterator of data) {
        const rows = [[
            counter,
            iterator.displayName,
            iterator.email,
            (iterator.phoneNumber ? iterator.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A'),
            "<svg width=\"32\" height=\"33\" viewBox=\"0 0 32 33\" class='mr-10' fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "                <path d=\"M31.3335 22.6747L24.6668 29.3413L20.0002 24.6747L22.0002 22.6747L24.6668 25.3413L29.3335 20.6747L31.3335 22.6747ZM8.00016 2.67466C6.52016 2.67466 5.3335 3.86133 5.3335 5.34133V26.6747C5.3335 28.1547 6.52016 29.3413 8.00016 29.3413H18.4135C17.7068 28.128 17.3335 26.7413 17.3335 25.3413C17.3335 20.928 20.9202 17.3413 25.3335 17.3413C25.7868 17.3413 26.2268 17.3813 26.6668 17.448V10.6747L18.6668 2.67466M17.3335 4.67466L24.6668 12.008H17.3335V4.67466Z\" fill=\"#F59720\"/>\n" +
            "            </svg>" + iterator.orderCount,
            `<a href='${domain}/2290onlineform/client/orders.php?id=${iterator.id}'>` +
            `<button type='button' class='actionBtn details mb-2' data-bs-toggle="modal" data-bs-target="#exampleModal" title='Details' data-content='Some content inside the popover'>` +
            `<i class='fas fa-info-circle'></i>` +
            'See Client Orders' +
            `</button>` +
            `</a>` +
            // Notes
            `<a href='${domain}/2290onlineform/client/businesses.php?id=${iterator.id}'>` +
            `<button class="actionBtn notesBtn mb-2" >` +
            `<i class='fas fa-info-circle'></i>` +
            'See Client Businesses' +
            `</button>` +
            `</a>` +
            // Busines
            `<a href='${domain}/2290onlineform/client/vehicles.php?id=${iterator.id}'>` +
            `<button class="actionBtn mb-2" style="background-color:#FFBF00;" >` +
            `<i class='fas fa-info-circle'></i>` +
            'See Client Vehicles' +
            `</button>` +
            `</a>` +
            `<button class="actionBtn bg-s" onclick='openNewFormModal(event)' data-id='${iterator.id}' data-user='${JSON.stringify({
                customerName: iterator.displayName,
                customerEmail: iterator.email,
                phone: iterator.phoneNumber
            })}' >` +
            '+ Fill New Form ' +
            `</button>`
        ]];
        for (const row of rows) {
            const tr = document.createElement("tr");
            for (const cell of row) {
                const td = document.createElement("td");
                td.innerHTML = cell
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        counter++;
    }
};

// Orders Table tbody HTML

function ordersBody(tbody, data) {
    let counter = 1;
    for (const iterator of data) {
        let orderId = iterator.orderId;
        let ID =
            '<table class="w-50"> ' +
            '        <tr class="text-center" style="height: 50%;">' +
            '            <td>' +
            counter +
            '</td>' +
            '        </tr>' +
            '</table>';


        let orderDetails =
            '<table class="w-100 customDetailsTable">' +
            '</tr>' +
            '<tr><th>Order ID: ' +
            iterator.orderId +
            '</th>' +
            '</tr>' +
            '<tr><th class="text-nowrap">Date / Time: ' +
            checkDataFormatInOrderDetails(iterator.date) +
            '</th>' +

            '</table>';

        let companyInfo =
            '<table class="w-100 customDetailsTable">' +
            '<tr><th>Ein: ' +
            (iterator.ein ? iterator.ein.replace(/^(\d{2})(\d{7})$/, '$1-$2') : 'N/A') +
            '</th>' +
            '</tr>' +
            '<tr><th>Business Name: ' +
            (iterator.businessName ? iterator.businessName : 'N/A') +
            '</th>' +
            '</tr>' +
            '<tr><th>Address: ' +
            (iterator.address ? iterator.address : 'N/A') +
            '</th>' +
            '</tr>' +
            '</table>';


        let contactInfo =
            '<table class="w-100 customDetailsTable">' +
            '<tr><th>Name: ' +
            iterator.name +
            '</th>' +
            '</tr>' +
            '<tr><th>Phone: ' +
            (iterator.phone ? iterator.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A') +
            '</th>' +
            '</tr>' +
            '<tr><th>Email: ' +
            iterator.email +
            '</th>' +
            '</tr>' +
            '</table>';

        let status = '';
        if (iterator.status == '1') {
            status = ' ' +
                '<div class="statusBtn completed ' + (iterator.permit && iterator.permit.permitKind !== '0' ? 'd-none' : '') + '" id="statusBtn">' +
                '<i class=\'fas fa-check-circle\'></i> ' +
                'Completed' +
                '</div>';
        } else if (iterator.status == '0') {
            status = ' <div class="statusBtn pending ' + (iterator.permit && iterator.permit.permitKind !== '0' ? 'd-none' : '') + '" id="statusBtn"><i class=\'fas fa-check-circle\'></i> Pending </div>'
        } else if (iterator.status == '-2') {
            status = '<div class="statusBtn incomplete ' + (iterator.permit && iterator.permit.permitKind !== '0' ? 'd-none' : '') + '" id="statusBtn"><i class=\'fas fa-times-circle\'></i>\n' +
                '            Form declined\n' +
                '</div>';
        } else {
            status = '<div class="statusBtn incomplete ' + (iterator.permit && iterator.permit.permitKind !== '0' ? 'd-none' : '') + '" id="statusBtn"><i class=\'fas fa-times-circle\'></i>\n' +
                '            Incomplete\n' +
                '</div>';
        }

        const permitKind = iterator.permit ? (
            {
                0: '',
                1: `<div class=\'statusBtn refundButton pointer\' id="permitActionBtn" data-bs-toggle="modal" data-bs-target="#permitActionModal" onclick='getPermitActionDetails(${JSON.stringify({
                        ...iterator.permit,
                        permitNote: escapeHtml(iterator.permit.permitNote)
                    })})'` +
                    '> <i class="fa fa-dollar mr-1"></i> Refunded </div>',
                2: `<div class=\'statusBtn voidButton pointer\' id="permitActionBtn" data-bs-toggle="modal" data-bs-target="#permitActionModal" onclick='getPermitActionDetails(${JSON.stringify({
                    ...iterator.permit,
                    permitNote: escapeHtml(iterator.permit.permitNote)
                })})'> <i class="fa fa-minus-circle mr-1" aria-hidden="true"></i> Voided </div>`,
                3: `<div class=\'statusBtn disputeButton pointer\' id="permitActionBtn" data-bs-toggle="modal" data-bs-target="#permitActionModal" onclick='getPermitActionDetails(${JSON.stringify({
                    ...iterator.permit,
                    permitNote: escapeHtml(iterator.permit.permitNote)
                })})'> <i class="fa fa-gavel" aria-hidden="true"></i> Charged Back </div>`
            }
        ) : null;


        status += `<div class='actionType' data-orderId='${orderId}'>` +
            (iterator.permit ? permitKind[iterator.permit.permitKind] : '') +
            ' </div>';

        if (iterator.isFormError) {
            const escapedListFormError = iterator.listFormError.map(error => ({
                ...error,
                errorMessageText: escapeHtml(error.errorMessageText)
            }));
            status += `<div class=\'errorListBtn statusBtn voidButton mt-1 pointer\'  data-bs-toggle="modal" data-bs-target="#businessModal" data-orderId="${iterator.orderId}" data-status="${iterator.status}" onclick='getListFormError(this.dataset.status, "${iterator.orderId}", ${JSON.stringify(escapedListFormError)})'` +
                '> <i class=\'fas fa-times-circle\'></i> Error List </div>'
        }


        // let payment = ' <button class=\'btn-success p-1 w-50 br_8\'><i class=\'fas fa-check-circle\'></i></button>';

        let payment = '';
        if (iterator.paymentStatus == '1') {
            payment = '<div class=\'paymentBtn completed\'><i class=\'fas fa-check-circle\'></i></div>';
        } else if (iterator.paymentStatus == '0') {
            payment = '<div class=\'paymentBtn pending\'><i class=\'fas fa-check-circle\'></i></div>';
        } else {
            payment = '<div class=\'paymentBtn incomplete\'><i class=\'fas fa-times-circle\'></i></div>';
        }


        /**
         * Details , Notes
         */



        let actions = '' +
            `<button type='button' class='actionBtn details' data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getOrderDetails('${orderId}')" title='Details' data-content='Some content inside the popover'>` +
            `<i class='fas fa-info-circle'></i>` +
            'Details' +
            `</button>` +
            // Notes
            `<button type='button' class="actionBtn notesBtn ${iterator.isFormNote ? 'hasNote' : ''}" data-orderId='${orderId}' onclick="getNoteDetails('${orderId}')" title='Notes' data-content='Some content inside the popover'>` +
            `<i class="fas fa-plus"></i>` +
            'Notes' +
            `</button>`;

        const rows = [[
            ID,
            orderDetails,
            contactInfo,
            companyInfo,
            status,
            payment,
            actions
        ]];

        for (const row of rows) {
            const tr = document.createElement("tr");
            for (const cell of row) {
                const td = document.createElement("td");
                td.innerHTML = cell
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        counter++;
    }
};

/**
 * check length Date in  {Order Details}
 */
function checkDataFormatInOrderDetails(date) {
    const dateObj = new Date(date);
    const formattedDate = `${dateObj.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    })} ${dateObj.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})}`;
    return formattedDate.toLowerCase();
}

function getAndDisplaySelectedData(props) {
    loaderBlock.style.display = 'flex';
    const tableContainer = document.querySelector('.table-container');
    const tableId = tableContainer.querySelector('table').getAttribute('id');
    const tablesIdObj = {
        ordersTable: {url: orderGetAllOrder, listName: 'listOrder'},
        clientOrdersTable: {url: orderGetAllOrder, listName: 'listOrder'},
        clientsTable: {url: getAllClient, listName: 'listUserDTO'},
        businessesTable: {url: getAllBusinessesByUserId, listName: 'listBusinessDTO'},
        reportsTable: {url: getSalesReports, listName: 'listOrder'},
        postsTable: {url: getAllPosts, listName: 'listNewsDTO'},
        servicesTable: {url: getAllServices, listName: ''},
        emailTemplateTable: {url: getAllEmailTemplates, listName: ''},
        messageTemplateTable: {url: getAllMessageTemplates, listName: ''}
    }
    const tableByGetRequest = ['emailTemplateTable', 'messageTemplateTable', 'servicesTable'];
    let url = `${url2290onlineForm}${tablesIdObj[tableId].url}`;
    if (!tableByGetRequest.includes(tableId)) {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        const paymentStatus = tableId === 'ordersTable' ? document.getElementById('selectPaymentStatusOrder').value : null;
        const searchValue = document.getElementById('searchValue')?.value;
        // const searchValue = document.getElementById('searchValue')?.getAttribute('value');
        const sort = document.getElementById('sortBy')?.getAttribute('sortBy');
        const descending = document.getElementById('sortBy')?.getAttribute('descending');
        const pageSize = document.getElementById('showEntriesBlock')?.getAttribute('pageSize');
        if (!pageSize) {
            const firstEntryQtyEl = document.querySelector('.entryQty[data-count="10"]');
            firstEntryQtyEl ? firstEntryQtyEl.className = 'entryQtyActive' : null;
        }
        // if(searchValue) {
        //     const searchBlock = document.getElementById('search');
        //     searchBlock.innerHTML += `
        //         <div class="clear-btn">
        //             <svg class="svg-icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1024 102.4L921.6 0 512 409.6 102.4 0 0 102.4l409.6 409.6L0 921.6 102.4 1024l409.6-409.6L921.6 1024l102.4-102.4-409.6-409.6z"  /></svg>
        //         </div>`;
        // }
        post(url, {
            "search": searchValue || '',
            "sort": sort || '',
            ...(tableId === 'ordersTable' ? {
                "paymentStatus": paymentStatus || '',
            } : {
                userId: userId || ''
            }),
            "pageSize": pageSize || 10,
            "page": props?.page || 1,
            "descending": descending || true,
            ...(tableId === 'reportsTable' && {
                timePeriod: urlParams.get('period'),
                startDate: urlParams.get('start'),
                endDate: urlParams.get('end')
            })
        }, TOKEN_AUTH_FOR_API).then((data) => {
            //data  == Response
            tb(data[tablesIdObj[tableId].listName]);
            displayPagination({...data, tableId})
            if (tableId === 'reportsTable') {
                document.getElementById('timeText').innerText = data.timePeriod;
                document.getElementById('sumAmount').innerText = `$${Number(data.sumAmount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
            }
            ;
        });
    } else {
        get(url, null, TOKEN_AUTH_FOR_API)
            .then(res => {
                tb(res);
            })
    }

    function tb(res) {
        const dataTable = new CustomDataTable(tableId, res);

        /**
         * Show entries functionality Clear Data in DataTable {ordersTable}
         */
        const blockOrdersTable = document.querySelector(`#${tableId}`);
        const tbodyList = blockOrdersTable.querySelectorAll("tbody");

        if (pageSizeGlobal || pageGlobal) {
            tbodyList.forEach((tbody) => {
                tbody.innerHTML = "";
            });
            dataTable.render();
        } else {
            dataTable.render();
        }
        loaderBlock.style.display = 'none';
    };

};

function displayPagination(data) {
    let pageOrders = Number(data['page']);
    let pageSizeOrders = data['pageSize'];
    let totalOrders = data['total'];
    let totalPages = data['totalPages'];

    renderPagination(data.tableId, totalPages, pageOrders, maxButtons);
    blockCountResponseInIp.innerHTML = totalOrders;
    blockPageSizeStart.innerHTML = totalOrders == '0' ? 0 : (pageOrders - 1) * pageSizeOrders + 1;
    blockPageSizeEnd.innerHTML = pageOrders * pageSizeOrders <= totalOrders ? pageOrders * pageSizeOrders : totalOrders;
};


/**
 * GET MENU ACTIVE CLASS FOR ACCESS REQUEST IN API THIS PAGE  `Orders And All Permits`
 **/
const blockButtons = ['ordersButton', 'clientsButton', 'servicesButton'];
if (blockButtons.some(buttonId => document.querySelector(`#${buttonId}`).classList.contains('active'))) {
    getAndDisplaySelectedData();
}
;

/**
 * Render  Pagination
 */
function renderPagination(tableId, totalPages, currentPage, maxButtons) {
    let pagination = generateSmartPagination(totalPages, currentPage, maxButtons);
    let paginationContainer = document.getElementById('paginationContainer');
    let selectedButton = null;
    // Clear previous pagination buttons
    paginationContainer.innerHTML = '';
    // Render pagination buttons
    pagination.forEach((page) => {
        if (typeof page === 'object') {
            // Render button using button.text, button.page, button.className, button.id
            let button = document.createElement('button');
            button.textContent = page.text;
            button.className = page.className;
            button.id = page.id;

            button.addEventListener('click', () => {
                currentPage = page.page;
                button.disabled = true;
                getAndDisplaySelectedData({page: currentPage})
            });
            paginationContainer.appendChild(button);
        } else {
            let button = document.createElement('button');
            button.textContent = page;
            button.className = page === currentPage ? 'pageSelectedActive' : button.innerHTML === '...' ? 'pageSelectedInActive disabled' : 'pageSelectedInActive';
            button.addEventListener('click', () => {
                currentPage = page;
                getAndDisplaySelectedData({page})
                // Update the selected button class
                if (selectedButton !== null) {
                    selectedButton.classList.remove('pageSelectedActive');
                    selectedButton.classList.add('pageSelectedInActive');
                }
                button.classList.add('pageSelectedActive');
                selectedButton = button;
            });
            paginationContainer.appendChild(button);
        }
    });
}

/**
 * Smart Calculation for Pagination
 */
function generateSmartPagination(totalPages, currentPage, maxButtons) {
    const pagination = [];

    let startPage = 1;
    let endPage = totalPages;

    // Calculate start and end pages based on current page and maximum buttons
    if (totalPages > maxButtons) {
        const halfButtons = Math.floor(maxButtons / 2);
        if (currentPage > halfButtons) {
            startPage = currentPage - halfButtons;
            if (currentPage > totalPages - halfButtons) {
                startPage = totalPages - maxButtons + 1;
            }
        }
        endPage = startPage + maxButtons - 1;
    }

    // Add first page and ellipsis if necessary
    if (startPage > 1) {
        pagination.push(1);
        if (startPage > 2) {
            pagination.push('...');
        }
    }

    // Add page numbers within the range
    for (let page = startPage; page <= endPage; page++) {
        pagination.push(page);
    }

    // Add last page and ellipsis if necessary
    if (endPage < Number(totalPages)) {
        if (endPage < Number(totalPages) - 1) {
            pagination.push('...');
        }
        pagination.push(Number(totalPages));
    }

    // Add "Previous" button if not on the first page
    if (currentPage > 1) {
        addPreviousButton(pagination, currentPage);
    }

    // Add "Next" button if not on the last page
    if (currentPage < Number(totalPages)) {
        addNextButton(pagination, currentPage);
    }

    return pagination;
}

/**
 * Function to add "Previous" button
 */
function addPreviousButton(pagination, currentPage) {
    pagination.unshift({
        text: 'Previous',
        page: currentPage - 1,
        className: 'customPrevious',
        id: 'customPrevious'
    });
}

/**
 * Function to add "Next" button
 */
function addNextButton(pagination, currentPage) {
    pagination.push({
        text: 'Next',
        page: currentPage + 1,
        className: 'customNext',
        id: 'customNext'
    });
}

/**
 * Show Entries function
 */
function showEntriesGroup(el) {
    let pageSize = el.dataset.count;
    document.getElementById('showEntriesBlock').setAttribute('pageSize', pageSize);
    entriesElements.forEach(function (element) {
        element === el ? addClassListPaginator(element) : removeClassListPaginator(element);
    });
    getAndDisplaySelectedData()
}

/**
 * START ADD after REMOVE Class in Paginator Button
 */
function addClassListPaginator(element) {
    element.classList.remove('entryQty');
    element.classList.add('entryQtyActive');
}

/**
 * START REMOVE after ADD Class in Paginator Button
 */
function removeClassListPaginator(element) {
    element.classList.add('entryQty');
    element.classList.remove('entryQtyActive');
}


/**
 * Filter PaymentStatus
 */
function changePaymentStatus(value) {
    paymentStatusForChange = value;
    getAndDisplaySelectedData();

};

function searchDataHandle() {
    const searchInput = document.getElementById('searchValue');
    searchInput.setAttribute('value', searchInput.value);
    const searchBlock = document.getElementById('search');
    // searchBlock.innerHTML += `
    //     <div class="clear-btn">
    //         <svg class="svg-icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1024 102.4L921.6 0 512 409.6 102.4 0 0 102.4l409.6 409.6L0 921.6 102.4 1024l409.6-409.6L921.6 1024l102.4-102.4-409.6-409.6z"  /></svg>
    //     </div>`;
    getAndDisplaySelectedData();
    return false;
};
// const searchInput = document.getElementById('searchValue');
// if(searchInput) {
//     console.log('ENter!')
//     const debounce = (fn, delay = 1000) => {
//         let timerId = null;
//         return (...args) => {
//             clearTimeout(timerId);
//             timerId = setTimeout(() => fn(...args), delay);
//         };
//     };
//     const onInput = debounce(getAndDisplaySelectedData, 500);
//
//     searchInput.addEventListener("input", (e) => {
//         console.log(e.target.value, '--')
//         onInput(e.target.value);
//     });
// }


/**
 * Sorting in All column
 */
function sortingOrdersTable(sortBy, e) {
    const parentEl = document.getElementById('sortBy');
    const tableId = parentEl.closest('table').getAttribute('id');
    const sortAscDescButtonBlock = document.querySelectorAll('.sortAscDescButton');
    sortAscDescButtonBlock.forEach(function (el) {
        if (el != e) {
            el.classList.remove('active', 'active-asc');
        }
    });

    const previousSortBy = document.getElementById('sortBy').getAttribute('sortBy');
    if (sortBy === previousSortBy && !e.classList.contains("active-asc")) {
        e.classList.add('active', 'active-asc');
        parentEl.setAttribute('descending', false);
    } else {
        e.classList.add('active');
        e.classList.remove('active-asc');
        parentEl.setAttribute('sortBy', sortBy);
        parentEl.setAttribute('descending', true);
    }
    getAndDisplaySelectedData();
}

