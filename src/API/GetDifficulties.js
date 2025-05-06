import PackageJSON from '../../package.json'

async function GetDifficulties() {

    const url = PackageJSON.API.BaseUrl + "/difficulties";

    try {
        const response = await fetch(url, {
            method: 'GET',
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

export default GetDifficulties;