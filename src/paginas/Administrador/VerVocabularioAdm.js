import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import {Button, Container, Row, CardFooter, Col, Card, CardImg, CardBody, CardTitle, CardText, CardGroup, Input, Label } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalAgregarVocabulario } from '../../componentes/Administrador/ModalAgregarVocabulario';
import { llamadaDeDataTodosActivos,HabilitarVocabularioApi,desabilitarVocabularioApi } from '../../service/Adminstrador/Vocabulario';
import { ModalEditarVocabulario } from '../../componentes/Administrador/ModalEditarVocabulario';

const VerVocabularioAdm = () => {
  const MySwal = withReactContent(Swal)
  const [Data, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const toggle  = ()  =>  {setIsOpen(!isOpen)}
  const [showAll, setShowAll] = useState(true);
  const [modalEdicion, setModalEdicion] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState({});
  const toggleEdtiar =()=>{
    setModalEdicion(!modalEdicion);
  }
  const handleCheckboxChange = () => {
       setShowAll(!showAll);
     };
  const toggledos = () => { setModal(!modal) }
 const mostrar = async ()=>{
      const data =await llamadaDeDataTodosActivos()
      setData(data)
    }
  useEffect(() => {
    
    mostrar();
  }, [])
  
  const desabilitarVocabularios = async (objeto)=>{
    try {
      const data = await desabilitarVocabularioApi({_id:objeto._id});   
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
    }
  }
  const HabilitarVocabularios = async (objeto)=>{
    try {
      const data = await HabilitarVocabularioApi({_id:objeto._id});   
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
    }
  }


  return (
        <Container >
        <NavBar toggle={toggle} Seccion={"Vocabularios"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/> 
    <Col xl='11'  lg="11" className='ms-5 d-flex justify-content-end'>
       <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
          <ModalAgregarVocabulario modal={modal} toggle={toggledos} />
          <ModalEditarVocabulario modal={modalEdicion} toggle={toggleEdtiar} dataBase={dataSelecionada} />
        </Col>
        <Row className='match-height mb-2' >
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
            {showAll ? Data.map(i =>  (
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
            <Button style={{color:'#592a98'}} outline onClick={()  =>  {i.Estado === "ACTIVO" ? desabilitarVocabularios(i) :HabilitarVocabularios(i) }}>
            {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
            </Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline  onClick={() =>  {setDataSelecionada(i); toggleEdtiar(); }} >
              Editar
            </Button>
          </CardFooter>
        </Card>
        </CardGroup>
        </Col>
      )):Data.filter((item) => item.Estado === "ACTIVO").map(i =>  (
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
            <Button style={{color:'#592a98'}} outline  onClick={()  =>  {i.Estado === "ACTIVO" ? desabilitarVocabularios(i) :HabilitarVocabularios(i) }} >
            {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
            </Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline onClick={() =>  {setDataSelecionada(i); toggleEdtiar(); }}  >
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