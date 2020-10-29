"use strict";
let newCollectFormDiv;
let showNewCollectBtn;
let addColFormTermInput;
let addColFormTitleInput;
let submitColFormBtn;
let Send_Collection_Data_onLoad = () => {
    newCollectFormDiv = document.getElementById('newCollectForm');
    showNewCollectBtn = document.getElementById('showAddCollectBtn');
    addColFormTermInput = document.getElementById('dis_term');
    addColFormTitleInput = document.getElementById('dis_title');
    submitColFormBtn = document.getElementById('submitColData');
};
let checkColFormData = () => {
    if ((addColFormTermInput.value != "") && (addColFormTitleInput.value != "")) {
        AJAXSendColFormData(addColFormTermInput.value, addColFormTitleInput.value);
        addColFormTermInput.value = "";
        addColFormTitleInput.value = "";
        toggleAddColFormVisibility();
    }
    else {
        errorAlert("Invalid input, Please check data");
    }
};
let AJAXSendColFormData = (dis_Term, dis_Title) => {
    //http://biobank.eu-west-2.elasticbeanstalk.com/RDS_AddCollection_Service
    //http://localhost:8080/Biobank/RDS_AddCollection_Service
    $.ajax({
        type: "post",
        url: "http://localhost:8080/Biobank/RDS_AddCollection_Service",
        dataType: "json",
        data: { term: dis_Term, title: dis_Title },
        success: (response) => {
            if (response[0] == 1) {
                getCollection();
                successAlert("Collection added successfully");
            }
            else {
                errorAlert("Please Try Again later");
            }
        }
    });
};
