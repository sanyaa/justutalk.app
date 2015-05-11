
JustutalkMobile.dataAccess = (function () {

       
    //options input parameter will have all the data needed
    //to perform the ajax call
    function callService(options){  
         
        var requestData = "";
        
        if(typeof(options.requestData) === "object"){  
            
            requestData = options.requestData;
            if(options.stringify){
                _requestData = JSON.stringify(requestData);
            }else{
                _requestData = requestData;
            }
        }       
       
        $.ajax({
            url: options.url,
            type: options.requestType,
            dataType: options.dataType,            
            data:  _requestData,
            
            xhrFields: {
                  withCredentials: true
                  //crossDomain: true
            },                  
         
            //Add HTTP headers if configured
            beforeSend: function (xhr) {
                
                var headers = options.httpHeaders;
                var token = JustutalkMobile.userAccount.viewModel.token; 
                
                if(headers.length > 0){

                    headers.forEach(function(value, index, arr){
                        var key = Object.keys(value)[0];
                        var val = value[key];
                        xhr.setRequestHeader(key, val);
                    })
                }
                
                if(token && options.addCSRF) {                            
                    xhr.setRequestHeader('X-CSRF-Token', token);                
                }
            },
            
            //on successful ajax call back
            success: function (resultData, status, xhr) {
                alert('success : msg = '+resultData[0] + "Title: " + resultData.title);

                var result = {
                    data: resultData,
                    success: true
                };                
                
                if(typeof(options.callBack) === "function"){                           
                     options.callBack(result);
                }

                console.log(resultData);
            },
            
            //Callback function incase of an error
            error: function (xhr, status, errorThrown) {
                alert('error: '+ xhr.status);
                switch(xhr.status){

                    case '401' :
                        alert('401 Unauthorized access detected.Please check the credentials you entered. ' + errorThrown);
                        break;
                    case '500' :
                        alert('500 Internal Server Error. Please check the service code.' + errorThrown);
                        break;
                    default :
                        alert('Unexpected error: ' + errorThrown);
                        break;
                }
                
                var result = { success: false };
                
                if(typeof(options.callBack) === "function"){                           
                     options.callBack(result);
                }
            }
        });              
            
      
    }
    return {
        callService: callService             
    }
})();