let onLoadEventsHandling = () =>{

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