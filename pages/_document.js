/*
  LICENSE: MIT
  Created by: Lightnet
*/

// pages/_document.js

// https://stackoverflow.com/questions/51905803/next-js-how-to-change-css-of-root-div-next-on-specific-page

import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script'

class MyDocument extends Document {
  
  static async getInitialProps(ctx) {
    //console.log("[[[[=== INIT DOC ===]]]]");
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="custom" content="test" />
          <script id="test">
            {
              console.log("test console _doc")
            }
          </script>

          <script id="nextjshead"
            dangerouslySetInnerHTML={{__html:`
              //console.log("testing...");
              //window.addEventListener('load', (event) => {
                //console.log("page is fully loaded");
              //});
            `}}
            />
          <style>{`
            /* Other global styles such as 'html, body' etc... */
            /*
            #__next {
              height: 100%;
              width: 100%;
              margin: 0;
              padding: 0;
              position:fixed;
              top: 0;
              right: 0;
            }
            */
          `}
          </style>
          
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script id="nextjs test"
            onLoad={() => {
              // this executes after the script is loaded
              console.log("hello doc!");
            }}
            />
        </body>
      </Html>
    )
  }
}

export default MyDocument
//page render handle doc