## 스크롤
+ 마우스를 움직이면 스크롤 이벤트가 발생한다.
+ `x-value` 는 마우스의 가로축, `y-value`는 문서의 세로축을 따른는 픽셀
    ```js
    window.scroll(x-value, y-value); 
    window.scroll(options);
    ```

### (1)문서의 상.하단으로 이동시키기
+ `scrollTop()` 메서드를 이용한다.
    ```js
    $("body").scrollTop(0); 

    //간혹 'body'가 먹히지 않는다면 전체 위임
    $('html, body').scrollTop(0);

    //순수 자바스크립트
    function goTop(){
        document.documentElement.scrollTop = 0; 
    }
    ```

### (2) 새로고침시 스크롤 상단으로 이동하기
```js
    setTimeout(function () {
        scrollTop(0, 0);
    }, 100);
```

### (3) 무한 스크롤링 구현
```js
$(document).ready(function () {
    for (var i = 0; i < 20; i++) {
        $('<h1>Sample TextLine >> ' + i + '</h1>').appendTo('body');
    }

    var callback = function () {
        return $("<h1>Scroll Detect! create Text Line!!</h1>").appendTo('body');
    }

    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop() + $(window).height();
        var documentHeight = $(document).height();
        if (scrollHeight == documentHeight) { //스크롤 높이와 문서의 높이가 같을 때
            callback();
        }
    });
});
```