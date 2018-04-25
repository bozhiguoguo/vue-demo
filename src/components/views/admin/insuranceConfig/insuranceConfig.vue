<template>
    <div>
        <div class="dialogBtn">
            <el-button @click="isButton = 1;add_open('addObject')" size="small">添加</el-button>
            <el-button @click="isButton = 2;edit_open('addObject')" size="small">编辑</el-button>
        </div>
        <el-table
                :data="tableData"
                style="margin-top: 30px;"
                border
                size="small"
                @row-click = "showRow"
                header-cell-class-name="text_center">
            <el-table-column
                    width="100px"
                    header-align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-radio class="radio" v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    width="100px"
                    header-align="center"
                    label="序号">
            </el-table-column>
            <el-table-column
                    prop="typename"
                    header-align="center"
                    label="保险类型">
            </el-table-column>
            <el-table-column
                    prop="pname"
                    header-align="center"
                    label="保险产品">
            </el-table-column>
            <el-table-column
                    prop="company"
                    header-align="center"
                    label="保险公司">
            </el-table-column>
            <el-table-column
                    prop="defaultMoney"
                    header-align="center"
                    label="默认保费">
            </el-table-column>
            <el-table-column
                    prop="defaultAmendsMoney"
                    header-align="center"
                    label="默认理赔金额">
            </el-table-column>
        </el-table>
        <el-dialog title="保险产品管理" :visible.sync="dialogFormVisible" width="25%">
            <el-form :model="addObject" ref="addObject">
                <el-row>
                    <el-col :span="16">
                        <el-form-item
                                label="保险类型"
                                prop="typecode"
                                :label-width="formLabelWidth"
                                :rules="[{ required: true, message: '保险类型不能为空', trigger: 'blur' }]">
                            <el-select
                                    class="w194"
                                    v-model="addObject.typecode"
                                    placeholder="请选择保险类型">
                                <el-option
                                    v-for="item in typeOption"
                                    :key="item.typecode"
                                    :label="item.typename"
                                    :value="item.typecode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item
                                label="保险产品"
                                prop="pname"
                                :label-width="formLabelWidth"
                                :rules="[{ required: true, message: '保险产品不能为空', trigger: 'blur' }]">
                            <el-input class="w194" placeholder="请选择保险产品" v-model.trim="addObject.pname" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item
                                label="保险公司"
                                prop="company"
                                :label-width="formLabelWidth"
                                :rules="[{ required: true, message: '保险公司不能为空', trigger: 'blur' }]">
                            <el-select class="w194"  v-model="addObject.company" placeholder="请选择保险公司">
                                <el-option label="平安" value="平安"></el-option>
                                <el-option label="亚太" value="亚太"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item
                                label="默认保费"
                                prop="defaultMoney"
                                :label-width="formLabelWidth"
                                :rules="[{ required: true, message: '默认保费不能为空', trigger: 'blur' },{ type: 'number', message: '保费必须为数字值',trigger: 'blur' }]">
                            <el-input class="w194" placeholder="请输入默认保费" v-model.number="addObject.defaultMoney" auto-complete="off" maxlength="8"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item
                                label="默认理赔金额"
                                prop="defaultAmendsMoney"
                                :label-width="formLabelWidth"
                                :rules="[{ required: true, message: '默认理赔金额不能为空', trigger: 'blur' }]">
                            <el-input class="w194" placeholder="请输入默认理赔金额" v-model.trim="addObject.defaultAmendsMoney" auto-complete="off" maxlength="8"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-button type="primary" v-if="isButton == 1" @click="addlist('addObject')">确 定</el-button>
                    <el-button type="primary" v-if="isButton == 2" @click="editList('addObject')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import '@/assets/css/table_batch.css';
    export default {
        name: '',
        data () {
            return {
                radio: '1',
                tableData: [],
                dialogFormVisible: false,
                typeOption:[],
                formLabelWidth: '120px',
                isButton:null,
                editID:null,
                addObject:{},
            }
        },
        created(){
            this.loadlist();
        },
        methods:{
            loadlist(){
                //商品类型  == 保险类型
                this.$fetch(`${this.$api}insuProductType/getAllInsuProductTypeList`).then(
                    (res)=>{
                        if(res.success && res.code == 0){
                            this.typeOption = res.data;
                        }else {
                            this.$message({
                                type: 'error',
                                message:res.message,
                            })
                        }
                    },
                    (err)=>{
                        this.$message({
                            type: 'error',
                            message:res.message,
                        })
                    })
                //商品列表
                this.$fetch(`${this.$api}insuProduct/getAllInsuProductList`).then(
                    (res)=>{
                        if(res.success && res.code == 0){
                            this.tableData = res.data;
                        }else {
                            this.$message({
                                type: 'error',
                                message:res.message,
                            })
                        }
                    },
                    (err)=>{
                        this.$message({
                            type: 'error',
                            message:res.message,
                        })
                    })
            },
            add_open(formName){
                this.dialogFormVisible = true;
                this.addObject = {};
            },
            addlist(formName){
                this.$refs[formName].clearValidate();
                let self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$post(self.$api + 'insuProduct/saveInsuProduct',self.addObject).then(
                            (res)=>{
                                if(res.success && res.code == 0){
                                    self.dialogFormVisible = false;
                                    self.loadlist();
                                    self.addObject = {};
                                }else {
                                    self.$message({
                                        type: 'error',
                                        message:res.message,
                                    })
                                }
                            },
                            (err)=>{
                                console.log(err)
                            })
                    }
                });
            },
            showRow(row){
                this.editID = this.tableData[this.tableData.indexOf(row)].id
            },
            edit_open(formName){
                let self = this;
                if(self.editID == null || self.editID == ''){
                    this.$message({
                        type: 'error',
                        message:'请选择一条数据',
                    })
                }else {
                    self.dialogFormVisible = true;
                    self.$fetch(`${this.$api}insuProduct/getInsuProductById/${self.editID}`).then(
                        (res) => {
                            if(res.success && res.code == 0){
                                self.addObject = res.data;
                            }else {
                                this.$message({
                                    type: 'error',
                                    message:res.message,
                                })
                            }
                        },
                        (err)=>{
                            this.$message({
                                type: 'error',
                                message:err,
                            })
                        })
                }
            },
            editList(formName){
                this.$refs[formName].clearValidate();
                let self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.addObject.id = self.editID
                        self.$put(self.$api + 'insuProduct/updateInsuProduct',self.addObject).then(
                            (res)=>{
                                if(res.success && res.code == 0){
                                    self.dialogFormVisible = false;
                                    self.loadlist();
                                    self.addObject = {};
                                }else {
                                    self.$message({
                                        type: 'error',
                                        message:res.message,
                                    })
                                }
                            },
                            (err)=>{
                                self.$message({
                                    type: 'error',
                                    message:err,
                                })
                            })
                    }
                });
            },


        },
    }
</script>

<style scoped>
.dialogBtn {
    text-align: left;
}
.text_center {
    text-align: center;
}
.w194 {
    width: 194px;
}
.el-form-item {
    margin-bottom: 40px;
}
.el-table th>.cell{
  font-weight:600;
}
</style>
