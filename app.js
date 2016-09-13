var animals = ['Cat', 'Dog', 'Lama', 'Hampster'];

$(document).on('click','.animal', function() { 
	var animal = $(this).data("name"); 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
					animal + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: queryURL, method: 'GET'})	 
	 		.done(function(response) {
	 			var str = JSON.stringify(response, undefined, 2);
	 			$('#animalPictures').empty(); 	
	 			for(var i=0;i<response.data.length;i++) {
            		var data = response.data[i];
            		var figure = $('<figure>');
  					var figCap = $('<figcaption>').text("Rating: " + data.rating);
					var image = $('<img>').attr("src", data.images.original_still.url)
										  .addClass("img-rounded picture")
										  .attr("width",200).attr("height",200)
			    						  .attr('data-state', 'still');					  
			    	image.attr('data-animate', data.images.original.url);
			    	image.attr('data-still', data.images.original_still.url);
                	figure.append(image).append(figCap);
					$('#animalPictures').append(figure);
            	}	
	 			
	 	});
});
	

// ========================================================
// This function handles events where one button is clicked
$('#addAnimal').on('click', function() {
	var name = $("#animal-input").val().trim().toLowerCase();
	var animal = name.charAt(0).toUpperCase()+name.slice(1);
	var notFound = $.inArray(animal, animals) == -1;
	if(animal != "" && notFound ) { 
		animals.push(animal);
		renderButtons();
	}	
	$("#animal-input").val("");
	return false;
})

$(document).on('click','.picture', function() {
    var state = $(this).attr('data-state');
    if( state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

// ========================================================
// This calls the renderButtons() function
function renderButtons() {
	$('#animalButtons').empty();
	for(var i = 0; i < animals.length; i++) {
		var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	    a.addClass('animal btn btn-primary'); // Added a class 
		a.attr('data-name', animals[i]); // Added a data-attribute
		a.text(animals[i]); // Provided the initial button text
		$('#animalButtons').append(a); // Added the button to the HTML
	}
}

$(document).ready(function() {
	renderButtons();	
});

