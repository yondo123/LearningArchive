+ 기존 es5 까지는 `var` 를 사용하여 변수 선언 → 호이스팅 문제로 `let` 과 `const` 등장
- 역할 : 변수 재선언 불가능
- `let` 과 `const` 차이?
    - let은 변수에 재할당 가능, const는 재선언 - 재할당 모두 불가능

        ```jsx
        //var 
        var a = "free";
        var a = "changeOk";
        a = "hoisting?"; 

        //let
        let a = "test";
        let a = "hello"; //result : Uncaught SyntaxError: Identifier 'a' has already been declared
        a = "hello"; 

        //const
        const a = "hi";
        const a = "ok"; //Uncaught SyntaxError: Identifier 'a' has already been declared
        a = "change?"; //Uncaught TypeError: Assignment to constant variable.
        ```

- `let` 과 `const` 의 유효범위는 블록스코프이다.
- 기본적으로 `const` 를  사용하고 , 재할당이 필요한 경우 `let` 을 사용한다.