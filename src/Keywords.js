const Keywords = ({i,ele}) => {let cls;
  switch((i%3))
  {case(0): cls="key1";break;
  case(1): cls="key2";break;
  case(2): cls="key3";break;
  }
      return (
          <div className={cls} style={{display:"inline" }}>{ele}</div>
      );
}
     
    export default Keywords;
