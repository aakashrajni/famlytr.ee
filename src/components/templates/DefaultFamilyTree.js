import React , {useState, useEffect} from 'react'
import { getFamilyTree } from '../firebaseFiles/firebase'
import { defaultFamTree } from '../../assets/constants/constant'

const DefaultFamilyTree = (props) => {

    const [famTree,setFamTree] = useState(defaultFamTree);
    const userId = props.userId;
    useEffect(() => {
        function handleFamTree(famTree){
            if(userId !== 0){
                if(famTree)
                setFamTree(famTree);
                if(famTree.children)
                setChildren(Object.keys(famTree.children));
            }
        }
        getFamilyTree(userId,handleFamTree);
    },[userId])

    return(
        <ul>
            <li>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FtTreeNode userId={props.famTree.father.id} tempUserId={props.famTree.father.mobile} relation="father" relHead="Father"/>
                    +
                    <FtTreeNode userId={props.famTree.mother.id} tempUserId={props.famTree.mother.mobile} relation="mother" relHead="Mother"/>
                </div>
                <ul>
                    <li> <FtCoupleTreeNode userId={props.altUserId} /> </li>

                    {/* can invite siblings after mother and father added */}
                    { props.famTree.father.id !== 0 &&  props.famTree.mother.id !== 0 &&
                        <li>
                            <FtTreeNode userId={-1}/>
                        </li>
                    }
                </ul>
            </li>
        </ul>
    )
}

export default DefaultFamilyTree