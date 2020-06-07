## Promise
---

비동기에서 많이 사용하는 일종의 객체

### 먼저 비동기란? 

+ 비동기방식
    - 코드를 수행하는 와중에도, 지속적으로 다른 코드를 실행하는 것
    
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

`Promise` 객체를 사용하면 비동기 처리를 유연하게 할 수 있다.

프로미스의 3가지 상태 (대기 - 이행 - 실패)
1. 대기는 프로미스를 생성자로 호출한 순간이다.
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
function getData(resolve, reject){
	return new Promise({
		resolve();
	});	
}

getData().then(function(data){  //순차적으로 실행..
	console.log("first");
})
.then(function(data){ 
	console.log("second");
})
.then(function(data){
	console.log("third");
});

```

## 위에서 생성한 호출 함수를 Promise로 바꿔보면?
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