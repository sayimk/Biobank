
let collectionTable:HTMLTableElement;
let viewSelectionBtn:HTMLButtonElement;
let collectionRadSelect:HTMLInputElement[] = [];
let resultInfoHead:HTMLHeadingElement;
let newCollectFormDiv:HTMLDivElement;

let showNewCollectBtn:HTMLButtonElement;

let addColFormTermInput:HTMLInputElement;
let addColFormTitleInput:HTMLInputElement;
let submitColFormBtn:HTMLButtonElement;
    
let dangerAlertDiv:HTMLDivElement;
let successAlertDiv:HTMLDivElement;

let newSampleFormDiv:HTMLDivElement;
let hiddenCollectId:HTMLInputElement;
let addSamFormDonCount:HTMLInputElement;
let addSamFormMatType:HTMLInputElement;
let submitSamDataBtn:HTMLButtonElement;

//AJAX function to grab inital data
let getCollection = ()=>{
    $.ajax({
        type:"get",
        url:"http://localhost:8080/Biobank/RDS_InitialLoad_Service",
        dataType:"json",
        success: (response) =>{
            fillCollectionTable(response);

        }
    })
}

let fillCollectionTable =(response:any)=>{
    //add table header
    collectionTable.innerHTML="";

    let head = collectionTable.createTHead();
    let hRow = head.insertRow(0);
    let title1 = hRow.insertCell(0);
    let title2 = hRow.insertCell(1);
    let title3 = hRow.insertCell(2);
    title1.innerHTML = "<strong>View Selection:</strong";
    title2.innerHTML = "<strong>Title:</strong>";
    title3.innerHTML = "<strong>Disease Term:</strong>";

    //iterate though data and insert into table
    let termCount:number =0;
    let rowCounter: number =1;
    response[0].forEach(element => {

        let row = collectionTable.insertRow(rowCounter);
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)

        cell1.innerHTML="<input type=\"radio\" name=\"viewSelect\" id=\"radio"+response[2][termCount]+"\" value ="+response[2][termCount]+">";
        cell2.innerHTML = element;
        cell3.innerHTML=response[1][termCount];

        //grabbing radio DOM Objects
        let radioObj = document.getElementById('radio'+response[2][termCount])as HTMLInputElement;
        collectionRadSelect.push(radioObj);        
        
        termCount++;
        rowCounter++;
    });
}

let getSelectedRadioValue = ():string =>{
    
    for (let i = 0; i < collectionRadSelect.length; i++) {
        if (collectionRadSelect[i].checked) {

            return collectionRadSelect[i].value; 
        }
    }

    return "-1";
}

//move to home event handlers ts/js file
window.onload = () =>{
    collectionTable = document.getElementById('collectionTable')as HTMLTableElement;
    viewSelectionBtn = document.getElementById('viewSelection') as HTMLButtonElement;
    resultInfoHead = document.getElementById('infoHead') as HTMLHeadingElement;
    newCollectFormDiv = document.getElementById('newCollectForm') as HTMLDivElement;
    showNewCollectBtn = document.getElementById('showAddCollectBtn') as HTMLButtonElement;

    addColFormTermInput = document.getElementById('dis_term') as HTMLInputElement;
    addColFormTitleInput = document.getElementById('dis_title') as HTMLInputElement;
    submitColFormBtn = document.getElementById('submitColData') as HTMLButtonElement;

    dangerAlertDiv = document.getElementById('dangerAlert') as HTMLDivElement;
    successAlertDiv = document.getElementById('successAlert') as HTMLDivElement;

    newSampleFormDiv = document.getElementById('newSampleForm') as HTMLDivElement;
    hiddenCollectId = document.getElementById('collection_id') as HTMLInputElement;
    addSamFormDonCount = document.getElementById('don_Count') as HTMLInputElement;
    addSamFormMatType = document.getElementById('mat_Type') as HTMLInputElement;
    submitSamDataBtn = document.getElementById('submitSamData') as HTMLButtonElement;

    getCollection();

    //loaded event handlers
    viewSelectionBtn.onclick = () =>{
        let selNumb:string = getSelectedRadioValue();

        hiddenCollectId.value = selNumb;
        AjaxGetSelectedSample(parseInt(selNumb));
    }

    showNewCollectBtn.onclick = () =>{
        toggleAddColFormVisibility();
    }
    submitColFormBtn.onclick = () =>{
        checkColFormData();
    }

    submitSamDataBtn.onclick = () =>{
        checkSamFormData();
    }
}


