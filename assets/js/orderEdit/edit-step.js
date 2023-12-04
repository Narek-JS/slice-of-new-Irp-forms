// GLOBAL DATA.
// << ------ >>
const loadingContainer_HTML_DIV = document.querySelector('.loadingContainer');

class MainInformation {
    constructor() {
        this.options = null;
        this.orderDetails = null;
        this.contactInfo = null;
        this.carrierDetails = null;
        this.members = null;  
        this.vehicles = null; 
        this.fields = null;
        this.GVWData = null;
        this.allExtensions = [
            "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "vnd.openxmlformats-officedocument.wordprocessingml.document",
            "vnd.openxmlformats-officedocument.presentationml.presentation",
            "pdf",
            "png",
            "jpg",
            "jpeg",
            "svg+xml",
            "webp"
        ];
    };
};

class GetStaticVehicleFieldsData {
    #getGvwOptions(){
        return (async function (){
            const GVWData = await getSelectOptionsGVW();
            return GVWData?.map((gvwOptions) => ({
                id: gvwOptions?.id,
                name: gvwOptions?.gvw,
                contact_us: gvwOptions?.contact_us
            }));
        })();
    };

    #getStaticVehicleFieldsHtml(staticVehicleFields) {
        const staticVehicleFieldsHtml = staticVehicleFields.map((field) => {
            if(field.type === 'select') {
                let dataId;

                if(Array.isArray(field.options)) {
                    const findSelectedOptionId = field.options.find((option) => option.name === field.value);
                    if(findSelectedOptionId && findSelectedOptionId?.id) {
                        dataId = findSelectedOptionId?.id;
                    };
                };

                return `
                    <div class="editPermitPopup-inputGroup">
                        <label>${field.label} ${field.required ? '<span>*</span>' : ''} </label>
                        <div class="custom-dropdown">
                            <input
                                value="${field.value}"
                                type="${field.type}"
                                placeholder="${field.placeholder}"
                                name="${field.name}"
                                ${dataId ? `data-id="${dataId}"` : ''}
                                readonly
                            />
                            <ul class="options">
                                ${field.options?.map(option => `
                                    <li
                                        class="option"
                                        ${field.name === 'gvw' ? `onclick="handleGvwChange(${option?.id})"`: ''}
                                        ${field.name === 'status' ? `onclick="handleStatusChange('${option}')"`: ''}
                                        ${field.name === 'titled_state' ? `onclick="handleTitledState('${option}')"`: ''}
                                        ${option?.contact_us ? `data-contact_us="${option?.contact_us}"` : ''}
                                        ${option?.name?.toLowerCase()?.includes('less') ? `data-is_less_minimum_gvw="true"` : ''}
                                        
                                        ${option?.id ? `data-id="${option?.id}"` : ''}
                                    >${option?.name || option}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            };

            if(field.name === 'year') {
                return `
                    <div class="editPermitPopup-inputGroup">
                        <label>${field.label} ${field.required ? '<span>*</span>' : ''}</label>
                        <div class="custom-datepicker">
                            <input
                                placeholder="${field.placeholder}"
                                value="${field.value}"
                                name="${field.name}"
                                type="${field.type}"
                                readonly
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 14C11.7167 14 11.4793 13.904 11.288 13.712C11.096 13.5207 11 13.2833 11 13C11 12.7167 11.096 12.479 11.288 12.287C11.4793 12.0957 11.7167 12 12 12C12.2833 12 12.521 12.0957 12.713 12.287C12.9043 12.479 13 12.7167 13 13C13 13.2833 12.9043 13.5207 12.713 13.712C12.521 13.904 12.2833 14 12 14ZM8 14C7.71667 14 7.479 13.904 7.287 13.712C7.09567 13.5207 7 13.2833 7 13C7 12.7167 7.09567 12.479 7.287 12.287C7.479 12.0957 7.71667 12 8 12C8.28333 12 8.521 12.0957 8.713 12.287C8.90433 12.479 9 12.7167 9 13C9 13.2833 8.90433 13.5207 8.713 13.712C8.521 13.904 8.28333 14 8 14ZM16 14C15.7167 14 15.4793 13.904 15.288 13.712C15.096 13.5207 15 13.2833 15 13C15 12.7167 15.096 12.479 15.288 12.287C15.4793 12.0957 15.7167 12 16 12C16.2833 12 16.5207 12.0957 16.712 12.287C16.904 12.479 17 12.7167 17 13C17 13.2833 16.904 13.5207 16.712 13.712C16.5207 13.904 16.2833 14 16 14ZM12 18C11.7167 18 11.4793 17.904 11.288 17.712C11.096 17.5207 11 17.2833 11 17C11 16.7167 11.096 16.4793 11.288 16.288C11.4793 16.096 11.7167 16 12 16C12.2833 16 12.521 16.096 12.713 16.288C12.9043 16.4793 13 16.7167 13 17C13 17.2833 12.9043 17.5207 12.713 17.712C12.521 17.904 12.2833 18 12 18ZM8 18C7.71667 18 7.479 17.904 7.287 17.712C7.09567 17.5207 7 17.2833 7 17C7 16.7167 7.09567 16.4793 7.287 16.288C7.479 16.096 7.71667 16 8 16C8.28333 16 8.521 16.096 8.713 16.288C8.90433 16.4793 9 16.7167 9 17C9 17.2833 8.90433 17.5207 8.713 17.712C8.521 17.904 8.28333 18 8 18ZM16 18C15.7167 18 15.4793 17.904 15.288 17.712C15.096 17.5207 15 17.2833 15 17C15 16.7167 15.096 16.4793 15.288 16.288C15.4793 16.096 15.7167 16 16 16C16.2833 16 16.5207 16.096 16.712 16.288C16.904 16.4793 17 16.7167 17 17C17 17.2833 16.904 17.5207 16.712 17.712C16.5207 17.904 16.2833 18 16 18ZM5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20Z" fill="#3A9EFE"/>
                            </svg>
                        </div>
                    </div>
                `;
            };

            return `
                <div class="editPermitPopup-inputGroup">
                    <label>${field.label} ${field.required ? '<span>*</span>' : ''}</label>
                    <input
                        ${field.name?.includes('trailer') ? 'oninput="trailerValidation(event)"' : ''}
                        placeholder="${field.placeholder}"
                        value="${field.value}"
                        name="${field.name}"
                        type="${field.type}"
                    />
                </div>
            `;
        });

        return staticVehicleFieldsHtml.join('');
    };

    async getFields(selectedVehicle) {
        const staticVehicleFields = [
            {
                label: 'GVW - Fully loaded',
                required: true,
                placeholder: 'Select GVW',
                name: 'gvw',
                type: 'select',
                value: selectedVehicle?.gvw || "",
                options: await this.#getGvwOptions()
            },
            {
                label: 'Purchased Price',
                required: true,
                placeholder: 'Enter Purchased Price',
                name: 'purchased_price',
                type: 'text',
                value: selectedVehicle?.purchased_price || "",
            },
            {
                label: 'Total No. of Axles With Trailer',
                placeholder: 'Enter total no. of axles',
                name: 'axles_with_trailer',
                type: 'text',
                value: selectedVehicle?.axles_with_trailer || "",
            },
            {
                label: 'No. of Axles Without Trailer',
                required: true,
                placeholder: 'Enter no. of axles without trailer',
                name: 'axles_without_trailer',
                type: 'text',
                value: selectedVehicle?.axles_without_trailer || "",
            },
            {
                label: 'Vehicle Status',
                required: true,
                placeholder: 'Select Status',
                name: 'status',
                type: 'select',
                value: selectedVehicle?.status || "",
                options: [
                    'Owned',
                    'Leased',
                    'Financed'
                ]
            },
            {
                label: 'Is the Vehicle Titled in the State of AL ?',
                required: true,
                placeholder: 'Select',
                name: 'titled_state',
                type: 'select',
                value: selectedVehicle?.titled_state || "",
                options: [
                    'Yes',
                    'No',
                ]
            },
            {
                label: 'VIN number',
                required: true,
                placeholder: 'Enter your vehicle VIN number',
                name: 'vin',
                type: 'text',
                value: selectedVehicle?.vin || '',
            },
            {
                label: 'Vehicle Year',
                required: true,
                placeholder: 'YYYY',
                name: 'year',
                type: 'text',
                value: selectedVehicle?.year || '',
            },
            {
                label: 'Vehicle Make',
                required: true,
                placeholder: 'Enter Make',
                name: 'make',
                type: 'text',
                value: selectedVehicle?.make ||  '',
            },
            {
                label: 'Vehicle Model',
                required: true,
                placeholder: 'Enter Model',
                name: 'model',
                type: 'text',
                value: selectedVehicle?.model ||  '',
            },
        ];

        return this.#getStaticVehicleFieldsHtml(staticVehicleFields);
    };
};

const mainData = new MainInformation();

function getMainData() {
    return mainData;
};
// << ------ >>


// Form Validations.
// << ------ >>
$(".carrierInformationForm").validate({
    rules: {
        first_name: { required: true },
        last_name: { required: true },
        email: { email: true },
        phone: { phone: true },
        carrierForm_email: { required: true },
        carrierForm_phone: { required: true },
        carrierForm_usdot: { required: true },
    },
    submitHandler: async (form) => {
        const submitBtn = form.querySelector('[type=submit]');
        if(submitBtn.innerHTML?.includes('small-loading')) {
            return;
        };
        
        const agentName = document.querySelector('#admin');
        const updateApi = `http://192.168.100.155:8080/api/v1/updateData`;
        const userToken = await getUserToken(searchParmas.get('userId'));

        const formData = new FormData(form);
        const data = {};

        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        };

        const payload = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({
                admin: agentName?.value || 'sudashan',
                name: data?.first_name,
                last_name: data?.last_name,
                USDOT: data?.carrierForm_usdot,
                email: data?.carrierForm_email,
                user_email: data?.email,
                legal_name: data?.first_name,
                phone: data?.phone?.replace(' ', ''),
                user_phone: data?.carrierForm_phone?.replace(' ', ''),
                permit_id: mainData.orderDetails?.permit_id
            })
        };
        await useFetch(updateApi, payload, (responseDate) => {
            if(responseDate.isLoading) {
                submitBtn.innerHTML = '<span class="small-loading"></span>';
            } else if(!responseDate.isError && responseDate.data) {
                submitBtn.innerHTML = 'Update Carrier';
                toastifyMessage('Success Update Carrier Inforamtion');
            } else if(responseDate.isError) {
                submitBtn.innerHTML = 'Update Carrier';
                toastifyMessage('Somthing wrong please try again', 'error');
            };
        });
    }
});

