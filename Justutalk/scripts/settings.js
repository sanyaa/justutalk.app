JustutalkMobile.settings = (function () {

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


   /* return {
        serviceUrl: serviceUrl,
        accountUrl: serviceUrl + "user/login.json",
        getMovieListUrl: serviceUrl + "Movies/GetMovieList/",        
        getTheaterListForMovieUrl: serviceUrl +
            "Theater/Get/",
        getTrailersUrl: serviceUrl + "Movies/GetTrailers/",
        purchaseTicketsUrl: serviceUrl + "Tickets"
    }*/
})();

function _loadInApp(e){

    var ref = window.open('https://www.justutalk.net/user/login', '_blank', 'location=yes');
    return false;

}

function closeParentPopover(e) {

    var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');
    popover.close();
}

$("#in-app").bind('click',function(e){
    alert('hello');
    var ref = window.open('https://www.justutalk.net/user', '_blank', 'location=yes');
    return false;
});