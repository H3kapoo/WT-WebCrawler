import './Style/results.css'
import Requestor from './Requestor'
import ResultPopulator from './ResultPopulator'
import * as axios from 'axios'

const resultPopulator = new ResultPopulator()

new Requestor().requestCrawlingForStoredConfig((results) => {
    resultPopulator.populateWithResults(results)

    const saveButton = document.getElementById('save-btn')
    saveButton.addEventListener('click', () => {
        /*Make API call to backend to save the collected data*/
        axios.post('http://localhost:3000/save',
            {
                data: {
                    results
                }
            }
        ).then(() => {
            alert('Data saved into database!')
        }).catch(() => {
            alert('Data failed to be saved!')
        })
    })

    const dwnBtn = document.getElementById('dwn-btn')

    dwnBtn.addEventListener('click', () => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results))
        var downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", "downloaded.json")
        document.body.appendChild(downloadAnchorNode) // required for firefox
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    })

})