let loadPhones = async (search, limit) => {
    let url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    let res = await fetch(url);
    let data = await res.json();
    displayPhones(data.data, limit)
}
let displayPhones = (phones, limit) => {
    // console.log(phones)
    let phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerText = '';
    // show all 
    let showAll = document.getElementById('show-all');
    if (limit && phones.length > 11) {
        phones = phones.slice(0, 11)
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }
    // no phone found 
    let noFoundPhone = document.getElementById('no-found')
    let foundPhone = document.getElementById('found-phone');
    if (phones.length === 0) {
        noFoundPhone.classList.remove('d-none')
    }
    else {
        noFoundPhone.classList.add('d-none')
        foundPhone.classList.add('d-none')

    }

    phones.forEach(phone => {

        let phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="card shadow-lg">
                <img src="${phone.image}" class="card-img-top img-fluid px-5 mt-3" style="height: 300px;" alt="...">
                <div class="card-body mx-5">
                    <h5 class="card-title">NAME : ${phone.phone_name}</h5>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dicta, deleniti sequi earum porro est impedit facere distinctio corrupti eveniet.</p>
                
                </div >
                    <button onclick="loadMoreDetails('${phone.slug}')"class="btn btn-info fw-bold mx-5 mb-4"  data-bs-toggle="modal" data-bs-target="#loadMoreDetails" >More details</button>
                </div >              
            `
        phoneContainer.appendChild(phoneDiv)

    });
    // -----------loder stop----------------
    lodding(false);
}

let inputText = '';
let proccesFunction = (limit) => {
    //  ---------loder start--------
    lodding(true);
    let searchFeild = document.getElementById('search-feild');
    let searchText = searchFeild.value || inputText;
    if (searchText === "") {
        alert('Please write phone name !!!')
    }
    inputText = searchFeild.value;
    loadPhones(searchText, limit)
    searchFeild.value = '';
}
document.getElementById("search-feild").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        proccesFunction(11);
    }
});

// ----------loader function -------------
let loder = document.getElementById('loder');
let lodding = (isLoading) => {
    if (isLoading) {
        loder.classList.remove('d-none');
    } else {
        loder.classList.add('d-none');
    }

}


document.getElementById('phone-btn').addEventListener('click', function () {
    proccesFunction(11);

});

document.getElementById('show-btn').addEventListener('click', function () {
    proccesFunction();
});

let loadMoreDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayMoreDetails(data.data))


}
let displayMoreDetails = (data) => {
    console.log(data)
    let loadMoreDetailsLabel = document.getElementById('loadMoreDetailsLabel');
    loadMoreDetailsLabel.innerText = `Phone name : ${data.name}`;
    let modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
            <div class="text-center">
                <img src="${data.image}" class="pb-3" alt="">
            </div>    
            <h6>Brand :${data.brand}</h6>
            <h6>DisplaySize :${data.mainFeatures.displaySize}</h6>
            <h6>Storage :${data.mainFeatures.storage}</h6>
            <h6>Memory :${data.mainFeatures.memory}</h6>
            <h6>Sensor :${data.mainFeatures.sensors}</h6>
            <h6>ReleaseDate :${data.releaseDate}</h6>  
        `
}
// loadPhones('apple');



// data-bs-toggle="modal" data-bs-target="#loadMoreDetails"


