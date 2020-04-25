/* HOSTS */
const HOST_GOOGLE_CDN = 'https://fonts.googleapis.com'

/* API */
export const GITHUB_HOST_API = 'https://api.github.com'

/* CDNS */
export const CDN_MATERIALUI_ICONS = HOST_GOOGLE_CDN + '/icon?family=Material+Icons'
export const CDN_GOOGLE_FONT_STYLES = HOST_GOOGLE_CDN + '/css?family=Roboto+Condensed:300,400,500,700'

/* ROUTING */
// always end slug with `/` for better SEO
// that should indicate that we are in the root of the parent slug
export const PATH_ROOT = '/'
// project
export const PATH_PROJECT = PATH_ROOT + 'project/'
// about
export const PATH_ABOUT = PATH_ROOT + 'about/'

// ENDPOINT
// except for endpoints, do not end slug with `/`
const clientId = process.env.APP_CLIENT
const clientSecret = process.env.APP_SECRET
// user
export const ENDPOINT_GITHUB_USER = GITHUB_HOST_API + '/users'
export const ENDPOINT_GITHUB_USER_QUERY = (q: string, page: number) =>
    GITHUB_HOST_API +
    '/search/users?q=' +
    q +
    '&page=' +
    page +
    '&per_page=16&client_id=' +
    clientId +
    '&client_secret=' +
    clientSecret
export const ENDPOINT_GITHUB_USER_NAME = (userName: string) =>
    ENDPOINT_GITHUB_USER + '/' + userName + '?client_id=' + clientId + '&client_secret=' + clientSecret
export const ENDPOINT_GITHUB_USER_REPO = (userName: string, page: number) =>
    ENDPOINT_GITHUB_USER +
    '/' +
    userName +
    '/repos?page=' +
    page +
    '&per_page=5&sort=updated_at&client_id=' +
    clientId +
    '&client_secret=' +
    clientSecret
export const ENDPOINT_GITHUB_USER_EVENT = (userName: string, page: number) =>
    ENDPOINT_GITHUB_USER +
    '/' +
    userName +
    '/events?page=' +
    page +
    '&per_page=5&client_id=' +
    clientId +
    '&client_secret=' +
    clientSecret
export const ENDPOINT_GITHUB_USER_FOLLOWING = (userName: string, page: number) =>
    ENDPOINT_GITHUB_USER +
    '/' +
    userName +
    '/following?page=' +
    page +
    '&per_page=5&client_id=' +
    clientId +
    '&client_secret=' +
    clientSecret
export const ENDPOINT_GITHUB_USER_FOLLOWER = (userName: string, page: number) =>
    ENDPOINT_GITHUB_USER +
    '/' +
    userName +
    '/followers?page=' +
    page +
    '&per_page=5&client_id=' +
    clientId +
    '&client_secret=' +
    clientSecret

// project
export const ENDPOINT_GITHUB_PROJECT = GITHUB_HOST_API + '/repos'
export const ENDPOINT_GITHUB_PROJECT_QUERY = (q: string, page: number) =>
    GITHUB_HOST_API +
    '/search/repositories?q=' +
    q +
    '&page=' +
    page +
    '&per_page=16&client_id=' +
    clientId +
    '&client_secret=' +
    clientSecret
export const ENDPOINT_GITHUB_PROJECT_NAME = (projectName: string) =>
    ENDPOINT_GITHUB_PROJECT + '/' + projectName + '?client_id=' + clientId + '&client_secret=' + clientSecret
export const ENDPOINT_GITHUB_PROJECT_CONTENT = (projectName: string) =>
    ENDPOINT_GITHUB_PROJECT + '/' + projectName + '/contents?client_id=' + clientId + '&client_secret=' + clientSecret
export const ENDPOINT_GITHUB_PROJECT_LANGUAGE = (projectName: string) =>
    ENDPOINT_GITHUB_PROJECT + '/' + projectName + '/languages?client_id=' + clientId + '&client_secret=' + clientSecret
