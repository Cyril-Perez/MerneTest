import { useEffect , useState } from "react";
import "./message.css"
import socketIOClient from "socket.io-client"
import { useParams } from "react-router-dom";
const ENDPOINT = "http://127.0.0.1:5000"

const Message = ()=>{
const params = useParams()

const [test , setTest] = useState("hello world !!")

    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT)
        socket.emit("connection", {_id : params.id})
    })

    return (
        <div>
           <p>{test}</p>
        </div>
    )
}

export default Message;