## 속성 메서드
객체의 속성을 메서드로 사용할 때 `function`예약어를 생략 할 수 있다.
### 메서드 축약
```js
const myself = {
    name : 'choi',
    introduce : function(){
        console.log(this.name);
    },
    fullIntroduce(){
        console.log(this.name + ' 입니다.');
    }
}

//without ES6
myself.introduce();

//with ES6
myself.fullIntroduce();
```

### 속성 축약
객체의 속성 이름(key)과 값(value)가 동일할 때 해당 속성을 축약할 수 있다.
```js
const time = new Date();
//without ES6
const updatePost = {
    title : 'sample',
    time : time,
    content : ''
}

//with ES6
const modernUpdatePost = {
    title : 'sample',
    time,
    content : ''
}

console.log('update time ' + updatePost.time); //update time Tue Jun 01 2021 13:19:16 GMT+0900 (GMT+09:00)
console.log('update time ' + modernUpdatePost.time); //update time Tue Jun 01 2021 13:19:16 GMT+0900 (GMT+09:00)

```