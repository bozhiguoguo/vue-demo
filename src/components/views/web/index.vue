<template>
    <div>
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside>
                <el-row>
                    <img style="width:100%;height:auto;" src="@/assets/logo/icon-zhiguoguo.png" alt="">
                </el-row>
                <el-menu
                        router>
                    <el-menu-item index="/webIndex">
                        <img src="@/assets/icon/icon-shouye.png" alt="">
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/webIndex/InsuranceList">
                        <img src="@/assets/icon/icon-toubaoqingdan.png" alt="">
                        <span slot="title">投保清单</span>
                    </el-menu-item>
                    <el-menu-item index="/webIndex/claimList">
                        <img src="@/assets/icon/icon-dailipei.png" alt="">
                        <span slot="title">待理赔</span>
                    </el-menu-item>
                    <el-menu-item index="/webIndex/paymentList">
                        <img src="@/assets/icon/icon-daizhifu.png" alt="">
                        <span slot="title">待支付</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 左侧菜单结束 -->
            <!-- 主体内容 -->
            <el-container>

                <!-- 管理后台头部 -->
                <el-header>
                    <div class="title_box">
                        <div class="login_box">
                            <div class="login">
                                <div class="login_l">
                                    您好，<span>{{user}}</span>
                                </div>
                                <div class="login_r">
                                    <span @click="break_login()" class="cursor">退出</span> |
                                    <span class="cursor"  @click="dialogTableVisible = true">修改密码</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <!-- 中间内容路由切换 -->
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog width="25%" title="修改密码" :visible.sync="dialogTableVisible">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPwd">
                    <el-input type="password" v-model="ruleForm2.oldPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPwd">
                    <el-input type="password" v-model="ruleForm2.confirmPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'webIndex',
        data () {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                menuList:[],
                user:null,
                dialogTableVisible:false,
                ruleForm2: {
                    pwd: '',
                    confirmPwd: '',
                    oldPwd: '',
                },
                rules2: {
                    pwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6,  message: '长度大于6个字符', trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    oldPwd: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' },
                        { min: 6,  message: '长度大于6个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
          if(typeof this.$Cookies.get('user') == 'undefined'){
            this.$router.push({path:'/'});
          }else {
            this.user = JSON.parse(this.$Cookies.get('user')).nikename;
            this.loadlistMenu();
          }
        },
        methods:{
            //事件
            //退出登录
            break_login(){
                this.$Cookies.remove('user');
                this.$router.push({path:'/'});
            },
            loadlistMenu (){
                this.$fetch(`${this.$api}insuUserRole/getRoleMenueByUid`).then(
                    (res) => {
                        if(res.success && res.code == 0){
                                this.menuList = res.data;
                                this.menuList.map((item)=>{
                                    switch(item.id){
                                        case 1:
                                            item.src = '@/assets/icon/icon-shouye.png';
                                            break;
                                        case 2:
                                            item.src = '@/assets/icon/icon-toubaoqingdan.png';
                                            break;
                                        case 3:
                                            item.src = '@/assets/icon/icon-dailipei.png';
                                            break;
                                        case 4:
                                            item.src = '@/assets/icon/icon-daizhifu.png';
                                            break;
                                    }
                                })
                                console.log(this.menuList)
                        }else {
                            this.$message({
                                type:'error',
                                message:res.message
                            })
                        }
                    }
                )
            },
            submitForm(formName) {
                let self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.ruleForm2.id = JSON.parse(self.$Cookies.get('user')).id;
                        self.$post(self.$api + 'insuUser/updatePwd',self.ruleForm2).then(
                            (res) => {
                                if(res.success && res.code == 0 ){
                                    self.$router.push({path:'/'});
                                    console.log(res)
                                }else {
                                    self.$message({
                                        type:'error',
                                        message:res.message
                                    })
                                }
                            },
                            (err) => {
                                console.log(err)
                            },
                        )
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
.el-header{
    width: 100%;
    color: #333;
    text-align: center;
    background: url('../../../assets/bg/icon-dingbu.png') no-repeat;
    background-size: 100%;
}
.title_box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
.login_box {
    width: 500px;
    line-height: 60px;
    float: right;

}
.login {
    height: 100%;
    color: #ffffff;
    font-size: 16px;
}
.login_l {
    float: left;
    margin-left: 160px;
}
.login_l span {
    color:#f96e75;
}
.login_r {
    float: left;
    margin-left: 60px;
}
.login_r span:nth-child(1) {
    margin-right: 20px;
}
.login_r span:nth-child(2) {
    margin-left: 20px;
}
.el-aside {
    width:210px !important;
    background-color: #383958;
    color: #333;
    text-align: center;
    line-height: 200px;
    height:1080px;
    overflow: hidden;
}
.el-aside ul {
    width: 100%;
}
.el-row {
    height: 106px;
}
.el-main {
    width:98%;
    color: #333;
    text-align: center;
    margin: 30px auto ;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 3px 17px 0 rgba(156, 104, 199, 0.27);
}
.el-menu {
    background: none;
}
.el-menu-item {
    text-align: left;
    padding-left: 30px !important;
}
.el-menu-item span{
    color: #b9b9c4;
    margin-left: 18px;
    font-size: 18px;
}
.el-menu-item:focus, .el-menu-item:hover {
    background-color: #424360 ;
}
.router-link-exact-active li{
    background-color: #30304d ;
}
.is-active span {
    color: #fff !important;
}
    .cursor {
        cursor:pointer;
    }
</style>
