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

    Fruist.prototype.getPrice = function(){
        return this.price;
    }

    const tomato = new Fruits('tomato', 1000); //인스턴스 생성
    tomato.getname(); //'tomato'
    tomato.getPrice(); //1000
```