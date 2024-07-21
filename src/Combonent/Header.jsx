import logo from "../assets/headerlogo.png";
import headimg from "../assets/headerimg.jpg"
export default function Header() {
  return (
    <div className="pheader h-fit " >
      <img className="header h-20 " src={headimg}/>
      <img className="headlogo h-20 " src={logo} />
    </div>
  );
}
