const mongoClient = require('mongodb').MongoClient

const uri = 'mongodb+srv://hekapoo:asdfghjkl1@cluster0.0z3hh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

async function saveToDb(data) {

    const client = await mongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err) })

    if (!client)
        return

    try {
        const db = client.db("WT-Crawler");
        const collection = db.collection('crawled-data')

        const findResult = await collection.findOne({})

        /* If we already have an entry, just update it */
        if (findResult) {
            const res = await collection.updateOne({},
                {
                    $set: { data }
                })
            console.log(res)
            return res

        } else {

            const res = await collection.insertOne({ data })
            console.log(res)
            return res
        }

    } catch (err) {
        console.log(err)
    } finally {
        client.close()
    }

    return null
}

async function getLatestFromDb() {

    const client = await mongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err) })

    if (!client)
        return

    try {

        const db = client.db("WT-Crawler");
        const collection = db.collection('crawled-data')

        const findResult = await collection.findOne({})

        return findResult

    } catch (err) {
        console.log(err)
    } finally {
        client.close()
    }

    return null
}
module.exports = { saveToDb, getLatestFromDb }