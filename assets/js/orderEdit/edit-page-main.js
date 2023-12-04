const PERMIT_STATUS = {
    3: 'Refunded',
    4: 'Voided',
    5: 'Disputed',
};

// Helper Functions.
// << ------ >>

// Event handlers.
// create popup for contact us information.
function closeContactUsPopup() {
    const modal = document.querySelector('.contact-us-modal');
    const modalContent = modal.querySelector('.contact-us-modal__content');
    modalContent.style.gap = '30px';
    modal.classList.remove('active');
};

// Toastify message popup.
function toastifyMessage(message, type = 'success') {
    let background = "#00B74A";

    if(type === 'error') {
        background = '#F93154'
    };

    if(type === 'worning') {
        background = '#F59720';
    };

    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true,
        style: { background },
    }).showToast();
};

// Function to read a File object as base64
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

function debounce(func, delay) {
    let timeoutId;
  
    return function () {
        const context = this;
        const args = arguments;
    
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
};

// HTTP requests including the status of the call.
async function useFetch(
    url,
    options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    },
    callback
) {
    let state = {
        isLoading: true,
        isError: null,
        data: null,
    };

    try {
        callback && callback(state);

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        };

        let responseDate = response;

        if(response.status !== 204) {
            responseDate = await response?.json();
        };

        state = {
            ...state,
            data: responseDate,
            isLoading: false
        };

        callback && callback(state);
        return state;
    } catch (error) {
        state = {
            ...state,
            isError: error,
            isLoading: false
        };
        callback && callback(state);
        return state;
    };
};
// << ------ >>

// Get token by user ID and keep it in local storage with user ID as key.
async function getUserToken(user_id) {
    const getTokenByUserIdApi = 'http://192.168.100.155:8080/api/admin/generate-token';
    const STORAGE_TOKEN_KEY = 'userToken_' + user_id;

    let token = localStorage.getItem(STORAGE_TOKEN_KEY);

    if(token) return token;

    const payload = {
        method: 'POST',
        body: JSON.stringify({ user_id })
    };
    const { data } = await useFetch(getTokenByUserIdApi, payload);

    if (data?.data?.access_token) {
        token = data?.data?.access_token;
        localStorage.setItem(STORAGE_TOKEN_KEY, token);
    };

    return token;
};

// all forms make preventDefault.
document.addEventListener('DOMContentLoaded', () => {
    const allForms = [...document.querySelectorAll('form')]
    allForms.forEach(() => {
        addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });
});

const searchParmas = new URLSearchParams(window.location.search);

(function setSelectedStapActive(){
    const steps = [...document.querySelectorAll('.editPermitPopup__stepBar button')];
    const selectedStep = steps.find(button => window.location.href.includes(button.getAttribute('data-pageName')));
    selectedStep.classList.add('active');
})();


function checkVehicleIsSame(){
    const vehicleForm = document.querySelector('.editPermitPopup__edit-vehicles-form form');

    console.log(1)

    return Boolean(vehicleForm);
};

function checkMemberIsSame() {
    const memberForm = document.querySelector('.editPermitPopup__edit-Operation form');

    console.log(2)

    return Boolean(memberForm);
};

function checkCarrierInforamtionIsSame() {
    const email = document.querySelector('input[name="carrierForm_email"]')?.value;
    const phone = document.querySelector('input[name="carrierForm_phone"]')?.value;
    const usdot = document.querySelector('input[name="carrierForm_usdot"]')?.value;

    const mainData = getMainData();

    console.log(3)
    return !Boolean(
        mainData.carrierDetails?.email === email &&
        mainData.carrierDetails?.phone === phone.replaceAll(' ', '') &&
        mainData.carrierDetails?.usdot === usdot
    );
};

function checkContactInformationIsSame() {
    const name = document.querySelector('input[name="first_name"]')?.value;
    const lastName = document.querySelector('input[name="last_name"]')?.value;
    const email = document.querySelector('input[name="email"]')?.value;
    const phone = document.querySelector('input[name="phone"]')?.value;

    const mainData = getMainData();

    console.log(4)
    
    return !Boolean(
        mainData.contactInfo?.first_name === name &&
        mainData.contactInfo?.last_name === lastName &&
        mainData.contactInfo?.email === email &&
        mainData.contactInfo?.phone === phone.replaceAll(' ', '')
    );
};

function changeEditFormStep(pathname) {
    if(window.location.href.replace(/\/orders\/\w+/, "/orders/" + pathname) === window.location.href) {
        return;
    };

    if(pathname === 'edit') {
        window.location.href = window.location.href.replace(/\/orders\/\w+/, "/orders/" + pathname);
        return;
    };

    if(
        checkVehicleIsSame() ||
        checkMemberIsSame() ||
        checkCarrierInforamtionIsSame() ||
        checkContactInformationIsSame()
    ) {
        const changeStepModal = document.querySelector('.change-step-modal');
        changeStepModal.setAttribute('data-pathname', pathname);
        changeStepModal.classList.add('active');
    } else {
        window.location.href = window.location.href.replace(/\/orders\/\w+/, "/orders/" + pathname);
    };
};

function closeChangeStepPopup(type) {
    const changeStepModal = document.querySelector('.change-step-modal');
    const pathname = changeStepModal.getAttribute('data-pathname');

    changeStepModal.classList.remove('active');

    if(type === 'reset') {
        window.location.href = window.location.href.replace(/\/orders\/\w+/, "/orders/" + pathname);
    } else {
        toastifyMessage('please verifye your updates', 'worning');
    };

};

// Fill order information in the top panel.
function fillOrderDetails(orderDetails) {
    if(orderDetails?.permit_status_info) {
        const selectedPemitStatus = PERMIT_STATUS?.[orderDetails?.permit_status]; 

        const cancelStatusButton = document.querySelector('.cancel-selected-permit-status button');
        const cancelStatusSpan = cancelStatusButton.querySelector('span');
        const permitStatusesBlock = document.querySelector('.permit-status-buttons');
        const permitStatusMessageBlock = document.querySelector('.permit-status-message');
        const permitStatusMessageBlockContent = document.querySelector('.permit-status-message-content');

        permitStatusesBlock.classList.remove('active');
        cancelStatusButton.classList.add('active');
        permitStatusMessageBlock.classList.add('active');

        cancelStatusSpan.innerHTML = `Cancel ${selectedPemitStatus}`;
        permitStatusMessageBlockContent.innerHTML = '';
        permitStatusMessageBlockContent.insertAdjacentHTML('beforeend', `
            <span><b>Reason:</b> ${orderDetails?.permit_status_info?.reason}</span>
            <span><b>This Permit has been ${selectedPemitStatus}:</b> ${orderDetails?.permit_status_info?.date}</span>
        `);
    };

    const orderId_HTML_SPAN = document.querySelector('.editPermitPopup__orderInformation-orderId');
    const usdot_HTML_SPAN  = document.querySelector('.editPermitPopup__orderInformation-usdot');
    const date_HTML_SPAN  = document.querySelector('.editPermitPopup__orderInformation-date');
    const cost_HTML_SPAN = document.querySelector('.editPermitPopup__orderInformation-cost');

    orderId_HTML_SPAN.innerHTML = String(orderDetails?.id) || 'NOT FOUND';
    usdot_HTML_SPAN.innerHTML  = String(orderDetails?.usdot) || 'NOT FOUND';
    date_HTML_SPAN.innerHTML  = String(orderDetails?.date) || 'NOT FOUND';
    cost_HTML_SPAN.innerHTML = String(orderDetails?.cost) || 'NOT FOUND';
};

