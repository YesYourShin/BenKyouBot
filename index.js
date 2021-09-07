require('dotenv').config();
const token = process.env.TOKEN;
const chId = process.env.CHANNELID;
const JinHongId = process.env.JINHONGID;
const discord = require('discord.js');  // discord.js를 import 해줍니다.
const app = new discord.Client(); // discord.Client 인스턴스 생성
const BlockQueue = require('block-queue');

app.on('ready', () => { // 여기서 사용되는 Arrow Function은 콜백함수입니다.
    console.log(`I am Ready ${app.user.tag}`); // Bot이 준비가 되면 실행할 콜백함수입니다.
});

app.on('voiceStateUpdate', (oldState, newState) => {
    const checkCh = newState.guild.channels.cache.get(chId);
    const name = newState.member.user.username;

    // 유저가 음성 채널에 들어왔을 때 혹은 나갔을 때 실행
    if(oldState.channelID != newState.channelID) {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth()+1;
        const date = time.getDate();
        const day = (time.getDay() == 0) ? "일요일" :
                        (time.getDay() == 1) ? "월요일" :
                        (time.getDay() == 2) ? "화요일" :
                        (time.getDay() == 3) ? "수요일" :
                        (time.getDay() == 4) ? "목요일" :
                        (time.getDay() == 5) ? "금요일" : "토요일";
        const hours = time.getHours();
        const min = time.getMinutes();
        const sec = time.getSeconds();

        const id = newState.member.id;
        console.log(newState.member.id);
        // const now = year + "년 " + month + "월 " + date + "일 " + day + " " + hours + "시 " + min + "분 " + sec + "초"; 
        const now = year + "년 " + month + "월 " + date + "일 " + day + " " + hours + "시 " + min + "분 " + sec + "초"; 
        
        if(id == JinHongId) {
            if (newState.channelID) {
                checkCh.send(`${name} 출근 시간 \n ${now}`);
                console.log('userJoin');
            } else if (!newState.channelID) {
                checkCh.send(`${name} 퇴근 시간 \n ${now}`);
                console.log('userLeave');
            } 
        } else if (newState.channelID) {
            checkCh.send(`예비역 병장 ${name} 상번 시간 \n ${now}`);
            console.log('userJoin');
        } else if (!newState.channelID) {
            checkCh.send(`예비역 병장 ${name} 하번 시간 \n ${now}`);
            console.log('userLeave');
        }

        
    }

});

app.login(token);