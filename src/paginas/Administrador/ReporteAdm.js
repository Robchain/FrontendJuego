import React,  {useState} from "react";
import MenuAdmi from '../../componentes/MenuAdmi';

const ReporteAdm    =   ()  =>{
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
        <main>
        <MenuAdmi/>
        <form      className="formularioRe" onSubmit={handlesubmit}> 
        <div>
            <h1>Reporte</h1>
            <label>Buscar Estudiante</label>
            <input name="Estudiante" value={DataForm.Estudiante}   onChange={handlechange} ></input>
            
            <button className="botonR">Buscar</button>
            </div>
        </form>        
        </main>
    )
}
export default ReporteAdm;