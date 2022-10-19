import defaultSettings from '@/settings'

const title = defaultSettings.title || 'SheepCoin'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}
