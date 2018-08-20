Vue.component('skin-picker',{
    template:`
            <div class="templateChange" v-show="templateChange">
        <div class="templateChange-inner">
            <span @click="setTheme('default')">默认</span>
            <span @click="setTheme('dark')">黑色</span>
        </div>
    </div>
    `
})