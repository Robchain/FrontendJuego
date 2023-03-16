import { Api } from './api';


export const todosTeam  = async () => {
        try {
    const data = await Api.get('/Equipo/mostrartodo')
    return data.data
        } catch (error) {
            return error;            
        }    }