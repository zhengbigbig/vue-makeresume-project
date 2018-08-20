Vue.component('share',{
    template:`
        <div class="shareResume" v-show="shareResume" v-cloak>
            <div class="share">
                <textarea readonly="readonly">{{shareLink}}</textarea>
                <button @click="shareResume = false">关闭</button>
            </div>
        </div>
    `
})