## Const-let
### const
블록 문맥 내에서 재할당할 수 없는 변수 선언 방식.  
값을 할당할 수 없는 것이지 원래의 값을 바꿀 수 없는 것은 아니다.  
블록 유효범위는 `if` or `for` 처럼 `중괄호{}`로 둘러싸인 범위이다.  

```js
const testArray = [];
for (let i = 0; i < 4; i++) {
    testArray.push('dummy');
}
console.log(testArray);
// ['dummy', 'dummy', 'dummy', 'dummy']
```

### let
기존 `var`과 유사한 점은 변수를 재할당할 수 있는 점  
`var`는 어휘적으로 유효 범위를 따르는 대신, `let`은 블록 유효 범위를 따른다.  
(변수를 선언한 중괄호를 벗어나면 변수에 접근하지 못한다.)


```js
function getPriceOfItems(item) {
    let stack = item.inventory;
    let price = item.price;
    if (item.salePrice) {
        let stack = item.saleInventory; //다른 유효범위
        console.log(stack); //1
        if (stack > 0) {
            preice = item.salePrice;
        }
    }
    if (stack) {
        console.log(stack); //3
        return price;
    }
    return 0;
}
getPriceOfItems({
    price: 3600,
    inventory: 3,
    salePrice: 1800,
    saleInventory: 1
```

### 반복문에서의 유효 범위 충돌 방지
아래 예쩨에서의 의도는 파라미터 숫자 만큼의 반복을 하면서 1초마다 로깅을 해주는 함수이다.  
하지만 예상과 다르게 마지막 값만 계속 출력된다.  
`var`는 블록 유효 범위를 따르기 때문에 함수 내에서 마지막 값을 할당하기에 이런 현상이 나타나는 것이다.
```jsx
function countSec(seconds) {
    for (var i = 1; i <= seconds; i++) {
        setTimeout(function () {
            console.log(i); //3..3..3..
        }, i * 1000); 
    }
};
countSec(3);
```

**클로저를 사용한 해결방법**
클로저를 사용해 해결할 수 있으나 가독성이 조금 떨어지고 복잡하다.
```js
function countSec(seconds) {
    for (var i = 1; i <= seconds; i++) {
        (function (curNum) { //즉시실행함수를 이용해 외부 변수 i를 복사하여 setTimout() 지역 변수로 끌어와 정상적으로 1,2,3 입력된다!
            setTimeout(function () {
                console.log(curNum);
            }, curNum * 1000);
        }(i));
    }
};

countSec(3);
```
**let을 사용한 방법**
`let`을 사용한다면, 블록 유효 범위를 따르므로 해당 블록에서만 유효하다.  
(반복되어 값이 바뀌더라도, 이전에 선언한 함수는 바뀌지 않는다.)
```js
function countSec(seconds) {
    for (let i = 1; i <= seconds; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
};

countSec(3);
```