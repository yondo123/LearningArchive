## Javscript Timer
+ 자바스크립트는 기본적으로 `싱글 스레드`로 동작한다.
    - 자바스크립트 타이머는 `비동기 이벤트` 핸들러로 실행중인 핸들러가 없을 경우에만 동작하는 방식이다. (물론 브라우저의 처리 방식에 따라 다를 수 있다.)
    - 즉, FIFO(선입선출) 형태로 메시지 큐에 전달된다음, 실행중인 블록이 없을 때 비로소 실행된다.
    - 만약 이 과정에서, 타이머가 실행되기 전 코드 블록에서 다른 타이머나 지연 함수가 발생한다면, 그 시간만큼 지연된다.

### (1) 타이머 생성과 제거
+ `Window`에 속한 메소드

| Method | Description |
| ------ | ----------- |
| setTimeout(fn, delay)   | 일정 시간이 진행되면 전달받은 콜백을 실행시킨다. |
| clearTimeout(id) | 해당 타이머(Timeout)를 취소한다. (단, 실행시키지 않은 상태) |
| setInterval(fn, delay) | `clearInterval()`되지 않을 때까지, 일정 시간마다 주기적으로 콜백함수를 실행시키는 타이머를 생성한다. |
| clearInterval(id) | 해당 타이머(Interval)를 취소한다. (단, 실행시키지 않은 상태) |

### (2) 싱글 스레드로 인한 타이머 지연
+ 아래 코드를 보면, 3초뒤에 first 메시지를 담은 로그가 출력되길 예상했지만, 결과는 상반되게 명령문을 먼저 실행하고, 이후에 비로소 setTimeout() 코드가 실행된다.
+ 이는, 인터페이스 이벤트나 타이머 같은 `비동기 이벤트` 처리용 핸들러들이 실행중인 핸들러가 없을 경우에만 실행된다는 특성 때문에 벌어지는 현상이다.
    - 이러한 현상은 `HTML5`에서 정의된 웹워커 방식으로 해결할 수는 있다.
    ```js
    setTimeout(function name() {
        console.log('first '+new Date().toUTCString())
    }, 3000);

    for (let index = 0; index < 10; index++) {
        setTimeout(function () {
            console.log('dump message');
        }, 1000);
    }
    ```

    ```text
    //result 
    dump message
    dump message
    dump message
    dump message
    dump message
    dump message
    dump message
    dump message
    dump message
    dump message
    first Sat, 27 Jun 2020 09:11:42 GMT
    ```
### (2)타임아웃과 인터벌의 차이점
+ 타이머 메소드에는 timeout과 interval 메소드가 있는데 둘 차이라면, 일정 시간마다 주기적으로 콜백을 실행하느냐 마냐의 차이이다.
+ 물론, timeout만으로도 interval기능을 구현할 수 있다. (재귀방식)
    ```js
        setTimeout(funtion callback()(){
            //code
            setTimeout(callback(), 1000);
        }, 1000);
    ```
+ 로직만 보았을때는 인터벌과 큰 차이는 없을 것 같지만, `지연 시간`에서 차이가 발생한다.
+ setTimeout()은 마지막 콜백의 실행과 상관없이 무조건 delay시간 후에 콜백을 실행하려고 시도할 것이다, "자바스크립트 타이머는 정확한 시간을 보장하지 않는다" 라는 것을 기억하자.
+ 즉 interval()은 매 (delay)ms마다 발생하는 것이고, timeout()은 실행 후 (delay)ms으로 콜백을 예약하는 것이다. 지연된 시간만큼 시간 오차는 더욱 늘게 될 것이다.
    - 그냥 마음편히 `setInterval()`을 사용하자 ㅎㅎ

### (3) 정리
1. 자바스크립트 엔진은 싱글 스레드로 작동한다.
2. 비동기 핸들러들은 실행을 기다리며 Queue에 저장한다. (실행 가능할 때까지 대기)
3. setTimeout()과 setInterval()은 이벤트 발생 빈도를 결정하는 방식에 근본적으로 차이가 있다.

### 참고자료
> 자바스크립트 닌자 비급 (John Resig 저)