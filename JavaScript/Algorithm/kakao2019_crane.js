/*
  URL : https://programmers.co.kr/learn/courses/30/lessons/64061?language=javascript 
*/

var board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]]; //테스트케이스 - 인형뽑기 박스
var moves = [1,5,3,5,1,2,1,4]; //테스트케이스 - 크레인 움직임

//배열 비교함수
function itemCompare(arr, cnt){
    let count = cnt ? cnt : 0; //누적된 cnt가 없다면 0으로 초기화
    for(let i=0; i<arr.length; i++){
        if(!arr[i]) continue;
        if(arr[i]==arr[i+1]){ //양 옆 요소가 같다면 제거 후, 다시 비교
            count+=2;
            arr.splice(i, 2);    
            return itemCompare(arr, count);
        }
    }
    return count;
}

//풀이 함수
function solution(board, moves) {
    let resArray = []; //뽑기 결과 배열
    for (let i = 0; i < moves.length; i++) {
        let targetPos = moves[i]-1;
        for(let j = 0; j < board[moves[i]-1].length; j++){
            const item = board[j][targetPos];
            if(item > 0){ 
                resArray.push(item);
                board[j][targetPos] = 0;
                break;
            }
        }
    }
    return itemCompare(resArray)
}

solution(board, moves);