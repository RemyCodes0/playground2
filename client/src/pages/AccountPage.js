import React from 'react'
import vector from '../assets/Vector.svg'
import vector1 from '../assets/Vector (1).svg'
import vector2 from '../assets/Vector (2).svg'
import vector3 from '../assets/Vector (3).svg'
import vector4 from '../assets/Vector (4).svg'
import vector5 from '../assets/Vector (5).svg'
import vector6 from '../assets/Vector (6).svg'
import vector7 from '../assets/Vector (7).svg'
import vector8 from '../assets/Vector (8).svg'

const AccountPage = () => {
  return (
    <div>
      <div style={styles.container}>
          <img src={vector} alt='' style={{...styles.image}}/>
        <img src={vector1} alt='' style={{...styles.image, marginTop: '-1px', marginLeft: '-134.5px',}}/>
        <img src={vector2} alt='' style={{...styles.image, marginLeft:"-203px", marginTop:'-1px'}} />
        <img src={vector3} alt='' style={{...styles.image, marginTop: '-56px', marginLeft: '0.5px'}}/>
        <img src={vector4} alt='' style={{...styles.image, marginTop: '-89px', marginLeft: '-102px'}}/>
        <img src={vector5} alt='' style={{...styles.image, marginTop: '-56px', marginLeft: '-237px'}}/>
        <img src={vector6} alt='' style={{...styles.image, marginTop: '-90px'}}/>
        <img src={vector7} alt='' style={{...styles.image, marginTop: '-57px', marginLeft: '-136px'}}/>
        <img src={vector8} alt='' style={{...styles.image, marginTop: '-90px', marginLeft: '-203px'}}/>
        
      </div>
    </div>
  )
}

export default AccountPage

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',  
    gridTemplateRows: 'repeat(3, auto)',   
    gap: '0px',
    width: '100%',
    maxWidth: '600px',
    margin: '100px auto',
  },
  image:{
    padding: '10px',
    boxSizing: "border-box",

  }
}