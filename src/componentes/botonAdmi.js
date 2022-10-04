import React from "react";

import PropsTypes from 'prop-types'
const BotonAdmin = ({value}) =>{
    return(
        <button> {value} </button>
    )
}
//propiedades 
BotonAdmin.propTypes={
        value:PropsTypes.string.isRequired
    }

//propiedades por default
BotonAdmin.defaultProps={
    value:''
}

export default BotonAdmin;