top.TDOpts = {
    zIndex: 8,
    gmail_holder_left_pos: null,

    delayed_loading: true,
    collapsed: true,

    customPostion: function(holder) {
        var g_left_pos = top.TDOpts.gmail_holder_left_pos
        if (g_left_pos) {
            holder.style.left = g_left_pos - holder.offsetWidth - 5 + "px"
        }
    },

    listen: function(evnt, elem, func) {
        if (elem.addEventListener) {
            elem.addEventListener(evnt, func, false)
        } else if (elem.attachEvent) {
            // IE DOM
            var r = elem.attachEvent("on" + evnt, func)
            return r
        }
    }
}
;(function() {
    function checkGmailHolder() {
        if (top.location.pathname.indexOf("/mail/") == -1 || window != top)
            return

        // Check left pos of gmail holders (bottom right)
        var elms = document.querySelectorAll("div.no")
        for (var i = 0; i < elms.length; i++) {
            var elm = elms[i]
            var css_text = (elm && elm.style.cssText) || ""
            if (
                elm &&
                (css_text.indexOf("float: right") != -1 ||
                    elm.style.float == "right")
            ) {
                var left = null
                if (elm.offsetWidth > 50) {
                    left = elm.offsetLeft
                }
                if (top.TDOpts.gmail_holder_left_pos != left) {
                    top.TDOpts.gmail_holder_left_pos = left
                    top.TDOpts.placeWindow()
                }
            }
        }
    }

    setInterval(checkGmailHolder, 300)

    InboxSDK.load(2, "sdk_todoistGmail_bb5f2257e5").then(function(sdk) {
        sdk.Toolbars.registerThreadButton({
            title: "Add to Todoist",
            positions: ["THREAD"],
            iconUrl:
                "https://d3ptyyxy2at9ui.cloudfront.net/gmail-plugin-todoist-icon-v4.svg",
            onClick: function() {
                top.TDOpts.addAsTask(sdk)
            }
        })

        sdk.Conversations.registerMessageViewHandler(function(message_view) {
            var thread_view = message_view.getThreadView()
            var loc = top.location

            top.TDOpts.email_title = thread_view.getSubject()

            function fnHandleThreadId(thread_id) {
                if (thread_id) {
                    top.TDOpts.email_href =
                        loc.origin + loc.pathname + "#inbox/" + thread_id
                } else {
                    top.TDOpts.email_href = loc.href
                }
            }

            // Try to infer the thread_id
            var match, thread_id

            // Not nested
            match = loc.hash.match(/#(?:inbox|sent|trash|snoozed)\/([^/]+)/i)
            if (match) {
                thread_id = match[1]
            }

            // Nested
            match = loc.hash.match(/#(?:label|category)\/[^/]+\/([^/]+)/i)
            if (match) {
                thread_id = match[1]
            }

            if (thread_id) {
                fnHandleThreadId(thread_id)
            } else {
                // Use inboxSDK
                var getThreadId = thread_view.getThreadIDIfStableAsync
                if (!getThreadId) {
                    getThreadId = thread_view.getThreadIDAsync
                }
                try {
                    getThreadId().then(fnHandleThreadId)
                } catch (e) {
                    fnHandleThreadId(thread_view.getThreadID())
                }
            }
        })
    })
})()
