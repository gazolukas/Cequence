import React from 'react';
import { renderToString } from 'react-dom/server';
import CleanCSS from 'clean-css';
import { ThemeProvider, JssProvider, SheetsRegistry, createGenerateId } from 'react-jss';
import express from 'express';
import dotenv from 'dotenv';

import theme from '../client/theme';

import App from '../client/App';

const app = express();
dotenv.config();

const renderFullPage = (
  html: string,
  css: SheetsRegistry,
  title: string,
  keywords: string,
  description: string,
): string => {
  return `<!doctypehtml><html lang="sk-SK"><title>${title}</title><meta charset="utf-8"><meta content="ie=edge"httpequiv="x-ua-compatible"><meta content="width=device-width,initial-scale=1" name="viewport"><meta content="${description}"name="description"><meta content="${keywords}"name="keywords"><link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900"rel="stylesheet"><style type="text/css">${css}</style><div id="app">${html}</div><script src="bundle.js"></script>`;
};

// We are going to fill these out in the sections to follow
const handleRender = (
  // req: any,
  res: any,
  // name?: string
): void => {
  const cleanCss = new CleanCSS();
  const css = new SheetsRegistry();
  const generateId = createGenerateId();

  const title = 'Cequence';
  const keywords = 'Cequence Keywords';
  const description = 'Cequence Description';

  // Render the component to a string.
  const html = renderToString(
    <ThemeProvider theme={theme}>
      <JssProvider registry={css} generateId={generateId}>
        <App />
      </JssProvider>
    </ThemeProvider>,
  );

  // Grab the CSS from our sheets.
  const sheet = cleanCss.minify(String(css)).styles;

  // Send the rendered page back to the client.
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');

  // Send the rendered page back to the client
  res.send(renderFullPage(html, sheet, title, keywords, description));
};

// This is fired every time the server-side receives a request.
app.get('/', ({ res }: any) => {
  handleRender(res);
});

// Serve built files with static files middleware
app.use(express.static('public'));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express server is running on port:${port}`));