$.validator.methods.phone = function (value) {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
};

$.validator.methods.email = function (value) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

$.validator.methods.ein = function (value) {
    return /^\d{2}-\d{7}$/.test(value);
};

$.validator.methods.ssn = function (value) {
    return /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{2})\d{2}-(?!0{4})\d{4}$/.test(value);
};

$.validator.methods.ein_ssn = function (value) {
    return /^\d{2}-\d{7}$/.test(value) || /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{2})\d{2}-(?!0{4})\d{4}$/.test(value);
};
// << ------ >>


// Get all order details by order ID, user ID and token. after succes status it call functions for fill data. 
async function getOrderDetails({ order_id, user_id }) {
    const getOrderDetailsByIdApi = 'http://192.168.100.155:8080/api/admin/orders/' + order_id;

    const userToken = await getUserToken(user_id);
    const options = await getMainOptions();
    await getAllExtensions();

    const payload = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
        }
    };

    const { data } = await useFetch(getOrderDetailsByIdApi, payload, (responseDate) => {
        const isMountSicle = Object.values(mainData).find(data => data === null) === null;
        if(responseDate.isLoading && isMountSicle) {
            loadingContainer_HTML_DIV.classList.add('active');
        };
    });

    if(data?.data?.order_details) {
        mainData.orderDetails = data?.data?.order_details;
        fillOrderDetails(data?.data?.order_details); // this function is came from edit-page-main.
    };

    if(data?.data?.contact_info) {
        mainData.contactInfo = data?.data?.contact_info;
        fillContactInformation(data?.data?.contact_info);
    };

    if(data?.data?.carrier_details) {
        mainData.carrierDetails = data?.data?.carrier_details;
        fillCarrierDetails(data?.data?.carrier_details, options);
    };

    if(data?.data?.members) {
        mainData.members = data?.data?.members;
        if(data?.data?.fields) {
            mainData.fields = data?.data?.fields;
        };

        fillMembers({
            extraFields: data?.data?.fields?.filter(field => field?.group?.name === 'Member'),
            isMyOperateUsdot: data?.data?.carrier_details?.operate_usdot_id !== 2,
            isPosition: !['sole-proprietor', 'individual'].includes(data?.data?.carrier_details?.registrant_type?.slug),
            options: options,
            members: data?.data?.members
        });
    };

    if(data?.data?.vehicles) {
        mainData.vehicles = data?.data?.vehicles;
        if(data?.data?.fields) {
            mainData.fields = data?.data?.fields;
        };

        await fillVehicles({
            vehicles: data?.data?.vehicles,
            extraFields: data?.data?.fields?.filter(field => field?.group?.name === 'Vehicle'),
            hideBaseVehicles: data?.data?.carrier_details?.application_type?.hide_base_vehicles === '1'
        });

    };

    loadingContainer_HTML_DIV.classList.remove('active');
};

// Get applicationTypes, officerType, operateUsdot, registrantType and states options for select.
async function getMainOptions() {
    if(mainData.options) {
        return mainData.options;
    };

    const getSelectOptionsApi = 'http://192.168.100.155:8080/api/v1/getFormData/0';

    const { data } = await useFetch(getSelectOptionsApi, undefined, (responseDate) => {
        if(responseDate.isLoading) {
            loadingContainer_HTML_DIV.classList.add('active');
        };
    });

    if(data?.action && data?.data) {
        mainData.options = data.data;
        return data.data;
    };
};

// Get allExtensions for check file types.
async function getAllExtensions() {
    if(mainData.allExtensions) {
        return mainData.allExtensions;
    };

    const getAllExtensionsApi = `http://192.168.100.155:8080/api/v1/getOtherExtraFields/${searchParmas.get('orderId')}`;

    const userToken = await getUserToken(searchParmas.get('userId'))

    const payload = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
        }
    };

    const { data } = await useFetch(getAllExtensionsApi, payload);

    if(data?.data?.data?.allExtensions) {
        mainData.allExtensions = data?.data?.data?.allExtensions;
        return data?.data?.data?.allExtensions;
    };
};

// Get GVW options.
async function getSelectOptionsGVW() {
    if(mainData.GVWData) {
        return mainData.GVWData;
    };

    const getSelectOptionsGVWApi = 'http://192.168.100.155:8080/api/v1/getFormData/1';
    const { data: GVWData } = await useFetch(getSelectOptionsGVWApi);

    if(GVWData?.data?.gvw) {
        mainData.GVWData = GVWData?.data?.gvw;
        return GVWData?.data?.gvw;
    };
};

// Fill inputs values in the contact information panel.
function fillContactInformation(contactInformation) {
    const contactForm_HTML_INPUTS = [...document.querySelectorAll('.editPermitPopup__edit-contactForm input')];
    contactForm_HTML_INPUTS.forEach(input => {
        input.value = contactInformation[input.name] || '';
    });
};


// these functions are Fill Carrier Details in the Carrier Information Panel.
// << ------ >>
function fillStates(selectedState) {
    // Put selected state.
    const selectTrigger = document.querySelector(`#customSelect-state .select-trigger span`);
    selectTrigger.setAttribute('data-id', selectedState.id);

    selectTrigger.textContent = selectedState.state;
};

function fillApplicationTypes(selectedApplicationType) {
    // Put selected value.
    const selectTrigger = document.querySelector(`#customSelect-application-type .select-trigger span`);
    selectTrigger.setAttribute('data-id', selectedApplicationType.id);
    selectTrigger.textContent = selectedApplicationType.name;
};

function fillRegistrantTypes(selectedRegistrantType) {
    // Put selected value.
    const selectTrigger = document.querySelector(`#customSelect-registrant-type .select-trigger span`);
    selectTrigger.setAttribute('data-id', selectedRegistrantType?.id);
    selectTrigger.setAttribute('data-slug', selectedRegistrantType?.slug);
    selectTrigger.innerHTML = selectedRegistrantType?.name;
};

function fillOperateUsdot(selectedUsdotOperate) {
    const operateUsdotWrapper_HTML_DIV = document.querySelector('.operateUsdot');

    const operateUsdotSelected__HTML_BUTTONS = `
        <button
            class="editPermitPopup__usdot active"
            data-id=${selectedUsdotOperate?.id}
            type="button"
        >
            ${selectedUsdotOperate?.text}
        </button>
    `;

    // Put Selected Usdot Operate.
    operateUsdotWrapper_HTML_DIV.innerHTML = '';
    operateUsdotWrapper_HTML_DIV.insertAdjacentHTML('afterbegin', operateUsdotSelected__HTML_BUTTONS);
};

function fillCarrierDetails(carrierDetails, options) {
    // fill Business Phone, Email Address and Usdot.
    const carrierInformation_HTML_INPUTS = [...document.querySelectorAll('.editPermitPopup__edit-carrierForm input')];
    carrierInformation_HTML_INPUTS.forEach(input => {
        const spletedNameForKey = input.name.replace('carrierForm_', '');
        input.value = carrierDetails[spletedNameForKey] || ''
    });

    // fill States.
    if(carrierDetails?.state) {
        fillStates(carrierDetails?.state);
    };

    // fill Application Type.
    if(carrierDetails?.application_type) {
        fillApplicationTypes(carrierDetails?.application_type);
    };

    // fill Registrant Type.
    if(carrierDetails?.registrant_type) {
        fillRegistrantTypes(carrierDetails?.registrant_type);
    };

    // fill Selected Operate Usdot Button.
    if(options?.operateUsdot) {
        const selectedUsdotOperate = options?.operateUsdot?.find(operate => operate.id === carrierDetails?.operate_usdot_id);
        if(selectedUsdotOperate) {
            fillOperateUsdot(selectedUsdotOperate);
        };
    };
};
// << ------ >>


// this functions contain all logic about members.
// << ------ >>
async function deleteMember(memberId) {
    const memberDeleteApi = `http://192.168.100.155:8080/api/v1/members/${memberId}`;

    const userToken = await getUserToken(searchParmas.get('userId'));
    const agentName = document.querySelector('#admin');

    const payload = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
            admin: agentName?.value || 'sudashan',
        })
    };

    const memberDeleteBtn = document.getElementById(`member-delete-${memberId}`);

    await useFetch(memberDeleteApi, payload, async (responseData) => {
        if(responseData.isLoading) {
            memberDeleteBtn.innerHTML = '<span class="small-loading"></span>';
        } else if(responseData.isError) {
            toastifyMessage('somthing is wrong 😞 !!!', 'error');
            memberDeleteBtn.innerHTML = 'Delete';
        } else {
            toastifyMessage('succsesfull Member Delete 😊');
            memberDeleteBtn.innerHTML = 'Delete';
            await render();
        };
    });
};

