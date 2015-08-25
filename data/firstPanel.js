document.getElementsByName("button")[0].addEventListener("click",newPanel);
document.getElementsByName("button")[1].addEventListener("click",openTab);
// Assuming your first button is for the new panel, and second is for opening a new tab
// You can use any getElement such as getElementById if you have it setup.

function newPanel() {
    self.port.emit("switchPanel", "");
}

function openTab() {
    self.port.emit("showNewTab", "");
}