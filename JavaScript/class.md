## 자바스크립트 클래스 구현

### Class
+ 타 언어에서는 `class` 키워드를 사용해 클래스 생성 가능
+ 자바스크립트는 `생성자` 로 클래스를 비슷하게나마 구현할 수 있다.
    - 자바스크립트는 거의 대부분 객체이고, 함수 객체로 `클래스`를 구현할 수 있다.

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
+ 기존 ECMA2015 까지 함수 방식으로 class를 선언해야 했지만, 이는 `Hoisting` 문제에 취약점을 가지고 있었다.
    - `함수기반` 이니까 호이스팅 되는것은 당연하다!
+ 해결방안으로 ECMA6에서 `class` 문법을 정식으로 제공한다.
+ 정의
    - `class`선언을 통해 클래스를 정의한다.
    - `constructor` 메소드는 클래스 안에 단 한 개만 존재할 수 있다.

        ```js
        class Fruits {
            constructor(name, price) {
                this.name = name;
                this.price = price;
            }

            getName() {
                return this.name;
            }

            getPrice() {
                return this.price;
            }
        }

        const apple = new Fruits('apple', 1500);
        console.log(apple.name); //apple
        console.log(apple.getName()); //apple
        console.log(apple.price); //1500
        console.log(apple.getPrice()); //1500

        ```
### `static` 메소드
+ 정적 메소드 정의, 클래스의 인스턴스에서 호출하는 것이 아닌 `클래스를 통해 호출`된다.
+ 공용으로 사용되는 유틸리티성 함수에 주로 사용한다.
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