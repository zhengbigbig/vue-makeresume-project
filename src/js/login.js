Vue.component('login',{
    data(){
        return {
            Login:{
                email:'',
                password:''
            },
        }
    },
    template:`
        <div  class="login" v-cloak>
            <div class="loginBar">
                <div class="login-inner">登录</div>
                <form action="" @submit.prevent="onLogin">
                    <label for="">用户名&nbsp:&nbsp</label><input type="text" placeholder="请输入用户名" v-model="Login.email">
                    <label for="">密码&nbsp:&nbsp</label><input type="password" placeholder="请输入密码" v-model="Login.password">
                    <button type="submit" >提交</button>
                    <button type="button" @click="$emit('signup')">注册</button>
                </form>
                <div class="actions">
                    <button type="button" @click="$emit('close')">关闭</button>
                </div>
            </div>
        </div>
    `,
    methods:{
        onLogin(){
            AV.User.logIn(this.Login.email, this.Login.password).then((user)=>{
                alert('登录成功')
                user = user.toJSON()
                console.log(user)
                this.$emit('login',user)
            }, (error)=>{
                alert('登录失败，请检查用户名密码是否正确')
            });

        }
    }
})