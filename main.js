const contactlist = document.querySelector('.post-list');
const addContactForm  = document.querySelector('.add-post-form');

const modelValue = document.getElementById('model_value');
const makeValue = document.getElementById('make_value');
const colorValue = document.getElementById('color_value');
const yearValue = document.getElementById('year_value');
const doorValue = document.getElementById('door_value');


let btnSubmit = document.querySelector('.btn');

let output = ``;

const renderCars = (cars) => {
    cars.forEach(car => {
        output += `
        <div class="card mt-4 col-md-6 bg-ligt">
            <div class="card-body" data-id=${car.id}>
            Modelo : <h6 class="card-subtitle1 mb-2 text-muted" data-id="telefono_">${car.model}</h6>
            Marca : <h6 class="card-subtitle2 mb-2 text-muted" data-id="telefono_">${car.make}</h6>
            Color : <h6 class="card-subtitle3 mb-2 text-muted" data-id="telefono_">${car.color}</h6>
            Año : <h6 class="card-subtitle4 mb-2 text-muted" data-id="telefono_">${car.year}</h6>
            Puertas : <h6 class="card-subtitle5 mb-2 text-muted" data-id="email_">${car.door}</h6>
            <a href="#" class="card-link" id="edit_contact">Editar</a>
            <a href="#" class="card-link" id="delete_contact">Eliminar</a>
            </div>
        </div>`;
    });
    contactlist.innerHTML = output;
}
const vaciarControles = () => {
    modelValue.value = "";
    makeValue.value = "";
    colorValue.value = "";
    yearValue.value = "";
    doorValue.value = "";
}

const url = "http://localhost:44349/swager/index.html";

// Get - Leer la lista de Carros
fetch(url)
    .then(res => res.json())
    .then(data => renderCars(data))
    .then(() => vaciarControles())


// ELIMINAR Y EDITAR
contactlist.addEventListener('click', (e) => {
    let delButtonIsPressed = e.target.id == 'delete_contact';
    let editButtonIsPressed = e.target.id == 'edit_contact';
    
    let id = e.target.parentElement.dataset.id;

    //DELETE
    if(delButtonIsPressed){
        fetch(`${url}?id=${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => alert('Un Carro se ha eliminado'))
        .then(() => location.reload())
        .then(() => console.log('Carro Eliminado'))
    }
    //     editar...
    if(editButtonIsPressed){
        const parent = e.target.parentElement;
        let modelContent = parent.querySelector('.card-subtitle1').textContent;
        let makeContent = parent.querySelector('.card-subtitle2').textContent;
        let colorContent = parent.querySelector('.card-subtitle3').textContent;
        let yearContent = parent.querySelector('.card-subtitle4').textContent;
        let doorContent = parent.querySelector('.card-subtitle5').textContent;

        modelValue.value = modelContent;
        makeValue.value = makeContent;
        colorValue.value = colorContent;
        yearValue.value = yearContent;
        doorValue.value = doorContent;

        btnSubmit.innerText = "Editar Carro";
       
    }

    // UPDATE   // PUT
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}?id=${id}&model=${modelValue.value}&make=${makeValue.value}&color=${colorValue.value}&year=${yearValue.value}&door=${doorValue.value}`, {
            method: 'PUT',
        })
        .then(res => res.json())
        .then(() => alert('Carro Modificado'))
        .then(() => location.reload())
        .then(() => console.log('Carro Modificado'))
    })
})

// Crear - Insertar nuevo carro   POST
addContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(modelValue.value == "" || makeValue.value == "" || colorValue.value == "" || yearValue.value == "" || doorValue.value == "")
    {
        alert('Por favor llenar todos los datos');
    }else{
        fetch(`${url}?model=${modelValue.value}&make=${makeValue.value}&color=${colorValue.value}&year=${yearValue.value}&door=${doorValue.value}`, {
            method: 'POST'
        })
        .then(res => res.json())
        .then(() => alert('Agrego un nuevo Carro'))
        .then(() => location.reload())
        .then(() => console.log('Un Carro Agregado'))
    }
})



