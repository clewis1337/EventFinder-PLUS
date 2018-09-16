//YOUTUBE PLAYER
var player; function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390', width: '640', videoId:
      'M7lc1UVf-VE', events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
  });
}
$("#submitButton").on("click", function (e) {
  e.preventDefault();
  let city = $("#input1").val();
  console.log(city);
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=pBf0vPvFVvEYxX2QED6w3nO42LNdzL92&size=5&city=" + city,
    async: true,
    dataType: "json",

    // console.log("This is JSON Data: " + json._embedded.events[4].name);
    // $("#container33").addClass("jojo").append("Musical Artist: " + json._embedded.events[
    //     0].name + "<br>");
    // $("#container33").addClass("jojo").append("<a href = " + json._embedded.events[
    //     0].url + " > Buy Tickets Now </a>");
    // $("#container33").addClass("jojo").append("<img src = " + json._embedded.events[
    //     0].images[0].url + " >")
    //ADD YOUTUBE HERE
  })
    .then(function (json) {
      json._embedded.events.forEach(function (dataEvent) {
        console.log(dataEvent.name);
        $("#container33").addClass("jojo").append("Musical Artist: " + dataEvent.name + "<br>");
        $("#container33").append("<a href = " + dataEvent.url + " > Buy Tickets Now </a>");
        $("#container33").addClass("jojo").append("<img src = " + dataEvent.images[0].url + " >")
        return $.ajax({
          type: "GET",
          url: "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyB6IswVE48qLuJOLNaEPIulzEchVcmO8NY&q=" + dataEvent.name,
          async: true,
          dataType: "json"
        })
          .then(function (youtubeData) {
            console.log("YOUTUBE DATA" + youtubeData.items[0].id.videoId);
            $('.videos').append(`<div><iframe id="player" type="text/html" width="640" height="390"
                          src="https://www.youtube.com/embed/${youtubeData.items[0].id.videoId}"
                          frameborder="0"></iframe></div>`);
            // $("#containter33").append(`<iframe width="420" height="315"
            //                             src="https://www.youtube.com/embed/${youtubeData.items[0].id.videoId}">
            //                           </iframe>`);
          })
        // .then,
        //error: function (xhr, status, err) {
      });
    });
});
function go_get() {
  var base_url = 'http://www.youtube.com/embed?listType=search&list=';
  var search_field = document.getElementById('yourtextfield').value;
  var target_url = base_url + search_field;
  var ifr = document.getElementById('youriframe');
  ifr.src = target_url;
  return false;
}

////////////////Firebase////////////////////

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDWZhfBCgZZE1V7ku-HzFeq4FGTAQbTSH4",
  authDomain: "project2-98988.firebaseapp.com",
  databaseURL: "https://project2-98988.firebaseio.com",
  projectId: "project2-98988",
  storageBucket: "project2-98988.appspot.com",
  messagingSenderId: "909917927215"
};
firebase.initializeApp(config);

let database = firebase.database();

// On click handler for Submit Button for city search
$("#submitButton").on("click", function(event){
  event.preventDefault();
// Grab user input from the search input-textbox

let citySearch = $("#input1").val().trim();

// Create local "temporary" object for holding the city search data
let newCitySearch = {
  city: citySearch,
};

// Uploading city search data to the database
database.ref().push(newCitySearch);

console.log(newCitySearch.city);

// Clear textbox for city search

$("#input1").val('');


});

// Create Firebase event for adding searched city to the database

database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

    // Store everything in a variable

    let citySearch = childSnapshot.val().city;
    console.log(citySearch);


})