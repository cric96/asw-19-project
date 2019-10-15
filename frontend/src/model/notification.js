class Notification {
    constructor(text) {
        this.text = text
    }

    setTo(link) {
        this.to = link
        return this
    }

    static get empty() {
        return emptyNotification
    } 
}

const emptyNotification = new Notification("")
export default Notification