var map;
var MarkerArr = [];
var EntireMarker = [];
var FilterdMarker = [];
var SelectedMarker = null
var temp=99;
function Initialization(_map){
    map = _map;
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(map, 'zoom_changed', function() {        

        var level = map.getLevel();
        if (level>13){
            setMarkers(null);
            // DrawPolygon();
        }
        else{            
            setMarkers(map)
        }
    });
}

function filterBtn(option){
    FilterdMarker=[]
    if(option == 0){
        FilterdMarker = EntireMarker;
    }
    else if(option == 1){
        
        EntireMarker.map((MakerArr)=>{
            if(MakerArr.Fb === "한옥"){
              FilterdMarker.push(MakerArr)
            }
          })
    }
    else if(option ==2){
        EntireMarker.map((MakerArr)=>{
            if(MakerArr.Fb === "호텔"){
              FilterdMarker.push(MakerArr)
            }
          })
    }
    else{
        EntireMarker.map((MakerArr)=>{
            if(MakerArr.Fb === "민박"){
              FilterdMarker.push(MakerArr)
            }
          })
    }
    MarkerArr = FilterdMarker
    setfilteredMarkers(map)
}

function setfilteredMarkers(map) {
    for (var i = 0; i < EntireMarker.length; i++) {
        EntireMarker[i].setMap(null);
    }   
    for (var i = 0; i < FilterdMarker.length; i++) {
        FilterdMarker[i].setMap(map);
    }  
            
}
function setMarkers(map) {
    for (var i = 0; i < MarkerArr.length; i++) {
        MarkerArr[i].setMap(map);
    }
}
function DrawPolygon(){
    
    $.getJSON("../../data/sido.json", function(geojson){
        var data = geojson.features;
        var name = '';
        var code = '';
        $.each(data, function(index, val){
            name = val.properties.SIG_KOR_NM;
            code = val.properties.SIG_CD;

            if(val.geometry.type == "MultiPolygon")
            {
                displayArea(name, code, val.geometry.coordinates, true);
            }
            else{
                displayArea(name, code, val.geometry.coordinates, false);
            }
        });
    });
}

function makePolygon(coordinates){
    var polygonPath = [];
    
   
    $.each(coordinates[0], function(index, coordinate){
        polygonPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
    });
    return new kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight:1,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        strokeStyle: 'longdash',
        fillColor: '#A2FF99',
        fillOpacity:0.2
        
    });
}

function makeMultiPolygon(coordinates){
    var polygonPath = [];
    $.each(coordinates, function(index, val2){
        var coordinates2 = [];

        $.each(val2[0], function(index2, coordinate){
            coordinates2.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });
        
        polygonPath.push(coordinates2);
    });

    return new kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight:1,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        strokeStyle: 'longdash',
        fillColor: '#A2FF99',
        fillOpacity:0.2
    });
}

function displayArea(name, code, coordinates, multi){
    var polygon;
    if(multi){
        polygon = makeMultiPolygon(coordinates);
    }
    else{
        polygon = makePolygon(coordinates);
    }
    polygon.setMap(map);
}

