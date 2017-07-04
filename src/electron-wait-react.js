const { exec, spawn } = require("child_process");
const net = require("net");
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log("starting electron");
      startedElectron = true;

      let runner;
      if (process.platform === "win32") exec("npm run electron");
      else spawn("npm", ["run", "electron"]);

      if (!runner) return;

      runner.stdout.on("data", function(data) {
        console.log(data.toString());
      });

      runner.stderr.on("data", function(data) {
        console.error(data.toString());
      });

      runner.on("exit", function(code) {
        console.log("child process exited with code " + code.toString());
      });
    }
  });

tryConnection();

client.on("error", error => {
  setTimeout(tryConnection, 1000);
});
