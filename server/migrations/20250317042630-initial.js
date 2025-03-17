'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
export function setup(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
}

export function up(db) {
  const filePath = path.join(
    __dirname,
    'sqls',
    '20250317042630-initial-up.sql'
  );
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      console.log('Received data:', data);
      resolve(data);
    });
  }).then((data) => db.runSql(data));
}

export function down(db) {
  const filePath = path.join(
    __dirname,
    'sqls',
    '20250317042630-initial-down.sql'
  );
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);
      console.log('Received data:', data);
      resolve(data);
    });
  }).then((data) => db.runSql(data));
}

export const _meta = {
  version: 1,
};
