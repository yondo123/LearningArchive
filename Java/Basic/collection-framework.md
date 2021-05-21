### 컬렉션 프레임워크
다수의 데이터를 다루는 데 다양하고 풍부한 클래스들을 제공한다.  

### 핵심 인터페이스  
**List**  
순서가 있는 데이터의 집합, `중복`을 허용한다.  
아래 메소드는 `list, set`의 조상 인터페이스인 Collection 인터페이스의 메소드이다.
| 메소드 | 설명 |
| ------ | ----------- |
| add, addAll | 지정된 객체 또는 컬렉션의 객체들을 삽입 |
| clear() | 컬렉션의 모든 객체를 삭제 |
| conatains | 지정된 객체 또는 멤버들이 해당 컬렉션에 포함되어있는지 확인 |
| remove, removeAll | 지정된 객체 삭제|
| isEmpty() | 컬렉션이 비어있는지 확인|
| size | 객체의 개수를 반환 |

+ ArrayList
+ LinkedList
+ Vector

**Set**  
순서를 유지하지 않는 데이터의 집합, 중복을 허용하지 않는다.
+ HashSet
+ TreeSet

**Map**  
키(Key), 값(Value)의 한 쌍으로 이루어진 데이터의 집합, 순서는 유지되지 않고 중복을 허용한다.
| 메소드 | 설명 |
| ---- | ---- |
| clear() | Map의 모든 객체들을 삭제한다.|
| containsKey | 지정된 Key객체와 일치하는 Map의 객체가 존재하는지 확인 |
| containsValue | 지정된 value객체와 일치하는 value 객체가 존재하는지 확인 |
| equals | 동일한 맵인지 비교 |
| get(key) | 지정한 key 객체에 대응하는 value 객체를 반환 |
| KeySet | 모든 Key 객체를 반환 |
| values | 모든 value 객체를 반환 |

+ HashMap
+ TreeMap
+ Hashtable
+ Properties

### ArrayList
`List`인터페이스를 구현하기 때문에 데이터 저장 순서가 유지되고, 중복을 허용한다.  
`Object`배열을 멤버변수로 사용하기 때문애, 모든 종류의 객체를 담을 수 있다.

```java
ArrayList list = new ArrayList();
// 데이터 추가
list.add("a");
list.add("2");
list.add(3);
System.out.println(list + "size : " + list.size());
//[a, 2, 3]size : 3

//객체 삭제
list.remove(1); 
list.remove("2");
System.out.println(list + "size : " + list.size());
//[a, 3]size : 2
```

### LinkedList
ArrayList와 동일한 `List`인터페이스를 구현했기 때문에 사용 메소드는 동일하다.  
비교를 하자면, 순차적으로 추가/삭제하는 경우는 ArrayList가 빠르고 중간 데이터를 추가/삭제 하는 경우는 LinkedList가 더 빠르다.
```java
    LinkedList linkedl = new LinkedList();
```

### HashSet
중복을 허용하지 않는 데이터 집합이다. list와 마찬가지로 `add`를 사용해 객체를 추가할 수 있다.
```java
HashSet hs = new HashSet();
hs.add(1);
hs.add(2);
hs.add(2);
System.out.println("hash>> " + hs);
//hash>> [1, 2]
```

### Iterator
컬렉션에 저장된 요소를 접근할 때 사용하는 인터페이스.  
**hasNext()**  
읽어올 다음 요소가 있는지 검사하고 true / false를 반환한다.

**next()**  
다음 요소를 읽어온다.  

**remove()**  
next()로 읽어온 요소를 삭제한다. (next 호출 후 시행)  
`map` 컬렉션에서는 key와 value를 쌍으로 저장하고 있기 때문에, keySet()이나 entrySet()을 사용해 Set 형태로 얻어온 이후 iterator()를 호출하여야 한다.

```java
HashSet hs = new HashSet();
hs.add(1);
hs.add(2);
hs.add(3);

//Iterator
Iterator it = hs.iterator();
while (it.hasNext()) {
	System.out.println("value : " + it.next());
}
```
### HashMap
키와 값을 `Object` 형태로 저장한다. 즉, key-value 모두 어떠한 값이 와도 되긴 하다.  
하지만 주로 key 값을 String 형태로 저장하면서 사용하고 있다.

```java
public class HashMapEx {
	public static void main(String[] args) {
		int totalPrice = 0;
		HashMap map = new HashMap();

		// 객체 삽입
		map.put("fifa21", 62000);
		map.put("out golf 4", 48000);
		map.put("DJ MAX Respect", 36000);

		System.out.println("======금일 입고 목록=====");
		Set items = map.entrySet();
		Iterator it = items.iterator();
		while (it.hasNext()) {
			Map.Entry g = (Map.Entry) it.next();
			int price = (int) g.getValue();
			totalPrice += price;
			System.out.println("입고 게임 : " + g.getKey() + ", 가격 : " + g.getValue() + " 원 ");
		}
		System.out.println("* 총 수량 : " + items.size() + " EA");
		System.out.println("* 총 가격 : " + totalPrice / 3);
		System.out.println("======================");
	}
}

/*
======금일 입고 목록=====
입고 게임 : fifa21, 가격 : 62000 원 
입고 게임 : out golf 4, 가격 : 48000 원 
입고 게임 : DJ MAX Respect, 가격 : 36000 원 
* 총 수량 : 3 EA
* 총 가격 : 48666
======================
*/
```
