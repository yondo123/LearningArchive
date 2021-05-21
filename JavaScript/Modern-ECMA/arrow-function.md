## 화살표 함수
기존 함수를 화살표(⇒)를 이용해 간단히 표기 (화살표 함수는 항상 익명이다.)  

### 기존 함수 표현식과 화살표 함수 표현식 비교
```jsx
    //기존 함수 표현식 
    function name(){
    	//code..
    }

    //화살표 함수
    () => {
    	//code..
    }
```
### 매개변수가 1개라면 괄호()도 생략할 수 있다.
```js
const showMessage = message => { console.log(message) };
```

### 메소드 함수에서 `this` 사용 시 주의사항   
일반 함수들은 this 사용 시 동적으로 해당 함수를 실행한 주체로 Binding되었다.  
하지만 화살표 함수에서는 자신을 소유하고 있는 객체를 바라보고 있는게 아니라 상위환경의 this를 그대로 계승한다. `(이 개념을 Lexical this라고 칭함)`  
따라서 해당 객체의 정보를 필요로하는 메소드에서는 화살표 함수는 쓰지 말자.
```js
const person = {
    name : 'choi',
    getName : function(){
        return console.log(this.name);
    }
}
person.getName(); //choi

const food = {
    name : 'kimchi',
    getName : () => { return console.log(this.name) }
}
food.getName(); // ''
```

### 콜백 함수에서의 유용성  
메소드 함수로 사용하는 대신 함수를 반환하는 콜백 함수 용도로 사용하면 기존 함수 표현식 보다 깔끔해진다.  
이미 문맥이 존재하고, 함수 내부에서 이 함수를 사용하려고 할 때 유용하다.

```js
const validator = {
    message : 'is valid.',
    checkElement : function(...elements){
        return elements.map(element => {
            if(element) return element + this.message + '\n';
        });
    }
}

validator.checkElement('값', '값2');
```
만약 위 메소드 `checkElement`에서 화살표 함수가 아니라 일반 함수 표현식을 사용했다면, 내부함수에서의 this는 상위 컨텍스트를 바라보기 때문에 window객체에 지정된 값을 바라보고 있기 때문에 에러가 발생할 수 있다.