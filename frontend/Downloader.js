import * as axios from 'axios'

class Downloader {

    downloadLatest() {
        /* Make API call here to backend to get the stored data from mongoDB */
        axios.get('http://localhost:3000/get-latest').then((returned) => {
            if (returned.data)
                this.downloadObjectAsJson(returned.data, 'latest')
            else
                alert('You have no saved file in the database!')
        })
    }

    downloadObjectAsJson(exportObj, exportName) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj))
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", exportName + ".json")
        document.body.appendChild(downloadAnchorNode) // required for firefox
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }
}

export default Downloader