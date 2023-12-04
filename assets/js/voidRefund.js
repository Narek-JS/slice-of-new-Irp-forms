function openModal(mode, permitID, cost,orderID, authID,agentName,modeToCancel) {
  $("#refundDate").datepicker({ maxDate: '0' });
  $("#voidDate").datepicker({ maxDate: '0' });
  $("#disputeDate").datepicker({ maxDate: '0' });
  let modal;
  const cancelModal = document.querySelector("#cancelStatusModal");
  if (mode == "refund") {
    modal = document.querySelector("#refundModal");
  } else if (mode == "void") {
    modal = document.querySelector("#voidModal");
  } else if (mode == "cancel") {
    modal = document.querySelector("#cancelStatusModal");
  }  else if (mode == "dispute") {
    modal = document.querySelector("#disputeModal");
}

  if (modal) {
    modal.style.display = "block";
    // Check if its not cancel modal add submit button refund and void function
    if (modal != cancelModal) {
      modal.querySelector(".costBlock").innerHTML = `$${Number(cost).toFixed(2)}`;
      const submitButton = modal.querySelector(".submitButton");
      submitButton.onclick = () => {
        refundAndVoidSubmit(mode, permitID, cost,orderID,authID,agentName,modal);
      };
    } else {
      modal.querySelector(
          ".modal-body"
      ).innerHTML = "Are you sure you want to cancel the " + modeToCancel +"?";

      const cancelButton = document.querySelector("#cancelYesButton");
      cancelButton.onclick = () => {
        cancelStatus(mode, permitID, cost,orderID, authID,agentName,modeToCancel);
      };
    }
  }
}

function closeModeModal(mode) {
  if (mode == "refund") {
    const refundModal = document.querySelector("#refundModal");
    refundModal.style.display = "none";
  } else if (mode == "void") {
    const voidModal = document.querySelector("#voidModal");
    voidModal.style.display = "none";
  } else if (mode == "cancel") {
    const cancelStatusModal = document.querySelector("#cancelStatusModal");
    cancelStatusModal.style.display = "none";
  } else if (mode == "dispute") {
    const disputeModal = document.querySelector("#disputeModal");
    disputeModal.style.display = "none";
  }
}

function refundAndVoidSubmit(mode, permitID, cost,orderID, authID,agentName,modal) {
  const reason = modal.querySelector(`#${mode}Reason`);
  const date = modal.querySelector(`#${mode}Date`);

  const disputeReasonInput = document.querySelector('#disputeReason');
  const disputeDateInput = document.querySelector('#disputeDate');

  const voidReasonInput = document.querySelector('#voidReason');
  const voidDateInput = document.querySelector('#voidDate');
  const refundReasonInput = document.querySelector('#refundReason');
  const refundDateInput = document.querySelector('#refundDate');

  const isFieldEmpty = reason.value && date.value ? false : true;
  const modeForSend = mode === "refund" ? 1
                    : mode === "void" ? 2
                    : mode === "dispute"  ? 3 : 0;

  const  data = {
    id:Number(permitID),
    orderId:orderID,
    permitKind: modeForSend,
    cost:cost,
    permitNote: reason.value,
    date: date.value,
    agentsId: Number(authID),
  }

  if (!isFieldEmpty) {
    if (mode && permitID) {
      async function postPermit(){
         let response   = await ajaxRequest(url2290onlineForm,editVoidRefundDispute,'POST',data,TOKEN_AUTH_FOR_API)
        if (response.success) {
          const statusBlock = document.querySelector(
              `#statusBlock${permitID}`
          );

          statusBlock.classList.add("col-md-12");

          const statusInfoBlock = document.querySelector(
              `#statusInfoBlock${permitID}`
          );
          statusInfoBlock.classList.add("d-none");
          validateInput(disputeReasonInput);
          validateInput(disputeDateInput);
          validateInput(voidReasonInput);
          validateInput(voidDateInput);
          validateInput(refundReasonInput);
          validateInput(refundDateInput);
          let statusChange = "";
          if(response.result != undefined){
               statusChange =  '<div class="permitHasBeenMode"> Status Changed Date:'+response.result+'</div>';
          }

          statusBlock.innerHTML = `
            <div class="permitStatusInfo d-flex w-100" style="font-size: 1rem;">
              <div class="w-100 pt-1 pr-3">
                ${statusChange}
                <div class="permitHasBeenMode"><i class="fas fa-undo-alt"></i> This Permit has been ${mode === 'dispute' ? 'charged back' : mode + 'ed'} @ ${data.date}</div>
                <div class="reasonCustom text-start permitHasBeenMode">Reason: ${escapeHtml(data.permitNote)}</div>
              </div>
              <div class="pl-2 pt-3">
                <div class="permitStatusByWho permitHasBeenModeCancel" style="width: 154px">By: ${agentName}</div>
                <button class="cancelButton bg-warning" style="width: 155px;" onclick="openModal('cancel', '${data.id}', '${data.cost}', '${orderID}','${authID}','${agentName}','${mode}',)"><i class="fas fa-redo-alt"></i> Cancel ${mode}</button>
              </div>
            </div>
            `;
          closeModeModal(mode);
          // Make data mode none
          const permitRow = document.querySelector(`#permitRow${permitID}`);
          permitRow.dataset.mode = mode;

          const permitKind = {
            0: '',
            1: ` <div class=\'statusBtn refundButton pointer\' data-bs-toggle="modal" data-bs-target="#permitActionModal"  onclick='getPermitActionDetails(${JSON.stringify({...data, permitNote: escapeHtml(data.permitNote)})})'> <i class="fa fa-dollar mr-1"></i> Refunded </div>`,
            2: ` <div class=\'statusBtn voidButton pointer\' data-bs-toggle="modal" data-bs-target="#permitActionModal"  onclick='getPermitActionDetails(${JSON.stringify({...data, permitNote: escapeHtml(data.permitNote)})})'> <i class="fa fa-minus-circle mr-1" aria-hidden="true"></i> Voided </div>`,
            3: ` <div class=\'statusBtn disputeButton pointer\' data-bs-toggle="modal" data-bs-target="#permitActionModal"  onclick='getPermitActionDetails(${JSON.stringify({...data, permitNote: escapeHtml(data.permitNote)})})'> <i class="fa fa-gavel" aria-hidden="true"></i> Charged Back </div>`
          };
          const actionTypeBlock = document.querySelector(`.actionType[data-orderId='${orderID}']`);
          const parentEl = actionTypeBlock.parentElement;
          const statusBtn = parentEl.querySelector('#statusBtn');
          statusBtn.classList.add('d-none');
          actionTypeBlock.innerHTML = `<div class='actionType' data-orderId='${orderID}'>` +
              permitKind[modeForSend] +
              ' </div>';
        }
      }
      postPermit();
    }
  } else {
    validateInput(disputeReasonInput);
    validateInput(disputeDateInput);
    validateInput(voidReasonInput);
    validateInput(voidDateInput);
    validateInput(refundReasonInput);
    validateInput(refundDateInput);
  }
}
function validateInput(inputElement) {
  if (inputElement.value == '') {
    inputElement.classList.add('error-input');
  } else {
    inputElement.classList.remove('error-input');
  }
}

