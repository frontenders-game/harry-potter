import potterDBData from "./potterdb/potterdbdata.js";


const main = () => {
  // load json with character cards
  const charactersData = JSON.parse(JSON.stringify(potterDBData))

  // select container for character cards
  const cardContainer = document.querySelector('div.main-wrapper')

  // div with characters
  const clearCharacters = () => cardContainer.innerHTML = ''

  // div with search input and selector
  const searchForm = document.querySelector('.search-wrapper')

  // name search
  const nameForm = document.querySelector('.search__name-input')

  // house selector
  const houseSelector = document.querySelector('.search__house-selector')

  const houseList = () => {
    const houses = potterDBData.reduce((acc, current) => acc.add(current.attributes.house), new Set())
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
    createOption('All schools', '')
    for (let house of houseList()){
      createOption(house, house)
    }
  }

  // add houses to selector
  fillHouses()

  // function to render each card
  const createCharacterCard = characterObj => {
    // {
    //   "id": "17a9946f-edf3-4731-97c1-e4cc7a664db5",
    //     "type": "character",
    //     "attributes": {
    //       "slug": "witch-and-wizard-couple",
    //       "name": "Witch and Wizard Couple",
    //       "born": null,
    //       "died": "Between 1485 and 1603",
    //       "gender": "Male, Female",
    //       "species": "Humans",
    //       "height": null,
    //       "weight": null,
    //       "hair_color": "Brown",
    //       "eye_color": null,
    //       "skin_color": "Light",
    //       "blood_status": null,
    //       "marital_status": "Married (possibly)",
    //       "nationality": null,
    //       "animagus": null,
    //       "boggart": null,
    //       "house": null,
    //       "patronus": null,
    //       "alias_names": null,
    //       "family_members": null,
    //       "jobs": null,
    //       "romances": null,
    //       "titles": null,
    //       "wands": null,
    //       "image": "https://static.wikia.nocookie.net/harrypotter/images/a/ab/Portrait_of_a_medieval_couple.jpg",
    //       "wiki": "https://harrypotter.fandom.com/wiki/Witch_and_Wizard_Couple"
    //    }
    // }
    const {image, name, species, gender, house, wands, died, born} = characterObj.attributes

    const fmtWands = wands.join(', ')
    const card = document.createElement('div')
    card.className = 'character-card'
    card.innerHTML = `
                      <div class="character-wrapper">
                      <div class="character-image-wrapper">
                        <img class="character__image" src="${image}" alt="image of ${name}">
                      </div>  
                        <div class="character-text-wrapper">
                          <h3 class='character__title'>${name}</h3>
                          <p><b>Species</b>: ${species}</p>
                          <p><b>Gender</b>: ${gender}</p>
                          <p><b>House</b>: ${house || 'Unknown'}</p>
                          <p><b>Wands</b>: ${fmtWands}</p>
                          <p><b>Born</b>: ${born || 'Date unknown'}</p>
                          <p><b>Died</b>: ${died || 'Alive'}</p>
                        </div>
                     </div>`
    return card

  }

    // function to generate html from array with json
  const renderFromData = dataArr => dataArr.forEach(character => cardContainer.append(createCharacterCard(character)))

  // Initial generation of all character cards
  renderFromData(charactersData)


  searchForm.addEventListener('input', () => {
    const fmtName = nameForm.value.toLowerCase().trim()

    const house = houseSelector.value
    console.dir(houseSelector)
    console.log(fmtName, house) // '', Slytherin, Unknown
    const filteredCharacters = charactersData
        .filter(character => character.attributes.name.toLowerCase().includes(fmtName))
        .filter(character =>  {
          const characterHouse  = character.attributes.house || 'Unknown'  // "house": null =>  "house": "Unknown"
          console.log(house, !house)
          return characterHouse === house || !house
        })



    clearCharacters()
    renderFromData(filteredCharacters)
  })
}

main()

