import React,{useEffect,useState}from 'react'
import axios from 'axios';
import MenuAdmi from '../../componentes/MenuAdmi';
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import { ModalAgregarEquipo } from '../../componentes/Administrador/ModalAgregarEquipo';

const EquipoAdm   =   ()  =>{
  const [card, setCard] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const toggledos = () => { setModal(!modal) }
    const toggle  = ()  =>  {setIsOpen(!isOpen)}
    useEffect(() => {
      const mostrar=  async()=>{
        const data=await  axios.get('http://192.168.10.115:3002/api/auth/Equipo/mostrartodo');
        setCard(data.data);
      }
      mostrar()
    }, [])
   
    return (
      <Container>
     <NavBar toggle={toggle} Seccion={"Administrador de equipos"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/> 
    <Col xl='11'  lg="11" className='ms-5 d-flex justify-content-end'>
       <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
          <ModalAgregarEquipo modal={modal} toggle={toggledos} />
        </Col>
<Row className='match-height mb-2'>
{
      card.map(i =>  (
        <Col lg='4' md='6' className='my-2'>
        <CardGroup>
        <Card>
          <CardImg top src={i.Imagen} alt={i.Nombre} />
          <CardBody>
            <CardTitle tag='h4'>{i.Nombre}</CardTitle>
            <CardText>
            <ul className='list-unstyled'>
          <li> <span  className="fw-bolder" style={{color:'#8cc5b0'}}>Nombre:</span> {i.Nombre}</li>
          <li> <span  className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
            </ul>
            </CardText>
            </CardBody>
            <CardFooter>
            <Button style={{color:'#592a98'}} outline /*onClick={()  =>  Eliminar(i.Nombre)}*/>
              Eliminar
            </Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline /*onClick={() => Editar(i)}*/ >
              Editar
            </Button>
            </CardFooter>
        </Card>
        </CardGroup>
        </Col>
      ))
    }
</Row>
      </Container>
    )
  }
export default EquipoAdm;