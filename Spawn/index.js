import { spawn } from "child_process";

const childProcess = (params) => {
  const child = spawn("wmic", params);
  child.stdout.on("data", (data) => {
    console.log(`stdout:\n${data}`);
  });
  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on("error", (error) => {
    console.error(`error: ${error.message}`);
  });
  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
childProcess(["cpu", "get", "loadpercentage"]);
childProcess([
  "OS",
  "get",
  "FreePhysicalMemory,TotalVisibleMemorySize",
  "/Format:List",
]);
