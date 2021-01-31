import React from 'react';

const FtInputBox = (props) =>{

    const textInputStyle = {
        width: props.width,
        height: 33
    }

    return <input type="text" value={props.value} placeholder={props.placeholder} style={textInputStyle} onChange={(e) => props.updateValue(e.target.value)} required pattern={props.pattern} autoComplete={props.autocomplete}/>
}

export default FtInputBox;