function cancelStatus(mode, permitID, cost,orderID, authID,agentName,modeToCancel) {

  const reason = document.querySelector(`#${mode}Reason`);
  const date = document.querySelector(`#${mode}Date`);

  const modeForSend = mode === "refund" ? 1
                    : mode === "void" ? 2
                    : mode === "dispute"  ? 3 : 0;




  const  data = {
    id:Number(permitID),
    orderId:orderID,
    permitKind: modeForSend,
    cost:cost,
    permitNote: reason?.value,
    date: date?.value,
    agentsId: Number(authID),
  }

  async function editPermit(){
    const response = await ajaxRequest(url2290onlineForm,editVoidRefundDispute,'POST',data,TOKEN_AUTH_FOR_API)

    if (response.success) {
      const statusBlock = document.querySelector(`#statusBlock${permitID}`);
      const statusInfoBlock = document.querySelector(
          `#statusInfoBlock${permitID}`
      );
      statusInfoBlock.classList.remove("d-none");
      statusBlock.classList.remove("col-md-12");
      statusBlock.innerHTML = `
          <button class="disputeButton" onclick="openModal('dispute', '${permitID}', '${cost}', '${orderID}', '${authID}', '${agentName}')"><i class="fa fa-gavel" aria-hidden="true"></i> Charge Back</button>
          <button class="voidButton" onclick="openModal('void', '${permitID}', '${cost}', '${orderID}', '${authID}', '${agentName}')"><i class="fa fa-minus-circle mr-1" aria-hidden="true"></i> Void</button>
          <button class="refundButton" onclick="openModal('refund', '${permitID}', '${cost}', '${orderID}', '${authID}', '${agentName}')"><i class="fa fa-dollar mr-1"></i> Refund</button>
        `;

      closeModeModal(mode);
      const permitRow = document.querySelector(`#permitRow${permitID}`);
      permitRow.dataset.mode = "none";
      const actionTypeBlock = document.querySelector(`.actionType[data-orderId='${orderID}']`);
      actionTypeBlock.innerHTML = '';
      const parentEl = actionTypeBlock.parentElement;
      const statusBtn = parentEl.querySelector('#statusBtn');
      statusBtn.classList.remove('d-none');
    }
  }
  editPermit();
}

