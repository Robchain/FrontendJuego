import React, { useState } from "react";
import Login_1 from '../../assets/img/Login/LOG-IN-BLIPBLA-01.png';
import {
    Row,
    Col,
    CardTitle,
    Form,
    Label,
    Input,
    Container,
    Spinner,
    Button
} from "reactstrap"

import axios from 'axios';

import { useNavigate, Link } from "react-router-dom"; //!!arreglar la navegacion con rutas protegidas!!
import { useEffect } from "react";
const Index = () => {
    const [mensajeContraseña, setMensajeContraseña] = useState(false);
    const [bloqeo, setBloqeo] = useState(false);
    let entrar = useNavigate();
    const [Datos, SetDatos] = useState({
        Email: '',
        Password: '',
    });
    // 
    useEffect(() => {
        localStorage.clear()
    }, [])
    
    const [valores, setValores] = useState({
        error: false,
        mensajeError: 'Contraseña incorrecta',
        color: 'red'
    })
    let mensajeErrora = ''

    const handleChange = (event) => {
        const { name, value } = event.target  // el "name" debe ser generico y no ser igual a los valores que dan en el name del hook o el name del jsx
        SetDatos({ ...Datos, [name]: value })

    }
    const postUsurio = async () => {
        try {
            axios({
                url: "http://192.168.10.115:3002/api/auth/signin",
                method: 'POST',
                data: Datos
            }).then(response => {
                if (response.data.respuesta !== 'Contraseña incorrecta' && response.data.respuesta !== 'falta correo y contraseña' && response.data.respuesta !== 'Correo o contraseña incorrecta') {
                    if (response.data.TipoUsuario === 'MAESTRO') {
                        localStorage.setItem("Usuario", response.data.Nombre)
                        localStorage.setItem("Email", response.data.Email)
                        localStorage.setItem("Identificacion", response.data.Identificacion)
                        localStorage.setItem("Id", response.data._id)
                        localStorage.setItem("Nombre", response.data.Nombre)
                        localStorage.setItem("Apellido", response.data.Apellido)
                        entrar('/VerEstudiante');
                    } else if(response.data.TipoUsuario === 'ESTUDIANTE') {
                        localStorage.setItem("Usuario", response.data.Usuario)
                        localStorage.setItem("Email", response.data.Email)
                        localStorage.setItem("Identificacion", response.data.Identificacion)
                        localStorage.setItem("Id", response.data._id)
                        localStorage.setItem("Nombre", response.data.Nombre)
                        localStorage.setItem("Apellido", response.data.Apellido)
                        entrar('/MenuJuego');
                    }else if(response.data.respuesta === "Contraseña incorrecta" ||  response.data.respuesta === "Correo o contraseña incorrecta"){
                       
                    }
                } else {
                    setMensajeContraseña(true);
                    mensajeErrora = response.data.respuesta;
                   
                }
            }).catch(e => { console.log(e) })
        } catch (e) {
            console.log(e);
        }
    }
    const handleSudmit = (e) => {
        e.preventDefault();
        setMensajeContraseña(false);
        setBloqeo(true);
        postUsurio();
        setBloqeo(false);
    }
    return (
        <Container fluid>
            <Row  >
                <Col className="d-none d-lg-flex align-self-start row justify-content-start" lg="8" xl='8' style={{ background: '#f4f4f4' }}>
                    <div className="vw-100 vh-100 d-lg-flex align-self-start p-0" >
                        <img src={Login_1} alt='Login_1'></img>
                    </div>
                </Col>
                <Col lg="4" sm="12" xl='4' className=" p-5 align-self-center  ">
                    <CardTitle tag="h2" className="fw-bold mb-1" style={{color:'#5b2998'}}>
                        ¡BIENVENIDOS!
                    </CardTitle>
                    <Form onSubmit={handleSudmit}>
                        <div className="">
                            <Label for="Login-Email"><small>Correo</small></Label><br/>
                            <Input placeholder="usuario@ejemplo.com" type="text" name="Email" value={Datos.Email} onChange={handleChange} id="Login-Email"></Input><br />
                        </div>
                        <div>
                            <small><Label for="Login-Password">Contraseña</Label></small><br /><Input placeholder="*********" id="Login-Password" type="password" name="Password" value={Datos.Password} onChange={handleChange}></Input><br />
                        </div>
                        <div style={{height:24}}>
                            {mensajeContraseña &&<div className="scale-in-center"> <small style={{ color: 'red' }}>cuenta o contraseña incorrecta</small> </div>}
                            </div><br />
                        <Button disabled={bloqeo}  className='btn' style={{backgroundColor:"#592a98", color:"#ffffff", width:'100%'}} type='submit' >{bloqeo && <Spinner size="sm">
    Loading...
  </Spinner>} Iniciar sesiòn</Button><br />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
export default Index;