/* Render Cron Job: call the protected reminder dispatcher without logging secrets. */
const server = process.env.PUSH_SERVER_URL;
const token = process.env.PUSH_ADMIN_TOKEN;
if (!server || !token) {
  console.error("Missing PUSH_SERVER_URL or PUSH_ADMIN_TOKEN");
  process.exit(1);
}
try {
  const endpoint = new URL("/admin/dispatch", server);
  if (endpoint.protocol !== "https:") throw new Error("PUSH_SERVER_URL must use HTTPS");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: "{}",
    signal: AbortSignal.timeout(90000)
  });
  if (!response.ok) throw new Error(`Reminder dispatch failed with HTTP ${response.status}`);
  const result = await response.json();
  console.log("Reminder dispatch result:", JSON.stringify(result));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
