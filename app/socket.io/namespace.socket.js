const { ConversationModel } = require("../models/Conversation");

class NamespaceSocketHandler{
    #io;
    constructor(io){
        this.#io = io;
    };

    initConnection(){
        this.#io.on("connection", async socket => {
            const namespaces = await ConversationModel.find( {}, { title:1, endpoint:1 }).sort({ _id: 1 });
            socket.emit("namespacesList", namespaces);
        })
    }

    async createNamespacesConnection(){
        const namespaces = await ConversationModel.find({}).sort({ _id: 1 });
        for (const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", socket => {
                socket.emit("roomsList", namespace.rooms)
            })
        }
    }

}

module.exports = NamespaceSocketHandler;