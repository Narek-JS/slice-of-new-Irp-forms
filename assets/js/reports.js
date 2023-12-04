const reportsBlock = document.getElementById('reports');
const dateRangeInputs = reportsBlock.querySelectorAll("input[name='datePicker']");
const timePeriodSelect = reportsBlock.querySelector('#selectTimePeriod');
dateRangeInputs.forEach(input => {
    $(`#${input.id}`).datepicker({ maxDate: '0' });
});

function handleChangeRadioBtn (target) {
    [...dateRangeInputs, timePeriodSelect].forEach(input => {
        input.classList.remove('error');

    })
    if(target.id === 'timePeriod') {
        timePeriodSelect.disabled = false;
        dateRangeInputs.forEach(input => {
            input.disabled = true;
            input.value = '';
        });
    }else {
        timePeriodSelect.disabled = true;
        timePeriodSelect.value = '';
        dateRangeInputs.forEach(input => {
            input.disabled = false;
        });
    };
};

function generateReport () {
    let isValid = true;
    const radioTypes = reportsBlock.querySelectorAll("input[name='type']");
    const selectedTypeInput = Array.from(radioTypes).find(input => input.checked);
    if(selectedTypeInput.id === 'timePeriod') {
        if(!timePeriodSelect.value) {
            timePeriodSelect.classList.add('error');
            isValid = false;
        }
    }else {
        const startDate = reportsBlock.querySelector('#startDate').value;
        const endDate = reportsBlock.querySelector('#endDate').value;
        dateRangeInputs.forEach(input => {
            if(!input.value || new Date(startDate) > new Date(endDate)) {
                input.classList.add('error');
                isValid = false;
            }
        })
    };
    if(isValid) {
        const reportsUrl = `type=${selectedTypeInput.id}${selectedTypeInput.id === 'timePeriod' ? `&period=${timePeriodSelect.value}` : `&start=${reportsBlock.querySelector('#startDate').value}&end=${reportsBlock.querySelector('#endDate').value}`}`;
        window.location.href=`${domain}/2290onlineform/reports/list.php?${reportsUrl}`;
    };
}