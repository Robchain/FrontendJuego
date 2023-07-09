import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap'
import { JuecoContext } from '../../context/Juego/JuecoContext'
import { AcciondeAsignarGruposConJuegos, CreaJuegoMulti } from '../../service/Multijugador';
import cargando from '../../assets/img/AssetsGame/paperplane.gif'
export const SeleccionDeEquipo = ({IdDeLaAsignacion, IdDelGrupo, id,TipoDeJuego}) => {

const { llamadaDos,cardEquipo, setDataMultiJu} = useContext(JuecoContext);
const [loading, setloading] = useState(false)
const navegar = useNavigate();
useEffect(() => {
  llamadaDos(IdDeLaAsignacion);
}, [])


 const onclickevent= async(input)=>{
  let idDeBase = IdDelGrupo;
  let BaseUno = input;
  let num= parseInt(TipoDeJuego);
  setloading(true);
  const res = await AcciondeAsignarGruposConJuegos(idDeBase, BaseUno);
  const data =await CreaJuegoMulti({num:num});
  setDataMultiJu(data)
  setloading(false);
  navegar(`/JuegoActivo/Jugador/${id}`);
  
}

  return (
    <>
    {cardEquipo.length > 0 ? ( <Row className='align-items-center'>
    {loading && (
      <div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div>
    )}
    
    <Col lg="6" className='mx-auto' style={{textAlign:'center'}}>
      <h3>Selección De Equipo</h3>
    </Col>
    <Row className='align-items-center' style={{height:"50vh"}}>
    {cardEquipo.map(cardSol =>( <Col key={cardSol.id}>
     <Card key={cardSol.id+1} onClick={()=>onclickevent(cardSol)} className='animacionBoton'><CardImg  alt={cardSol.Equipo.Nombre}
      src={cardSol.Equipo.Imagen}
      top
      width="100%"/>
      <CardBody>
      <CardTitle tag="h5" style={{textAlign:'center'}}>
        {cardSol.Equipo.Nombre}
      </CardTitle>
      </CardBody></Card>
    </Col> ))}
     </Row>
    </Row>):(<>Cargando</>)}
    </>
  )
}
