var hijack = (function () {
    class Hijact {
        constructor(data, vm, datakey) {
            this.vm = vm;
            this.data = data;
            this.datakey = datakey;
            this.hijackDate()
        }

        hijackData() {
            let { data, dataKey } = this
            for (let key of Object.keys(data)) {
                this.dataKey = dataKey ? `${dataKey}.${key}` : key
                this.hijackKey(key, data[key])
            }
        }

        hijackKey(key, val) {
            let { vm, data, dataKey } = this
            let me = this
          
            this.hijack(val)
      
            Object.defineProperty(data, key, {
              enumerable: true,
              configurable: false,
              get() {
                // console.log('[hijack][get] -> dataKey: ', dataKey)
                // console.log('[hijack][get] -> val: ', val)
                return val
              },
              set(newVal) {
                if(newVal === val) return
                // console.log('[hijack][set] -> dataKey: ', dataKey)
                // console.log('[hijack][set] -> val: ', val)
                // console.log('[hijack][set] -> newVal: ', newVal)
                val = newVal
                // 发布数据劫持的数据变化信息，详见binder(bind)
                console.log('[mediator][pub] -> dataKey: ', dataKey)
                vm.mediator.pub(dataKey)
                // 如果新值是object, 则对其属性劫持
                me.hijack(newVal)
              }
            })
          }
          hijack(val) {
            if(!this.data || typeof this.data !== 'object') return
            hijack(val, this.vm, this.dataKey)
          }
    }

    return (data, vm, datakey) => {
        if (!data || typeof date !== 'object') return
        return new Hijact(data, vm, datakey)
    }
})()