import PackageJSON from '../../package.json'

async function Logout() {

    const url = PackageJSON.API.BaseUrl + "/logout";

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })

        const jsonResp = await response.json();

        if(!response.ok) {
            console.log(jsonResp.response);
        }
    
        return jsonResp;
    }
    catch(e) {
        console.log(e);
    }
}

export default Logout;