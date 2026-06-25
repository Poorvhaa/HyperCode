console.log("Environment Variables:");
for (const key of Object.keys(process.env)) {
  if (key.toLowerCase().includes("key") || key.toLowerCase().includes("secret") || key.toLowerCase().includes("token") || key.toLowerCase().includes("password")) {
    console.log(`  - ${key}: [REDACTED, length: ${process.env[key].length}]`);
  } else {
    console.log(`  - ${key}: ${process.env[key]}`);
  }
}
