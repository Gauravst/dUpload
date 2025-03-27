import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { getServer, getChannel } from '../utils/discord/getDiscordData.js';
import { loginClient } from '../utils/discord/client.js';
import { AttachmentBuilder } from 'discord.js';
import { makeChunks } from '../utils/makeChunks.js';
import { fileNameFormat } from '../utils/fileNameFormat.js';
import { deleteFiles } from '../utils/deleteFiles.js';
import pool from '../db/connect.js';

export const uploadData = asyncHandler(async (req, res) => {
  const files = req.files;
  const { folderId } = req.params;
  const user = req.user;

  if (!user || !user.id) {
    throw new ApiResponse(401, 'Unauthorized');
  }

  if (!files || files.length === 0) {
    throw new ApiError(400, 'no files provided');
  }

  // make chunks of file is needed
  let chunks;
  if (files[0].size / 1024 > 2048) {
    chunks = await makeChunks(files, 1024);
  } else {
    chunks = files;
  }

  // upload all chunks to discord
  const botToken = process.env.BOT_TOKEN;
  const serverId = process.env.SERVER_ID;
  const channelId = process.env.CHANNEL_ID;

  const client = await loginClient(botToken);
  await getServer(serverId, client);
  const targetChannel = await getChannel(channelId, client);

  const attachments = chunks.map(
    (chunk) => new AttachmentBuilder(chunk.path, { name: chunk.name })
  );

  const message = await targetChannel.send({ files: attachments });

  // save all chunks id and message id in db
  const fileQuery = `INSERT INTO file (folderId, userId, name, size, type )
                     VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const fileValues = [
    folderId,
    user.id,
    fileNameFormat(files[0].originalname),
    Math.floor(files[0].size / 1024),
    files[0].mimetype,
  ];

  const fileResultRes = await pool.query(fileQuery, fileValues);
  const fileResult = fileResultRes.rows;

  const chunksArray = message.attachments;
  if (chunksArray.length === 0) return;
  const chunksArrayValues = Array.from(chunksArray.values());

  const query = `
  INSERT INTO chunks (fileId, userId, serverId, channelId, messageId, attachmentId)
  VALUES ${chunksArrayValues
    .map(
      (_, i) =>
        `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`
    )
    .join(', ')}
  RETURNING *;
`;

  const values = chunksArrayValues.flatMap((chunk) => [
    fileResult[0].id,
    user.id,
    serverId,
    channelId,
    message.id,
    chunk.id,
  ]);

  const resultRes = await pool.query(query, values);
  const result = resultRes.rows;

  // delete server chunks
  const deleteChunksPaths = [];
  chunks.map((file) => {
    deleteChunksPaths.push(file.path);
  });

  await deleteFiles(deleteChunksPaths);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: result[0].id,
        folderId: folderId,
        name: fileNameFormat(files[0].originalname),
        size: Math.floor(files[0].size / 1024),
        type: files[0].mimetype,
      },
      'files uploaded successfully'
    )
  );
});
