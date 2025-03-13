import { extendTheme } from '@chakra-ui/react';
import '@fontsource/nunito';
import "@fontsource/nunito/800.css";
import '@fontsource/montserrat';
import "@fontsource/montserrat/600.css"; // Semi-bold
import "@fontsource/montserrat/700.css"; // Bold


const theme = extendTheme({
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Nunito, sans-serif',
  },
});

export default theme;
