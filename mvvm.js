class Mvvm{
    constructor(options = {}) {
        this.options = options;
        this.mediator = new Mediator()
        let data = this.data = this.options.data
        this.proxyDate(data)
        this.hijack = hijack(data,this)
        this.view = new View(options.el || document.body, this)
    }
    proxyDate(data){
        for(let key of Object.keys(data)) {
            Object.defineProperty(this,key,{
                configurable: false,
                enumerable: true,
                get() {
                    console.log(key)
                  return data[key]
                },
                set(newVal) {
                  this.data[key] = newVal
                } 
            })
        }
    }
}