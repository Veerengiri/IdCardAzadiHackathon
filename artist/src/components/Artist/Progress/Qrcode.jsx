import React,{useState} from 'react'
import QRCode from 'react-qr-code';
function Qrcode(props) {
    const {value,size}=props;
    const value2 = `Text: ${value}`
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    {/* <Qrcode value ="63ce0a3d95b9ca350ae5e49b" size={256}/> */}
  return (
    <div style={{padding:"5px",background:'white',width:`${size+10}px`}}>
        <QRCode
            title="icard"
            value={value2}
            bgColor={back}
            fgColor={fore}
            size={size === '' ? 0 : size}
          />
    </div>
  )
}

export default Qrcode