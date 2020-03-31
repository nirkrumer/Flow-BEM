/* ******************** API FETCH ************************************* */

/*fetch(ServiceEndpoints.flowBaseURL + ServiceEndpoints.flowAuthEndpoint, { 
            method: "POST", 
            body: JSON.stringify(body), 
            headers: {"Content-Type": "application/json"}, 
            credentials: "same-origin"
        })
        .then(async (response: any) => {
            if(response.status === 200) {
                const flowToken = await CallResult._getBodyText(response);
                console.log(flowToken);
                result = CallResult.newInstance(true,"connected", flowToken);
            }
            else {
                //error
                const errorText = await CallResult._getBodyText(response);
                console.log("Logged In Error - " + errorText);
                result = CallResult.newInstance(false,"not connected", errorText);
            }
        });

/* *********************** LISTENERS **************************************
 (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
 (manywho as any).eventManager.addBeforeSendListener(this.moveHappening, this.componentId);

moveHappening(xhr: XMLHttpRequest, request: any) {
        if ((xhr as any).invokeType === 'FORWARD') {
            // this.forceUpdate(); 
            .....     
            const oc: FlowOutcome = this.getOutcomeById(request.mapElementInvokeRequest.selectedOutcomeId);
            console.log(oc.developerName);            
        }
    }

moveHappened(xhr: XMLHttpRequest, request: any) {
    if ((xhr as any).invokeType === 'FORWARD') {
        // this.forceUpdate();
    }
}
/* ************************** Session Stroage ******************************** 

GET

//        this.listmode = new Boolean(sessionStorage.getItem(this.componentId + "_listmode")||false)
/*if (sessionStorage.getItem(this.componentId + "_listmode")) {
    this.listmode = sessionStorage.getItem(this.componentId + "_listmode").toLowerCase()  
    === "true"? true: false ;
}
else{
    this.listmode = false;
}*/
    /*    this.listmode = sessionStorage.getItem(this.componentId + "_listmode").toLowerCase() 
        === "true"? true: false ;

SET

sessionStorage.setItem(this.componentId + "_listmode",this.listmode.toString())

*/

