import FtTreeNode from './FtTreeNode'
import { useEffect, useState } from 'react'
import { getFamilyTree } from '../firebaseFiles/firebase';
import { defaultFamTree } from '../../assets/constants/constant';
import { localUserId as curUserId } from '../../assets/constants/constant';

const FtCoupleTreeNode = ({userId}) => {

    const [famTree,setFamTree] = useState(defaultFamTree);
    
    useEffect(() => {
        function handleFamTree(famTree){
            console.log(famTree)
            setFamTree(famTree);
        }
        getFamilyTree(userId,handleFamTree);
    },[userId])

    return(
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FtTreeNode userId={userId} />
                {
                    famTree.partner.id !== 0 && famTree.partner.id !== -10 &&
                    <FtTreeNode userId={famTree.partner.id} />
                }
                {
                    famTree.partner.id !== 0 && famTree.partner.id === -10 &&
                    <FtTreeNode userId={famTree.partner.id} tempUserId={famTree.partner.mobile}/>
                }
            </div>
            {
                famTree.children && <ChildrenTreeNode children={Object.keys(famTree.children)} />
            }
        </>
    )

    // if(famTree.partner.id !== 0){
    //     return (
    //         <>
    //             <FtTreeNode userId={userId} />
                
    //             {
    //                 famTree.children && <ChildrenTreeNode children={Object.keys(famTree.children)} />
    //             }
    //         </>
    //     )
    // }

}

export const ChildrenTreeNode = (props) => {

    const hasChildren = props.children.length === 0?false:true;
    let hasCurrentUser = false;

    if(hasChildren)
    return(
        <ul>
            {
                props.children.map((child,index) =>{
                    if(child === curUserId)
                        hasCurrentUser = true
                    return <li key={"child_"+index}><FtCoupleTreeNode userId={child} /></li>
                })
            }
            { hasCurrentUser &&
                <li>
                    <FtTreeNode userId={-1}/>
                </li>
            }
        </ul>
    )

    return null
}

export default FtCoupleTreeNode;