import { useState } from "react";
import { authService} from "../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
    const [email, setEmail] = useState(""); //email
    const [password, setPassword] = useState(""); //password
    const [newAccount, setNewAccount] = useState(true); //Account
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev); //Toggle Account

    //상태 변화
    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;

        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    //Submit 버튼
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                //log in
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    //소셜 로그인 버튼
    const onSocialClick = async (event) => {
        // console.log(event.target.name);
        const {
            target: {name},
        } = event;

        let provider;

        if(name === "google") { //Google 소셜 로그인
            provider = new GoogleAuthProvider();
        } else if (name === "github") { //Github 소셜 로그인
            provider = new GithubAuthProvider();
        }
        
        const data = await signInWithPopup(authService, provider);
    };

    return(
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;