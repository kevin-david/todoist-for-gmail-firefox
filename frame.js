function init() {
    TODOIST_FRAME = document.getElementById('todoist_frame');

    window.addEventListener('message', function(e) {
        if(e.data.indexOf('--/--') != -1 || e.data.indexOf('GMAIL_MESSAGE_ADD') != -1)
            TODOIST_FRAME.contentWindow.postMessage(e.data, '*');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    init();
});
