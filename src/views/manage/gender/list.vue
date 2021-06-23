<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Gender Management</span>
        <el-button
          v-if="checkPermissionByRouterName('GenderCreate')"
          type="success"
          style="float: right"
          >Create</el-button
        >
      </div>
    </el-card>
  </div>
</template>
