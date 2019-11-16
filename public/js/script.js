$( ".ghost-button" ).click(function() {
    var city = $(".ghost-input").val();
    
    if(city == ""){
        $(".weather").html("Please enter a city and try again");
        return;
    }

    let url = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+$(this).data("api");
    $.ajax({
        url: url,
        success: function(result){
            $(".weather").html("It's " + result.main.temp + " degrees in " + result.name + "!<br />Cloud coverage is "+ result.clouds.all + "%");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".weather").html("We could not find weather for " + city);
        }
    });
});