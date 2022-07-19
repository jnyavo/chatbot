
import './App.css';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';
import { async } from '@firebase/util';


firebase.initializeApp({
  apiKey: "AIzaSyAtUS3hT_mqnHB9Bik-dKXQRGGB40iLKF0",
  authDomain: "diabot-41979.firebaseapp.com",
  projectId: "diabot-41979",
  storageBucket: "diabot-41979.appspot.com",
  messagingSenderId: "146289414915",
  appId: "1:146289414915:web:6749aa4316eb4472a40f36",
  measurementId: "G-05RB1HRP5C"
})

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
       
      </header>

      <section>
        {user ? <ChatRoom />  : <SignIn />}
      </section>
    </div>
  );

  function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
      return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )
  }

  function SignOut()
  {
    return auth.currentUser && (
      <button onClick={()=>{auth.SignOut()}}>Sign Out</button>
    )
  }

  function ChatRoom() {

    const dummy = useRef();

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField:'id'})

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
      e.preventDefault();

      const {uid,photoURL} = auth.currentUser;

      await messagesRef.add({
        text:formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })

    setFormValue('');

      dummy.current.scrollIntoView({ behavior:'smooth'});

    }

    return(
      <>
        <main>
          {messages && messages.map(msg=> <ChatMessage key={msg.id} message={msg} />)}
          <div ref={dummy}></div>
        </main>

        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button type="submit">🕊</button>
        </form>
      </>
    )

    function ChatMessage(props)
    {
      const {text,uid, photoURL} = props.message;

      const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

      return (
        <div className={`message ${messageClass}`}>
          <img src={photoURL} alt="test"/>
          <p>{text}</p>
        </div>
      )
    }

  }


}

export default App;
