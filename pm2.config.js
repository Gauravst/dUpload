module.exports = {
  apps: [
    // frontend build
    {
      name: "frontend-build",
      script: "npm",
      args: "run build",
      cwd: "/home/gaurav/dupload/client",
      autorestart: false,
      watch: false,
    },

    // run frontend
    {
      name: "frontend",
      script: "serve",
      args: "-s dist -l 5173",
      cwd: "/home/gaurav/dupload/client",
      autorestart: true,
      watch: false,
    },

    // run bakcend
    {
      name: "backend",
      script: "npm",
      args: "run start",
      cwd: "/home/gaurav/dupload/server",
      autorestart: true,
      watch: false,
    },
  ],
};
