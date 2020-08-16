var board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]];
var moves = [1,5,3,5,1,2,1,4];

function solution(board, moves) {
    var answer = 0;
    var resArray = [];
    for (let i = 0; i < moves.length; i++) {
        if(board[moves[i]-1][board[moves[i]-1].length-1] > 0){
            resArray.push(board[moves[i]-1][board[moves[i]-1].length-1]);
        }
        board[moves[i]-1].pop();
    }
    
    for(let j = 0; j < resArray.length; j++){
        if(resArray[j] === resArray[j+1]){
            answer+=2;
        }
    }
    console.log(answer);
    return answer;
}

solution(board, moves);