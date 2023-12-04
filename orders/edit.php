<!-- HEADER, MENU, VARIABLES -->
<?php
	include "../constantsIRP.php";
	include "../head.php";
	include "../menu.php";
?>

<!-- ORDER EDIT CSS -->
<link rel="stylesheet" href="../assets/css/orderEdit/order-edit.css">

<!-- EDIT PERMIT -->
<div class='page-container editPermitPopupContainer'>
    <div class="editPermitPopup">
        <?php
            include "../editPageMain.php";
        ?>

        <!-- EDIT STEP FOMRS -->
        <div class="editPermitPopup__edit">

            <!-- CONTACT INFORMATION FORM -->
            <form class='carrierInformationForm'>
                <div class="informationBlockContainer">
                    <h3>Contact Information</h3>

                    <div class="editPermitPopup__edit-contactForm formBlock">
                        <div class="editPermitPopup-inputGroup">
                            <label>First Name</label>
                            <input placeholder="Enter name" name='first_name' required/>
                        </div>
                        <div class="editPermitPopup-inputGroup">
                            <label>Last Name</label>
                            <input placeholder="Enter last name" name='last_name' required/>
                        </div>
                        <div class="editPermitPopup-inputGroup">
                            <label>Email Address</label>
                            <input placeholder="Enter contact phone number" name='email' required/>
                        </div>
                        <div class="editPermitPopup-inputGroup">
                            <label>Business Phone</label>
                            <input placeholder="Enter contact phone number" name='phone'  required/>
                        </div>
                    </div>
                </div>
                
                <!-- CARRIER INFORMATION -->
                <div class="informationBlockContainer">
                    <h3>Carrier Information</h3>
        
                    <div class="editPermitPopup__edit-carrierForm formBlock">
                        <div class="editPermitPopup__edit-carrierForm-groupNode">
                            <div class="editPermitPopup-inputGroup">
                                <label>Email Address</label>
                                <input placeholder="Enter contact email address" name="carrierForm_email"/>
                            </div>
        
                            <div class="editPermitPopup-inputGroup">
                                <label>Business Phone</label>
                                <input placeholder="Enter contact phone number" name="carrierForm_phone"/>
                            </div>
        
                            <div class="editPermitPopup-inputGroup">
                                <label>State</label>
                                <div class="custom-select disabled" id="customSelect-state">
                                    <div class="select-trigger">
                                        <span data-id=''>NOT FOUND</span>
                                    </div>
                                </div>
                            </div>
        
                            <div class="editPermitPopup-inputGroup">
                                <label>Application Type</label>
                                <div class="custom-select disabled" id="customSelect-application-type">
                                    <div class="select-trigger">
                                        <span data-id=''>NOT FOUND</span>
                                    </div>
                                </div>
                            </div>
        
                            <div class="editPermitPopup-inputGroup">
                                <label>Registrant Type</label>
                                <div class="custom-select disabled"  id="customSelect-registrant-type">
                                    <div class="select-trigger">
                                        <span data-id=''>NOT FOUND</span>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div class="editPermitPopup__edit-carrierForm-groupNode">
                            <div class="editPermitPopup-inputGroup">
                                <label>USDOT</label>
                                <input placeholder="Enter USDOT number" name="carrierForm_usdot"/>
                            </div>
                            <div class='operateUsdot'>
                                <!-- in here I insert operates udsot buttons from Javascript -->
                            </div>
                        </div>
                    </div>
        
                    <button class="editPermitPopup__updateButton-carrierInfo" type='submit' >
                        Update Carrier
                    </button>
                </div>
            </form>

            <!-- CARRIER OPERATION DETAILS <MEMBER> -->
            <div class="informationBlockContainer">
                <h3>Carrier Operation Details</h3>

                <div class="formBlock">
                    <div class="editPermitPopup__edit-member">
                        <table>
                            <!-- table header -->
                            <thead>
                                <!-- in here I insert tr td elements from Javascript -->
                            </thead>
        
                            <!-- table body -->
                            <tbody>
                                <!-- in here I insert tr td elements from Javascript -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="editPermitPopup__edit-Operation">
                        <!-- in here I insert input fields from Javascript -->
                        <!-- in here I insert submit button from Javascript -->
                    </div>
                </div>
            </div>

            <!-- VEHICLE DETAILS -->
            <div class="informationBlockContainer">
                <h3>Vehicle Details</h3>

                <div class="formBlock">
                    <div class="editPermitPopup__edit-vehicles-table">
                        <table>
                            <!-- table header -->
                            <thead>
                                <tr>
                                    <td>No.</td>
                                    <td>GVW</td>
                                    <td>Purchased Price</td>
                                    <td>Total NO. Axles</td>
                                    <td>No. of Axles Without Trailer</td>
                                    <td>Vehicle Status</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>
        
                            <!-- table body -->
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>26,001 - 30,000</td>
                                    <td>N/A</td>
                                    <td>2</td>
                                    <td>2</td>
                                    <td>Owned</td>
                                    <td>
                                        <button class="editPermitPopup__edit-vehicles-edit">Edit</button>
                                    </td>
                                    <td>
                                        <button class="editPermitPopup__edit-vehicles-delete">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="editPermitPopup__edit-vehicles-form">
                        <form>
                            <div class="vehicleFields">
                                <div class="editPermitPopup-inputGroup">
                                    <label>Registrant Full Name</label>
                                    <input placeholder="Enter full name" value="${memberInformation?.members?.[0]?.name || ''}" name="name"/>
                                </div>
                                <div class="editPermitPopup-inputGroup">
                                    <label>Registrant Full Name</label>
                                    <input placeholder="Enter full name" value="${memberInformation?.members?.[0]?.name || ''}" name="name"/>
                                </div>
                                <div class="editPermitPopup-inputGroup">
                                    <label>Registrant Full Name</label>
                                    <input placeholder="Enter full name" value="${memberInformation?.members?.[0]?.name || ''}" name="name"/>
                                </div>
                                <div class="editPermitPopup-inputGroup">
                                    <label>Registrant Full Name</label>
                                    <input placeholder="Enter full name" value="${memberInformation?.members?.[0]?.name || ''}" name="name"/>
                                </div>
                            </div>
                            <button class="editPermitPopup__updateButton-vehicle" type='submit'>
                                Save Vehicle
                            </button>
                        </form>
                        <!-- in here I insert input fields from Javascript -->
                        <!-- in here I insert submit button from Javascript -->
                    </div>
                </div>
            </div>
        </div>


        <!-- HISTORY STEP TABELS -->
        <div class="editPermitPopup__history informationBlockContainer">

        </div>

        <!-- PAYMENT STEP FORMS -->
        <div class="editPermitPopup__payment informationBlockContainer">

        </div>
    </div>
</div>

<!-- FOOTER -->
<?php include "../footer.php" ?>

<!-- EDIT FORM JS -->
<script src="../assets/js/orderEdit/edit-step.js"></script>