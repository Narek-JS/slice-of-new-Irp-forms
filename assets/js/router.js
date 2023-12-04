/**
 * DATA SEND BACK END URL-S
 */
const sendBackDetails = '/orders/permitDetails.php';

const sendBackBusinessDetails = '/business/details.php';

/**
 * POST Path for retrieving  Access Token Users For Ip {AdminLogin}.
 */
const urlLoginAdmin = '/ManageUser/AdminLogin';
/**
 * POST Path for retrieving {orders}.
 */
const orderGetAllOrder = '/Order/GetAllOrder';
/**
 * GET Path for retrieving {ordersID}.
 */
const OrderGetOrderDetail = '/Order/GetOrderDetail';

/**
 * POST Path for retrieving {orders}.
 */
const getAllClient = '/ManageUser/GetAllUserInfo';
const getAllBusinessesByUserId = '/Business/GetAllBusinessByUserRefAdmin';
const getSalesReports = '/Report/GetReportPayment';
const getAllPosts = '/News/GetAllNews';
const getAllEmailTemplates = '/EmailTemplate/GetAllEmailTemplate';
const getAllMessageTemplates = '/SMSTemplate/GetAllSMSTemplate';
const getAllServices = '/Service/GetAllDetailService';

/**
 * POST Path for retrieving {Add Void, Dispute  AND Refund}.
 */
const addVoidRefundDispute = '/Permit/AddPermit';
/**
 * Edit Path for retrieving {Add Void, Dispute  AND Refund}.
 */
const editVoidRefundDispute = '/Permit/EditPermit';




/**
 * POST AJAX Request with Body Parameter
 *
 * @param {string} url - The URL of the request.
 * @param {object} params - The data to be sent in the reque    st body.
 * @returns {data}  data - A promise that resolves with the result of the AJAX request.
 */
const post = async (url, params,token) => {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const data = await response.json();
    return data;
};

/**
 * GET AJAX Request with
 *
 * @param {string} url - The URL of the request.
 * @param {object} params - The data to be sent in the request body.
 * @returns {data}  data - A promise that resolves with the result of the AJAX request.
 */
const get = async (url, params,token) => {
    const searchParams = new URLSearchParams(params);
    const urlWithParams =  params ? `${url}?${searchParams.toString()}` : url;

    const response = await fetch(urlWithParams, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const data = await response.json();

    return data;
};

/**
 * AJAX Request
 */
async function ajaxRequest(URL, PATH, METHOD, DATA, token,functionName,orderID) {
    if (functionName) {
        DATA.functionName = functionName;
    }
    if (orderID) {
        DATA.orderID = orderID;
    }
    const result = await $.ajax({
        url: `${URL}${PATH}`,
        type: METHOD,
        data: DATA,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return result;
}
/**
 * check Registration Token For Api
 */
async function checkAuthToken() {
    const btnLoader = document.getElementById('btnLoader');
    const parentElement = btnLoader.parentNode;
    btnLoader.style.display = 'block'; // Show the loader spinner
    parentElement.classList.add('disabled')

    const userPasswordForUser = {
        email: emailUser,
        password: passwordUser,
        rememberMe: true
    };
    const result = await ajaxRequest(url2290onlineForm, urlLoginAdmin,'POST', userPasswordForUser);
    const token = result.token;

    if (!token){
        window.location.href="/2290onlineform/";
    }else{
        document.cookie = `tokenApi=${token}; path=/`;
        window.location.replace("/2290onlineform/orders/permit.php")
    }
    btnLoader.style.display = 'none';

}
/**
 * check length  {Clients}
 */
function checkColumnLength(orderColumnLetterCount,clientColumnLetterCount) {
    let formattedColumn = '';
    let count = 0;

    formattedColumn = clientColumnLetterCount ? (count = 44, clientColumnLetterCount) : (orderColumnLetterCount ? (count = 22, orderColumnLetterCount) : '');

    formattedColumn = (formattedColumn === null || formattedColumn === undefined) ? '' : formattedColumn;

    let length = formattedColumn.length;
    if (length > count) {
        let modifiedColumn = '';
        for (let i = 0; i < length; i++) {
            modifiedColumn += formattedColumn[i];
            if ((i + 1) % count === 0) {
                modifiedColumn += '<br>';
            }
        }
        // formattedColumn = '<td class="customTdMaxStyleClients">' + modifiedColumn + '</td>';
        formattedColumn = modifiedColumn;
    } else {
        // formattedColumn = '<td class="customTdMaxStyleClients">' + formattedColumn + '</td>';
    }
    return formattedColumn;
}