async function editMember(memberId, formData) {
    const apiUpdateMember = `http://192.168.100.155:8080/api/v1/members/${memberId}`;
    const userToken = await getUserToken(searchParmas.get('userId'));
    const agentName = document.querySelector('#admin');
    const isPosition = !['sole-proprietor', 'individual'].includes(mainData.carrierDetails?.registrant_type?.slug);

    const officer_type_id = isPosition ? mainData.options?.officerType?.find(({ name }) => name === formData?.officer_type_id)?.id : null;

    const payload = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${userToken}`
        },
        body: JSON.stringify({
            ...formData,
            ...(isPosition && { officer_type_id }),
            admin: agentName?.value || 'sudashsan',
            permit_id: mainData.orderDetails?.permit_id
        })
    };
    
    const memberUpdatBtn = document.querySelector('.editPermitPopup__updateButton-member');
    
    await useFetch(apiUpdateMember, payload, async (responseData) => {
        if(responseData?.isLoading) {
            memberUpdatBtn.innerHTML = '<span class="small-loading"></span>';
        } else if (responseData?.isError) {
            memberUpdatBtn.innerHTML = 'Update Carrier';
            toastifyMessage('something is wrong 😞 !!!', 'error');
        } else {
            await render({ order_id: searchParmas.get('orderId'), user_id: searchParmas.get('userId') });
            memberUpdatBtn.innerHTML = 'Update Carrier';
            if(mainData?.carrierDetails?.operate_usdot_id !== 2) {
                const memberForm = document.querySelector('.editPermitPopup__edit-Operation');
                memberForm.innerHTML = '';
            };
            toastifyMessage('succsesfull Member edit 😊');
        };
    });
};

async function openEditMemberForm(memberId){
    const currentMemberGetApi = `http://192.168.100.155:8080/api/v1/members/${memberId}/edit`; // 150 is test now it's prmit id but it should be member id like this --> memberId
    const editBtnInTable = document.getElementById(`member-edit-${memberId}`);
    const memberForm = document.querySelector('.editPermitPopup__edit-Operation');

    if(editBtnInTable.innerHTML.includes('Cancel')) {
        editBtnInTable.innerHTML = 'Edit';
        editBtnInTable.style.background = '#FFA900'
        cancelOpenedEditMemberForm();
        return;
    };

    const userToken = await getUserToken(searchParmas.get('userId'));

    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    };

    const { data: memberData } = await useFetch(currentMemberGetApi, payload, (responseData) => {
        if(responseData?.isLoading) {
            editBtnInTable.innerHTML = '<span class="small-loading"></span>';
        } else if(responseData?.isError) {
            editBtnInTable.innerHTML = 'Edit';
            toastifyMessage('something is wrong 😞 !!!', 'error');
        } else {
            const allEditButtons = [...document.querySelectorAll('.editPermitPopup__edit-member-edit')];
            allEditButtons.forEach((edituttons) => {
                edituttons.innerHTML = 'Edit';
                edituttons.style.background = '#FFA900'
            });
            editBtnInTable.innerHTML = 'Cancel Edit';
            editBtnInTable.style.background = '#001D4A'
        };
    });

    const selectedMember = memberData?.data;
    const extraMembers = mainData?.fields?.filter(field => field?.group?.name === 'Member');

    const extraValidation = extraMembers?.map((extraField) => ({
        [`extra_field_${extraField.id}`]: { [extraField?.validation?.[0]?.conditions]: true }
    }));

    const extraFields = extraMembers?.map((extraField) => {
        const currentExtraValue = selectedMember?.extra_value?.find((extraValue) => extraValue?.extra_field_id === extraField?.id)?.value;

        if(extraField?.ssn_ein === 'ssn_ein') {
            const isEin = /^\d{2}-\d{7}$/.test(currentExtraValue);
            const isSsn = /^\d{3}-\d{2}-\d{4}$/.test(currentExtraValue);

            return `
                <div class="editPermitPopup-inputGroup">
                    <div class="labelWrapper">
                        <label>${extraField?.label}</label>
                        <div class="ssn_ein">
                            <div class="einCheckbox" onclick="handleEinChecbox('${currentExtraValue}')">
                                <input ${isEin ? 'checked' : ''} type="checkbox" id="ein-checkbox" />
                                <label for="ein-checkbox">Open Ein Box</label>
                            </div>
                            <div class="ssnCheckbox" onclick="handleSsnCheckbox('${currentExtraValue}')">
                                <input ${isSsn ? 'checked' : ''} type="checkbox" id="ssn-checkbox" />
                                <label for="ssn-checkbox">Open SSN Box</label>
                            </div>
                        </div>
                    </div>
                    <div class="conditionalExtraField">
                        <input
                            class="${((!isEin && !isSsn) ? 'custom-select disabled' : '') + ' ' + (isEin ? 'einExtraInput' : '') + ' ' + (isSsn ? 'ssnExtraInput' : '')}"
                            required
                            placeholder="${extraField?.placeholder}"
                            value="${currentExtraValue || ''}"
                            name="extra_field_${extraField.id}"
                        />
                    </div>
                </div>
            `;
        };

        return `
            <div class="editPermitPopup-inputGroup">
                <label>${extraField?.label}</label>
                <input placeholder="${extraField?.placeholder}" value="${currentExtraValue || ''}" name="extra_field_${extraField?.id}"/>
            </div>
        `;

    });

    const isPosition = !['sole-proprietor', 'individual'].includes(mainData.carrierDetails?.registrant_type?.slug);

    const positionOptions = isPosition ? mainData.options?.officerType?.map((positionOption) => {
        return `<li class="option" data-id="${positionOption?.id}">${positionOption?.name}</li>`;
    }) : ''

    const fields = `
        <form>
            <span class="memberId" data-memberId="${selectedMember.id}" style="display: none;"></span>
            <div class="memberFields">
                <div class="editPermitPopup-inputGroup">
                    <label>Registrant Full Name</label>
                    <input placeholder="Enter full name" value="${selectedMember?.name}" name="name"/>
                </div>
                ${isPosition ? `
                    <div class="editPermitPopup-inputGroup">
                        <label>Position</label>
                        <div class="custom-dropdown">
                            <input value="${selectedMember?.officer_type?.name || ''}" type="text" placeholder="Select position..." readonly name="officer_type_id" />
                            <ul class="options">
                                ${positionOptions.join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                ${extraFields ? extraFields.join('') : ''}
            </div>
            <button class="editPermitPopup__updateButton-member" type='submit'>
                Update Carrier
            </button>
        </form>
    `;

    memberForm.innerHTML = fields;
    addInputMasks();

    let rules = {
        name: { required: true },
        officer_type_id: { required: true }
    };

    for(key in extraValidation) {
        rules = {
            ...rules,
            ...extraValidation[key]
        }
    };

    const validationMessages = {};

    for(key in rules) {
        validationMessages[key] = `Invalid ${key} value`;
    };

    $(".editPermitPopup__edit-Operation form").removeData('validator');
    $(".editPermitPopup__edit-Operation form").validate().destroy();
    $(".editPermitPopup__edit-Operation form").validate({
        rules,
        messages: validationMessages,
        submitHandler: async (form) => {
            const memberIdSpan = form.querySelector('.memberId');
            const memberId = memberIdSpan.getAttribute('data-memberId');
            const formData = new FormData(form);
            const data = {};
    
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1];
            };

            await editMember(memberId, data);
        }
    });
};

function cancelOpenedEditMemberForm() {
    const memberForm = document.querySelector('.editPermitPopup__edit-Operation');
    memberForm.innerHTML = `
        <button class="editPermitPopup__updateButton-member" onclick="addNewMember()">
            Add Another Member
        </button>
    `;
};

function addNewMember() {
    const memberForm = document.querySelector('.editPermitPopup__edit-Operation');
    const extraMembers = mainData?.fields?.filter(field => field?.group?.name === 'Member');

    const extraValidation = extraMembers?.map((extraField) => ({
        [`extra_field_${extraField.id}`]: { [extraField?.validation?.[0]?.conditions]: true }
    }));

    const extraFields = extraMembers?.map((extraField) => {

        if(extraField?.ssn_ein === 'ssn_ein') {
            const isEin = /^\d{2}-\d{7}$/.test('');
            const isSsn = /^\d{3}-\d{2}-\d{4}$/.test('')

            return `
                <div class="editPermitPopup-inputGroup">
                    <div class="labelWrapper">
                        <label>${extraField?.label}</label>
                        <div class="ssn_ein">
                            <div class="einCheckbox" onclick="handleEinChecbox()">
                                <input ${isEin ? 'checked' : ''} type="checkbox" id="ein-checkbox" />
                                <label for="ein-checkbox">Open Ein Box</label>
                            </div>
                            <div class="ssnCheckbox" onclick="handleSsnCheckbox()">
                                <input ${isSsn ? 'checked' : ''} type="checkbox" id="ssn-checkbox" />
                                <label for="ssn-checkbox">Open SSN Box</label>
                            </div>
                        </div>
                    </div>
                    <div class="conditionalExtraField">
                        <input
                            class="custom-select disabled"
                            required
                            placeholder="${extraField?.placeholder}"
                            value=""
                            name="extra_field_${extraField.id}"
                        />
                    </div>
                </div>
            `;
        };

        return `
            <div class="editPermitPopup-inputGroup">
                <label>${extraField?.label}</label>
                <input placeholder="${extraField?.placeholder}" value="" name="extra_field_${extraField?.id}"/>
            </div>
        `
    });

    const isPosition = !['sole-proprietor', 'individual'].includes(mainData.carrierDetails?.registrant_type?.slug);

    const positionOptions = isPosition ? mainData.options?.officerType?.map((positionOption) => {
        return `<li class="option" data-id="${positionOption?.id}">${positionOption?.name}</li>`;
    }) : ''

    const fields = `
        <form>
            <span class="memberId" data-memberId="" style="display: none;"></span>
            <div class="memberFields">
                <div class="editPermitPopup-inputGroup">
                    <label>Registrant Full Name</label>
                    <input placeholder="Enter full name" value="" name="name"/>
                </div>
                ${isPosition ? `
                    <div class="editPermitPopup-inputGroup">
                        <label>Position</label>
                        <div class="custom-dropdown">
                            <input value="" type="text" placeholder="Select position..." readonly name="officer_type_id" />
                            <ul class="options">
                                ${positionOptions.join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                ${extraFields ? extraFields.join('') : ''}
            </div>
            <button class="editPermitPopup__updateButton-member" type='submit'>
                Add Another Member
            </button>
        </form>
    `;

    memberForm.innerHTML = fields;
    addInputMasks();

    let rules = {
        name: { required: true },
        officer_type_id: { required: true }        
    };

    for(key in extraValidation) {
        rules = {
            ...rules,
            ...extraValidation[key]
        };
    };

    const validationMessages = {};

    for(key in rules) {
        validationMessages[key] = `Invalid ${key} value`;
    };

    $(".editPermitPopup__edit-Operation form").removeData('validator');
    $(".editPermitPopup__edit-Operation form").validate().destroy();
    $(".editPermitPopup__edit-Operation form").validate({
        rules,
        messages: validationMessages,
        submitHandler: async (form) => {
            const addNewMemberApi = 'http://192.168.100.155:8080/api/v1/members';
            const addNewMemberBtn = document.querySelector('.editPermitPopup__updateButton-member');

            const formData = new FormData(form);
            const data = {};
    
            for (let pair of formData.entries()) {
                data[pair[0]] = pair[1];
            };

            const userToken = await getUserToken(searchParmas.get('userId'));

            const isPosition = !['sole-proprietor', 'individual'].includes(mainData.carrierDetails?.registrant_type?.slug);
            const officer_type_id = isPosition ? mainData.options?.officerType?.find(({ name }) => name === formData?.officer_type_id)?.id : null;

            const payload = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    admin: 'sudashan',
                    permit_id: mainData.orderDetails?.permit_id,
                    ...data,
                    ...(isPosition && { officer_type_id }),
                })
            };

            await useFetch(addNewMemberApi, payload, (responseData) => {
                if(responseData?.isLoading) {
                    addNewMemberBtn.innerHTML = '<span class="small-loading"></span>';
                } else if (responseData?.isError) {
                    addNewMemberBtn.innerHTML = 'Add Another Member';
                    toastifyMessage('something is wrong', 'error');
                } else {
                    addNewMemberBtn.innerHTML = 'Add Another Member';
                    toastifyMessage('new member Added');
                    memberForm.innerHTML = `
                        <button class="editPermitPopup__updateButton-member" onclick="addNewMember()">
                            Add Another Member
                        </button>
                    `;
                    render();
                };
            });
        }
    });
};

