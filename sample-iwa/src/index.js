const extensionId = "gogonhoemckpdpadfnjnpgbjpbjnodgc";
const request = {
  type: 'telemetry',
  telemetry: {
    infoType: "cpu"
  }
}

document.getElementById('hello-btn').addEventListener('click', event => {
  window.chrome.runtime.sendMessage(
    extensionId,
    request,
    (response) => {
      alert(JSON.stringify(response));
    }
  );
});
