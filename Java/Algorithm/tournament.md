[**문제 보기**](https://programmers.co.kr/learn/courses/30/lessons/12985)

```java
package algorithm;

public class LV2_Tournament {
	static int setNumber(int number) {
		number = (int) (Math.ceil((double) number / 2));
		return number;
	}
	
	static void solution(int num, int player, int rival) {
		int answer = 1;
		while (true) {
			if (setNumber(player) == setNumber(rival)) {
				break;
			} else {
				answer++;
				player = setNumber(player);
				rival = setNumber(rival);
			}
		}
	};

	public static void main(String[] args) {
		solution(8, 4, 7);
	}
}

```