import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  WAMessage,
  proto,
  isJidGroup,
  jidNormalizedUser,
} from "@whiskeysockets/baileys";
import path from "node:path";
// import open from "open";
import P from 'pino';
import QRCode from 'qrcode';
import { handleIncomingRequests } from "./apiRes.js";


let sock;

export async function startBot(logger: P.Logger) {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version, isLatest } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: state,
    logger,
    printQRInTerminal: false,
    // generateHighQualityLinkPreview: true,
    // shouldIgnoreJid: (jid) => isJidGroup(jid),
  });

  sock.ev.process(async (events) => {
    if (events["connection.update"]) {
      const update = events["connection.update"];
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        logger.info(
          { qrCodeData: qr },
          "QR Code Received. Copy the qrCodeData string and use a QR code generator (e.g., online website) to display and scan it with your WhatsApp app."
        );
        // for now we roughly open the QR code in a browser
        await open(`https://quickchart.io/qr?text=${encodeURIComponent(qr)}`);
      }

      if (connection === "close") {
        const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
        logger.warn(
          `Connection closed. Reason: ${
            DisconnectReason[statusCode as number] || "Unknown"
          }`,
          lastDisconnect?.error
        );
        if (statusCode !== DisconnectReason.loggedOut) {
          logger.info("Reconnecting...");
          startBot(logger);
        } else {
          logger.error(
            "Connection closed: Logged Out. Delete auth_info and restart."
          );
          process.exit(1);
        }
      } else if (connection === "open") {
        logger.info(`Connection established. WA user: ${sock.user?.name}`);
        console.log("Logged in as", sock.user?.name);
      }
    }

    if (events["creds.update"]) {
      await saveCreds();
      logger.info("Credentials saved.");
    }
    if (events["messages.upsert"]) {
      const { messages, type } = events["messages.upsert"];
      logger.info(
        { type, count: messages.length },
        "Received messages.upsert event"
      );
    }

  });



  return sock;
}

export function getSock() {
  return sock;
}

export async function sendWAMessage(jid, content, logger: P.Logger, sock) {
  try {
    if (!sock) {
      throw new Error('Socket is not initialized');
    }
    await sock.sendMessage(jid, content);
    if (logger) {
      logger.info(`Message sent to ${jid}`);
    }
  } catch (error) {
    if (logger) {
      logger.error(`Failed to send message to ${jid}: ${error.message}`);
    } else {
      console.error(`Failed to send message to ${jid}:`, error);
    }
  }
}