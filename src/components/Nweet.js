import {React, useState} from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    //삭제 버튼
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if(ok) {
            const data = await dbService.doc(`nweets/${nweetObj.id}`).delete();

            if(nweetObj.attachmentUrl !== "") {
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet});
        setEditing(false);
    }

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input
                            onChange={onChange} 
                            value={newNweet} 
                            required 
                            placeholder="Edit Your nweet"
                            autoFocus
                            className="formInput"
                        />
                        <input type="submit" value="Update Nweet" className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </button>
                </>
            ):(
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <>
                            <img alt="" src={nweetObj.attachmentUrl} width="50px" height="50px"/>
                        </>
                    )}
                    <br />
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}    
        </div>
    );
};

export default Nweet;