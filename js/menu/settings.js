$().ready(function () {
    $("#undo").on("click", function () {
        cm.getDoc().undo();
    });
    $("#redo").on("click", function () {
        cm.getDoc().redo();
    });
    $("#saveSettings").on("click", function () {
        if (typeof(Storage) !== "undefined") {
            var showLineNumbers = document.querySelector("#lineNumbers").checked;
            localStorage.showLineNumbers = showLineNumbers;
            cm.setOption("lineNumbers", showLineNumbers);

            var autoClose = document.querySelector("#autoClose").checked;
            localStorage.autoClose = autoClose;
            cm.setOption("autoCloseTags", autoClose);
            cm.setOption("autoCloseBrackets", autoClose);
        } else {
            alert("No web storage support.")
        }
    });
});