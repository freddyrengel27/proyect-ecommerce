

export const saveInfoSession = (nombre, username) =>{
    const userData = {
        nombre,
        username
    };
    const dataSession = JSON.parse(localStorage.getItem("dataSession")); 
    if(!dataSession){
        const data = [];
        data.push(userData)
        return localStorage.setItem("dataSession", JSON.stringify(data));
    }
    let getValidate = dataSession.filter(obj => obj.username == userData.username);
    if(getValidate.length == 0){
        dataSession.push(userData);
        localStorage.setItem("dataSession", JSON.stringify(dataSession));
        
    }
};

export const getInfoSession = () =>{
    return JSON.parse(localStorage.getItem("dataSession"));
};

