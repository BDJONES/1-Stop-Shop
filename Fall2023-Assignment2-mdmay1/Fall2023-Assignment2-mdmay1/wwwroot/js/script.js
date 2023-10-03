function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': 'bba7dc9a06184654b915fd8f791407d6'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog({
                width: $(window).width(),
                height: $(window).height(),
            });
        })
        .fail(function () {
            alert('error');
        });
}

function search() {
    apiSearch()
}

function changeBackground(color) {
    $("#searchResults").css("background-color", color);
    //alert("Background color = " + $('searchResults').css("background-color"));
}

function getTime() {
    let today = new Date();
    if (today.getHours() == 12 || today.getHours() == 0) {
        var hour = 12;
    } else {
        hour = today.getHours() % 12;
    }
    if (today.getMinutes() < 10) {
        var minute = "0" + today.getMinutes();
    } else {
        var minute = today.getMinutes();
    }
    let time = hour + ":" + minute
    //console.log(time)
    $('#time').html("Current Time: " + time);
    $('#time').dialog(
        {
        width: 200,
        height: 150,
        resizable: true
    })
}

function changeBackgroundImage(url) {

    $("body").css("background-image", url)
}

$("#search-button").click(function () {
    //console.log("search button clicked");
    $("#searchResults").css("visibility", "visible");
    search();
    changeBackground("white");
});

$("#time-button").click(function () {
    //console.log("here");
    $("#time").css("visibility", "visible");
    getTime();
});
var url = "url(../Photos/Background2.jpg)"
$("#website-name").click(function () {
    changeBackgroundImage(url);
    url = (url == "url(../Photos/Background2.jpg)") ? "url(../Photos/Background1.jpg)" : "url(../Photos/Background2.jpg)";
});



$("#searchResults").on("dialogclose", function () {
    $("#searchResults").css("visibility", "hidden");
});

$("#time").on("dialogclose", function () {
    $("#time").css("visibility", "hidden");
});