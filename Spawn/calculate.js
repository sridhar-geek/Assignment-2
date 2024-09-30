import os from "os";

// Function to get CPU usage
const getCpuUsage = () => {
  const cpus = os.cpus();
  let totalUsage = 0;
  let idleTime = 0;
  const load = cpus.map((core) => {
    let usage = 0;
    for (let prop in core.times) {
      usage += core.times[prop];
    }
    totalUsage += usage;
    idleTime += core.times.idle;
  });
  const percen = (((totalUsage - idleTime) / totalUsage) * 100).toFixed(2);
  console.log(`Percentage of CPU usage ${percen} %`)
};

// Function to get memory usage
const getMemoryUsage = () => {
  const freeMem = os.freemem() / 1024 / 1024 / 1024; 
  const totalMem = os.totalmem() / 1024 / 1024 / 1024;
  const usedMem = totalMem - freeMem;
  console.log(`  Total Memory: ${totalMem.toFixed(2)} GB`);
  console.log(`  Used Memory: ${usedMem.toFixed(2)} GB`);
};

// Get CPU and memory usage
getCpuUsage()
getMemoryUsage();
