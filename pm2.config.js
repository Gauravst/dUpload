module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npx",
      args: "serve -s dist -l 5173",
      cwd: "/var/www/dupload/client",
      autorestart: true,
      watch: false,
    },
    {
      name: "backend",
      script: "npm",
      args: "run start",
      cwd: "/var/www/dupload/server",
      autorestart: true,
      watch: false,
    },
  ],
};
