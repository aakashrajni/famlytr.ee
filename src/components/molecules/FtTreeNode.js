import { gender } from "../../assets/constants/constant";
import { getUserDetails } from '../firebaseFiles/firebase';
import { useEffect, useState } from 'react';
import { defaultUser } from '../../assets/constants/constant';

const FtTreeNode = (props) => {

    const [userObj,setUserObj] = useState(defaultUser);

    useEffect(() => {
        function handleUserDetail(userDetail){
            setUserObj(userDetail);
        }
        if(props.userId !== 0 && props.userId !== -1)
        getUserDetails(props.userId, handleUserDetail);
    })

    const borderColor = gender[userObj.gender].color;
    const StatusColor = userObj.created?'green':'red';

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

    return (
        <div style={{
            height: 100, 
            width:100, 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'stretch',
            alignItems: 'stretch',
            border: 2,
            borderStyle: 'solid',
            borderColor: borderColor,
            position: 'relative'
        }}>
            <div style={{
                padding: 5,
                position: 'absolute',
                top: 0,
                right: 0,

            }}>+</div>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '40%',
                display: 'flex',
                backgroundColor: '#80808075',
                flexDirection: 'row',
                alignItems: 'stretch'
            }}>
                <div style={{
                    display: 'flex',
                    flex: 3,
                    alignItems: 'center',
                    color: 'white',
                    paddingLeft: 5,
                    paddingRight: 5,
                    fontSize: 12,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    { userObj.firstName }
                </div>
                <div style = {{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: 10,
                        height: 10,
                        border: 1,
                        borderStyle: 'solid',
                        borderColor: StatusColor,
                        borderRadius: 5,
                        backgroundColor: StatusColor
                    }}></div>
                </div>
            </div>
        </div>
    )
}

export default FtTreeNode;