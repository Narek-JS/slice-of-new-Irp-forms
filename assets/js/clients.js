$(".close").on("click", function () {
    $("#newCustomer").modal("hide");
    var validator = $("#newCustomerForm").validate();
    $("#newCustomerForm").trigger("reset");
    validator.resetForm();
});

$(".closeNewForm").on("click", function () {
    $("#newForm").modal("hide");
});

$("#newCustomer").on('hidden.bs.modal', function () {
    var validator = $("#newCustomerForm").validate();
    $("#newCustomerForm").trigger("reset");
    $("input.error, select.error").removeClass("error")
    validator.resetForm();
})

$(function () {
    $('#phone').inputmask({"mask": "(999) 999-9999"})
});

function formSubmit(event) {
    event.preventDefault();
}

$("#newCustomerForm").validate({
    rules: {
        phone: {phone: true},
        email: {email: true},
        password: {
            required: true,
            minlength: 8
        },
        confirm_password: {
            equalTo: "#password"
        }
    },
    messages: {
        confirm_password: {
            equalTo: "Passwords must match."
        },
        phone: {
            phone: "Invalid phone number."
        },
        email: {
            email: "Invalid email address."
        },
        password: {
            minlength: "Password must be at least 8 characters"
        }
    },
    submitHandler: form => {
        $("#createUserBtn").prop("disabled", true);
        const formData = new FormData(form);
        const data = {};

        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        post(
            `${url2290onlineForm}/ManageUser/RegisterUserByAdmin`,
            {
                displayName: data.name,
                email: data.email,
                password: data.password,
                username: data.email,
                phoneNumber: data.phone
            }
        ).then(res => {
            $("#createUserBtn").prop("disabled", false);
            if(res?.success){
                $("#newCustomerForm").trigger("reset");
                $("#newCustomer").modal("hide");
                $("#newForm").modal("show");
                sessionStorage.setItem("userId", res.result)
                sessionStorage.setItem("userData", JSON.stringify({
                    customerName: data.name,
                    customerEmail: data.email,
                    phone: data.phone
                }))
            }else{
                toastr.error(res.errorMessage);
            }
        })
    }
});

$.validator.methods.phone = function (value) {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
}
$.validator.methods.email = function (value) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
}

function openNewFormModal (event) {
    $("#newForm").modal("show");
    sessionStorage.setItem("userId", event.target.dataset.id);
    sessionStorage.setItem("userData", event.target.dataset.user);
}

$("#newForm").on('shown.bs.modal', function(){
    const table = $("#newFormTable");
    if(table[0].tBodies?.length){
        return;
    }
    $("#newForm #blockLoader").css({display: "flex"});

    get(`${url2290onlineForm}/service/getAllDetailService`)
        .then(res => {
            if(res?.length){
                const tbody = $('<tbody></tbody>');
                table.append(tbody);
                servicesBody(tbody[0], res, true)
            }else{
                $("#newForm").modal("hide");
            }
            $("#newForm #blockLoader").css({display: "none"})
        })
});










