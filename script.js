(function() {
    var nextUrl;
    $("#submit-button").on("click", function() {
        var userInput = $("input[name='user-input']").val();
        var albumOrArtist = $("select").val();

        $.ajax({
            url: "https://elegant-croissant.glitch.me/spotify",
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response) {
                console.log("response from spotify :", response);

                // console.log(link);
                //left to right -> response.artist gets checked if true, if not that response.albums
                //data is put into var response
                response = response.artists || response.albums;

                var html = "";
                for (var i = 0; i < response.items.length; i++) {
                    var link = response.items[i].external_urls.spotify;
                    var imageUrl = "img/placeholder.png";
                    if (response.items[i].images[0]) {
                        imageUrl = response.items[i].images[0].url;
                    }
                    html +=
                        "<div id='div-container'><a href ='" +
                        link +
                        "'>" +
                        "<div id='text'>" +
                        response.items[i].name +
                        "</div></a>" +
                        "<a href ='" +
                        link +
                        "'>" +
                        "<img src='" +
                        imageUrl +
                        "'>" +
                        "</div></a>";
                }
                $("#results-container").html(html);

                nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );

                function moreButton() {
                    $("#more-button").addClass("on");
                }

                if (response.next) {
                    //infinite scroll, if not -1 -> true
                    if (location.search.indexOf("scroll=infinite") > -1) {
                        // do infinite scroll
                        infiniteCheck();
                    } else {
                        moreButton();
                    }
                }
            }
        });
        $("#more-button").on("click", function() {
            $.ajax({
                url: nextUrl,
                method: "GET",
                success: function(response) {
                    console.log("response from spotify :", response);

                    response = response.artists || response.albums;

                    var html = "";
                    for (var i = 0; i < response.items.length; i++) {
                        var link = response.items[i].external_urls.spotify;
                        var imageUrl = "img/placeholder.png";
                        if (response.items[i].images[0]) {
                            imageUrl = response.items[i].images[0].url;
                        }
                        html +=
                            "<div id='div-container'><a href ='" +
                            link +
                            "'>" +
                            "<div id='text'>" +
                            response.items[i].name +
                            "</div></a>" +
                            "<a href ='" +
                            link +
                            "'>" +
                            "<img src='" +
                            imageUrl +
                            "'>" +
                            "</div></a>";
                    }
                    $("#results-container").append(html);

                    nextUrl =
                        response.next &&
                        response.next.replace(
                            "api.spotify.com/v1/search",
                            "elegant-croissant.glitch.me/spotify"
                        );

                    function moreButton() {
                        $("#more-button").addClass("on");
                    }
                    if (response.next) {
                        moreButton();
                    }
                    if (response.total - response.offset < 20) {
                        $("#more-button").removeClass("on");
                    }
                }
            });
        });
    });

    //infinite scroll

    function infiniteCheck() {
        var hasReachedBottom =
            $(window).height() + $(document).scrollTop() >=
            $(document).height() - 400;
        if (hasReachedBottom) {
            $.ajax({
                url: nextUrl,
                method: "GET",
                success: function(response) {
                    console.log("response from spotify :", response);

                    response = response.artists || response.albums;

                    var html = "";
                    for (var i = 0; i < response.items.length; i++) {
                        var link = response.items[i].external_urls.spotify;
                        var imageUrl = "img/placeholder.png";
                        if (response.items[i].images[0]) {
                            imageUrl = response.items[i].images[0].url;
                        }
                        html +=
                            "<div id='div-container'><a href ='" +
                            link +
                            "'>" +
                            "<div id='text'>" +
                            response.items[i].name +
                            "</div></a>" +
                            "<a href ='" +
                            link +
                            "'>" +
                            "<img src='" +
                            imageUrl +
                            "'>" +
                            "</div></a>";
                    }
                    $("#results-container").append(html);

                    nextUrl =
                        response.next &&
                        response.next.replace(
                            "api.spotify.com/v1/search",
                            "elegant-croissant.glitch.me/spotify"
                        );
                }
            });
        } else {
            setTimeout(infiniteCheck, 500);
        }
    }
})();
