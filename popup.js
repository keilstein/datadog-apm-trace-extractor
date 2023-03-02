const getTabId = async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  return tab.id;
}

const fetchTraces = async () => {
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.method === "fetchTraces") {
      document.getElementById('traces').value = message.traces;
    }
  });

  const tabId = await getTabId();

  console.debug("Fetching traces");
  chrome.scripting.executeScript({
    target: {tabId: tabId, allFrames: false},
    files: ['content.js']
  }).then(() => console.debug("Fetching traces => DONE"));
};

window.onload = fetchTraces;