## Memoization

+ 이전의 계산 결과를 기억하는 기능을 갖춘 함수
+ 이전에 연산된 값을 요청할 때 성능이 향상된다.
+ 단, 유형에 상관없이 캐싱을 하게 되면 메모리 사용량이 늘어난다!

```js
getNumber = (function () {
    var memo = []; //캐시에 저장될 배열
    return function f(num) {
        console.log("detect>>" + num)
        if (memo.indexOf(num) !== -1) { //캐시에 저장된 값을 확인한다.
            console.log("cached>>" + num); //저장된 값이 있으면 cashed!
            return ture;
        } else { //저장된 값이 없다면 캐시 배열에 저장 
            console.log("newNumber>> push it!");
            memo.push(num); 
            return false;
        }
    }
});

var chkNumber = getNumber();
chkNumber(1);
chkNumber(2);
chkNumber(3);
chkNumber(3);
chkNumber(2);
chkNumber(4);
```