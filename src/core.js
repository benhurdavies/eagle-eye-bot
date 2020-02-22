import SlackBot from "slackbots";

import { users, channels, imChannels, groups } from "./cache";
import classifyEvents from "./classifyEvents";

const dummy = () => {};

const eventHooks = {
  start: dummy,
  message_channel: dummy,
  message_im: dummy,
  message_group: dummy
};

function connect() {
  const { bot_token: botToken, bot_name: botName } = process.env;

  const bot = new SlackBot({
    token: botToken,
    name: botName
  });

  users.setGetData(() => bot.getUsers().then(item => item.members));
  channels.setGetData(() => bot.getChannels().then(item => item.channels));
  imChannels.setGetData(() => bot.getImChannels().then(item => item.ims));
  groups.setGetData(() => bot.getGroups().then(item => item.groups));

  bot.on("start", () => {
    getEventHandler("start")();
  });

  bot.on("message", async data => {
    const cEvents = await classifyEvents(data);
    if (cEvents) {
      getEventHandler(cEvents.name)({ payload: data, meta: cEvents.meta });
    }
  });

  return bot;
}

function on(name, handler) {
  if (!eventHooks.hasOwnProperty(name))
    throw Error(`There is no event with the name ${name}. 
     Please try one of these ${Object.keys(eventHooks).join(",")} events.`);

  eventHooks[name] = handler;
}

function getEventHandler(name) {
  return eventHooks[name] ?? dummy;
}

export { on, connect };
