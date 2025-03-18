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

  if (!user || !user.id) {
    return res.status(401).json(new ApiResponse(401, null, 'Unauthorized'));
  }

  const query = `
    SELECT 
        f.id,
        f.name,
        f.username,
        f.createdAt,
        f.updatedAt,
        COALESCE(json_agg(
            json_build_object(
                'id', fi.id,
                'name', fi.name,
                'size', fi.size,
                'type', fi.type,
                'createdAt', fi.createdAt,
                'updatedAt', fi.updatedAt
            )
        ) FILTER (WHERE fi.id IS NOT NULL), '[]'::json) AS files
    FROM folder f
    LEFT JOIN file fi ON f.id = fi.folderId
    WHERE f.userId = $1
    GROUP BY f.id;
  `;

  const values = [user.id];
  const result = await pool.query(query, values);

  return res
    .status(200)
    .json(new ApiResponse(200, result.rows, 'folders fetched'));
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
