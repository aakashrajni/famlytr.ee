import React from 'react'


const FtDropdown = (props) => {
    return(
        <select style={{width:props.width}} onChange={(e)=> props.updateValue(e.target.value)}>
            {/* <option value={props.value}>{props.placeholder}</option> */}
            {
                props.data.map((ele) => {
                    return <option value={ele.value}>{ele.name}</option>
                })
            }
        </select>
    )
}

export default FtDropdown;