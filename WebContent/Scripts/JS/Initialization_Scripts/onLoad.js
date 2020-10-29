"use strict";
window.onload = () => {
    Fetch_Initial_Col_Data_onLoad();
    Send_Collection_Data_onLoad();
    Fetch_Selected_Sample_Data_onLoad();
    UI_Alerts_onLoad();
    Send_Sample_Data();
    onLoadEventsHandling();
    getCollection();
};
