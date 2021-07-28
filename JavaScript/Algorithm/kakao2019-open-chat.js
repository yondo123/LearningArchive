const example = ["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"];

function solution(record) {
    const history = [];
    const answer = [];
    for (let i = 0; i < record.length; i++) {
        const element = record[i];
        const userInfo = {};
        const userName = element.split(' ').length > 2 ? element.split(' ')[2] : null;
        const userId = element.split(' ')[1];
        if (history.some(item => item.userId === userId)) {
            const index = history.findIndex(obj => obj.userId == userId);
            userInfo.status = [];
            history[index].seq.push(i + 1);
            history[index].status.push(element.split(' ')[0]);
            history[index].name.push(userName);
        } else {
            userInfo.userId = userId;
            userInfo.seq = [i + 1];
            userInfo.status = ['Enter'];
            userInfo.name = [userName];
            history.push(userInfo);
        }
    }

    console.log(JSON.stringify(history))
    return answer;
}

solution(example);