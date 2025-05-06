import PackageJSON from '../../package.json'

async function GetCurrentUser() {

    const url = PackageJSON.API.BaseUrl + "/currentuser";

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        })

        const jsonResp = await response.json();

        if(!response.ok) {
            console.log(jsonResp.response);
            return null;
        }
    
        return jsonResp;
    }
    catch(e) {
        console.log(e);
    }
}

export default GetCurrentUser;