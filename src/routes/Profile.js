import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { getAuth, updateProfile } from "firebase/auth";

const Profile = ({userObj, refreshUser}) => {
    let navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut()
        navigate("/")
    };    

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        const auth = getAuth();
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(auth.currentUser,{ displayName: newDisplayName });
            refreshUser();
        }
    };
    

    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} 
                    type="text" 
                    placeholder="Display name" 
                    value={newDisplayName}
            />
            <input type="submit" value="Update Profile"/>
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;