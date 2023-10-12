import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState,useCallback,useEffect,useRef} from 'react'
function App() {
  const [length,setlength]=useState(8);
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [Password,setPassword]=useState();

  //useref hook
  const passwordRef=useRef(null)

  //const passwordGenerator=useCallback(fn,[dependancy])
  const passwordGenerator=useCallback(()=>
  {
    let passw="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed)
    {
      str=str+"0123456789";
    }
    if(charAllowed)
    {
      str=str+"!@#$%^&*";
    }

    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random() * str.length+1);
      passw+=str.charAt(char)
    }
    setPassword(passw)
  },[length,numAllowed,charAllowed,setPassword])

  const copypassword=useCallback(()=>
  {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,10);//select range for copy 
    window.navigator.clipboard.writeText(Password);
  },[Password])
  useEffect(()=>{
    passwordGenerator();
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <h1 className='text-center mt-5 bg-danger'>Password Generator</h1>
    <div class="input-group">
  <input type="text"ref={passwordRef} value={Password} class="form-control" placeholder="Password" aria-label="Recipient's username" aria-describedby="button-addon2" readOnly/>
  <button class="btn btn-outline-secondary bg-primary" onClick={copypassword} type="button" id="button-addon2">copy</button>
</div>


<input type="range" class="form-range text-center" id="customRange1" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}></input>
<label for="customRange1" class="form-label bg-danger text-center" >Length:{length}</label>
<div class="mb-3 form-check">
    <input type="checkbox" defaultChecked={numAllowed} class="form-check-input " id="exampleCheck1" onChange={()=>{setNumAllowed((prev)=>!prev)}}/>
    <label class="form-check-label bg-danger">Numbers</label>
</div>
<div class="mb-3 form-check">
    <input type="checkbox" defaultChecked={charAllowed} class="form-check-input " id="exampleCheck1" onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
    <label class="form-check-label bg-danger">Character</label>
</div>
    </>
  );
}

export default App;
