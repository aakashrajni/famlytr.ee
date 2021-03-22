import { getFamilyTree } from '../firebaseFiles/firebase';
import { useEffect, useState } from 'react';
import FtTreeNode from '../molecules/FtTreeNode';
import FtCoupleTreeNode from "../molecules/FtCoupleTreeNode";
import { defaultFamTree } from '../../assets/constants/constant';

const FamilyTree = (props) => {
    console.log("props",props.famTree)
    const [famTree,setFamTree] = useState(defaultFamTree);
    const userId = props.userId;
    const [children,setChildren] = useState([]);
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

    if(userId === 0)
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
    if(famTree.father.id === 0 && famTree.mother.id === 0)
    return (
        <ul>
            <li>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FtTreeNode userId={props.famTree.father.id} tempUserId={props.famTree.father.mobile} relation="father" relHead="Father"/>
                    +
                    <FtTreeNode userId={props.famTree.mother.id} tempUserId={props.famTree.mother.mobile} relation="mother" relHead="Mother"/>
                </div>
                <ul>
                    {
                        children.map((child,index)=>{
                            return <li key={"sibling_"+index} style={{ paddingTop: 25 }}> <FtCoupleTreeNode userId={child} /> </li>
                        })
                    }

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
    if(famTree.father.id !== 0)
    return (
        <FamilyTree userId={famTree.father.id} famTree={famTree}>
            <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FtTreeNode userId={props.famTree.father.id} tempUserId={props.famTree.father.mobile} relation="father" relHead="Father"/>
                    +
                    <FtTreeNode userId={props.famTree.mother.id} tempUserId={props.famTree.mother.mobile} relation="mother" relHead="Mother"/>
                </div>
                <ul>
                    {
                        children.map((child,index)=>{
                            return <li key={"sibling_"+index}> <FtCoupleTreeNode userId={child} /> </li>
                        })
                    }

                    {/* can invite siblings after mother and father added */}
                    { props.famTree.father.id !== 0 &&  props.famTree.mother.id !== 0 &&
                        <li>
                            <FtTreeNode userId={-1}/>
                        </li>
                    }
                </ul>
            </li>
        </FamilyTree>
    )
}

export default FamilyTree;