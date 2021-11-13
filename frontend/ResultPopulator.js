class ResultPopulator {

    beenTurnedOnAndOff = false

    populateWithResults(results) {

        const mainContainerDOM = document.getElementsByClassName('main-container')[0]

        for (const res of results) {
            const matchInfoDOM = document.createElement('div')
            matchInfoDOM.className = 'match-info'

            /*Match info filter*/
            const matchInfoFilterDOM = document.createElement('div')
            matchInfoFilterDOM.className = 'match-info-filter'

            const matchInfoFilterTextDOM = document.createElement('h4')
            const matchInfoFilterValueDOM = document.createElement('h4')
            matchInfoFilterTextDOM.id = 'match-info-filter-text'
            matchInfoFilterTextDOM.textContent = 'Filter matched '
            matchInfoFilterValueDOM.id = 'match-info-filter-value'
            matchInfoFilterValueDOM.textContent = res['filter-matched']

            matchInfoFilterDOM.appendChild(matchInfoFilterTextDOM)
            matchInfoFilterDOM.appendChild(matchInfoFilterValueDOM)

            matchInfoDOM.appendChild(matchInfoFilterDOM)

            /*Match info link*/
            const matchInfoLinkDOM = document.createElement('div')
            matchInfoLinkDOM.className = 'match-info-link'

            const matchInfoLinkTextDOM = document.createElement('h4')
            const matchInfoLinkValueDOM = document.createElement('h4')
            matchInfoLinkTextDOM.id = 'match-info-link-text'
            matchInfoLinkTextDOM.textContent = 'Link matched '
            matchInfoLinkValueDOM.id = 'match-info-link-value'
            matchInfoLinkValueDOM.textContent = res['link-matched']

            matchInfoLinkDOM.appendChild(matchInfoLinkTextDOM)
            matchInfoLinkDOM.appendChild(matchInfoLinkValueDOM)

            matchInfoDOM.appendChild(matchInfoLinkDOM)

            /*Match info count*/
            const matchInfoCntDOM = document.createElement('div')
            matchInfoCntDOM.className = 'match-info-count'

            const matchInfoCntTextDOM = document.createElement('h4')
            const matchInfoCntValueDOM = document.createElement('h4')
            matchInfoCntTextDOM.id = 'match-info-count-text'
            matchInfoCntTextDOM.textContent = 'Times matched '
            matchInfoCntValueDOM.id = 'match-info-count-value'
            matchInfoCntValueDOM.textContent = res['times-matched']

            matchInfoCntDOM.appendChild(matchInfoCntTextDOM)
            matchInfoCntDOM.appendChild(matchInfoCntValueDOM)

            matchInfoDOM.appendChild(matchInfoCntDOM)

            /*Match info element*/
            const matchInfoElemsDOM = document.createElement('div')
            matchInfoElemsDOM.className = 'match-info-element'

            const matchInfoElemTextDOM = document.createElement('h4')
            matchInfoElemTextDOM.id = 'match-info-element-text'
            matchInfoElemTextDOM.textContent = 'HTML matched '

            matchInfoElemsDOM.appendChild(matchInfoElemTextDOM)

            for (const htmlMatched of res['html-matched']) {
                const matchInfoElemValueDOM = document.createElement('h4')
                const hrBreak = document.createElement('hr')
                matchInfoElemValueDOM.id = 'match-info-element-value'
                matchInfoElemValueDOM.textContent = htmlMatched

                matchInfoElemsDOM.appendChild(hrBreak)
                matchInfoElemsDOM.appendChild(matchInfoElemValueDOM)
            }

            matchInfoDOM.appendChild(matchInfoElemsDOM)

            mainContainerDOM.appendChild(matchInfoDOM)
        }

        this.hideWaitingNotification()
    }

    hideWaitingNotification() {

        if (!this.beenTurnedOnAndOff) {
            const crawlerSearchingDOM = document.getElementById('crawler-searching-on')
            crawlerSearchingDOM.id = 'crawler-searching-off'

            const matchesFoundDOM = document.getElementById('search-matches-text')
            matchesFoundDOM.className = 'on'
            this.beenTurnedOnAndOff = true
        }
    }
}

export default ResultPopulator