function fillMembers(memberInformation) {
    // memberInformation is contain these failds
    // {
    //     extraFields: Array<Record<any, any>>,
    //     isMyOperateUsdot: boolean,
    //     isPosition: boolean,
    //     options: Record<any, any>,
    //     members: <Array<Record<any, any>>> 
    // }
    const memberTableContainer = document.querySelector('.editPermitPopup__edit-member');

    // create Table.
    if(memberInformation?.members?.length) {
        const memberTable = memberTableContainer?.querySelector('table');
        const thead = memberTable?.querySelector('thead');
        const tbody = memberTable?.querySelector('tbody');

        const extraTdsOfThead = memberInformation?.extraFields?.map((extraField) => `
            <td>${extraField?.label}</td>
        `);
        const trOfThead = `
            <tr>
                <td>No.</td>
                <td>Name</td>
                ${memberInformation?.isPosition ? '<td>Position</td>' : ''}
                ${extraTdsOfThead ? extraTdsOfThead.join('') : ''}
                <td>Edit</td>
                <td>Delete</td>
            </tr>
        `;

        thead.innerHTML = trOfThead;

        const trOfTbody = memberInformation?.members.map((memberField, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${memberField?.name}</td>
                ${memberInformation?.isPosition ? `<td>${memberField?.officer_type?.name}</td>`: ''}
                ${memberField?.extra_value.map(extra_value => `<td>${extra_value?.value}</td>`).join('')}
                <td>
                    <button class="editPermitPopup__edit-member-edit" id="member-edit-${memberField?.id}" onclick='openEditMemberForm(${memberField?.id})'>Edit</button>
                </td>
                <td>
                    <button class="editPermitPopup__edit-member-delete" id="member-delete-${memberField?.id}" onclick='deleteMember(${memberField?.id})'>Delete</button>
                </td>
            </tr>
        `);
        tbody.innerHTML = trOfTbody.join('');
    };

    if(memberInformation.isMyOperateUsdot) {
        if(memberInformation?.members?.length) {
            memberTableContainer?.classList?.add('active');
        } else if(memberTableContainer?.classList?.contains('active')) {
            memberTableContainer?.classList?.remove('active');
        };

        const memberForm = document.querySelector('.editPermitPopup__edit-Operation');
        memberForm.innerHTML = `
            <button class="editPermitPopup__updateButton-member" onclick="addNewMember()">
                Add Another Member
            </button>
        `;
    } else {
        // create Form.
        if(memberInformation?.members?.length) {
            const memberForm = document.querySelector('.editPermitPopup__edit-Operation');

            const extraValidation = memberInformation?.extraFields?.map((extraField) => ({
                [`extra_field_${extraField.id}`]: { [extraField?.validation?.[0]?.conditions]: true }
            }));

            const extraFields = memberInformation?.extraFields?.map((extraField) => {
                const currentExtraValue = memberInformation?.members?.[0]?.extra_value?.find(memberExtraValue => memberExtraValue?.extra_field_id === extraField?.id);
                if(extraField?.ssn_ein === 'ssn_ein') {
                    const isEin = /^\d{2}-\d{7}$/.test(currentExtraValue?.value);
                    const isSsn = /^\d{3}-\d{2}-\d{4}$/.test(currentExtraValue?.value)

                    return `
                        <div class="editPermitPopup-inputGroup">
                            <div class="labelWrapper">
                                <label>${extraField?.label}</label>
                                <div class="ssn_ein">
                                    <div class="einCheckbox" onclick="handleEinChecbox('${currentExtraValue?.value}')">
                                        <input ${isEin ? 'checked' : ''} type="checkbox" id="ein-checkbox" />
                                        <label for="ein-checkbox">Open Ein Box</label>
                                    </div>
                                    <div class="ssnCheckbox" onclick="handleSsnCheckbox('${currentExtraValue?.value}')">
                                        <input ${isSsn ? 'checked' : ''} type="checkbox" id="ssn-checkbox" />
                                        <label for="ssn-checkbox">Open SSN Box</label>
                                    </div>
                                </div>
                            </div>
                            <div class="conditionalExtraField">
                                <input
                                    class="${((!isEin && !isSsn) ? 'custom-select disabled' : '') + ' ' + (isEin ? 'einExtraInput' : '') + ' ' + (isSsn ? 'ssnExtraInput' : '')}"
                                    required
                                    placeholder="${extraField?.placeholder}"
                                    value="${currentExtraValue?.value || ''}"
                                    name="extra_field_${extraField.id}"
                                />
                            </div>
                        </div>
                    `;
                };
                return `
                    <div class="editPermitPopup-inputGroup">
                        <label>${extraField?.label}</label>
                        <input required placeholder="${extraField?.placeholder}" value="${currentExtraValue?.value || ''}" name="extra_field_${extraField.id}"/>
                    </div>
                `
            });

            const positionOptions = memberInformation?.isPosition ? memberInformation.options?.officerType?.map((positionOption) => {
                return `<li class="option" data-id="${positionOption?.id}">${positionOption?.name}</li>`;
            }) : ''

            const selectedPositionOption = memberInformation?.isPosition ? memberInformation.options?.officerType?.find((positionOption) => (
                positionOption?.id === memberInformation?.members?.[0]?.officer_type_id
            ))?.name : '';

            const fields = `
                <form>
                    <span class="memberId" data-memberId="${memberInformation?.members?.[0]?.id}" style="display: none;"></span>
                    <div class="memberFields">
                        <div class="editPermitPopup-inputGroup">
                            <label>Registrant Full Name</label>
                            <input placeholder="Enter full name" value="${memberInformation?.members?.[0]?.name || ''}" name="name"/>
                        </div>
                        ${memberInformation?.isPosition ? `
                            <div class="editPermitPopup-inputGroup">
                                <label>Position</label>
                                <div class="custom-dropdown">
                                    <input value="${selectedPositionOption}" type="text" placeholder="Select position..." readonly name="officer_type_id" />
                                    <ul class="options">
                                        ${positionOptions.join('')}
                                    </ul>
                                </div>
                            </div>
                        ` : ''}
                        ${extraFields ? extraFields.join('') : ''}
                    </div>
                    <button class="editPermitPopup__updateButton-member" type='submit'>
                        Update Carrier
                    </button>
                </form>
            `;

            memberForm.innerHTML = fields;
            addInputMasks();

            let rules = {
                name: { required: true },
                officer_type_id: { required: true },
            };

            for(key in extraValidation) {
                rules = {
                    ...rules,
                    ...extraValidation[key]
                };
            };

            const validationMessages = {};

            for(key in rules) {
                validationMessages[key] = `Invalid ${key} value`;
            };

            $(".editPermitPopup__edit-Operation form").removeData('validator');
            $(".editPermitPopup__edit-Operation form").validate().destroy();
            $(".editPermitPopup__edit-Operation form").validate({
                rules,
                messages: validationMessages, 
                submitHandler: async (form) => {
                    const memberIdSpan = form.querySelector('.memberId');
                    const memberId = memberIdSpan.getAttribute('data-memberId');

                    const formData = new FormData(form);
                    const data = {};
            
                    for (let pair of formData.entries()) {
                        data[pair[0]] = pair[1];
                    };

                    await editMember(memberId, data);
                }
            });
        } else {
            addNewMember();
        }
    };
};
// << ------ >>


// this functions contain all logic about Vehicle.
// << ------ >>
async function fillVehicles(
    vehiclesInformation = {
        vehicles: mainData.vehicles,
        extraFields: mainData.fields?.filter(field => field?.group?.name === 'Vehicle'),
        hideBaseVehicles: mainData.carrierDetails?.application_type?.hide_base_vehicles === '1'
    }
) {
    const vehicleTableThead = document.querySelector('.editPermitPopup__edit-vehicles-table thead');
    const vehicleTableTbody = document.querySelector('.editPermitPopup__edit-vehicles-table tbody');

    if(vehiclesInformation.hideBaseVehicles) {
        const tdsOfThead = vehiclesInformation.extraFields?.map((extraField) => {
            return `<td>${extraField?.label || "[ NO LABEL ]"}</td>`;
        });

        const trOfThead = `
            <tr>
                <td>No</td>
                ${tdsOfThead?.join('')}
                <td>Edit</td>
                <td>Delete</td>
            </tr>
        `;
        vehicleTableThead.innerHTML = trOfThead;

        const trOfTbody = vehiclesInformation.vehicles?.map((vehicle, index) => {
            const tdsOfTbody = vehicle?.extra_value.map(extra_value => `<td>${extra_value?.value}</td>`)

            return `
                <tr>
                    <td>${index + 1}</td>
                    ${tdsOfTbody.join('')}
                    <td>
                        <button
                            class="editPermitPopup__edit-vehicles-edit"
                            id="vehicles-edit-${vehicle?.id}"
                            onclick='editVehicle(${vehicle?.id})'
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button
                            class="editPermitPopup__edit-vehicles-delete"
                            id="vehicles-delete-${vehicle?.id}"
                            onclick='deleteVehicle(${vehicle?.id})'
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
        vehicleTableTbody.innerHTML = trOfTbody;
    } else {
        const trOfThead = `
            <tr>
                <td>No</td>
                <td>Year/Make/Model</td>
                <td>GVW</td>
                <td>AXLES WITHOUT TRAILER</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
        `;
        vehicleTableThead.innerHTML = trOfThead;

        const GVWData = await getSelectOptionsGVW();
        
        const trOfTbody = vehiclesInformation.vehicles?.map((vehicle, index) => {
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${vehicle?.year}/${vehicle?.make}/${vehicle?.model}</td>
                    <td>${GVWData?.find((gvwItem) => vehicle?.gvw_id === gvwItem?.id)?.gvw}</td>
                    <td>${vehicle?.axles_without_trailer}</td>
                    <td>
                        <button
                            class="editPermitPopup__edit-vehicles-edit"
                            id="vehicles-edit-${vehicle?.id}"
                            onclick='editVehicle(${vehicle?.id})'
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button
                            class="editPermitPopup__edit-vehicles-delete"
                            id="vehicles-delete-${vehicle?.id}"
                            onclick='deleteVehicle(${vehicle?.id})'
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
        vehicleTableTbody.innerHTML = trOfTbody.join('');
    };

    const vehiclesFormWrapper = document.querySelector('.editPermitPopup__edit-vehicles-form');
    vehiclesFormWrapper.innerHTML = `
        <button class="editPermitPopup__updateButton-vehicle" type='button' onclick="addNewVehicle()">
            Add Another Vehicle
        </button>
    `;

    return;
};

async function editVehicle(vehicleId) {
    const editBtn = document.getElementById(`vehicles-edit-${vehicleId}`);

    // close Edit form.
    // << ------ >>
    if(editBtn.innerHTML.includes('Cancel')) {
        editBtn.innerHTML = 'Edit';
        editBtn.style.background = '#FFA900';
        return fillVehicles();
    };
    // << ------ >>

    // Get selected vehicle for edit.
    // << ------ >>
    const getVehicleApi = `http://192.168.100.155:8080/api/v1/vehicle/${vehicleId}/edit`;
    const userToken = await getUserToken(searchParmas.get('userId'));

    const payload = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    };

    const { data: vehicle } = await useFetch(getVehicleApi, payload, (responseData) => {
        if(responseData.isLoading) {
            editBtn.innerHTML = '<span class="small-loading"></span>';
        } else if (responseData.isError) {
            toastifyMessage('something is wrong', 'error');
            editBtn.innerHTML = 'Edit';
            editBtn.style.background = '#FFA900';
        } else {
            const allEditBtns = [...document.querySelectorAll('.editPermitPopup__edit-vehicles-edit')];
            allEditBtns.forEach((editBtn) => {
                editBtn.innerHTML = 'Edit';
                editBtn.style.background = '#FFA900';
            });

            editBtn.innerHTML = 'Cancel Edit';
            editBtn.style.background = 'rgb(0, 29, 74)';
        };
    });
    const selectedVehicle = vehicle?.data;
    // << ------ >>

    // create form for edit selected Vehicle.
    // << ------ >>
    const vehiclesInformation = {
        hideBaseVehicles: mainData.carrierDetails.application_type?.hide_base_vehicles === '1',
        extraFields: mainData.fields?.filter(field => field?.group?.name === 'Vehicle'),
    };
    
    const vehiclesFormWrapper = document.querySelector('.editPermitPopup__edit-vehicles-form');

    const newVehicleForm = document.createElement('form');
    newVehicleForm.setAttribute('data-vehicleId', vehicleId);

    let vehicleForm = `
        <div class="vehicleFields">
            **staticVehicles**
            **extraValues**
        </div>
        <button class="editPermitPopup__updateButton-vehicle" type='submit'>
            Update Vehicle
        </button>
    `;
    // << ------ >>

    // Extra Values.
    // << ------ >>
    const extraVehiclesFields = vehiclesInformation.extraFields?.map((extraField) => {
        const currentExtra = selectedVehicle?.extra_value?.find((extraValue) => extraValue?.extra_field_id === extraField?.id);
        const currentExtraValue = Array.isArray(currentExtra?.value) ? currentExtra?.value?.[0] : currentExtra?.value; 
        const currentExtraBaseName = currentExtra?.baseName; 

        // check this extra filed should be or not. this conditions up extra extraGvw.
        // << ------ >>
        let isNoneExtraField = false;
        const extraGvws = extraField?.extra_gvw;
        if(Array.isArray(extraGvws) && extraGvws.length) {
            const isActiveExtraGvwField = extraGvws.find(gvw => gvw.id === selectedVehicle?.gvw?.id);
            if(!isActiveExtraGvwField) {
                isNoneExtraField = true;
            };
        };

        // check inactive extraFields reason.
        let inactiveReson = null
        if(Array.isArray(extraGvws) && extraGvws.length) {
            inactiveReson = 'gvw';
        };

        if(Array.isArray(extraField?.extra_vehicle_statuses) && extraField.extra_vehicle_statuses.length) {
            const allStatusesByClassname = extraField.extra_vehicle_statuses.map(status => status?.name)?.join(' ');
            inactiveReson = allStatusesByClassname + ' status';
            if(!inactiveReson.includes(selectedVehicle?.status)) {
                isNoneExtraField = true;
            };
        };
        // << ------ >>

        // Extra field Select case. 
        if(extraField?.type?.name === 'select') {
            const extraOptions = extraField?.extra_tag?.map(option => {
                return `<li class="option" data-id="${option?.id}">${option?.name}</li>`;
            });

            return `
                <div class="editPermitPopup-inputGroup ${inactiveReson ? `${isNoneExtraField ? 'none' : ''} ` + inactiveReson: ""}">
                    <label>${extraField?.label || "[ NO LABEL ]"}</label>
                    <div class="custom-dropdown">
                        <input
                            value="${currentExtraValue || ""}"
                            type="text"
                            placeholder="${extraField?.placeholder || 'Select'}"
                            name="extra_field_${extraField?.id}"
                            readonly
                        />
                        <ul class="options">
                            ${extraOptions?.join('')}
                        </ul>
                    </div>
                </div>
            `;
        };

        // Extra field File case. 
        if(extraField?.type?.name === 'file') {
            return `
                <div class="editPermitPopup-inputGroup ${inactiveReson ? `${isNoneExtraField ? 'none' : ''} ` + inactiveReson: ""}">
                    <label>${extraField?.label}</label>
                    <input
                        ${extraField?.is_main === 1 ? `data-additional-key="${extraField?.key}"` : ''}
                        placeholder="${extraField?.placeholder}"
                        type="${extraField?.type?.name}"
                        id="extra_field_${extraField?.id}"
                    />
                    <label class="forFile ${currentExtraValue ? 'success' : ''}" for="extra_field_${extraField?.id}">
                        <input
                            name="extra_field_${extraField?.id}"
                            type="text"
                            value="${currentExtraValue ? currentExtraValue : ""}"
                        />
                        <span class="placeholder" style="${currentExtraValue ? "display: none;": ""}">
                            ${extraField?.placeholder}
                        </span>
                        <span class="uploadedFileName" style="${currentExtraValue ? "display: -webkit-box;": ""}">${currentExtraBaseName || ""}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 56 45" fill="none">
                            <path d="M46.9749 40H11.0999C-2.61707 33.8936 5.29651 20.6624 11.0999 18.6269C12.6825 -0.710701 32.2027 3.86934 35.3683 12.0113C44.6535 9.16157 46.9749 16.5913 46.9749 20.6624C58.7925 30.8401 51.8989 37.7948 46.9749 40Z" fill="#3A9EFE" stroke="#3A9EFE"/>
                            <path d="M28.8203 34.0469H22.3203V24.5469H15.3203L25.3203 14.0469L35.3203 24.5469H28.8203V34.0469Z" fill="white" stroke="white" stroke-linejoin="round"/>
                        </svg>
                    </label>
                </div>
            `;
        };

        // Extra fields for both simple text or numbers and file fields.
        return `
            <div class="editPermitPopup-inputGroup ${inactiveReson ? `${isNoneExtraField ? 'none' : ''} ` + inactiveReson: ""}">
                <label>${extraField?.label}</label>
                <input
                    ${extraField?.is_main === 1 ? `data-additional-key="${extraField?.key}"` : ''}
                    placeholder="${extraField?.placeholder}"
                    value="${currentExtraValue || ""}"
                    name="extra_field_${extraField?.id}"
                    type="${extraField?.type?.name}"
                />
            </div>
        `;
    });
    vehicleForm = vehicleForm.replace('**extraValues**', extraVehiclesFields?.join(''));
    // << ------ >>


    // Base Vehicles Fields.
    // << ------ >>
    if(vehiclesInformation.hideBaseVehicles) {
        // In this case, I only include extra fields no other static fields.
        vehicleForm = vehicleForm.replace('**staticVehicles**', '');
    } else {
        // In this case, I include static fields.
        const staticVehicleFields = await new GetStaticVehicleFieldsData().getFields({
            ...selectedVehicle,
            gvw: selectedVehicle?.gvw?.gvw
        });
        vehicleForm = vehicleForm.replace('**staticVehicles**', staticVehicleFields);
    };
    // << ------ >>

    // Put ready Vehicles.
    newVehicleForm.innerHTML = vehicleForm;
    vehiclesFormWrapper.innerHTML = '';
    vehiclesFormWrapper.appendChild(newVehicleForm);

    // Update event handlers.
    addInputMasks();
    handleGlobalCustomSelects();
    addListenersForAllFileInputes();
    autocomplateOffForAllTextInputes();
    addListenersForVinNumber();

    // Validate Extra Fields Form.
    validateEditForm();
};

function validateEditForm(dynamicValidateRules) {
    const extraFields = mainData.fields?.filter(field => field?.group?.name === 'Vehicle');
    const extraValidation = extraFields?.map((extraField) => ({
        [`extra_field_${extraField.id}`]: { [extraField?.validation?.[0]?.conditions]: true }
    }));

    // validate Rules.
    const hideBaseVehicles = mainData.carrierDetails.application_type?.hide_base_vehicles === '1';
    let rules = {};

    const gvwInput = document?.querySelector('input[name="gvw"]');
    const isLessMinimumGvw = gvwInput?.value?.toLowerCase()?.includes('less'); 

    const dynamicInitialValidation = {};

    if(isLessMinimumGvw) {
        dynamicInitialValidation.axles_with_trailer = { max: 24, min: 3 };
        dynamicInitialValidation.axles_without_trailer = { required: true, max: 24, min: 3 }
    };

    if(!hideBaseVehicles) {
        rules = {
            gvw: { required: true },
            purchased_price: { required: true },
            status: { required: true },
            titled_state: { required: true },
            vin: { required: true, min: 17 },
            year: { required: true },
            make: { required: true },
            model: { required: true },
            axles_with_trailer: { max: 24, min: 2 },
            axles_without_trailer: { required: true, max: 24, min: 2 },
            ...dynamicInitialValidation,
        };
        if(dynamicValidateRules) {
            rules = {
                ...rules,
                ...dynamicValidateRules
            };
        };

        const axlesWithoutTrailer = document.querySelector('input[name="axles_without_trailer"]'); 
        const axlesWithoutTrailerValue = Number(axlesWithoutTrailer?.value);
        if(rules.axles_with_trailer.min < axlesWithoutTrailerValue) {
            rules.axles_with_trailer.min = axlesWithoutTrailerValue;
        };
    };

    for(key in extraValidation) {
        rules = {
            ...rules,
            ...extraValidation[key]
        };
    };

    // Validate Messages.
    const validationMessages = {};

    for(key in rules) {
        validationMessages[key] = `Invalid ${key} value`;
    };

    $(".editPermitPopup__edit-vehicles-form form").removeData('validator');
    $(".editPermitPopup__edit-vehicles-form form").validate().destroy();
    $(".editPermitPopup__edit-vehicles-form form").validate({
        rules,
        messages: validationMessages,
        submitHandler: async (form) => {
            const vehicleId = form.getAttribute('data-vehicleId');
            const editVehicleApi = `http://192.168.100.155:8080/api/v1/vehicle/${vehicleId}`;
            const updateVhicleBtn = form.querySelector('button[type="submit"]');
            const agentName = document.querySelector('#admin');

            const formData = new FormData(form);
            const data = {};

            for (let pair of formData.entries()) {
                if(pair[0] === 'gvw') {
                    const selectedGvwId = mainData.GVWData.find((gvw) => gvw?.gvw === pair[1]);
                    data.gvw_id = selectedGvwId?.id;
                } else {
                    if(pair[1].includes('base64')) {
                        data[pair[0]] = [pair[1]];
                    } else {
                        data[pair[0]] = pair[1];
                    }
                };
            };

            const userToken = await getUserToken(searchParmas.get('userId'));

            const payload = {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    admin: agentName?.value || 'sudashan',
                    permit_id: mainData.orderDetails?.permit_id,
                    ...data,
                })
            };

            await useFetch(editVehicleApi, payload, (responseData) => {
                if(responseData?.isLoading) {
                    updateVhicleBtn.innerHTML = '<span class="small-loading"></span>';
                } else if (responseData?.isError) {
                    updateVhicleBtn.innerHTML = 'Update Vehicle';
                    toastifyMessage('something is wrong', 'error');
                } else {
                    toastifyMessage('new Vehicle Added');
                    const vehiclesFormWrapper = document.querySelector('.editPermitPopup__edit-vehicles-form');
                    vehiclesFormWrapper.innerHTML = '';
                    render();
                };
            });
        }
    });
};

async function deleteVehicle(vehicleId) {
    const vehicleDeleteApi = `http://192.168.100.155:8080/api/v1/vehicle/${vehicleId}`;

    const userToken = await getUserToken(searchParmas.get('userId'));
    const agentName = document.querySelector('#admin');

    const payload = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
            admin: agentName?.value || 'sudashan',
        })
    };

    const vehicleDeleteBtn = document.getElementById(`vehicles-delete-${vehicleId}`);

    await useFetch(vehicleDeleteApi, payload, async (responseData) => {
        if(responseData.isLoading) {
            vehicleDeleteBtn.innerHTML = '<span class="small-loading"></span>';
        } else if(responseData.isError) {
            toastifyMessage('somthing is wrong 😞 !!!', 'error');
            vehicleDeleteBtn.innerHTML = 'Delete';
        } else {
            toastifyMessage('succsesfull Vehicle Delete 😊');
            vehicleDeleteBtn.innerHTML = 'Delete';
            await render();
        };
    });
};

