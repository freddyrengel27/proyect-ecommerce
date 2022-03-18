 
 export const savetToken = (nombre, token) =>{
    localStorage.setItem(nombre, token);
 };

 export const getToken = (nombre) =>{
     return localStorage.getItem(nombre);
 };