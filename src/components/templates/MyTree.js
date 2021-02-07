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
    <div style={{
        width: '100%',
        height: '100vh',
        padding: 25,
        boxSizing: 'border-box'
    }}>
        <ul style={{ width: '100%', height: '100vh'}}>
            <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FtTreeNode userId={famTree.fatherId} relation="Father"/>
                    +
                    <FtTreeNode userId={famTree.motherId} relation="Mother"/>
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