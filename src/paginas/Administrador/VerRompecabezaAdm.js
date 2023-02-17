import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import {Button, Container,Modal, ModalBody, ModalHeader,FormGroup,ModalFooter, Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Col, Row } from 'reactstrap';
import axios from 'axios';
import { NavBar } from '../../componentes/NavBar';

const VerRompecabezaAdm = () => {
  const [cards, setCards] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const toggle  = ()  =>  {setIsOpen(!isOpen)}
  useEffect(() => {
    const mostrar=  async()=>{
      const data=await  axios.get('http://localhost:3002/api/auth/rompecabezaAdmi/mostrartodo');
      setCards(data.data);
    }
    mostrar()
  }, [])
 
  return (
    <Container>
    <NavBar toggle={toggle} Seccion={"Rompecabezas"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/> 
    <Col xl='11'  lg="11" className='ms-5 d-flex justify-content-end'>
       <Button  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
        </Col>
    <Row className='match-height mb-2'>
        {
          cards.map(i =>  (
        
        <Col lg='4' md='6' className='my-2'>
        <Card>
        <CardImg top src={i.FileColor} alt={i.Nombre} />
          <CardBody>
            <CardTitle tag='h4'>{i.Nombre}</CardTitle>
            <CardText>
            <ul>
            <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Nombre:</span> {i.Nombre}</li>
            <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Numero de piezas:</span> {i.Pieza} </li>
            <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
            </ul>
            </CardText>
          </CardBody>
          <CardFooter>
            <Button style={{color:'#592a98'}} outline /*onClick={() =>  Eliminar(i.Nombre)}*/>
              Eliminar
            </Button>
        <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline  /*onClick={() => Editar(i)}*/>
              Editar
            </Button>
              </CardFooter>
        </Card>
        </Col>
      ))
        }
        </Row>
        </Container>
  )
}

export default VerRompecabezaAdm