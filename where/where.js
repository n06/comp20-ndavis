var userLat = 0;
var userLng = 0;
var request = new XMLHttpRequest();
var request_WC = new XMLHttpRequest();
var realTime = new XMLHttpRequest();
var redStations = [];
var redBranchAshmont = [];
var redBranchBraintree = [];
var markers = [];
var results;
var infowindow = new google.maps.InfoWindow();
var places;
var dist;

var C_W = [];
	var map;
var marker;
var user = new google.maps.LatLng(42.330497742, -71.095794678);

var myOptions = {
	zoom: 13,
	center: user,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var addListener = function (m) 
{
	google.maps.event.addListener(markers[m], 'click', function(){
		stopName = this.title;
		mvcObj = this;
		try {
			realTime.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
		} catch (error) {}
		// Execute the request
		realTime.send(null);
		// Handle the request (however you want)
		realTime.onreadystatechange = function() 
		{
			if(realTime.readyState == 4 && realTime.status == 200)
			{
				content = stopName;
				results = JSON.parse(realTime.responseText);
				if (results.length > 0) {
				content += '<table id="schedule"><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Arrival Time</th></tr>';
				for(i in results){
					content += '<tr><td>' + results[i].Line + '</td><td>' + results[i].Trip + '</td><td>';
					if(results[i].PlatformKey.charAt(4) == 'S'){
						content += 'South';
					} else {
						content += 'North';
					}
					content += '</td><td>' + results[i].Time + '</td></tr>';
				}
				content += '</table>';
				} else {
					content += "<p>No schedule of upcoming trains for this station.</p>";
				}
				infowindow.setContent('<div id="infowindow">' + content + '</div>');	
			}
		}
	infowindow.open(map, mvcObj);                
});
}

function init() 
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	drawMap(map);
	drawW_C(map)
	
}
	
function drawW_C(map)
{
	try{
		request_WC.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
	}
	catch (error) {
	
	}
   request_WC.send(null);

   request_WC.onreadystatechange = function() 
	{
		if(request_WC.readyState == 4 && request_WC.status == 200)
		{
			//(JSON.parse(request_WC.responseText));
			obj = JSON.parse(request_WC.responseText);
			
			for(var i = 0; i < obj.length; i++) {
				lat = obj[i].loc.latitude;
				lon = obj[i].loc.longitude;																				
				if(obj[i].name == "Waldo"){
					pt = new google.maps.LatLng(lat, lon);	
					C_W.push(new google.maps.Marker({position: pt, title: "Waldo", icon: "assets/waldo_icon.png"})); 
				}
				else if(obj[i].name == "Carmen Sandiego"){
					pt = new google.maps.LatLng(lat, lon);	
					C_W.push(new google.maps.Marker({position: pt, title: "Carmen Sandiego", icon: "assets/carmen_icon.png"})); 
				}
				dist = find_waldo(lat, lon);
			}
			for (var m in C_W) {
				C_W[m].setMap(map);
				name = C_W[m].title
				contentWC = 'Distance to ' + name + ' is: ' + dist
				infowindow3 = new google.maps.InfoWindow();
				infowindow3.setContent(contentWC);
				infowindow3.open(map, C_W[m]);
			}
			
		}
	}

}

