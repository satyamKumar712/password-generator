import { useState , useCallback, useEffect , useRef} from 'react'
//import heroImg from './assets/hero.png'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import './App.css'

//import './App.css'
function App() {
  const [length , setlength] = useState(8);
  const[numberAllow , setnumberAllow] = useState(false);
  const[charallowed , setcharallowed] = useState(false);
  const[password , setpassword] = useState("");
//useref hook used
const passwordRef = useRef(null)
  const passwordgenerator = useCallback( () => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
  if(numberAllow) str += "0123456789"
  if(charallowed) str += "!@#$%^&*()<{}[]||\?"
  for(let i = 1 ; i  <= length ; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setpassword(pass)

  }, [length , numberAllow , charallowed , setpassword]) 

  const copyPasswordToClipboard = useCallback( ()=>{
    passwordRef.current?.select()
     window.navigation.clipboard.WriteText(password)
  },[password])
 
  useEffect(() =>{
    passwordgenerator()
  } , [length , numberAllow , charallowed ,passwordgenerator])
  
  return (
   
  <div className = 'w-full max-w-md  mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
          <div className = 'flex shadow rounded-lg overflow-hidden mb-4'>
            <input
            type='text'
            value={password}
            className ='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref = {passwordRef}
            />
            <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'
            >copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1 '>
              <input
               type='range'
              name="" id="" 
               min ={6}
               max={100}
               value={length}
                 className='cursor-pointer' 
                 onChange={(e) =>{setlength(e.target.value)}}
              />
              <label>Length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
               type="checkbox"
               Checked={numberAllow}
               id="numberInput"
               onChange ={() => {
                setnumberAllow((prev) => !prev);
               }}
               />
               <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
               type="checkbox"
               Checked={charallowed}
               id="charInput"
               onChange ={() => {
                setcharallowed((prev) => !prev);
               }}
               />
               <label htmlFor="charInput">Characters</label>
            </div>
          </div>
    </div>
  );
}

export default App;
