const socket = io();

socket.on("connect", () => {
    socket.on("namespacesList", namespacesList => {
        const namespacesElement = document.getElementById("namespaces")
        namespacesElement.innerHTML = "";
        for (const namespace of namespacesList) {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerText = namespace.title;
            li.appendChild(p)
            namespacesElement.appendChild(li);
        }
    })
})