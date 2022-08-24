import React,{useState, useRef} from "react";
import MenuAdmi from "../componentes/menuAdmi";
import './OracionAdm.css';
const OracionAdm    =   ()  =>{
    const [FormValue, setFormValue] = useState({
        Categoria:'',
        Oracion:'',
        Verbo:'',
        FileSujetoImagen:'',
        FileAdjetivoImagen:'',
        FileVideoPreguntaQue:'',
        FileVideoPreguntaQuien:'',
        FileVideoPreguntaCompleja:'',
        FileVideoMuestra:'',
        Estado:'',

    })

    const fileref    =   useRef()

    const handlechange  =   (event)  =>{
        const {name, value}=event.target;
    setFormValue({...FormValue, [name]:value})
    
    }
    const handlesubmit =    e=>{
        e.preventDefault();
        //metodos post y get
    }

    return(
        <main>
        <MenuAdmi/>
       
        <form onSubmit={handlesubmit}  className="formularioO">
        <div>
        <h1>Oraciones</h1>
        <label>CATEGORIA</label>
        <input
            name='Categoria'
            value={FormValue.Categoria}
            onChange={handlechange}
        ></input>
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
        <input  
            type='text'
            name="Estado"
            value={FormValue.Estado}
            onChange={handlechange}
        ></input>
        <button className="botonU">GUARDAR</button>
        </div>
        <img    src="" alt="FotoSubida"/>
        </form>        
        </main>
       

    )
}
export default OracionAdm;