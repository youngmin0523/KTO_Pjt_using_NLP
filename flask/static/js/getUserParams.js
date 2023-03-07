function getUserParams(){
    var temp_dosi = document.getElementById('type__paldo')
    var temp_type = document.getElementById('type__people')
    var temp_accommodation = document.getElementById('type__accommodation')

    var params={
        dosi:temp_dosi.options[temp_dosi.selectedIndex].value,
        type:temp_type.options[temp_type.selectedIndex].value,
        accommodation:temp_accommodation.options[temp_accommodation.selectedIndex].value,
        value: [],
    }
    const query = 'input[id="value_"]:checked';
    const selectedEls = 
        document.querySelectorAll(query);
    
        selectedEls.forEach((el) => {
        params.value.push(el.value);
    });

    if(params.dosi=='지역 선택'){
        alert("지역을 선택해 주세요.");
    }
    else if(params.accommodation=='숙박 선택'){
        alert("숙박을 선택해 주세요.");
    }
    else if(params.type=='동반유형 선택'){
        alert("동반유형을 선택해 주세요.");
    }
    else if(params.value == ''){
        alert("가치를 선택해 주세요.");
    }
    else if(params.value.length > 2){
        alert("제일 중요하다고 생각하는 두 개의 가치만 선택해 주세요.");
    }
    else{
        
          url = "dosi="+params.dosi+"&accommodation="+params.accommodation+"&type="+params.type+"&value="+params.value
          location.href ="./result?"+url

    }
}