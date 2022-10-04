import React, { useState } from "react";
import { Icon, HStack } from "@chakra-ui/react";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate();

    return (
        <>
            <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
            >
                <Icon
                    as={HiOutlineLightningBolt}
                    title="Home"
                    onClick={() => {
                        navigate("/");
                    }}
                    _hover={{
                        cursor: "pointer",
                    }}
                    w={8} h={8}
                />
            </HStack>
        </>
    );
}
