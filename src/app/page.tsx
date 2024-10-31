import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // const handleClick =()=>{
    
  // }
  return (
   <div>
    <h1>next</h1>
    <Link href={'/home'}>go to home</Link>
    {/* <button onClick={handleClick}>Home</button> */}
   </div>
  );
}
