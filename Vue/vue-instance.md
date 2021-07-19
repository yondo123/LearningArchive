## 인스턴스 초기화
### Vue 2
Vue 앱을 생성하려면 인스턴스 함수를 직접 생성해야했다.  
기본적으로 `root`컴포넌트로 등록된다.  
```js
import Vue from "vue"; //vue core
import App from "./App.vue"; //main vue

const myApp = new Vue({
	render : h => h(App)
});

myApp.$mount('#app');
```

### Vue 3+
`Vue 3`버전 이상부터는 `createApp()`메서드를 사용해 인스턴스를 생성한다.  
```js
import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount('#app');
```
~Vue 2까지 몇몇 메서드 (use, mxin) 사용 시 글로벌 vue 인스턴스들에게 영향을 주는 문제점이 있다고 한다.  
이를 해결하기 위해서 `createApp`을 통해 독립적인 인스턴스를 구성할 수 있게 되었다.  
(공식 문서에서는 이를 **App Instance**라고 칭한다.)  
만약 관리자 기능과 일반 사용자들이 쓰는 메인 기능이 포함된 프로젝트를 `createApp`을 이용해 구성해본다면, 아래와 같이 셋팅할 수 있다.  
```js
import router from './router'
import mainApp from './mainApp.vue'
import adminApp from './adminApp.vue'

//관리자 App에만 라우팅 기능 사용
const adminApp = vue.createApp(adminApp)
adminApp.use(router);
adminApp.mount('#admin-app');

const mainApp = vue.createApp(mainApp)
mainApp.mount('#main-app');
```

## 참고자료
+ [**Vue School**](https://vueschool.io/articles/vuejs-tutorials/the-benefits-of-the-vue-3-app-initialization-code/)
+ [**vuejs/rfcs**](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md)