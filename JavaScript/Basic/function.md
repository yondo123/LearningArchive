## (1) 함수

- 자바스크립트내의 모든 function은 객체이다!!
- Function에 대해서는 new 연산자를 사용하지 않는 것이 좋다.(4바이트 작게 줄일 수 있음)

    ```jsx
      var sum = new Function('a', 'b', 'return a+b');
    	alret(sum(2,6)); 
    	//output : 8
    ```

### 1-1) 익명 함수와 선언적 함수

- 웹 브라우저는 선언적 함수 → 익명 함수 순서대로 읽는다.

    ```jsx

    	//익명 함수 (함수 표현식)
    	var myFunc = function() { alert('hello');}
      //선언적 함수 (함수 선언문)
    	function myFunc() { alert('goodBye'); }

    ```

- 실행결과는 'hello'가 출력될것이다.
- 선언적 함수는 웹 브라우저가 가장 먼저 읽고, 익명 함수는 그 뒤에 스크립트 태그를 차례로 읽을 때 읽혀진다.
- 익명 함수의 대표적인 용도 → 콜백 함수

 

### 1-2) 리턴 값

- return 문이 없는 함수의 경우, 함수를 호출할 때 undefined (false) 값으로 반환한다.
- return; 과 return undifined;와 같으며, return null;과는 명백히 다르다!
    - 제어를 끝내려는 (단순 반환 지점으로 되돌림) 용도로 쓰이는 경우 boolean 값으로 해석해 undefined, null을 false로 받아들이기 때문에, 명확하게 표기하는 것은 return false;로 하는것이 낫다. (의미 표현)

    ```jsx
    var noReturnFunc = function() {
    	console.log('This function has no return value');
    }

    console.log(noReturnFunc());
    ```

    ```jsx
    function checkFunction(){
    	return true; //"return true!"
    	return false; //"return false!"
    	return; //"return false!"
    	return null; //"return false!"
    }

    function doFunction(){
    	if(!checkFunction()){
    		console.log("return false!");
    	}else{
    		console.log("return true!");
    	}
    }

    doFunction();
    ```

  

### 1-3) 매개변수

- 매개변수 개수보다 많거나 적은 매개변수를 사용하는 것을 허용
- 콜백 함수 : function()도 하나의 자료형, 즉 매개변수로 전달할 수 있다!
    - 콜백 함수는 익명 함수로 사용하는 경우가 많다.

    ```jsx

            function taskTen(callback) {
                for (let i =0;i<10;i++){
                    callback();
                }
            }
            
            taskTen(function() { //taskTen 함수 호출 내부에 익명함수 삽입.
                alert('함수 호출');
            });
    ```

### 1-4) 가변 인자 함수

- 매개변수가의 개수가 변할 수 있는 함수

    ```jsx

            function sumAll() {
                //sumAll 함수내에 9개의 인자가 있으니 9가 출력
                alert(typeof(arguments) + ':' + arguments.length);
            }
            sumAll(1,2,3,4,5,6,7,8,9);
    ```

- 매개 변수의 합을 더하는 함수

    ```jsx

        function sumAll() {
                let output = 0; //인자의 합을 저장 할 변수
                for(let i=0; i<arguments.length; i++){
                    output = output + arguments[i];
                }
                return output;
            }
    		 alert(sumAll(1,2,3,4,5,6,7,8,9));
    ```

### 1-5) 내부 함수

- 목적 : 여러 함수를 사용 시 충돌 가능성을 최소화
- 함수 내부에 선언하는 함수 (외부함수, 내부함수 이름 동일할 때 내부 함수부터 우선실행)
- 함수내에 쓰인 내부 함수들은 외부에서 쓸 수 없다. (해당 함수 내부에서만 가능)

    ```jsx
    function pythagoras (wid, hei){
    	function square(x) { //내부함수 생성
    		return x*x;
    	}
    	return Math.sqrt(square(wid) + square(hei)); //내부함수 호출
    }
    alert(pythagoras(2,3));
    ```

