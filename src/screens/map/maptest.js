import React, { useState, useEffect } from "react";


import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { categoryForFilter } from '../../shared/staticData/data'
import { getAd } from '../../services/actions/advertiseAction'
import { connect } from 'react-redux'
import { adsMapURL } from "../../API/api";
import { FormText } from "react-bootstrap";

import Axios from "axios";

import Card from 'react-bootstrap/Card';


export default function  MapTest() {

    ////////////////////////////////////////////////////////////////////////////////////////////////


     const [ads, setAd] = useState([]);


     useEffect(() => {
       //const getGerencias = async () => {
       const getAd = async () => {
       const  adsx  = await Axios.post(adsMapURL);
         //obtenemos el doc con los datos de gerencias y los ordenamos en un array por cada gerencia de la forma [gerencia, id]
         setAd(adsx.data.map((adx) => ({ ...adx,})));
         
       };
       
       getAd();
       
       
     }, []);
    ////////////////////////////////////////////////////////////////////////////////////////////////



 
 return (
   <Card

   >
     
    {ads.map((ad, id) =>(
         
         <Card style={{ width: '17rem' }}>
                        
         <Card.Img variant="top"  src={ad.images[0].url} alt="product" />
         <Card.Body>
             <Card.Title>{ad.title}</Card.Title>
             <Card.Text>
                 {ad.longitude}

             </Card.Text>
         </Card.Body>

         
     </Card>
     ))}


   </Card>
 );
}
