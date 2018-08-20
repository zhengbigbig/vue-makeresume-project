Vue.component('sign-up',{
    template:`
        <div v-show="signUpVisible"  class="login" v-cloak>
        <div class="loginBar">
            <div class="login-inner">注册</div>
            <form action="" @submit.prevent="onSignUp">
                <label for="">邮箱&nbsp:&nbsp</label><input type="text" placeholder="请输入邮箱" v-model="signUp.email">
                <label for="">密码&nbsp:&nbsp</label><input type="password" placeholder="请输入密码" v-model="signUp.password">
                <label for="">确认密码&nbsp:&nbsp</label><input type="password" placeholder="重复输入密码" v-model="signUp.password1">
                <button type="submit" >提交</button>
                <button type="button" @click="loginVisable=true;signUpVisible = false">登录</button>
            </form>
            <div class="actions">
                <button type="button" @click="loginVisable = false">关闭</button>
            </div>
        </div>
    </div>
    `
})