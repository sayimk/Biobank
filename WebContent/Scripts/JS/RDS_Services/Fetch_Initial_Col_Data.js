"use strict";
let collectionTable;
let Fetch_Initial_Col_Data_onLoad = () => {
    collectionTable = document.getElementById('collectionTable');
};
//AJAX function to grab inital data
//http://biobank.eu-west-2.elasticbeanstalk.com/RDS_InitialLoad_Service
//http://localhost:8080/Biobank/RDS_InitialLoad_Service
let getCollection = () => {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/Biobank/RDS_InitialLoad_Service",
        dataType: "json",
        success: (response) => {
            fillCollectionTable(response);
        }
    });
};
let fillCollectionTable = (response) => {
    //add table header
    collectionTable.innerHTML = "";
    let head = collectionTable.createTHead();
    let hRow = head.insertRow(0);
    let title1 = hRow.insertCell(0);
    let title2 = hRow.insertCell(1);
    let title3 = hRow.insertCell(2);
    title1.innerHTML = "<strong>View Selection:</strong";
    title2.innerHTML = "<strong>Title:</strong>";
    title3.innerHTML = "<strong>Disease Term:</strong>";
    //iterate though data and insert into table
    let termCount = 0;
    let rowCounter = 1;
    response[0].forEach(element => {
        let row = collectionTable.insertRow(rowCounter);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = "<input type=\"radio\" name=\"viewSelect\" id=\"radio" + response[2][termCount] + "\" value =" + response[2][termCount] + ">";
        cell2.innerHTML = element;
        cell3.innerHTML = response[1][termCount];
        //grabbing radio DOM Objects
        let radioObj = document.getElementById('radio' + response[2][termCount]);
        collectionRadSelect.push(radioObj);
        termCount++;
        rowCounter++;
    });
};
let getSelectedRadioValue = () => {
    for (let i = 0; i < collectionRadSelect.length; i++) {
        if (collectionRadSelect[i].checked) {
            return collectionRadSelect[i].value;
        }
    }
    return "-1";
};
