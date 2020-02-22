import { channels, groups, imChannels } from "./cache";

async function classifyEvents(payload) {
  const { type, subtype='' } = payload;
  const key = [type,subtype].filter(Boolean).join('|');
  switch (key) {
    case "message":
      return findMessageEvent(payload);
    case "reaction_added":
      return null;
    case "reaction_removed":
      return null;
    default:
      return null;
  }
}

async function findMessageEvent(payload) {
  const { channel: channelId } = payload;
  const { name, value } = await findChannel(channelId);
  return { name: `message_${name}`, meta: { channel: value } };
}

async function findChannel(id) {
  const channelBruteForce = await Promise.all([
    channels.get(id),
    imChannels.get(id),
    groups.get(id)
  ]);
  const orderName = ["channel", "im", "group"];
  const indexSuccess = channelBruteForce.findIndex(item => item);
  if (indexSuccess < 0) throw Error(`Could not find channel id :${id}`);
  return {
    name: orderName[indexSuccess],
    value: channelBruteForce[indexSuccess]
  };
}

export default classifyEvents;
