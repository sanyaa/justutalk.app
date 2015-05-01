/**
 * Created by temp on 03/04/2015.
 */

//..... see following video:
// ----Building Mobile Apps with Cordova, Ionic Framework, and Drupal (DrupalCamp LA 2014) Mike Roberts

//excert from video

$http({
    url: 'drupal-service-url',
    method: 'GET'
})
.success(function(response){
        $scope.session = response;
        ionicLoading.hide();
    })
.error(function(response){
        //display error message
    })



