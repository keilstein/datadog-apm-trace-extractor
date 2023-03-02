var results = [...document.querySelectorAll('.drillthrough-frame tr')].map(p => p.innerText);

if (results.length > 1) {
  var headers = [...new Set(results[0].split(/[\t|\n]/).filter(p => p))];
  var rows = results.slice(1).map(row => row.slice(1).replaceAll(/\n/g, '').replaceAll(/\t/g, ',').replaceAll(/\s/g, ' '));

  chrome.runtime.sendMessage({
    method: 'fetchTraces',
    traces: headers + "\n" + rows.reduce((p, q) => p + "\n" + q)
  });
}