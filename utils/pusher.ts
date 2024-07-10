import PusherServer from "pusher";
import PusherClient from "pusher-js";

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "ap2",
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,

    {
      cluster: "ap2",
      forceTLS: true,
      channelAuthorization: {
        endpoint: "/api/pusher-auth",
        transport: "ajax",
      },
    },
  );
}

export function createChatId(senderId: string, receiverId: string) {
  return senderId > receiverId
    ? `${receiverId}-${senderId}`
    : `${senderId}-${receiverId}`;
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;
