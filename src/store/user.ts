import { Dispatch, SetStateAction } from 'react'

import {
    ENDPOINT_GITHUB_USER_NAME,
    ENDPOINT_GITHUB_USER_EVENT,
    ENDPOINT_GITHUB_USER_REPO,
    ENDPOINT_GITHUB_USER_FOLLOWING,
    ENDPOINT_GITHUB_USER_FOLLOWER,
    ENDPOINT_GITHUB_USER_QUERY
} from '~/variables/urls'

// ACTION TYPES
export const SET_USER_QUERY = 'SET/USER/QUERY'
export const SET_USER_QUERY_PREV = 'SET/USER/QUERY/PREV'

export const SET_USER_SELECTED = 'SET/USER/SELECTED'

export const SET_USER_EVENTS_NEXT = 'SET/USER/EVENTS/NEXT'
export const SET_USER_EVENTS_PREV = 'SET/USER/EVENTS/PREV'

export const SET_USER_REPOS_PANEL = 'SET/USER/REPOS/PANEL'
export const SET_USER_REPOS_NEXT = 'SET/USER/REPOS/NEXT'
export const SET_USER_REPOS_PREV = 'SET/USER/REPOS/PREV'

export const SET_USER_FOLLOWINGS_PANEL = 'SET/USER/FOLLOWINGS/PANEL'
export const SET_USER_FOLLOWINGS_NEXT = 'SET/USER/FOLLOWINGS/NEXT'
export const SET_USER_FOLLOWINGS_PREV = 'SET/USER/FOLLOWINGS/PREV'

export const SET_USER_FOLLOWERS_PANEL = 'SET/USER/FOLLOWERS/PANEL'
export const SET_USER_FOLLOWERS_NEXT = 'SET/USER/FOLLOWERS/NEXT'
export const SET_USER_FOLLOWERS_PREV = 'SET/USER/FOLLOWERS/PREV'

// DATA STRUCTURE
export interface IUserState {
    query: any[]
    queryFetch: boolean
    queryPage: number

    selected: any
    selectedFetch: boolean

    events: any[]
    eventsFetch: boolean
    eventsPage: number

    repos: any[]
    reposFetch: boolean
    reposPanel: boolean
    reposPage: number

    followings: any[]
    followingsFetch: boolean
    followingsPanel: boolean
    followingsPage: number

    followers: any[]
    followersFetch: boolean
    followersPanel: boolean
    followersPage: number
}

export const userState: IUserState = {
    query: [],
    queryFetch: false,
    queryPage: 0,

    selected: {},
    selectedFetch: false,

    events: [],
    eventsFetch: false,
    eventsPage: 0,

    repos: [],
    reposFetch: false,
    reposPanel: false,
    reposPage: 0,

    followings: [],
    followingsFetch: false,
    followingsPanel: false,
    followingsPage: 0,

    followers: [],
    followersFetch: false,
    followersPanel: false,
    followersPage: 0
}

// EFFECTS / DISPATCHER
type IUserEffects = (
    setState: Dispatch<SetStateAction<IUserState>>,
    setError: Dispatch<SetStateAction<any>>,
    payload?: any,
    next?: boolean
) => any

