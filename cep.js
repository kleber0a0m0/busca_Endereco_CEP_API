console.log("=== CEP ===");

window.onload = getLocalStorageAdress();
function onlyNumbers(e) {
    this.value = this.value.replace(/\D+/g, "");
}

function validateEntry() {    
    if (this.value.length === 8) {
        this.classList.remove("error");
        getAddress(this.value);
    } else {
        this.classList.add("error");
        this.focus();
    }
}

function getAddress(postalCode) {
    const endpoint = `https://viacep.com.br/ws/${postalCode}/json/`;

    const config = {
        method: "GET"
    };

    fetch(endpoint, config)
        .then(function(resp) { return resp.json(); })
        .then(getAddressSuccess)
        .catch(getAddressError);
}

function getAddressSuccess(address) {
    if(address.erro == true){
        alert("CEP inválido");
    }else{
        let id = localStorage.length;
        localStorage.setItem(id++, JSON.stringify(address))     ;
        getLocalStorageAdress();
    }
}

function getLocalStorageAdress() {
    const card = document.querySelector('.cards');
    if(localStorage.length != 0){
        card.innerHTML = Array.from(localStorage).map(function(item) {

            item = JSON.parse(item);
            return `<div class="card mt-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${item.logradouro}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                    ${item.bairro} - ${item.localidade} - ${item.uf}
                </h6>
                <p class="card-text">${item.cep}</p>
            </div>
        </div>`
        }).join('');
    }else{
        card.innerHTML = "<p>Nenhuma consulta salva</p>"
    }

}

function getAddressError() {
    console.log("deu ruim 1!");
}



// Mapping Events
document.querySelector("#cep").addEventListener("input", onlyNumbers); // onlyNumbers(InputEvent)
document.querySelector("#cep").addEventListener("focusout", validateEntry);
