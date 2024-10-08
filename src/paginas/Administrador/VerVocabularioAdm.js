import React,{useEffect,useState,useReducer}from 'react'
import {AdmiMenu} from "../../componentes/AdmiMenu";
import Select from 'react-select';
import {Button, Container, Row, CardFooter, Col,Spinner, Card, CardImg, CardBody, CardTitle, CardText, CardGroup, Input, Label, NavLink, NavItem, Nav, TabPane, TabContent } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalAgregarVocabulario } from '../../componentes/Administrador/ModalAgregarVocabulario';
import { llamadaDeDataTodosActivos,HabilitarVocabularioApi,desabilitarVocabularioApi, ActivarJuegoPorCursoParaleloVocabulario } from '../../service/Adminstrador/Vocabulario';
import { ModalEditarVocabulario } from '../../componentes/Administrador/ModalEditarVocabulario';
import { ListadoJuegoActivos } from '../../componentes/Administrador/ListadoJuegoActivos';
import { MostrarCurso, MostrarParalelo } from '../../service/Adminstrador/Usuarios';
import { responseformualrio } from '../../helpers';
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
const VerVocabularioAdm = () => {
  const [{  Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  const MySwal = withReactContent(Swal)
  const [tabs, setTabs] = useState("1")
  const [Data, setData] = useState([])
  const [bloqueo, setBloqueo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([])
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

const dataCurso = async ()=>{

  const data = await MostrarCurso();
  setcursoData(data);
}
const dataParalelo = async ()=>{
  const data = await MostrarParalelo();
  setparaleloData(data)
}
useEffect(() => {
  dataCurso();
  dataParalelo();
}, [])
  
  const desabilitarVocabularios = async (objeto)=>{
    try {
      const data = await desabilitarVocabularioApi({_id:objeto._id});   
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
        if(data.titulo ==="Excelente"){
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          } 

    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Desactivar.NoDesactivar,
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
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
        if(data.titulo ==="Excelente"){
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          } 
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Activar.NoActivar,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
    }
  }
  useEffect(() => {
    if(Curso !== "" && Paralelo !== ""){
      setBloqueo(false);
    }
  }, [Curso,Paralelo])
 
  const onsubmit = async()=>{
try {
  setBloqueo(true);
  setLoading(true);
  const data = await ActivarJuegoPorCursoParaleloVocabulario({Curso:Curso, Paralelo:Paralelo})
  MySwal.fire({
    title: `${data.titulo}`,
    text: `${data.respuesta}`,
    icon: `${data.type}`,
    showConfirmButton:data.titulo !== "Excelente",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false}) 
    setBloqueo(true);
  setLoading(false);
  if(data.titulo ==="Excelente"){
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
} catch (error) {
  MySwal.fire({
    title: 'Error!',
    text: responseformualrio.Activar.NoActivar,
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
        <Container >
        <NavBar toggle={toggle} Seccion={"Vocabulario"}/>
    <AdmiMenu toggle={toggle} isOpen={isOpen}/> 
    <div className='fuenteDoce'>
    <div className='navegacion-interna-menu-administador'>
    <Nav tabs style={{ fontSize: 14 }} >
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("1") }}
              >
Vocabulario         
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
          </div>
          </div>
          <ModalAgregarVocabulario modal={modal} toggle={toggledos} />
          <ModalEditarVocabulario modal={modalEdicion} toggle={toggleEdtiar} dataBase={dataSelecionada} />
        
        <TabContent activeTab={tabs} className="tabvs">
        <TabPane tabId="1" >
        <Row className='match-height mb-2' >
        <h3 style={{ color: "#9696D3" }} className='my-3' >Tarjetas de vocabulario</h3>
        <div className='rompecabeza-botones-superior'>
        <Button onClick={toggledos}  className='px-4 mx-3' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
          <div>
          <Input
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        checked={showAll}
                       onChange={handleCheckboxChange}
                    />&nbsp;
                    <Label
                        check
                        for="exampleCheck"
                        style={{color:'#8b8b8c',fontWeight:"700"}}
                    >
                        Mostar Todos
                    </Label>
          </div>
                    
</div>
            {showAll ? Data.map(i =>  (
        <Col lg='4' md='6' xs='12' sm="12" className='my-2'>
        <CardGroup >
        <Card key={i._id + 1} >
          <CardImg top src={i.FileImagen} alt={i.Palabra} key={i._id + 2} />
          <CardBody key={i._id + 5}>
            <CardTitle tag='h4'>{i.Palabra}</CardTitle>
            <CardText key={i._id + 3}>
            <ul className='list-unstyled' >
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Categoría:</span> {i.Categoria}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Silabas:</span> {i.Silaba}</li>
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
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Categoría:</span> {i.Categoria}</li>
          <li><span className="fw-bolder" style={{color:'#8cc5b0'}}>Silabas:</span> {i.Silaba}</li>
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
        </TabPane>
        <TabPane tabId="2" >
      <Row>
        <Col xl='12' lg="12" className='d-xl p-0 mt-2'>
        <h3 className='mt-2' style={{ color: "#9696D3" }}>Habilitar Juegos</h3>
        <Col md='6' sm='12' className='mb-1'>
        <div className='mb-3'>
            <Label className='form-label' for='Curso'>
              Curso
            </Label>
            <Select name="Curso" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.value }) } options={cursoData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })} />
            </div>
            <div className='mb-3'>
            <Label className='form-label' for='Paralelo'>
              Paralelo
            </Label>
            <Select name="Paralelo" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.value }) } options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}  />
            </div>
            
            
          </Col>     
          <Button className='my-3' disabled={bloqueo} onClick={() => { onsubmit() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
        {loading && <Spinner size="sm">
            Loading...
          </Spinner>} 
          Agregar
        </Button>
       
        </Col>
        
<ListadoJuegoActivos />
      </Row>
    </TabPane>
        </TabContent>
        </Container>
  )
}

export default VerVocabularioAdm