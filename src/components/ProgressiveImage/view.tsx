import React, { useState, ReactNode, useEffect, FunctionComponent } from 'react'

interface IProgressiveImageProps {
    src: string
    fallBack: string
    className?: string
    render: (src?: string) => ReactNode
}

interface IProgressiveImageState {
    srcURI?: string
    loaded: boolean
}

const ProgressiveImage: FunctionComponent<IProgressiveImageProps> = ({ src, render, fallBack }) => {
    const initialState = {
        srcURI: undefined,
        loaded: false
    }

    const [state, setState] = useState<IProgressiveImageState>(initialState)

    const setSRC = (srcURI: string) => {
        setState((prev) => ({ ...prev, srcURI }))
    }

    const setLoaded = () => {
        setState((prev) => ({ ...prev, loaded: true }))
    }

    const resolveImage = (resolve?: any, srcURI?: string) => () => resolve && srcURI && resolve(srcURI)

    const fetchImage = async (srcURI: string): Promise<any> =>
        new Promise((resolve: any) => {
            const image = new Image()
            image.src = srcURI
            image.addEventListener('load', resolveImage(resolve, srcURI), false)
        })

    useEffect(() => {
        fetchImage(src).then((srcURI) => {
            setSRC(srcURI)
            setTimeout(() => setLoaded(), 500)
        })

        const image = new Image()
        return () => image.removeEventListener('load', resolveImage())
    }, [src, fallBack])

    return <div className={state.loaded ? 'loaded' : undefined}>{render(state.srcURI ? state.srcURI : fallBack)}</div>
}

export default ProgressiveImage
