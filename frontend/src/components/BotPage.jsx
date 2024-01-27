import React, { useRef, useState } from 'react'
import axios from 'axios';
import CloseSharpIcon from '@mui/icons-material/CloseSharp'; import SendSharpIcon from '@mui/icons-material/SendSharp';
import { Input } from '@chakra-ui/react'
import '../index.css'

const YOU = "you";
const AI = "ai";

const BotPage = ({fn}) => {
    const inputRef = useRef();
    const [qna, setQna] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [lodingTwo, setLoadingTwo] = useState(false);


    const extractValue = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0) {
            setLoadingTwo(true)
        } else {
            setLoadingTwo(false)
        }
    }

    const updateQNA = (from, value) => {
        setQna((qna) => [...qna, { from, value }]);
    };

    // console.log(qna[qna.length-1]?.value )

    const handleSend = () => {
        const question = inputRef.current.value
        inputRef.current.value = "";
        updateQNA(YOU, question);
        setLoadingTwo(false)

// http://localhost:3000/chat
        setLoading(true)
        axios
            .post("https://chatbot-server-self.vercel.app/chat", {
                question,
            })
            .then((response) => {
                updateQNA(AI, response.data.ans);
            })
            .finally(() => {
                setLoadingTwo(false);
                setLoading(false);
            });
    }

    const handleEnter = (e) => {
        if (e.key === "Enter" && e.target.value) {
            handleSend();
        }
    }

    const renderContent = (qna) => {
        const value = qna.value;

        if (Array.isArray(value)) {
            return value.map((v) => <p className="message-text">{v}</p>);
        }
        return <p className="message-text">{value}</p>;
    };



    return (
        <>
            <div className="top">
                <div className="agent-details">
                    <img src="https://cdn3d.iconscout.com/3d/premium/thumb/chatbot-8113743-6497271.png" alt="" />
                    <div className="agent-text">
                        <h3>Jarvis</h3>
                        <p>Agent <span>(online)</span></p>
                    </div>
                    <CloseSharpIcon onClick={()=>fn(false)} className='buttoncross' />

                </div>
            </div>

            <div className="middle" >
                {
                    loading &&
                    <div className="recieve chat reveive-other">
                        <p className="message-text loading">Thinking </p>
                    </div>
                }
                <div className="chats">
                    {
                        qna.map((qna, i) => {
                            if (qna.from === YOU) {
                                return (
                                    <div className="send chat">
                                        {
                                            renderContent(qna)
                                        }
                                    </div>
                                )
                            }
                            return (
                                <div className="recieve chat">
                                    {
                                        renderContent(qna)
                                    }
                                </div>
                            )
                        })
                    }
                    <div className="emptybox">

                    </div>
                </div>

            </div>

            <div className="bottom">
                <Input onKeyDown={handleEnter} className="inputbox" type="text" ref={inputRef} placeholder='Ask Anything...' onChange={(e) => extractValue(e)} />
                {(lodingTwo) && (<SendSharpIcon className="inputbutton" disabled={true} onClick={handleSend} />)}

            </div>

        </>



    )
}

export default BotPage