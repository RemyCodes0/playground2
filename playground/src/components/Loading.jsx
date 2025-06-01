import React from 'react'
import logo from '../assets/logo.svg'

const Loading = () => {
  return (
    <div style={styles.container}>
       <div style={styles.content}>
        <img style={styles.logo } src={logo} alt='logo'/>
        <p style={styles.playText}>PlayGround</p>
        <p style={styles.text}>It is an Amea Thing</p>
    </div>
    </div>
   
  )
}

const styles = {
  container:{
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#E5E5E5',
    margin: 0,
  },
  content:{
    textAlign: 'center',
  },
  logo:{
    with: 150,
    height: 150,
    marginBottom: '5px',
  },
  text:{
    fontSize: '18px',
    color: '#333',
    position: 'absolute',
    bottom: 0
  },
  playText:{
    fontSize: '15px',
    fontWeight: 'bold',
    marginTop: 0,
    paddingTop: 0,
  }
};

export default Loading