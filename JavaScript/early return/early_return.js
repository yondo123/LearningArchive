//apple, banana, melon
var fruitObject = {
    'name' : 'apple',
    'price': 1200
};

//일반 if
function getPriceStatus(fruitsInfo){
    var priceStatus = "";
    if(fruitsInfo.name == 'apple'){ //apple
        if(fruitsInfo.price > 1000){
            priceStatus = "bad";
        }else{
            priceStatus = "good";
        }
    }else if(fruitsInfo.name == 'banana'){  //banana
        if(fruitsInfo.price > 2000){
            priceStatus = "bad";
        }else{
            priceStatus = "good";
        }
    }else{  //melon
        if(fruitsInfo.price > 3000){
            priceStatus = "bad";
        }else{
            priceStatus = "good";
        }
    }
    return console.log(priceStatus);
};

//그래.. 봐줄만 해 ! 하지만 매개변수까지 체크하는 로직을 넣었다면....??
function getPriceStatus_2(fruitsInfo) {
    if(typeof arguments[0]!='object'){
        return false;
    }else{
        if(fruitsInfo.name == 'apple'){ //apple
            if(fruitsInfo.price > 1000){
                priceStatus = "bad";
            }else{
                priceStatus = "good";
            }
        }else if(fruitsInfo.name == 'banana'){  //banana
            if(fruitsInfo.price > 2000){
                priceStatus = "bad";
            }else{
                priceStatus = "good";
            }
        }else{  //melon
            if(fruitsInfo.price > 3000){
                priceStatus = "bad";
            }else{
                priceStatus = "good";
            }
        }
        return console.log(priceStatus);
    }
}

function getPriceStatus_3(fruitsInfo){
    if(typeof arguments[0]!='object'){
       return false;
    }
    if(fruitsInfo.name == 'apple' && fruitsInfo.price > 1000){
        return console.log("bad");
    }
    if(fruitsInfo.name == 'banana' && fruitsInfo.price > 2000){
        return console.log("bad");
    }
    if(fruitsInfo.name == 'melon' && fruitsInfo.price > 3000){
        return console.log("bad");
    }
    return console.log("good");
}

//이제 early Return 패턴을 이용해서 줄여보자~~@!!!
getPriceStatus(fruitObject);
getPriceStatus_3(fruitObject);