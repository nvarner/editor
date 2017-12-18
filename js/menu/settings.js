$().ready(function () {
    $("#undo").on("click", function () {
        cm.getDoc().undo();
    });
    $("#redo").on("click", function () {
        cm.getDoc().redo();
    });
    $("#saveSettings").on("click", function () {
        if (typeof(Storage) !== "undefined") {
            var showLineNumbers = $("#lineNumbers").is(":checked");
            localStorage.showLineNumbers = showLineNumbers;
            cm.setOption("lineNumbers", showLineNumbers);

            var autoClose = $("#autoClose").is(":checked");
            localStorage.autoClose = autoClose;
            cm.setOption("autoCloseTags", autoClose);
            cm.setOption("autoCloseBrackets", autoClose);

            var autoUpdate = $("#autoUpdate").is(":checked");
            localStorage.autoUpdate = autoUpdate;

            var theme = $("#theme").val();
            localStorage.theme = theme;
            cm.setOption("theme", theme);
        } else {
            alert("No web storage support.")
        }
    });
    $("#save").on("click", function () {
        browserSave(cm.getValue("\n"));
    });
    $(window).on("keydown", function(e) {
        if (e.keyCode === 83 && e.ctrlKey && !e.shiftKey) {
            browserSave(cm.getValue("\n"));
            e.preventDefault();
            return false;
        } else if (e.keyCode === 68 && e.ctrlKey && e.shiftKey) {
            diskSave(cm.getValue("\n"), "index.html", "text/html;charset=utf-8");
        }

        return true;
    });
    $("#saveToDisk").on("click", function () {
        diskSave(cm.getValue("\n"), "index.html", "text/html;charset=utf-8");
    });
});

function browserSave (value) {
    if (typeof(Storage) !== "undefined") {
        localStorage.fileValue = value;
    }
}
function diskSave (value, filename, filetype) {
    var blob = new Blob([value], {
        "type": filetype
    });
    saveAs(blob, filename);
}
