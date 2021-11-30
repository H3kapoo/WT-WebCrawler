class FilterObject {

    elemsOptList = ['a', 'h3', 'h2', 'h1', 'div']
    predsOptList = ['having', 'not having']
    attrsOptList = ['text', 'href', 'name', 'id', 'class']
    localID = 0
    selectElementDOM = null
    prepicElementDOM = null
    attrsElementDOM = null
    inputElementDOM = null

    constructor(id) { this.createFilter(id) }

    createFilter(id) {
        const mainContainerDOM = document.getElementsByClassName('filter-space')[0]
        const filterOptionDOM = document.createElement('div')
        filterOptionDOM.className = 'filter-option'
        filterOptionDOM.id = 'filter-option-' + id

        this.localID = id

        this.selectElementDOM = document.createElement('select')
        this.prepicElementDOM = document.createElement('select')
        this.attrsElementDOM = document.createElement('select')
        this.inputElementDOM = document.createElement('input')
        const buttonElementDOM = document.createElement('button')

        this.selectElementDOM.className = 'filter-option-element'
        this.prepicElementDOM.className = 'filter-option-predicate'
        this.attrsElementDOM.className = 'filter-option-attr'
        this.inputElementDOM.id = 'filter-option-input'
        buttonElementDOM.className = 'trash-option'

        this.selectElementDOM = this.populateFilterOption(this.selectElementDOM, this.elemsOptList)
        this.prepicElementDOM = this.populateFilterOption(this.prepicElementDOM, this.predsOptList)
        this.attrsElementDOM = this.populateFilterOption(this.attrsElementDOM, this.attrsOptList)
        this.inputElementDOM.placeholder = 'Filter input..'
        buttonElementDOM.textContent = 'X'

        filterOptionDOM.appendChild(this.selectElementDOM)
        filterOptionDOM.appendChild(this.prepicElementDOM)
        filterOptionDOM.appendChild(this.attrsElementDOM)
        filterOptionDOM.appendChild(this.inputElementDOM)
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
        const element = this.selectElementDOM.value
        const predicate = this.prepicElementDOM.value
        const attr = this.attrsElementDOM.value
        const input = this.inputElementDOM.value

        return { element, predicate, attr, input }
    }
}

export default FilterObject