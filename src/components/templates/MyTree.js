import { getMyTree, getFamilyTree, checkForPartner } from '../firebaseFiles/firebase';
import { useEffect, useState } from 'react';
import FtTreeNode from '../molecules/FtTreeNode';
import FtCoupleTreeNode from "../molecules/FtCoupleTreeNode";
// import FamilyTree from "../templates/FamilyTree";
import { localUserId, defaultFamTree, colors } from '../../assets/constants/constant';

const MyTree = (props) => {
    
    const userId = localUserId;
    const [treeHeadId,setTreeHeadId] = useState(userId)
    const [famTree,setFamTree] = useState(defaultFamTree)

    // checkForPartner("h0bAiha8DpRwgKPSH86kSBQ1U082","eFuXcIgTz7aywPw34IowbILwUrB2","mother")

    useEffect(() => {
        getMyTree(userId).then((treeHeadId) => {
            console.log(treeHeadId)
            setTreeHeadId(treeHeadId)
            if(userId === treeHeadId){
                console.log("inside")
                getFamilyTree(userId,setFamTree)
            }
        })
    },[userId])
    
    return (
    <div className="tree" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }}>
        <AddFamily treeHeadId={treeHeadId} userId={userId} famTree={famTree}>
            <ul>
                <li>
                    <FtCoupleTreeNode userId={treeHeadId}>
                    </FtCoupleTreeNode>
                </li>
                {
                    treeHeadId === userId && (famTree.father.id !== 0) &&
                    <li>
                    <FtTreeNode userId={-1} />
                    </li>
                }
            </ul>
        </AddFamily>
    </div>
    )
}

export const AddFamily = ({famTree,children,treeHeadId, userId}) => {
    console.log(famTree)
    if (treeHeadId === userId)
    return(
        <ul>
            <li>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <FtTreeNode userId={famTree.father.id} tempUserId={famTree.father.mobile} relation="father" relHead="Father"/>
                    <div style={{color: colors.primaryTextColor}}>+</div>
                    <FtTreeNode userId={famTree.mother.id} tempUserId={famTree.mother.mobile} relation="mother" relHead="Mother"/>
                </div>
                {children}
            </li>
        </ul>
    )

    return (
        <>
            {children}
        </>
    )
}

export default MyTree;