import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import {Button, Container, Row, CardFooter, Col, Card, CardImg, CardBody, CardTitle, CardText, CardGroup } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import { ModalAgregarVocabulario } from '../../componentes/Administrador/ModalAgregarVocabulario';
import { llamadaDeDataTodosActivos } from '../../service/Adminstrador/Vocabulario';
const VerVocabularioAdm = () => {
  const [Data, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const toggle  = ()  =>  {setIsOpen(!isOpen)}
  const toggledos = () => { setModal(!modal) }
 const mostrar = async ()=>{
      const data =await llamadaDeDataTodosActivos()
      setData(data)
    }
  useEffect(() => {
    
    mostrar();
  }, [])
  
  
  return (
        <Container >
        <NavBar toggle={toggle} Seccion={"Vocabularios"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/> 
    <Col xl='11'  lg="11" className='ms-5 d-flex justify-content-end'>
       <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
          <ModalAgregarVocabulario modal={modal} toggle={toggledos} />
        </Col>
        <Row className='match-height mb-2' >
            {Data.map(i =>  (
        <Col lg='4' md='6' xs='12' sm="12" className='my-2'>
        <CardGroup>
        <Card key={i._id + 1}>
          <CardImg top src={i.FileImagen} alt={i.Palabra} key={i._id + 2} />
          <CardBody key={i._id + 5}>
            <CardTitle tag='h4'>{i.Palabra}</CardTitle>
            <CardText key={i._id + 3}>
            <ul className='list-unstyled' >
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Categoria:</span> {i.Categoria}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Silaba:</span> {i.Silaba}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
              </ul>
            </CardText>
          </CardBody>
          <CardFooter key={i._id + 4}>
            <Button style={{color:'#592a98'}} outline /*onClick={()  =>  Eliminar(i.Palabra)}*/>
              Eliminar
            </Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline /*onClick={() =>  Editar(i)}*/>
              Editar
            </Button>
          </CardFooter>
        </Card>
        </CardGroup>
        </Col>
      ))}
        </Row>
        </Container>
  )
}

export default VerVocabularioAdm