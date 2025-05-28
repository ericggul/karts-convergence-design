import { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        <motion.div
          className={theme.typography.monoVariable}
          key={router.asPath}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
