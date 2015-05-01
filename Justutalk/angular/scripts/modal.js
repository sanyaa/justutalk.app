/**
 * Created by temp on 18/02/2015.
 */


angular.module("kendoDemo")
    .controller("modalViewController", function($scope) {
        $scope.closeModalViewLogin = function() {
            $("#modalview-login").kendoMobileModalView("close");
        };
        $scope.uid = 123456789;
    });

