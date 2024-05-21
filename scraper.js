require('dotenv').config();

class Scraper{

    constructor(store) {
        this.url = store.url
        this.targetSelector = store.targetSelector
        this.waitForSelector = store.waitForSelector
        this.regex = store.regex
        this.products = store.products
    }  

    async scrape() {
        try {
        const response = await fetch(`https://r.jina.ai/${this.url}`, {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Authorization": process.env.JINA_AI_AUTH,
            "X-Target-Selector": this.targetSelector,
            "X-Wait-For-Selector": this.waitForSelector
            }
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const json = await response.json()
        const content = json.data.content
        const re = new RegExp(this.regex);

        const testRegex = /\[([^\[\]\d\+\n\r"]+)\]\((https:\/\/[^)]+)\)/g
        const tRString = testRegex.toString()
        console.log(tRString)
        const regexFromString = new RegExp(tRString);
        const parsedContent = content.match(regexFromString);

        console.log(parsedContent)
        return null
        }
        catch (error) {
        console.error('Error:', error);
        throw error;
        }
    }
   
}

module.exports = Scraper