const userId = sessionStorage.getItem("userId"); // 👈   USER ID from session storage
const userData = JSON.parse(sessionStorage.getItem("userData")); // 👈  user NAME, EMAIL, PHONE
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const vehicles = [];

if (!userId) {   //  👈 if ❗userId 💣 😡  return to Clients  ♻️
    window.location.href = `${domain}/2290onlineform/clients`
}

$("#customerName").val(userData.customerName);
$("#customerEmail").val(userData.customerEmail);
$("#phone").val(userData.phone);


$(function () {
    $('#phoneNumber').inputmask({"mask": "(999) 999-9999"});   //  👈 PHONE mask 📞
    $('#mobileNumber').inputmask({"mask": "(999) 999-9999"});  //  👈 PHONE mask 📞
    $('#faxNumber').inputmask({"mask": "(999) 999-9999"});     //  👈 PHONE mask 📞
    $('#authorDate').datepicker();                             //  👈 DATE picker 🗓️

    $(".loader").css({display: "flex"});

    Promise.all([ /////////   👈  get SELECTS options
        get(`${url2290onlineForm}/Business/GetAllBusinessByUserIdForAdmin?UserId=${userId}`, null, TOKEN_AUTH_FOR_API),
        get(`${url2290onlineForm}/BusinessType/GetAllBusinessType`, null, TOKEN_AUTH_FOR_API),
        get(`${url2290onlineForm}/Country/GetAllCountry`, null, TOKEN_AUTH_FOR_API),
        get(`${url2290onlineForm}/Year/GetAllYear`, null, TOKEN_AUTH_FOR_API),
        get(`${url2290onlineForm}/vehicleWeightCategory/getAllVehicleWeightCategory`, null, TOKEN_AUTH_FOR_API),
    ]).then(res => {
        const userBusinesses = res[0];
        const businesTypes = res[1];
        const countries = res[2];
        const years = res[3];
        const weights = res[4];

        userBusinesses.forEach(el => { //   👈  user BUSINESSES
            $("#business").append(`
                <option value='${el.id}' >${el.name}</option>
            `)
        });

        businesTypes.forEach(el => { //   👈  business TYPES
            $("#businessType").append(`
                <option value='${el.id}' >${el.name}</option>
            `)
        });

        countries.forEach(el => {  //   👈  COUNTRIES
            $("#country").append(`
                <option value='${el.id}' >${el.name}</option>
            `)
        });

        years.forEach(el => {  //   👈  YEAR
            $("#year").append(`
                <option value='${el.id}' >${el.name}</option>
            `)
        });

        weights.forEach(el => {  //   👈  Taxable Gross WEIGHTS
            $("#weight").append(`
                <option value='${el.id}' >${el.name}</option>
            `)
        });

        $(".loader").css({display: "none"});
    });
});

