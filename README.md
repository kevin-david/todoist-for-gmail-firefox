# todoist-for-gmail-firefox
Reverse-engineering [the chrome extension](https://chrome.google.com/webstore/detail/todoist-for-gmail/clgenfnodoocmhnlnpknojdbjjnmecff), not to be confused with the GApps App to work in Firefox in addition to Chrome.

Unfortinuately, I'm not sure how possible this is to get _completely working_. https://github.com/InboxSDK/InboxSDK, which this extension uses, doesn't appear to support Firefox out of the box.

Support would probably have to be added there.

Works:
- Embedded frame in the Gmail window

Doesn't:
- "Add to Todoist" button is missing, InboxSDK isn't loading for some reason (seach TODO in InboxSDK)

## Resources
- Loading temporary extensions: https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/
- Downloading CRX files: https://chrome.google.com/webstore/detail/crx-extractordownloader/ajkhmmldknmfjnmeedkbkkojgobmljda
