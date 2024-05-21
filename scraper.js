require('dotenv').config();

class Scraper{

    constructor(store) {
        this.url = store.url
        this.targetSelector = store.targetSelector
        this.waitForSelector = store.waitForSelector
        this.regex = store.regex
        this.products = store.products
    }  

    async fetchData() {
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

        const parsedContent = content.match(re);
        console.log(parsedContent)
        }

        catch (error) {
        console.error('Error:', error);
        throw error;
        }
    }
   
}