import type { ReactElement } from 'react'
import { SecondaryLayout } from '../components/SecondaryLayout'
import type { NextPageWithLayout } from './_app'

const About: NextPageWithLayout = () => {
    return <p>About Page</p>
}

About.getLayout = (page: ReactElement) => {
    return (
        <SecondaryLayout>
            {page}
        </SecondaryLayout>
    )
}

export default About