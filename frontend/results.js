import './Style/results.css'
import Requestor from './Requestor'
import ResultPopulator from './ResultPopulator'

const resultPopulator = new ResultPopulator()

new Requestor().requestCrawlingForStoredConfig((results) => {
    resultPopulator.populateWithResults(results)
    const saveButton = document.getElementById('save-btn')
    saveButton.addEventListener('click', () => {
        alert('Save not implemented')
    })

    const dwnBtn = document.getElementById('dwn-btn')

    dwnBtn.addEventListener('click', () => {
        alert('Dwn not implemented')
    })

})