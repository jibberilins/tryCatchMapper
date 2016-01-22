var app = angular.module('starter.mainController', []);

app.controller("startupController", function($scope, $http) {
    //Initliase objects
    $scope.startUpData = "";
    $scope.errorMessage = "";
    $scope.startUpList = [];

    $scope.mapCreated = function(map) {
        $scope.map = map;
    };
    
    $scope.watchMapData = function() {
        var lines, lineNumber, data, length;
        $scope.startUpList = [];
        lines = this.startUpData.split('\n');
        lineNumber = 0;

        /*
            Here I am splitting up each line in "lines"
            With those "lines" i am checking the lines length
            and splitting those lines up by the commas.
        */
        for (var i = lines.length - 1; i >= 0; i--) {

            l = lines[i];
            lineNumber++;
            data = l.split(',');
            
            /*
                Below i am then pushing each data item into the table
                in the relevant columns.
            */

            //Table Columns with data
            var company = data[0];
            var founder = data[1];
            var city = data[2];
            var country = data[3];
            var postalco = data[4];
            var street = data[5];
            var photo = data[6];
            var homepage = data[7];
            var latitude = data[8];
            var longitude = data[9];

            //pushing Table Data
            $scope.startUpList.push({
                company: company,
                founder: founder,
                city: city,
                country: country,
                postalco: postalco,
                street: street,
                photo: photo,
                homepage: homepage,
                latitude: latitude,
                longitude: longitude
            });

            //Google Map Marker Config
            if(latitude != undefined && longitude != undefined){
                /*
                    This google maps map marker is within the for loop above
                    so while its moving through each line in the textfield and
                    placing it in the table, at the same time, its grabbing the
                    latitude and longitude and placing it into the position 
                    attribute here.
                */


                var windowContent = '<div id="content">'+
                              '<div id="siteNotice">'+
                              '</div>'+
                                  '<h1 id="firstHeading" class="firstHeading">' + company + '</h1>'+
                                  '<div id="bodyContent">'+
                                      '<img src="' + photo + '">' +
                                      '<p>' + company + '</p>'+
                                      '<p>' + founder + '</p>'+
                                      '<p>' + city + '</p>'+
                                      '<p>' + country + '</p>'+
                                      '<p>' + postalco + '</p>'+
                                      '<p>' + street + '</p>'+
                                      '<p><a href="' + homepage + '" target="_blank">Homepage</a></p>'+
                                      '<p>' + latitude + '</p>'+
                                      '<p>' + longitude + '</p>'+
                                  '</div>'+
                              '</div>';

                var markerWindow = new google.maps.InfoWindow({
                    content: windowContent
                });

                var markers = new google.maps.Marker({
                    position: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
                    map: $scope.map,
                    title: company + city
                });

                markers.addListener('click', (function(markers, windowContent, markerWindow){ 
                    return function() {
                        markerWindow.setContent(markerWindow.content);
                        markerWindow.open($scope.map,markers);
                    };
                })(markers, windowContent, markerWindow));  
            }

            }
    };

});