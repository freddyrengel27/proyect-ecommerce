

const htmlOput = (token) =>{
    return `
        <table width="100%" height="500px" background-color="#FFF159" bgcolor="#FFF159" display="flex">
            <tr width="100%" height="70px">
                <td width="100%" height="100%"  bgcolor="">
                <div style="width:70%; heigth:60px; margin:0 auto;>
                    <h1 style="text-align:center; ">CloneComerce</h1>
                </div>
                <p>http://localhost:8080/#/recovery/${token}</p>
                </td>
            </tr>    
        </table>
    `
}

export default htmlOput;