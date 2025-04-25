# D-Upload - Cloud Storage Using Discord (WIP)

![Work in Progress](https://img.shields.io/badge/Status-Work%20in%20Progress-yellow)

D-Upload is a **cloud file storage application** built with **Node.js & React**, utilizing **Discord as storage**. This project allows users to upload, share, and download files securely while leveraging Discord for storage.

## Features

✅ **File Sharing** - Share files with others using unique links.  
✅ **Download Files** - Retrieve and reconstruct files from Discord storage.  
✅ **Folder Management** - Organize files into folders for easy access.  
✅ **User Accounts** - Sign up, log in, and manage stored files securely.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Storage:** Discord API (using bots)

## How It Works

1️⃣ **User uploads a file** from the frontend.  
2️⃣ **Server processes the file** by splitting it into chunks.  
3️⃣ **Chunks are sent to Discord** and stored as messages.  
4️⃣ **Metadata is saved** in the database for tracking.  
5️⃣ **File can be shared** via a unique link.  
6️⃣ **On download,** the server retrieves chunks, reconstructs the file, and provides it to the user.  
7️⃣ **Original file is deleted** from the server after processing.

## Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-repo/dupload.git
cd dupload
```

### 2️⃣ Install Dependencies

```bash
bun install   # For frontend
```

```bash
npm install   # For backend
```

### 3️⃣ Set Up Environment Variables

Create a **.env** file in the backend & Frontend
And add based on .env.sample

### 4️⃣ Run the Project

```bash
# Start Backend
npm run dev

# Start Frontend
bun run dev
```

## 🔗 Links

- **Live Demo:** [Your Live Link](#)
- **GitHub Repo:** [Your GitHub Link](#)

## 💡 Contributing

Feel free to contribute! Open issues and submit PRs to improve this project.

## 📜 License

This project is licensed under the **MIT License**.
