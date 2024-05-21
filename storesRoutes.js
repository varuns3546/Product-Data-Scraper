const express = require('express')
const {
    getStores,
    getStore,
    createStore,
    deleteStore,
    updateStore,
    getProducts,
    toggleScrape
} = require('./storesController')

const router = express.Router()

router.get('/', getStores)

router.get('/:id', getStore)

router.get('/:id/products', getProducts)

router.post('/', createStore)

router.delete('/:id', deleteStore)

router.patch('/:id', updateStore)

router.get('/:id/scrape', toggleScrape)

module.exports = router