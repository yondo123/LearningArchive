## JVM의 메모리구조
### JVM 개념
+  Java Virtual Machine, 자바 코드로 작성된 어플리케이션을 실행시키기 위한 가상 머신이다.
+  자바로 생성된 애플리케이션은 OS를 거치기 전 JVM을 한번 더 거치기 때문에, 실행속도가 다소 느릴 수 있다.
+  JVM은 시스템으로부터 응용프로그램을 수행에 필요한 메모리를 할당받고 여러 영역으로 나누어 관리한다.

### JVM 메모리 구조
![JVM_Memory](https://user-images.githubusercontent.com/46988995/101280196-18fd9600-380b-11eb-9b00-51c9c23c5dd2.png)

+ **메소드 영역**
    + 사용된 클래스 파일을 읽고 분석하여 클래스에 대한 정보를 저장하는 공간

+ **힙(heap)**
    + `인스턴스`가 생성되는 공간
+ **호출스택(CallStack)**
    + 메소드의 작업에 필요한 메모리 공간
    + 메소드가 호출되면, 필요한 만큼의 메모리를 스택에 할당받고 수행을 마치면 메모리를 반환하고 스택에서 제거된다.
    + `스택`구조이기 때문에 Main클래스를 수행하기전 거쳐간 여러 클래스들이 밑에 쌓이는 구조이며, 해당 클래스들이 실행되면, 메모리와 함께 스택에서 제거된다.

### 기본형 매개변수와 참조형 매개변수
+ 자바에서 메소드를 호출할 때는 매개변수타입에 따라 기본형, 참조형으로 나누어진다.
+ 기본형 매개변수
    + 변수의 값을 읽기만 할 수 있다. (원래의 값에 영향끼치지 않는다.)
+ 참조형 매개변수
    + 변수의 값을 읽고, 변경할 수 있다.

**기본형 매개변수**
```java
	class Data {
		String name;
	};

	public class perameterTest {
		public static void main(String[] args) {
			Data data = new Data();
			data.name = "Choi";
			markupName(data.name);
			System.out.println("original Name : " + data.name);
		}

		static void markupName(String name) { //기본형 매개변수(data.name이 변경된 것이 아닌 매개변수 값만 변경) 
			name = "check " + name;
			System.out.println("result : " + name);
		}
	}
```

**참조형 매개변수**
```java
package ch01;

class Data {
	String name;
};

public class perameterTest {
	public static void main(String[] args) {
		Data data = new Data();
		data.name = "Choi";
		markupName(data); //클래스의 주소값을 그대로 전달한다, data에는 주소값만 담겨있다.(ch01.Data@5e265ba4
)
		System.out.println("original Name : " + data.name);
	}

	static void markupName(Data data) { // 참조형 매개변수 (클래스의 주소값을 그대로 전달)
		data.name = "check " + data.name;
		System.out.println("result : " + data.name);
	}
}
```

### 임시적으로 간단한 계산이 들어가있는 경우는 클래스 생성보다 `배열`을 이용하자
+ 배열은 객체와 같이 참조변수를 통해 데이터가 저장된 공간에 접근한다. (같은 특성)
+ 따라서 임시 데이터를 다룰때는 클래스를 생성하는 것 보다 배열을 이용하는 것이 효율적이다.
```java
public class perameterTest {
	public static void main(String[] args) {
		int targetIndex = 0;
		String[] names = new String[] { "noel", "liam", "jack" };
		System.out.println(names[targetIndex]);
		getTempName(names, targetIndex);
		System.out.println("names list : " + "\n" + names[0] + ", " + names[1] + ", " + names[2]);
	}

	static void getTempName(String[] names, int idx) { // 참조형 매개변수 (배열)
		names[idx] = "temp " + names[idx];
		System.out.println("getTempName : " + names[idx]);
	}
}

```
