var board = [[1,1,1,1,1],[0,0,0,1,3],[0,0,5,1,1],[4,4,4,4,1],[3,5,1,1,1]];
var moves = [1,4,3,5,1,2,1,4];

function solution(board, moves) {
    var answer = 0;
    var resArray = [];
    var latestItem = 0;
    for (let i = 0; i < moves.length; i++) {
        if(board[moves[i]-1][board[moves[i]-1].length-1] > 0){
            resArray.push(board[moves[i]-1][board[moves[i]-1].length-1]);
        }
        board[moves[i]-1].pop();
    }

    console.log(resArray);

    for(let j = 0; j < resArray.length; j++){
        console.log(j);
        if(!resArray[j]){
            continue;
        }
        if(resArray[j] === latestItem && j > 0){
            answer+=2;
            resArray.splice(j,1);
        }
        latestItem = resArray[j];
    }
    console.log(answer);
    return answer;
}

solution(board, moves);