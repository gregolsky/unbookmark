
__bookmarkKeyboardShortcut = null;

var setupKeyboardShortcutHandler = function(arg){
    if (arg.bookmarked){
        return function () {
            chrome.extension.sendRequest({command:'removeBookmark', tab: arg.tab}, function(response) {});
            return false;
        }
    }
    else
    {
        return function () {
          return true;
        }
    }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

    if (__bookmarkKeyboardShortcut != null)
    {
        $(document).unbind('keydown', __bookmarkKeyboardShortcut);
    }

    if (request.command == "bindKey"){
        __bookmarkKeyboardShortcut = setupKeyboardShortcutHandler(request.arg);
         $(document).bind('keydown', 'ctrl+d', __bookmarkKeyboardShortcut);
    }

    sendResponse({});
});
