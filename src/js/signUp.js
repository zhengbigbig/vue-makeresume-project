Vue.component('sign-up',{
    data(){
        return {
            signUp:{
                email:'',
                password:'',
                password1:''
            },
        }
    },
    template:`
        <div class="login" v-cloak>
        <div class="loginBar">
            <div class="login-inner">注册</div>
            <form action="" @submit.prevent="onSignUp">
                <label for="">邮箱&nbsp:&nbsp</label><input type="text" placeholder="请输入邮箱" v-model="signUp.email">
                <label for="">密码&nbsp:&nbsp</label><input type="password" placeholder="请输入密码" v-model="signUp.password">
                <label for="">确认密码&nbsp:&nbsp</label><input type="password" placeholder="重复输入密码" v-model="signUp.password1">
                <button type="submit" >提交</button>
                <button type="button" @click="$emit('login')">登录</button>
            </form>
            <div class="actions">
                <button type="button" @click="$emit('closer')">关闭</button>
            </div>
        </div>
    </div>
    `,
    methods:{
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
                    this.$emit('loginup',user)
                }, function (error) {
                    alert('此邮箱已被注册')
                });
            }else{
                alert('俩次密码输入不一致')
            }
        }
    }
})