import React from "react";


export const Box = ({text, color})=> {
    return (
                <div className="color-container" style={{backgroundColorcolor: color}}>
                    {text}
                </div>

    )
}