import PackageJSON from '../../package.json';

async function LoginApi(model) {
    const jsonData = JSON.stringify(model);
    const url = PackageJSON.API.BaseUrl + `/login`
    try {
        const resp = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
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

export default LoginApi;