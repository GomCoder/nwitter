import { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Home = ({userObj}) => {
    
    const [nweets, setNweets] = useState([]);
    
    useEffect(() => {
        dbService
            .collection("nweets")
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
                }));
            setNweets(newArray);
            });
        }, []);

    return (
        <div style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
            }}>
            <div className="containter">

                <NweetFactory  userObj={userObj} />
                <div style={{ marginTop: 30 }}>
                    {nweets.map((nweet) => (
                        <Nweet
                            key={nweet.id}
                            nweetObj={nweet}
                            isOwner={nweet.creatorId === userObj.uid}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;