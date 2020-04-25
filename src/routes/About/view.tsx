import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet-async'

const About: FunctionComponent = () => (
    <>
        <Helmet>
            <title>About</title>
            <meta name="title" content="About" />
            <meta name="description" content="GitHub page with user search and repository search, build using React" />
        </Helmet>
        <p>GitHub page with user search and repository search, build using React</p>
        <p>Nasser Maronie: nassermaronie@gmail.com</p>
        <p>git@github.com:firstpersoncode/github-react-hooks.git</p>
    </>
)

export default About