async function addNewVehicle() {
    const vehiclesInformation = {
        extraFields: mainData.fields?.filter(field => field?.group?.name === 'Vehicle'),
        vehicles: mainData.vehicles,
        hideBaseVehicles: mainData.carrierDetails.application_type?.hide_base_vehicles === '1'
    };
    
    const vehiclesFormWrapper = document.querySelector('.editPermitPopup__edit-vehicles-form');

    const newVehicleForm = document.createElement('form');

    let vehicleForm = `
        <div class="vehicleFields">
            **staticVehicles**
            **extraValues**
        </div>
        <button class="editPermitPopup__updateButton-vehicle" type='submit'>
            Add Another Vehicle
        </button>
    `;

    // Extra Vehicles.
    // << ------ >>
    const extraVehiclesFields = vehiclesInformation.extraFields?.map((extraField) => {

        // check inactive extraFields reason
        let inactiveReson = null
        if(Array.isArray(extraField?.extra_gvw) && extraField.extra_gvw.length) {
            inactiveReson = 'gvw';
        };

        if(Array.isArray(extraField?.extra_vehicle_statuses) && extraField.extra_vehicle_statuses.length) {
            const allStatusesByClassname = extraField.extra_vehicle_statuses.map(status => status?.name)?.join(' ');
            inactiveReson = allStatusesByClassname + ' status';
        };

        // Select Extra field case.
        if(extraField?.type?.name === 'select') {
            const extraOptions = extraField?.extra_tag?.map(option => {
                return `<li class="option" data-id="${option?.id}">${option?.name}</li>`;
            });

            return `
                <div class="editPermitPopup-inputGroup ${inactiveReson ? 'none ' + inactiveReson: ""}">
                    <label>${extraField?.label || "[ NO LABEL ]"}</label>
                    <div class="custom-dropdown">
                        <input value="" type="text" placeholder="${extraField?.placeholder || 'Select'}" readonly name="extra_field_${extraField?.id}" />
                        <ul class="options">
                            ${extraOptions?.join('')}
                        </ul>
                    </div>
                </div>
            `;
        };

        if(extraField?.type?.name === 'file') {
            return  `
                <div class="editPermitPopup-inputGroup ${inactiveReson ? 'none ' + inactiveReson: ""}">
                    <label>${extraField?.label}</label>
                    <input
                        ${extraField?.is_main === 1 ? `data-additional-key="${extraField?.key}"` : ''}
                        placeholder="${extraField?.placeholder}"
                        value=""
                        type="${extraField?.type?.name}"
                        id="extra_field_${extraField?.id}"
                    />
                    <label class="forFile" for="extra_field_${extraField?.id}">
                        <input
                            name="extra_field_${extraField?.id}"
                            type="text"
                            value=""
                        />
                        <span class="placeholder">
                            ${extraField?.placeholder}
                        </span>
                        <span class="uploadedFileName"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 56 45" fill="none">
                            <path d="M46.9749 40H11.0999C-2.61707 33.8936 5.29651 20.6624 11.0999 18.6269C12.6825 -0.710701 32.2027 3.86934 35.3683 12.0113C44.6535 9.16157 46.9749 16.5913 46.9749 20.6624C58.7925 30.8401 51.8989 37.7948 46.9749 40Z" fill="#3A9EFE" stroke="#3A9EFE"/>
                            <path d="M28.8203 34.0469H22.3203V24.5469H15.3203L25.3203 14.0469L35.3203 24.5469H28.8203V34.0469Z" fill="white" stroke="white" stroke-linejoin="round"/>
                        </svg>
                    </label>
                </div>
            `;
        };

        // Extra fields for both simple text or numbers and file fields.
        return `
            <div class="editPermitPopup-inputGroup ${inactiveReson ? 'none ' + inactiveReson: ""}">
                <label>${extraField?.label}</label>
                <input
                    ${extraField?.is_main === 1 ? `data-additional-key="${extraField?.key}"` : ''}
                    placeholder="${extraField?.placeholder}"
                    value=""
                    name="extra_field_${extraField?.id}"
                    type="${extraField?.type?.name}"
                />
            </div>
        `;
    });

    vehicleForm = vehicleForm.replace('**extraValues**', extraVehiclesFields?.join(''));
    // << ------ >>

    // Base Vehicles Fields.
    // << ------ >>
    if(vehiclesInformation.hideBaseVehicles) {
        // In this case, I only include extra fields no other static fields.
        vehicleForm = vehicleForm.replace('**staticVehicles**', '');
    } else {
        // In this case, I include static fields.
        const staticVehicleFields = await new GetStaticVehicleFieldsData().getFields();
        vehicleForm = vehicleForm.replace('**staticVehicles**', staticVehicleFields);
    };
    // << ------ >>
    
    // Put ready Vehicles.
    newVehicleForm.innerHTML = vehicleForm;
    vehiclesFormWrapper.innerHTML = '';
    vehiclesFormWrapper.appendChild(newVehicleForm);

    // Update event handlers.
    addInputMasks();
    handleGlobalCustomSelects();
    addListenersForAllFileInputes();
    autocomplateOffForAllTextInputes();
    addListenersForVinNumber();

    // Validate Form.
    $.removeData(newVehicleForm, 'validator');
    validateNewVehicleForm();
};

