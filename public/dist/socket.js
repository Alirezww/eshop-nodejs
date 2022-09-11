const socket = io();

socket.on("connect", () => {
    console.log("client is connected...")
})