module.exports = {
  apps: [
    {
      name: "dupload_backend",
      script: "npm",
      args: "run start",
      cwd: "/var/www/dUpload/server",
      autorestart: true,
      watch: false,
    },
  ],
};
