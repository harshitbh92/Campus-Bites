import { useState } from "react";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Footer = () => {
   const [letter,setLetter] = useState("");

  const registeredNews = () => toast("You have successfully registered!!");
  const invalidEmail = () => toast("Please enter valid email");

    const newsEmail  = (e)=>{
        setLetter(e.target.value);    
}
const submitNews = (e) => {
    e.preventDefault();
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!res.test(letter)){
        invalidEmail()
    }else{
        setLetter("");    
        registeredNews();

    }

}
    return (
        <>
            <div className="justify-content-center mt-3">
        
                                          
                <hr className="mx-0 px-0" />
                <footer className="footer ">
                    
                        <div className="bg-danger text-light text-center p-3">
                        <p className="social mt-md-3 mt-2">
                            <AiFillFacebook className="socialicon" />
                            <AiFillInstagram className="socialicon" />
                            <AiOutlineTwitter className="socialicon" />
                            <AiFillLinkedin className="socialicon" />

                        </p>
                        <div className="copy-rights cursor-pointer text-center">
                            &#9400;{new Date().getFullYear()} CampusBites
                            Copyright.All Rights Resered.

                        </div>

                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer