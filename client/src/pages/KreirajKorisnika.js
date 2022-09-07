import React from "react";
import '../App.css';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import axios from "axios";

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

    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3001/korisnici", data).then((response) => {
            console.log("Worked!!")
          });

    };

    return (
        <div className = "kreirajKorisnika">
            <Formik initialValues = {initialValues} onSubmit = {onSubmit} validationSchema={validateSchema}>
            <Form className="formContainer">
            <br/>
                <label> ID: </label>
                <Field name="id_korisnika" placeholder="Unesite id"/>

                <label> E-mail: </label>
                <Field name="email" placeholder="Unesite email"/>
                <label> Password: </label>
                <Field name="password" type="password" placeholder="Unesite lozinku"/>
                <br/><br/>
                <label > Administrator: </label>
                <Field name="administrator" value={false}/>
                <label > Posudene knjige: </label>
                <Field name="iznajmljene" />
                <br/><br/>
                <button type="submit"> Kreiraj korisnika </button>
            </Form>
            </Formik>
        </div>
    );
  }

  export default KreirajKorisnika;