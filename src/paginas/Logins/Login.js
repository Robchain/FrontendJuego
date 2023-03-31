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
import { useNavigate, Link } from "react-router-dom"; //!!arreglar la navegacion con rutas protegidas!!
import { useEffect } from "react";
import { LoginAPI } from "../../service/Adminstrador/Usuarios";
const Index = () => {
    const [mensajeContraseña, setMensajeContraseña] = useState(false);
    const [nensajeServicio, SetMensajeServicio] = useState(false);
    const [bloqeo, setBloqeo] = useState(false);
    let entrar = useNavigate();
    const [Datos, SetDatos] = useState({
        Email: '',
        Password: '',
    });
    useEffect(() => {
        localStorage.clear()
    }, [])
    
    const handleChange = (event) => {
        const { name, value } = event.target  // el "name" debe ser generico y no ser igual a los valores que dan en el name del hook o el name del jsx
        SetDatos({ ...Datos, [name]: value })
    }
    const postUsurio = async () => {
        try {
           const data = await  LoginAPI({Email:Datos.Email, Password:Datos.Password});
           if (data.respuesta !== 'Contraseña incorrecta' && data.respuesta !== 'falta correo y contraseña' && data.respuesta !== 'Correo o contraseña incorrecta') {
            if (data.TipoUsuario === 'MAESTRO') {
                localStorage.setItem("Usuario", data.Nombre)
                localStorage.setItem("Email", data.Email)
                localStorage.setItem("Identificacion", data.Identificacion)
                localStorage.setItem("Id", data._id)
                localStorage.setItem("Nombre", data.Nombre)
                localStorage.setItem("Apellido", data.Apellido)
                entrar('/VerEstudiante');
            } else if(data.TipoUsuario === 'ESTUDIANTE') {
                localStorage.setItem("Usuario", data.Usuario)
                localStorage.setItem("Email", data.Email)
                localStorage.setItem("Identificacion", data.Identificacion)
                localStorage.setItem("Id", data._id)
                localStorage.setItem("Nombre", data.Nombre)
                localStorage.setItem("Apellido", data.Apellido)
                entrar('/MenuJuego');
            }
        } else {
            setMensajeContraseña(true);
        }
        } catch (e) {
            SetMensajeServicio(true)
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
                            {mensajeContraseña &&<div className="scale-in-center"> <small style={{ color: 'red' }}>Contraseña o Correo Incorrectos</small> </div>}
                           {nensajeServicio && <div className="scale-in-center"><small style={{ color: 'red' }}>No Hay Respuesta del servicio</small></div>}
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