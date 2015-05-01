angular.module("kendoDemo", [

  // Angular modules
  //'ngRoute',           // routing

  // Custom modules
  "kendoMail",
 //"kendoModal",


  // 3rd Party Modules
  "kendo.directives",
  ])

  // config always runs before the services are ready.
  // basically the first thing our module does.
   /* .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/', { templateUrl: 'app/welcome/welcome.html' })
          .otherwise({ redirectTo: '/' }); // go to the welcome page
    }
    ])*/


  //TODO: When the injector is done loading all modules we should run the init method of the "sushiCart" service.
  // At this point the application DataSource and the observable array will be initialized.
    .run(['sushiCart', function(sushiCart){
      sushiCart.init();
    }])

  //TODO: Add service and application DataSource
    .service('sushiCart', function() {

      this.init = function() {
        //the application DataSource
        this.productsDataSource = new kendo.data.DataSource({
          transport: {
            read: {
              url: "http://excitenet.co.uk/get-json",
              dataType: "jsonp"
            }
          },
          schema: {
            data:'data',
            total: "total",
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                name: { type: "string" }
              }
            }
          },
          pageSize: 15
        });
        //observable array that will be used to store products that user has selected
        this.added = new kendo.data.ObservableArray([]);
        //field that will hold reference to the last selected product (used for displaying the details)
        this.currentItem = null;
      };

      this.setCurrentItem = function(id) {
        this.currentItem = this.productsDataSource.get(id);
      };

      //in the "sushiCart" service
      this.addToCart = function(kendoEvent, dataItem) {
        var that = this, item, ordered;

        item = dataItem ? dataItem : this.currentItem;

        //increment the number which indicates how many times the item is ordered
        ordered = item.get("ordered") || 0;
        ordered += 1;

        item.set("ordered", ordered);

        //add the item to the "added" list and show the 'item added to cart xx times' message
        if (ordered === 1) {
          item.set("visibleMessage", true);
          this.added.push(item);
        }

        //prevent the default behaviour of the anchor tag
        kendoEvent.preventDefault();
      };

      //in the "sushiCart" service
      this.removeItem = function(kendoEvent, dataItem) {
        var item = dataItem,
            index = this.added.indexOf(item),
            currentView = kendo.mobile.application.view();

        item.set("ordered", 0); //reset the ordered number
        item.set("visibleMessage", false); //hide the 'Item added to cart xx times' message
        this.added.splice(index, 1); //remove the item from the 'added' observable array

        //after removing item from the DataSource we should reset the ListView scroller
        currentView.scroller.reset();
        //prevent the default behaviour of the anchor tag
        kendoEvent.preventDefault();
      };

      //in the "sushiCart" service
      this.checkout = function() {
        var that = this,
            dataSourceData = this.productsDataSource.data(), //get the dataSource data
            length = dataSourceData.length;

        setTimeout(function () { //loop through the data
          for (idx = 0; idx < length; idx++) {
            dataSourceData[idx].set("ordered", 0); //reset the ordered field
          }

          that.added = []; //clear the added array
        }, 400);
      };

      this.showTotal = function() {
        var cartItems = this.added,
            total = 0;
        for(var idx = 0; idx < cartItems.length; idx++) {
          total += cartItems[idx].ordered * cartItems[idx].price;
        }
        return kendo.toString(total, "c"); //format the number
      };

      //Toggle the visibility of a label
      this.showLabel = function() {
        return this.currentItem && this.currentItem.ordered > 0;
      };

    })

  /*TODO: Before we can pass the template to the widgets we have to assign it to the View controller's scope.
   Let's create a service that will hold reference to the template.*/
    .factory('templates', function() {
      return {
        menuTemplate: $("#menuTemplate").html(),
        cartItemTemplate: $("#cartItemTemplate").html()
      };
    })

  //TODO: Menu controller
    .controller('menuController', ['$scope', 'sushiCart','templates', function($scope, sushiCart, templates) {
      $scope.sushiCart = sushiCart;
      $scope.templates = templates;
      $scope.groupByCategory = function() {
        //remove all filters
        $scope.sushiCart.productsDataSource.filter([]);
        //group items by category
        $scope.sushiCart.productsDataSource.group({ field: "category" });
      }
    }])


  //TODO: Product Details controller. Implement the "setCurrentItem" method in the "sushiCart" service.
    .controller('detailsController', ['$scope', 'sushiCart', function($scope, sushiCart){
      $scope.sushiCart = sushiCart;

      $scope.setCurrentItem = function(kendoEvent) {
        var id = parseInt(kendoEvent.view.params.id);
        sushiCart.setCurrentItem(id);
      }
    }])


  //TODO: Cart controller.
    .controller('cartController', ['$scope', 'sushiCart', 'templates', function($scope, sushiCart, templates){
      $scope.sushiCart = sushiCart;
      $scope.templates = templates;
    }])


  //TODO: Last we need to declare dependency for the "sushiCart" service in the "indexController"
  // and assign "sushiCart" to the scope
    .controller('indexController', ['$scope','sushiCart', function($scope,sushiCart) {
      $scope.greetings = "Hello Kendo UI/Angular User!";
      $scope.sushiCart = sushiCart;

      $scope.filterFeatured= function() {
        //remove all groups
        $scope.sushiCart.productsDataSource.group([]);
        //filter only those records that are featured
        $scope.sushiCart.productsDataSource.filter({ field: "featured", operator: "eq", value: true });
      }
      //console.dir(sushiCart);
    }])

   /* .controller("modalViewController", function($scope) {
        $scope.closeModalViewLogin = function() {
            $("#modalview-login").kendoMobileModalView("close");
        };
    })*/

    .controller("MyCtrl", function($scope) {
        $scope.buttonGroupOptions = {
            select: function(e) {
                $("[data-role=listview]").hide().eq(e.index).show();
            },
            index: 0
        };
    });



