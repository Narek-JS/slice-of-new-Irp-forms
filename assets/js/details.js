const blockOrderPermitDetails = document.getElementById('exampleModal');
const blockBusinessDetails = document.getElementById('businessModal');
let blockNoteDetails = document.getElementById('noteModal');
let domain =  document.querySelector('#domain_path')?.value;
let orderDetails;

tokenAuthentication = document.cookie
    .split('; ')
    .find(row => row.startsWith('tokenApi='))
    .split('=')[1];

const TOKEN_AUTH_FOR_API = tokenAuthentication;

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&#039;',
        "'": '&#039;'
    };

    return text?.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
};


/**
 * Function to handle order details
 */
async function getOrderDetails(orderId) {
    const blockLoader = blockOrderPermitDetails.querySelector('#blockLoader');
    blockLoader.style.display = 'flex';
    const result = await get(`${url2290onlineForm}${OrderGetOrderDetail}`, {orderId}, TOKEN_AUTH_FOR_API);
    orderDetails = result;
    const backResponse = await ajaxRequest(`${backUrl2290onlineForm}`, `${sendBackDetails}`, 'POST', result, '', 'viewDetails', orderId);
    blockLoader.style.display = 'none';
    return blockOrderPermitDetails.querySelector('#content').innerHTML = backResponse;
}

/**
 * Function to handle adding notes
 */


//Business Details

async function getBusinessDetails(id, userId, hasParams) {
    const blockBusinessDetails = document.getElementById('businessModal');
    blockBusinessDetails.style.display = 'flex';
    const blockLoader = blockBusinessDetails.querySelector('#blockLoader');
    blockLoader.style.display = 'flex';
    const data = {
        userId
    }
    const result = hasParams ? orderDetails.business : await get(`${url2290onlineForm}/Business/GetBusinessByIdAdmin/${id}`, data, TOKEN_AUTH_FOR_API);
    const backResponse = await ajaxRequest(`${backUrl2290onlineForm}`, `${sendBackDetails}`, 'POST', result, '', 'viewBusinessDetails', data);
    blockLoader.style.display = 'none';
    return blockBusinessDetails.querySelector('#content').innerHTML = backResponse;
};


async function getNoteDetails(orderId, hasParams) {
    const blockNoteDetails = blockOrderPermitDetails.classList.contains('show') ? document.getElementById('notePermitModal') : document.getElementById('noteModal');
    blockNoteDetails.style.display = 'flex';
    const blockLoader = blockNoteDetails.querySelector('#blockLoader');
    blockLoader.style.display = 'flex';
    const orderData = !hasParams && await get(`${url2290onlineForm}${OrderGetOrderDetail}`, {orderId}, TOKEN_AUTH_FOR_API);
    // const notesData = await get(`${url2290onlineForm}/FormNote/GetAllWithOrderIdFormNote?OrderId=${orderId}`, null, TOKEN_AUTH_FOR_API);
    const result = hasParams ? orderDetails : orderData;
    const backResponse = await ajaxRequest(`${backUrl2290onlineForm}`, `${sendBackDetails}`, 'POST', result, TOKEN_AUTH_FOR_API, 'viewNoteDetails', orderId);
    blockLoader.style.display = 'none';
    return blockNoteDetails.querySelector('#content').innerHTML = backResponse;
};


