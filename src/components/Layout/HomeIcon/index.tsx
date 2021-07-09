import { BsFillHouseFill } from "react-icons/bs";
import { ReactElement } from "~types";

// here we simply use className="mr-2" to set Bootstrap styling
const HomeIcon = (): ReactElement => (
  <span data-testid="home-icon" className="mr-2">
    <BsFillHouseFill />
  </span>
);

export default HomeIcon;
