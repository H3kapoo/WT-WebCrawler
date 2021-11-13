import FilterObject from "./FilterObject"

class FilterContainer {

    filters = []
    elemsOptList = ['a', 'h3', 'h2', 'h1']
    predsOptList = ['having', 'not having']
    attrsOptList = ['inside-text', 'href', 'name', 'id', 'class']
    idGiver = 0

    constructor() {
    }

    addFilter() {
        this.filters.push(new FilterObject(this.idGiver++))
    }

    getFiltersValues() {
        let values = {
            root: []
        }

        for (const filter of this.filters) {
            const filterValues = filter.getValues()
            values.root.push(filterValues)
        }

        return values
    }

}

export default FilterContainer