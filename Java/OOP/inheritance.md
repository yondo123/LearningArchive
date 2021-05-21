### 상속
원 클래스를 변경하지 않으면서 부모 클래스로 삼으면서 동일한 멤버변수를 할당받을 수 있다.  
조상 클래스, 자손 클래스로 나누어진다.  
사실 모든 클래스를 생성할 때, 기본으로 `Object` 클래스로부터 상속받도록 설계되어있기도하다.

```java
class Parent { 
    int number = 10;
}

class Child extends Parent { //Child 클래스는 Parent 클래스에 상속되었다.
    system.out.print(this.number);
}

class Chil02 extents Parent {
    String name = "Choi";
}
```
Child와 Chil02 클래스는 모두 Parent클래스를 상속받고 있지만 Child - Child02 클래스 간 관계는 아무 관계도 성립되지 않는다. 

### 예제
![java-inheritance](https://user-images.githubusercontent.com/46988995/105047506-c40d9a80-5aad-11eb-8e29-6ad46e7e086c.png)

### 상속관계와 포함관계
상속을 통해 멤버변수들을 재사용할 수 있다는 것을 알았다.  
사실 포함관계(인스턴스 생성) 방식으로도 충분히 재사용할 수 있다. 무엇보다, 구분이 제일 중요하다!

**is-a(~은 ~이다), has-a(~은 ~을 포함한다)**  

만약 간단한 결제 메소드를 구현한다고 가정하면, 결제에 필요한 정보들이 항상 따라온다. `결재는 장바구니정보가 포함된다`가 더 어울릴 것이다.

+ has-a 방식
```java
package ch02;

//장바구니 클래스  
class ItemBasket {
	String name = "PlayStation 5";
	String manufactor = "sony";
	int price = 500000;
	int budget = 5000;
}

//구매 클래스  
class PaymentItem  {
	ItemBasket bk = new ItemBasket();
	int balance = bk.budget - bk.price;
	void buyItem() {
		System.out.println("결제를 진행합니다.\n"+"상품명 :"+bk.name+"\n가격 : "+bk.price+"원\n"+"---------------------------");
		if (balance >= 0) {
			System.out.println("구매성공 하였습니다. 잔액 : "+balance);
		} else {
			System.out.println("구매실패, "+Math.abs(balance)+"원 부족!!");
		}
	}
}

public class inheritance_shop {
	public static void main(String[] args) {
		PaymentItem pm = new PaymentItem();
		pm.buyItem();
	}
}
```

+ is-a 방식
```java
//장바구니 클래스  
class ItemBasket {
	String name = "PlayStation 5";
	String manufactor = "sony";
	int price = 500000;
	int budget = 5000;
}

//구매 클래스 (장바구니 클래스에 상속) 
class PaymentItem extends ItemBasket {
	int balance = this.budget - this.price;

	void buyItem() {
		if (balance >= 0) {
			System.out.println("구매성공 하였습니다. 잔액 : "+balance);
		} else {
			System.out.println("구매실패, "+Math.abs(balance)+"원 부족!!");
		}
	}
}

public class inheritance_shop {
	public static void main(String[] args) {
		PaymentItem pm = new PaymentItem();
		pm.buyItem();
	}
}
```