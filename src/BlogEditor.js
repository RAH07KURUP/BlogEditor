import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const BlogEditor = ({blog,i}) => {
  const [text, setText] = useState(blog.body);
  const [selectedTone, setSelectedTone] = useState('neutral');
  const [flg, setflg] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const history = useHistory();const title=blog.title,keywords=blog.keywords;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleToneChange = (event) => {
    setSelectedTone(event.target.value);
  };

  const handleGenerate = () => {
    // Logic to generate blog post based on selected tone
    setflg(1);
    console.log(`Generating blog with tone: ${selectedTone}`);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setImageSrc(event.target.result);
      console.log(imageSrc);
    };
    // You can upload the file to a server or use it directly
    // For now, let's just display the file name in the text area
  };

 

  const handleSave = () => {
    fetch('http://localhost:8000/' +i+"/"+blog.id, {
      method: 'DELETE'
    }).then(() => {
        const blog = { title, body:text, keywords };
        fetch('http://localhost:8000/'+i, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
          }).then(()=>console.log('Saved blog post...'))
      }).then(() => {
      history.push('/');
    }) 
    // Logic to save blog post

  };

  return (
    
    <div style={{display:"flex", flexDirection:"column"}}>
      {flg==0 && <div style={{marginLeft:"70px"}}>Select a Tone for your Blog</div>}
      {flg==0 && <select value={selectedTone} onChange={handleToneChange} style={{fontWeight:"bold"}}>
        <option value="formal">Formal</option>
        <option value="casual">Casual</option>
        <option value="friendly">Friendly</option>
        <option value="neutral">Neutral</option>
      </select>}
      {flg==0 && <button style={{display:"inline"}} onClick={handleGenerate}>Generate</button>}
      <br/>
      {flg==1 && <h2>{ blog.title }</h2>}
      {flg==1 && <textarea className={selectedTone} contenteditable="true" style={{border:"none",height:"400px",width:"700px"}}
        value={text}
        onChange={handleChange}
        rows={10}
        cols={50}
      />}
      <br/>
      {imageSrc!=null && <img src={imageSrc} style={{marginLeft:"125px"}} alt="Blog-Image"/>}
      {flg==1 && <input type="file" accept="image/*" onChange={handleImageUpload}/>}
      
      {flg==1 && <button onClick={handleSave}>Save</button>}
    </div>
  );
};

export default BlogEditor;
