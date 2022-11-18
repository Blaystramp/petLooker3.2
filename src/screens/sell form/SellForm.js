import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MiniLoader from '../../components/loading/MiniLoader'
import "./sellForm.css";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { postAd } from '../../services/actions/advertiseAction'

// static data for input field suggestion
import { cityList, areas, categoryData } from "../../shared/staticData/data";

// file pond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import the plugin code for filepond
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

// Register the filepond plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop
);

const SellForm = ({ history, postAd, loading }) => {
  // filepond image
  const [files, setFiles] = useState([]);

  // city area for input suggestion
  const [cityArea, setCityArea] = useState(null);

  // show area suggestion based on city
  const setArea = e => {
    let val = e.target.value;
    const filterArea = areas.filter(area => {
      return area.city.match(val);
    });
    if (filterArea.length > 0) {
      setCityArea(filterArea[0].area);
    }
    if (filterArea.length > 1) {
      setCityArea(null);
    }
  };

  // warning notification for img blank field
  const pictureNotify = () =>
    toast.error("Por favor, agregue imágenes", {
      position: toast.POSITION.TOP_RIGHT
    });

  // show alert , if imgage is less than two 
  const addTwoImgNotify = () =>
    toast.error("Agregar mínimo 2 imágenes", {
      position: toast.POSITION.TOP_RIGHT
    });

  // success message for form submission
  //   const successNotify = () =>
  //     toast.success("Form Submitted Successfully !", {
  //       position: toast.POSITION.TOP_LEFT
  //     });

  // react hook form
  const { register, handleSubmit, errors } = useForm();

  // submit
  const onSubmit = data => {
    if (files.length === 0) {
      pictureNotify();
    } else if (files.length === 1) {
      addTwoImgNotify();
    } else {
      data.files = files;
      postAd(data, history)
    }
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <form className="post-ad-form" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="heading">Publica tu Anuncio</h3>
              <div className="región mb-3">
                <h6>Región</h6>
                {errors.región && <p className="error">Región Obligatoria</p>}
                <input
                  autoComplete="off"
                  name="región"
                  list="cities"
                  type="text"
                  onChange={e => setArea(e)}
                  ref={register({ required: true })}
                />
                <datalist id="cities">
                  {cityList.map((city, index) => (
                    <option key={index} value={city} />
                  ))}
                </datalist>
              </div>

              <div className="area mb-3">
                <h6>Area</h6>
                {errors.area && <p className="error">Area Obligatoria</p>}
                <input
                  autoComplete="off"
                  name="area"
                  list="areas"
                  type="text"
                  ref={register({ required: true })}
                />
                <datalist id="areas">
                  {cityArea !== null &&
                    cityArea.map((area, index) => (
                      <option key={index} value={area} />
                    ))}
                </datalist>
              </div>

              <div className="img">
                <h6>Subir Imagenes max(5) </h6>
                <FilePond
                  files={files}
                  allowMultiple={true}
                  onupdatefiles={setFiles}
                  allowImageCrop={true}
                  labelFileTypeNotAllowed={"Error!"}
                  acceptedFileTypes={["image/*"]}
                  fileValidateTypeDetectType={(source, type) =>
                    new Promise((resolve, reject) => {
                      // Do custom type detection here and return with promise
                      resolve(type);
                    })
                  }
                  maxFiles={5}
                  labelIdle='Arrastra & Suelta tu imagen o <span class="filepond--label-action">Buscar</span>'
                />
              </div>

              <div className="category mb-3">
                <h6>Categoría</h6>
                {errors.category && <p className="error">Seleción Obligatoria</p>}
                <select name="category" ref={register({ required: true })}>
                  {categoryData.map((item, index) => {
                    return <option key={index} value={item}> {item} </option>
                  })}
                </select>
              </div>

              <div className="condicion mb-3">
                <h6>Condición</h6>
                {errors.condicion && <p className="error">Seleción obligatoria</p>}
                <input
                  type="radio"
                  name="condicion"
                  value="Cachorro"
                  ref={register({ required: true })}
                />
                {"  "} Cachorro{" "}
                <input
                  type="radio"
                  name="condicion"
                  value="Adulto"
                  ref={register({ required: true })}
                />
                {"  "} Adulto
              </div>
              <div className="title mb-3">
                <h6>Raza de la mascota</h6>
                {errors.title && (
                  <p className="error">Raza obligatoria</p>
                )}
                <input
                  ref={register({ required: true })}
                  name="title"
                  type="text"
                />
              </div>

              <div className="description mb-3">
                <h6>Descripción de la mascota</h6>
                {errors.description && (
                  <p className="error">Descripción obligatorio</p>
                )}
                <textarea
                  ref={register({ required: true })}
                  name="description"
                ></textarea>
              </div>

              <div className="edad mb-3">
                <h6>Edad</h6>
                {errors.edad && <p className="error">Edad es Obligatoria</p>}
                <input
                  ref={register({ required: true })}
                  name="edad"
                  type="number"
                />
              </div>
              <div className="isVacunas mb-3">
                <h6>Vacunas</h6>
                {errors.isVacunas && <p className="error">Vacunas es Obligatorio</p>}
                <select name="isVacunas" ref={register({ required: true })}>
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button disabled={loading && true} className={loading && 'not-allowed'} type="submit"> {loading ? <span> Publicando... <MiniLoader /> </span> : "Publicar"}  </button>
            </form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

SellForm.prototypes = {
  postAd: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  loading: state.ad.loading
})

export default connect(mapStateToProps, { postAd })(withRouter(SellForm));

