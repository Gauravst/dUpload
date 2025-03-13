-- first setup
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  profilePic TEXT,
  strategy TEXT NOT NULL,
  strategyId TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE folder (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE file (
  id SERIAL PRIMARY KEY,
  folderId INT NOT NULL,
  userId INT NOT NULL,
  name TEXT NOT NULL,
  size BIGINT NOT NULL,
  type TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_folder FOREIGN KEY (folderId) REFERENCES folders (id) ON DELETE CASCADE
);

CREATE TABLE chunks (
  id SERIAL PRIMARY KEY,
  fileId INT NOT NULL,
  userId INT NOT NULL,
  serverId TEXT NOT NULL,
  channelId TEXT NOT NULL,
  messageId TEXT NOT NULL,
  attachmentId TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_file FOREIGN KEY (fileId) REFERENCES files (id) ON DELETE CASCADE
);
