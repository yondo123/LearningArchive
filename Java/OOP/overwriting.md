### 오버라이딩
**상속**  
부모 클래스에 추가되지 않은 메소드나 멤버변수를 추가하는 것

**오버라이딩**  
부모 클래스에서 가지고 있는 메소드를 `재정의`하는 것  
부모클래스에서 정의된 메소드보다 자손클래스에서 오버라이딩한 메소드가 우선순위로 실행한다.

### 오버라이딩의 조건
1. 이름이 같아야한다.
2. 매개변수가 같아야한다.
3. 반환타입(return)이 같아야한다.

```java
class PaymentResult {
	void display(String name, int price) {
		System.out.println("---구매결과----");
		System.out.println("상품 명 :"+name);
		System.out.println("결제금액  : "+price+" 원");
	}
}

class RefundResult extends PaymentResult{
	void display(String name, int price) { //부모 클래스 display() 메소드의 이름과 매개변수가 같아야한다.
		System.out.println("----환불결과----");
		System.out.println("상품 명 :"+name);
		System.out.println("입금예정금액 : "+price+" 원");
	}
}
public class overriding {
	public static void main(String[] args) {
		PaymentResult pay = new PaymentResult();
		pay.display("FIFA21", 65000);
		
		RefundResult rf = new RefundResult();
		rf.display("FIFA21",65000);
		
	}
}
```

**실행결과**
```plain
---구매결과----
상품 명 :FIFA21
결제금액  : 65000 원
----환불결과----
상품 명 :FIFA21
입금예정금액 : 65000 원
```

### Super
조상 클래스의 멤버를 참조하는데 사용된다.  
주로 조상(부모) 클래스의 메소드에 추가적인 작업을 덧붙이는데 사용하기 유용하다. `재사용성`  

```java
class PaymentResult {
	void display(String name, int price) {
		System.out.println("---구매결과----");
		System.out.println("상품 명 :"+name);
		System.out.println("결제금액  : "+price+" 원");
	}
}

class DetailPaymentResult extends PaymentResult{
	void display(String name, int price) { //부모 클래스 display() 메소드의 이름과 매개변수가 같아야한다.
		super.display(name , price); //super 참조변수를 통해 부모의 display()를 참조
		System.out.println("총 "+price / 10+ "포인트가 적립되셨습니다."); //추가적인 작업 
	}
}
public class overriding {
	public static void main(String[] args) {
		PaymentResult pay = new PaymentResult();
		pay.display("FIFA21", 65000);
		
		DetailPaymentResult  dpay = new DetailPaymentResult();
		dpay.display("2020 도쿄올림픽 ", 45000);
		
	}
}

```
**결과**
```text
---구매결과----
상품 명 :FIFA21
결제금액  : 65000 원
---구매결과----
상품 명 :2020 도쿄올림픽
결제금액  : 45000 원
총 4500포인트가 적립되셨습니다.
```

### super()
생성자를 호출하는 this와 마찬가지로 `조상 클래스`의 생성자를 호출하는 데 사용한다.  
자손 클래스에의 인스턴스를 생성하면 자손의 멤버 + 조상의 멤버를 사용할 수 있는 인스턴스가 생성된다.  
이때, 조상의 멤버들의 초기화 작업이 이루어져야 하기 때문에, 사용할 수 있으므로 생성자를 호출해만한다.

```java
class PaymentResult {
	String name;
	int price;

	// 생성자
	public PaymentResult(String name, int price) {
		System.out.println("enterance constructor >>");
		this.name = name;
		this.price = price;
	}

	void display() {
		System.out.println("---구매결과----");
		System.out.println("상품 명 :" + name);
		System.out.println("결제금액  : " + price + " 원");
	}
}

class DetailPaymentResult extends PaymentResult {
	// name, price 멤버변수는 부모의 멤버 사용 (초기화 필요)
	int count;

	// 자손 생성자
	public DetailPaymentResult(String name, int price, int count) {
		super(name, price); // 부모 클래스(PaymentResult)의 생성자 호
		this.count = count;
	}

	void display() { // overriding
		System.out.println("---구매결과----");
		System.out.println("상품 명 : " + name + "  ( 총 " + count + " 개) ");
		System.out.println("총 " + (price * count) / 10 + "포인트가 적립되셨습니다.");
	}
}

public class overriding {
	public static void main(String[] args) {
		DetailPaymentResult dpay = new DetailPaymentResult("DJ MAX RESPECT", 45000, 2);
		dpay.display();
	}
}
```
위 예제에서, super(name, price)를 통해 PaymentResult 클래스의 생성자를 호출하였다.  
만약 super()를 선언하지 않았다면, 조상클래스의 멤버변수들을 초기화하지 못하기 때문에 컴파일 에러가 발생한다.

**결과**
```text
enterance constructor >>
---구매결과----
상품 명 : DJ MAX RESPECT  ( 총 2 개) 
총 9000포인트가 적립되셨습니다.
```