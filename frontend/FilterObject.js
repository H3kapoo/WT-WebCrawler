class FilterObject {

    elemsOptList = ['a', 'h3', 'h2', 'h1']
    predsOptList = ['having', 'not having']
    attrsOptList = ['inside-text', 'href', 'name', 'id', 'class']
    localID = 0

    constructor(id) { this.createFilter(id) }

    createFilter(id) {
        const mainContainerDOM = document.getElementsByClassName('filter-space')[0]
        const filterOptionDOM = document.createElement('div')
        filterOptionDOM.className = 'filter-option'
        filterOptionDOM.id = 'filter-option-' + id

        this.localID = id

        let selectElementDOM = document.createElement('select')
        let prepicElementDOM = document.createElement('select')
        let attrsElementDOM = document.createElement('select')
        const inputElementDOM = document.createElement('input')
        const buttonElementDOM = document.createElement('button')

        selectElementDOM.className = 'filter-option-element'
        prepicElementDOM.className = 'filter-option-predicate'
        attrsElementDOM.className = 'filter-option-attr'
        inputElementDOM.id = 'filter-option-input'
        buttonElementDOM.className = 'trash-option'

        selectElementDOM = this.populateFilterOption(selectElementDOM, this.elemsOptList)
        prepicElementDOM = this.populateFilterOption(prepicElementDOM, this.predsOptList)
        attrsElementDOM = this.populateFilterOption(attrsElementDOM, this.attrsOptList)
        inputElementDOM.placeholder = 'Filter input..'
        buttonElementDOM.textContent = 'X'

        filterOptionDOM.appendChild(selectElementDOM)
        filterOptionDOM.appendChild(prepicElementDOM)
        filterOptionDOM.appendChild(attrsElementDOM)
        filterOptionDOM.appendChild(inputElementDOM)
        filterOptionDOM.appendChild(buttonElementDOM)

        mainContainerDOM.appendChild(filterOptionDOM)
        console.log(`filter-option-${this.localID}`)


        // add button listener to remove DOM element on click
        buttonElementDOM.addEventListener('click', () => {
            console.log(`filter-option-${this.localID}`)
            document.getElementById(`filter-option-${this.localID}`).remove()
        })
    }

    populateFilterOption(selectElementDOM, optsList) {
        for (let op of optsList) {
            const opt = document.createElement('option')
            opt.value = op
            opt.text = op
            selectElementDOM.appendChild(opt)
        }
        return selectElementDOM
    }

    getValues() {

        return { "pop": 3 }
    }
}

export default FilterObject