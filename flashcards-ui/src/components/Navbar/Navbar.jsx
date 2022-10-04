import React from "react";
import {
    Box,
    HStack,
    useColorModeValue,
    Spacer,
    useTheme,
} from "@chakra-ui/react";
import Logo from "../Logo/Logo.jsx";
import NavLinks from "../NavLinks/NavLinks.jsx";
import Searchbar from "../Searchbar/Searchbar.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";
import { useAuthContext } from "../../../contexts/auth.jsx";

function Navbar() {
    const { isLoggedIn, isLoading } = useAuthContext();

    return (
        <Box
            as="nav"
            bg={useTheme().colors.brand.green}
            boxShadow={useColorModeValue("2xl", "sm-dark")}
            pt={2}
            pb={2}
            position="sticky"
            top="0"
            zIndex={"99"}
        >
            <HStack spacing={20} alignItems={"center"} pl={50}>
                {/* App Logo */}
                <Logo />
                {/* Login/Register & My Sets/Create links */}
                {isLoading ? <></> :<NavLinks isLoggedIn={isLoggedIn} />}

                {/* Chakra UI Space component*/}
                <Spacer />
                {/* Searchbar*/}
                <Searchbar />
                {/* User Profile */}
                {isLoggedIn ? <UserProfile /> : null}
            </HStack>
        </Box>
    );

    // return (
    //     <nav className="Navbar">
    //         <div className="links">
    //             <Link to="/" className="logo">
    //                 <img
    //                     src="https://via.placeholder.com/64"
    //                     alt="website logo"
    //                     className="logo"
    //                 />
    //             </Link>
    //             <NavLinks />
    //         </div>
    //         <Searchbar />
    //         <div className="user-profile-img">
    //             <img
    //                 src="https://via.placeholder.com/600x600"
    //                 alt="profile image"
    //                 className={
    //                     user.email ? "profile-image" : "profile-image hidden"
    //                 }
    //                 onClick={() => {
    //                     setIsProfileOpen(!isProfileOpen);
    //                 }}
    //             />
    //         </div>
    //         <div className="user-modal">
    //             {isProfileOpen ? <UserProfile /> : null}
    //         </div>
    //     </nav>
    // );
}

export default Navbar;
