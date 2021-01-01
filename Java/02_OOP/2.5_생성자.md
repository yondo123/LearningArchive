## 생성자
### 생성자(Constructor)
+ 인스턴스가 생성될 때 기본적으로 호출한다.
+ 기본 생성자(Default Constructor)로 해당 클래스의 이름과 동일한 메소드가 생성된다.

### 생성자의 특징
1. 클래스의 이름과 동일하다.
2. 리턴값이 없다.
3. 오버로딩이 가능하다. (한 클래스에 여러개의 생성자가 존재할 수 있다.)
4. 생성자 내부에서 this를 사용하면 다른 생성자를 호출할 수 있다. (단, 코드 첫줄에서만 가능하다)

```java
    class calculatorTest {
        int numA;
        int numB;

        calculatorTest(int a, int b) { // 생성자 (클래스의 이름과 동일)
            numA = a;
            numB = b;
        }
        
        int add() {
            return numA + numB;
        }
    }

    public class constructor_cal {
        public static void main(String[] args) {
            calculatorTest newCal = new calculatorTest(2, 3); //매개변수를 즉시 초기화 
            System.out.println(newCal.add());
        }
    }
```

+ 만약 기본 생성자에만 의존한다면 따로 초기화 메소드를 생성해주어야 한다.
    ```java
		calculatorTest newCal = new calculatorTest();
		newCal.setOperands(3, 5);
        newCal.add();
    ```

### this를 이용한 생성자 호출
+ 생성자에서 `this`를 사용해 다른 생성자를 호출할 수 있다.
+ 생성자를 활용한 게임주문 클래스 실습
    ```java
        //게임 주문 클래스
        //1.게임의 가격, 이름, 수량을 요청받는다.
        //2. 기본값은  65000, FIFA21, 1 이다.
        class orderGame{
            int price;
            String name;
            int count;

            orderGame(){ //밑에 선언된 생성자를 호출 (기본값 초기화);
                this(65000, 1, "FIFA21");
            }
            
            orderGame (int price, int count, String name){ //매개변수가 있을시 변수 초기화
                this.price = price;
                this.count = count;
                this.name = name;
            }
            
            void resultOrder() {
                System.out.println("--주문이 완료되었습니다.--");
                System.out.println("게임명 :"+this.name);
                System.out.println("수량 : "+this.count+" 개(EA)");
                System.out.println("총 가격 : "+this.price * this.count);
                System.out.println("-------------------------");
            }
        }

        public class constuctor_game {
            public static void main(String[] args) {
                orderGame game01 = new orderGame();
                orderGame game02 = new orderGame(44000, 3, "DJ MAX RESPECT");
                game01.resultOrder();
                game02.resultOrder();
            }

        }
    ```