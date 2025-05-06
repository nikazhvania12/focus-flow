import PackageJSON from '../../package.json';

async function RegisterApi(model) {
    console.log(model);
    const jsonData = JSON.stringify(model);
    const url = PackageJSON.API.BaseUrl + `/register`
    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: jsonData
        })
    
        const jsonResp = await resp.json();

        if(!resp.ok) 
            console.log(jsonResp);

        return jsonResp
    }
    catch(e) {
        console.log(e);
    }
}

export default RegisterApi;