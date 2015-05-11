JustutalkMobile.userAccount = (function () {
    //ViewModel for User Account view
    var viewModel = kendo.observable({
        isUserLoggedIn: false,
        firstName: "",
        lastName: "",
        userName: "admin", //hardcoded
        password: "H4der222", //hardcoded
        userAddress: "",
        userEmailAddress: "",
        subscribedForNewsLetter:false,
        userBookingHistory: [],

        username: "",
        email: "",
        uid: "",
        sessionId: "",
        sessionName: "",
        token: "",

        userLogin: function () {
            var loginOptions = {                                
                
                url: JustutalkMobile.configuration.accountUrl,
                requestType: "POST",
                dataType: "json",
                httpHeaders:[                    
                    {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}                
                ],
                addCSRF : false,
                requestData: {
                    username: this.userName,
                    password: this.password
                },                
                callBack: this.fnLoginCallBack,
                stringify: false                
                
            };
            JustutalkMobile.dataAccess.callService(loginOptions);

        },
        //method for user login
        fnLoginCallBack: function (result) {
            if (result.success === true) {

                viewModel.set("firstName", result.data.user.name);
                viewModel.set("lastName", result.data.LastName);
                viewModel.set("userAddress", result.data.Address);
                viewModel.set("userEmailAddress", result.data.EmailId);
                viewModel.set("userBookingHistory", result.data.BookingHistory);
                viewModel.set("isUserLoggedIn", true);
                viewModel.set("subscribedForNewsLetter", result.data.SubscribedForNewsLetter);

                viewModel.set("username", result.data.user.name);
                viewModel.set("email", result.data.user.mail);
                viewModel.set("uid", result.data.user.uid);
                viewModel.set("sessionId", result.data.sessid);
                viewModel.set("sessionName", result.data.session_name);
                viewModel.set("token", result.data.token);

                JustutalkMobile.common.showLogOffButton();
                

            } else {
                //any error handling code
            }
        },

        //method to update user details
        updateUserDetails: function () {
            var updateOptions = {
                url: JustutalkMobile.configuration.accountUrl,
                requestType: "POST",
                dataType: "JSON",
                data: { firstName: viewModel.get("firstName"),
                        lastName: viewModel.get("lastName"),
                        address: viewModel.get("userAddress"),
                        emailId: viewModel.get("userEmailAddress"),
                        subscribedForNewsLetter: viewModel.get("subscribedForNewsLetter")
                },

                //for HTTP Basic authentication
                httpHeader: "Authorization",

                //btoa function will convert the text to base 64 encoding
                headerValue: "Basic " + btoa(this.userName + ":" + this.password),
                callBack: function () {
                    //if you are using PhoneGap to deploy as an app, 
                    //you should use the notification api
                    alert('Details updated...');
                }
            };
            JustutalkMobile.dataAccess.callService(updateOptions);
        },

        //method called when log off button is clicked
        logOff: function () {
            console.log('inside logOff');
            viewModel.set("firstName", "");
            viewModel.set("lastName", "");
            viewModel.set("userAddress", "");
            viewModel.set("userEmailAddress", "");
            viewModel.set("userBookingHistory", "");
            viewModel.set("isUserLoggedIn", false);                                 
            
            var Options = {                                
                
                url: JustutalkMobile.configuration.logoutUrl,
                requestType: "POST",
                dataType: "",
                httpHeaders:[],
                addCSRF : true,
                requestData: "",                
                callBack: false,
                stringify: false                
                
            };
            JustutalkMobile.dataAccess.callService(Options);
            

            //hide log off button
            JustutalkMobile.common.hideLogOffButton();
            
            //navigate to User Account screen.
            JustutalkMobile.common.navigateToView("views/UserAccount.html");
        },
        
        //method for get node
        getNodes: function () {
            var options = {
                
                url: "http://www.excitenet.co.uk/users-json/node/36",
                requestType: "GET",
                dataType: "json",
                httpHeaders:[
                    {'Content-Type':'application/json'},                    
                    {'X-Accept'    :'application/json'}                    
                ],
                addCSRF : false,
                requestData: "",     
                callBack: false,
                stringify: false
                
            };
            JustutalkMobile.dataAccess.callService(options);
            
        },
        
        //method for add node
        addNode: function () {
            var options = {
                url: "http://excitenet.co.uk/users-json/node.json",
                requestType: "POST",
                dataType: "json",                
                httpHeaders:[                    
                    {'Content-Type':'application/json'}
                ],
                addCSRF : true,
                requestData: {
                  "type":"article",
                  "title":"Page submitted via 3333",
                  "body": {
                    "value": "<p>test</p>\n",
                    "format": "filtered_html"
                  }
                },                
                callBack: false,
                stringify: true
            };
            JustutalkMobile.dataAccess.callService(options);
        },
        
       
    });

    return {
        viewModel: viewModel
    }
})();