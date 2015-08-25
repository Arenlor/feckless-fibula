var panels = require("sdk/panel");
var { ToggleButton } = require("sdk/ui/button/toggle");
var newPanel;
var origPanel;

var button = ToggleButton({
    id: "panelButton",
    label: "panelButton",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png" // data/icon-##.png in the addon.
    },
    onChange: showOrig
});

function createNewPanel() {
    newPanel = panels.Panel({
    width: 300,
    height: 400,
    contentURL: "./secondPanel.html" // data/secondPanel.html in the addon.
    });
}

function createOrigPanel() {
    origPanel = panels.Panel({
    width: 300,
    height: 400,
    contentURL: "./firstPanel.html", // data/firstPanel.html in the addon.
    contentScriptFile: "./firstPanel.js" // data/firstPanel.js in the addon.
    });
}

function showOrig(state) {
    if(state.checked) {
        createOrigPanel();
        origPanel.show({
            position: button
        });
        origPanel.port.on("switchPanel", function() {origPanel.hide();createNewPanel();newPanel.show({position: button});});
        origPanel.port.on("showNewTab", function() {origPanel.hide(); require("sdk/tabs").open("https://discourse.mozilla-community.org/t/button-that-opens-a-new-panel-and-another-button-that-opens-a-new-tab/3442");}); // The page you want to open
    }
    else {
        origPanel.destroy();
        newPanel.destroy();
    }
}