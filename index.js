require('dotenv').config();
const token = process.env.TOKEN;
const discord = require('discord.js');  // discord.js를 import 해줍니다.
const app = new discord.Client(); // discord.Client 인스턴스 생성
const BlockQueue = require('block-queue');

app.on('ready', () => { // 여기서 사용되는 Arrow Function은 콜백함수입니다.
    console.log(`I am Ready ${app.user.tag}`); // Bot이 준비가 되면 실행할 콜백함수입니다.
});

app.on('voiceStateUpdate', (oldState, newState) => {
    const checkCh = newState.guild.channels.cache.get('883309516551233547');
    const joinedAt = newState.guild.channels.joinedAt;
    const joinedAt2 = newState.member.joinedAt;
    const createdTimeStamp = newState.guild.createdTimeStamp;

    console.log('joinedAt : ' + joinedAt );
    console.log('joinedAt : ' + joinedAt2 );
    console.log('createdTimeStamp : ' + createdTimeStamp );
    // 유저가 음성 채널에 들어왔을 때 혹은 나갔을 때 실행
    if(oldState.channelID != newState.channelID) {
        
        if(!newState.channelID) {
            console.log('userLeave');
            checkCh.send('체크');
        }
    }

});

app.login(token);