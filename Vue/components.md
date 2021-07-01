## 컴포넌트 개념
화면의 영역을 분리하여 개발하는 것, Vue에서 최상위 컴포넌트는 `root`이다.  
컴포넌트 구성의 장점은 요소들을 재사용함으로써 개발 생산성이 향상되고, 컴포넌트들은 서로 관계가 형성된다.

### 전역 컴포넌트  
주로 플러그인, 라이브러리 등 앱 전역에서 사용 할 공통 컴포넌트를 작성한다.  
전역 컴포넌트를 생성하면 **새 인스턴스를 생성할 때 마다 기본적으로 생성한다.**
```js
//컴포넌트 생성
Vue.component('app-header', {
    template: '<h1>header</h1>' //component Template
});

Vue.component('app-content', {
    template: '<p>This is Vue-Component Write</p>'
});

//인스턴스 생성
new Vue({
    el: '#app' //selector
});
```

### 지역 컴포넌트
Vue 인스턴스 내에 직접 삽입하는 방식이다. `components`로 정의한다.  
Tree 구조로 구성할 수 있으며, 부모-자식 간 컴포넌트 사이 통신이 가능하다.  
지역 컴포넌트는 해당 인스턴스에서만 동작한다. 따라서 인스턴스를 새로 생성할 때 마다 컴포넌트를 등록해주어야 한다.  
```js
new Vue({
    el: '#app', //selector
    components: {
        //지역 컴포넌트 정의
        'app-footer': {
            template: '<footer>Footer!</footer>'
        }
    }
});
```
### Template
템플릿 내에 생성한 컴포넌트를 태그로 지정한다.
```html
<div id="app">
        <!--컴포넌트에 등록한 템플릿 지정-->
        <app-header></app-header>
        <app-content></app-content>
</div>
```

## 컴포넌트 통신 방식
![components](https://user-images.githubusercontent.com/46988995/124051330-4041dc00-da57-11eb-9132-9c411b842f3a.png)
Vue 컴포넌트는 각 고유한 데이터 유효범위를 갖는다.  
부모 컴포넌트의 데이터가 바뀌면 하위 컴포넌트의 데이터가 바뀌지만, 반대로 하위 컴포넌트의 데이터가 바뀌면 부모 컴포넌트가 바뀌지 않는다. `(단방향 흐름)`  

### props
상위 컴포넌트에서 하위 컴포넌트로 데이터 전달 시 사용한다.  
vue에서는 `v-bind`디렉티브로 속성에 접근할 수 있는데, 하위 컴포넌트에서 상위 컴포넌트의 데이터 속성에 접근이 가능하다.  
자세하게 말하면, v-bind로 **해당 컴포넌트에서 정의된 props** 속성에 접근할 수 있고 `props`의 역할은 부모의 `data`영역에 접근할 수 있게 해주는 속성이라고 볼 수 있다.
```html
<!--template-->
<div id="app">
	<app-header v-bind:propsdata="message"></app-header>
</div>
```
```js
//하위 컴포넌트
var appHeader = {
    template: '<h1>header</h1>',
    props: ['propsdata']
}

// Vue 인스턴스 (root 컴포넌트)
new Vue({
    el: '#app',
    components: {
        'app-header': appHeader
    },
    data: {
        message: 'hello Vue~~!!'
    }
});
```
### emit
props와는 반대로 하위 컴포넌트에서 상위 컴포넌트로 이벤트를 전달할 수 있다.  
이벤트를 전달함으로써, 콜백내 `this`를 통해 상위 데이터에 접근하는 방법이다.  
컴포넌트 `methods` 속성 내에 여러 이벤트들을 정의할 수 있는데, 정의한 `custom event`를 트리거하려면 `$emit`메서드에 이벤트 이름을 전달하면 된다.  
```html
    <div id="app">
        <app-content v-on:add="addNumber"></app-content>
        <p>number : {{number}}</p>
    </div>
```
```js
    //하위 컴포넌트
    const appContent = {
        template: '<button v-on:add="addNumber">add</button>', 
        methods: {
            addNumber: function (params) {
                this.$emit('add'); //상위 컴포넌트에 binding 할 이벤트
            }
        }
    }

    //Vue 인스턴스 (root)
    const vueObject = new Vue({
        el: '#app',
        components: { //local component
            'app-content': appContent
        },
        methods: {
            addNumber: function () {
                //this 키워드로 정의한 data에 접근 가능
                console.log(this.number++);
            }
        },
        data: {
            number: 1
        }
    });
```

## 동등 컴포넌트 간 통신
+ **내가 생각하는 컴포넌트 통신**
    ![same-level](https://user-images.githubusercontent.com/46988995/124051372-594a8d00-da57-11eb-8f33-0098bb609870.png)
    실제로 기존 DOM 조작 방식(JQuery)에 익숙한 나는 위의 사진처럼 종속관계가 아니어도 값을 주고받을 수 있을줄 알았으나, 아래와 같이 해야한다고 한다. 

+ **실제 컴포넌트 통신 방법**
    ![components-com](https://user-images.githubusercontent.com/46988995/124051382-5fd90480-da57-11eb-8a4d-7c7ba02b3f41.png)
    위에 설명했던 컴포넌트의 특성을 살려 동등 레벨의 컴포넌트(부모가 동일한)가 데이터를 전달하려면, **emit(상위 컴포넌트로 전달) -> props(하위 컴포넌트로 전달)** 과정을 거쳐야 한다.

만일 같은 레벨의 header와 footer 사이 데이터 전달이 필요하다면 먼저 `body`에 데이터를 전달해야한다. `($emit)`
```html
<div id="body">
        <app-header></app-header>
        <app-footer v-on:message="bindData"></app-footer> 
</div>
```

```js
//footer 컴포넌트
const footer = {
    template: '<div><h3>FOOTER</h3><button v-on:click="passData">trans-data</button></div>',
    methods: {
        passData: function () {
            this.$emit('message', 'footer-data'); //해당 이벤트에 파라미터 전달
        }
    },
}

new Vue({
    el: '#body',
    components: {
        'app-header': header,
        'app-footer': footer
    },
    data: {
        message: 'test'
    },
    methods: {
        bindData: function (param) {
            this.message = param;
        }
    },
});
```
이제 부모의 message는 하위 컴포넌트에서 전달한 데이터로 변경이 되어있다.  
`props`속성을 통해 접근하면된다.
```html
<app-header v-bind:headerdata="message"></app-header>
```
```js
//header 컴포넌트
const header = {
    template : '<h2>Header</h2>',
    props : ['headerdata']
}
```

## 참고자료
+ [**Vue 공식문서 - vm-emit**](https://vuejs.org/v2/api/#vm-emit)
+ [**캡틴판교님의 Vue 기초 강의**](https://www.inflearn.com/course/Age-of-Vuejs/)


