import { Module } from "../core/module"
import { random } from "../utils"

export class CustomMessageModule extends Module {
    #customMessageWrapperElement
    #fetchIDsArray = []
    #fetchedQuotes = []
    #defaultMessagesArray = [
        'Your time is limited, so don\'t waste it living someone else\'s life.',
        'Whoever is happy will make others happy too.',
        'Life is either a daring adventure or nothing at all.',
        'You will face many defeats in life, but never let yourself be defeated.',
        'Success is walking from failure to failure with no loss of enthusiasm.'
    ]

    constructor(type, text) {
        super(type, text);
        this.#generateHTML()
        this.#initializeFetchIDsArray()
        this.#fetchQuotes()
    }

    #destructor() {
        this.#customMessageWrapperElement.remove()
    }

    trigger() {
        if (document.body.querySelector('.custom-message-wrapper'))
            this.#destructor()
        else
            this.#showQuote()
    }

    #generateHTML() {
        this.#customMessageWrapperElement = document.createElement('div')
        this.#customMessageWrapperElement.className = 'custom-message-wrapper'
        const anchor = document.createElement('div')
        anchor.className = 'custom-message-quote'
        this.#customMessageWrapperElement.append(anchor)
    }

    #initializeFetchIDsArray() {
        for (let i = 0 ; i < 5 ; i++){
            this.#fetchIDsArray.push(random(0, 1600))
        }
    }

    async #fetchQuotes() {
        try {
            const fetchResponse = await fetch("https://type.fit/api/quotes")
            this.#checkFetchedData(fetchResponse)

            const decryptedResponse = await fetchResponse.json()
            this.#fetchedQuotes = this.#fetchIDsArray.map(id => decryptedResponse[id].text)
        }
        catch (error) {
            console.error(error)
            this.#fetchedQuotes = [...this.#defaultMessagesArray]
        }

    }

    #checkFetchedData(data) {
        if (!data.ok)
            throw new Error('Failed fetching data')
    }

    #showQuote() {
        this.#customMessageWrapperElement.querySelector('.custom-message-quote')
            .textContent = this.#fetchedQuotes[random(0,4)]

        document.body.append(this.#customMessageWrapperElement)
        setTimeout(this.#destructor.bind(this), 5000)
    }
}