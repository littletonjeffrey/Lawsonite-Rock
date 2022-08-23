import MenuItem from "./menu-items/sidebar-menu-item";
import { AiOutlineHome } from "react-icons/ai";
import { SiSparkpost } from "react-icons/si";

export default function Sidebar() {
  return (
    <aside className=" min-h-screen relative top-14 left-4 bottom-0 grid grid-col-1 gap-4 min-w-min">
      <div className="">
        <a href="/">
          <img
            src="/icons/icon.svg"
            alt="Site Icon"
            className="hover:scale-90 h-24 w-24"
          ></img>
        </a>
      </div>
      <div className="mb-2.5 absolute top-44">
        <MenuItem text="Home" Icon={AiOutlineHome} src="/" />
        <MenuItem text="Explore" Icon={SiSparkpost} src="/" />
      </div>
    </aside>
  );
}
