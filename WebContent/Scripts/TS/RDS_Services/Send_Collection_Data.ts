
let checkColFormData = () =>{
    if((addColFormTermInput.value!="")&&(addColFormTitleInput.value!="")){
        AJAXSendColFormData(addColFormTermInput.value,addColFormTitleInput.value);
        addColFormTermInput.value="";
        addColFormTitleInput.value="";

        toggleAddColFormVisibility();
    }else{
        errorAlert("Invalid input, Please check data");
    }
}

let AJAXSendColFormData = (dis_Term:string, dis_Title:string) =>{
    
    //http://biobank.eu-west-2.elasticbeanstalk.com/
    $.ajax({
        type:"post",
        url:"http://localhost:8080/Biobank/RDS_AddCollection_Service",
        dataType:"json",
        data: {term:dis_Term, title:dis_Title},
        success: (response) =>{
            //Put okay alert here,
            if(response[0]==1){
                getCollection();
                successAlert("Collection added successfully");
            } else{
                errorAlert("Please Try Again later");
            }

        }
    })
}


//add to seperate UI hander ts
//force window to scroll to top
let errorAlert = (message:string)=>{
    dangerAlertDiv.innerHTML = "<div class=\"alert alert-danger fade show alert-dismissible\">"+
    "<strong>Error:</strong> "+message+ "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
    "<span aria-hidden=\"true\">&times;</span>"
    +"</button></div>";
    window.scrollTo(0,0);
}

let successAlert = (message:string)=>{
    
    successAlertDiv.innerHTML = "<div class=\"alert alert-success fade show alert-dismissible\">"+
    "<strong>Success:</strong> "+message+ "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
    "<span aria-hidden=\"true\">&times;</span>"
    +"</button></div>";
    window.scrollTo(0,0);
}

let toggleAddColFormVisibility = () =>{
    if (newCollectFormDiv.style.display=="none")
        newCollectFormDiv.style.display = "block";
    else
    newCollectFormDiv.style.display = "none";
}