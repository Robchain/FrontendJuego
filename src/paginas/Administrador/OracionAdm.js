import React,{useState, useRef,useEffect} from "react";
import MenuAdmi from "../../componentes/MenuAdmi";

import axios from 'axios';
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";

 



const OracionAdm    =   ()  =>{
    const [list, setList] = useState([])
    
    const [FormValue, setFormValue] = useState({
        Categoria:'',
        Oracion:'',
        Verbo:'',
        FileSujetoImagen:'ArchivoImagenSujeto',
        FileAdjetivoImagen:'ArchivoImagenAdjetivo',
        FileVideoPreguntaQue:'ArchivoVideoPreguntaQue',
        FileVideoPreguntaQuien:'VideoPreguntaQuien',
        FileVideoPreguntaCompleja:'VideoPreguntaCompleja',
        FileVideoMuestra:'ArchivoVideoMuestra',
        Estado:'Activo',
    })

    useEffect(() => {
        const respuesta = async ()=>{
          const data =  await axios.get('http://192.168.10.115:3002/api/auth/Categoria/mostrartodo');
          setList(data.data);
        
        }
        respuesta()
      }, [])
   
    const fileref    =   useRef()

    const handlechange  =   (event)  =>{
        const {name, value}=event.target;
    setFormValue({...FormValue, [name]:value})
    console.log(FormValue);
    }

    const handlesubmit =    e=>{
        e.preventDefault();
        const subida =  async   ()  =>  {
        try {
           
                const a = await axios({
                    url:"http://192.168.10.115:3002/api/auth/OracionAdmi",
                    method:"POST",
                    data:FormValue
                })
            }
            catch (error) {
                console.log(error);
            }
        } 
    subida();
    }

    return(
        <main>
        
        <MenuAdmi/>
      <NavLink  to={'/VerOracion'}>  <Button className="Listado">Ver Listado</Button>   </NavLink>
        <form onSubmit={handlesubmit}  className="formularioO">
        <div>
        <h1>Oraciones</h1>
        <label>CATEGORIA</label>
        <select   name="Categoria" onChange={handlechange}>
           {list.map(i=>(<option key={i._id}    value={i.NombreCategoria}>{i.NombreCategoria}</option>))}
        </select>
        <label>ORACION</label>
        <input 
            name='Oracion'
            value={FormValue.Oracion}
            onChange={handlechange}
        ></input>
        <label>VERBO</label>
        <input
            type='text'
            name="Verbo"
            value={FormValue.Verbo}
            onChange={handlechange}
        ></input>
        <label>IMAGEN SUJETO</label>
        <input
            type='file'
            name="FileSujetoImagen"
            ref={fileref}
            className='input_archivo'
        ></input>
        <label>IMAGEN ADJETIVO</label>
        <input
            type='file'
            name="FileAdjetivoImagen"
            ref={fileref}
            className='input_archivo'
        ></input>
        <label>VIDEO PREGUNTA "QUE"</label>
        <input
            type='file'
            name="FileVideoPreguntaQue"
            ref={fileref}
            className='input_archivo'
        ></input>
        <label>VIDEO PREGUNTA "QUIEN"</label>
        <input
            type='file'
            name="FileVideoPreguntaQuien"
            ref={fileref}
            className='input_archivo'
        ></input>
        <label>VIDEO PREGUNTA COMPLEJA</label>
        <input
            type='file'
            name="FileVideoPreguntaCompleja"
            ref={fileref}
            className='input_archivo'
        ></input>
        <label>VIDEO DE LA ORACION/RESPUESTA</label>
        <input
            type='file'
            name="FileVideoMuestra"
            ref={fileref}
            className='input_archivo'
        ></input>
        <label>ESTADO</label>
        <label> <input  
            type='radio'
            name="Estado"
            value="Activo"
            checked={FormValue.Estado==="Activo"}
            onChange={handlechange}
        />Activo</label> 
        <label>
        <input  
            type='radio'
            name="Estado"
            value="Inactivo"
            checked={FormValue.Estado==="Inactivo"}
            onChange={handlechange}
        />Inactivo
        </label>
        <button className="botonU">GUARDAR</button>
        </div>
        <img    src="" alt="FotoSubida"/>
        </form>        
        </main>
    )
}
export default OracionAdm;