import { ApiError } from '../ApiError.js';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

export const loginClient = async (token) => {
  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  client.login(token);
  return client;
};
