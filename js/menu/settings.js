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

            var theme = $("#theme").val()
            localStorage.theme = theme;
            cm.setOption("theme", theme);
        } else {
            alert("No web storage support.")
        }
    });
});