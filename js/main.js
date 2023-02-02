import data from "./potterdb/data.js";
import {modalCardHTML, siteCardHTML} from "./process_cards.js";


// load json with character cards
const charactersData = JSON.parse(JSON.stringify(data))

// query Selectors
// main div with characters
const cardContainer = document.querySelector('div.main-wrapper')
// div with search input and selector
const searchForm = document.querySelector('.search-wrapper')
// name search
const nameForm = document.querySelector('.search__name-input')
// house selector
const houseSelector = document.querySelector('.search__house-selector')
// modal
const modalOverlay = document.querySelector(".modal-overlay")
const modalContainer = document.querySelector(".modal-character-wrapper")

const clearCharacters = () => cardContainer.innerHTML = ''

const getCharacterById = id => {
    for (let character of charactersData) {
        if (character.id === id) {
            return character
        }
    }
}

const houseList = () => {
    const houses = data.reduce((acc, current) => acc.add(current.attributes.house), new Set())
    return [...houses].filter(house => !!house).sort()
}

// iterate through data and fill house array
const fillHouses = () => {
    const createOption = (optionText, optionValue) => {
        const option = document.createElement("option");
        option.setAttribute("value", optionValue);
        option.textContent = optionText
        houseSelector.appendChild(option)
    }
    createOption('All houses', '')
    for (let house of houseList()) {
        createOption(house, house)
    }
}

// create modal html

const modalOpen = (evt) => {
    document.body.style.overflow = 'hidden'
    modalOverlay.classList.add('visible')
    modalContainer.classList.add('visible')
    const character = getCharacterById(evt.target.id)
    modalContainer.innerHTML = modalCardHTML(character)
    const closeModalBtn = document.querySelector(".modal__close-btn")
    closeModalBtn.addEventListener('click', () => modalClose())
    modalOverlay.addEventListener('click', () => modalClose())
    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' || evt.code === 'Enter') modalClose()
    })
}

const modalClose = () => {
    document.body.style.overflow = 'visible'
    modalOverlay.classList.remove('visible')
    modalContainer.classList.remove('visible')
    modalContainer.innerHTML = ''
}

// function to render each card
const createCharacterCard = characterObj => {
    const card = document.createElement('div')
    card.className = 'character-wrapper'
    card.innerHTML = siteCardHTML(characterObj)
    const titleURL = card.querySelector('.character__url')
    titleURL.addEventListener('click', evt => {
        modalOpen(evt)
    });
    return card
}


// function to generate html from array with json
const renderFromData = dataArr => dataArr.forEach(
    characterObj => cardContainer.append(createCharacterCard(characterObj)))

const addSearchListener = () => {
    searchForm.addEventListener('input', () => {
        const fmtName = nameForm.value.toLowerCase().trim()
        const house = houseSelector.value
        const filteredCharacters = charactersData
            .filter(characterObj => characterObj.attributes.name.toLowerCase().includes(fmtName))
            .filter(characterObj => {
                const characterHouse = characterObj.attributes.house || 'Unknown'
                return characterHouse === house || !house
            })
        clearCharacters()
        renderFromData(filteredCharacters)
    })
}

const main = () => {
    // add houses to selector
    fillHouses()
    // Initial generation of all character cards
    renderFromData(charactersData)
    // activate search form listener
    addSearchListener()

}

main()

