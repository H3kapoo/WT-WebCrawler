class Downloader {

    downloadLatest() {
        /* Make API call here to backend to get the stored data in mongoDB */
        this.downloadObjectAsJson({ 'ceva': 'cumva' }, 'test')
        // alert('Download latest not implemented yet')
    }

    downloadObjectAsJson(exportObj, exportName) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}

export default Downloader