////////////  👇  VALIDATION 🛠️  ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️
const validator = $("#truckForm").validate({
    rules: { //  👈  REQUIREMENTS  ⚙️
        confirmEin: {equalTo: "#ein"},
        clientSignature: {required: false,},
        usdot: {required: false},
        dba: {required: false},
        country: {select: true},
        state: {select: true},
        businessType: {select: true},
        year: {select: true},
        month: {select: true},
        confirmBankAccountNumber: {equalTo: "#bankAccountNumber"},
        accountType: {select: true},
        acceptTax: {required: true},
        accept: {required: true},
        vin: {required: e => !vehicles.length},
        weight: {required: e => !vehicles.length && $("input[name=suspended]:checked").val() !== "1"},
        logging: {required: e => !vehicles.length && !$("input[name=logging]:checked").val()},
        suspended: {required: e => !vehicles.length && !$("input[name=suspended]:checked").val()},
        agricultural: {required: e => !vehicles.length && $("input[name=suspended]:checked").val() === "1" && !$("input[name=agricultural]:checked").val()},
    },
    messages: { // 👈  ERROR 🧨 messages  ❗ ❗ ❗    ❌ ❌ ❌
        confirmEin: {
            equalTo: "EIN numbers must match."
        },
        confirmBankAccountNumber: {equalTo: "The values must match..."},
    },
    submitHandler: form => {  ///////  👇   SUBMIT service data
        // $("#checkBtn").prop("disabled", true);
        const form2290Id = $("#checkBtn").data('form2290Id');
        const formData = new FormData(form);
        const data = {};

        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        if (!vehicles.length) {
            toastr.error("Please, add vehicle!");
            return;
        }

        const body = {
            agentId: $("#authId").val(),
            registerUser: userId,
            ...(form2290Id && {id: form2290Id}),
            addressChange: false,//
            finalReturn: false,//
            vinCorrection: false,//
            increaseGrossWeight: false,//
            mileageExceeded: false,
            taxableVehicles: data.suspended !== "1",
            suspendedVehicles: data.suspended === "1",
            totalAmountPrice: "",//
            eFW: data.paymentMethod === "1",
            eFTPS: data.paymentMethod === "2",
            creaditCard: data.paymentMethod === "0",
            checkOfMoneyOrder: data.paymentMethod === "3",
            bankRoutingNumber: data.bankRoutingNumber || "",
            bankAccountNumber: data.bankAccountNumber || "",
            taxPayerDayTimePhone: data.taxPayerDayTimePhone || "",
            acountTypeId: data.accountType || "",
            requestPaymentDate: $("#requestPaymentDate").val(),
            stepPath: "", //
            monthId: data.month,
            yearId: data.year,
            serviceId: id,
            paymentMethod: data.paymentMethod,
            business: {
                id: data.business,
                name: data.name,
                address: data.address,
                addressLine2: "",
                ein: data.ein,
                zip: data.zip,
                city: data.zip,
                dba: data.dba,
                email: data.email,
                faxNumber: data.faxNumber,
                phoneNumber: data.phoneNumber,
                sameBusinessName: $("#sameBusinessName").is(":checked"),
                authorName: data.authorName,
                signature: data.signature,
                authorDate: data.authorDate,
                mobileNumber: data.mobileNumber,
                sameAsPhone: $("#sameAsPhone").is(":checked"),
                countryId: data.country,
                stateId: data.state,
                businessTypeId: data.businessType
            },
            listVehicle2290: vehicles
        }

        $(".loader").css({display: "flex"});
        post(
            form2290Id ? `${url2290onlineForm}/Form2290/EditForm2290Admin` :
                `${url2290onlineForm}/Form2290/AddForm2290Admin`,
            body, TOKEN_AUTH_FOR_API
        ).then(res => {
            if (res?.success) {
                $("#truckForm").addClass("disabled");
                $("#checkBtn").hide();
                $("#checkBtn").data('form2290Id', res.result);
                $("#editForm").html(`
                    <button onclick="editForm()" id="editBtn" type="button" class="btn btn-secondary bg-p mx-auto col-sm-3" style="">
                        Edit Form Info
                    </button>
                `);
                $("#paymentComponent").show();
                $("#amount").text(`$${res.resultObject["0"].totalTax || "0.00"}`);
                $("#billedToCard").text(`$${res.resultObject["0"].servicePrice || "0.00"}`);
            } else {
                toastr.error(res?.errorMessage || "Something went wrong !")
            }

            $(".loader").css({display: "none"});
        });
    }
});

$.validator.addMethod("select", function (value, element) {
    return !!value;
}, "Please, select one.");


///////   👇   fill business data on verifying USDOT number
$("#verifyUsdot").click(verifyUsdot);

$('#usdot').keypress(function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        verifyUsdot();
    }
});

function verifyUsdot() {
    const usdot = document.querySelector("#usdot")?.value;
    if (!usdot) {
        return;
    }
    $("#verifyUsdot").prop("disabled", true);
    $("#checkBtn").prop("disabled", true);
    $("#usdot").prop("disabled", true);

    get(`${url2290onlineForm}/Business/GetInfoByDOT?usdotNumber=${usdot}`, null, TOKEN_AUTH_FOR_API)
        .then(res => {
            if (res.Message) { // 👈  USDOT bizimdir ❗   💣🧨
                validator.showErrors({
                    usdot: res.Message
                });
                toastr.error(res.Message)
            } else {  //  👇 fill BUSINESS fields by USDOT
                fillBusinessFields(res);
            }
            $("#verifyUsdot").prop("disabled", false);
            $("#checkBtn").prop("disabled", false);
            $("#usdot").prop("disabled", false);
        })
}

