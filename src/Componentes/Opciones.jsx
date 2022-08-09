import React from "react";
import { useState } from "react";

export function Opciones (n){
    let [cont, setCont] = useState(0)
    function suma (){
        setCont(cont+1)
    }

    function resta (){
        if (cont !== 0){
            setCont(cont-1)
    }
}
    return(
        <>
        <div className="opcion {n}">
            <h1>Opcion {n}</h1>
            <button className="sumar" onClick={suma}>+</button>
            <button className="restar" onClick={resta}>-</button>
            <div>
                {cont}
            </div>
        </div>
        </>
    )
    }