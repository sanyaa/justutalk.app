/**
 * Created by temp on 30/04/2015.
 */
function mobileListViewFiltering() {
    //var ref = window.open('http://www.johnwargo.com', '_blank', 'location=yes');
    //App.showLoading();
    //application.hideLoading();
    //writes title of the displayed view to the console.
    //console.log(App.view().title);


    var dataSource = new kendo.data.DataSource({
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
        sort: {
            field: "name",
            dir: "desc"
        },/*
         serverPaging: true,
         serverFiltering: true,
         serverSorting: true,*/
        pageSize: 5

    });

    $("#listViewContainer").kendoMobileListView({
        dataSource: dataSource,
        template: $("#foo-template").text(),
        filterable: {
            field: "name",
            "autoFilter": true,
            operator: "startswith",
            placeholder: "Type to search rate...",
            ignoreCase: true // search for "foo" or "Foo" will return same item
            //operator: "eq" // match the whole word
        },
        //endlessScroll: true
        pullToRefresh: true,
        pullParameters: function(item) {
            console.log(item); // the last item currently displayed
            return { since_id: item.name };
        }

    });
}


//*********** SAMPLE CODE *************
function changeItem() {
    var newItem = new kendo.data.Model({idx: 2});
    $("#listview").data("kendoMobileListView").setDataItem($("#listview li").eq(0), newItem);
}