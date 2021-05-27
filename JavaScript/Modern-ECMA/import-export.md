## 가져오기와 내보내기
`import`와 `export`문을 사용해 쉽게 모듈화 할 수 있고 프로젝트 내 파일 간에 코드를 서로 공유를 할 수 있다.

### export  
만약 코드를 공유하고 싶다면 `export`문을 사용한다.  
함수, 변수, 클래스를 내보낼 수 있다.
```js
//📂import/util.js
const constants = {
    message : 'sample message!'
}

const requestUrl = '/request';

const private = {  //private 객체는 외부에서 접근할 수 없다.
    privateKey : '1234'
}

export{constants, requestUrl}; //constants 객체 export
```

파일 하단에서 한번에 내보내는 대신, 각각 export 할 대상에 키워드를 붙여 내보낼 수도 있다.  
```js
export function getResource(resource){
    return resource;
}
```

### import
`import`를 통해 상대 경로로 작성하여 해당 파일을 가져올 수 있다.  
```js
//📂main.js
import * as util from './import/util.js' //'./import/util.js'파일을 'util' 변수로 사용
import { requestUrl } from './import/util.js' //필요한 대상만 import
```

### 브라우저에서 사용  
해당 import, export 문법을 사용하려면 사용하려는 스크립트 속성에 `module`을 추가해주어야 한다.  
```html
<script type="module" src="main.js"></script>
```

### export default  
내보내기 기본값 `default`를 사용하면 중괄호를 사용안해도 된다.  
(특히 클래스를 불러올 때 유용하다 -> 한 개의 파일에는 한 개의 클래스만 두는 것이 좋기 때문!)  
**export**  
```js
//📂import/util.js
export default addNumber(a, b){
    return a + b;
}
```
**import**  
```js
//📂main.js
import addNumber from './import/util.js'
const a = 1;
const b = 2;
addNumber(1,2); //3
```