function validateNewVehicleForm(dynamicValidateRules) {
    const vehiclesInformation = {
        extraFields: mainData.fields?.filter(field => field?.group?.name === 'Vehicle'),
        vehicles: mainData.vehicles,
        hideBaseVehicles: mainData.carrierDetails.application_type?.hide_base_vehicles === '1'
    };

    const extraValidation = vehiclesInformation.extraFields?.map((extraField) => ({
        [`extra_field_${extraField.id}`]: { [extraField?.validation?.[0]?.conditions]: true }
    }));

    // validate Rules.
    
    const gvwInput = document?.querySelector('input[name="gvw"]');
    const isLessMinimumGvw = gvwInput?.value?.toLowerCase()?.includes('less'); 

    const dynamicInitialValidation = {};

    if(isLessMinimumGvw) {
        dynamicInitialValidation.axles_with_trailer = { max: 24, min: 3 };
        dynamicInitialValidation.axles_without_trailer = { required: true, max: 24, min: 3 }
    };
    
    let rules = {};
    if(!vehiclesInformation.hideBaseVehicles) {
        rules = {
            gvw: { required: true },
            purchased_price: { required: true },
            axles_with_trailer: { max: 24, min: 2 },
            axles_without_trailer: { required: true, max: 24, min: 2 },
            status: { required: true },
            titled_state: { required: true },
            vin: { required: true },
            year: { required: true },
            make: { required: true },
            model: { required: true },
            ...dynamicInitialValidation
        };

        if(dynamicValidateRules) {
            rules = {
                ...rules,
                ...dynamicValidateRules
            };
        };

        const axlesWithoutTrailer = document.querySelector('input[name="axles_without_trailer"]'); 
        const axlesWithoutTrailerValue = Number(axlesWithoutTrailer?.value);
        if(rules.axles_with_trailer.min < axlesWithoutTrailerValue) {
            rules.axles_with_trailer.min = axlesWithoutTrailerValue;
        };
    };

    for(key in extraValidation) {
        rules = {
            ...rules,
            ...extraValidation[key]
        };
    };

    // Validate Messages.
    const validationMessages = {};

    for(key in rules) {
        validationMessages[key] = `Invalid ${key} value`;
    };


    $(".editPermitPopup__edit-vehicles-form form").removeData('validator');
    $(".editPermitPopup__edit-vehicles-form form").validate().destroy();
    $(".editPermitPopup__edit-vehicles-form form").validate({
        rules,
        messages: validationMessages, 
        submitHandler: async (form) => {
            const addNewVehicleApi = 'http://192.168.100.155:8080/api/v1/vehicle';
            const vehiclesFormWrapper = document.querySelector('.editPermitPopup__edit-vehicles-form');
            const addNewVhicleBtn = vehiclesFormWrapper.querySelector('button[type="submit"]');

            const formData = new FormData(form);
            const data = {};

            for (let pair of formData.entries()) {
                if(pair[0] === 'gvw') {
                    const selectedGvwId = mainData.GVWData.find((gvw) => gvw?.gvw === pair[1]);
                    data.gvw_id = selectedGvwId?.id;
                } else {
                    data[pair[0]] = pair[1].includes('base64') ? [pair[1]] : pair[1];
                };
            };

            const userToken = await getUserToken(searchParmas.get('userId'));

            const payload = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    admin: 'sudashan',
                    permit_id: mainData.orderDetails?.permit_id,
                    ...data,
                })
            };

            await useFetch(addNewVehicleApi, payload, (responseData) => {
                if(responseData?.isLoading) {
                    addNewVhicleBtn.innerHTML = '<span class="small-loading"></span>';
                } else if (responseData?.isError) {
                    addNewVhicleBtn.innerHTML = 'Add Another Vehicle';
                    toastifyMessage('something is wrong <--', 'error');
                } else {
                    addNewVhicleBtn.innerHTML = 'Add Another Vehicle';
                    toastifyMessage('new Vehicle Added');
                    vehiclesFormWrapper.innerHTML = '';
                    render();
                };
            });
        }
    });
};
// << ------ >>

