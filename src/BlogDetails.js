import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";import BlogEditor from "./BlogEditor";

const BlogDetails = ({i}) => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/' +i+"/"+id);
  const history = useHistory();

  const handleClick = () => {
    fetch('http://localhost:8000/' +i+"/"+id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article className="create" style={{textAlign:"left"}}>
       
          <div><BlogEditor blog={blog} i={i}/></div>
          <br/>
          <button style={{background:"rgb(245, 103, 68)", color:"#fff",fontWeight:"bold"}} onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;
