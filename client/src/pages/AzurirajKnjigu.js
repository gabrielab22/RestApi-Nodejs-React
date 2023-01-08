import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Formik, Form, Field} from 'formik';
import '../App.css';
import axios from "axios";
import * as Yup from 'yup'

function AzurirajKnjigu() {


    const location = useLocation();

    const { knjiga } = location.state;

    const [idKnjige, setIdKnjige] = useState([]);
    const [nazivKnjige, setNazivKnjige] = useState([]);
    const [godinaIzdanja, setGodinaIzdanja] = useState([]);
    const [dostupnost, setDostupnost] = useState([]);
    const [dostupnaZa, setDostupnaZa] = useState([]);
    const [autorIdAutora, setAutorIdAutora] = useState([]);
    const [zanrIdZanra, setZanrIdZanra] = useState([]);

    const onSubmit = async (knjiga) => {
        try {
            await axios.post('http://localhost:3001/knjige/update', {
                ...knjiga,
                dostupnost: false,
                dostupna_za: 20,
            })
        } catch (error) {
              console.log('error', error);
          }
        
    };


    useEffect(() => {
        console.log(knjiga);
    }, []);

    const validateSchema = Yup.object().shape({
        id_knjige: Yup.string(),
        naziv_knjige: Yup.string(),
        id_autora: Yup.string(),
        godina_izdanja: Yup.string(),
        id_zanra: Yup.string(),
        dostupnost: Yup.bool(),
        dostupna_za: Yup.number(),
    });

    return (
        <div className = "kreirajKorisnika">
            <Formik initialValues = {knjiga} onSubmit = {onSubmit} validationSchema={validateSchema}>
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
                <button type="submit"> Ažuriraj knjigu </button>
            </Form>
            </Formik>
        </div>
    )
}


export default AzurirajKnjigu;