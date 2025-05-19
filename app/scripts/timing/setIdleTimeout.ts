export function setIdleTimeout(seconds: number, onIdle: Function, onUnidle: Function) {

    // TODO: This needs to be scrutinized/tested.
    
    var timeout:ReturnType<typeof setTimeout> // = 0
    startTimer()
    
    function startTimer() {    
        timeout = setTimeout(onExpires, seconds * 1000) // FYI, converts secs to millisecs
        document.addEventListener("mousemove", onActivity)
        document.addEventListener("keydown", onActivity)
        document.addEventListener("touchstart", onActivity)
    }
    
    function onExpires() {
        //timeout
        onIdle()
    }
    
    function onActivity() {
    
        if (timeout) {    
            clearTimeout(timeout)    
        } else {
            onUnidle()
        }

        // Since the mouse is moving, we turn off our event hooks for 1 second
        document.removeEventListener("mousemove", onActivity)
        document.removeEventListener("keydown", onActivity)
        document.removeEventListener("touchstart", onActivity)
        setTimeout(startTimer, 1000)
    }
}