export const setUserQuery: IUserEffects = async (setState, setError, q, next) => {
    let currPage = 1

    setState((prev) => {
        currPage = next ? prev.queryPage + 1 : prev.queryPage > 1 ? prev.queryPage - 1 : 1

        return {
            ...prev,
            queryPage: currPage,
            queryFetch: true
        }
    })

    try {
        const pquery = await fetch(ENDPOINT_GITHUB_USER_QUERY(q, currPage))

        if (!pquery.ok) {
            throw await pquery.json()
        }

        const query = await pquery.json()

        setState((prev) => ({ ...prev, query: query.items, queryFetch: false }))
    } catch (err) {
        setState((prev) => ({ ...prev, queryFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserSelected: IUserEffects = async (setState, setError, userName) => {
    setState((prev) => ({ ...prev, selectedFetch: true }))

    try {
        const pselected = await fetch(ENDPOINT_GITHUB_USER_NAME(userName))

        if (!pselected.ok) {
            throw await pselected.json()
        }

        const selected = await pselected.json()

        setState((prev) => ({ ...prev, ...userState, selected, selectedFetch: false }))
    } catch (err) {
        setState((prev) => ({ ...prev, selectedFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserEvents: IUserEffects = async (setState, setError, userName, next) => {
    let currPage = 1

    setState((prev) => {
        currPage = next ? prev.eventsPage + 1 : prev.eventsPage > 1 ? prev.eventsPage - 1 : 1

        return {
            ...prev,
            eventsPage: currPage,
            eventsFetch: true
        }
    })

    try {
        const pevents = await fetch(ENDPOINT_GITHUB_USER_EVENT(userName, currPage))

        if (!pevents.ok) {
            throw await pevents.json()
        }

        const events = await pevents.json()

        setState((prev) => ({
            ...prev,
            events,
            eventsFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, eventsFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserRepos: IUserEffects = async (setState, setError, userName, next) => {
    let currPage = 1

    setState((prev) => {
        currPage = next ? prev.reposPage + 1 : prev.reposPage > 1 ? prev.reposPage - 1 : 1

        return {
            ...prev,
            reposPage: currPage,
            reposFetch: true
        }
    })

    try {
        const prepos = await fetch(ENDPOINT_GITHUB_USER_REPO(userName, currPage))

        if (!prepos.ok) {
            throw await prepos.json()
        }

        const repos = await prepos.json()

        setState((prev) => ({
            ...prev,
            repos,
            reposFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, reposFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserReposPanel: IUserEffects = async (setState, setError, userName) => {
    let currPage = 0

    setState((prev) => {
        currPage = prev.reposPage

        return {
            ...prev,
            reposPage: currPage,
            reposPanel: !prev.reposPanel
        }
    })

    if (!currPage) {
        try {
            await setUserRepos(setState, setError, userName, true)
        } catch (err) {
            throw err
        }
    }
}

export const setUserFollowings: IUserEffects = async (setState, setError, userName, next) => {
    let currPage = 1

    setState((prev) => {
        currPage = next ? prev.followingsPage + 1 : prev.followingsPage > 1 ? prev.followingsPage - 1 : 1

        return {
            ...prev,
            followingsPage: currPage,
            followingsFetch: true
        }
    })

    try {
        const pfollowings = await fetch(ENDPOINT_GITHUB_USER_FOLLOWING(userName, currPage))

        if (!pfollowings.ok) {
            throw await pfollowings.json()
        }

        const followings = await pfollowings.json()

        setState((prev) => ({
            ...prev,
            followings,
            followingsFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, followingsFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserFollowingsPanel: IUserEffects = async (setState, setError, userName) => {
    let currPage = 0

    setState((prev) => {
        currPage = prev.followingsPage

        return {
            ...prev,
            followingsPage: currPage,
            followingsPanel: !prev.followingsPanel
        }
    })

    if (!currPage) {
        try {
            await setUserFollowings(setState, setError, userName, true)
        } catch (err) {
            throw err
        }
    }
}

export const setUserFollowers: IUserEffects = async (setState, setError, userName, next) => {
    let currPage = 1

    setState((prev) => {
        currPage = next ? prev.followersPage + 1 : prev.followersPage > 1 ? prev.followersPage - 1 : 1

        return {
            ...prev,
            followersPage: currPage,
            followersFetch: true
        }
    })

    try {
        const pfollowers = await fetch(ENDPOINT_GITHUB_USER_FOLLOWER(userName, currPage))

        if (!pfollowers.ok) {
            throw await pfollowers.json()
        }

        const followers = await pfollowers.json()

        setState((prev) => ({
            ...prev,
            followers,
            followersFetch: false
        }))
    } catch (err) {
        setState((prev) => ({ ...prev, followersFetch: false }))
        setError({ message: err.message, statusCode: err.statusCode || 500 })
        throw err
    }
}

export const setUserFollowersPanel: IUserEffects = async (setState, setError, userName) => {
    let currPage = 0

    setState((prev) => {
        currPage = prev.followersPage

        return {
            ...prev,
            followersPage: currPage,
            followersPanel: !prev.followersPanel
        }
    })

    if (!currPage) {
        try {
            await setUserFollowers(setState, setError, userName, true)
        } catch (err) {
            throw err
        }
    }
}
