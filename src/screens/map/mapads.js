import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "../../services/actions/mapStyles";

import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { categoryForFilter } from '../../shared/staticData/data'
import { getAd } from '../../services/actions/advertiseAction'
import { connect } from 'react-redux'
import { adsMapURL } from "../../API/api";


import Axios from "axios";





function Map() {

     ////////////////////////////////////////////////////////////////////////////////////////////////


      const [ads, setAd] = useState([]);


      useEffect(() => {
        const getAd = async () => {
        const  adsx  = await Axios.post(adsMapURL);
          setAd(adsx.data.map((adx) => ({ ...adx,})));
          
          
        };
        
        getAd();
        
      }, []);
     ////////////////////////////////////////////////////////////////////////////////////////////////



  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPet(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: -33.41546107818196, lng: -70.91723295286991 }}
      defaultOptions={{ styles: mapStyles }}
    >
    
     {ads.map((ad, id) =>(
          
        <Marker
          key={ad.title}
          position={{
            lat: ad.latitude,
            lng: ad.longitude
          }}
          onClick={() => {
            setSelectedPet(ad);
          }}
          
          icon={{
             url: (require('../../shared/img/patita.png')),
            scaledSize: new window.google.maps.Size(25, 25)
          }}
          
        />
      ))}

      {selectedPet && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPet(null);
          }}
          position={{
            lat: selectedPet.latitude,
            lng: selectedPet.longitude
          }}
        >
          <div>
            <h2>{selectedPet.title}</h2>
            <p>{selectedPet.category}</p>
            <p>{selectedPet.description}</p>
            <img 
              src={selectedPet.images[0].url}
              width="200" 
              height="200"
            />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapApp() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}