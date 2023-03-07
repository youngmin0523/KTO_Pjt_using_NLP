function GetTourapiImages() {
    // tourapi 관광지 사진 호출
    $.ajax({
    type: "GET",
    url: "http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService/galleryList?ServiceKey=EFoCqYt%2BLkiQlVlyq5YnUJ85Rlw80roqfZCNNS4sMikQ4aL4vFP3kDp7wxo9WD1O17l1SHxG3Wq45XyxMZLLFA%3D%3D&arrange=A&MobileOS=ETC&MobileApp=AppTesting&numOfRows=4355&_type=json",
    data: {},
    success: function (response) {
        let rows = response['response']['body']['items']['item']
        let name = rows[0]["galTitle"]
        let imgurl = rows[0]["galWebImageUrl"]

        $("#img-name").text(name)
        $("#img").attr("src",imgurl);
            
        }
    })
}

function GetDescription () {
    // 품질인증업소 정보 호출 test
    $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/Certified",
    data: {},
    success: function (response) {
        const obj = JSON.parse(response);
        let hotel_name = obj[0]["name"]
        let hotel_addr = obj[0]["address"]
        let hotel_num = obj[0]["phoneNumber"]
        let hotel_url = obj[0]["infoUrl"]

        $("#hotel-name").text(hotel_name)
        $("#hotel-addr").text(hotel_addr);
        $("#hotel-num").text(hotel_num);
        $("#hotel-url").attr("href",hotel_url);
            
        }
    })
}