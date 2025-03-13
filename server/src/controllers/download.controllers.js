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
import { downloadFile } from '../utils/discord/downloadFile.js';
import { mergeFiles } from '../utils/mergeFile.js';
import { deleteFiles } from '../utils/deleteFiles.js';

export const downloadData = asyncHandler(async (req, res) => {
  const { fileId } = req.body;
  const botToken = process.env.BOT_TOKEN;
  const serverId = process.env.SERVER_ID;
  const channelId = process.env.CHANNEL_ID;

  // get file data db
  const query = `
     SELECT 
       f.id, 
       f.folderId, 
       f.name, 
       f.size, 
       f.type, 
       f.createdAt AS file_createdAt, 
       f.updatedAt AS file_updatedAt,
       c.id AS chunk_id,
       c.serverId, 
       c.channelId, 
       c.messageId, 
       c.attachmentId, 
       c.createdAt AS chunk_createdAt, 
       c.updatedAt AS chunk_updatedAt
     FROM file f
     LEFT JOIN chunks c ON f.id = c.fileId
     WHERE f.id = $1;
`;

  const fileInfoRes = await pool.query(query, [fileId]);
  const fileInfo = fileInfoRes.rows;

  const messageId = fileInfo.id;

  const client = await loginClient(botToken);
  await getServer(serverId, client);
  const targetChannel = await getChannel(channelId, client);
  const message = await getMessage(messageId, targetChannel);

  let chunksPath = [];
  for (const chunk of fileInfo.chunks) {
    const attachment = await getAttachment(chunk.attachmentId, message);
    const filePath = await downloadFile(
      fileInfo.name,
      attachment.name,
      attachment.url
    );

    chunksPath.push(filePath);
  }

  mergeFiles(chunksPath, `/tmp/${fileInfo.name}`);
  deleteFiles(chunksPath);

  const baseURL = process.env.BASE_URL;
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { fileUrl: `${baseURL}/tmp/${fileInfo.name}` },
        'downloaded'
      )
    );
});
