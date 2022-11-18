import React, { useState, useEffect } from "react";
import "./productList.css";
import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { categoryForFilter } from '../../shared/staticData/data'
import { getAd } from '../../services/actions/advertiseAction'
import { connect } from 'react-redux'
import { loadUser } from "../../services/actions/authAction";
import axios from 'axios'
import {adsOfUserURL, deleteAdURL} from '../../API/api'
import { updatePhone } from '../../services/actions/profileAction'






// components
import ProductAdmin from "./ProductAdmin";
import LoadMore from '../loading/LoadMore'

const ProductListAdmin = ({  getAdLoading, getAd, page, profile, loadUser, updatePhone, loading, ads  }) => {
    const [data, setData] = useState({
        región: "",
        area: "",
        category: "",
        edad: "",
        searchKeyword: ""
    })
//////////////////////////
useEffect(() => {
    loadUser()
}, [loadUser, loading])


//console.log (profile.email)
//////////////////////////

    const [isFilter, setIsFilter] = useState(false)
    

    const { región, area, category, edad, searchKeyword } = data

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setIsFilter(true)
        window.scroll(0, 0)
    }

    let newCategoria;
    if (category === "Todos") {
        newCategoria = ""
    } else {
        newCategoria = category
    }

    let filterData = {
        región,
        area,
        category: newCategoria,
        edad,
        searchKeyword
    }

    useEffect(() => {
        getAd(filterData, ads, isFilter, page)
    }, [región, area, category, edad, searchKeyword])





    if (profile.email == "admin@admin.com" && profile.name=="admin01") {
        return (
            
            <div>
                <>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="filter">
                                <h3>Filtro de Búsqueda</h3>
                                <div className="area">
                                    <h3>
                                        Región
                                    </h3>
                                    <div className="región">
                                        <input
                                            name="región"
                                            value={data.región}
                                            onChange={(e) => handleChange(e)}
                                            type="text"
                                            placeholder="Región" />
                                    </div>
                                    <h3>Area</h3>
                                    <div className="city">
                                        <input
                                            type="text"
                                            placeholder="Area"
                                            name="area"
                                            value={data.area}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="category">
                                    <h3>
                                        Categoría
                                </h3>
                                    <select
                                        name="category"
                                        value={data.category}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {categoryForFilter.map((item, index) => {
                                            return <option key={index} value={item}> {item} </option>
                                        })}
                                    </select>
                                </div>
                                <div className="edad">
                                    <h3>Edad</h3>
                                    <div className="edad-range">
                                        <input
                                            type="text"
                                            placeholder="Edad"
                                            name="edad"
                                            value={data.edad}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="product-list">
                                <div className="container">
                                    <div className="product-list-header">
                                        <div className="search">
                                            <input
                                                type="search"
                                                placeholder="Buscar"
                                                name="searchKeyword"
                                                value={data.searchKeyword}
                                                onChange={(e) => handleChange(e)}
                                            />
                                            <div className="search-icon">
                                                <AiOutlineSearch />
                                            </div>
                                        </div>
                                    </div>
                                    <InfiniteScroll
                                        dataLength={ads.length}
                                        next={() => getAd(filterData, ads, false, page)}
                                        hasMore={true}
                                        loader={getAdLoading && <LoadMore />}
                                        
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Sep! lo viste todo</b>
                                            </p>
                                        }
                                    >
                                        {/* {
                                        getAdLoading ? <BigLoader /> : */}
                                        <div className="row">
                                            {ads.length > 0 ? ads.map((ad, index) => {
                                                return <div key={index} className="col-md-3">
                                                    <ProductAdmin ad={ad} />
                                                </div>
                                            }) : <h3 style={{ textAlign: "center", width: "100%" }}> {getAdLoading === false && "No hay anuncios"} </h3>}
                                        </div>
                                        {/* } */}
                                    </InfiniteScroll>
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </>
            </div>
        )
      }
///////////////////////////
    return (

        <>

           <div>
                <a> No Autorizado</a>
           </div>
        </>
    );
};


ProductListAdmin.prototypes = {
    ads: PropTypes.array.isRequired,
    getAdLoading: PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    ads: state.ad.ads,
    getAdLoading: state.ad.getAdLoading,
    page: state.ad.page,
    profile: state.auth.profile

    
})

export default connect(mapStateToProps, { getAd,loadUser, updatePhone  })(ProductListAdmin);
