import PackageJSON from '../../package.json'

async function DeleteTaskApi(taskid) {

    const url = PackageJSON.API.BaseUrl + `/tasks/${taskid}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
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

export default DeleteTaskApi;