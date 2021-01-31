
const FtPrimaryButton = (props) => {

    const primaryButtonStyle = {
        width: 125,
        height: 45,
        padding: '10 25',
        fontSize: 18
    }
    return <input style={primaryButtonStyle} value={props.value} onClick={(e)=> props.createUser} type={props.type}/>
}

export default FtPrimaryButton;