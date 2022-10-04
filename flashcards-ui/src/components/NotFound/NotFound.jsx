import * as React from "react";
import { Center, Box, VStack, useTheme, Image } from "@chakra-ui/react";

export default function NotFound() {
    return (
        <div className="NotFound">
            <Center mt="100px">
              <VStack>
                <Image
                    src="https://media.giphy.com/media/uLy4Bo680hZxm/giphy.gif"
                    width="480"
                    height="360"
                ></Image>
                <p>
                    <a href="https://giphy.com/gifs/crickets-uLy4Bo680hZxm">
                        via GIPHY
                    </a>
                </p>

              </VStack>
            </Center>
        </div>
    );
}
