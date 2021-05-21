## 제어자 (modifilter)
멤버변수 또는 메서드에 사용되며, 외부에서 접근할 수 있는 범위를 정의하는 것이다. (즉, 규제를 하는 것) 
크게 접근제어자와 그 외 제어자(기타제어자)로 나눌 수 있다.  
만약 클래스나 멤버변수를 생성할 시 별도의 제어자를 선언하지 않았다면, `default`로 설정되어 있다.

### 일반제어자
**static**  
주로 클래스변수(static 변수)를 초기화하는 데 사용하며, 클래스가 메모리에 로드될 때 단 한번만 수행한다. 메소드에 사용하면 클래스 메소드로 바꾸어준다. 인스턴스를 멤버를 사용하지 않는다면 static 메소드로 선언하는 것이 효율적이다.
```java
class StaticTest {
	static String introduceMyself(String name, String age) {
		return "제 이름은 "+name+"이고 "+age+" 살 입니다.";
	}
}

public class modifilterTest {
	public static void main(String[] args) {
		System.out.println("자기소개 시작 :  "+StaticTest.introduceMyself("choi", "27"));
	}
}
```

**final**  
주로 상수에 사용되는 제어자로, 변수에 사용하게 되면 값을 바꾸지 못한다. 또한 클래스에 사용하면 해당 클래스의 자손클래스를 생성하지 않는다. 메소드에 사용하면 해당 메소드를 재정의할 수 없다. 따라서 값이 바뀌지 않는곳에 사용한다. 보통 인스턴스를 생성할 때 생성자에서 단 한번 초기화를 할 수 있다.  

```java
class FinalAcessTest {
	// final 메소드 생성
	final String COUNTRY;
	final String NAME;

	public FinalAcessTest(String country, String name) {
		// 생성자 함수로 단 한번 초기화 가능
		COUNTRY = country;
		NAME = name;
	}

	public String displayCompany() {
		return "해당 회사의 국가는 " + COUNTRY + " 입니다. \n" + NAME + " 의 정보..";
	}
}

public class modifilterTest {
	public static void main(String[] args) {
		FinalAcessTest fa = new FinalAcessTest("USA", "EA Sports");
//		fa.COUNTRY = "KOREA";  //error
		String country = fa.displayCompany();
		System.out.println(country);
	}
}
```
### 접근제어자
클래스 내부에 선언된 데이터(멤버, 클래스)들을 보호하기 위해 사용한다. 또한 외부에는 불필요한, 내부적으로만 사용되는 부분을 정의할 수 있다.  
**접근제어자 구분**  

| 제어자 | 동일 클래스 | 동일 패키지 | 자손 클래스 | 전체 | 설명 |
| ------ | ----- | ------- | ----- | ------- | ---- |
| public | O | O | O | O | 접근 제한이 없음 |
| protected | O | O | O | X | 같은 패키지 + 다른 패키지의 자손클래스에서 접근 가능 | 
| default | O | O | X | X | 같은 패키지에서만 접근 | 
| private | O | X | X | X | 같은 클래스 내에서만 접근 |

간단한 문자열 출력 클래스를 동일패키지(modifier_same.java), 외부패키지(modifier_different.java)에 1개씩 만들고, 메인 클래스에서 접근하는 예제이다.  

**접근제어자 클래스**
```java
package outerPackage;

public class modifier_different {
	//외부클래스 public
	public void publicMethod() {
		System.out.println("access success >> different package public ");
	}
	
	//외부클래스 default
	void defaultMethod() {
		System.out.println("access success >> different pacakge default");
	}
	
	//외부클래스 protected
	protected void protectedMethod() {
		System.out.println("access success >> different package protected");
	}
	
	//외부클래스 private
	private void privateMethod() {
		System.out.println("access success >> different package private");
	}
}
```

**메인 클래스**
```java
package mainPackage;
import outerPackage.*; 

/*외부 패키지  접근 클래스 */
class OuterModifierTest extends modifier_different{
	// 외부패키지의 자손클래스는 protected접근자까지 접근할 수 있음 
	public OuterModifierTest() {
		this.publicMethod();
		this.protectedMethod();
	}
	static void accessOuterMethod() {
		modifier_different mds = new modifier_different();
		// 외부  패키지는 public만 접근가능
		mds.publicMethod();
	}
}

/*동일패키지 접근 클래스 */
class SameModifierTest{
	static void accessSameMethod() {
		modifier_same mfs = new modifier_same();
		//동일패키지에서는 private만 접근 불가 
		mfs.publicMethod();
		mfs.defaultMethod();
		mfs.protectedMethod();
	}
}

/*메인클래스 */
public class modifierTest {
	public static void main(String[] args) {
		//동일 클래스 
		SameModifierTest.accessSameMethod();
		//서브 클래스 (생성자 호출 용)
		OuterModifierTest mds = new OuterModifierTest();
		mds.publicMethod();
		//외부 클래스 
		OuterModifierTest.accessOuterMethod();
	}
}
```

**실행결과**
```text
access success >> same package public 
access success >> same pacakge default
access success >> same package protected
access success >> different package public 
access success >> different package protected
access success >> different package public 
access success >> different package public 
```