### 1-6) 즉시 실행함수

- 함수를 정의함과 동시에 바로 실행되는 함수를 의미한다. → 익명 함수를 응용한 형태이다.
- 최초 한 번의 실행만을 필요로하는 코드에 사용할 수 있다.

    ```jsx
    (function (name){ //함수 리터럴을 괄호()로 감싼다. (이름 유무는 상관없다.)
    	console.log('This is the immediate function : ' +name);
    })('foo'); //'foo'를 name 인자로 넘겨 즉시 실행 함수를 호출

    /* 괄호 위치는 큰 영향을 받지 않는다. */
    (function (name){ //함수 리터럴을 괄호()로 감싼다. (이름 유무는 상관없다.)
    	console.log('This is the immediate function : ' +name);
    }('foo')); //'foo'를 name 인자로 넘겨 즉시 실행 함수를 호출
    ```

    ```jsx
    /*제이쿼리에 사용된 즉시 실행함수*/
    (function (window, undefined){
    	//code
    })(window);
    ```

- 즉시 실행함수도 `함수` 이므로 변수에 저장이 가능하다.

    ```jsx
    (mySquare = function (x) {
     console.log(x*x); 
    })(2); 
    mySquare(3);

    //result : 즉시실행함수 'mySquare'가 즉시 호출(2*2 = 4)되고, 곧이어 매개변수 '3'을 넘겨 재호출된다, 즉 재호출 가능하다.

    var mySquare = function (x) {
     console.log(x*x); 
    })(2); 
    mySquare(3);
    console.log(mySquare(2)); 

    //result : 특정 스코프 변수에 즉시실행함수를 담아두어 호출할 때만 사용할 수 있다. 

    ```

### 1-7) 클로저

- 사전지식 : 함수 내에 있는 변수는 지역 변수이므로 외부에서 사용할 수 없다.
    - 함수가 실행될 때 생성→종료될 때 사라짐
- 반드시 리턴된 클로저 함수를 사용해야 지역 변수 output을 사용할 수 있다.
- 자바스크립트는 함수의 중첩을 허용(내부 함수) → 캡슐화 역할에 쓰임
- 만약 내부 함수가 외부 함수의 범위에 있는 이름과 같은 변수를 정의하는 경우, 다시 외부 함수 범위의 변수를 참조(접근) 할 수 없다!

```jsx
/*
	1. 함수를 선언한다. (내부변수 정의)
	2. 내부함수는 외부 함수에서 정의한 내부 변수에 접근
	3. '내부 함수' 자체를 리턴 -> 외부 범위로 노출
*/

function petName(name) {
	let output = 'My pet is ' + name + '.....!';
	return function name() {
		alert(output);
	};
}
petName('toad');
```

```jsx
function countNumber(howMany){
	for(var i=0; i<howMany; i++){
		(function(current){
			setTimeout(function(){
				console.log(current);
			}, current * 1000);
		}(i));
	}
}
```

---

## (2) this 바인딩

### 2-1) 메서드 호출 시 this 바인딩메서드 호출 시 this 바인딩

- 메서드 내부 코드에서 사용된 this는 해당 메서드를 호출한 객체로 바인딩된다.

    ```jsx
    var myObj = {
    	name : 'foo',
    	sayName = fucntion(){
    		colsole.log(this.name); //호출한 객체에 바인딩 (name : foo)
    	}
    }

    var ohterObj = {
    	name : 'two'
    }

    otherObj.sayName = myObj.sayName; //ohterObj 객체에 함수 생성

    /*메서드 호출*/
    myObj.sayName(); //foo
    otherObj.sayName();  //two 

    ```

### 2-2) 함수 호출 시 this 바인딩

