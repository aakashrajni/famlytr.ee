
const FtPrimaryButton = (props) => {

    const primaryButtonStyle = {
        width: props.width || 125,
        height: props.height || 45,
        padding: '10 25',
        fontSize: props.fontSize || 18,
        textAlign: 'center'
    }
    
    return <input id={props.id} disabled={props.disabled} style={primaryButtonStyle} value={props.value} type={props.type} onClick={props.clickMethod}/>
}

export default FtPrimaryButton;