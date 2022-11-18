import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react'


import axios from 'axios'
import {deleteAdURL} from '../../API/api'



import './product.css'
import { MdLocationOn } from "react-icons/md";

const ProductAdmin = ({ ad }) => {

    const [ads, setAd] = useState([]);

    const delAdx = async (key) => {
        //await deleteDoc(doc(db, "equipos", key));
        const values = [...ads];
        values.splice(key, 1);
        setAd(values);
        await axios.delete(deleteAdURL + key);
        window.location.reload();
      }
    return (
        <>
            <Link to={`/product-details/${ad._id}`} className="product">
                <div>
                    <img className="img-fluid" src={ad.images[0].url} alt="product" />
                    <h6> {ad.title} </h6>
                    <h6> Publicador: {ad.user.name} </h6>
                </div>
                <div className="mb-3">
                    <span className="mr-3"> <MdLocationOn /> {`${ad.area},${ad.región}`} </span> <p> edad: {ad.edad}</p>
                </div>
                
            </Link>
            <Button variant="outline-danger"
                    onClick={() => delAdx(ad._id)}>
                    Eliminar
                </Button>{' '}
        </>
    )
}

export default ProductAdmin
