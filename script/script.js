$(document).ready(() => {
    var apiKey = "";
    var isCelsius = true;

    $("#submitBtn").click(() => {
        place = $("#locationId").val();
        var count = 0;

        //tell api url how much spaces are in the location
        spaces = place.split("");
        for (var i = 0; i < spaces.length; i++) {
            if (spaces[i] == ' ') {
                count++;
            }
        }

        //tell api url how much words are in the location
        words = place.split(" ")
        console.log(words.length);
        console.log(words[0]);
        console.log("Count: " + count);

        getWeather(words, count);
    })

    function getWeather(place, count) {
        URL = '';
        if (count == 1) {
            URL = "https://weatherapi-com.p.rapidapi.com/current.json?q=" + "%20" + place[0] + "%20" + place[1];
        }
        else if (count == 2) {
            URL = "https://weatherapi-com.p.rapidapi.com/current.json?q=" + "%20" + place[0] + "%20" + place[1] + "%20" + place[2];
        }
        else {
            URL = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + place;
        }
        console.clear();
        const settings = {
            async: true,
            crossDomain: true,

            url: URL,
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(response.location.region)
            $("#weatherLocation").html("Weather for: " + response.location.name + " " + response.location.region + ", " + response.location.country)
            $("#temp").html("Tempreature: " + response.current.temp_c + "°C");
            $("#feelsLike").html("Feels like: " + response.current.feelslike_c + "°C");

            $("#message").html("Not the location you're looking for? Try using the coutry name instead!");
            $("#message").css('color', 'red');
            $("#clear").show();

            $("#change").html("Change to °F");
            $("#change").show();

            $("#change").click((event) => {
                event.preventDefault();

                if (isCelsius) {
                    $("#change").html("Change to °C");
                    $("#temp").html("Tempreature: " + response.current.temp_f + "°F");
                    $("#feelsLike").html("Feels like: " + response.current.feelslike_f + "°F");
                    isCelsius = false;
                }
                else {
                    $("#change").html("Change to °F");
                    $("#temp").html("Tempreature: " + response.current.temp_c + "°C");
                    $("#feelsLike").html("Feels like: " + response.current.feelslike_c + "°C");
                    isCelsius = true;
                }
            })

            $("#change").show();
            $("#locationId").prop('disabled', true);
            $("#submitBtn").prop('disabled', true);
        });
    }
})