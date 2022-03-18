import moment from "moment";


export const timeFormat = (fecha, hora) =>{
    const formatos = ["months", "weeks", "days", "hours", "minutes"]
    const FullActual = moment().format("YYYY-MM-DD HH:mm:ss");
    const oldFecha = moment(`${fecha} ${hora}`, "YYYY-MM-DD HH:mm:ss");

    for (const format of formatos) {
        let tiempo = Math.abs(oldFecha.diff(FullActual, format))
            if(tiempo >= 1){
                if(format == "months"){
                    if(tiempo == 1) return `${tiempo } Mes`;
                    return `${tiempo} Meses`;
                 }
                 if(format == "weeks"){
                    if(tiempo == 1) return `${tiempo } Semana`;
                    return `${tiempo} Semanas`;
                 }
     
                 if(format == "days"){
                    if(tiempo == 1) return `${tiempo } Día`;
                    return `${tiempo} Días`;
                 } 
     
                 if(format == "hours"){
                    if(tiempo == 1) return `${tiempo } Hora`;
                    return `${tiempo} Horas`;
                 }
     
                 if(format == "minutes"){
                    return `${tiempo} Minutos`;
                 }
            } 
        }
};

export const timeFormat2 = (fecha) =>{
   const formatos = ["months", "weeks", "days", "hours", "minutes"]
   const FullActual = moment().format("YYYY-MM-DD HH:mm:ss");
   const oldFecha = moment(fecha, "YYYY-MM-DD HH:mm:ss");

   for (const format of formatos) {
       let tiempo = Math.abs(oldFecha.diff(FullActual, format))
           if(tiempo >= 1){
               if(format == "months"){
                   if(tiempo == 1) return `${tiempo } Mes`;
                   return `${tiempo} Meses`;
                }
                if(format == "weeks"){
                   if(tiempo == 1) return `${tiempo } Semana`;
                   return `${tiempo} Semanas`;
                }
    
                if(format == "days"){
                   if(tiempo == 1) return `${tiempo } Día`;
                   return `${tiempo} Días`;
                } 
    
                if(format == "hours"){
                   if(tiempo == 1) return `${tiempo } Hora`;
                   return `${tiempo} Horas`;
                }
    
                if(format == "minutes"){
                   return `${tiempo} Minutos`;
                }
           } 
       }
};    


