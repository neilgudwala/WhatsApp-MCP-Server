// startBot.js
import { makeWASocket, useMultiFileAuthState, DisconnectReason } from 'baileys';
import P from 'pino';
import QRCode from 'qrcode';
import { handleIncomingRequests } from "./apiRes.js";


let sock;

export async function startBot(onMessage) {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  sock = makeWASocket({
    auth: state,
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      const qrString = await QRCode.toString(qr, {
        type: 'terminal',
        small: true,
      });
      console.log(qrString);
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        startBot(onMessage);
      }
    } else if (connection === 'open') {
      console.log('✅ Connected to WhatsApp');
      // handleIncomingRequests();
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    if (messages && messages.length > 0) {
      onMessage(messages);
    }
  });

  return sock;
}

export function getSock() {
  return sock;
}
