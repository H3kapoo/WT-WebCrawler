import './Style/index.css'

import FilterContainer from './FiltersContainer'
import Downloader from './Downloader'
import CrawlHelper from './CrawlHelper'

const filtersContainer = new FilterContainer()
const downloader = new Downloader()
const crawlHelper = new CrawlHelper()

const addFilterBtn = document.getElementsByClassName('add-filter-btn')[0]
const downloadSavedBtn = document.getElementById('dwn-latest-saved')
const crawlerBtn = document.getElementsByClassName('crawl-btn')[0]

addFilterBtn.addEventListener('click', () => filtersContainer.addFilter())
downloadSavedBtn.addEventListener('click', () => downloader.downloadLatest())
crawlerBtn.addEventListener('click', () => crawlHelper.startCrawler(filtersContainer))


