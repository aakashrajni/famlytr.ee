import {useEffect} from 'react';

const FtAlert = (props) => {
    const alertStyle = {
        width: '100%',
        height: 35,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: props.type === 'SUCCESS'? 'green': 'red',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    useEffect(() => {
        setTimeout(()=>{
            // document.getElementById("alertDiv").style.display = "none";
            props.msgObj({type: "", msg: ""});
        },3000)  
    })
    
    return (
        <div id="alertDiv" style={ alertStyle }>
            {props.type === "SUCCESS"?"Success : ":"Error : "}{props.children}
        </div>
    )
}

export default FtAlert;