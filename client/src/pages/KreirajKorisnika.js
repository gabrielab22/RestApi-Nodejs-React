import React from "react";
import '../App.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function KreirajKorisnika() {

    const initialValues = {
        id_korisnika: "",
        email:"",
        password:"",
        administrator:"false",
        iznajmljene:"null"
    };

    const validateSchema = Yup.object().shape({
        id: Yup.string(),
        email: Yup.string(),
        password: Yup.string().min(4),
        administrator: Yup.bool(),
        iznajmljene: Yup.string()
    });

    let navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3001/korisnici", data).then((response) => {
            console.log("Worked!!")
            navigate(`/login`);
          });

    };

    return (
        <div className = "kreirajKorisnika">
            <Formik initialValues = {initialValues} onSubmit = {onSubmit} validationSchema={validateSchema}>
            <Form className="formContainer">
            <br/>
                <label> ID: </label>
                <ErrorMessage name="title" component="span" />
                <Field name="id_korisnika" id="field" placeholder="Unesite id"/>

                <label> E-mail: </label>
                <Field name="email" id="field" placeholder="Unesite email"/>
                <label> Password: </label>
                <Field name="password" id="field" type="password" placeholder="Unesite lozinku"/>
                <br/><br/>
                <label > Administrator: </label>
                <Field name="administrator" id="field" value={false}/>
                <label > Posudene knjige: </label>
                <Field name="iznajmljene" id="field" />
                <br/><br/>
                <button type="submit"> Kreiraj korisnika </button>
            </Form>
            </Formik>
        </div>
    );
  }

  export default KreirajKorisnika;