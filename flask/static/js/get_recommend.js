function get_recommend(address) {
    $.ajax({
        url: "/recommend",
        data: { address: address },
        method: "GET",
        dataType: "json"
    })
    .done(function(json) {
        $("#firstCardAddress").html(json[0].address);
        $("#firstCardInfo").html(json[0].info);
        $("#firstCardTitle").html(json[0].name);
        $("#firstCardUrl").attr("href",json[0].url);
        $("#firstCardImg").css('background-image', 'url(' + json[0].src + ')');

        $("#SecondCardAddress").html(json[1].address);
        $("#SecondCardInfo").html(json[1].info);
        $("#SecondCardTitle").html(json[1].name);
        $("#SecondCardUrl").attr("href",json[1].url);
        $("#SecondCardImg").css('background-image', 'url(' + json[1].src + ')');
        
        $("#thirdCardAddress").html(json[2].address);
        $("#thirdCardInfo").html(json[2].info);
        $("#thirdCardTitle").html(json[2].name);
        $("#thirdCardUrl").attr("href",json[2].url);
        $("#thirdCardImg").css('background-image', 'url(' + json[2].src + ')');
    })

}