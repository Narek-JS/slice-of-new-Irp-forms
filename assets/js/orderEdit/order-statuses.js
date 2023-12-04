const allOrderStatusPopups = [...document.querySelectorAll('.order-status-popup')];

// const admin = document.getElementById("admin");

// console.log('admin --> ', admin.value);

function openOrderStatusPopup(event) {
    const compairedPopup = allOrderStatusPopups.find(popup => popup.getAttribute('data-name') === event.target.getAttribute('data-status'));
    compairedPopup.classList.add('active');

    allOrderStatusPopups.forEach((popup) => {
        const orderDetailCost = document.querySelector('.editPermitPopup__orderInformation-cost');
        const permitCost = orderDetailCost?.innerHTML;
        const costMessageInPopup = popup.querySelector('.order-status-popup__message span');
        costMessageInPopup.innerHTML = permitCost + '$';
    });
};

function closeOrderStatusPopup() {
    allOrderStatusPopups.forEach(popup => popup.classList.remove('active'));
};

async function cancelSelectedStatus() {
    const permitStatusApi = `http://192.168.100.155:8080/api/admin/order/permit-status/${searchParmas.get('orderId')}`;

    const btnIcon = document.querySelector('.cancel-selected-permit-status button svg');
    const btnSpan = document.querySelector('.cancel-selected-permit-status button span');

    if(btnIcon.classList.contains('rotate')) {
        return;
    };

    const agentName = document.querySelector('#admin');
    const userToken = await getUserToken(searchParmas.get('userId'));
    const payload = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
            admin: agentName?.value || 'sudashan',
            permit_status: null,
            permit_status_info: null
        })
    };

    await useFetch(permitStatusApi, payload, (responseState) => {
        if(responseState.isLoading) {
            btnIcon.classList.add('rotate');
            btnSpan.style.display = 'none';
        } else if(!responseState.isError && responseState.data) {
            const permitStatusesBlock = document.querySelector('.permit-status-buttons');
            const permitStatusMessageBlock = document.querySelector('.permit-status-message');
            const cancelStatusButton = document.querySelector('.cancel-selected-permit-status button');

            btnIcon.classList.remove('rotate');
            btnSpan.style.display = 'inline';

            permitStatusesBlock.classList.add('active');
            permitStatusMessageBlock.classList.remove('active');
            cancelStatusButton.classList.remove('active');

            toastifyMessage("Succesfull cancel Status");
        } else if (responseState.isError) {
            btnIcon.classList.remove('rotate');
            btnSpan.style.display = 'inline';
            toastifyMessage("Somthing is wrong please try again", 'error');
        };
    });

};

function validateStatusForms(statusType) {
    const permitStatusApi = `http://192.168.100.155:8080/api/admin/order/permit-status/${searchParmas.get('orderId')}`;

    const elem = document.querySelector(`.${statusType}-popup .order-status-popup__form input`);
    new Datepicker(elem, {
        format: 'mm/dd/yyyy',
        autohide: true
    }); 

    $(`.${statusType}-popup .order-status-popup__form`).validate({
        rules: {
            [`${statusType}_message`]: { required: true },
            [`${statusType}_date`]: { required: true },
        },
        submitHandler: async (form) => {
            const reasonTextarea = form.querySelector(`.${statusType}-popup .order-status-popup__form textarea`);
            const dateInput = form.querySelector(`.${statusType}-popup .order-status-popup__form input`);
            const submitBtn = form.querySelector(`.${statusType}-popup .order-status-popup__form [type=submit]`);
    
            if(submitBtn.innerHTML?.includes('small-loading')) {
                return;  
            };

            const dateObject = new Date(dateInput.value);
            // Format the date as 'dd/mm/yyyy'
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const formattedDate = (month > 9 ? month : '0' + month) + '/' + (day > 9 ? day : '0' + day) + '/' + dateObject.getFullYear();
            const agentName = document.querySelector('#admin');

            const userToken = await getUserToken(searchParmas.get('userId'));
            const payload = {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    admin: agentName?.value || 'sudashan',
                    permit_status: 5,
                    permit_status_info: {
                        reason: reasonTextarea.value,
                        date: formattedDate
                    }
                })
            };
            
            await useFetch(permitStatusApi, payload, (responseState) => {
                if(responseState.isLoading) {
                    submitBtn.innerHTML = '<span class="small-loading"></span>';
                } else if(!responseState.isError && responseState.data) {
                    const permitStatusesBlock = document.querySelector('.permit-status-buttons');
                    const permitStatusMessageBlock = document.querySelector('.permit-status-message');
                    const permitStatusMessageBlockContent = document.querySelector('.permit-status-message-content');
                    const cancelStatusButton = document.querySelector('.cancel-selected-permit-status button');
                    const cancelStatusSpan = cancelStatusButton.querySelector('span');
        
                    permitStatusesBlock.classList.remove('active');
                    permitStatusMessageBlock.classList.add('active');
                    cancelStatusButton.classList.add('active');

                    cancelStatusSpan.innerHTML = `Cancel ${statusType}`;
                    permitStatusMessageBlockContent.innerHTML = '';
                    permitStatusMessageBlockContent.insertAdjacentHTML('beforeend', `
                        <span><b>Reason:</b> ${reasonTextarea.value}</span>
                        <span><b>This Permit has been ${statusType}ed:</b> ${formattedDate}</span>
                    `);

                    submitBtn.innerHTML = 'Submit';
                    reasonTextarea.value = '';
                    dateInput.value = '';
                    closeOrderStatusPopup();
                    toastifyMessage("Succesfull Update Status");
                } else if (responseState.isError) {
                    submitBtn.innerHTML = 'Submit';
                    toastifyMessage("Somthing is wrong please try again", 'error');
                };
            });
        }
    });
};

const statusTypes = allOrderStatusPopups.map(popup => popup.getAttribute('data-name'));
statusTypes.forEach(validateStatusForms);