function drawMap(map)
{
	
	tico = "assets/t_icon.png";
		
	pt = new google.maps.LatLng(42.395428, -71.142483);
	markers.push(new google.maps.Marker({position: pt, title: "Alewife Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.39674, -71.121815);
	markers.push(new google.maps.Marker({position: pt, title: "Davis Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.3884, -71.119149);
	markers.push(new google.maps.Marker({position: pt, title: "Porter Square Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.373362, -71.118956);
	markers.push(new google.maps.Marker({position: pt, title: "Harvard Square Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.365486, -71.103802);
	markers.push(new google.maps.Marker({position: pt, title: "Central Square Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.36249079, -71.08617653);
	markers.push(new google.maps.Marker({position: pt, title: "Kendall/MIT Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.361166, -71.070628);
	markers.push(new google.maps.Marker({position: pt, title: "Charles/MGH Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.35639457, -71.0624242);
	markers.push(new google.maps.Marker({position: pt, title: "Park St. Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.355518, -71.060225);
	markers.push(new google.maps.Marker({position: pt, title: "Downtown Crossing Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.352271, -71.055242);
	markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.342622, -71.056967);
	markers.push(new google.maps.Marker({position: pt, title: "Broadway Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.330154, -71.057655);
	markers.push(new google.maps.Marker({position: pt, title: "Andrew Station", icon: tico}));
		redStations.push(pt);
	pt = new google.maps.LatLng(42.320685, -71.052391);
	markers.push(new google.maps.Marker({position: pt, title: "JFK/UMass Station", icon: tico}));
		redStations.push(pt);
		redBranchAshmont.push(pt);
		redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.31129, -71.053331);
	markers.push(new google.maps.Marker({position: pt, title: "Savin Hill Station", icon: tico}));
		redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.275275, -71.029583);
	markers.push(new google.maps.Marker({position: pt, title: "North Quincy Station", icon: tico}));
		redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.2665139, -71.0203369);
	markers.push(new google.maps.Marker({position: pt, title: "Wollaston Station", icon: tico}));
		redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.300093, -71.061667);
	markers.push(new google.maps.Marker({position: pt, title: "Fields Corner Station", icon: tico}));
		redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.251809, -71.005409);
	markers.push(new google.maps.Marker({position: pt, title: "Quincy Center Station", icon: tico}));
		redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.29312583, -71.06573796);
	markers.push(new google.maps.Marker({position: pt, title: "Shawmut Station", icon: tico}));
		redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.233391, -71.007153);
	markers.push(new google.maps.Marker({position: pt, title: "Quincy Adams Station", icon: tico}));
		redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.284652, -71.064489);
	markers.push(new google.maps.Marker({position: pt, title: "Ashmont Station", icon: tico}));
		redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.2078543, -71.0011385);
	markers.push(new google.maps.Marker({position: pt, title: "Braintree Station", icon: tico}));
		redBranchBraintree.push(pt);
		
		for (var m in markers) {
			markers[m].setMap(map);
			addListener(m);		
			}

	// Render polylines (Red)
	redLine = new google.maps.Polyline({
		path: redStations,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 10
	});
	redLine.setMap(map);
	redLineAshmont = new google.maps.Polyline({
		path: redBranchAshmont,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 10
	});
	redLineAshmont.setMap(map);
	redLineBraintree = new google.maps.Polyline({
		path: redBranchBraintree,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 10
	});
	redLineBraintree.setMap(map);
	getMyLocation();
}
	
function getMyLocation() 
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			userLat = position.coords.latitude;
			userLng = position.coords.longitude;
			find_closest_marker(userLat, userLng);
			renderMap();
		});
	} else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap() 
{
	user = new google.maps.LatLng(userLat, userLng);
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
}

function createMarker(place) 
{
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

function rad(x) {
		return x*Math.PI/180;
}
	
function find_closest_marker(userLat, userLng) 
{
	var lat = userLat;
	var lng = userLng;
	console.log(userLat);
	console.log(userLng);
	var R = 6371; // radius of earth in km
	var distances = [];
	var closest = -1;
	for( i=0;i<markers.length; i++ ) {
		var mlat = markers[i].position.lat();
		var mlng = markers[i].position.lng();
		var dLat  = rad(mlat - lat);
		var dLong = rad(mlng - lng);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		distances[i] = d;
		if ( closest == -1 || d < distances[closest] ) {
			closest = i;
		}
	}
	try {
		realTime.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	} catch (error) {}
	// Execute the request
	realTime.send(null);
	// Handle the request (however you want)
	realTime.onreadystatechange = function() 
	{
		if(realTime.readyState == 4 && realTime.status == 200)
		{
			content = "CLOSEST STATION: " + markers[closest].title;
			results = JSON.parse(realTime.responseText);
			if (results.length > 0) {
			content += '<table id="schedule"><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Arrival Time</th></tr>';
			for(i in results){
				content += '<tr><td>' + results[i].Line + '</td><td>' + results[i].Trip + '</td><td>';
				if(results[i].PlatformKey.charAt(4) == 'S'){
					content += 'South';
				} else {
					content += 'North';
				}
				content += '</td><td>' + results[i].Time + '</td></tr>';
			}
			content += '</table>';
			} else {
				content += "<p>No schedule of upcoming trains for this station.</p>";
			}
			infowindow.setContent('<div id="infowindow">' + content + '</div>');	
		}
	}
	infowindow.open(map, markers[closest]);
}


function find_waldo(wcLat, wcLong) 
{
	var lat = user.ib;
	var lng = user.jb;
	var R = 6371; // radius of earth in km
	var distances;
	var closest = -1;
	var mlat = wcLat;
	var mlng = wcLong;
	var dLat  = rad(mlat - lat);
	var dLong = rad(mlng - lng);
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	distances = d;
	return distances;
}