- 함수를 호출하면, 해당 함수 내부에서 사용된 this는 전역 객체에 바인딩 된다.
- 내부 함수를 호출했을 경우에도 그대로 적용되니, 내부 함수에서 this를 사용 할 경우 주의해야한다.

    ```jsx
    test = "testMessage";
    value = "this is global value!!";
    var custormObject = {
        value : 'hello',
        func : function () {
            console.log(this.value);
            function ineerFunc() {
                console.log(this.value);
            }
            return ineerFunc();
            //result : testMessage
        }
    }


    function outputTest() {
        console.log(this.test); 
    }
    outputTest(); //result : hello
    custormObject.func(); //result : this is global value!!
    ```

![함수 간 this 바인딩](https://user-images.githubusercontent.com/46988995/87870566-38269300-c9e4-11ea-8614-b5b75f3d0a25.jpg)

내부함수에서 this를 호출하면 전역 객체(Window)에 바인딩

---

## (3) 함수를 호출하는 방법

- 함수를 호출하는 방법은 일반 함수를 호출하는 방법도 있지만, call, apply 메서드를 사용해 명시적으로 this 바인딩을 설정할 수 있다.
- call(), apply() 메서드들은 모든 함수의 부모 객체인 Funtion.prototype의 객체 메서드이므로 모든 함수는 사용 가능하다.
- 두 메서드 들은 함수 호출 기능은 동일하며, 넘겨 받는 인자 값만 다르다!

### 3-1) Call()

- call() 메서드를 이용하여 this 값을 변경해서 사용할 수 있다.

    ```jsx
    value = 'choi'; //window객체
    var nameObj = {value : 'type'};
    var gender = {value : 'gender'};

    function getInfo() {
    	return console.log(this.value); //call이나 apply에 따라서 this의 범위가 달라진다.
    }

    getInfo(); //일반 호출시 window.value(전역객체 value 출력) -> 'choi'
    getInfo.call(); //마찬가지로 window.value -> 'Choi'
    getInfo.call(nameObj); // nameObj.value -> 'type'
    getInfo.call(gender); //nameObj.value -> 'gender'
    ```

### 3-2) Apply()

- call과 동일하나 call 메서드는 인자 값을 개별로, apply는 배열 형태(리스트)로 전달한다.

    ```jsx
    function Person(name, age, gender){ //생성자 함수 
    	this.name = name;
    	this.age = age;
    	this.gender = gender;
    }

    var bindObj = {} //빈 객체 생성(bind 할 오브젝트)

    Person.apply(bindObj, ['name',25,'man']); //Person 함수를 호출하고, this는 bindObj 객체에 바인딩, 해당 프로퍼티를 Person에 전달
    console.dir(bindObj);
    ```

- apply() 메서드를 사용해 유사배열객체(arguments)에서 배열함수(slice, pop) 사용하게변경하기

    ```jsx
    function arrayBind() {
       var args = Array.prototype.slice.apply(arguments);
       console.dir(args); //디렉토리 호출 시 Prototype은 array가 된다.
    };

    arrayBind(1,2,3);
    ```

---

## (4) 생성자 함수

### 4-1) 객체를 생성할 때 사용하는 함수

- 자바스크립트 객체를 생성할 때 사용하는 방법이다. (리터럴 방식 or 생성자 함수 방식)
- 일반 함수에 new를 붙이면 원치않는 생성자 함수처럼 동작할 수 있어 생성자 함수는 대문자로 시작하는 것을 규칙으로 삼고 있다.

    ```jsx
    //리터럴 방식 생성 
        var LitObjTest = {
            name : 'choi',
            age : 25,
            gender : 'man'
       };

       console.dir(LitObjTest); //프로토타입 : Object.prototype (최상위)

       //생성자 함수 
       function NewObjTest(name, age, gender){
           this.name = name;
           this.age = age;
           this.gender = gender;
       }

       var personOne = new NewObjTest('sim', 25, 'man');
       console.dir(personOne); //프로토타입 : 호출 함수 (NewObjTest)

       var personTwo = new NewObjTest('kim', 24, 'women');
       console.dir(personTwo); //프로토타입 : 호출 함수 (NewObjTest)
    ```

### 4-2) 리터럴 객체 생성과 생성자 함수 방식에서의 프로토타입 차이

- **프로토타입 의미**
    - 객체 생성시 생성된 객체의 부모 객체를 '프로토타입' 객체라고 부른다.
    - `--proto--`와 `prototype` 프로퍼티는 같다고 생각하면된다.
    - 자바스크립트에서 모든 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체(부모타입)로 취급한다.

- **리터럴 방식**
    1. 객체 리터럴로 생성한 객체는 Object()라는 내장 생성자 함수로 생성된다.
    2. 이 Object() 내장 함수의 프로토타입 객체가 Object.prototype을 가리키고 있어 자신의 프로토타입 객체로 쓸 수 있다.

- 생성자 함수 방식

    ```jsx
    function Laptop(name, manu, year){
    	this.name = name;
    	this.manu = manu;
    	this.year = year;
    }

    var laptop = new Laptop('always 9', 'samsung', 2019); //laptop 객체 생성

    console.log(laptop.hasOwnProperty('name')); //laptop의 hasOwn() 메서드가 없으니 부모의 프로토타입에서 찾는다.
    //result : true;
    console.dir(Laptop.prototype);

    ```

    1. laptop의 생성자 함수는 Laptop()함수다 → laptop의 prototype 은 Laptop.prototype
    2. laptop 객체는 hasOwnProperty() 메서드가 없기 때문에 부모의 객체인 Laptop.prototype 객체에서 hasOwnProperty() 메서드를 찾는다.
    3. Laptop 역시 자바스크립트의 객체 이므로 Object.prototype 객체까지 이어져 hasOwnProperty() 메서드가 실행될 수 있다.

---

## (5) 프로토타입

### 5-1) 프로토타입의 종점

- Object.prototype 객체는 프로토타입 체이닝의 종점이다.
- 즉, 모든 자바스크립트 객체는 Object.prototype 객체가 가진 프로퍼티와 메서드들을 공유할 수 있다.

### 5-2) 프로토타입 확장

- 프로토타입 객체에도 사용자가 정의한 메서드들을 추가할 수 있다.

    ```jsx
    String.prototype.helloMethod = function () {
        return '안녕하세요,' + this + ' 입니다'; //이때의 this는 메서드를 호출한 객체가 된다.
    }

    var str = "choi";
    console.log(str.helloMethod());
    ```

![프로토타입 구조](https://user-images.githubusercontent.com/46988995/87870723-a750b700-c9e5-11ea-8dee-22d5b63d92ba.png)
String 프로토타입에 추가된 모습

---

## (6) 호이스팅

- 함수 선언문 방식보다 함수 표현식을 더 권장하는 이유는 호이스팅 문제 때문이다.
- 자바스크립트 실행 시 브라우저에서 함수 스크립트들을 모두 위로 끌어올리는 행위이다.

### 6-1) 함수 선언문에서의 함수 호출

- add함수가 아직 선언되지 않았음에도 실행에 문제가 없다 (익명 함수의 유효 범위는 코드의 맨 위부터 시작한다.)  → 이를 호이스팅이라 한다.

    ```jsx
    add(2,3); //result : 5

    function add(x,y){ //익명함수
    	return x+y;
    }

    add(3,7); //result : 10
    ```

### 6-2) 함수 표현식에서의 함수 호출

- 함수 표현식으로 생성한 함수를 사용하려면 생성된 이후에 호출이 가능하다.

    ```jsx
    add(2,3) //result : type error

    var add = function(x,y){
    		return x+y;
    }

    add(3,7); //result : 10
    ```

---

## (7) 함수의 접근

### 7-1) 외부함수-내부함수 간 스코프 접근

- 마치 안에서 밖이 보이는 유리벽이라 생각하면 쉽다.

    ![함수 이동 범위](https://user-images.githubusercontent.com/46988995/87870810-6dcc7b80-c9e6-11ea-8b47-d7fdef5c69c7.jpg)
