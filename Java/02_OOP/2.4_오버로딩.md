## 오버로딩
### 오버로딩의 개념
+ 한 클래스 내에서 같은 이름의 메서드를 여러개로 정의하는 것

### 오버로딩의 조건
1. 메서드 이름이 동일해야 한다.
2. 매개변수의 `개수` 또는 `타입`이 달라야 한다.

```java
package ch01;

class overloadingCal {

	public static void main(String[] args) {
		multiOperator mul = new multiOperator();
		System.out.println("result : " + mul.add(2, 3));
		System.out.println("result : " + mul.add(1, 2, 3));
	}

}

class multiOperator {
	int add(int a, int b) {
		System.out.println("two operands : " + a + " + " + b);
		return a + b;
	}

	int add(int a, int b, int c) {
		System.out.println("three operands : " + a + " + " + b + " + " + c);
		return a + b + c;
	}
}
```

### 가변인자 사용
+ `jdk 1.5`이후부터 사용할 수 있다.
+ `변수타입... 변수명` 형태로 작성한다.
```java
    String concatenate(String... str){}
```
+ 가변인자는 `배열`을 사용하는 것이라 호출될 때 마다 배열이 생성된다. (꼭 필요한 경우에만 사용하자)

