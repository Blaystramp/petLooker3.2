import React,{ useEffect } from 'react'
import ProductListAdmin from '../../components/product/productListAdmin'

import {getAd} from '../../services/actions/advertiseAction'
import {connect} from 'react-redux'

const AdvertisesAdmin = ({ getAd }) => {

    // useEffect(() => {
    //     getAd()
    // },[getAd])

    return (
        <div>
            <ProductListAdmin />
        </div>
    )
}

export default connect(null, {getAd})(AdvertisesAdmin)
