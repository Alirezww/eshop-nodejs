const NamespaceSocketHandler = require("./namespace.socket")

const socketHandler = (io) => {
    new NamespaceSocketHandler(io).initConnection();
}

module.exports = {
    socketHandler
}