function addNote(agentsId, agentName, orderId) {
    const blockNoteDetails = blockOrderPermitDetails.classList.contains('show') ? document.getElementById('notePermitModal') : document.getElementById('noteModal');
    const textarea = blockNoteDetails.querySelector('#note');
    if (textarea.value.trim() === '') {
        textarea.style.border = '1px solid red';
        return; // Exit the function if textarea is empty
    }
    // Call your function to set the value here
    // For example, assuming you have a function called 'setValue'
    // that takes the textarea value as a parameter
    post(`${url2290onlineForm}/FormNote/AddFormNote`, {
        id: orderId,
        description: textarea.value,
        agentsId,
        orderId
    }, TOKEN_AUTH_FOR_API)
        .then(res => {
            if (res.success) {
                const noteList = blockNoteDetails.querySelector("#notesList");
                const noteCount = noteList.getElementsByClassName("nth-note").length;
                const noteItem = document.createElement("div");
                noteItem.className = "nth-note";
                noteItem.innerHTML = `
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.1065 2.66669C8.68762 2.66669 2.6665 8.68781 2.6665 16.1067C2.6665 23.5256 8.68762 29.5467 16.1065 29.5467C23.5254 29.5467 29.5465 23.5256 29.5465 16.1067C29.5465 8.68781 23.5254 2.66669 16.1065 2.66669ZM16.1065 8.04269C18.7004 8.04269 20.8105 10.1528 20.8105 12.7467C20.8105 15.3406 18.7004 17.4507 16.1065 17.4507C13.5126 17.4507 11.4025 15.3406 11.4025 12.7467C11.4025 10.1528 13.5126 8.04269 16.1065 8.04269ZM16.1065 26.8587C13.3782 26.8587 10.1526 25.7566 7.85434 22.988C10.2085 21.1409 13.1142 20.1371 16.1065 20.1371C19.0988 20.1371 22.0045 21.1409 24.3587 22.988C22.0604 25.7566 18.8348 26.8587 16.1065 26.8587Z"
                            fill="#F59720"/>
                    </svg>
                    <div>
                        <h4 className="m-0">${agentName}</h4>
                        <p>${escapeHtml(textarea.value)}</p>
                        <p>Just now</p>
                    </div>
                    `;

                noteList.insertBefore(noteItem, noteList.firstChild);
                const noteCountElement = document.getElementById("noteCount");
                noteCountElement.innerText = noteCount + 1;
                textarea.value = '';
                const noteButtons = document.querySelectorAll(`.notesBtn[data-orderId="${orderId}"]`);
                noteButtons.forEach(item => {
                    if (!item.classList.contains('hasNote')) {
                        item.classList.add('hasNote');
                    }
                })
            }
        })


}

