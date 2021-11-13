class CrawlHelper {

    resultsPageLoc = './results.html'

    startCrawler(filters) {
        this.putIntoLocalStorage(filters)
        this.redirectToResults()
    }

    putIntoLocalStorage(filters) {
        //this will pull the values from the filter objects
        window.localStorage.setItem("filters-values", JSON.stringify(filters.getFiltersValues()))

        //we need to get the options part aswell and put them in localstorage
        const depthOfSearch = document.getElementsByClassName('max-depth-input')[0]
        const searchURL = document.getElementsByClassName('url-input')[0]

        const opts = {
            depthOfSearch: depthOfSearch.value,
            searchURL: searchURL.value
        }
        window.localStorage.setItem("opts-values", JSON.stringify(opts))

    }

    removeFromLocalStorage() { window.localStorage.remove('filters-value') }

    redirectToResults() { location.href = this.resultsPageLoc }
}

export default CrawlHelper