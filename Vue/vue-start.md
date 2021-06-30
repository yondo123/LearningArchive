## Vue 설치하기 및 프로젝트 구조
### CLI?
`cli`란 Command Line Interface, 즉 명령어 기반의 인터페이스 환경을 의미한다.  
vue 프로젝트 도입시 전체적인 웹애플레이케이션을 관리하려면 지금 소개하는 `cli`패키지를 설치하면 되고,  
별도의 페이지에서 국한적으로 사용하려면 `cdn`방식으로도 사용할 수 있다.  
CDN 방식을 사용하려면 아래 소스를 참고하면 된다.

```html
<head>
    <!-- Vue-CDN -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <!-- template -->
    <div id="app">
         <app-footer></app-footer>
    </div>
</body>
<script>
        //vue 인스턴스 생성
        new Vue({
            el: '#app', 
            components: {
                'app-footer' : {
                    template : '<footer>Footer!</footer>'
                }
            }
        });
</script>
```

### Vue 설치하기
먼저 **npm (node package manager)** 및 [**node**](https://nodejs.org/en/)가 설치되어있어야 한다.  
특히 **node 는 vue에서 10.X 버전 이상을 권장하기 때문에, 버전을 확인하고 10.X이상 버전을 준비하는 것이 필수이다.**

```bash
    node -v #현재 node 버전 확인 (LTS 10.X 버전 이상을 설치해야 한다.)
    npm -v #npm 버전 확인
    npm install -g @vue/cli #vue-cli install
```

### Vue-cli 버전 별 프로젝트 생성  
vue cli 버전마다 프로젝트 생성 방법이 조금 다르다.  
혹시 2.X 환경으로 vue를 생성해야 한다면, 직접 프로젝트 템플릿을 지정해주어야 한다.
+ **2.X**
  + **vue-webpack-boilerplate** : 대형 프로젝트 규모에 적합 (hot-reload, router, unit test, linting 포함)
  + **webpack-simple**  : 빠른 프로토타입 구축 목적에 적합
  + **vue-simple-boilerplate** : 하나의 html만 존재 (튜토리얼 수준에 적합)
   ```bash
    # vue init 'project-template-type' 'project-directory'
    vue init webpack-simple vue-project
  ```
+ **3.X~**  
  3버전 들어서 프로젝트 생성이 간편하게 되었다.  
  `create`로 프로젝트 경로만 잡아주고 생성하고 직접 필요한 모듈을 선택해서 설치할 수 있다.  
  물론 `default`로 필수 모듈(babel, linting)만 설치하고 필요한 모듈은 알아서 설치해도 상관없다.
  ```bash
    # vue create 'project-directory'
    vue create vue-project
  ```

### 프로젝트 구조
vue 프로젝트 필수 구조
```text
    root
    ├─public
    │  └─index.html : 로컬 서버 실행시 제일 처음 참조되는 페이지
    ├─src
    │  └─main.js : 프로젝트 전체에 대한 정보 (vue 인스턴스 생성)
    │  └─app.vue : 메인 컴포넌트    
    ├─package.json : 프로젝트 모듈 및 의존성 설정 정보

```
+ **index.html**  
    `webpack`을 통해 여러 컴포넌트 vue, 리소스들이 통합해 주입되는 페이지이다.    
    즉 페이지 내용이 변경될 때 마다 페이지를 reload하는 것이 아닌 변경된 요소만을 탐색해 내용을 변경한다.  
    vue는 이러한 **가상 DOM을 활용하기에 최적화된 framework**이고 이러한 구조를 SPA (Single Page Application)라 한다.
    ```html
    <body>
        <div id="app"></div>
    </body>
    ```
+ **main.js**  
    프로젝트에 대한 전체 정보를 담고 있는 main 스크립트 파일이다.  
    최상위 인스턴스로써, 여러 컴포넌트들을 공유할 수 있고 상태`state`들을 관리한다.
    ```js
    import App from './App.vue'; //main component
    new Vue({
        el: '#app',
        render: h => h(App)
    });
    ```
+ **package.json**  
    프로젝트에서 사용중인 여러 모듈을 관리하는 곳이다.   
    특히, `devDependencies`에서 프로젝트에서 사용중인 여러 플러그인들을 확인할 수 있다. **(의존성 관리)**
    ```json
    "devDependencies": {
        "@vue/cli-plugin-babel": "~4.5.0",
        "@vue/cli-plugin-eslint": "~4.5.0",
        "@vue/cli-service": "~4.5.0",
        "babel-eslint": "^10.1.0",
        "eslint": "^6.7.2",
        "eslint-plugin-vue": "^6.2.2",
        "vue-template-compiler": "^2.6.11"
    }
    ```