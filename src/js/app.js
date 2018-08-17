let APP_ID = 'VdcSrrtUpbVGtKAXv1x2pJnk-gzGzoHsz';
let APP_KEY = 'r0PQmzhLKVeOCD426NBQR85V';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
Vue.component('editable-span', {
    props: ['value','disabled'],
    template: `
        <span class="editableSpan">
            <span v-show="!editing">{{value}}</span>
            <input v-show="editing" type="text" v-bind:value="value" @input ="triggerEdit">
            <button v-if="!disabled" @click="editing=!editing" type="button">编辑</button>
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
    props: ['value','disabled'],
    template: `
        <div class="editableSpan">
            <span v-show="!editing">{{value}}</span>
            <button v-if="!disabled" @click="editing=!editing" type="button">编辑</button>
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
        templateChange:false,
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
        shareLink:'',
        previewResume:{
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
        mode:'edit', // 'preview'
    },
    computed:{
        displayResume(){
            console.log('代码执行了')
            console.log(this.resume)
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    watch:{
        'currentUser.objectId' : function (newV,oldV){
            if(newV){
                console.log(newV)
                console.log('ID变化了')
                this.getResume(this.currentUser)
            }else{
                this.resume = this.previewResume
            }
        },
        'resume' : function (newV,oldV) {
            console.log(this.resume)
        }
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
                let currentUser = AV.User.current()
                this.currentUser = currentUser.toJSON()
                this.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
                this.loginVisable = false
                this.signUpVisible = false
                user = user.toJSON()
                console.log(1)
                console.log(user)
                this.currentUser.objcetId = user.objectId
                this.currentUser.email = user.email
                console.log(user.resume)

                this.resume = user.resume
                console.log(this.resume)
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
            console.log(currentUser)
            this.currentUser.objectId = undefined
            this.currentUser.email = ''

        },
        getResume(user){
            let query = new AV.Query('User');
            return query.get(user.objectId).then((user)=> {
                let resume = user.toJSON().resume
                return resume

            })

        },
        myResume(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                // 跳转到首页
                this.loginVisable = true
                console.log('当前没有用户？？？')
            }else{
                let query = new AV.Query('User');
                query.get(this.currentUser.objectId).then((user)=> {
                    this.resume = user.toJSON().resume
                })
            }
        },
        shareResume (){

        },
        addMessage2(){
            this.resume.message2.push({mes1:'请编辑内容'})
        },
        removeMessage2(index){
            this.resume.message2.splice(index,1)
        },
        printResume(){
            window.print()
        }

    }
})
//获取当前用户
let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    console.log('currentUser'+ app.currentUser.objectId)
    app.mode = 'edit'
    app.getResume(app.currentUser).then((resume)=>{
        app.resume = resume
    })
    console.log(app.mode)
}else {
    console.log('???')
    app.mode = 'preview'
}

//获取预览用户的ID
let search = location.search
console.log(search)
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
    userId = matches[1]
    console.log('previewResume'+ userId)
    app.mode = 'preview'
    app.getResume({objectId:userId}).then((resume)=>{
        app.previewResume = resume
    })
    console.log(app.mode)
}else{
    app.mode = 'edit'
}