// Event handlers.
// << ------ >>

// Handle einCheckbox.
function handleEinChecbox() {
    const einCheckbox = document.querySelector('.einCheckbox input');
    const ssnCheckbox = document.querySelector('.ssnCheckbox input');
    
    if(ssnCheckbox.checked) {
        ssnCheckbox.checked = false;
    };
    einCheckbox.checked = true;
    
    const conditionalInput = document.querySelector('.conditionalExtraField input');
    
    if(conditionalInput.classList.contains('ssnExtraInput')) {
        conditionalInput.classList.remove('ssnExtraInput');
    };
    
    conditionalInput.classList.remove('custom-select');
    conditionalInput.classList.remove('disabled');
    
    conditionalInput.classList.add('einExtraInput');
    
    addInputMasks();
};

// Handle ssnCheckbox.
function handleSsnCheckbox() {
    const ssnCheckbox = document.querySelector('.ssnCheckbox input');
    const einCheckbox = document.querySelector('.einCheckbox input');

    if(einCheckbox.checked) {
        einCheckbox.checked = false;
    };
    ssnCheckbox.checked = true;

    const conditionalInput = document.querySelector('.conditionalExtraField input');

    if(conditionalInput.classList.contains('einExtraInput')) {
        conditionalInput.classList.remove('einExtraInput');
    };

    conditionalInput.classList.remove('custom-select');
    conditionalInput.classList.remove('disabled');

    conditionalInput.classList.add('ssnExtraInput');

    addInputMasks();
};

// add masks for all formats. 
function addInputMasks() {
    // Add input mask for phone.
    $('input[name="phone"]').inputmask({mask: "(999) 999-9999"});
    $('input[name="carrierForm_phone"]').inputmask({mask: "(999) 999-9999"});
    $('input[placeholder="EIN Number"]').inputmask({mask: "99-9999999"});
    $('.einExtraInput').inputmask({mask: "99-9999999"});
    $('input[placeholder="SSN"]').inputmask({mask: "999-99-9999"});
    $('.ssnExtraInput').inputmask({mask: "999-99-9999"});
    $('input[name="purchased_price"]').inputmask({
        alias: 'numeric',
        groupSeparator: ',',
        max: 99999999,
        autoGroup: true,
        digits: 0,
        digitsOptional: false,
        prefix: '$',
        rightAlign: false,
        autoUnmask: true,
    });
    $('input[name="axles_with_trailer"]').inputmask({ mask: '99', placeholder: '' });
    $('input[name="axles_without_trailer"]').inputmask({ mask: '99', placeholder: '' });
    $('input[name="vin"]').inputmask({ mask: '*****************', placeholder: '' });

    const allYears = [...document.querySelectorAll('input[name="year"]')];
    allYears.forEach((yearInput) => {
        new Datepicker(yearInput, {
            format: 'yyyy',
            autohide: true,
            pickLevel: 2,
            disableTouchKeyboard: true,
            minDate: new Date(1990, 0, 1),
            maxDate: new Date(new Date().getFullYear() + 2, 11, 31),
        }); 
    });
};

// Custom Select.
function handleGlobalCustomSelects() {
    const dropdowns = [...document.querySelectorAll('.custom-dropdown')];
    
    // Select Value
    dropdowns.forEach((dropdown) => {
        const listOfOptions = [...dropdown.querySelectorAll('.option')];
        const input = dropdown.querySelector('input');
        listOfOptions.forEach((option) => {
            const listenerCallback = (event) => {
                const isContactUs = event.currentTarget?.getAttribute('data-contact_us') === '1';
                const isLessMinimumGvw = event.currentTarget?.getAttribute('data-is_less_minimum_gvw');
                const isGvw = event.currentTarget?.getAttribute('data-contact_us');
                const optionId = event.currentTarget?.getAttribute('data-id');
                
                if(isContactUs) {
                    // Open contact us Modal.
                    const modal = document.querySelector('.contact-us-modal');
                    const moadlMessage = modal.querySelector('p');
                    moadlMessage.innerHTML = `you can't continue fill vehicle with ${option.innerHTML} <span>GVW</span> `;
                    modal.classList.add('active');
                    return;
                };

                if(isGvw) {
                    // update validate rules with new conditions.
                    const validateRules = {
                        axles_with_trailer: { max: 24, min: isLessMinimumGvw ? 3 : 2 },
                        axles_without_trailer: { required: true, max: 24, min: isLessMinimumGvw ? 3 : 2 },
                    };

                    const axlesWithoutTrailer = document.querySelector('input[name="axles_without_trailer"]'); 
                    const axlesWithoutTrailerValue = Number(axlesWithoutTrailer?.value);
                    if(validateRules.axles_with_trailer.min < axlesWithoutTrailerValue) {
                        validateRules.axles_with_trailer.min = axlesWithoutTrailerValue;
                    };

                    const vehicleForm = document.querySelector('.editPermitPopup__edit-vehicles-form form');
                    const isEdit = Boolean(vehicleForm.getAttribute('data-vehicleid'));
                    const isNewVehicle = Boolean(vehicleForm.getAttribute('data-vehicleid')) === false;

                    if(isEdit) {
                        const form = document.querySelector(".editPermitPopup__edit-vehicles-form form");
                        const allInputes = [...form.querySelectorAll('input')]; 
                        const isError = allInputes.find((input) => input.classList.contains('error'));

                        validateEditForm(validateRules);

                        if(isError) {
                            $(".editPermitPopup__edit-vehicles-form form").valid();
                        };
                    };

                    if(isNewVehicle) {
                        const form = document.querySelector(".editPermitPopup__edit-vehicles-form form");
                        const allInputes = [...form.querySelectorAll('input')]; 
                        const isError = allInputes.find((input) => input.classList.contains('error'));

                        validateNewVehicleForm(validateRules);

                        if(isError) {
                            $(".editPermitPopup__edit-vehicles-form form").valid();
                        };
                    };
                };

                if(optionId !== undefined) {
                    input.setAttribute('data-id', optionId);
                };

                input.value = event.currentTarget.textContent
            };
            option.removeEventListener('click', listenerCallback);
            option.addEventListener('click', listenerCallback);
        });
    });
    
    // Toogle Dropdown
    dropdowns.forEach((dropdown) => {
        const listenerCallback = (event) => {
            event.stopPropagation();
            dropdown.classList.toggle('opened');
        };
        dropdown.removeEventListener('click', listenerCallback);
        dropdown.addEventListener('click', listenerCallback);
    });
    
    // Close Dropdown
    const listenerCallback = () => {
        dropdowns.forEach((dropdown) => {
            if (dropdown.classList.contains('opened')) {
                dropdown.classList.remove('opened');
            };
        });
    };
    document.removeEventListener('click', listenerCallback);
    document.addEventListener('click', listenerCallback);
};

