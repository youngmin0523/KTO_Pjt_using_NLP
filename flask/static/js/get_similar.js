function get_similar(id,address,name){
    $.ajax({
        url: "/similar",
        data: {id:id,address: address,name:name },
        method: "GET",
        dataType: "json"
    })
    .done(function(json) {    
    document.getElementById("similar1-name").innerHTML=json[0].name.split('[')[0];
    document.getElementById("similar1-addr").innerHTML=json[0].address;
    document.getElementById("similar1-num").innerHTML=json[0].phoneNumber;
    $("#similar1-img").attr("src",json[0].src);
    $("#similar1-url").attr("href",json[0].infoUrl);

    // 두번째 유사숙소
    document.getElementById("similar2-name").innerHTML=json[1].name.split('[')[0];
    document.getElementById("similar2-addr").innerHTML=json[1].address;
    document.getElementById("similar2-num").innerHTML=json[1].phoneNumber;
    $("#similar2-img").attr("src",json[1].src);
    $("#similar2-url").attr("href",json[1].infoUrl);
    })
}