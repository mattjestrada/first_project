$(document).ready(function() {


    console.log('ready');


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD2OzL4WkWQOApj28BMOK7y9Rh3UqsD_EU",
        authDomain: "fitley-b8ddc.firebaseapp.com",
        databaseURL: "https://fitley-b8ddc.firebaseio.com",
        projectId: "fitley-b8ddc",
        storageBucket: "",
        messagingSenderId: "104718403995"
    };
    firebase.initializeApp(config);


    var database = firebase.database();

    var clickCounter = 0;
    // displayMovieInfo function re-renders the HTML to display the appropriate content
    $("#find-movie").on("click", function(event) {
        clickCounter++;
        console.log("click"); // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked5
        event.preventDefault();

        function getBooks(Title) {
            var URL3 = 'https://www.googleapis.com/books/v1/volumes?q=' + Title + '&filter=free-ebooks&maxResults=5&orderBy=newest&key=AIzaSyC4lV8ReN7P80GMDE71choYHgkaSpsnFRQ'
            $.ajax({
                url: URL3,
                method: "GET"
            }).done(function(response) {
                console.log(response);
              //  $("#trailer").text(JSON.stringify(response));
                // Add the books
                $('#books').html('');
                for(var i in response.items) {
                    var book = response.items[i];
                    var bookEl = $('<li>' + book.volumeInfo.title + '</li>').appendTo('#books');
                    bookEl.data('id',book.id);
                    bookEl.click(function(){
                        var id = $(this).data('id');
                        loadBook(id);
                    });
                }
            });
        }
        function loadBook(id) {
            console.log('here');
            var el = $('#viewerCanvas').get(0);
            
             var viewer = new google.books.DefaultViewer(el);

             
            viewer.load(id,function(){
                console.log('Not found');
            });
                
        }

        function showTrailer(imdbID) {
            var URL2 = 'https://api.themoviedb.org/3/movie/' + imdbID + '?api_key=ee0dd258f42467ac19ee289fe351a052&append_to_response=videos';

            $.ajax({
                url: URL2,
                method: "GET"
            }).done(function(response) {
                var newVideo = response.videos.results[0].key
                console.log(newVideo);
                console.log(response);
               // $("#movie-view").text(JSON.stringify(response));
                $("iframe").attr("src", "https://www.youtube.com/embed/" + newVideo + "")
                // insertMovie(response);
            });




            console.log(queryURL);

        }
        // Here we grab the text from the input box
        var movie = $("#current-movie").val();
        var response = response;
        var api_key = 'ee0dd258f42467ac19ee289fe351a052'
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y2010-2017=&plot=short&apikey=40e9cece&append_to_response=videos";

        // Here we construct our URL
        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
        // and display it in the div with an id of movie-view

        //------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.
        function insertMovie(response) {
            var movieData = {
                title: response.Title,
                actors: response.Actors,
                plot: response.Plot,
                poster: response.Poster,
                rating: response.Rated,
            };
            database.ref('/Movies/' + response.imdbID).set(movieData);

        }



        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            //$("#movie-view").text(JSON.stringify(response));
            insertMovie(response);
            showTrailer(response.imdbID);
            getBooks(response.Title);
        });

        // -----------------------------------------------------------------------

    });
    google.books.load();

    function initialize() {

    }














});