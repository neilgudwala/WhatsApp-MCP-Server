// messageSender.js
import { getSock } from './startBot.js';

async function sendMessage(jid, content) {
  const sock = getSock();
  if (!sock) {
    console.log('❌ Socket not initialized');
    return;
  }
  await sock.sendMessage(jid, content);
}

export async function sendMessageObject(msg) {
  const { to, type, content } = msg;

  if (type === 'text') {
    await sendMessage(to, { text: content });
  } else if (type === 'image') {
    await sendMessage(to, { image: { url: content.url }, caption: content.caption });
  }else if (type === 'video') {
    await sendMessage(to, { video: { url: content.url }, caption: content.caption });
  }else if (type === 'forward') {
    await sendMessage(to, { forward: content });
  } else if (type === 'location') {
    await sendMessage(to, {
      location: {
        degreesLatitude: content.lat,
        degreesLongitude: content.lng,
        name: content.name
      }
    });
  }
}