//////      👇   fill all BUSINESS data on selecting client BUSINESS
$("#business").change(e => {
    get(`${url2290onlineForm}/Business/GetBusinessByIdAdmin/${e.target.value}?userId=${userId}`, null, TOKEN_AUTH_FOR_API)
        .then(res => {
            fillBusinessFields(res)
        })
});

/////////     👇  make DBA the same of BUSINESS NAME
$("#sameBusinessName").change(e => {
    if (e.target.checked) {
        $("#dba").val($("#name").val());  // 👈  checked ☑️
    } else {
        $("#dba").val('');  //  👈  unchecked
    }
});

/////////     👇  make MOBILE 📱 the same of PHONE NUMBER 📞
$("#sameAsPhone").change(e => {
    if (e.target.checked) {
        $("#mobileNumber").val($("#phoneNumber").val());  // 👈  checked ☑️
    } else {
        $("#mobileNumber").val('');  //  👈  unchecked
    }
});

$("#country").change(e => {  //  👈 get STATES on every COUNTRY change
    getStateOptionsByCountry(e.target.value)
});

$("#clientSignature").change(e => {
    const file = e.target.files[0];
    if (!file) {
        $("#signature").val("");
        return;
    }
    if (file.size > 2048000) {
        toastr.error("File size too large.");
        e.target.value = "";
        return;
    }

    getBase64(e.target.files[0])
        .then(res => {
            $("#signature").val(res)
        })
})

function fillBusinessFields(res) { // 👈  helper to fill BUSINESS FIELDS
    $(`#businessType option[value='${res.businessTypeId}']`).prop('selected', true);
    $("#name").val(res.name);
    $("#dba").val(res.sameBusinessName ? res.name : res.dba);
    $("#sameBusinessName").prop("checked", res.sameBusinessName);
    $("#ein").val(res.ein);
    $("#confirmEin").val(res.ein);
    $("#address").val(res.address);
    $("#city").val(res.city);
    $(`#country option[value='${res.countryId}']`).prop('selected', true);
    $("#zip").val(res.zip);
    $("#faxNumber").val(res.faxNumber);
    $("#email").val(res.email);
    $("#phoneNumber").val(res.phoneNumber);
    $("#mobileNumber").val(res.sameAsPhone ? res.phoneNumber : res.mobileNumber);
    $("#sameAsPhone").prop("checked", res.sameAsPhone)
    $("#authorDate").val(res.authorDate?.substring(0, 10));
    $("#authorName").val(res.authorName);
    $("#signature").val(res.signature);


    if (res.countryId) {
        getStateOptionsByCountry(res.countryId)
            .then(() => {
                $(`#state option[value='${res.stateId}']`).prop('selected', true);
            })
    }
}

function getStateOptionsByCountry(id) {  // 👈 helper to get STATES by COUNTRY id and fill SELECT STATE options
    return get(`${url2290onlineForm}/State/GetAllStateByCountry/${id}`, null, TOKEN_AUTH_FOR_API)
        .then(res => {
            $("#state").html(`
                <option value="" disabled selected>Select one...</option>
            `);
            res?.forEach(el => {
                $("#state").append(`
                <option value='${el.id}' >${el.name}</option>
            `)
            });
        })
}

$("#year").change(e => {
    get(`${url2290onlineForm}/Month/GetMonthAllByYear/${e.target.value}`, null, TOKEN_AUTH_FOR_API)
        .then(res => {
            $("#month").html(`
                <option value="" disabled selected>Select month...</option>
            `);
            res?.forEach(el => {
                $("#month").append(`
                <option value='${el.id}' data-value='${el.value}' >${el.name}</option>
            `)
            });
        });
});

