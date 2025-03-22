import { ApiError } from '../ApiError.js';

export const getServer = async (id, client) => {
  const guild = await client.guilds.fetch(id);
  if (!guild) throw new ApiError(400, 'server not found');
  return guild;
};

export const getChannel = async (id, client) => {
  const targetChannel = await client.channels.fetch(id);
  if (!targetChannel) throw new ApiError(404, 'channel not found');
  return targetChannel;
};

export const getMessage = async (id, channel) => {
  const message = await channel.messages.fetch(id);
  if (!message) throw new ApiError(404, 'message not found');
  return message;
};

export const getAttachment = async (id, message) => {
  const attachment = message.attachments.get(id);
  if (!attachment) throw new ApiError(404, 'attachment not found');
  return attachment;
};
