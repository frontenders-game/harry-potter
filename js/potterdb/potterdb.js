// import fs from "fs";

// get data from PotterDB api

const apiURL = 'https://api.potterdb.com/'

const getPage = async (url) => {
    const response = await fetch(url);
    return await response.json()
}

const getCharacters = async () => {
    const charactersURL = `${apiURL}v1/characters/`
    const firstPage = await getPage(charactersURL)
    const resultArr =  firstPage.data
    let currentLinks = firstPage.links
    while (true) {
        const nextPage = currentLinks.next
        if (nextPage) {
            const currentPage = await getPage(nextPage)
            resultArr.push(...currentPage.data)
            currentLinks = currentPage.links
        }
        else {
            break
        }
    }
    return resultArr
}

const filterCharactersWithPhotos= (charArr) => charArr.filter(i => i.attributes.image)

// const filterCharactersWithWands = (charArr) => charArr.filter(i => i.attributes.wands)

export async function getCharactersWithPhotos() {
    const allCharacters = await getCharacters()
    return filterCharactersWithPhotos(allCharacters)

}


// let res = await getCharactersWithPhotos()

// (B) WRITE TO FILE
// fs.writeFile("potterdbdata.js", JSON.stringify(filterCharactersWithWands(res)), "utf8", (error, data) => {
//     console.log("Write complete");
//     console.log(error);
//     console.log(data);
// });