$("input[name=suspended]").change(e => {
    $("#selectVehicle").html(`<option value="" disabled selected>Select one...</option>`)
    if (e.target.value == "1") {
        $("#agricultural").removeClass("disabled");
        $("#weight").prop("disabled", true);
    } else {
        $("input[name=agricultural]").prop("checked", false);
        $("#agricultural").addClass("disabled");
        $("#weight").prop("disabled", false);
    }
    get(`${url2290onlineForm}/Vehicle2290/GetAllVehicleHistoryAdmin?taxableVehicle=${e.target.value !== "1"}&suspendedVehicle=${e.target.value === "1"}&user=${userId}`,
        null, TOKEN_AUTH_FOR_API)
        .then(res => {
            res?.forEach(el => {  //   👈  Vehicle history
                $("#selectVehicle").append(`
                    <option 
                        value='${el.id}' 
                        data-vin='${el.vin}' 
                        data-weight='${el.vehicleWeightCategoryId}'
                        data-weight-name='${el.vehicleWeightCategory?.name}'
                        data-suspended='${el.suspendedVehicle}'
                        data-logging='${el.loggingVehicle}'
                        data-price='${el.taxPrice}'
                        data-agricultural='${el.agriculturalVehicle}'
                    >${el.vin}</option>
                `)
            });
        })
});

$("#selectVehicle").change(async (e)=> {  //  👈  SELECTING vehicle from HISTORY
    const vehicle = $("#selectVehicle option:selected");

    if(!$("#month option:selected").val()){
        e.target[0].select = true;
        e.target.value= ''
        toastr.error("Please, select month.");
        return;
    }

    if (vehicles.some(el => el.vin == vehicle.data("vin"))) {
        toastr.error("VIN number repeats.");
        e.target[0].select = true;
        e.target.value= ''
        return;
    }

    const vehicleDetails = !vehicle.data("suspended") && await post(`${url2290onlineForm}/taxPrice/getTaxPriceByVehicleInfo`,
        {
            monthValue: $("#month option:selected").data("value"),
            vehicleWeightCategoryId: vehicle.data("weight"),
            loggingKind: vehicle.data("logging"),
            price: null
        },
        TOKEN_AUTH_FOR_API
    );

    $("#vehicleTable tbody").append(`
        <tr data-vin='${vehicle.data("vin")}'>
            <td>1</td>    
            <td>${vehicle.data("vin")}</td>    
            <td>${vehicle.data("suspended") ? "W Suspended Vehicle" : vehicle.data("weight-name")}</td>    
            <td>${vehicle.data("logging") ? "Yes" : "No"}</td>    
            <td>${!vehicle.data("suspended") ? vehicleDetails.price: "0.00" }</td>   
            <td onclick="removeVehicle(event)" role="button" data-vin='${vehicle.data("vin")}'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M20 8H17V4H3C1.89 4 1 4.89 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8ZM6 18.5C5.17 18.5 4.5 17.83 4.5 17C4.5 16.17 5.17 15.5 6 15.5C6.83 15.5 7.5 16.17 7.5 17C7.5 17.83 6.83 18.5 6 18.5ZM12.54 12.12L11.12 13.54L9 11.41L6.88 13.54L5.47 12.12L7.59 10L5.46 7.88L6.88 6.47L9 8.59L11.12 6.47L12.54 7.88L10.41 10L12.54 12.12ZM18 18.5C17.17 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5ZM17 12V9.5H19.5L21.46 12H17Z" fill="#F86565"/>
                </svg>
            </td> 
        </tr>
    `);

    vehicles.push({
        vin: vehicle.data("vin"),
        suspendedVehicle: vehicle.data("suspended"),
        loggingVehicle: vehicle.data("logging"),
        vehicleWeightCategoryId: vehicle.data("weight"),
        agriculturalVehicle: vehicle.data("agricultural"),
        taxPrice: vehicle.data("price") || "0.00",
        taxableVehicle: !vehicle.data("suspended"),
    });
    $("#vin").val("");
    $("#weight option[disabled]").prop("selected", true);
    $("#weight").prop("disabled", false);
    $("input[name=logging]:checked").prop("checked", false);
    $("input[name=suspended]:checked").prop("checked", false);
    $("input[name=agricultural]:checked").prop("checked", false);

});

