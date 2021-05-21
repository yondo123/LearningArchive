## 함수형 프로그래밍
### (1) 함수형 프로그래밍의 특징
+ 불변성 (Immutabillity)
    - 외부에서 변경 가능한 상태를 최대한 `최소화` (순수 함수 지향)
    - 오로지 입력의 값에 영향을 받기 때문에 검증이 쉽다. (Input -> Output)
+ 모듈화 프로그래밍 -> 높은 생산성
    - 함수의 조합으로 작성븡 루샣앟ㄴ다 -> 작업에 필요한 데이터와 상태는 변하지 않는다.

### (2) 순수함수와 고계함수
+ 순수함수
    - 외부 변수에 아무런 영향을 미치지 않는 함수
    ```js
        function showMessage(){
            return 'post message';
        }
        var h = 'hello';
        var a = showMessage(); //변수 a는 h에 전혀 영향을 주지 않는다.
    ```

+ 고계함수
    - 함수를 `하나의 값`으로 간주하여 함수의 인자 또는 반환 값으로 사용할 수 있는 함수
    - 자바스크립트는 함수를 `일급 객체`로 분류하여 값으로 사용할 수 있다는 것을 기억하자
    ```js
        var value = 10;
        function privateValue(a,b){ //privateValue 함수는 getEncryption 함수에서 인자로 받아와 반환값으로 사용되므로 고계함수라 할 수 있다.
           return Math.random() * (a - b) + a;
        };

        function getEncryption(number, func){
            return func(number, number+10);
        };
        
        var numberEncryption = getEncryption(value, privateValue);
        console.log(numberEncryption);
    ```

### (3) 함수형 프로그래밍 패턴
```js
    //기존 명령형 프로그래밍, 지양하자..
    function sum(Arr){
        var sum = 0;
        for(var i=0; i<Arr.length; i++){
            sum = sum + Arr[i];
        }
        return console.log(sum);
    }

    //fp (재귀방식) 
    function recursionCal(func, arr, init){
        var len = arr.length;
        var value = init;
        if(len==0){
            return value;
        }else{
            value = func(value, arr[len-1]);
            arr.pop();
            return recursionCal(func, arr, value);
        }
    }

    //fp 
    function cal(func, arr, init) { 
        var value  = init; 
        if (typeof func != "function") { //인자 func의 자료형이 함수가 아니면 false
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            value = func(value, arr[i]); 
        }
        return value;
    }

    function sum(x, y) {
        return x + y;
    }

    function mul(x, y) {
        return x * y;

    }

    console.log("fP>>"+cal(sum, [1,2,3,4,5,6,7,8], 0));
    console.log("fP(recursion)>>"+recursionCal(sum, [1,2,3,4,5,6,7,8], 0));
```