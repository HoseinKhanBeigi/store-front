import type { ReactElement } from 'react'
import { PrimaryLayout } from '../../components/PrimaryLayout'
import type { NextPageWithLayout } from '../_app'

const Products: NextPageWithLayout = () => {
    return <p>Products Page</p>
}

Products.getLayout = (page: ReactElement) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    )
}

export default Products