## 펼침연산자
기존 배열 조작(splice, slice..) 메소드들을 사용할 때, 원본배열을 조작할 수 있는 가능성이 있는데 이를 방지 `(기존 컬렉션을 조작하지 않는다.)` 특히, 함수에서 배열을 조작할 때 부수효과 방지에 유용하다.  
마침표 세 개를 이용해 구현한다.   

**사용법**
```js
const fruits = ['apple', 'mango'];
const copyFruits = [...fruits];
//['apple', 'mango']
```

### 펼침연산자를 이용한 복사
만일 배열의 원소를 삭제하려는 함수를 사용하려하려면, 단순하게 반복문을 돌려 삭제할 값과 비교후 일치하면 삭제후 return 배열에 push하는 방식으로 할 수 있다.  

**기존 단순 반복문을 통한 복사**
```js
const fruits = ['apple', 'mango'];
const newFruits = removeItem(fruits, 'mango');

function removeItem(arr, item) {
    const resultArray = [];
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] !== item){
            resultArray.push(arr[i]);
        }
    }
    return resultArray;
}

console.log(fruits);    //['apple', 'mango']
console.log(newFruits); //['apple']
```

이렇게 기존 배열에 영향을 주지도 않고, 원하는대로 삭제가 잘 이루어져있지만 펼침연산자를 이용해서 코드를 좀 더 줄일 수 있다.  
`splice` 메소드로도 요소를 없앨 수 있지만, 원래의 배열의 요소를 삭제함으로 취지에 맞지 않는다.  

**펼침연산자 사용**
```js
const fruits = ['apple', 'mango'];
const newFruits = removeItem(fruits, 'mango');

function removeItem(arr, item) {
    const index = arr.indexOf(item);
    return [...arr.slice(0, index), ...arr.slice(index+1)]; //해당 위치만큼 배열을 잘라 연결 시킨다.
}

console.log(newFruits);
```
펼침연산자를 사용함으로써, 가독성과 재사용성이 향상되었음을 알 수 있다.


### 간편한 매개변수 전달
여러 인수를 매개변수로 담는 함수에서도 간편하게 전달할 수 있다.
```js
const fruitInfo = ['apple', '6000'];

function displayFruitInfo(name, price){
  return `${name} : ${price} 원`;  
}

displayFruitInfo(fruitInfo[0], fruitInfo[1]) //기존 매개변수
displayFruitInfo(...fruitInfo); //펼침연산자 사용
```
### push, shift 대체
push와 shift도 원본배열에 조작을 하는 데, 펼침연산자를 이용해 push와 shift 기능을 구현할 수 있다.
**push**
```js
const fruits = ['apple', 'mango'];
const newFuruits = [...fruits, 'banana']; //['apple', 'mango', 'banana']
```

**shift**
```js
const fruits = ['apple', 'mango'];
const newFuruits = ['banana', ...fruits];
```