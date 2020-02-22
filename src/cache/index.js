import slackHandler from "./slackHandlerForId";

const users = new slackHandler();
const channels = new slackHandler();
const imChannels = new slackHandler();
const groups = new slackHandler();

export { users, channels, imChannels, groups };
