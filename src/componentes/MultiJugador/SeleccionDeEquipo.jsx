import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap'
import { JuecoContext } from '../../context/Juego/JuecoContext'
import { AcciondeAsignarGruposConJuegos } from '../../service/Multijugador';

export const SeleccionDeEquipo = ({IdDeLaAsignacion, IdDelGrupo, id}) => {

const { llamadaDos,cardEquipo} = useContext(JuecoContext);
const navegar = useNavigate();
useEffect(() => {
  llamadaDos(IdDeLaAsignacion);
}, [])


 const onclickevent= async(input)=>{
  let idDeBase = IdDelGrupo;
  let BaseUno = input;
  const res = await AcciondeAsignarGruposConJuegos(idDeBase, BaseUno);
  //falta la re direccionamiento
  navegar(`/JuegoActivo/Jugador/${id}`);
  
}

  return (
    <>
    {cardEquipo.length > 0 ? ( <Row className='align-items-center'>
    <Col lg="6" className='mx-auto' style={{textAlign:'center'}}>
      <h3>Selecion De Equipo</h3>
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
