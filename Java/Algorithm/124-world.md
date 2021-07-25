[**문제 보기**](https://programmers.co.kr/learn/courses/30/lessons/12899)
```java
package algorithm;

import java.util.Iterator;

public class LV2_124_World {
	static void solution(int n) {
		String[] number = new String[] { "4", "1", "2" };
		int size = number.length;
		String answer = "";

		while (true) {
			int value = (int) n / size;
			int rest = n % size;
			if (rest < 1) {
				value -= 1;
			}
			n = value;
			answer = number[rest] + answer;
			if (n == 0) {
				break;
			}
		}

	}

	public static void main(String[] args) {
		solution(30);
	}
}
```