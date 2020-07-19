- 기존 함수를 화살표(⇒)를 이용해 간단히 표기 (화살표 함수는 항상 익명이다.)

    ```jsx
    //ES5
    function name(){
    	//code..
    }

    //ES7
    () => {
    	//code..
    }

    //매개변수가 1개라면 괄호()도 생략 가능!
    const showMessage = sendMsg => { console.log(sendMsg) };
    showMessage("안녕안녕안녕!");
    ```

- 핸들링하고 싶으면? (간단하다, 변수에 저장하자)

    ```jsx
    const funcName = () => { //code..}
    ```

- `this` 가 존재하지 않는다.

    ```jsx
    //es5
    var testObj = {
        sample : "hello",
        execute : function(){
            console.log(this.sample);
        }
    }
    testObj.execute(); //"hello"

    //es6

    ```

- arguments 속성 사용법 (유사방법)

    ```jsx
    //전개 연산자(...)를 사용하여 arguments 사용
    const exeFunc = (...args) => {
    	console.log(args); //기존 arguments 객체와 완벽히 일치 X, calle속성도 없다!
    }

    exeFunc('a', 'b', 'c');
    ```