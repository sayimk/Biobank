"use strict";
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
    //http://biobank.eu-west-2.elasticbeanstalk.com/
    $.ajax({
        type: "post",
        url: "http://localhost:8080/Biobank/RDS_AddSample_Service",
        dataType: "json",
        data: { count: donCount, material: matType, id: ColId },
        success: (response) => {
            //Put okay alert here,
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
