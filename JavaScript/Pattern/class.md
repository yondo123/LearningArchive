## 자바스크립트 클래스 구현

### 함수를 사용한 클래스 구현
자바스크립트는 기본적으로 `프로토타입 기반의 언어` 이다.  
새로운 인스턴스를 생성할 때 마다 메서드를 복제하지 않고 포토타입에 대한 연결만을 생성한다.

```js
    function Fruits(name, price){ //명명규칙, 클래스는 대문자 표기로 작성한다.
        this.name = name;
        this.price = price;
    }

    Fruits.prototype.getName = function(){
        return this.name;
    }

    Fruits.prototype.getPrice = function(){
        return this.price;
    }

    const tomato = new Fruits('tomato', 1000); //인스턴스 생성
    tomato.getName(); //'tomato'
    tomato.getPrice(); //1000
```

### ECMA6 에서 등장한 `Classes` 
기존 ECMA2015 까지 함수 방식으로 class를 선언해야 했지만, 함수 기반 특성때문에 호이스팅 문제에 취약점을 가지고 있다.  
ECMA6부터 정식으로 `class` 문법을 제공한다.  
함수 생성 방식 - class 방식 모두 동일하게 프로토타입을 생성할 뿐이다.  
(외관적으로 보기에 더욱 class문법이 직관적이다.)  
IE 환경에서는 정식으로 지원하지 않는다. 

**클래스 생성**  
`class`키워드를 사용해 클래스를 생성한다.  
인스턴스를 생성할 때는 `new` 키워드를 사용한다.
```js
    class Fruits {
        //code..
    }
    const fruits = new Fruits();
```

**생성자 함수**  
클래스에서 사용 할 여러 속성들을 정의하기 위해 생성자 함수를 실행한다.    
생성자 함수는 항상 `constructor` 이름으로 명명한다.  
(`constructor` 메소드는 클래스 내에 단 한 개만 존재할 수 있다.)

```js
class Fruits {
    constructor(name, price) {
        this.name = name;
        this.price = price || 0; //초깃값
    }
}

const firstFruit = new Fruits('apple');
const secFruit = new Fruits('banana', 1500);
```

**메소드 정의**  
생성자 함수와 동일한 구문으로 메소드 정의한다.  
주의할 점은 `화살표 함수`를 사용 시 참조 this가 달라지므로, 일반 함수로 작성하면 특정 예외 상황을 제외하고 클래스 속성에 완전하게 접근할 수 있다.
```js
class Fruits {
    constructor(name, price) {
        this.name = name;
        this.price = price || 0; //초깃값
    }

    displayPrice(){
       return console.log(`가격 : ${this.price} 원`);
    }
}

//인스턴스 생성
const apple = new Fruits('apple', 1500);

//메소드 호출
apple.displayPrice(); //가격 : 1500 원
```
### 상속
자식 클래스에서 상속을 받으려면 `extends`를 사용해 상속받을 클래스를 지정한다.  
```js
class discountFruits extends Fruits {};
const apple = new discountFruits('Apple', 1500);
```
상속은 보통 새로우 속성이나 메서드를 추가하기 위해 사용한다.  
`super()`를 호출해 부모 클래스의 생성자에 접근할 수 있고, 새로 추가 할 속성은 추가해주면 된다.
```js
class discountFruits extends Fruits {
    constructor(name, price){
        super(name); //이름은 바뀔 필요가 없으므로 super로 상속 받아온다.
        this.price = (price / 10) || 0;
    }
}
```

### 오버라이딩
위의 예제를 보면 자식 클래스 `discountFruits`는 할인된 과일의 정보를 정의한 클래스이다.  
기존 부모 클래스의 `displayPrice()` 메서드는 가격 정보를 출력하는 메서드이다.  
하지만, 고객에게 할인된 가격임을 명시해야하기 때문에 부모 클래스에서 똑같은 메서드를 생성해 `오버라이딩`할 수 있다.  
(주의할 점은 추가한 모든 메소드는 상속 받고 있는 모든 자식 클래스들도 똑같이 상속받는다.)
```js
class discountFruits extends Fruits {
    constructor(name, price){
        super(name); 
        this.price = (price / 10) || 0;
    }

    displayPrice(){
        return console.log(`(할인) 가격 : ${this.price}`);
    }
}

const apple = new discountFruits('Apple', 1500);
apple.displayPrice(); //result : (할인) 가격 : 150
```
### getter와 setter
만약 메서드 사용 시 값의 유효범위를 설정하고 싶으면 `get(getter)과 set(setter)`를 사용하면 된다.  
만약 price 속성에 숫자가 아닌 문자열이 들어온다면 문제가 충분히 생길 수 있다.  
게터와 세터를 사용하면 가상으로 프로퍼티가 생성되어 읽고 쓸수만 있지, 실제로는 존재하지 않는 프로퍼티처럼 사용할 수 있다.  
**get**  
`get`을 사용해 price 속성 값을 안전하게 가져올 수 있다.  
```js
class Fruits {
    constructor(name, price) {
        this.name = name;
        this.price = price || 0; //초깃값
    }
    //getter
    get priceText(){
       return `가격 : ${this.price} 원`;
    }
}

const apple = new discountFruits('Apple', 1500);
console.log(apple.priceText);
```

**set**  
`set`을 사용해 price 속성 값을 처리한다.   
여기서 핵심은 기존 클래스 속성 `price` 속성 이름을 변경하고 set을 사용하여 정수인지 검사하는 것이다.  
(클래스 속성 이름과 get, set 인수로 같이 사용하면 호출 스택 오류가 발생한다.)  
```js
class Fruits {
    constructor(name, price) {
        this.name = name;
        this._price = price || 0; //명명 규칙, '_' 속성일 시 건드리지 않는 약속
    }

    get priceText(){
       return `가격 : ${this._price} 원`;
    }
    
    get price(){
        return this._price; 
    }

    set price(price){
        //set을 통해 기존 속성에 유효한 값을 할당해준다.
        let numericPrice = typeof price == 'number' ? price : Number(price);
        if(numericPrice > 0){
            numericPrice = 0;
        }
        this._price = (numericPrice / 10);
    }
}

//인스턴스 생성
const apple = new Fruits('Apple', '가');
const disApple = new discountFruits('Apple', '가'); //error
console.log(apple);    
console.log(disApple); //error
```


### `static` 메소드
정적 메소드 정의, 클래스의 인스턴스에서 호출하는 것이 아닌 `클래스를 통해 호출`된다.  
공용으로 사용되는 유틸리티성 함수에 주로 사용한다.
 ```js
        class Fruits {
            constructor(name, price) {
                this.name = name;
                this.price = price;
            }
            
            static showMessage(fruit){
                const message = `${fruit.name}의 가격은 : ${fruit.price} 원 입니다.`
                return message;
            }

            getName() {
                return this.name;
            }

            getPrice() {
                return this.price;
            }
        }

        const apple = new Fruits('apple', 1500);
        console.log(Fruits.showMessage(apple)); //apple의 가격은 : 1500 원 입니다.
        console.log(apple.showMessage()); //error : apple.showMessage is not a function
```
