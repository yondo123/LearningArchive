- 기존 문자열 결합시 연산자(+)를 사용하였는데 백틱(`) 기호를 이용하여 쉽게 결합

    ```jsx
    //es5
    const a = "choi";
    const b = "seung";
    const c = "jin";
    const name = "안녕 내 이름은 "+a+" "+b+" "+c+" 야!"; //es5
    const simpleName = `안녕 내이름은${a} ${b} ${c} 야!`; //es2015~
    console.log(name);
    console.log(simpleName);
    ```

- 심지어 이중따옴표, 홀따옴표도 같이 표기 가능하다.

    ```jsx
    const text = "템플릿리터럴"
    const simple = `어때? "참" 편하지? ${text}의 '힘'이야`;
    console.log(simple); //어때? "참" 편하지? 템플릿리터럴의 '힘'이야
    ```

- 객체에 담아서 필요할 때 마다 편하게 가져와 쓸 수 있다.

    ```jsx
    const parameters = {
        url : "test/req_data001.jsp",
        userId : "test001",
        reqBody : {index : 1, type : "page"},
        insertData :[{
            key: 'items',
            sql: 'board_list001'
        }],
        callback : ()=>{}
    }
    let { url, userId, reqBody, insertData, callback } = parameters;

    console.log ("totalParameters>>"+JSON.stringify(parameters))
    console.log (`\nurl>>${url}`);
    console.log (`\nreqBody>>${reqBody}`); //[object, object]
    console.log (`\ninsertData>>${JSON.stringify(insertData)}`); //Stringify 메서드로 형변환을 하여 출력할 수 있다.
    ```
    