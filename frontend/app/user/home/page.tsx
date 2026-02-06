import Image from "next/image"
import Logo from "@/public/logo/Logo.png"

// const Images = {
//   Logo : require("../public/Logo.jpg")
// }

export default function HomePage() {
  return (
    <div>
      
    {/* Navbar Start */}

    <div>
      <Image src={Logo} alt="logo" />
      <p>|</p>
      <p>Home</p>
      <p>Menu</p>
      <p>About</p>
    </div>

    {/* Navbar End */}

    </div>
    )
}