import { useState } from "react";
import { useHistory } from "react-router-dom";

const Add = ({inx}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [keywords, setKeywords] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, keywords };

    fetch('http://localhost:8000/'+inx, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
    
      // history.go(-1);
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Topic</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input 
          type="text" placeholder="Enter a Title for your Blog" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Keywords:</label>
        <textarea
          required
          value={keywords} placeholder="Enter Keywords seperated by comas (' , ')" 
          onChange={(e) => {const keys=e.target.value.split(',');setKeywords(keys);}}
        ></textarea>
        <button className="blog-details" style={{background:"rgb(245, 103, 68)", color:"#fff",fontWeight:"bold",border:"0",
  padding: "8px",borderRadius:"8px"}}>Add Blog</button>
      </form>
    </div>
  );
}
 
export default Add;
