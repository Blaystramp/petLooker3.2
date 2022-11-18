import Form from 'react-bootstrap/Form';
import { Formik } from "formik";
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';


/*
  c base de datos
  arquitectura web
  librerias 
  Modulos o servicios

  Plan de pruebas 
  VOlver lista raza de mascotas 
  mapa
  valiar
*/
const ForgetpPass = () => {
const [email,setEmail] = useState("");
const [error,setError] = useState("");
const [open,setOpen] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = `http://localhost:5000/api/user/forgot-password`;
        const { data } = await axios.post(url, { email });
        console.log(data)
        setError("");
      } catch (error) {
         {
          setError(error.response.data.message);
          
          
        }
      }
    } 


  return (
    
        
    <Form onSubmit={handleSubmit} style={{ width: '25%' }}  >
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          
        <Form.Label>Email de Usuario</Form.Label>
        <Form.Control  
          type="email" 
          placeholder="Ingrese email"
          name = "email"
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
          required
          
        />
      </Form.Group>
      <Button 
        variant="primary" 
        type="submit"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        >
        Publicar
      </Button>
      <div style={{ minHeight: '150px' }}>
        <Collapse in={open} dimension="width">
          <div id="example-collapse-text">
            <Card body style={{ width: '400px' }}>
              Revisa tu email, allí encontraras un enlace para restablecer tu contraseña
            </Card>
          </div>
        </Collapse>
      </div>
      

    </Form>
   
  );
}

export default ForgetpPass;