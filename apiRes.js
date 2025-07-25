import fs from 'fs';
// import { startBot } from './startBot.js';
import {sendMessageObject} from './msgSender.js';
// import { handleIncomingMessages } from './msgLogger.js';

// await startBot(handleIncomingMessages);
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



export async function handleIncomingRequests(request) {
    const raw = fs.readFileSync(`AbodeHomestay/Media/R00${request.room}/R00${request.room}.json`, 'utf-8');
    const json = JSON.parse(raw);
    const sorted = json.messages.sort((a, b) => a.sort - b.sort);
    for (const msg of sorted) {
        console.log(msg);
        sendMessageObject({to: '919699607001@s.whatsapp.net', type: msg.msgType, content: {url:`./AbodeHomestay/Media/R00${request.room}/${msg.fileNm}`, caption: msg.caption}});
        await delay(2000);
    }
    
};

// handleIncomingRequests()