# todoist-for-gmail-firefox
Reverse-engineering the chrome extension to work in firefox

Works:
- Embedded frame in the Gmail window

Doesn't:
- "Add to Todoist" button is missing: requests to `https://www.inboxsdk.com/build/platform-implementation.js` are being blocked by CORS (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSOriginHeaderNotAdded)

## Resources
- Loading temporary extensions: https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/
- Downloading CRX files: https://chrome.google.com/webstore/detail/crx-extractordownloader/ajkhmmldknmfjnmeedkbkkojgobmljda
