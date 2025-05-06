import PackageJSON from '../../package.json'

async function GetStatuses() {

    const url = PackageJSON.API.BaseUrl + "/statuses";

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

export default GetStatuses;