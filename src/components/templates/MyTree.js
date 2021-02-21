import { getFamilyTree } from '../firebaseFiles/firebase';
import { useEffect, useState } from 'react';
import FtTreeNode from '../molecules/FtTreeNode';
import { defaultFamTree, userId } from '../../assets/constants/constant';

const MyTree = (props) => {
    
    const [famTree,setFamTree] = useState(defaultFamTree);
    useEffect(() => {
        function handleFamTree(famTree){
            setFamTree(famTree);
        }
        getFamilyTree(userId,handleFamTree);
    },[])

    return (
    <div className="tree" style={{
        width: '100%',
        height: '100vh',
        padding: 25,
        boxSizing: 'border-box'
    }}>
        <ul style={{ width: '100%', height: '100vh'}}>
            <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FtTreeNode userId={famTree.father.id} tempUserId={famTree.father.mobile} relation="father" relHead="Father"/>
                    +
                    <FtTreeNode userId={famTree.mother.id} tempUserId={famTree.mother.mobile} relation="mother" relHead="Mother"/>
                </div>
                <ul>
                    <li style={{ paddingTop: 25 }}>
                        <FtTreeNode userId={userId}/>
                    </li>
                    <li style={{ paddingTop: 25 }}>
                        <FtTreeNode userId={-1}/>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    )
}

export default MyTree;