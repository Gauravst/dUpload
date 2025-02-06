import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {
  getServer,
  getChannel,
  getMessage,
  getAttachment,
} from '../utils/discord/getDiscordData.js';
import { loginClient } from '../utils/discord/client.js';

export const downloadData = asyncHandler(async (req, res) => {
  const botToken = process.env.BOT_TOKEN;
  const serverId = process.env.SERVER_ID;
  const channelId = process.env.CHANNEL_ID;
  const messageId = '1297106719788367903';
  const attachmentId = '1297106719570399273';

  const client = await loginClient(botToken);
  await getServer(serverId, client);
  const targetChannel = await getChannel(channelId, client);
  const message = await getMessage(messageId, targetChannel);
  const attachment = await getAttachment(attachmentId, message);

  return res
    .status(200)
    .json(new ApiResponse(200, { attachmentInfo: attachment }, 'downloaded'));
});
