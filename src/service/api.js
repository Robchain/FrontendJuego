import axios from 'axios';
const url="http://localhost:3002/api/auth"
export async function postEstudiante    (info){
    try {
        const response  = await axios({
            url:`${url}/signup`,
            method:'POST',
            data:info
        })
    } catch (e) {
        console.log(e);
    }
}
export async function postUsurio    (info){
    try {
        const response  = await axios({
            url:`${url}/signin`,
            method:'POST',
            data:info
        }).then(response=>{
                localStorage.setItem('token',response.data.token)
                console.log(response);
        })
    } catch (e) {
        console.log(e);
    }
}