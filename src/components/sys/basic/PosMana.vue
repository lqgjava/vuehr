<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位..."
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="pos.name">
            </el-input>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition()">添加</el-button>
        </div>
        <!--:data="tableDate 是data数据里面的tableData属性。表格里面显示的数据是json数组"-->
        <!--el-table-column:每一列-->
        <div class="posManaMain">
            <el-table
                    :data="positions"
                    stripe
                    size="small"
                    border
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column label="操作">
                    <!--scope.$index:当前操作到第几行 scope.row：这一行对应的json对象 -->
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data() {
            return {
                pos: {
                    name: ''
                },
                positions: []
            }
        },
        //mounted是一个函数
        mounted(){
            this.initPositions();
        },
        methods:{
            //定义添加按钮的方法 添加的时候要做判断，看用户是否输入的值，如果没输入就给错误提示
            addPosition(){
                if (this.pos.name){
                    //this.pos ：参数是pos
                    this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
                        if(resp){
                            //添加成功之后需要把表格刷新一下  可以直接用initPositions，重新加载数据
                            this.initPositions();
                            this.pos.name='';
                        }
                    })
                } else {
                    this.$message.error("职位名称不可以为空");
                }
            },
            //定义编辑按钮的方法
            handleEdit(index,data){

            },
            //定义删除按钮的方法
            handleDelete(index,data){
                this.$confirm('此操作将永久删除【'+data.name+'】职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
                        if (resp){
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //定义一个初始化positions的方法
            initPositions(){
                //发送一个get请求去获取数据 请求地址是"/system/basic/pos/"
                this.getRequest("/system/basic/pos/").then(resp =>{
                    //判断如果resp存在的话，请求成功
                    if (resp){
                        //就把positions的值赋值歌resp就行了
                        this.positions=resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .addPosInput {
        width: 300px;
        margin-right: 8px;

    }
    .posManaMain{
        margin-top: 10px;
    }
</style>