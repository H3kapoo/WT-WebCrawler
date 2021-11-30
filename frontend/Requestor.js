import * as axios from 'axios'

class Requestor {

    requestCrawlingForStoredConfig(populateCallback) {
        //this will make the axios POST request to the backend server
        const filtersValues = JSON.parse(window.localStorage.getItem("filters-values"))
        const options = JSON.parse(window.localStorage.getItem("opts-values"))

        this.populateOptsValues(options)

        /* Make request to backend to download the HTML of base url and compute
           the result list based on max depth and filters from frontend */
        axios.post('http://localhost:3000/compute',
            {
                data: {
                    options, filtersValues
                }
            }
        ).then((returned) => {
            populateCallback(returned.data)
        })
    }

    populateOptsValues(options) {
        const startUrlDOM = document.getElementById('q-start-url')
        const maxDepthDOM = document.getElementById('q-max-depth')

        startUrlDOM.textContent = 'Start URL: ' + options.searchURL
        maxDepthDOM.textContent = 'Using a max depth of: ' + options.depthOfSearch
    }
}

export default Requestor