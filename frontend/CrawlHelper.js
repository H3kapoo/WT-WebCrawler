class CrawlHelper {

    resultsPageLoc = './results.html'

    startCrawler(filters) {
        if (this.tryPutIntoLocalStorage(filters)) {
            this.redirectToResults()
        }
    }

    tryPutIntoLocalStorage(filters) {
        //we need to get the options part aswell and put them in localstorage
        const filtersJSON = filters.getFiltersValues()
        const depthOfSearch = document.getElementsByClassName('max-depth-input')[0]
        const searchURL = document.getElementsByClassName('url-input')[0]

        if (!searchURL.value.length) {
            alert('No search input provided.Please input one!')
            return false
        }

        try {
            new URL(searchURL.value)
        } catch (_) {
            alert('Input provided is not a valid URL!')
            return false
        }

        if (depthOfSearch.value < 1) {
            alert('You cannot input a depth of search less than 1!')
            return false
        }

        if (depthOfSearch.value > 10) {
            alert('You cannot input a depth of search greater than 10!')
            return false
        }

        if (!filtersJSON.root.length) {
            alert('Please input at least one filter!')
            return false
        }

        for (let input of filtersJSON.root) {
            if (!input.input) {
                alert('Please fill input fields!')
                return false
            }
        }

        const opts = {
            depthOfSearch: depthOfSearch.value,
            searchURL: searchURL.value
        }
        window.localStorage.setItem("filters-values", JSON.stringify(filtersJSON))
        window.localStorage.setItem("opts-values", JSON.stringify(opts))

        return true
    }

    removeFromLocalStorage() { window.localStorage.remove('filters-value') }

    redirectToResults() { location.href = this.resultsPageLoc }
}

export default CrawlHelper