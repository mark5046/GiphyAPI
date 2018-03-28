
// Initial breed array
var topics = ["French Bulldog", "Cavalier King Charles Spaniel", "Weimaraner", "English Pointer"]

 
// I think this function is where my problem is, but I can't find it

//This function should generate gifs when created breed buttons are clicked

// $("#button").on("click", function() {
   function displayBreedInfo() { 

       $("#gifs").empty();
   
       var breed = $(this).attr("breed-data");
   //     console.log(breed)  DOESN'T WORK



     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       breed + "&api_key=wcTUD90tYI9W7S0L4rQY53e4UHLO7XVJ";

     $.ajax({
       url: queryURL,
       method: "GET"
     })
     .then(function(response) {
         var results = response.data;

         for (var i = 0; i < results.length; i++) {

           console.log(response)

             var gifDiv = $("<div class='dog'>");

             var rating = results[i].rating;

             var p = $("<p>").text("Rating: " + rating);

             var dogImage = $("<img>");
             dogImage.attr("src", results[i].images.fixed_height_still.url);
             dogImage.attr("data-still", results[i].images.fixed_height_still.url);
             dogImage.attr('data-animate', results[i].images.fixed_height.url);
             dogImage.attr('data-state', 'still');
             dogImage.addClass('dogImage');

             gifDiv.prepend(p);
             gifDiv.prepend(dogImage);

             $("#giphs").prepend(gifDiv);
         } // ^^^^^^^

       $(".dogImage").on("click", function() {
           var state = $(this).attr("data-state");
           console.log("This is the state of the gif " + state);

           if (state === "still") {
               $(this).attr("src", $(this).data("animate"));
               $(this).attr("data-state", "animate");
           }
           else {
               $(this).attr("src", $(this).data("still"));
               $(this).attr("data-state", "still");
           }
       })


       
     })
   };//)



   function renderButtons(){ //

       $("#giphBtns").empty();

       for (var i = 0; i < topics.length; i++) {
           var breedBtn = $("<button>");
           breedBtn.addClass("btn btn-success")  //?
           breedBtn.addClass("btn btn-primary btn-lg");
           breedBtn.attr("breed-data", topics[i]);
           breedBtn.text(topics[i]);
           $("#giphBtns").append(breedBtn)

       }
   }


//This function generates breed buttons when a breed is entered into the "Search Dog Breed" bar and "Add Breed" button is clicked
$("#srchBreedBtn").on("click", function(event) {
   event.preventDefault();

   var newBreed = $("#dogBreed").val().trim();
   console.log(newBreed);

   if (newBreed === "") {
       return;
   }

   topics.push(newBreed);

   renderButtons();

   return false;
});

$(document).on("click", ".newBreed", displayBreedInfo);

renderButtons()