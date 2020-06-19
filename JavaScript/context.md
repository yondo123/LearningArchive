## 실행 컨텍스트

+ 실행 컨텍스트란 자바스크립트 내에서 실행 가능한 코드블록들이 실행되는 환경이라고 볼 수 있다.
    ```js
    console.log('global Context'); //전역 컨텍스트
    function executeContext1(){
        console.log('context 1');
    }

    function executeContext2(){
        executeContext1() //context1 함수를 호출
        console.log('context 2'); 
    }

    executeContext2(); //함수 단위로 실행되므로 context2를 먼저 실행
    
    /*result 
        globacl Context 
        context 1
        context 2
    */
    ```
    ![context](https://user-images.githubusercontent.com/46988995/85142723-c1cb2f80-b283-11ea-928f-23d19379796c.jpg)

### (1)함수 실행시 컨텍스트 생성 과정
```js
    function execute(param1, param2){
        var a=1, b=2;
        function internalFunc(){
            return a+b;
        }
        return internalFunc() + a, b;
    }
    execute(3,4);
```
1. **활성 객체 생성**
    + 해당 컨텍스트에서 필요한정보를 담을 객체`(매개변수, 사용자 정의 변수 및 객체)`

2. **arguments 객체 생성**
    + 함수를 호출할 때 넘긴 인자들의 배열`(유사배열, 정식 배열은 아니다)`
    + arguments -> [param1, param2]

3. **스코프 정보 생성**
    + 컨텍스트의 유효 범위를 나타내는 스코프 정보 생성
    + 특정 변수에 접근해야 할 경우, 이 스코프 리스트를 활용
    + 현재 컨텍스트의 변수 뿐만 아니라, `상위 실행 컨텍스트의 변수도 접근 가능`
    + [[scope]] -> [List]

4. **변수 생성**
    ```js
        function(param1, param2){
            var a=1, b=2;
            function internalFunc(){} //a,b, internalFunc()가 생성 (함수도 변수!)
        }
    ```
    + 현재 실행 컨텍스트 내부에서 사용되는 `지역 변수`를 생성
    + `변수 or 내부 함수`를 메모리에 생성하지만, 초기화는 해당 표현식이 실행되기 전까지 이루어지지 않는다.
    ![object](https://user-images.githubusercontent.com/46988995/85142612-9f391680-b283-11ea-9147-1b9762fabbfe.jpg)

5. **this 바인딩**
    + `this` 키워드를 사용하는 값이 할당된다.
    + this -> object

6. **코드 실행**
    + 변수의 초기화 및 연산, 또 다른 함수 실행등이 이루어진다.