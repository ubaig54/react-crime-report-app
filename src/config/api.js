function crimeCategories() {
    return new Promise((resolve, reject) => {
        fetch('https://data.police.uk/api/crime-categories')
            .then(result => result.json())
            .then(response => {
                resolve(response)
            })
            .catch(e => {
                reject(e);
            })
    })
}

function forces() {
    return new Promise((resolve, reject) => {
        fetch('https://data.police.uk/api/forces')
            .then(result => result.json())
            .then(response => {
                resolve(response)
            })
            .catch(e => {
                reject(e);
            })
    })
}

function crimes(selectedCategory, selectedForce) {
    console.log('selectedCategory: ', selectedCategory, 'selectedForce: ', selectedForce);
    return new Promise((resolve, reject) => {
        fetch('https://data.police.uk/api/crimes-no-location?category=' + selectedCategory + '&force=' + selectedForce)
            .then(result => result.json())
            .then(response => {
                console.log('response: ', response)
                resolve(response)
            })
            .catch(e => {
                reject(e);
            })
    })
}

export {
    crimeCategories,
    forces,
    crimes,
}