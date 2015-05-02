
var App = (function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

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

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {
        //var ref = window.open('http://php.net', '_blank', 'location=yes');
        //ref.close();
		//alert('hello');
        
        navigator.splashscreen.show();

        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
        // navigator.splashscreen.hide();
        //console.log(navigator);

        app = new kendo.mobile.Application(document.body, {

            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',
            loading: "<h1>Loading...</h1>",
            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            //skin: 'flat',

            // the application needs to know which view to load first
            initial: 'views/home.html'
        });

    }, false);

    /*//Display loading image on every ajax call
      $(document).ajaxStart(function () {
    //application.showLoading calls the showLoading()
    //method of the pane object inside the application.
    //During the application's initial view's init
    //method this pane object may not be initialized
    //and so application.showLoading() may throw error.
    //To prevent this we need to do a check for existence
    //application.pane before calling
    //application.showLoading();
        if (app.pane) {
          app.showLoading();
        }
      });
    //Hide ajax loading image on after ajax call
      $(document).ajaxStop(function () {
        if (app.pane) {


          app.hideLoading();
        }
      });*/


  $("#foo-template-2 a").bind('click',function(e){
    alert('hello');

  });



  return app;
}());




function goTo(view, e){
  console.log(e);
  App.navigate('views/' + view);
}