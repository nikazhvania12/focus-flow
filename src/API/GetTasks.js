import PackageJSON from '../../package.json'

async function GetTasks(model) {
    const url = model ? PackageJSON.API.BaseUrl + 
    `/tasks?priority_id=${model.priority_id}&difficulty_id=${model.difficulty_id}&val=${model.val}&user_id=${model.user_id}`
    :
    PackageJSON.API.BaseUrl + `/tasks`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        })

        const jsonResp = await response.json();

        console.log(jsonResp);

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

export default GetTasks;