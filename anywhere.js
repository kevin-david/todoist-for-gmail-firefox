;(function() {
    if (top.location.pathname.indexOf("/mail/") == -1) return
    if (top.location.href.indexOf("&view=ma") != -1) return
    if (top.location.href.indexOf("&view=pt") != -1) return

    var TD_OPTS = top.TDOpts || {}
    var ANY_OPTS = {}

    var doc = top.document

    //
    // --- Toggle ---
    //
    var cur_elm = doc.getElementById("todoist_holder")
    if (cur_elm && cur_elm.style.display != "none") {
        cur_elm.style.display = "none"
        return true
    } else if (cur_elm) {
        cur_elm.style.display = "block"
        return true
    }

    //
    // --- Create ---
    //

    // --- Helpers
    function getWindowSize(doc) {
        doc = doc || top.document
        var win_w, win_h
        if (self.innerHeight) {
            win_w = self.innerWidth
            win_h = self.innerHeight
        } else if (doc.documentElement && doc.documentElement.clientHeight) {
            win_w = doc.documentElement.clientWidth
            win_h = doc.documentElement.clientHeight
        } else if (doc.body) {
            win_w = doc.body.clientWidth
            win_h = doc.body.clientHeight
        }
        return { w: win_w, h: win_h }
    }

    // Create icon
    function createIcon(top_pos, click_fn) {
        var img = doc.createElement("img")

        img.src =
            "https://d3ptyyxy2at9ui.cloudfront.net/76084e29cb2cf72b320e888edc583dfb.gif"
        img.width = 24
        img.height = 24
        img.style.background =
            "transparent url(https://d3ptyyxy2at9ui.cloudfront.net/gmail-plugin-buttons-v3@2x.png) 0 0 no-repeat"
        img.style.backgroundSize = "24px"
        img.style.backgroundPosition = "0 " + top_pos + "px"
        img.style.opacity = "0.5"
        img.style.marginLeft = "5px"

        listen("mouseover", img, function() {
            img.style.opacity = "1.0"
            img.style.backgroundColor = "#737373"
        })

        listen("mouseout", img, function() {
            img.style.opacity = "0.5"
            img.style.backgroundColor = "transparent"
        })

        if (click_fn) listen("click", img, click_fn)

        return img
    }

    function postMessageToWindow(win, message) {
        try {
            win.postMessage(message, "*")
            return true
        } catch (e) {
            return false
        }
    }

    function listen(evnt, elem, func) {
        if (elem.addEventListener) {
            elem.addEventListener(evnt, func, false)
        } else if (elem.attachEvent) {
            // IE DOM
            var r = elem.attachEvent("on" + evnt, func)
            return r
        }
    }

    // --- Icon functions
    function closeWindow() {
        setTimeout(function() {
            doc.getElementById("todoist_holder").style.display = "none"

            if (TD_OPTS.onCloseWindow) TD_OPTS.onCloseWindow()
        }, 50)
        return false
    }

    function collapseWindow() {
        if (ANY_OPTS.timeout_collapse) {
            clearTimeout(ANY_OPTS.timeout_collapse)
            ANY_OPTS.timeout_collapse = null
        }

        if (holder.collapsed) {
            iframe.style.display = "block"
            holder.collapsed = false
            placeWindow()
        } else {
            iframe.style.display = "none"
            holder.collapsed = true
            placeWindow()
        }

        if (collapse_icon && holder.collapsed)
            collapse_icon.style.backgroundPosition = "0 -24px"
        else collapse_icon.style.backgroundPosition = "0 -48px"
    }

    TD_OPTS.collapseWindow = collapseWindow

    // Create holder
    var holder = doc.createElement("div")
    holder.id = "todoist_holder"
    holder.style.position = "fixed"
    holder.style.backgroundColor = "#fff"
    holder.style.fontFamily = "sans-serif"
    holder.style.fontSize = "12px"
    holder.style.zIndex = TD_OPTS.zIndex || 134343443
    holder.style.borderTopRightRadius = "5px"
    holder.style.borderTopLeftRadius = "5px"

    TD_OPTS.holder = holder

    //Create the top
    var top_frame = doc.createElement("div")
    top_frame.style.color = "#fff"
    top_frame.style.padding = "2px"
    top_frame.style.padding = "10px"
    top_frame.style.paddingLeft = "14px"
    top_frame.style.paddingRight = "8px"
    top_frame.style.backgroundColor = "#404040"
    top_frame.style.cursor = "pointer"
    top_frame.style.textAlign = "left"
    top_frame.style.fontSize = "13px"

    // New Gmail optimization
    top_frame.style.fontFamily = "Roboto,RobotoDraft,Helvetica,Arial,sans-serif"
    top_frame.style.fontWeight = "500"
    top_frame.style.lineHeight = "20px"
    top_frame.style.borderRadius = "4px 4px 0 0"

    // Icons holder
    var icons_holder = doc.createElement("div")
    icons_holder.style.cssText =
        "margin-top: -5x; float: right; text-align: right; width: 90px;"
    icons_holder.style.marginTop = "-5px"
    icons_holder.style.float = "right"
    icons_holder.style.textAlign = "right"
    icons_holder.style.width = "90px"

    var collapse_icon

    if (TD_OPTS.collapsed)
        icons_holder.appendChild(
            (collapse_icon = createIcon(-24, collapseWindow))
        )
    else
        icons_holder.appendChild(
            (collapse_icon = createIcon(-48, collapseWindow))
        )

    if (TD_OPTS.hide_close_icon !== true)
        icons_holder.appendChild(createIcon(0, closeWindow))

    top_frame.appendChild(icons_holder)

    top_frame.appendChild(doc.createTextNode("Todoist"))

    // Iframe
    var iframe = doc.createElement("iframe")

    //Place the element in the right
    function placeWindow() {
        var win_size = getWindowSize()

        var width = 450
        var height = 550
        if (win_size.w > 800) {
            width = 475
            height = 625
        }

        if (win_size.h <= 786) {
            height = 575
        }

        if (win_size.h <= 650) {
            height = 515
        }

        if (holder.collapsed) {
            holder.style.width = "170px"
            holder.style.boxShadow = "none"
        } else {
            holder.style.width = width + "px"
            iframe.style.width = width + "px"
            holder.style.boxShadow =
                "0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)"
        }

        iframe.height = height - top_frame.offsetHeight

        holder.style.bottom = "-1px"
        holder.style.left = win_size.w - holder.offsetWidth - 30 + "px"

        if (TD_OPTS.customPostion) {
            TD_OPTS.customPostion(holder)
        }
    }

    TD_OPTS.placeWindow = placeWindow

    // Click fn
    listen("click", top_frame, function(ev) {
        var elm = ev.srcElement || ev.target

        if (elm && elm.nodeName.toLowerCase() == "img") return true

        collapseWindow()
    })

    holder.appendChild(top_frame)

    // Crate the iframe
    iframe.src = chrome.extension.getURL("frame.html")
    iframe.id = "todoist_iframe"
    iframe.frameBorder = 0
    iframe.border = 0
    iframe.style.margin = "0px"
    iframe.style.padding = "0px"
    holder.appendChild(iframe)

    var body = doc.getElementsByTagName("body")[0]

    holder.style.visibility = "hidden"

    body.appendChild(holder)

    listen("scroll", window, placeWindow)
    listen("resize", window, placeWindow)

    placeWindow()

    if (TD_OPTS.delayed_loading) {
        holder.style.visibility = "hidden"
        ANY_OPTS.timeout_collapse = setTimeout(function() {
            holder.style.visibility = "visible"
            if (!holder.collapsed) collapseWindow()
        }, 1000)
    } else {
        holder.style.visibility = "visible"
    }

    var CUR_HREF = null
    var IS_INITED = false

    function locationPasser() {
        var title = top.TDOpts.email_title || "" + top.document.title
        var cur_loc = top.TDOpts.email_href || "" + top.location.href

        if (CUR_HREF != title) {
            var data_to_send = cur_loc + "--/--" + title
            postMessageToWindow(iframe.contentWindow, data_to_send)

            if (IS_INITED) {
                CUR_HREF = "" + title
            }
        }
    }
    setInterval(locationPasser, 200)

    top.addEventListener("message", function(e) {
        var str_data = e.data
        if (!str_data || !str_data.indexOf) return

        if (str_data.indexOf("SWITCH_URL:") != -1) {
            str_data = str_data.replace("SWITCH_URL:", "")
            top.location = str_data
        }

        if (str_data.indexOf("TODOIST_INITED:") != -1) {
            IS_INITED = true
        }
    })

    // Quick add
    top.TDOpts.addAsTask = function() {
        if (holder.style.display == "none") {
            holder.style.display = "block"
        }

        if (holder.collapsed) {
            collapseWindow()
            placeWindow()
        }

        var msg = {
            msg_type: "GMAIL_MESSAGE_ADD",
            title: top.TDOpts.email_title || "" + top.document.title,
            href: top.TDOpts.email_href || "" + top.location.href
        }

        postMessageToWindow(iframe.contentWindow, JSON.stringify(msg))
    }
})()