// file Inputs. 
function addListenersForAllFileInputes() {
    // change all input files.
    const allFileInputes = [...document.querySelectorAll('input[type="file"]')];
    allFileInputes.forEach((fileInput) => {
        fileInput.addEventListener('input', async (event) => {
            const file = event?.target?.files?.[0];
            const fileType = file?.type?.slice(file?.type?.indexOf('/') + 1, file?.type?.length);
            const inputGroup = event?.target?.parentNode;
            const labelForFile = inputGroup.querySelector('.forFile');
            const hiddenTextInput = labelForFile.querySelector('input');
            const uploadedFileSpan = inputGroup.querySelector('.uploadedFileName');
            const placeholder = inputGroup.querySelector('.placeholder');

            if(file?.size > 2048000) {
                toastifyMessage('the file size is large please compress file', 'error');
                event.target.value = '';
                hiddenTextInput.value = '';
                uploadedFileSpan.style.display = 'none';
                placeholder.style.display = '-webkit-box';
                labelForFile.classList.remove('success');
                return;
            };

            if(!mainData.allExtensions.includes(fileType)) {
                toastifyMessage('file type is incorect', 'error');
                event.target.value = '';
                hiddenTextInput.value = '';
                uploadedFileSpan.style.display = 'none';
                placeholder.style.display = '-webkit-box';
                labelForFile.classList.remove('success');
                return;
            };

            const base64File = await readFileAsBase64(file);
            hiddenTextInput.value = `data:${file?.type};base64,`+base64File;

            uploadedFileSpan.innerHTML = file?.name;
            uploadedFileSpan.style.display = '-webkit-box';
            placeholder.style.display = 'none';
            labelForFile.classList.add('success');
        });
    });
};

function addListenersForVinNumber() {
    // Select the vin number Input elements.
    const vinInputes = [...document.querySelectorAll('input[name="vin"]')];
    
    // call Debounce method for get other data from vin.
    
    vinInputes.forEach((vinInut) => {
        vinInut.onpaste = (event) => {
            handleVinChange(event.target.value);
        };

        vinInut.oninput = (event) => {
            handleVinChange(event.target.value);
        };
    });

};

// all Vehicle Text inputes make autocomplate false.
function autocomplateOffForAllTextInputes() {
    // Select the input elements
    const textInputes = [...document.querySelectorAll('.editPermitPopup__edit-vehicles-form input[type="text"]')];

    // Disable autocompletes
    textInputes.forEach((input) => {
        input.autocomplete = 'off';
    });
};

// handle trailers change.
function trailerValidation (event) {
    const input = event.target.value.replaceAll('_', '');
    const name = event.target.name;

    if(name === 'axles_without_trailer') {
        const vehicleForm = document.querySelector('.editPermitPopup__edit-vehicles-form form');
        const isEdit = Boolean(vehicleForm.getAttribute('data-vehicleid'));
        const isNewVehicle = Boolean(vehicleForm.getAttribute('data-vehicleid')) === false;

        if(isEdit) {
            const form = document.querySelector(".editPermitPopup__edit-vehicles-form form");
            const allInputes = [...form.querySelectorAll('input')]; 
            const isError = allInputes.find((input) => input.classList.contains('error'));

            validateEditForm();

            if(isError) {
                $(".editPermitPopup__edit-vehicles-form form").valid();
            };
        };

        if(isNewVehicle) {
            const form = document.querySelector(".editPermitPopup__edit-vehicles-form form");
            const allInputes = [...form.querySelectorAll('input')]; 
            const isError = allInputes.find((input) => input.classList.contains('error'));
            validateNewVehicleForm();
            if(isError) {
                $(".editPermitPopup__edit-vehicles-form form").valid();
            };
        };
    };

    if(!Number(input)) {
        return;
    };

    const firstChar = Number(input[0]);
    const value = Number(input);

    if(firstChar > 2) {
        return event.target.value = firstChar; 
    };
    if((firstChar === 2 && value > 24) || value > 24) {
        return event.target.value = firstChar;
    };

};

// handle GVW change.
function handleGvwChange(gvwId) {
    if(mainData.carrierDetails?.application_type?.hide_base_vehicles === '0') {
        const extraFields = mainData.fields?.filter(field => field?.group?.name === 'Vehicle');
        const extraGvw = extraFields.find(field => Array.isArray(field?.extra_gvw) && field.extra_gvw.length)?.extra_gvw;
        const isActiveExtraGvwField = extraGvw.find(gvw => gvw.id === gvwId);
        const extraField = document.querySelector('.editPermitPopup-inputGroup.gvw');

        if(isActiveExtraGvwField) {
            extraField.classList.remove('none');
        } else {
            extraField.classList.add('none');
        };
    };
};

// handle Vehicle Status change.
function handleStatusChange(selectedText) {
    // all Extra Fileds whiches up the status.
    const allExtraFields = [...document.querySelectorAll(`.editPermitPopup-inputGroup.status`)];

    allExtraFields.forEach((extraField) => {
        extraField.classList.add('none');
    });

    // all Active Extra Fileds whiches up the status.
    const allActiveExtraFields = [...document.querySelectorAll(`.editPermitPopup-inputGroup.${selectedText}`)];

    allActiveExtraFields.forEach((extraField) => {
        extraField.classList.remove('none');
    });
};

// all about Vin Number input change.
// << ------ >>
const memoVinNumbers = new Map();

// get Vin Number date for fill year, make model.
const getVinData = async (vinNumber) => {
    // select all year, make model inputes.
    const makeInputes = [...document.querySelectorAll('input[name="make"]')];
    const modelInputes = [...document.querySelectorAll('input[name="model"]')];
    const yearInputes = [...document.querySelectorAll('input[name="year"]')];

    // check is this vin number already get from backend.
    if(memoVinNumbers.has(vinNumber)) {
        // get data from my memorize object and put it in inputes.
        putFindedDateInInputes(memoVinNumbers.get(vinNumber));
        // return becouse don't want to call again.
        return;
    };

    // concat all inputes, for all the logic is same.
    const allInputes = [...makeInputes, ...modelInputes, ...yearInputes];

    // call content.
    const api = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vinNumber}?format=json`;
    const payload = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    };

    await useFetch(api, payload, (responseData) => {
        if(responseData.isLoading) {
            setDisabledAttributes();
        } else if (responseData.isError) {
            toastifyMessage('somthing wrong with vin number api', 'error');
            removeDisabledAttributes();
        } else if (responseData.data) {
            const usefulDate = {
                year: responseData.data?.Results?.[0]?.ModelYear || '',
                make: responseData.data?.Results?.[0]?.Make || '',
                model: responseData.data?.Results?.[0]?.Model || ''
            };
            memoVinNumbers.set(vinNumber, usefulDate);

            const isValidResult = usefulDate.model || usefulDate.make || usefulDate.year;
 
            if(isValidResult) {
                putFindedDateInInputes(usefulDate);
            };
            removeDisabledAttributes();
        };
    });

    function setDisabledAttributes() {
        allInputes.forEach((input) => {
            input.setAttribute('disabled', '');
        });
    };

    function removeDisabledAttributes() {
        allInputes.forEach((input) => {
            input.removeAttribute('disabled', '');
        });
    };

    function putFindedDateInInputes(data) {
        makeInputes.forEach((makeInput) => {
            makeInput.value = data.make || makeInput.value;
        });
        modelInputes.forEach((modelInput) => {
            modelInput.value = data.model || modelInput.value;
        });
        yearInputes.forEach((yearInput) => {
            yearInput.value = data.year || yearInput.value;
        });
    };
};

// debounce function is return them function which I call when vin change.
const debouncedVinCallback = debounce((value) => {
    if(value.length === 17) {
        getVinData(value); 
    };
}, 500);

// handle Vin Input cahnge.
function handleVinChange(value) {
    debouncedVinCallback(value);
};
// << ------ >>

// handle Titled State change.
function handleTitledState(selectedText) {
    // check is titled_state of selected state has value 1 and selected state is no user can't continue. 
    if(selectedText === 'No' && mainData.carrierDetails?.state?.titled_state === '1') {
        // open modal for note.
        const modal = document.querySelector('.contact-us-modal');
        const modalContent = modal.querySelector('.contact-us-modal__content');
        modalContent.style.gap = '10px';
        const moadlMessage = modal.querySelector('p');
        moadlMessage.innerHTML = `you can't continue fill vehicle with No <span>Vehicle Titled</span>, it's up on ${mainData.carrierDetails?.state?.state} state`;
        modal.classList.add('active');
    };
};
// << ------ >>


// Get permit information.
async function render() {
    await getOrderDetails({ order_id: searchParmas.get('orderId'), user_id: searchParmas.get('userId') });
    handleGlobalCustomSelects();
    addInputMasks();
};

// Edit page start filling process from here.
render();