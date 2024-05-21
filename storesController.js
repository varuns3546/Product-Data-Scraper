const Store = require('./models/storeModel')
const mongoose = require('mongoose')


const getStores = async (req, res) => {
    const stores = await Store.find({}).sort({ createdAt: -1 }).select('-products'); 

    res.status(200).json(stores)
}

const getStore = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no store found'})
    }

    const store = await Store.findById(id).select('-products'); 

    if(!store){
        return res.status(404).json({error: 'no store found'})
    }

    res.status(200).json(store)
}

const getProducts = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no store found'})
    }

    const store = await Store.findById(id)

    if(!store){
        return res.status(404).json({error: 'no store found'})
    }

    res.status(200).json(store.products);
}

const createStore = async (req, res) => {
    const { title, url, targetSelector, waitForSelector, regex} = req.body;
    
    try {
        let storeData = { title, url, targetSelector, waitForSelector, regex, products: [] };
        
        const store = await Store.create(storeData);

        res.status(200).json(store);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteStore = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no store found'})
    }

    const store = await Store.findOneAndDelete({_id: id})

    if(!store){
        return res.status(404).json({error: 'no store found'})
    }

    res.status(200).json(store)

}

const updateStore = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no store found'})
    }

    console.log(req.body)
    const store = await Store.findOneAndUpdate({ _id: id }, req.body, { new: true });


    if(!store){
        return res.status(404).json({error: 'no store found'})
    }

    res.status(200).json(store)
}

const toggleScrape = async (req, res) => {
    
}

module.exports = {
    getStores,
    getStore,
    createStore,
    deleteStore,
    updateStore,
    getProducts,
    toggleScrape
}