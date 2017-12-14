var cm;

$().ready(function () {
    var code = $("#code")[0];

    if (typeof(Storage) !== undefined) {
        // Set settings of its the first run
        if (localStorage.showLineNumbers === undefined) localStorage.showLineNumbers = true;
        if (localStorage.autoClose === undefined) localStorage.autoClose = true;
        if (localStorage.theme === undefined) localStorage.theme = "midnight";
        if (localStorage.autoUpdate === undefined) localStorage.autoUpdate = false;
        if (localStorage.fileValue === undefined) localStorage.fileValue = "<!doctype html>\n" +
            "<html>\n" +
            "<head>\n" +
            "    <title>Test</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "    <h1>Test</h1>\n" +
            "</body>\n" +
            "</html>";

        // Change the check boxes to reflect current settings
        $("#lineNumbers").prop("checked", localStorage.showLineNumbers === "true");
        $("#autoClose").prop("checked", localStorage.autoClose === "true");
        $("#autoClose").prop("checked", localStorage.autoUpdate === "true");
        $("#theme").val(localStorage.theme);

        cm = CodeMirror.fromTextArea(code, {
            mode: "htmlmixed",
            indentUnit: 4,
            lineNumbers: localStorage.showLineNumbers === "true", // Convert to boolean
            theme: localStorage.theme,
            showHint: true,
            autoCloseTags: localStorage.autoClose === "true",
            autoCloseBrackets: localStorage.autoClose === "true",
            foldGutter: true,
            styleActiveLine: true,
            scrollbarStyle: "overlay",
            matchBrackets: true,
            matchTags: true,
            fixedGutter: true,
            lineWiseCopyCut: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            extraKeys: {
                "Ctrl-Space": "autocomplete",
                "Ctrl-Slash": "toggleComment"
            }
        });
        cm.setValue(localStorage.fileValue);
    } else {
        // No Storage means no settings for now, unfortunately
        cm = CodeMirror.fromTextArea(code, {
            mode: "htmlmixed",
            indentUnit: 4,
            lineNumbers: true,
            theme: "midnight",
            showHint: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            foldGutter: true,
            styleActiveLine: true,
            scrollbarStyle: "overlay",
            matchBrackets: true,
            matchTags: true,
            fixedGutter: true,
            lineWiseCopyCut: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            extraKeys: {
                "Ctrl-Space": "autocomplete",
                "Ctrl-Slash": "toggleComment"
            }
        });
    }

    cm.setSize("100%", "100%");
    setTimeout(function () {
        window.frames["result"].contentDocument.documentElement.innerHTML = cm.getValue();
    }, 500);

    cm.on("change", function (cm) {
        if (typeof(Storage) !== "undefined" && localStorage.autoUpdate === "true") {
            $("#result").contents().find("body").html(cm.getValue());
        }
    });

    // From https://stackoverflow.com/questions/13744176/codemirror-autocomplete-after-any-keyup
    // Made by Tobias Punke
    const ExcludedIntelliSenseTriggerKeys = {
        "8": "backspace",
        "9": "tab",
        "13": "enter",
        "16": "shift",
        "17": "ctrl",
        "18": "alt",
        "19": "pause",
        "20": "capslock",
        "27": "escape",
        "33": "pageup",
        "34": "pagedown",
        "35": "end",
        "36": "home",
        "37": "left",
        "38": "up",
        "39": "right",
        "40": "down",
        "45": "insert",
        "46": "delete",
        "91": "left window key",
        "92": "right window key",
        "93": "select",
        "107": "add",
        "109": "subtract",
        "110": "decimal point",
        "111": "divide",
        "112": "f1",
        "113": "f2",
        "114": "f3",
        "115": "f4",
        "116": "f5",
        "117": "f6",
        "118": "f7",
        "119": "f8",
        "120": "f9",
        "121": "f10",
        "122": "f11",
        "123": "f12",
        "144": "numlock",
        "145": "scrolllock",
        "186": "semicolon",
        "187": "equalsign",
        "188": "comma",
        "189": "dash",
        "190": "period",
        "191": "slash",
        "192": "graveaccent",
        "220": "backslash",
        "222": "quote"
    };

    cm.on("keydown", function (cm, e) {
        var __Cursor = cm.getDoc().getCursor();
        var __Token = cm.getTokenAt(__Cursor);

        if (!cm.state.completionActive &&
            !ExcludedIntelliSenseTriggerKeys[(e.keyCode || e.which).toString()] &&
            (__Token.type === "tag" || __Token.string === " " || __Token.string === "<" || __Token.string === "/"))
        {
            CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
        }

        if (e.ctrlKey && e.keyCode === 191) {
            e.preventDefault();
            const range = {
                from: cm.getCursor('from'),
                to: cm.getCursor('to')
            };

            cm.toggleComment(range.form, range.to);
        }
    });
    $("#update").on("click", function () {
        $("#result").contents().find("body").html(cm.getValue());
    });
});
