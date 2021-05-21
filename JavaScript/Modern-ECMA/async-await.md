## Async - Await
Promise를 보다 편안한 방식으로 처리할 수 있는 패턴
함수 앞에 `async` 키워드를 선언하면 된다.
```js
async function asyncFunc(){
    return "hello"
}
async().then(console.log); //"hello"
```
Promise 문법과 마찬가지로 then, catch를 통해 콜백을 처리할 수 있는데, `async`를 선언한 순간 항상 Promise를 반환한다.

```js
async function asyncFunc(){
    return Promose.resolve("hello");
}

asyncFunc().then(console.log); //"hello"
```
즉, 위의 코드와 동일한 결과이다.
`await`은 promise가 확정 될 때까지 기다리고 결과를 반환한다.  
`await`은 async 함수 내부에서만 존재한다.  
기존 Promise 패턴에서 .then() 열거 방식보다 가독성이 뛰어나다.  
```js
    function outputAfterSec(sec){
        return new Promise(resolve =>{
            setTimeout(() => {
                resolve(console.log(new Date().toString())); 
            }, sec * 1000);
        });
    }

     async function asyncCall(){
        console.log("call await!");
        await outputAfterSec(2); //outputAfterSec() 실행
        await outputAfterSec(3); //반환된 resolve()를 확인하고 실행
    }

    asyncCall();

    /* retult
        async-await.js:10
        Wed Jun 10 2020 00:02:18 GMT+0900 (GMT+09:00)
        async-await.js:4
        Wed Jun 10 2020 00:02:21 GMT+0900 (GMT+09:00)
    */
```


