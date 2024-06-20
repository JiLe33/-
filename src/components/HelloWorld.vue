<script setup>
import {Delete, Edit} from '@element-plus/icons-vue'
import {ref} from 'vue'

import {ElMessage, ElMessageBox} from "element-plus";
import {getlist, getlistscore, toadd, todelete,loginout} from "@/api/student.js";
import {useTokenStore} from "@/store/token.js";
import router from "@/router/index.js";

const student = ref([

])
const vo=ref([]
)

const addStudeng = ref({
  studnetId: '',
  studentName: '',
  studentScore: ''
});
const list = async () => {
  const result = await getlist();
const resultvo=await getlistscore()
  student.value = result.data
 vo.value = resultvo.data
}
list()
const toaddstu =async () => {
  const add=await toadd(addStudeng.value);
  ElMessage.success(add.message?add.message:'添加成功')
  list()
}

const dialogVisible = ref(false)
const showDialog = (row) => {
  dialogVisible.value = true
}

const deleteCategory = (row) => {
  ElMessageBox.confirm(
      '你确认要删除该学生信息吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
  ).then(
      async () => {
        await  todelete(row.studentId)
        ElMessage.success("删除成功")
     list()
      }
  )
}

const form=ref(null)


const tokenStore=useTokenStore()
const out=async ()=>{
  const result=await loginout();
  tokenStore.removeToken()
  ElMessage.success("退出成功")
router.push('/login')
}



</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>后台</span>
       <h1>优秀:{{vo.a}} 良好:{{vo.b}} </h1>
        <div class="extra">
          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
          <el-button type="primary" @click="out()">退出</el-button>
        </div>
      </div>
    </template>
    <el-table :data="student" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="学生id" prop="studentId"></el-table-column>
      <el-table-column label="学生姓名" prop="studentName"></el-table-column>
      <el-table-column label="学生成绩" prop="studentScore"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>

    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" width="30%">
      <el-form ref="form" :model="addStudeng"  label-width="100px" style="padding-right: 30px">
        <el-form-item label="学生id" prop="categoryName">
          <el-input v-model="addStudeng.studentId" minlength="1" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="categoryAlias">
          <el-input v-model="addStudeng.studentName" minlength="1" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="学生成绩" prop="categoryAlias">
          <el-input v-model="addStudeng.studentScore" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="toaddstu();dialogVisible=false;"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

table {
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}


</style>
