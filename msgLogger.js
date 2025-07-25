// import { GoogleGenAI, Type } from "@google/genai";
import fs from 'fs';
import {sendMessageObject} from './msgSender.js';
import { handleIncomingRequests } from "./apiRes.js";

// const ai = new GoogleGenAI({ apiKey: 'AIzaSyAJbdDzzABk3xF3wO4e7sAZXD3C-SepDwM' });


export async function handleIncomingMessages(messages) {
  console.log("listening to msg")
  // handleIncomingRequests()
  for(const msg of messages){
    console.log(msg)
    const logEntry= msg;
    const jid = msg.key.remoteJid;
    const from = msg.key.fromMe;
    const text = msg.message?.conversation || '[non-text]';
    let k=0;
    if(k==0){
      console.log('forwarding msg')
      sendMessageObject({to: '919833507001@s.whatsapp.net', type: 'forward',content: {"key":{"remoteJid":"918454866103@s.whatsapp.net","fromMe":false,"id":"50E27FDF2D92433945DA3B2DAA8FF2F8"},"messageTimestamp":1749198583,"pushName":"Abode Homestay Jaipur","broadcast":false,"message":{"productMessage":{"product":{"productImage":{"url":"https://mmg.whatsapp.net/o1/v/t24/f2/m234/AQOxlqhjM_9uneMwFusZJ8SmOtNcFWKd72dBsln60RTRlNbZrjs5M2VvG3phoIryLSfUvIweq1N8g_-EjvmOh-bQcKdH77zhTKX0ehAotQ?ccb=9-4&oh=01_Q5Aa1gFjPGMO5hH_ne3IstRa64jbOSfcljaxcPZJrHuKEL_6dA&oe=686A203E&_nc_sid=e6ed6c&mms3=true","mimetype":"image/jpeg","fileSha256":"p2IQpcWEglOrELYc2RjpeJdDYs0ie01k4S51Dp/wUzc=","fileLength":"205553","height":1060,"width":1280,"mediaKey":"wXBZC00PSe5FkgrF4+HBYsO1g5r0R9KgcIXcqvz9mPY=","fileEncSha256":"XwXyy6pt+mgG9zkg1IwsIWMLSHEasFx9EU2p0RWZgCo=","directPath":"/o1/v/t24/f2/m234/AQOxlqhjM_9uneMwFusZJ8SmOtNcFWKd72dBsln60RTRlNbZrjs5M2VvG3phoIryLSfUvIweq1N8g_-EjvmOh-bQcKdH77zhTKX0ehAotQ?ccb=9-4&oh=01_Q5Aa1gFjPGMO5hH_ne3IstRa64jbOSfcljaxcPZJrHuKEL_6dA&oe=686A203E&_nc_sid=e6ed6c","mediaKeyTimestamp":"1749133036","jpegThumbnail":"/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIADsASAMBIgACEQEDEQH/xAArAAADAQEBAAAAAAAAAAAAAAAAAgMBBAYBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAPQxrE3c00RxhtGNA56QOh+YCsA7Dl6BgCErRGXQAYR8oWMCU+oOXekIFwjlwQcP/8QAKRAAAgECBQIFBQAAAAAAAAAAAAECETEDEiFBURMiECBhYoEUQlJxgv/aAAgBAQABPwDGi1R1FLYbfJ1ZcnVnyRxJu7HP3nUraRB1+4xtiiuRjF2THh5Um0dsiGEmj6cWBlIqhipJeotWqmE2myVmb2N1ktv5MW9ze5/Q37j5FpaQnR3IuaXal4YzVbHalY0ew2uDtFl4HTgi6uiI2pUxrmtbmtLi/Z8nbyVgtxShwKl6GL6IUd9DKZV6CwnwdGXB0n+KOlJbJEMyevhRFFwUXHkcU2KKTqf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/ACf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/ACf/2Q==","scansSidecar":"NR6in6L6e6T3EaoCb2GepH/NlOdW+8FPuepXCGm84wXIzxR80NSnoA==","scanLengths":[13010,98462,43540,50541],"midQualityFileSha256":"nF9Jy/iY0Fmr07Ym9cWpvc55MsTbr/sMphmwUemw6Qs="},"productId":"29855493480732346","title":"Terms & Conditions","description":"Important","productImageCount":1},"businessOwnerJid":"918454866103@s.whatsapp.net","contextInfo":{"expiration":7776000,"ephemeralSettingTimestamp":"1748793622","entryPointConversionSource":"global_search_new_chat","entryPointConversionApp":"whatsapp","entryPointConversionDelaySeconds":12,"disappearingMode":{"initiator":"CHANGED_IN_CHAT","trigger":"UNKNOWN"}}},"messageContextInfo":{"deviceListMetadata":{"senderKeyHash":"2gamFOoNEu/9Og==","senderTimestamp":"1749134237","recipientKeyHash":"V06n5en1BVpFBQ==","recipientTimestamp":"1749130604"},"deviceListMetadataVersion":2,"messageSecret":"TKfIvczmXH/EeOpH546vItmqlEeIvSbo0/gBZOqku0I="}},"verifiedBizName":"Abode Homestay Jaipur","status":4}
      });
      k=1;
    }
    
    // const logEntry = {
    //   timestamp: new Date().toISOString(),
    //   from: jid,
    //   message: text
    // };
  //   if(jid=='919699607001@s.whatsapp.net' & text!='[non-text]'){
  //       const response = await ai.models.generateContent({
  //           model: "gemini-2.0-flash-lite",
  //           contents: `you are running a WA bot, your job is to convert and return the user input into a WA jid, msg type, msg content. USER INPUT-`
  //           + text,
  //           config: {
  //               responseMimeType: "application/json",
  //               responseSchema: {
  //                   type: Type.OBJECT,
  //                   properties: {
  //                     jid: {
  //                       type: Type.STRING,
  //                     },
  //                     type: {
  //                       type: Type.STRING,
  //                     },
  //                     content: {
  //                       type: Type.STRING,
  //                     }
  //                   },
  //                   propertyOrdering: ["jid", "type","content"],
  //               },
  //             },
  //         });
  //       //   console.log(response.text);
  //         const res = JSON.parse(response.text);
  //         console.log(res);
  //         // fin functionality
  //       // sendMessageObject({to: res.jid, type: res.type,content: res.content});
  //       sendMessageObject({to: jid, type: 'text',content: response.text});
  //       if(text=='.'){
  //           sendMessageObject({to: jid, type: 'text',content: 'hi'});
  //       }
  //   }
    
    console.log('📩 Incoming message:', logEntry);

    // Optionally save to a file
    fs.appendFileSync('message_log.jsonl', JSON.stringify(logEntry) + '\n');
  };
}