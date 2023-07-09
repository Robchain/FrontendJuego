import React, { useEffect, useState,useReducer } from 'react'
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle, Col, Container, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from 'reactstrap'
import { ModalAgregarOracion } from '../../componentes/Administrador/ModalAgregarOracion'
import MenuAdmi from '../../componentes/MenuAdmi'
import Swal from 'sweetalert2'
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import { NavBar } from '../../componentes/NavBar'
import { ActivarJuegoPorCursoParaleloOracion, DesabilitarOracion, HabilitarOracion, MetodoGetDellamadaOracionActivas } from '../../service/Adminstrador/Oracion'
import { ModalEditarOracion } from '../../componentes/Administrador/ModalEditarOracion'
const BaseInicialFormulario = { Curso: "", Paralelo: "" }
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    case "reset":
      return BaseInicialFormulario;
    default:
      throw new Error();
  }
}
export const OracionPagina = () => {
  const [{  Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  const MySwal = withReactContent(Swal)
  const [tabs, setTabs] = useState("1")
  const [cards, setCards] = useState([])
  const [bloqueo, setBloqueo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false)
  const [dataSeleccionada, setDataSeleccionada] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [modalEdicion, setModalEdicion] = useState(false)
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
      if(Curso !== "" && Paralelo !== ""){
        setBloqueo(false);
      }
    }, [Curso,Paralelo])
    
    useEffect(() => {
      console.log(process.env.REACT_APP_CONFIGFIREBASE, "dasdad");
      llamdainicial();
    }, [])
    const toggledos = () => { setModal(!modal) }
    const Desabilitar = async (objecto)=>{
      try {
        const data = await DesabilitarOracion({_id:objecto._id});
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
    const Habilitar = async (objecto)=>{
      try {
        const data = await HabilitarOracion({_id:objecto._id});
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
    const toggleEdicion = ()=>{setModalEdicion(!modalEdicion)}
    const onsubmit = async()=>{
      try {
        setBloqueo(true);
        setLoading(true);
        const data = await ActivarJuegoPorCursoParaleloOracion({Curso:Curso, Paralelo:Paralelo})
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          icon: `${data.type}`,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false}) 
          setBloqueo(true);
        setLoading(false);
      } catch (error) {
        MySwal.fire({
          title: 'Error!',
          text: "Falto un campo",
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false})
          setBloqueo(false);
        setLoading(false);
        }
        }
  return (
    <Container>
    <NavBar toggle={toggle} Seccion={"Oraciones"} />
    <MenuAdmi toggle={toggle} isOpen={isOpen}/> 
    <Col xl='11'  lg="11" className='ms-5 d-flex justify-content-between'>
    <Nav tabs style={{ fontSize: 14 }} >
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("1") }}
              >
                Oraciones
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("2") }}
              >
                Habilitar Juego
              </NavLink>
            </NavItem>
          </Nav>
       <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
          <ModalAgregarOracion modal={modal} toggle={toggledos}  />
          <ModalEditarOracion dataBase={dataSeleccionada} modal={modalEdicion}  toggle={toggleEdicion} />
        </Col>
        <TabContent activeTab={tabs} className="tabvs">
        <TabPane tabId="1" >
    <Row className='match-height mb-2'>
    <h3 style={{ color: "#9696D3" }}> Tarjetas Oraciones</h3>
    <Col lg="12">
     <Input id="exampleCheck" name="check" type="checkbox" checked={showAll} onChange={handleCheckboxChange}  />{" "} 
      <Label   check  for="exampleCheck" style={{color:'#8b8b8c',fontWeight:"700"}}> Mostar Todos</Label>
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
            <li><span  className="fw-bolder" style={{color:'#8cc5b0'}}>Categoria:</span> {i.Categoria}</li>
            <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Verbo:</span> {i.Verbo}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
              </ul>
            </CardText>
          </CardBody>
          <CardFooter>
           <Button style={{color:'#592a98'}} outline  onClick={() => i.Estado==="ACTIVO" ?  Desabilitar(i) : Habilitar(i)} >
           {i.Estado==="ACTIVO" ? <span>Eliminar</span> : <span>Activar</span>}
            </Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline onClick={() =>  {setDataSeleccionada(i);toggleEdicion();}} >
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
            <li><span  className="fw-bolder" style={{color:'#8cc5b0'}}>Categoria:</span> {i.Categoria}</li>
            <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Verbo:</span> {i.Verbo}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Estado:</span> {i.Estado}</li>
              </ul>
            </CardText>
          </CardBody>
          <CardFooter>
           <Button style={{color:'#592a98'}} outline  onClick={() => i.Estado==="ACTIVO" ?  Desabilitar(i) : Habilitar(i)} >
           {i.Estado==="ACTIVO" ? <span>Eliminar</span> : <span>Activar</span>}
            </Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button style={{background:'#5b2998', color:'#fff'}} outline onClick={() =>  {setDataSeleccionada(i);toggleEdicion();}} >
              Editar
            </Button>
           </CardFooter>
        </Card>
        </CardGroup>
        </Col>
      ))
    }
    </Row>
    </TabPane>
    <TabPane tabId="2" >
      <Row>
        <Col xl='12' lg="12" className='d-xl p-0 mt-2'>
        <h3 style={{ color: "#9696D3" }}>Habilitar Juegos</h3>
        <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Curso'>
              Curso
            </Label>
            <Select name="Curso" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.value }) } options={[{value:"PRIMERO", label:"PRIMERO"},{value:"SEGUNDO", label:"SEGUNDO"},{value:"TERCERO", label:"TERCERO"},]} />
            <Label className='form-label' for='Paralelo'>
              Paralelo
            </Label>
            <Select name="Paralelo" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.value }) } options={[{value:"A", label:"A"},{value:"B", label:"B "},{value:"C", label:"C"},{value:"D", label:"D"},{value:"E", label:"E"},{value:"F", label:"F"},]}  />
          </Col>     
          <Button disabled={bloqueo} onClick={() => { onsubmit() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
        {loading && <Spinner size="sm">
            Loading...
          </Spinner>} 
          Agregar
        </Button>
        </Col>
      </Row>
    </TabPane>
    </TabContent>
    </Container>
  )
}
