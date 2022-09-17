import React from "react";
import '../App.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function KreirajAutora() {
    const initialValues = {
        id_autora: "",
        naziv_autora:""
    };

    const validateSchema = Yup.object().shape({
        id_autora: Yup.string(),
        naziv_autora: Yup.string()
    });
    
    let navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3001/autori", data).then((response) => {
            console.log("Worked!!")
            navigate(`/`);
          });
        
    };

    return (
        <div className = "kreirajKorisnika">
            <Formik initialValues = {initialValues} onSubmit = {onSubmit} validationSchema={validateSchema}>
            <Form className="formContainer">
            <br/>
                <label> ID autora: </label>
                <Field name="id_autora" id="field" placeholder="Unesite ID autora"/>
                <label> Naziv autora: </label>
                <Field name="naziv_autora" id="field" placeholder="Unesite naziv autora"/>
                <br/><br/>
                <button type="submit"> Kreiraj autora </button>
            </Form>
            </Formik>
        </div>
    );
  }
  
  export default KreirajAutora;