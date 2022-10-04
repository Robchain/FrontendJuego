import React , {useState, useRef, useEffect}from "react";
import MenuAdmin from "../../componentes/MenuAdmi";

import axios from "axios";
import { NavLink } from "react-router-dom";


const VocabularioAdmi =()=>{
const [list, setList] = useState([]);

const [DataVoca, SetDataVoca]=useState({
    Categoria:'',
    Palabra:'',
    Silaba:'',
    FileMuestra:'FileMuestra',
    FilePregunta:'FilePregunta',
    FileImagen:'FileImagen',
    Estado:'Activo'    
})
useEffect(() => {
  const respuesta = async()=>{
    const data = await axios.get('http://localhost:3002/api/auth/Categoria/mostrartodo');
    setList(data.data);
  }
  respuesta();
}, [])

const handleChange = (event)=>{
    const {name, value}=event.target;
    SetDataVoca({...DataVoca, [name]:value})
    console.log(DataVoca);
}

   const archivoref=useRef();
   
    const   handleSubmit=(e)=>{
        e.preventDefault();
       //metodos post o get
       const subida =  async ()=>{
        try {
            const da=axios({
                url:"http://localhost:3002/api/auth/vocabularioAdmi",
                method:"POST",
                data:DataVoca,
            })
        } catch (error) {
            console.log(error);
        }

       }

subida();
    }
        return(
            <main>
                <MenuAdmin/>
                <NavLink    to={'/VerVocabulario'}><button className="Listado">Ver Listado</button></NavLink>
                <form  className="formularioV" onSubmit={handleSubmit} >
                <div>
                <h1>Vocabulario</h1>
                    <label>Categoria</label>
                    <select  name="Categoria"    onChange={handleChange}>
                        {list.map(i=>(<option   key={i._id} value={i.NombreCategoria}>{i.NombreCategoria}</option>))}
                    </select>
                    <label>Palabra</label>
                    <input  type="text" name="Palabra" value={DataVoca.Palabra} onChange={handleChange} ></input>
                    <label>Silabas</label>
                    <input  type="text" name="Silaba"  value={DataVoca.Silaba}  onChange={handleChange}></input>
                    <label>VideoMuestra</label>
                    <input  type="file"     className='input_archivo' name="FileMuestra" ref={archivoref} ></input>
                    <label>Video Pregunta</label>
                    <input  type="file" className='input_archivo' name="FilePregunta" ref={archivoref}></input>
                    <label>Imagen</label>
                    <input  type="file" className='input_archivo' name="FileImagen"   ref={archivoref}     ></input>
                    <label>Estado</label>
                    <label> <input  
            type='radio'
            name="Estado"
            value="Activo"
            checked={DataVoca.Estado==="Activo"}
            onChange={handleChange}
        />Activo</label> 
        <label>
        <input  
            type='radio'
            name="Estado"
            value="Inactivo"
            checked={DataVoca.Estado==="Inactivo"}
            onChange={handleChange}
        />Inactivo
        </label>
                    <button type="submit"   className='boton'   value='Guardar'>Guardar</button>
                    </div>
                    <img    src=""  alt='VistaPrevia'></img>
                </form>
            </main>
        )
    }
export default VocabularioAdmi;