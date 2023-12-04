const blockTemplate = document.getElementById('template');
const inputs = blockTemplate?.querySelectorAll('input');
const textarea = blockTemplate?.querySelectorAll('textarea');

function fillTemplate (data) {
    [...inputs, ...textarea].forEach(input => {
        input.value = data[input.id];
    })
}

function saveEmailTemplate (id, templateName) {
    let data = {id};
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    [...inputs, ...textarea].forEach(input => {
        data[input.id] = input.value;

        if(((input.id === 'send' || input.id === 'reply') && !emailPattern.test(input.value))
            || ((input.id === 'title' || input.id === 'subject' || input.id === 'body') && input.value.trim() === '')) {
            isValid = false;
            input.style.borderColor = 'red';
        }else {
            input.style.borderColor = 'var(--color-s)';
        }
    });
   if(isValid) {
       const editor = templateName === 'emailTemplate' ? CKEDITOR.instances.editor1 : null;
       const sourceCode = editor ? editor.getData() : null;
       if(sourceCode) {
           data.body = sourceCode;
       };
       const templateUrl = templateName === 'emailTemplate' ? `/EmailTemplate/${id ? 'EditEmailTemplate' : 'AddEmailTemplate'}` : `/SMSTemplate/${id ? 'EditSMSTemplate' : 'AddSMSTemplate'}`;
       post(`${url2290onlineForm}${templateUrl}`, data, TOKEN_AUTH_FOR_API)
           .then(res => {
               if(res.success) {
                   window.location.href = `${domain}/2290onlineform/${templateName === 'emailTemplate' ? 'emailTemplates' : 'messageTemplates'}`;
               }
           })
   }else {
       window.scrollTo({
           top: 100,
           left: 100,
           behavior: "smooth",
       })
   }
}