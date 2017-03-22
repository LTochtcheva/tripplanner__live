// var db = require('../../models/_db.js')
// var Hotels = require('../../models/hotel.js')
$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords, name) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
    hashOfMarker[name] = marker
  }

  var hashOfMarker = {}
  var days = {1:[[],[],[]]}
  var currentDay = 1; 

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);
  
  // Adding names to the list 
  hotels.forEach(function(element){
    $('#hotel-choices').append('<option>'+element.name+'</option>')
  })

  restaurants.forEach(function(element) {
    $('#restaurant-choices').append('<option>'+element.name+'</option>')
  })

  activities.forEach(function(element) {
    $('#activity-choices').append('<option>'+element.name+'</option>')
  })

  //Adding to the list 
  $('#options-panel div:nth-child(1)').on('click', 'button', function() {
    var hotelName = $('#hotel-choices option:selected').text()
    for(var i = 0; i < hotels.length; i ++) {
      if(hotels[i].name === hotelName) {
        drawMarker('hotel', hotels[i].place.location, hotelName);
        $("h4:contains('My Hotel') + >" ).append(`<span class="title">${hotelName}</span>
          <button class="btn btn-xs btn-danger remove btn-circle">x</button>`)
        days[currentDay][0].push(hotels[i])
        
      }
    }
  })
  
  $('#options-panel div:nth-child(2)').on('click', 'button', function() {
    var restaurantsName = $('#restaurant-choices option:selected').text()
     for(var i = 0; i < restaurants.length; i ++) {
      if(restaurants[i].name === restaurantsName) {
        drawMarker('restaurant', restaurants[i].place.location, restaurantsName);
        $("h4:contains('My Restaurants') + >" ).append(`<span class="title">${restaurantsName}</span>
          <button class="btn btn-xs btn-danger remove btn-circle">x</button>`)
          days[currentDay][1].push(restaurants[i])       
      }
    }   
  })
  $('#options-panel div:nth-child(3)').on('click', 'button', function() {
    var activityName = $('#activity-choices option:selected').text()
     for(var i = 0; i < activities.length; i ++) {
      if(activities[i].name === activityName) {
        drawMarker('activity', activities[i].place.location, activityName);
        $("h4:contains('My Activities') + >" ).append(`<span class="title">${activityName}</span>
          <button class="btn btn-xs btn-danger remove btn-circle">x</button>`)  
        days[currentDay][2].push(activities[i])
      }
    }

  }) 

  //Removing from the list 
  $('#itinerary').on('click', '.remove', function() {
    var upperSibling = $(this).prev();
    upperSibling.remove();
    $(this).remove();
    (hashOfMarker[upperSibling.text()]).setMap(null)
    
  })

  //Adding A Date 
  $('.day-buttons').on('click', '#day-add', function(){
    var prevValue = parseInt($(this).prev().text())
    $(this).before(`<button class="btn btn-circle day-btn">${prevValue + 1}</button>`)
    days[prevValue + 1] = [[],[],[]];
    ///console.log(days)
  })

  //Current Date
  $('.day-buttons').on('click', '.day-btn', function() {
    if($(this).text() != '+') {
      $('.current-day').removeClass('current-day')
      $(this).addClass('current-day');
      $('#day-title span:nth-child(1)').text(`Day `+ $(this).text())
      currentDay = $('.current-day').text()
      console.log(days)
    }
  })

});





