import React from "react";
import '../App.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import axios from "axios";

function KreirajKnjigu() {
    const initialValues = {
        id_knjige: "",
        naziv_knjige:"",
        id_autora:"",
        godina_izdanja:"",
        id_zanra:"",
        dostupnost:"",
        zakasnina:"",
        datum_posudbe:""
    };

    const validateSchema = Yup.object().shape({
        id_knjige: Yup.string(),
        naziv_knjige: Yup.string(),
        id_autora: Yup.string(),
        godina_izdanja: Yup.date(),
        id_zanra: Yup.string(),
        dostupnost: Yup.bool(),
        zakasnina: Yup.number(),
        datum_posudbe: Yup.date()
    });
    
    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3001/knjige", data).then((response) => {
            console.log("Worked!!")
          });
        
    };

    const dostupnost = [true, false];

    return (
        <div className = "kreirajKorisnika">
            <Formik initialValues = {initialValues} onSubmit = {onSubmit} validationSchema={validateSchema}>
            <Form className="formContainer">
            <br/>
                <label> ID: </label>
                <Field name="id_knjige" id="field" placeholder="Unesite ID"/>
                <label> Naziv: </label>
                <Field name="naziv_knjige" id="field" placeholder="Unesite naziv knjige"/>
                <label> ID autora: </label>
                <Field name="id_autora" id="field" placeholder="Unesite ID autora"/>
                <label> Godina: </label>
                <Field name="godina_izdanja" id="field" placeholder="Unesite godinu izdavanja"/>
                <label> ID zanra: </label>
                <Field name="id_zanra" id="field" placeholder="Unesite ID zanra"/>
                <label> Dostupnost: </label>
                <Field name="dostupnost" id="field" options={dostupnost} placeholder="true/false"/>
                <label> Zakasnina: </label>
                <Field name="zakasnina" id="field" placeholder="0.0"/>
                <label> Datum posudbe: </label>
                <Field name="datum_posudbe" id="field" placeholder="1.1.2000"/>
                <br/><br/>
                <button type="submit"> Kreiraj knjigu </button>
            </Form>
            </Formik>
        </div>
    );
  }
  
  export default KreirajKnjigu;