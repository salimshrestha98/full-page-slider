import { ChakraProvider } from "@chakra-ui/react";

const withChakraProvider = ( Component ) => ( props ) => (
	<ChakraProvider>
		<Component />
	</ChakraProvider>
)

export default withChakraProvider;