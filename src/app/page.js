export default async function Home() {
  const chinaTime = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });
  const isServer = typeof window === "undefined";

  if (isServer) {
    console.log("Running on the server");
  } else {
    console.log("Running on the client");
  }
  return <div>{chinaTime}</div>;
}
