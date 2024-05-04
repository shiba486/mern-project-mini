import { useState,useRef,useEffect } from 'react'
import logo from './assets/logo.webp'
import './App.css'
import { FileUpload } from './service/apiCalling'

function App() {
  const fileUploadRef = useRef()
  const [file, setFile] = useState("")
  const [downloadLink, setDownloadLink] = useState("")
  // console.log(file)

  const clickUploadBtn = ()=>{
    fileUploadRef.current.click()
  }
  useEffect(()=>{
    ;(async()=>{
      if(file){
        const data = new FormData()
        data.append("name",file.name)
        data.append("file",file)
       const res = await FileUpload(data)
       setDownloadLink(res.path)
      }
    })()
  },[file])
  return (
    <>
      <div className='container'>
        
          <img src={logo} alt="banner-logo"  />
      
        <div className='upload-side'>
          <h1>Simple File Sharing</h1>
          <p>upload and Share the download link</p>
          <button onClick={()=>clickUploadBtn()}>upload</button>
          <input type="file"
          ref={fileUploadRef}
          onChange={(e)=>setFile(e.target.files[0])}
          style={{display: "none"}}
          />

          <a href={downloadLink} target='_blank'>{downloadLink}</a>
        </div>
      </div>
    </>
  )
}

export default App
