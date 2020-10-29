"use strict";
let newSampleFormDiv;
let hiddenCollectId;
let addSamFormDonCount;
let addSamFormMatType;
let submitSamDataBtn;
let Send_Sample_Data = () => {
    newSampleFormDiv = document.getElementById('newSampleForm');
    hiddenCollectId = document.getElementById('collection_id');
    addSamFormDonCount = document.getElementById('don_Count');
    addSamFormMatType = document.getElementById('mat_Type');
    submitSamDataBtn = document.getElementById('submitSamData');
};
let checkSamFormData = () => {
    if ((addSamFormDonCount.value != "") && (addSamFormMatType.value != "")) {
        AJAXSendSamFormData(addSamFormDonCount.value, addSamFormMatType.value, hiddenCollectId.value);
        addSamFormDonCount.value = "";
        addSamFormMatType.value = "";
        newSampleFormDiv.style.display = "none";
    }
    else {
        errorAlert("Invalid input, Please check data");
    }
};
let AJAXSendSamFormData = (donCount, matType, ColId) => {
    //http://biobank.eu-west-2.elasticbeanstalk.com/RDS_AddSample_Service
    //http://localhost:8080/Biobank/RDS_AddSample_Service
    $.ajax({
        type: "post",
        url: "http://localhost:8080/Biobank/RDS_AddSample_Service",
        dataType: "json",
        data: { count: donCount, material: matType, id: ColId },
        success: (response) => {
            if (response[0] == 1) {
                AjaxGetSelectedSample(parseInt(response[1]));
                successAlert("Sample added successfully");
            }
            else {
                errorAlert("Please Try Again later");
            }
        }
    });
};
