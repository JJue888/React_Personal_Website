import {NavLink} from "react-router";
import {useEffect, useState} from "react";
import { FaBars, FaTimes} from 'react-icons/fa';

const navLinks = [
    {title: "Home", href: "/"},
    {title: "About", href: "/about"},
    {title: "Projects", href: "/projects"},
    {title: "Experiences", href: "/experiences"},
    {title: "Contact", href: "/contact"},
]

const bgColor = 'bg-gray-800';
const modalColor = 'bg-gray-900';

const NavBar = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth <= 769;
        }
        return false;
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 769);
        }

        if (typeof window !== 'undefined') {
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    const toggleModal = () => {
        setIsMobile(!isMobile);
    }

    const handleBarsIconClick = () => {
        toggleModal();
    }

    return (
        <header>
            {!isMobile ? (
                // Laptop Navbar Code Here
                <nav className={`relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10`}>
                    <div className="flex justify-between mx-auto items-center py-4 px-24">
                        <ul className="flex gap-8 md:gap-16 items-center justify-center text-center cursor-pointer">
                            {navLinks.map((link, index) => (
                                <NavLink  to={link.href} key={index} className="text-white text-sm">{link.title}</NavLink>
                            ))}
                        </ul>
                        <ul className="flex text-white gap-6 items-center cursor-pointer">
                        </ul>
                    </div>
                </nav>
            ) : (
                // Mobile Navbar Code Here
                <nav className={`relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 py-4 px-4`}>
                    <div className="mx-auto flex justify-between items-center ">
                        <div className="flex justify-end items-center gap-6 text-white cursor-pointer">
                            <FaBars onClick={handleBarsIconClick} className="text-white cursor-pointer" />
                        </div>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 flex justify-center items-center">
                            <div className={`absolute inset-0 ${modalColor}`} />
                            <FaTimes
                                className="absolute top-6 right-4 text-white cursor-pointer"
                                onClick={toggleModal}
                                style={{ fontSize: '16px' }}
                            />
                            <div className="relative bg-gray-900 w-full">
                                <div className="flex flex-col gap-8 items-center justify-center h-full">
                                    {navLinks.map((link, index) => (
                                        <NavLink to={link.href} key={index} className="text-white font-light text-2xl cursor-pointer">{link.title}</NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            )}
        </header>
    );
}



// function NavBar() {
//     return (
//         <header>
//             <nav className="relative bg-gray-800">
//                 <ul>
//                     <li>
//                         <NavLink to="/">Home</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/about">About</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/projects">Projects</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/experiences">Experiences</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/contact">Contact</NavLink>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//     )
// }

export default NavBar;