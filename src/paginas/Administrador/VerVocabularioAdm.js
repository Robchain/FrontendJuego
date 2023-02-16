import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";

import { Table,Button, Container,Modal, ModalBody, ModalHeader,FormGroup,ModalFooter, Row, CardFooter, Col, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { NavBar } from '../../componentes/NavBar';
const VerVocabularioAdm = () => {
  const [Data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const toggle  = ()  =>  {setIsOpen(!isOpen)}
  useEffect(() => {
    const mostrar = async ()=>{
      const data =await axios.get('http://localhost:3002/api/auth/VocabularioAdmi/mostrartodo');
      setData(data.data)
    }
    mostrar();
  }, [])
  
  
  return (
        <Container>
        <NavBar toggle={toggle} Seccion={"Vocabularios"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/> 
    <Col xl='11'  lg="11" className='ms-5 d-flex justify-content-end'>
       <Button  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
        </Col>
        <Row className='match-height mb-2' >
            {Data.map(i =>  (
        <Col lg='4' md='6' className='my-2'>
        <Card>
          <CardImg top src={i.FileImagen} alt={i.Palabra} />
          <CardBody>
            <CardTitle tag='h4'>{i.Palabra}</CardTitle>
            <CardText>
            <ul className='list-unstyled' key={i._id}>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Categoria:</span> {i.Categoria}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Silaba:</span> {i.Silaba}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
              </ul>
            </CardText>
          </CardBody>
          <CardFooter>
            <Button style={{color:'#592a98'}} outline /*onClick={()  =>  Eliminar(i.Palabra)}*/>
              Eliminar
            </Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline /*onClick={() =>  Editar(i)}*/>
              Editar
            </Button>
          </CardFooter>
        </Card>
        </Col>
      ))}
        </Row>
        </Container>
  )
}

export default VerVocabularioAdm