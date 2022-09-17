import React from "react";
import '../App.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function KreirajZanr() {
    const initialValues = {
        id_zanra: "",
        naziv_zanra:""
    };

    const validateSchema = Yup.object().shape({
        id_zanra: Yup.string(),
        naziv_zanra: Yup.string()
    });
    
    let navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3001/zanrovi", data).then((response) => {
            console.log("Worked!!")
            navigate(`/`);
          });
        
    };

    return (
        <div className = "kreirajKorisnika">
            <Formik initialValues = {initialValues} onSubmit = {onSubmit} validationSchema={validateSchema}>
            <Form className="formContainer">
            <br/>
                <label> ID žanra: </label>
                <Field name="id_zanra" id="field" placeholder="Unesite ID žanra"/>
                <label> Naziv žanra: </label>
                <Field name="naziv_zanra" id="field" placeholder="Unesite naziv žanra"/>
                <br/><br/>
                <button type="submit"> Kreiraj žanr </button>
            </Form>
            </Formik>
        </div>
    );
  }
  
  export default KreirajZanr;