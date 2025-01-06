'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import { useState } from 'react';
import getGreetings from '@/api/greetings';

function Home() {
  const { user } = useAuth();

  const [greeting, setGreeting] = useState('');

  const [buttonText, setButtonText] = useState('Get a Greeting');

  const handleClick = () => {
    if (buttonText === 'Get a Greeting' || buttonText === 'Show me another greeting') {
      getGreetings().then((data) => {
        setGreeting(data);

        setButtonText('Show me another Greeting');
      });
    }
  };

  const handleClear = () => {
    setButtonText('Get a Greeting');
  };

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {/* This is where the greeting text is diplayed one a user clicks the get a joke button */}
        <div>{greeting}</div>
        <Button style={{ marginTop: '15px' }} onClick={handleClick}>
          {buttonText}
        </Button>
        <Button style={{ marginTop: '15px' }} onClick={handleClear}>
          clear
        </Button>
      </div>

      <div>
        <h1>Hello {user.displayName}! </h1>
        <p>Click the button below to logout!</p>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default Home;
