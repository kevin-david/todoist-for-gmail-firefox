# todoist-for-gmail-firefox
Reverse-engineering the chrome extension to work in firefox

Works:
- Embedded frame in the Gmail window

Doesn't:
- "Add to Todoist" button is missing: requests to `https://www.inboxsdk.com/build/platform-implementation.js` are being blocked by CORS (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSOriginHeaderNotAdded)
  - Potential area of the fix: https://github.com/kevin-david/todoist-for-gmail-firefox/blob/c1548a5cc288fc37d35caa4d715bb5e18360ae41/inboxsdk.js#L905

## Resources
- Loading temporary extensions: https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/
- Downloading CRX files: https://chrome.google.com/webstore/detail/crx-extractordownloader/ajkhmmldknmfjnmeedkbkkojgobmljda
