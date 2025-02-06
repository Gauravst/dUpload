import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { getServer, getChannel } from '../utils/discord/getDiscordData.js';
import { loginClient } from '../utils/discord/client.js';

export const uploadData = asyncHandler(async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    throw new ApiError(400, 'no files provided');
  }

  const botToken = process.env.BOT_TOKEN;
  const serverId = process.env.SERVER_ID;
  const channelId = process.env.CHANNEL_ID;

  const client = await loginClient(botToken);
  await getServer(serverId, client);
  const targetChannel = await getChannel(channelId, client);

  const attachments = files.map(
    (file) => new AttachmentBuilder(file.path, { name: file.originalname })
  );

  const message = await targetChannel.send({ files: attachments });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messageId: message.id,
        channelId: message.channelId,
        attachments: message.attachments.map((att) => ({
          id: att.id,
          url: att.url,
          name: att.name,
          size: att.size,
        })),
      },
      'files uploaded successfully'
    )
  );
});