$("input[name=paymentMethod]").change(e => {

    switch (e.target.value) {
        case "0" :
            $("#paymentFields").html(`
                            <div class="third-option">
                    <div class="desc info-text"><p><span class="color-s">Step 1: </span>Once the IRS accepts your tax returns, you
                            will receive an email with their payment link. Then, click the link to make the payment to
                            the IRS.</p>
                        <p><span class="color-s">Step 2: </span>For payment via Credit/Debit card you will need to visit
                            the IRS website in order to make the payment.</p>
                        <p><span class="color-s">Step 3: </span>The IRS uses standard service providers and
                            commercial/business card networks. The service provider may charge a service fee of up to
                            2%.</p></div>
                    <div class="desc note-field"><p><span class="color-s">Note: </span>You can only make two credit card
                            payments per tax year as per IRS regulations</p></div>
                    <div class="desc info-text">
                        <div><p class="inline">I accept that I am responsible to pay the IRS my due taxes using my
                                credit/debit card directly with an <a
                                        href="https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card"
                                        target="_blank" class="color-s"> IRS-authorized payment processor</a>. I
                                understand that I must pay my taxes by the end of the month following my first month of
                                use and, if I fail to make this payment in time, the IRS may assess penalties.</p>
                            <div class="tooltip-toggle"
                                 aria-label="For example, if you first use your truck on any day in August, then your taxes are due by September 30th.">
                                <span>!</span></div>
                        </div>
                    </div>
                    <label class="switch-label">
                        <div class="switch"><input type="checkbox" name="acceptTax"><span
                                    class="slider round"></span></div>
                        <h3 class="text">Excise Tax E-File Compliance Check Payment Statement.</h3>
                    </label>
                </div>
            `);
            break;
        case "1":
            $("#paymentFields").html(`
            <div class="row mb-2 d-flex">
                <div class="custom-input col-sm">
                    <label for='bankRoutingNumber' class="fw-bold">US Bank Routing Number</label>
                    <input id='bankRoutingNumber' name='bankRoutingNumber' type='text'
                           placeholder='Bank Routing Number'
                           value='' required/>
                </div>
                <div class="custom-input col-sm">
                    <label for='bankAccountNumber' class="fw-bold">US Bank Account Number</label>
                    <input id='bankAccountNumber' name='bankAccountNumber' type='text'
                           placeholder='Enter Bank Account Number'
                           value='' required/>
                </div>
            </div>
            <div class="row mb-2 d-flex">
                <div class="custom-input col-sm">
                    <label for='confirmBankAccountNumber' class="fw-bold">Re-Enter US Bank Account
                        Number</label>
                    <input id='confirmBankAccountNumber' name='confirmBankAccountNumber' type='text'
                           placeholder='Re-Enter Bank Account Number'
                           value='' required/>
                </div>
                <div class="custom-input col-sm">
                    <label for='taxPayerDayTimePhone' class="fw-bold">TaxPayer Day Time
                        Phone</label>
                    <input id='taxPayerDayTimePhone' name='taxPayerDayTimePhone' type='text'
                           placeholder='TaxPayer Day Time Phone'
                           value='' required/>
                </div>
            </div>
            <div class="row mb-2 d-flex">
                <div class="custom-input col-sm">
                    <label for='accountType' class="fw-bold">Account Type</label>
                    <select id="accountType" name="accountType"
                            class="form-control form-select w-100 mw-100">
                        <option value="" disabled selected>Select one...</option>
                    </select>
                </div>
                <div class="custom-input col-sm">
                    <label for='requestPaymentDate' class="fw-bold">Requested Payment Date</label>
                    <input id='requestPaymentDate' name='requestPaymentDate' type='text'
                           placeholder='Requested Payment Date'
                           value='' required/>
                </div>
            </div>
            <p class="info-text">
                Note: In case you have selected EFW as your payment option, the tax amount will be
                deducted directly from your account. (Please ensure you have sufficient balance in
                your account)
            </p>
            `);
            $('#requestPaymentDate').datepicker();

            get(`${url2290onlineForm}/acountType/getAllAcountType`, null, TOKEN_AUTH_FOR_API)
                .then(res => {
                    res?.forEach(el => {  //   👈  Taxable Gross WEIGHTS
                        $("#accountType").append(`
                        <option value='${el.id}' >${el.name}</option>
                    `)
                    });
                })
            break;
        case "2" :
            $("#paymentFields").html(`
             <div class="second-option info-text">
                <div class="desc"><p>You can pay your tax amount through the Electronic Federal Tax
                        Payment System by visiting<a class="color-s" target="_blank"
                                                     href="https://www.eftps.gov/eftps/">
                            www.EFTPS.gov.</a> If you have not made an EFTPS account already, it can
                        take approximately 15 business days to activate your account after signing up. I
                        recognize that it is my responsibility to make my tax payment to the IRS using
                        EFTPS.gov, FTDs, or by another method.</p></div>
                <label class="switch-label ">
                    <div class="switch"><input type="checkbox" name="accept"><span
                                class="slider round"></span></div>
                    <h3 class="text">I accept that it is my responsibility to send the tax due payment
                        to the IRS using eftps.gov website, FTDs or by other means.</h3>
                </label>
            </div>
            `)
            break;
        case "3" :
            $("#paymentFields").html(`
                <div class="fourth-option">
                    <div>
                        <div class="info-text"><p>Once the IRS accepts your tax returns, you will need to print
                                your Form 2290 in order to pay by check or money order. After you have
                                printed it out, you will want to write the check or money order payable to
                                the ‘United States Treasury.’</p>
                            <p>You will need to include your EIN, phone number, and your printed Form 2290.
                                Print the money order payment voucher Form 2290 and enclose it. Be sure not
                                to staple them together. Mail the check or money order with Form 2290
                                to:</p></div>
                        <div class="desc second-option info-text"><p>Internal Revenue Service</p>
                            <p>P.O. Box 932500</p>
                            <p>Louisville, KY 40293-2500</p></div>
                    </div>
                    <div class="desc note-field"><p><span class="color-s">Note: </span>Please do not staple
                            or attach your payment</p></div>
                </div>
            `)
            break;
    }
});

