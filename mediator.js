// 中介者

class Mediator {
    constructor() {
        this.channels = {}
        this.uid = 0;
    }
    //订阅
    sub(channel,cb){
        this.channels[channel] = this.channels[channel] || [];
        this.uid++;
        this.channels[channel].push({
            context: this,
            uid: this.uid,
            cb
        })
        return this.uid;
    }
    //发布
    pub(channel,data){
        let ch = this.channels[channel];
        if(!ch) return false;
        let len = ch.length;
        while(len --){
            ch[len].cb.call(ch[len].context, data)
        }
        return this
    }
    //取消
    cancel(uid) {
        let { channels } = this
        for(let channel of Object.keys(channels)) {
          let ch = channels[channel]
          if(ch.length === 1 && ch[0].uid === uid) {
            delete channels[channel]
            return
          }
          for(let i=0,len=ch.length; i<len; i++) {
              if(ch[i].uid === uid) {
                ch.splice(i,1)
                return
              }
          }
        }
      }

}