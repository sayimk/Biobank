"use strict";
let dangerAlertDiv;
let successAlertDiv;
let UI_Alerts_onLoad = () => {
    dangerAlertDiv = document.getElementById('dangerAlert');
    successAlertDiv = document.getElementById('successAlert');
};
let errorAlert = (message) => {
    dangerAlertDiv.innerHTML = "<div class=\"alert alert-danger fade show alert-dismissible\">" +
        "<strong>Error:</strong> " + message + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
        "<span aria-hidden=\"true\">&times;</span>"
        + "</button></div>";
    window.scrollTo(0, 0);
};
let successAlert = (message) => {
    successAlertDiv.innerHTML = "<div class=\"alert alert-success fade show alert-dismissible\">" +
        "<strong>Success:</strong> " + message + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
        "<span aria-hidden=\"true\">&times;</span>"
        + "</button></div>";
    window.scrollTo(0, 0);
};
