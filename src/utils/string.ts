export const extractHostName = (url: string) => url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]

export const extractProtocol = (url: string) => url.split(':')[0]

export const formatDate = (
    monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    date: any
) => date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
