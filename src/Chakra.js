// from https://chakra-ui.com/docs/features/color-mode#add-colormodemanager-optional-for-ssr
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import theme from "./theme";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    yellow: {
      300: "#fad000",
    },
  },
};

export function Chakra({ cookies, children }) {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider theme={customTheme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

export function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}
