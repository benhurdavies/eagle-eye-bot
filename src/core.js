import SlackBot from "slackbots";

import { setGetUsers, loadUsers, getUser } from "./users";

const dummy = () => {};

const eventHooks = {
  start: dummy,
  message: dummy
};

function connect() {
  const { bot_token: botToken, bot_name: botName } = process.env;

  const bot = new SlackBot({
    token: botToken,
    name: botName
  });

  setGetUsers(() => bot.getUsers());

  bot.on("start", async function() {
    await loadUsers();
    getEventHandler("start")();
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
