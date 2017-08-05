$(function(){
  populateButtons(searchArray,'searchButton','#buttonsArea')
  console.log("Page Loaded");
})

var searchArray = ['Leslie Knope', 'Ron Swanson', 'Tom Haverford'];

function populateButtons(searchArray,classToAdd,areaToAddTo){
  $(areaToAddTo).empty();
  for(var i=0;i<searchArray.length;i++){
    var a = $('<button>');
    a.addClass(classToAdd);
    a.attr('value',searchArray[i]);
    a.text(searchArray[i]);
    $("#buttonsArea").append(a);
  }
}

$(document).on('click','.searchButton',function(){
  var type = $(this).val();
  console.log(type)
  $("#searches").empty();
  var apiKey = '&api_key=dc6zaTOxFJmzC&limit=10';
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&rating=pg-13&' + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).done(function(response) {
    //console.log(response);
    for(var i = 0; i < response.data.length; i++){
      var searchDiv = $('<div class="search-item">');
      var rating = response.data[i].rating;
      var p = $('<p>').text('Rating: ' + rating);
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;
      var image = $('<img>');
      image.attr('src', still);
      image.attr('data-still',still);
      image.attr('data-animated', animated)
      image.attr('data-state', 'still');
      image.addClass('searchImage');
      searchDiv.append(p);
      searchDiv.append(image);
      $("#searches").append(searchDiv);

    }
  })
})

$(document).on('click','.searchImage',function(){
  var state = $(this).attr('data-state');
  if (state == 'still'){
    $(this).attr('src',$(this).data('animated'));
    $(this).attr('data-state','animated');
  } else {
    $(this).attr('src',$(this).data('still'));
    $(this).attr('data-state','still');
  }
})

$('#addSearch').on('click',function(event){
  //event.preventDefault();
  var newSearch = $('input').eq(0).val().trim().toLowerCase();
  searchArray.push(newSearch);
  populateButtons(searchArray,'searchButton','#buttonsArea');
  return false;
})
