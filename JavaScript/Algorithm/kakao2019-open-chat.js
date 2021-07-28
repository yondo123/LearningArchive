const example = ["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"]

function solution(record) {
    let userIndex = new Map();
    const answer = [];
    for (let i = 0; i < record.length; i++) {
        const recordItem = record[i].split(' ');
        const status = recordItem[0];
        const userId = recordItem[1];
        const userName = recordItem[2];
        let context = '';

        if (userName) {
            userIndex.set(userId, userName);
            if (status == 'Enter') {
                context = '들어왔습니다.';
                answer.push(`${userId} ${context}`);
            }
        } else {
            context = '나갔습니다.';
            answer.push(`${userId} ${context}`);
        }
    }

    answer.forEach((item, index, array) => {
        const userId = item.split(' ')[0];
        array[index] = `${userIndex.get(userId)}님이 ${item.split(' ')[1]}`
    });
    console.log(JSON.stringify(answer));
    return answer;
}

solution(example);