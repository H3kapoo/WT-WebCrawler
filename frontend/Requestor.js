class Requestor {

    requestCrawlingForStoredConfig(populateCallback) {
        //this will make the axios GET request to the backend server
        const filtersValues = JSON.parse(window.localStorage.getItem("filters-values"))
        const options = JSON.parse(window.localStorage.getItem("opts-values"))

        this.populateOptsValues(options)
        console.log(filtersValues, options)

        //api trigger to backend for actual results based on filters
        const returned = [{
            'filter-matched': "'a' contains inside text 'ceva text'",
            'link-matched': 'https://www.google.com',
            'times-matched': '30',
            'html-matched': [
                "some HTML string here some HTML string here some HTML string here some HTML string here some HTML string here some HTML string here some",
                "some HTML string here some HTML string here some HTML string here some HTML string here some HTML string here some HTML string here some",
                "some HTML string here some HTML string here some HTML string here some HTML string here some HTML string here some HTML string here some"
            ]
        }
        ]
        // setInterval(() => populateCallback(returned), 5000)
        populateCallback(returned)
    }

    populateOptsValues(options) {
        const startUrlDOM = document.getElementById('q-start-url')
        const maxDepthDOM = document.getElementById('q-max-depth')

        startUrlDOM.textContent = 'Start URL: ' + options.searchURL
        maxDepthDOM.textContent = 'Using a max depth of: ' + options.depthOfSearch
    }
}

export default Requestor