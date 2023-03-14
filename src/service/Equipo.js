import axios from 'axios'


export const todosTeam  = async () => {
        try {
    const data = await axios.get('http://192.168.10.115:3002/api/auth/Equipo/mostrartodo')
    return data.data
        } catch (error) {
            return error;            
        }    }