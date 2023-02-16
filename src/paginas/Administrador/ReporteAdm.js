import React,  {useState} from "react";
import { Container } from "reactstrap";
import MenuAdmi from '../../componentes/MenuAdmi';
import { NavBar } from "../../componentes/NavBar";

const ReporteAdm    =   ()  =>{
    const [isOpen, setIsOpen] = useState(false)
    const toggle  = ()  =>  {setIsOpen(!isOpen)}
const [DataForm, setDataForm] = useState({
    Estudiante:''

})
const handlechange = (e)=>{
    const{name, value}=e.target;
    setDataForm({...DataForm, [name]:value})
}
const handlesubmit = (e)=>{
    e.preventDefault();
    //metodos post and get
}
    return(
        <Container>
      <NavBar toggle={toggle} Seccion={"Reportes"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/>   
        </Container>
    )
}
export default ReporteAdm;