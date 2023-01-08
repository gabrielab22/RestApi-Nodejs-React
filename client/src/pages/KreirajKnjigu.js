import React from "react";
import '../App.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function KreirajKnjigu() {
    const initialValues = {
        id_knjige: "",
        naziv_knjige:"",
        id_autora:"",
        godina_izdanja:"",
        id_zanra:"",
        dostupnost:"",
        dostupna_za:"",
        count_iznajmljena:0,
    };

    const validateSchema = Yup.object().shape({
        id_knjige: Yup.string(),
        naziv_knjige: Yup.string(),
        id_autora: Yup.string(),
        godina_izdanja: Yup.string(),
        id_zanra: Yup.string(),
        dostupnost: Yup.bool(),
        dostupna_za: Yup.number(),
        count_iznajmljena: Yup.number(),
    });

    let navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3001/knjige", data, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error){
                console.log(response.data.error);
                alert("Knjiga nije kreirana!!")
            }
            else{
                console.log("Worked!!")
                navigate(`/`);
            }
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
                <label> Godina: </label>
                <Field name="godina_izdanja" id="field" placeholder="Unesite godinu izdavanja"/>
                <label> Dostupnost: </label>
                <Field name="dostupnost" id="field" options={dostupnost} placeholder="true/false"/>
                <label> Dostupna za: </label>
                <Field name="dostupna_za" id="field" placeholder="npr. 3 (dana)"/>
                <label> ID autora: </label>
                <Field name="AutorIdAutora" id="field" placeholder="Unesite ID autora"/>
                <label> ID zanra: </label>
                <Field name="ZanrIdZanra" id="field" placeholder="Unesite ID zanra"/>
                <br/><br/>
                <button type="submit"> Kreiraj knjigu </button>
            </Form>
            </Formik>
        </div>
    );
  }
  
  export default KreirajKnjigu;