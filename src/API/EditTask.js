import PackageJSON from '../../package.json';

async function EditTaskApi(model, id) {
    const jsonData = JSON.stringify(model);
    const url = PackageJSON.API.BaseUrl + `/tasks/${id}`
    try {
        const resp = await fetch(url, {
            method: "PUT",
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

export default EditTaskApi;