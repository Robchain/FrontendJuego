import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL/*, getMetadata*/ } from "firebase/storage"
//import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain:  process.env.REACT_APP_AUTHDOMAIN,
  projectId:  process.env.REACT_APP_PROJECTOID,
  storageBucket:  process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGINGSENDERID,
  appId:  process.env.REACT_APP_APPID
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

/**
 * 
 * @param {File} file el archivo a subir
 * @returns el url del arhivo subido
 */
export  const subidaIPerfil =   async  file  =>  {    
    const storageRef = ref(storage, `perfil/${file.name}`)
    await uploadBytes(storageRef, file)
    const url   = await getDownloadURL(storageRef)
    return  url
}
/**
 * 
 * @param {File} file archivo a subir a rompecabeza
 * @returns el url del archivo
 */
export  const subidaIRompecabeza =   async  file  =>  {    
  const storageRef = ref(storage, `rompecabeza/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}

export  const subidaIVocabulario =   async  file  =>  {    
  const storageRef = ref(storage, `vocabulario/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}

export  const subidaIOracion =   async  file  =>  {    
  const storageRef = ref(storage, `oracion/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}
export  const subidaQuienImagen =   async  file  =>  {    
  const storageRef = ref(storage, `oracion/opcionessujeto/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}
export  const subidaIEquipo =   async  file  =>  {    
  const storageRef = ref(storage, `oracion/${file.name}`)
  await uploadBytes(storageRef, file)
  const url   = await getDownloadURL(storageRef)
  return  url
}
