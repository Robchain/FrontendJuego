import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle, Col, Container, Input, Label, Row } from 'reactstrap'
import { ModalAgregarOracion } from '../../componentes/Administrador/ModalAgregarOracion'
import MenuAdmi from '../../componentes/MenuAdmi'
import { NavBar } from '../../componentes/NavBar'
import { MetodoGetDellamadaOracionActivas } from '../../service/Adminstrador/Oracion'

export const OracionPagina = () => {
  const [cards, setCards] = useState([])
  const [modal, setModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const toggle  = ()  =>  {setIsOpen(!isOpen)}
     const [showAll, setShowAll] = useState(true);
 const handleCheckboxChange = () => {
      setShowAll(!showAll);
    };
    const llamdainicial = async ()=>{
      const data = await MetodoGetDellamadaOracionActivas();
      setCards(data);
    }
    useEffect(() => {
      llamdainicial();
    }, [])
    const toggledos = () => { setModal(!modal) }
  return (
    <Container>
    <NavBar toggle={toggle} Seccion={"Oraciones"} />
    <MenuAdmi toggle={toggle} isOpen={isOpen}/> 
    <Col xl='11'  lg="11" className='ms-5 d-flex justify-content-end'>
       <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
          <ModalAgregarOracion modal={modal} toggle={toggledos}  />
        </Col>
    <Row className='match-height mb-2'>
    <Col lg="12">
                    <Input
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        checked={showAll}
                       onChange={handleCheckboxChange}
                    />{" "}
                    <Label
                        check
                        for="exampleCheck"
                        style={{color:'#8b8b8c',fontWeight:"700"}}
                    >
                        Mostar Todos
                    </Label>
</Col>
    { showAll ?
      cards.map(i =>  (
        <Col lg='4' md='6' className='my-2'>
       <CardGroup> 
        <Card>
          <CardImg top src={i.FileSujetoImagen} alt={i.Oracion} />
          <CardBody>
            <CardTitle tag='h4'>{i.Oracion}</CardTitle>
            <CardText>
            <ul className='list-unstyled'>
            <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Verbo:</span> {i.Verbo}</li>
          <li><span  className="fw-bolder" style={{color:'#8cc5b0'}}>Categoria:</span> {i.Categoria}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
              </ul>
            </CardText>
          </CardBody>
          <CardFooter>
           <Button style={{color:'#592a98'}} outline  /*onClick={() =>  Eliminar(i.Oracion)}*/ >
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
      )) :
      cards.filter((item) => item.Estado === "ACTIVO").map(i =>  (
        <Col lg='4' md='6' className='my-2'>
       <CardGroup> 
        <Card>
          <CardImg top src={i.FileSujetoImagen} alt={i.Oracion} />
          <CardBody>
            <CardTitle tag='h4'>{i.Oracion}</CardTitle>
            <CardText>
            <ul className='list-unstyled'>
            <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Verbo:</span> {i.Verbo}</li>
          <li><span  className="fw-bolder" style={{color:'#8cc5b0'}}>Categoria:</span> {i.Categoria}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
              </ul>
            </CardText>
          </CardBody>
          <CardFooter>
           <Button style={{color:'#592a98'}} outline  /*onClick={() =>  Eliminar(i.Oracion)}*/ >
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
      ))
    }
    </Row>
    </Container>
  )
}