async function handleGeneratePDF(params) {
    const data = JSON.parse(params);
    const formPdf = document.querySelector('#contentContainer');
    const formInput = formPdf.querySelectorAll('input');
    let dataGeneration = {};
    formInput.forEach(input => {
        dataGeneration[input.getAttribute('data-field-name')] = input.value;
    })

    // let originalPdf = event.dataset.pdf_name;
    // let originalPdf = 'f8822_new';
    const originalPdf = `form-${data.orderId}`;
    // let folderName = event.dataset.folder_name;
    let folderName = data.form8822TypeId == '1' ? 'f8822' : 'f8822b';
    const result = await post('/2290onlineform/orders/pdf_generation.php',  {...dataGeneration, originalPdf, folderName});
    if(result) {
        const link = document.createElement("a");
        link.setAttribute('download', `${originalPdf}.pdf`);
        link.href = `${domain}/2290onlineform/assets/pdf/${folderName}/PDF_Generated/${originalPdf}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();

    }
    // const backResponse =  await ajaxRequest(`${backUrl2290onlineForm}`,`${sendBackDetails}`,'POST', result, TOKEN_AUTH_FOR_API,'viewNoteDetails', orderId);
}

async function sendInvoice (orderId) {
    const sendInvoiceBtn = document.getElementById('sendInvoiceBtn');
    sendInvoiceBtn.classList.add('disabled');
    await get(`${url2290onlineForm}/Order/SendInvoiceEmail?orderId=${orderId}`, null, TOKEN_AUTH_FOR_API)
        .then(res => {
            if(res.success) {
                const dateEl = document.getElementById('invoiceDate');
                dateEl.innerText = 'Email sent at ' + checkDataFormatInOrderDetails(res.result);
            }
        })
    sendInvoiceBtn.classList.remove('disabled');
}


function downloadFiles(vin, files) {
    const zip = new JSZip();
    // Loop through the files array and add them to the zip
    files.forEach(file => {
        zip.file(file.attachmentOrgName, file.attachmentBase64, {base64: true});
    });

    // // Generate the zip folder asynchronously
    zip.generateAsync({type: 'blob'})
        .then(function (content) {
            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `${vin}_files.zip`;
            link.click();
        });
}

async function open8822Pdf() {
    const {user, permit, payment, listFormNote, formStatus, business, service, ...params} = orderDetails;
    const result = await $.ajax({
        url: '../ajax_requests/index.php',
        type: 'POST',
        type: 'POST',
        data: {
            action: 'print_8822_pdf',
            params
        }
    });
    const pdf8822Modal = document.getElementById('pdf8822Modal');
    pdf8822Modal.querySelector('.modal-body').innerHTML += result;
    pdf8822Modal.style.display = 'flex';
}

function hideModal(id) {
    let modal = document.getElementById(id);
    if(id === 'noteModal' && blockOrderPermitDetails.classList.contains('show')) {
        modal = document.getElementById('notePermitModal');
    }
    // modal.innerHTML = '';
    modal.style.display = 'none';
};

async function getPermitActionDetails (result) {
    const blockPermitActionDetails = document.getElementById('permitActionModal');
    const blockLoader = blockPermitActionDetails.querySelector('#blockLoader');
    blockLoader.style.display = 'flex';
    const backResponse = await ajaxRequest(`${backUrl2290onlineForm}`, `${sendBackDetails}`, 'POST', result, TOKEN_AUTH_FOR_API, 'viewPermitActionDetails', result.orderId);
    blockLoader.style.display = 'none';
    return blockPermitActionDetails.querySelector('#content').innerHTML = backResponse;
};
async function getListFormError (status, orderId, listFormError) {
    const blockFormErrorDetails = document.getElementById('businessModal');
    blockFormErrorDetails.classList.add('formErrorListModal');
    const blockLoader = blockFormErrorDetails.querySelector('#blockLoader');
    blockLoader.style.display = 'flex';
    const backResponse = await ajaxRequest(`${backUrl2290onlineForm}`, `${sendBackDetails}`, 'POST', {listFormError, status}, TOKEN_AUTH_FOR_API, 'viewListFormError', orderId);
    blockLoader.style.display = 'none';
    blockFormErrorDetails.classList.remove('formErrorListModal');
    return blockFormErrorDetails.querySelector('#content').innerHTML = backResponse;
};

function handleAllowEdit (event, orderId) {
    get(`${url2290onlineForm}/General/RejectForm?orderId=${orderId}`, null, TOKEN_AUTH_FOR_API)
        .then(res => {
            if(res.success) {
                const acceptedEl = document.createElement('p');
                acceptedEl.innerText = 'You have allowed the customer to edit.';
                acceptedEl.classList.add('success-message');
                event.target.parentNode.insertBefore(acceptedEl, event.target.nextSibling);
                event.target.remove();
                const errorListBtn = document.querySelector(`.errorListBtn[data-orderId="${orderId}"]`);
                errorListBtn.dataset.status = '-2';
            }
        })
}

async function openServiceDetails(target, data) {
    let service = data;
    hideServiceDetails();
    const trBlock = target.closest('tr');
    const trPosition = trBlock.dataset.position;
    trBlock.style.display = 'none';
    const detailsTr = document.createElement('tr');
    detailsTr.classList.add('details-tr');
    if(trBlock.dataset.updated ) {
        detailsTr.innerHTML = `<div id="blockLoader" style="display: flex;" class='loader'>
                      <div class="lds-hourglass"></div>
                   </div>`;

        await get(`${url2290onlineForm}/Service/GetByIdService/${data.id}`, null, TOKEN_AUTH_FOR_API)
            .then(res => {
                service = res;
            })
    }
    detailsTr.innerHTML = `
    <td colspan="2">
            <div class="d-flex flex-column justify-content-between gap-5 h-100">
                <input type="text" id="servicePrice" placeholder="Enter form price title" value='${service.ServicePrice.price}' />
                <input type="text" id="serviceTitle" placeholder="Enter form title" value='${service.title}' />
                <div class="d-flex w-100 justify-content-between">
                    <button class=" active-status actionBtn m-0" style="width: 150px; height: 38px;"
                        onclick='handleEditService(${JSON.stringify(service)}, ${trPosition})'
                    >Save Changes</button>
                    <button class="actionBtn details m-0" style="width: 150px; height: 38px;" onclick="hideServiceDetails();">Cancel</button>
                </div>
            </div>
        </td>
        <td>
            <label class="d-flex flex-column justify-content-between gap-5 h-100">
        <input id="uploadPostImage" type="file"  onchange="uploadImage(event, 'uploadedServiceImage')"  class="d-none"/>
         <div class="position-relative service-img" style="width: 320px; height: 158px;">
            <div class="service-backdrop"></div>
            <img id="uploadedServiceImage" src="data:image/png;base64,${service.imageBase64}" style="width: 100%; height: 100%" />
        </div>
            <div class="btn add-btn" style="width: 320px;">Place Image</div>
            </label>
        </td>
        <td colspan="2" style="padding-left: 40px;">
         <div class='nth-service h-100'>
                <div class='bg-image' style="background-image: url('data:image/png;base64,${service.imageBase64}'); width: 100%; height: 158px; overflow: initial;">
                    <div class='service-backdrop'>
                        <h2 class='cost'>$${service.ServicePrice.price}</h2>
                        <div class='animated-div'></div>
                    </div>
                    <div class='service-icon'>
                        <img src='data:image/svg+xml;base64,${service.iconBase64}' alt='Service' width="80" height="80"/>
                    </div>
                </div>
                <h2 class='service-title'>${service.title}</h2>
                <div class='read-more'>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_391_8485)">
                        <circle cx="16" cy="16" r="16" fill="#F59720"/>
                        <path d="M11 9L21 16.3043L11 23" stroke="#FDFDFF" stroke-width="3" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_391_8485">
                        <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <span>File Now</span>
                </div>
            </div>
        </td>`
    trBlock.parentNode.insertBefore(detailsTr, trBlock.nextSibling);
};

function hideServiceDetails () {
    const serviceTableBlock = document.getElementById('servicesTable');
    const linesInTable = serviceTableBlock.querySelectorAll('tr');
    linesInTable.forEach(tr => {
        if(tr.style.display === 'none') {
            tr.style.display = 'table-row';
        }else if(tr.classList.contains('details-tr')) {
            tr.remove();
        }
    })
};

function handleEditService (service, editingPosition) {
    const trBlock = document.querySelector(`tr[data-position="${editingPosition}"]`);
    let isValid = true;
    const priceBlock = document.getElementById('servicePrice');
    const titleBlock = document.getElementById('serviceTitle');
    const imageBase64 = document.getElementById('uploadedServiceImage').src.split(',')[1];
    [priceBlock, titleBlock].forEach(input => {
        if(!input.value) {
            input.classList.add('error');
            isValid = false;
        }else {
            input.classList.remove('error');
        }
    });
    if(isValid) {
        post(`${url2290onlineForm}/Service/EditService`, {
            ...service,
            title: titleBlock.value,
            imageBase64,
            ServicePrice: {
                ...service.ServicePrice,
                price: priceBlock.value
            }
        }, TOKEN_AUTH_FOR_API)
            .then(res => {
                if(res.success) {
                    const priceTd = trBlock.querySelector('#priceTd');
                    const titleTd = trBlock.querySelector('#titleTd');
                    const serviceImg = trBlock.querySelector('#serviceImg');
                    priceTd.innerText = '$' + priceBlock.value;
                    titleTd.innerText = titleBlock.value;
                    serviceImg.style.backgroundImage = `url(data:image/png;base64,${imageBase64})`
                    trBlock.dataset.updated = 'true';
                    hideServiceDetails();
                }
            })
    };
};


