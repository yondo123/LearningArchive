### 자바에서의 배열 다루기
주로 자바스크립트로 개발을 많이 해서 그런지 `유연성`이 다른 언어와 비교했을때 편하기도 했지만 Java에서의 배열을 마주쳤을 때 확실히 정리하고자 두 언어의 배열을 비교하고자 한다.
먼저 Java에서 배열은 다음과 같은 특징을 갖고 있다.  

1. 같은 타입이어야 한다.
2. 한번 생성된 배열은 길이를 변경할 수 없다.

`같은타입`을 가지고 있어야 된다는 점에서 큰 혼란을 줄 수 있다. 왜냐하면 자바스크립트에서는 배열에 어떠한 타입을 다 포함시킬 수 있었기 때문이다. 

### 자바스크립트에서의 배열 다루기
자바스크립트에서는 다른 언어와(자바 포함) 비교하였을 때 더욱 유연하다.  
크기를 지정할 필요도 없고, 어느타입의 데이터를 어떤 위치에 넣어도 에러가 발생하지 않는다.

1. 배열의 length는 실제 배열의 길이와 일치하진 않는다.
2. 배열의 index는 배열의 길이에 맞추는 것이 아니라 가장 큰 index 기준으로 length 값이 정해진다. (실제 메모리가 늘어나는 것은 아니다.)

### 배열 생성
먼저 자바에서는 배열을 생성할 때 해당 배열에 들어갈 타입을 명시한다.
```java
int[] numberArray = new int[5];
```

자바스크립트에서는 2가지 형태로 배열을 생성할 수 있다.  
`new`생성자 함수로 배열 생성
```js
const numberArray = new Array();
```
변수 초기화로 배열 생성
```js
const numberArray = [1,2,3,4,5];
```

### 배열 초기화
자바에서는 배열의 길이내에서 요소를 추가할 수 있다.  
물론 `arrayList`와 같은 유틸을 사용하면 가변배열을 처리할 수 있지만 어디까지나 순수배열만 놓고봤을 때..
```java
int[] numberArray = new int[3];
int[0] = 1;
int[1] = 2;
int[2] = 3;
int[4] = 4; //error!
```
생성과 동시에 초기화할 수 있다.  
```java
int[] numberArray = new int[]{1,2,3,4};
```

자바스크립트에서는 보다 유연성있게 처리할 수 있다.  
다음과 같은 배열을 index(3) ~ index(99) 까지 `undefined`가 삽입되어있다.  
또한 실제 배열의 길이는 실제 4개의 길이를 가지고 있지만, 가장 큰 index기준으로 잡혀있다.
```js
const numberArray = [];
numberArray.push('1');
numberArray.push(function(){console.log('hello')});
numberArray.push(3);
numberArray[100] = true;

console.log(numberArray[5]); //undefined
console.log(numberArray.length); //101 
```

### 배열의 복사
배열을 복사하는 부분에 대해서는 두 언어 모두 이미 유용한 메소드가 존재한다.  
자바에서는 `arraycopy()` 메소드를 통해 복사가 가능하다.  
```java
int[] array = new int[] {1,2,3,4};
int[] copyArray = new int[4];
System.arraycopy(array, 0, copyArray, 0, 4);
```

자바스크립트에서는 `slice()`메소드로 깊은 복사를 할 수 있다.
```js
const array = [1,2,3,4,5];
const copyArray = array.slice();
```