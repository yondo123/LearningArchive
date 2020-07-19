## 데이터 타입과 연산자
![데이터타입](https://user-images.githubusercontent.com/46988995/87870048-79687400-c9df-11ea-9ebe-1953fe561463.jpg)
자바스크립트에는 기본타입(원시타입), 참조 타입으로 나눠진다.

## (1) 기본타입과 참조 타입의 차이?
+ 기본 타입은 그 자체가 하나의 값을 나타낸다.
+ 참조 타입은 기본 타입을 제외한 모든 값을 나타내며, `객체`로 이루어져있다.


## (2) 기본 타입

- **숫자**
    - 다른 언어 같은 경우, int, long, double, float... 등등 다양한 숫자 데이터 타입이 존재하지만, 자바스크립트는 하나의 숫자형만 존재한다.
    - 모든 숫자를 64비트 부동 소수점 형태로 저장하기 때문에 정수, 실수 구분 없이 typeof 연산자 결과값이 number로 저장된다.

- **문자**
    - 자바스크립트에서는 C언어의 char 타입과 같이 문자 하나만을 별도로 나타내는 데이터 타입은 존재하지 않는다.

    ```jsx
    var str = 'test';
    console.log(str[0], str[1], str[2], str[3]); //출력값 test

    str[0] = 'T';  //이게 될까요?
    console.log(str);
    ```

    - 문자열은 배열처럼 인덱스를 이용하여 접근할 수 있다.
    - 하지만 배열이라고해서 문자열의 요소들을 수정할 수 없다. (한 번 생성된 문자열은 읽기만 가능하지 수정은 불가능하다.)

- **null과 undefined**
    - 이 두 타입은 자바스크립트에서 '값이 비어있음'을 나타낸다.
    - 할당되지 않은 변수는 undefined 타입이며 변수 자체의 값 또한 undefined 이다.
    - null을 확인하고자 할 때 typeof의 결과는 object이기 때문에 일치 연산자(===)사용 해야만 한다.

    ```jsx
    var nullChk = null; //null 타입 변수 생성
    console.log(typeof nullChk == null); //false
    console.log(nullChk === null); //true
    ```

## (3) 참조 타입

- 자바스크립트에서 객체는 '이름(key):값(value)'의 형태의 프로퍼티를 저장하는 컨테이너로써 파이썬 딕셔너리, 자바 해시와 상당히 유사하다.
- 자바스크립트에서 기본 타입은 하나의 값만 존재하지만, 객체는 여러 개의 프로퍼티들을 포함할 수 있다.

- **객체 생성방법**
    - object 생성자 함수 방법, 리터럴 함수를 이용하는 방법 등으로 나눠지고 있다.
    - 주로 리터럴(표현식)을 이용하는 방법을 많이 추천하고 있다. (Why? 한 곳에서 객체의 모든 속성을 정의할 수 있기 때문)

    ```jsx
    /* object()를 이용한 foo 객체 생성*/
    var foo = new object();

    foo.name = 'choi seung jin';
    foo.age = 25;
    foo.gender = 'male'

    /*리티럴(일종의 표현식)을 이용한 cat 객체 생성*/
    var cat = {
    	name : 'yami',
    	age : 8,
    	gender : 'female'
    };
    ```

- **객체 프로퍼티 읽기/쓰기/갱신하기**
    - 객체의 프로퍼티 접근 방법은 대괄호([])표기법, 마침표(.) 표기법 등이 있다.

    ```jsx
    var cat = {
    	name : 'yami',
    	age : 8,
    	gender : 'female',
    	'type' : 'cheese'
    };

    //프로퍼티 접근하기
    console.log(cat.name); //yami
    console.log(cat.location); //정의되지 않음(undifined)

    //프로퍼티 갱신하기
    cat.age = 9;

    //프로퍼티 생성하기
    cat.location = 'street';

    //대괄호 표기법을 사용해야만 하는 경우? -> 프로퍼티 명이 예약어거나 표현식일 때!!
    cat['full-name'] = 'kkom yami';
    console.log(cat['full-name']); //kkom yami
    console.log(cat.full-name); //NaN 
    ```

    - 코드에서 대괄호 표기법으로 접근해야하는 경우가 있는데, 프로퍼티가 표현식이거나 예약어일 경우이다.
    - 즉 key 값을 입력할 시 띄어쓰기나 특수기호('-')가 필요할 경우 따옴표로 감싸고 일반 문자 형태는 따옴표가 필요 없다.

    **NaN(Not a Number)이 왜 뜨는건데?**

    - NaN은 수치 연산을 해서 정상적인 값을 얻지 못할 때 출력되는 값이다.
    - 1-'hello'라는 연산의 결과는 NaN이다, 1이라는 숫자와 문자열 'hello'를 빼는 수치연산을 하였기 떄문이다.
    - 따라서, full-name 프로퍼티에 접근하려는 우리 의도와는 다르게, '-'연산자를 계산하는 표현식으로 취급해버려 접근할 수 없게된다.

- **기본 타입 변수와 참조 타입 변수의 함수 호출 방식 차이**

    ```jsx
    var a = 100;
    var obj = {
    	value : 100
    }

    function changeArg(num,obj){
    	num = 200;
    	obj.value = 200;
    	
    	console.log(a); //Result : 200 
    	console.log(obj); //Result : 200 {va

    }

    changeArg(a,obj); //기본타입 변수 a는 값을 복사해서 넘기지만, 오브젝트 obj는 참조 값(가리키는 값)을 파라미터에 전달한다.

    console.log(a); //출력 결과 : 
    console.log(obj);
    ```

    - 기본 타입 변수들은 그 값의 복사된 값을 인자로 넘기지만 참조 타입 변수들은 객체의 참조 값을 전달한다.

- **배열**

    - 자바스크립트에서의 배열은 다른 언어의 배열보다 좀 더 유연하다.
    - 굳이 다르게 크기를 지정하지 않아도 되며, 어느 타입의 데이터를 어느 위치에 넣어도 에러가 나지 않는다.

    배열 사용시 주의할 점!

    1. 배열의 length는 실제 배열에 존재하는 원소 개수와 일치하는 것은 아니다.
    2. 배열의 Index는 자유이다, 가장 큰 인덱스 기준으로 length 값이 늘어난다. (실제 메모리가 늘어나는 것은 아니다.) 
    3. 배열도 객체이므로 for in문을 사용할 수 있긴 하지만, 불필요한 프로퍼티가 출력될 수 있으므로 일반 for 문(length 값 이용)을 이용하는 것이 낫다.
    4. 배열에서 요소를 삭제하려면 splice() 배열 메서드를 사용한다.

- **배열과 객체의 근본적인 차이**

    ```jsx
    var colorsArray = ['Orange', 'yellow', 'green'];
            //배열 출력
            console.log('colorsArray[0] '+colorsArray[0]);
            console.log('colorsArray[1] '+colorsArray[1]);
            console.log('colorsArray[2] '+colorsArray[2]);

            var colorsObj = {
                '0' : 'Orange',
                '1' : 'yellow',
                '2' : 'green'
            };

            console.log('colorsObj[0] '+colorsObj[0]);
            console.log('colorsObj[1] '+colorsObj[1]);
            console.log('colorsObj[2] '+colorsObj[2]);

            console.log('colorsArray의 타입'+typeof(colorsArray)); //result : Object
            console.log('colorsObj의 타입'+typeof(colorsObj)); //result : Object
            
            console.log(colorsArray.length); //배열은 length 프로퍼티가 존재
            console.log(colorsObj.length); //객체는 length 프로퍼티가 존재하지 않음(Undefined)
    ```

    - 객체의 프로토타입 : 객체 → Object.prototype
    - 배열의 프로토타입 : 배열 → Array.prototype → Object.prototype

- **배열은 객체이므로 동적으로 생성할 수 있다.**

    ```jsx
    var arr = ['zero', 'one', 'two'];
        console.log('default array length : '+arr.length);

        //프로퍼티 동적 추가
        arr.color = 'skyblue';
        arr.name ='array_name';
        console.log('add dynamic properties, length : '+arr.length);

        //배열에 원소 추가
        arr[3] = 'three';
        console.log('add Index properties, length : '+arr.length);

        //배열 객체 출력
        console.dir(arr);
    ```

    ![image](https://user-images.githubusercontent.com/46988995/87870303-740c2900-c9e1-11ea-8010-207f03e96ad3.png)

    출력 값 

    - 배열의 length 값은 실제 원소의 개수가 아니라 배열 원소의 가장 큰 인덱스가 변했을 경우만 변경된다.

- **delete 메서드는 배열의 요소 값은 undefined로 설정하는 것 뿐이다.**
    - splice() 메서드

    ```jsx
    splice(start, deleteCount, item..)
    /*
    start : 배열의 시작 위치
    deleteCount : start 지정 위치부터 삭제할 요소의 수
    item : 삭제 위치에 추가할 요소
    */
    ```

    - splice를 통해 배열의 인덱스를 삭제

    ```jsx
    var arr = ['zero', 'one', 'two', 'three'];
    delete arr[0];
    console.log('delete result : '+arr); //delete 연산자는 요소의 값을 비워둘 뿐 실질적으로 삭제하지 않는다.
    arr.splice(0,2);
    console.log('splice result : '+arr); //splice 연산자를 이용해 요소 인덱스를 지정해주면 삭제한다.

    /*result
    delete result : ,one,two,three
    splice result : two,three
    */
    ```

## (4) 동등 연산자와 일치 연산자

- 웬만하면 일치 연산자를 사용하자 (대부분의 자바스크립트 가이드라인에서 동등 연산자를 비교하는 것)

## (5) !! 연산자

- !! 연산자의 역할은 피연산자를 불린값으로 반환하는 것이다.

```jsx
console.log(!!0); //false
console.log(!!1); //true
console.log(!!'String'); //true    
console.log(!!''); //false
console.log(!!null); //false
console.log(!!undefined); //false
console.log(!!{}); //true
console.log(!![1,2,3]); //true
```

- 객체 타입은 빈 객체라도 true를 반환하는 것에 유의 하여야 한다.
    + 객체를 반복하면서 키값이 있는지 확인하여 `null Check`를 할 수 있다.
    ```jsx
        const object = {};
        const array = [];
        function chkEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
        }
        console.log(chkEmptyObject(object)); // true
        console.log(chkEmptyObject(array)); // false
    ```