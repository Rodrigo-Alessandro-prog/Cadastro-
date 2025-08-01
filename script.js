const form = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
const inputNome = document.getElementById("inputNome");
const inputEmail = document.getElementById("inputEmail");

function getClientes() {
    return JSON.parse(localStorage.getItem("clientes")) || [];
}

function setClientes(clientes) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function renderClientes() {
    listaClientes.innerHTML = "";
    const clientes = getClientes();
    clientes.forEach((cliente, index) => {
        const li = document.createElement("li");
        li.textContent = `${cliente.nome} - ${cliente.email}`;
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "X";
        btnRemover.onclick = () => {
            removerCliente(index);
        };
        li.appendChild(btnRemover);
        listaClientes.appendChild(li);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    if (nome && email) {
        const clientes = getClientes();
        clientes.push({ nome, email });
        setClientes(clientes);
        inputNome.value = "";
        inputEmail.value = "";
        renderClientes();
    }
});

function removerCliente(index) {
    const clientes = getClientes();
    clientes.splice(index, 1);
    setClientes(clientes);
    renderClientes();
}

renderClientes();