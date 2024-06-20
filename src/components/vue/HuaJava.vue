<script setup>
import {Delete, Edit} from '@element-plus/icons-vue'
import {ref} from 'vue'

import {ElMessage, ElMessageBox} from "element-plus";
import {getBlist,toadd,todelete,loginout,getSlist} from "@/api/score.js";
import {useTokenStore} from "@/store/token.js";
import router from "@/router/index.js";


const student = ref([

])
const vo=ref([]
)

const addStudeng = ref({
  name:'',
  teacher: '',
  ascore: '',
  bscore: '',
  cscore: '',
});


const list = async () => {
  const results = await getSlist();
  const resultb = await getBlist();
  student.value = results.data
  vo.value=resultb.data

}
list()


const dialogVisible = ref(false)
const showDialog = () => {
  dialogVisible.value = true
}

const toaddstu =async () => {
  const add=await toadd(addStudeng.value);
  ElMessage.success(add.message?add.message:'添加成功')
  list()
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
        await  todelete(row.name)
        ElMessage.success("删除成功")
        list()
      }
  )
}
const form=ref(null)
const out=async ()=>{
  const result=await loginout();
  tokenStore.removeToken()
  ElMessage.success("退出成功")
  router.push('/login')
}

const tokenStore=useTokenStore()


</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>
          <h1>以下学生没有考试资格 </h1>
 <ul>
   <h1> <li v-for="item in vo" :key="item">{{ item }}</li></h1>
    </ul>

        </span>
        <div class="extra">
          <el-button :icon="Edit" circle plain type="primary"@click="showDialog()" ></el-button>
          <el-button type="primary" @click="out()">退出</el-button>
        </div>
      </div>
    </template>
    <el-table :data="student" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="学号" prop="ascore"></el-table-column>
      <el-table-column label="班级" prop="teacher"></el-table-column>
      <el-table-column label="出勤1缺勤0" prop="bscore"></el-table-column>

      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>

    <!--     添加分类弹窗-->
    <el-dialog v-model="dialogVisible" width="30%">
      <el-form ref="form" :model="addStudeng"  label-width="100px" style="padding-right: 30px">
        <el-form-item label="姓名" prop="categoryName">
          <el-input v-model="addStudeng.name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="categoryAlias">
          <el-input v-model="addStudeng.teacher" minlength="1" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="categoryAlias">
          <el-input v-model="addStudeng.ascore" minlength="1" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="出勤" prop="categoryAlias">
          <el-input v-model="addStudeng.bscore" minlength="1" maxlength="15"></el-input>
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
</style>
