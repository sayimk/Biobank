let viewSelectionBtn:HTMLButtonElement;
let resultInfoHead:HTMLHeadingElement;

let Fetch_Selected_Sample_Data_onLoad = () =>{
    viewSelectionBtn = document.getElementById('viewSelection') as HTMLButtonElement;
    resultInfoHead = document.getElementById('infoHead') as HTMLHeadingElement;
}

let AjaxGetSelectedSample = (selectedID:number) =>{

    //http://biobank.eu-west-2.elasticbeanstalk.com/RDS_FetchSampleQuery_Service
    //http://localhost:8080/Biobank/RDS_FetchSampleQuery_Service
   $.ajax({
        type:"post",
        url:"http://localhost:8080/Biobank/RDS_FetchSampleQuery_Service",
        dataType:"json",
        data: {id:selectedID},
        success: (response) =>{
            generateSampleRsltTB(response)

        }
    })
}

let generateSampleRsltTB = (response:any) =>{
    
    let sampleTable:HTMLTableElement = document.getElementById('sampleTable') as HTMLTableElement;
    let dataCount:number = 0;
    let rowCounter:number =1;

    sampleTable.innerHTML="";
    
    if(response.length!=0){
    
        if(resultInfoHead!=null)
            resultInfoHead.innerText=response[0].length+" Total Results Available";

    //add table header
    let head = sampleTable.createTHead();
    let hRow = head.insertRow(0);
    let title1 = hRow.insertCell(0);
    let title2 = hRow.insertCell(1);
    let title3 = hRow.insertCell(2);
    title1.innerHTML = "<strong>Donor Count:</strong";
    title2.innerHTML = "<strong>Material Type:</strong>";
    title3.innerHTML = "<strong>Last Updated:</strong>";

    //add elements
    response[0].forEach(element => {
        let row = sampleTable.insertRow(rowCounter);
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)

        cell1.innerHTML = element;
        cell2.innerHTML = response[1][dataCount];
        cell3.innerHTML = response[2][dataCount];

        dataCount++;
        rowCounter++;
    });

    }else{
        if(resultInfoHead!=null)
            resultInfoHead.innerText="No Results Available";
    }

    newSampleFormDiv.style.display="block";
    window.scrollTo(0,document.body.scrollHeight);
}

