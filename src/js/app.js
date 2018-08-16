let APP_ID = 'VdcSrrtUpbVGtKAXv1x2pJnk-gzGzoHsz';
let APP_KEY = 'r0PQmzhLKVeOCD426NBQR85V';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
Vue.component('editable-span', {
    props: ['value'],
    template: `
        <span class="editableSpan">
            <span v-show="!editing">{{value}}</span>
            <input v-show="editing" type="text" v-bind:value="value" @input ="triggerEdit">
            <button @click="editing=!editing" type="button">编辑</button>
        </span>`,
    data() {
        return {
            editing: false
        }
    },
    methods: {
        triggerEdit(e) {
            this.$emit('edit', e.target.value)
            console.log(e.target.value)
        }
    }
})
Vue.component('text-span', {
    props: ['value'],
    template: `
        <div class="editableSpan">
            <span v-show="!editing">{{value}}</span>
            <button @click="editing=!editing" type="button">编辑</button>
            <textarea v-show="editing" cols="30" rows="10"   v-bind:value="value" @input ="triggerEdit" style=" width:100%;overflow:auto;word-break:break-all;resize: none">
        </div>`,
    data() {
        return {
            editing: false
        }
    },
    methods: {
        triggerEdit(e) {
            this.$emit('edit', e.target.value)
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisable:false,
        signUpVisible :false,
        shareResume:false,
        currentUser:{
            objcetId:undefined,
            email:''
        },
        resume: {
            name: '姓名',
            introduce: '一句话介绍自己，告诉HR为什么选择你而不是别人',
            birthday: '1990年1月',
            jobTitle: '前端工程师',
            phone: '132XXXXXXXX',
            email: 'example@example.com',
            message1: '请编辑内容',
            message2:[{mes1:'请编辑内容'}],
            message3: '请编辑内容',
            message4: '请编辑内容',
            message5: '请编辑内容',
            message6: '请编辑内容',
        },
        signUp:{
            email:'',
            password:'',
            password1:''
        },
        Login:{
            email:'',
            password:'',
            password1:''
        },
        shareLink:''
    },
    methods: {
        onEdit(key, value) {
            let regex = /\[(\d+)\]/g
            key = key.replace(regex,(match,number)=>`.${number}`)
            keys = key.split('.')
            let result = this.resume
            for(let i = 0;i < keys.length; i++){
                if(i === keys.length - 1){
                    result[keys[i]] = value
                }else{
                    result = result[keys[i]]
                }
            }
            result = value

        },
        hasLogin(){
            return this.currentUser.objectId
        },
        save() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                // 跳转到首页
                this.loginVisable = true
            }
            else {
                this.saveResume()
                //currentUser 为空时，可打开用户注册界面…
            }
        },
        onSignUp(){
            if(this.signUp.password === this.signUp.password1){
                // 新建 AVUser 对象实例
                const user = new AV.User();
                // 设置用户名
                user.setUsername(this.signUp.email);
                // 设置密码
                user.setPassword(this.signUp.password);
                // 设置邮箱
                user.setEmail(this.signUp.email);
                user.signUp().then((user)=> {
                    alert('注册成功，请登录');
                    this.signUpVisible = false
                    this.loginVisable = true
                }, function (error) {
                    alert('此邮箱已被注册')
                });
            }else{
                alert('俩次密码输入不一致')
            }
        },
        onLogin(){
            AV.User.logIn(this.Login.email, this.Login.password).then((user)=>{
                alert('登录成功')
                this.loginVisable = false
                this.signUpVisible = false
                user = user.toJSON()
                console.log(1)
                console.log(user)
                this.currentUser.objcetId = user.objectId
                this.currentUser.email = user.email
                this.getResume()
            }, (error)=>{
                alert('登录失败，请检查用户名密码是否正确')
            });

        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            var user = AV.Object.createWithoutData('User',objectId);
            // 修改属性
            user.set('resume',this.resume);
            // 保存到云端
            user.save().then(()=>{
                alert('保存成功')
                console.log(this.resume)
            },(error)=>{
                alert('保存失败')
            });
        },
        loginOut(){
            AV.User.logOut();
            var currentUser = AV.User.current();
            alert('注销成功')
            this.currentUser.objcetId = undefined
            this.currentUser.email = ''

        },
        getResume(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                // 跳转到首页
                this.loginVisable = true
                console.log('当前没有用户？？？')
            }
            else {
                let query = new AV.Query('User');
                console.log(this.currentUser.objectId)
                query.get(this.currentUser.objectId).then((user)=> {
                    console.log(user.toJSON());
                    this.resume = user.toJSON().resume
                }, function (error) {
                    // 异常处理
                });
            }
        },
        shareResume (){

        },
        addMessage2(){
            this.resume.message2.push({mes1:'请编辑内容'})
        },
        removeMessage2(index){
            this.resume.message2.splice(index,1)
        }

    }
})
let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    console.dir(app.currentUser.objectId);
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
}else {
    console.log('???')
}