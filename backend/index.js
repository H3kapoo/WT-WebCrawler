const express = require('express')
const cors = require('cors')
const cheerio = require('cheerio')
const axios = require('axios')
const { saveToDb, getLatestFromDb } = require('./mongoManager')
const app = express()

app.use(express.json())
app.use(cors())

app.post('/compute', async (req, res) => {

    const startUrl = req.body.data.options.searchURL
    const maxDepth = req.body.data.options.depthOfSearch
    const filters = req.body.data.filtersValues.root

    try {
        const returned = await crawl(startUrl, filters, maxDepth)

        if (returned.length)
            await saveToDb(returned)

        res.send(returned)
    } catch (ex) {
        // send back a timeout response and that the user should try again
        res.send({ 'timeoutLink': req.body.data.options.searchURL })
    }
})

app.get('/get-latest', async (req, res) => {
    const thedata = await getLatestFromDb()
    res.send(thedata)
})

app.post('/save', async (req, res) => {
    const thedata = await saveToDb(req.body.data.results)
    res.send(thedata)
})

async function crawl(startLink, filters, maxDepth) {

    const visitedLinks = new Set()
    const links = [startLink]

    let masterReturn = []
    let maxIter = 10
    let iter = 0
    while (links && iter < maxIter * maxDepth) {

        let link = links.shift()

        if (visitedLinks.has(link) || !link)
            continue
        visitedLinks.add(link)

        let response = null
        try {
            response = await axios.get(link, { timeout: 5000 })
        } catch (ex) { continue }

        const $ = cheerio.load(response.data)

        const returned = crawlLink(link, $, filters)
        for (el of getAnchorsFromLink(startLink, $))
            links.push(el)

        masterReturn = masterReturn.concat(returned)
        iter++
    }

    return masterReturn
}

function crawlLink(searchLink, pageData, filters) {
    let returned = []
    for (let filter of filters) {
        let res = extractFromFilter(searchLink, pageData, filter)
        if (res['times-matched'] > 0)
            returned.push(res)
    }
    return returned
}

function getAnchorsFromLink(startLink, pageData) {
    //get all 'a' links
    let linksList = []
    const links = pageData('a')
    for (let el of links) {
        let nextLink = pageData(el).attr('href')
        if (nextLink == '#')
            continue
        if (nextLink && !nextLink.startsWith('http'))
            nextLink = startLink + nextLink
        linksList.push(nextLink)
    }
    return linksList
}

/* Will return a [] of element-data that matched this filter */
function extractFromFilter(searchLink, pageData, filter) {
    const elementDOM = filter.element
    const predicate = filter.predicate
    const attr = filter.attr
    const input = filter.input

    let elements = null

    switch (predicate) {
        case 'having':
            elements = pageData(`${elementDOM}[${attr}=${input}]`)
            break
        case 'not having':
            elements = pageData(`${elementDOM}[${attr}!=${input}]`)
            break
    }

    let htmlList = []
    for (let elem of elements) {
        const html = pageData.html(elem)
        if (html.length > 100)
            htmlList.push(pageData.html(elem).substr(0, 100) + '...')
        else
            htmlList.push(pageData.html(elem))
    }

    const result = {
        'filter-matched': `${elementDOM} ${predicate} ${attr} ${input}`,
        'link-matched': `${searchLink}`,
        'times-matched': elements.length,
        'html-matched': htmlList
    }

    return result
}

app.listen(3000)