import * as core from "./core";
import { setGetUsers, loadUsers, getUser } from "./users";

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const bot = core.connect();

core.on("start", () => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  var params = {
    icon_emoji: ":cat:"
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  bot.postMessageToChannel("general", "I am online!", params);
});

bot.on("message", data => {
  // all ingoing events https://api.slack.com/rtm
  const { type,subtype } = data;
  if (type === "message" && subtype!=='bot_message') {
    console.log({ data });
    //getUser('BU2B4576D').then(console.log)
    bot.getImChannels().then(console.log);
  }

});

// bot.on('error', function(data) {
//     // all ingoing events https://api.slack.com/rtm
//     console.log('my error',data);
// });
