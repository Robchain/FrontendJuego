import React , {useState, useRef}from "react";
import MenuAdmin from "./menuAdmi";
import './vocabularioAdmi.css'


const VocabularioAdmi =()=>{
const [DataVoca, SetDataVoca]=useState({
    Categoria:'',
    Palabra:'',
    Silaba:'',
    FileMuestra:'',
    FilePregunta:'',
    FileImagen:'',
    Estado:''    
})

const handleChange = (event)=>{
    const {name, value}=event.target;
    SetDataVoca({...DataVoca, [name]:value})

}

   const archivoref=useRef();
   
    const   handleSubmit=(e)=>{
        e.preventDefault();
       //metodos post o get


    }
        return(
            <main>
                <MenuAdmin/>
                <form  className="formularioV" onSubmit={handleSubmit} >
                <div>
                <h1>Vocabulario</h1>
                    <label>Categoria</label>
                    <input  type='text' name="Categoria"    onChange={handleChange}></input>
                    <label>Palabra</label>
                    <input  type="text" name="Palabra"  onChange={handleChange}></input>
                    <label>Silabas</label>
                    <input  type="text" name="Silaba"   onChange={handleChange}></input>
                    <label>VideoMuestra</label>
                    <input  type="file"     className='input_archivo'name="FileMuestra" ref={archivoref} ></input>
                    <label>Video Pregunta</label>
                    <input  type="file" className='input_archivo' name="FilePregunta" ref={archivoref}></input>
                    <label>Imagen</label>
                    <input  type="file" className='input_archivo' name="FileImagen"   ref={archivoref}     ></input>
                    <label>Estado</label>
                    <input  type="text" name="Estado"   onChange={handleChange}></input>
                    <button type="submit"   className='boton'   value='Guardar'>Guardar</button>
                    </div>
                    <img    src=""  alt='VistaPrevia'></img>
                </form>
            </main>
        )
    }
export default VocabularioAdmi;