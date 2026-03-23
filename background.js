/**
 * REAdobe Clean Teams — Background Service Worker (MV3)
 *
 * Receives 'openTabs' messages from the content script and opens
 * each Adobe profile URL in a new background tab.
 * chrome.tabs.create() is not blocked by the browser popup blocker,
 * unlike window.open() called from a content script.
 */

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === 'openTabs' && Array.isArray(msg.urls)) {
    msg.urls.forEach(url => {
      chrome.tabs.create({ url, active: false });
    });
    sendResponse({ ok: true, count: msg.urls.length });
  }
  return true; // Keep channel open for async sendResponse
});
