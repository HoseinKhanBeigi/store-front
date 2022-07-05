import type { ReactElement } from 'react'
import { SecondaryLayout } from '../components/SecondaryLayout'
import type { NextPageWithLayout } from './_app'

const About: NextPageWithLayout = (props) => {

    console.log(props, "props");

    return <p>About Page</p>
}

About.getLayout = (page: ReactElement) => {
    return (
        <SecondaryLayout>
            {page}
        </SecondaryLayout>
    )
}

export async function getServerSideProps(context: any) {

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    const data = await res.json()
    return { props: { data } }
}



export default About