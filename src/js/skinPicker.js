Vue.component('skin-picker',{
    template:`
            <div class="templateChange">
        <div class="templateChange-inner">
            <span @click="setTheme('defalut')">默认</span>
            <span @click="setTheme('dark')">黑色</span>
        </div>
    </div>
    `,
    methods:{
        setTheme(name){
            console.log(name)
            this.$emit('settheme',name)
        }
    }
})