function displayMarker(){
    var activeId = null;
    var timeoutId = null;
    
    var Hanokicon = new kakao.maps.MarkerImage(
        "https://raw.githubusercontent.com/Jihun0224/KTO/master/flask/static/infopage_img/hanok.svg?token=AOHIQEE5PRA2OYADIYRXCK3BHXGXI",
        new kakao.maps.Size(31, 35),
        {
            offset: new kakao.maps.Point(16, 34),
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
      var Hotelicon = new kakao.maps.MarkerImage(
        "https://raw.githubusercontent.com/Jihun0224/KTO/master/flask/static/infopage_img/hotel.svg?token=AOHIQEDUY2JUHP7DUXI2YK3BHXGYO",
        new kakao.maps.Size(31, 35),
        {
            offset: new kakao.maps.Point(16, 34),
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
      var BBicon = new kakao.maps.MarkerImage(
        "https://raw.githubusercontent.com/Jihun0224/KTO/master/flask/static/infopage_img/bb.svg?token=AOHIQED7C3B5OBX6VLYTK2LBHXGUQ",
        new kakao.maps.Size(31, 35),
        {
            offset: new kakao.maps.Point(16, 34),
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
      var Hanokicon_sel = new kakao.maps.MarkerImage(
        "https://raw.githubusercontent.com/Jihun0224/KTO/master/flask/static/infopage_img/hanok_select.png?token=AOHIQEFNF7EAADEZNTWL6WLBHXHCC",
        new kakao.maps.Size(41, 45),
        {
            offset: new kakao.maps.Point(16, 34),
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
      var Hotelicon_sel = new kakao.maps.MarkerImage(
        "https://github.com/Jihun0224/KTO/blob/master/flask/static/infopage_img/hotel_select.png?raw=true",
        new kakao.maps.Size(41, 45),
        {
            offset: new kakao.maps.Point(16, 34),
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
      var BBicon_sel = new kakao.maps.MarkerImage(
        "https://github.com/Jihun0224/KTO/blob/master/flask/static/infopage_img/bb_select.png?raw=true",
        new kakao.maps.Size(41, 45),
        {
            offset: new kakao.maps.Point(16, 34),
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
      var alg = new kakao.maps.MarkerImage(
        "https://github.com/Jihun0224/KTO/blob/master/flask/static/infopage_img/alg.png?raw=true",
        new kakao.maps.Size(41, 45),
        {
            offset: new kakao.maps.Point(16, 34),
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
    fetch("/Certified")
    .then(response => response.json())  
    .then(json => {
        $.each(json, function(index,place){
            var id = place.id;
            
            var position = new kakao.maps.LatLng(place.y,  place.x)
            var name = place.name.split('[')[0].trim()
            var address = place.address
            var phoneNumber = place.phoneNumber
            var infoUrl = place.infoUrl
            var summary = place.summary
            var info = place.info
            var help = place.help
            var imgSrc = place.src

            var Data = $('#my-data').data();
            Data = Data.other.replaceAll('\'','\"')
            Data = JSON.parse(Data)
            //초기 위치(디폴트값)
            var defaultPosition = new kakao.maps.LatLng(Data.y, Data.x);
            // 지도 중심을 이동 시킵니다
            map.setCenter(defaultPosition);

            

            var marker = new kakao.maps.Marker({
                map: map,
                position: position,
                title:
                id == 1?"한옥":
                id == 2?"호텔":
                "민박",
                image:
                //디폴트
                place.y == Data.y?alg:
                id == 1?Hanokicon:
                id == 2?Hotelicon:
                BBicon
            })
            // 클릭 이벤트
            kakao.maps.event.addListener(marker, 'click', function() {
                document.getElementById("hotel-name").innerHTML=name;
                document.getElementById("hotel-addr").innerHTML=address;
                document.getElementById("hotel-num").innerHTML=phoneNumber;
                $("#hotel-url").attr("href",infoUrl);
                document.getElementById("hotel-summary").innerHTML=summary;
                document.getElementById("hotel-info").innerHTML=info;
                $("#hotel-img").attr("src",imgSrc);
                placeAddress = place.address.split(" ")[0]+" "+place.address.split(" ")[1]
                get_recommend(placeAddress)
                url = "https://fluffyword.s3.ap-northeast-2.amazonaws.com/숙소별+리뷰+워드클라우드/"+name.trimRight()+".jpg"
                $("#wordcloudSrc").attr("src", url);
                get_similar(place.id, place.address.split(" ")[0], name)
                get_score(name)
                // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 클릭 이미지로 변경합니다
                if(id==1)
                {
                    marker.setImage(Hanokicon_sel)

                    if (SelectedMarker!=null){
                        if(temp==1){
                            SelectedMarker.setImage(Hanokicon)
                        }
                        if(temp==2){
                            SelectedMarker.setImage(Hotelicon)
                        }
                        if(temp!=1 && temp!=2){
                            SelectedMarker.setImage(BBicon)
                        }
                    }
                    else{
                    }
                }
                if(id==2)
                {
                    marker.setImage(Hotelicon_sel)

                    if (SelectedMarker!=null){
                        if(temp==1){
                            SelectedMarker.setImage(Hanokicon)
                        }
                        if(temp==2){
                            SelectedMarker.setImage(Hotelicon)
                        }
                        if(temp!=1 && temp!=2){
                            SelectedMarker.setImage(BBicon)
                        }
                    }
                    else{
                    }
                }
                if(id!=1 && id!=2)
                {
                    marker.setImage(BBicon_sel)

                    if (SelectedMarker!=null){
                        if(temp==1){
                            SelectedMarker.setImage(Hanokicon)
                        }
                        if(temp==2){
                            SelectedMarker.setImage(Hotelicon)
                        }
                        if(temp!=1 && temp!=2){
                            SelectedMarker.setImage(BBicon)
                        }
                    }
                    else{
                    }
                }

                // 열린 관광 요소(12개)
                if(help.indexOf("장애인 화장실") != -1)
                {
                  $("#b1").attr("src","../static/열린관광이미지/장애인화장실T.png");
                }
                else
                {
                  $("#b1").attr("src","../static/열린관광이미지/장애인화장실F.png");
                }
                
                if(help.indexOf("장애인용 엘리베이터") != -1)
                {
                  $("#b2").attr("src","../static/열린관광이미지/장애인용엘리베이터T.png");
                }
                else
                {
                  $("#b2").attr("src","../static/열린관광이미지/장애인용엘리베이터F.png");
                }

                if(help.indexOf("장애인 전용 주차구역") != -1)
                {
                  $("#b3").attr("src","../static/열린관광이미지/장애인전용주차구역T.png");
                }
                else
                {
                  $("#b3").attr("src","../static/열린관광이미지/장애인전용주차구역F.png");
                }

                if(help.indexOf("주출입구 단차없음") != -1)
                {
                  $("#b4").attr("src","../static/열린관광이미지/주출입구단차없음T.png");
                }
                else
                {
                  $("#b4").attr("src","../static/열린관광이미지/주출입구단차없음F.png");
                }

                if(help.indexOf("지하철 접근가능") != -1)
                {
                  $("#b5").attr("src","../static/열린관광이미지/지하철접근가능T.png");
                }
                else
                {
                  $("#b5").attr("src","../static/열린관광이미지/지하철접근가능F.png");
                }

                if(help.indexOf("저상버스 접근가능") != -1)
                {
                  $("#b6").attr("src","../static/열린관광이미지/저상버스접근가능T.png");
                }
                else
                {
                  $("#b6").attr("src","../static/열린관광이미지/저상버스접근가능F.png");
                }

                if(help.indexOf("휠체어 대여") != -1)
                {
                  $("#b7").attr("src","../static/열린관광이미지/휠체어대여T.png");
                }
                else
                {
                  $("#b7").attr("src","../static/열린관광이미지/휠체어대여F.png");
                }

                if(help.indexOf("시각장애인 편의서비스") != -1)
                {
                  $("#b8").attr("src","../static/열린관광이미지/시각장애인편의서비스T.png");
                }
                else
                {
                  $("#b8").attr("src","../static/열린관광이미지/시각장애인편의서비스F.png");
                }

                if(help.indexOf("청각장애인 편의서비스") != -1)
                {
                  $("#b9").attr("src","../static/열린관광이미지/청각장애인편의서비스T.png");
                }
                else
                {
                  $("#b9").attr("src","../static/열린관광이미지/청각장애인편의서비스F.png");
                }

                if(help.indexOf("수유실") != -1)
                {
                  $("#b10").attr("src","../static/열린관광이미지/수유실T.png");
                }
                else
                {
                  $("#b10").attr("src","../static/열린관광이미지/수유실F.png");
                }

                if(help.indexOf("장애인 객실") != -1)
                {
                  $("#b11").attr("src","../static/열린관광이미지/장애인객실T.png");
                }
                else
                {
                  $("#b11").attr("src","../static/열린관광이미지/장애인객실F.png");
                }

                if(help.indexOf("유모차 대여") != -1)
                {
                  $("#b12").attr("src","../static/열린관광이미지/유모차대여T.png");
                }
                else
                {
                  $("#b12").attr("src","../static/열린관광이미지/유모차대여F.png");
                }

                SelectedMarker = marker
                temp = id
          });
          

            $('head').append('<link rel="stylesheet" href="../static/infopage_css/overlay.css">');
            var contents = 
            '<div class="overlaywrap">' + 
            '    <div class="overlayinfo">' + 
            '        <div class="title">' + name +'</div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="'+ imgSrc+ '"width="73" height="70">' +
            '           </div>' + 
            '            <div class="overlaydesc">' + 
            '                <div class="ellipsis">'+address+'</div>' + 
            '                <div class="jibun ellipsis">'+phoneNumber+'</div>' + 
            '                <div><a href='+ infoUrl +'target="_blank" class="link">상세보기</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
            var content = document.createElement('div');
            content.innerHTML = contents;
            content.style.cssText = 'background-color: white';
            
            marker.setMap(map);
            MarkerArr.push(marker);
            

            var overlay = new kakao.maps.CustomOverlay({
                yAnchor: 2.5,
                content: content,
                position: position
            });
            var mouseOverHandler = function() {
                if (timeoutId !== null && id === activeId) {
                    window.clearTimeout(timeoutId);
                    timeoutId = null;
                    return;
                }
                overlay.setMap(map);
                activeId = id;
            };

            
            var mouseOutHandler = function() {
                timeoutId = window.setTimeout(function() {
                    overlay.setMap(null);
                    activeId = null;
                    timeoutId = null;
                }, 50);
            };
            
            kakao.maps.event.addListener(marker, 'mouseover', mouseOverHandler);
            kakao.maps.event.addListener(marker, 'mouseout', mouseOutHandler);
            content.addEventListener('mouseover', mouseOverHandler);
            content.addEventListener('mouseout', mouseOutHandler);

        })
    })
    EntireMarker = MarkerArr;

}
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
    })
}
function get_similar(id,address,name) {
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