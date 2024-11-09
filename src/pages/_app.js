import { AppProps } from 'next/app';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    // Initialize Styletron only on the client-side
    const styletronEngine = new Styletron();
    setEngine(styletronEngine);
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!engine) {
    // Render nothing or a loading spinner until the engine is initialized
    return null;
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
