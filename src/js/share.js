Vue.component('share',{
    props:['shareLink'],
    template:`
        <div class="shareResume" v-cloak>
            <div class="share">
                <textarea readonly="readonly">{{shareLink}}</textarea>
                <button @click="$emit('down')">关闭</button>
            </div>
        </div>
    `
})