$("#vin").on("input", e => {
    e.target.value = e.target.value.toUpperCase();
});

$("#originalVin").on("input", e => {
    e.target.value = e.target.value.toUpperCase();
});

$("#checkVin").click(checkVin);
$('#vin').keypress(function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        checkVin();
    }
});

function checkVin() {
    const value = $("#vin").val();

    if (value.length !== 17) {
        validator.showErrors({
            vin: "Invalid VIN number"
        });
        return;
    }

    $("#checkVin").addClass("disabled");
    $("#vin").prop("disabled", true);

    get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`)
        .then(response => {
            if (response.Results) {

                if (response.Results[0].ErrorCode == '0') {
                    $("#vinError").text("")
                    $("#vehicleDetails").show();
                    $("#vehicleYear").text(response.Results[0].ModelYear);
                    $("#vehicleMake").text(response.Results[0].Make);
                    $("#vehicleModel").text(response.Results[0].Model);
                    $("#vehicleManufacture").text(response.Results[0].Manufacturer);
                    $("#vehicleClass").text(response.Results[0].BodyClass);
                    $("#vinStatusIcon").html(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6 13.8L8.45 11.65C8.26667 11.4667 8.03333 11.375 7.75 11.375C7.46667 11.375 7.23333 11.4667 7.05 11.65C6.86667 11.8333 6.775 12.0667 6.775 12.35C6.775 12.6333 6.86667 12.8667 7.05 13.05L9.9 15.9C10.1 16.1 10.3333 16.2 10.6 16.2C10.8667 16.2 11.1 16.1 11.3 15.9L16.95 10.25C17.1333 10.0667 17.225 9.83333 17.225 9.55C17.225 9.26667 17.1333 9.03333 16.95 8.85C16.7667 8.66667 16.5333 8.575 16.25 8.575C15.9667 8.575 15.7333 8.66667 15.55 8.85L10.6 13.8ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22Z" fill="#05A656"/>
                        </svg>
                    `)
                } else {
                    $("#vehicleDetails").hide();
                    $("#vinStatusIcon").html(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" fill="#F93154"/>
                        </svg>
                    `);
                    $("#vinError").text("The VIN you entered does not match with any records from the National Highway Traffic Safety Administration (NHTSA). Please check for typos and re-enter your VIN.")
                }

                $("#vinChecker").modal("show")
            }
            $("#checkVin").removeClass("disabled");
            $("#vin").prop("disabled", false);
        })
}


$("#addVehicle").click(() => {
    const vin = $("#vin");
    const weight = $("#weight");
    const logging = $("input[name=logging]:checked");
    const suspended = $("input[name=suspended]:checked");
    const agricultural = $("input[name=agricultural]:checked");

    if (!vin.val() || vin.val().length !== 17) {
        validator.showErrors({
            vin: "Invalid VIN number"
        });
        return;
    }

    if (vehicles.some(el => el.vin == vin.val())) {
        validator.showErrors({
            vin: "VIN number repeats"
        });
        return;
    }

    if (!weight.val()) {
        if (suspended.val() !== "1") {
            validator.showErrors({
                weight: "Select one"
            });
            return;
        } else {
            validator.showErrors({
                weight: ""
            });
            $("#weight").removeClass("error")
        }
    }

    if (!$("#month option:selected").val()) {
        validator.showErrors({
            month: "Please, select month"
        });
        return;
    }

    function fillVehicleTable(price) {
        $("#vehicleTable tbody").append(`
            <tr data-vin='${vin.val()}'>
                <td>1</td>    
                <td>${vin.val()}</td>    
                <td>${suspended.val() === "1" ? "W Suspended Vehicle" : $("#weight option:selected").text()}</td>    
                <td>${logging.val() === "1" ? "Yes" : "No"}</td>    
                <td>${price || 0.00}</td>   
                <td onclick="removeVehicle(event)" role="button" data-vin='${vin.val()}'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M20 8H17V4H3C1.89 4 1 4.89 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8ZM6 18.5C5.17 18.5 4.5 17.83 4.5 17C4.5 16.17 5.17 15.5 6 15.5C6.83 15.5 7.5 16.17 7.5 17C7.5 17.83 6.83 18.5 6 18.5ZM12.54 12.12L11.12 13.54L9 11.41L6.88 13.54L5.47 12.12L7.59 10L5.46 7.88L6.88 6.47L9 8.59L11.12 6.47L12.54 7.88L10.41 10L12.54 12.12ZM18 18.5C17.17 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5ZM17 12V9.5H19.5L21.46 12H17Z" fill="#F86565"/>
                    </svg>
                </td> 
            </tr>
        `);

        vehicles.push({
            vin: vin.val(),
            suspendedVehicle: suspended.val() === "1",
            loggingVehicle: logging.val() === "1",
            vehicleWeightCategoryId: weight.val(),
            agriculturalVehicle: agricultural.val() === "1",
            taxPrice: price || "0.00",
            taxableVehicle: suspended.val() !== "1",
        });
        vin.val("");
        $("#weight option[disabled]").prop("selected", true);
        $("#weight").prop("disabled", false);
        $("input[name=logging]:checked").prop("checked", false);
        $("input[name=suspended]:checked").prop("checked", false);
        $("input[name=agricultural]:checked").prop("checked", false);
    }

    if (suspended.val() !== "1") {
        post(`${url2290onlineForm}/taxPrice/getTaxPriceByVehicleInfo`,
            {
                monthValue: $("#month option:selected").data("value"),
                vehicleWeightCategoryId: +weight.val(),
                loggingKind: logging.val() === "1",
                price: null
            },
            TOKEN_AUTH_FOR_API
        ).then(res => {
            if (res.price) {
                fillVehicleTable(res.price)
            }
        });
    } else {
        fillVehicleTable();
    }
});



function removeVehicle(event) {
    const dataVin = event.currentTarget.dataset.vin;
    $(`#vehicleTable tr[data-vin='${dataVin}']`).remove();
    const removeIndex = vehicles.findIndex(el => el.vin = dataVin);
    if (removeIndex >= 0) {
        vehicles.splice(removeIndex, 1)
    }
    if (id == "14") {
        $("#addVehicle").show();
        $("#vin").prop("disabled", false);
        $("input[name=suspended]:checked").val() !== "1" && $("#weight").prop("disabled", false);
    }
}


function editForm() {
    const checkBtn = $("#checkBtn");
    $("#truckForm").removeClass("disabled");
    $("#editBtn").remove();
    checkBtn.show();
    checkBtn.text("Update Form Info");
    $("#paymentComponent").hide();
}


//  Symbols to help write comment  ❌✔️✅☑️❗  👆👇👈👉  💡💰💲💵💸💳 💣🧨🚩☢️⚠️♻️⛔  🎧🔊🛠️⚙️🗓️ 🚚🚛   🤨😉😀👿🤬😡😤