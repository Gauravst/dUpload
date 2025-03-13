import { asyncHandler } from '../utils/asyncHandler.js';
import pool from '../db/connect.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createNewFolder = asyncHandler(async (req, res) => {
  // get user form middware
  const user = req.user;

  // make folder using body data
  const { folderName, folderUsername } = req.body;
  const createFolderQuery = `
    INSERT INTO folder (userId, name, username)
    VALUES ($1, $2, $3)
`;
  const createFolderValues = [user.id, folderName, folderUsername];
  const createFolderRes = await pool.query(
    createFolderQuery,
    createFolderValues
  );

  // return folder data
  return res
    .status(200)
    .json(new ApiResponse(200, { data: createFolderRes[0] }, 'folder created'));
});

export const getAllFolders = asyncHandler(async (req, res) => {
  const user = req.user;
  const query = `SELECT * FROM folder WHERE userId = $1`;
  const values = [user.id];

  const result = await pool.query(query, values);
  return res
    .status(200)
    .json(new ApiResponse(200, { data: result }, 'folder fetched'));
});

export const getAllFiles = asyncHandler(async (req, res) => {
  const user = req.user;
  const query = `SELECT * FROM file WHERE userId = $1`;
  const values = [user.id];

  const result = await pool.query(query, values);
  return res
    .status(200)
    .json(new ApiResponse(200, { data: result }, 'files fetched'));
});

export const getOneFolder = asyncHandler(async (req, res) => {
  const { folderId } = req.params;
  const user = req.user;
  const query = `SELECT * FROM folder WHERE userId = $1 AND folderId = $2`;
  const values = [user.id, folderId];

  const result = await pool.query(query, values);
  return res
    .status(200)
    .json(new ApiResponse(200, { data: result[0] }, 'folder fetched'));
});

export const getOneFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const user = req.user;

  const query = `SELECT * FROM file WHERE userId = $1 AND folderId = $2`;
  const values = [user.id, fileId];

  const result = await pool.query(query, values);
  return res
    .status(200)
    .json(new ApiResponse(200, { data: result[0] }, 'file fetched'));
});
