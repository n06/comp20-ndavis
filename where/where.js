			var userLat = 0;
			var userLng = 0;
			var request = new XMLHttpRequest();
			var user = new google.maps.LatLng(myLat, myLng);
			var myOptions = {
				zoom: 13,
				// The larger the zoom number, the bigger the zoom
				center: user,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map;
			var marker;
			var infowindow = new google.maps.InfoWindow();
			var places;

			function init() {
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				getMyLocation();
			}

			function getMyLocation() {
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						userLat = position.coords.latitude;
						userLng = position.coords.longitude;
						renderMap();
					});
				} else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}

			function renderMap() {
				user = new google.maps.LatLng(myLat, myLng);
				// Update map and go there...
				map.panTo(user);
				// Create a marker
				marker = new google.maps.Marker({
					position: user,
					title: "Your Location"
				});
				marker.setMap(map);
				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});
				// Calling Google Places API
				var request = {
					location: user,
					radius: '500',
					types: ['food']
				};
				service = new google.maps.places.PlacesService(map);
				service.search(request, callback);
			}
			// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html

			function callback(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					alert("Got places back!");
					places = results;
					for (var i = 0; i < results.length; i++) {
						createMarker(results[i]);
					}
				}
			}

			function createMarker(place) {
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.close();
					infowindow.setContent(place.name);
					infowindow.open(map, this);
				});
			}