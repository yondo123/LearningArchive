## Promise
비동기에서 많이 사용하는 일종의 객체  
자바스크립트는 비동기 언어이다.  
즉, 이전의 코드가 끝마치기 전이어도, 이후의 코드를 실행할 수 있다.  
예를 들면 API 통신이나, 타이머 등 지연된 정보를 수신받기 전에 다른 일 처리를 할 수 있다는 장점이 있다.

### Timer에서의 비동기 예  
만약 `setTimeOut()` 메서드로 1초, 2초..n초 이렇게 지속적으로 출력하는 함수를 구현하면
```js 
function getTime(sec, callback) {
    setTimeout(()=>{
        callback("기본>>"+new Date().toString());
    }, sec * 1000)
}

getTime(1,(result)=>{
    console.log(1, result)
});

getTime(1, (result)=>{
    console.log(2, result)
})

getTime(1, (result)=>{
    console.log(3, result)
})
```
코드 상으로 보면 순차적으로 1, 2, 3.. 초가 찍힐 것 같지만
```{.no-highlight}
1 기본>>Sun Jun 07 2020 18:43:56 GMT+0900 (GMT+09:00)
promise.js:14
2 기본>>Sun Jun 07 2020 18:43:56 GMT+0900 (GMT+09:00)
promise.js:18
3 기본>>Sun Jun 07 2020 18:43:56 GMT+0900 (GMT+09:00)
```
18:43:56초 동일한 시간에 호출되었다. 즉, setTimeout()은 `비동기` 방식이다.

만일 순차적으로 출려되게끔 하려면 `callback`을 넣어주면 된다.
```js

function callbackDelay(sec, callback) {
    setTimeout(()=>{
        callback("콜백 Delay>>"+new Date().toString());
    }, sec * 1000)
}

callbackDelay(1, (result)=>{
    console.log(1, result);
    callbackDelay(1, (result)=>{
        console.log(2, result);
        callbackDelay(1, (result)=>{
            console.log(3, result)
        })
    })
})
/*result
1 콜백 Delay>>Sun Jun 07 2020 18:43:56 GMT+0900 (GMT+09:00)
promise.js:26
2 콜백 Delay>>Sun Jun 07 2020 18:43:57 GMT+0900 (GMT+09:00)
promise.js:28
3 콜백 Delay>>Sun Jun 07 2020 18:43:58 GMT+0900 (GMT+09:00)
*/
```
이렇게 콜백 패턴을 이용해서 비동기 처리를 할 수 있지만 가독성이 심히 떨어진다는 단점이 있다. (콜백 지옥을 경험할 수 있다.)

### Promise 객체  
`Promise` 객체를 사용하면 비동기 처리를 유연하게 할 수 있다.

프로미스의 3가지 상태 (대기 - 이행 - 실패)
1. 대기는 프로미스를 생성자로 호출한 순간이다.
    + 프로미스는 콜백 함수를 인수로 받고, 성공(resolve)-실패(reject) 상태에 대응하는 메소드를 사용한다.  
    + Promise 객체를 호출하는 순간, 내부 함수는 곧바로 실행된다. 
        ```js
        //콜백함수 선언 (인자는 resolve, reject)
        new Promise(function(resolve, reject){
            //code..
        });
        ```
2. `resolve`를 실행할 시 이행 상태가 된다.
    ```js
    new Promise(function(resolve, reject){
        resolve();
    });
    ```
3. 이행(완료) 상태가 되면 `then()`메소드를 사용하여 결과 값을 받을 수 있다.
    ```js
    function getData(){
        return new Promise(function(resolve, reject){
            const data = 100;
            resolve(data);
        });
    }

    getData().then(function(resolveData){ //Promise의 인스턴스
        console.log(resolveData);
    });
    ```

4. 실패 상태가 되면 `chatch()`로 받을 수 있다.
    ```js
    function getData(){
        return new Promise(function(resolve, reject){
            reject(new Error("error message!"));
        });
    }

    getData().then().catch(function(err){
        console.log(err);
    });
    ```

또한 여러개의 Promise의 인스턴스를 연결 할 수 있다. (순차적으로 실행된다.)

```js
function getData(){
	return new Promise(function(resolve, reject){
		resolve('success!!'); //then method chain
	});
}

getData()
    .then(function(data){
        console.log(data + "first");
        return data;
     }) //success!!first
    .then(function(data){
        console.log(data + "second");
         return data;
    })
    .then(function(data){
        console.log(data + "third");
    });
```

### 위에서 생성한 호출 함수를 Promise로 바꿔보면?
```js
function promiseDelay(sec) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("프로미스 Delay>>"+new Date().toString());
        }, sec * 1000);
    });
}

promiseDelay(1).then((res)=>{
    console.log(1,res);
    return promiseDelay(1); //프로미스를 다시 호출하지 않으면 undefined
})
.then((res)=>{
    console.log(2,res);
})
```

### `return resolve()`와 `resolve()`차이
+ 일반 함수 return과 동일, 정상적인 return으로 해당 블록에서 함수 종료
    ```js
    return new Promise((resolve, reject) => {
    attach.readFile((err, data) => {
        if (err) reject(err)
        return resolve(data) //return
        console.log('success') // 로그 미출력
        });
    });
    ```
    ```js
    return new Promise((resolve, reject) => {
    attach.readFile((err, data) => {
        if (err) reject(err)
        resolve(data)
        console.log('success') // 출력
        });
    });
    ```
+ `catch` 문 내부에서 `return`을 이용하여 에러를 효율적으로 처리할 수 있다.
    ```js
        //대표적인 비동기 함수인 setTimeout
        const getUserInfo = () =>
            new Promise((resolve, reject) => {
                setTimeout(() => resolve({id:'abc', pw:'qwerty'}), 1000);
            })
        
        const executeHandler = userInfo =>
            new Promise((resolve, reject) => {
                console.log(JSON.stringify(userInfo));
                setTimeout(() => reject(new Error('fail process')), 1000);
            });

        getUserInfo()
            .then(userInfo => executeHandler(userInfo)) //인자와 콜백이 각각 1개라면, .then(userInfo)로 축약 가능
            .catch(error => {return `'${error}' handlling success!!`}) //promise Chain, 오류가 발생하더라도 다시 값을 처리해 .then(result)로 넘길 수 있다.
            .then(result => console.log(result));
    ```