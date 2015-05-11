JustutalkMobile.configuration = (function () {

   //var serviceUrl = "http://localhost/movietickets.webapi/api/";
    var serviceUrl = "http://excitenet.co.uk/users-json/";

    // create an object to store the models for each view
    window.APP = {
        models: {
            home: {
                title: 'Home'
            },
            settings: {
                title: 'Settings'
            },
            contacts: {
                title: 'Contacts',
                ds: new kendo.data.DataSource({
                    data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
                }),
                alert: function(e) {
                    alert(e.data.name);
                }
            }

        }
    };


    return {            
        serviceUrl: serviceUrl,
        accountUrl: serviceUrl + "user/login.json",
        loginUrl: serviceUrl + "user/login.json",
        logoutUrl: serviceUrl + "user/logout.json",
        getMovieListUrl: serviceUrl + "Movies/GetMovieList/",        
        getTheaterListForMovieUrl: serviceUrl + "Theater/Get/",
        getTrailersUrl: serviceUrl + "Movies/GetTrailers/",
        purchaseTicketsUrl: serviceUrl + "Tickets"
    }
})();