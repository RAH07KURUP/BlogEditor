import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { useRef, useMemo } from "react";

const BlogEditor = ({blog,i}) => {
  const editor = useRef(null);//for joditEditor


  const [selectedTone, setSelectedTone] = useState('neutral');
  const [flg, setflg] = useState(0);
  const history = useHistory();const title=blog.title,keywords=blog.keywords;

  const [content, setContent] = useState(blog.body);
  const [lsbody, setls] = useState("");

  const [edit, setedit] = useState(0);
  


  const handleToneChange = (event) => {
    setSelectedTone(event.target.value);
  };

  const handleGenerate = () => {
    // Logic to generate blog post based on selected tone
    setflg(1);
    console.log(`Generating blog with tone: ${selectedTone}`);
  };

  const handleCancel = ()=> {
    setContent(lsbody);
    setedit(0);
    };
  
    const handleEdit = ()=> {
      setls(content);
      setedit(1);
      };
 

  const handleSave = () => {setedit(1);
    fetch('http://localhost:8000/' +i+"/"+blog.id, {
      method: 'DELETE'
    }).then(() => {
        const blog = { title, body:content, keywords };
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
      {flg==0 && <button style={{background:"rgb(245, 103, 68)",maxWidth:"80px",color:"#fff",fontWeight:"bold"}} onClick={handleGenerate}>Generate</button>}
      <br/>
      {flg==1 && <h2 style={{fontFamily:"Arial",fontWeight:"bold",fontStyle:"italic",fontSize:"40px",color:"blue",textDecoration:"underline"}}>{ blog.title }</h2>}
      {flg==1 && <div className={selectedTone}>{HTMLReactParser(content)}</div>}
      {flg==1 && edit==0 && <button style={{background:"rgb(245, 103, 68)",maxWidth:"80px", color:"#fff",fontWeight:"bold"}}  onClick={handleEdit}>Edit</button>}
      {flg==1 && edit==1 && <JoditEditor editclassName={selectedTone}
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />}
      <br/>
      <div style={{display:"flex"}}>
      {flg==1 && edit==1 && <button style={{background:"rgb(245, 103, 68)",maxWidth:"80px",color:"#fff",fontWeight:"bold"}}  onClick={handleCancel}>Cancel</button>}
      
      {flg==1 && edit==1 && <button style={{background:"rgb(245, 103, 68)",marginLeft:"7px",display:"inline",maxWidth:"80px", color:"#fff",fontWeight:"bold"}}  onClick={handleSave}>Save</button>}
      </div>
    </div>
  );
};

export default BlogEditor;
