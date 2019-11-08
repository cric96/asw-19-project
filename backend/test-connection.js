const imageStore = require('./imageStore.js')

folder = new imageStore.dropboxFolder()
folder.save("ciao martuccia", "2", "txt").then(res => {
    console.log(res)
    folder.find("1","txt").then(text => {
        console.log(text)
    })
})