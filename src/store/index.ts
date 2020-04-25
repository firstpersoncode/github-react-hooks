import { useState, createContext, useContext } from 'react'

import {
    IUserState,
    userState,
    setUserSelected,
    setUserRepos,
    setUserEvents,
    setUserFollowings,
    setUserFollowers,
    setUserReposPanel,
    setUserFollowingsPanel,
    setUserFollowersPanel,
    SET_USER_SELECTED,
    SET_USER_EVENTS_NEXT,
    SET_USER_EVENTS_PREV,
    SET_USER_REPOS_NEXT,
    SET_USER_REPOS_PREV,
    SET_USER_FOLLOWINGS_NEXT,
    SET_USER_FOLLOWINGS_PREV,
    SET_USER_FOLLOWERS_NEXT,
    SET_USER_FOLLOWERS_PREV,
    SET_USER_REPOS_PANEL,
    SET_USER_FOLLOWINGS_PANEL,
    SET_USER_FOLLOWERS_PANEL,
    SET_USER_QUERY,
    SET_USER_QUERY_PREV,
    setUserQuery
} from './user'
import {
    IProjectState,
    projectState,
    setProjectSelected,
    setProjectContents,
    SET_PROJECT_SELECTED,
    SET_PROJECT_CONTENTS,
    SET_PROJECT_LANGUAGES,
    setProjectLanguages,
    SET_PROJECT_QUERY,
    setProjectQuery,
    SET_PROJECT_QUERY_PREV
} from './project'

export const SET_ERROR = 'SET/ERROR'

interface IActions {
    type: string
    payload?: any
}

interface IState {
    error: any
    user: IUserState
    project: IProjectState
}

export interface IStore {
    state: IState
    actions: (actions: IActions) => Promise<IState | void>
}

const initialState = {
    error: {},
    user: userState,
    project: projectState
}

export const useConfigStore = (): IStore => {
    const [error, setError] = useState(initialState.error)
    const [user, setUser] = useState<IUserState>(initialState.user)
    const [project, setProject] = useState<IProjectState>(initialState.project)

    const state = {
        error,
        user,
        project
    }

    const actions = async ({ type, payload }: IActions) => {
        switch (type) {
            case SET_ERROR:
                return setError(payload)

            case SET_USER_QUERY:
                return await setUserQuery(setUser, setError, payload, true)
            case SET_USER_QUERY_PREV:
                return await setUserQuery(setUser, setError, payload, false)

            case SET_USER_SELECTED:
                return await setUserSelected(setUser, setError, payload)

            case SET_USER_EVENTS_NEXT:
                return await setUserEvents(setUser, setError, payload, true)
            case SET_USER_EVENTS_PREV:
                return await setUserEvents(setUser, setError, payload, false)

            case SET_USER_REPOS_PANEL:
                return await setUserReposPanel(setUser, setError, payload)
            case SET_USER_REPOS_NEXT:
                return await setUserRepos(setUser, setError, payload, true)
            case SET_USER_REPOS_PREV:
                return await setUserRepos(setUser, setError, payload, false)

            case SET_USER_FOLLOWINGS_PANEL:
                return await setUserFollowingsPanel(setUser, setError, payload)
            case SET_USER_FOLLOWINGS_NEXT:
                return await setUserFollowings(setUser, setError, payload, true)
            case SET_USER_FOLLOWINGS_PREV:
                return await setUserFollowings(setUser, setError, payload, false)

            case SET_USER_FOLLOWERS_PANEL:
                return await setUserFollowersPanel(setUser, setError, payload)
            case SET_USER_FOLLOWERS_NEXT:
                return await setUserFollowers(setUser, setError, payload, true)
            case SET_USER_FOLLOWERS_PREV:
                return await setUserFollowers(setUser, setError, payload, false)

            case SET_PROJECT_QUERY:
                return await setProjectQuery(setProject, setError, payload, true)
            case SET_PROJECT_QUERY_PREV:
                return await setProjectQuery(setProject, setError, payload, false)

            case SET_PROJECT_SELECTED:
                return await setProjectSelected(setProject, setError, payload)

            case SET_PROJECT_CONTENTS:
                return await setProjectContents(setProject, setError, payload)

            case SET_PROJECT_LANGUAGES:
                return await setProjectLanguages(setProject, setError, payload)

            default:
                return state
        }
    }

    return {
        state,
        actions
    }
}

export const Context = createContext<IStore>({ state: initialState } as IStore)

const useStore = () => useContext<IStore>(Context)

export default useStore
