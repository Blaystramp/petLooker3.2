import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'react-bootstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Moment from 'react-moment';
import { Carousel } from 'react-responsive-carousel'

import './advertise.css'
import BigLoader from '../../components/loading/BigLoader'
import { getSingleAd } from '../../services/actions/singAdAction'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";

const Advertise = ({ match, getSingleAd, ad, loading, relatedAds, history }) => {

    let email;
    let phone;
    if(ad){
        if(ad.user.email){
            email = ad.user.email
        }else if(ad.user.faacebookEmail){
            email = ad.user.faacebookEmail
        } else if(ad.user.googleEmail){
            email = ad.user.googleEmail
        }
    }

    if(ad){
        if(ad.user.phone){
            phone = `${ad.user.phone}`
        }
        else{
            phone = "Sin información de contacto"
        }
    }


    useEffect(() => {
        getSingleAd(match.params.id, history)
    }, [])

    return (
        loading ? <BigLoader /> :
            <div className="product-details">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Carousel>
                                {
                                    ad && ad.images.map((img, index) => {
                                        return <div key={index}> <img className="img-fluid" src={img.url} alt="bike" /> </div>
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="col-md-6">
                            <h3> {ad && ad.title} </h3>
                            <p>
                            </p>
                            <h4> Anuncio {ad && ad.edad} </h4>
                            {ad && ad.isVacunas && <span>Vacunas</span>}
                            <div className="contact">
                                <a onClick={() => toast("Actualmente no disponible")} href="#!">Chat</a>
                                <span>o</span>
                                <strong>
                                    {""}
                                    Teléfono: <i className="las la-phone-volume"></i> {ad && phone}
                                </strong>
                            </div>
                            <div className="location">
                                <p>
                                    <i className="las la-map-marker"></i>{ad && ad.area}, {ad && ad.región}
                                </p>
                                <p>
                                    <i className="las la-calendar-alt"></i> Publicado el <Moment format="DD/MM/YYYY">{ad && ad.createdAt}</Moment>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="product-info">
                        <Tabs
                            defaultActiveKey="Info"
                            transition={false}
                            id="noanim-tab-example"
                        >
                            <Tab eventKey="Info" title="Info">
                                <div className="tab-content">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p>
                                                Raza: <span> {ad && ad.title} </span>
                                            </p>
                                            <p>
                                                Categoría: <span> {ad && ad.category} </span>
                                            </p>
                                            <p>
                                                Condición: <span> {ad && ad.condicion} </span>
                                            </p>
                                            <p>
                                                Descripción: <span> {ad && ad.description} </span>
                                            </p>
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            
                        </Tabs>
                    </div>
                    <div className="seller-info">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Información del publicador</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5> Nombre: {ad && ad.user.name} </h5>
                                        <h5> Email: {email} </h5>
                                        <h5> Telefono: {ad && phone} </h5>
                                        <h5> Ubicación: {ad && ad.area},{ad && ad.región} </h5>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                                <h3 className="mt-5">Similares</h3>
                                <div className="row">
                                    {relatedAds && relatedAds.map((relatedAd, index) => {
                                        return <div key={index} className="col-md-2">
                                            <Link to={`/product-details/${relatedAd._id}`} className="product">
                                                <div>
                                                    <img className="img-fluid" src={relatedAd.images[0].url} alt="product" />
                                                    <h6> {relatedAd.title} </h6>
                                                    <h6> Publicador: {relatedAd.user.name} </h6>
                                                </div>
                                                <div className="mb-3">
                                                    <span className="mr-3"> <MdLocationOn /> {`${relatedAd.area},${relatedAd.región}`} </span> <p> edad: {relatedAd.edad} </p>
                                                </div>
                                            </Link>
                                        </div>
                                    })}
                                </div>

                    </div>
                </div>
            </div>


    )
}

Advertise.propTypes = {
    getSingleAd: PropTypes.func.isRequired,
    ad: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    relatedAds: PropTypes.array,
}

const mapStateToProps = state => ({
    ad: state.singleAd.ad,
    loading: state.singleAd.loading,
    relatedAds: state.ad.relatedAds
})

export default connect(mapStateToProps, { getSingleAd })(Advertise)
