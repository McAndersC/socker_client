import socket from "../../../services/socket";
import iStyles from "./iMessage.module.css";

import { useEffect, useRef, useState } from "react";

const SocketExample = () => {

    const [connected, setIsConnected] = useState('disconnected');
    const [thread, setThread] = useState([]);
    const [author, setAuthor] = useState('');

    // En reference (querySelector) til vores thread element
    const refThread = useRef();

    // Vi benytter en useEffect til at tilgå vores socket i forhold til on/off connection
    useEffect( () => {
        
        const onConnect = () => {
            setIsConnected(true);
        }

        const onDisconnect = () => {
            setIsConnected(false);
        }    
        
        // Her opretter vi vores "listeners".
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {

          // Her sørger vi for at afslutte vores "listeners" når komponentet ikke benyttes.  
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
        
    }, [])


     // Her opretter vi en lytter der lytter efter severen der "emitter" en "post".
     // Kig i server koden, server,js ca. linie 53
    useEffect( () => {

        const onUpdateThread = (post) => {
       
            post = JSON.parse(post);
       
            setThread(
                [
                    ...thread,
                    post
                ]
            )
            
        }

        // Hvis serveren sender en event med navnet "post",
        // så modtager vi det event og tilføjer data fra dette event til vores thread array.  
        socket.on('post', onUpdateThread);

        return () => {
            socket.off('post', onUpdateThread);
        }; 

    }, [thread])

    // Simpel håndtering af vores form input.
    const onHandleSubmit = (e) => {

        e.preventDefault();
        
        const {message, author} = e.target.elements;

        if(message.value !== '' || message.author !== '')
        {
            
            // Her sender vi et event til severen med vores besked.
            // Når vi har sendt beskeden vil sevren sende en "post" tilbage med den samme 
            // besked og vi indsætter den i threads array´et. Vi gør det på denne måde for at alle
            // Klienter får beskeden fra serveren. 
            socket.emit('clientMessage', JSON.stringify({
                'author' : author.value,
                'message' : message.value
            }));

            // Vi sætter vores author lig med input author dette er meget primitivt og 
            // er kun for eksemplets skyld. Vi bruger det til visuelt at adskille chat.
            setAuthor(author.value)
   
        }

    }

    return (

        <div>
            {/* En bette header. */}
            <header>
                <img src="/MCDM_Logo.jpg" width="100"></img>
                <p>MCDM SOCKET CLIENT</p>
            </header>

            {/* Connetion Status */}
            <div>
                <h2>Connection</h2>
                <p>{connected}</p>
            </div>
            
            {/* Thread / Comments */}
            <div>

                <h2>Thread</h2>
                <div className={`${iStyles.imessage}`} ref={refThread}>

                    {/* Her loop´er vi over alle "post´s" i threads array´et. */}
                    {thread.map( (post, index) => {

                        // Sætter vores style afhængig af om vi selv er Author.
                        let commentStyle = post.author !== author ? iStyles.fromServer : iStyles.fromClient

                        return <p key={index} className={commentStyle}><span>{post.author} skriver</span>{post.message}</p>

                    })}

                </div>
       
                <h2>Comment</h2>
                <form onSubmit={onHandleSubmit}>
                    <label>
                        Author
                        <input type="text" name="author" defaultValue={"Bruger 1"}></input>
                    </label>
                    <label>
                        Message
                        <input type="text" name="message" defaultValue={"Hej"}></input>
                    </label>  
                    
                    <button type="submit">Send Comment</button>
                </form>

            </div>
        </div>

    );
};
export default SocketExample;