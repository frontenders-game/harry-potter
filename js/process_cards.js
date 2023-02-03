const KEYS = ['born', 'died', 'gender', 'species', 'house', 'height', 'weight', 'hair_color', 'eye_color', 'skin_color', 'blood_status', 'marital_status', 'nationality', 'animagus', 'boggart', 'patronus', 'alias_names', 'family_members', 'jobs', 'romances', 'titles', 'wands', 'wiki']

const SHORT_KEYS = ['gender', 'species', 'house', 'wands', 'born', 'died']

const processKey = key => key[0].toUpperCase() + key.slice(1).replace('_', ' ')

const processAttributes = (key, data) => {
    if (Array.isArray(data)) {
        return data.join(', ')
    } else {
        if (key === 'house') return data || 'Unknown'
        else if (key === 'born') return data || 'Date unknown'
        else if (key === 'died') return data || 'Alive'
        else if (key === 'wiki') {
            return `<a class="character__url wand-cursor" href="${data}" id="" target="_blank">url</a>`
        }

    }
    return data
}

const generateCardAttributes = (characterObj, keys) => {
    // {
    //     "id": "8c43c796-2e42-4a81-8d37-447a02e4235a",
    //     "type": "character",
    //     "attributes": {
    //         "slug": "harry-potter",
    //         "name": "Harry James Potter",
    //         "born": "31 July 1980, Godric's Hollow, West Country, England, Great Britain",
    //         "died": null,
    //         "gender": "Male",
    //         "species": "Human",
    //         "height": null,
    //         "weight": null,
    //         "hair_color": "Jet-black",
    //         "eye_color": "Bright green",
    //         "skin_color": "Light",
    //         "blood_status": "Half-blood",
    //         "marital_status": "Married",
    //         "nationality": "English",
    //         "animagus": null,
    //         "boggart": "Dementor",
    //         "house": "Gryffindor",
    //         "patronus": "Stag",
    //         "alias_names": ["The Boy Who Lived", "The Chosen One", "Undesirable No. 1", "Lightning
    //                          (by Potterwatch)", "The Boy Who Lied (by the Daily Prophet)", "Gregory Goyle
    //                          (under disguise of Polyjuice Potion)"],
    //         "family_members": ["James Potter I (father) †", "Lily J. Potter (née Evans) (mother) †",
    //                            "Ginevra Potter (née Weasley) (wife)", "James Potter II (son)"]
    //         "jobs": ["Head of British Auror Office (formerly)",
    //                  "Guest lecturer on Defence Against the Dark Arts"],
    //         "romances": ["Cho Chang (ex-girlfriend)", "Ginevra Potter (wife)"],
    //         "titles": ["Triwizard Champion", "Seeker", "Quidditch Captain", "Master of Death"],
    //         "wands": ["11', Holly, phoenix feather", "10¾', Vine, dragon heartstring (temporarily)",
    //                   "10', Blackthorn, unknown core (temporarily)"],
    //         "image": "https://static.wikia.nocookie.net/harrypotter/images/9/97/Harry_Potter.jpg",
    //         "wiki": "https://harrypotter.fandom.com/wiki/Harry_Potter"
    //     }
    // }

    const attrs = characterObj.attributes

    const attrsResult = []
    for (let key of keys) {
        const value = attrs[key]
        if (value || key === 'house') {
            attrsResult.push(`<p><b>${processKey(key)}</b>: ${processAttributes(key, value)}</p>`)
        }
    }
    return attrsResult.join('\n')

}


export const siteCardHTML = characterObj => {
    const attrs = characterObj.attributes
    const attributes = generateCardAttributes(characterObj, SHORT_KEYS)
    const title = `<a href="#" id="${characterObj.id}" class="character__url wand-cursor">${attrs.name}</a>`

    return `<div class="character-image-wrapper">
                <img class="character__image" src="${attrs.image}" alt="image of ${attrs.name}">
            </div>
            <div class="character-text-wrapper">
                <h3 class='character__title'>${title}</h3>
                ${attributes}
            </div>`
}

export const modalCardHTML = characterObj => {
    const attrs = characterObj.attributes
    const attributes = generateCardAttributes(characterObj, KEYS)
    // todo: no scroll on image+title, scroll on attributes
    return `<div class="modal__image-wrapper">
                <img class="character__image" src="${attrs.image}" alt="image of ${attrs.name}">
            </div>  
            <h3 class='modal-character__title'>${attrs.name}</h3>
            <div class="modal__text-wrapper">
                ${attributes}
            </div>  
            <button class="modal__close-btn wand-cursor"></button>`
}
