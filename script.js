const btn = document.querySelector('.btn');
const resultContainer = document.querySelector('.result-container');

const url = 'https://senaraiistilahjawa.kemdikbud.go.id/api/public/detail/'

btn.addEventListener('click', async () => {

    try {
        const getKata = document.querySelector('.input-keyword').value;
        const processKata = await fetchData(getKata);
        updateTampilan(processKata);
    } catch (err) {
        alert(err);
    }
})


const fetchData = (kata) => {
    return fetch(url + kata)
        .then((response) => {
            if (response.status) {
                return response.json()
            }
        })
}

const updateTampilan = (response) => {
    let updateAllContainer = '';
    updateAllContainer += updateJawaContainer(response.name);

    if (!response.status) {
        throw new Error('Kata Tidak Ditemukan!')
    }

    const kataIndo = response.description;
    if (kataIndo.includes(';')) {
        kataIndo.split(';').forEach(el => {
            updateAllContainer += updateIndoContainer(el)
        })
    } else {

        updateAllContainer += updateIndoContainer(kataIndo);
    }

    resultContainer.innerHTML = updateAllContainer;

}

const updateJawaContainer = (kata) => {
    return `<h5 class="display-5 text-start"> ${kata} </h5>`
}

const updateIndoContainer = (kata) => {
    return `<div class="col-lg-12 col-12 px-4"> 
    <p> 👉 ${kata} </p>
    </div>`
}
