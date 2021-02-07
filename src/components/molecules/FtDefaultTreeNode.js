const FtDefaultTreeNode = (props) => {

    if(props.userId === 0){

        return (
            <div style={{
                height: 100, 
                width:100, 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                border: 2,
                borderStyle: 'solid',
                borderColor: 'black'
            }}>
                <div style={{
                    fontSize: 12,
                    color: 'black',
                    fontWeight: 'bold'
                }}>Add {props.relation}</div>
            </div>
        )
    }
    if(props.userId === -1){
        return (
            <div style={{
                height: 100, 
                width:100, 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                border: 2,
                borderStyle: 'solid',
                borderColor: 'black'
            }}>
                <div style={{
                    fontSize: 12,
                    color: 'black',
                    fontWeight: 'bold'
                }}>Invite</div>
            </div>
        )
    }
    
}

export default FtDefaultTreeNode;