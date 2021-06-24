<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Role List</span>
        <router-link
          v-if="checkPermissionByRouterName('RoleManagementCreate')"
          :to="{ name: 'RoleManagementCreate', query: params }"
        >
          <el-button style="float: right" type="primary" icon="el-icon-plus">
            Create new role
          </el-button>
        </router-link>
      </div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button
            style="float: left"
            :icon="
              showSearch === false ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
            "
            type="text"
            @click="showSearch = !showSearch"
          >
            Show search fields
          </el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div
          v-if="
            showSearch === true &&
            checkPermissionByRouterName('RoleManagementSearch')
          "
        >
          <el-form label-width="100px">
            <el-row :gutter="20">
              <el-col :span="12" align="center">
                <el-form-item label="Name:">
                  <el-input v-model="name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Permissions:">
                  <el-select
                    v-model="permissions"
                    multiple
                    placeholder="Select permissions to search"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in permissionsList"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" align="center">
                <el-form-item label-width="0px">
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click="onSearch()"
                    >Search</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
      <el-table v-loading.body="listLoading" :data="list">
        <el-table-column
          label="#"
          prop="index"
          align="center"
          min-width="5%"
          border
          style="width: 100%; margin-top: 10px"
        />
        <el-table-column
          label="Name"
          prop="name"
          align="center"
          min-width="15%"
        />
        <el-table-column
          label="Description"
          prop="description"
          align="center"
          min-width="65%"
        />
        <el-table-column align="center" label="Operations" min-width="15%">
          <template slot-scope="scope">
            <el-button
              :disabled="
                !checkPermissionByRouterName('RoleManagementEdit') ||
                scope.row.name === 'ROLE_ADMIN'
              "
              type="primary"
              size="small"
              @click="handleEdit(scope.row._id)"
            >
              Edit
            </el-button>
            <el-button
              :disabled="
                !checkPermissionByRouterName('RoleManagementDelete') ||
                scope.row.name === 'ROLE_ADMIN'
              "
              type="danger"
              size="small"
              @click="handleDelete(scope.row._id)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template>
        <el-pagination
          align="center"
          style="margin-top: 15px"
          :current-page.sync="page"
          :page-sizes="[5, 10, 20, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </el-card>
  </div>
</template>
<script>
import { getRoles, deleteRole } from '@/api/role';
import { checkBoolean } from '@/utils';
import {
  checkPermissionByRouterName,
  getChildrenNames,
  getRoutes,
} from '@/utils/permission';
export default {
  data() {
    return {
      listLoading: false,
      list: [],
      permissionsList: [],
      // Default params
      total: 0,
      params: {},
      page: this.$route.query.currentPage
        ? Number(this.$route.query.currentPage)
        : 1,
      limit: this.$route.query.size ? Number(this.$route.query.size) : 20,
      sort: this.$route.query.sort ? this.$route.query.sort : 'updatedAt',
      sortDir: this.$route.query.sortDir ? this.$route.query.sortDir : '-',
      name: this.$route.query.name ? this.$route.query.name : '',
      permissions: this.$route.query.permissions
        ? this.$route.query.permissions
        : [],
      showSearch: this.$route.query.showSearch
        ? checkBoolean(this.$route.query.showSearch)
        : false,
    };
  },
  created() {
    this.fetchRouteOptions();
    this.onFetch();
  },
  methods: {
    checkPermissionByRouterName,
    fetchRouteOptions() {
      this.permissionsList = getChildrenNames(getRoutes());
    },
    buildParams() {
      this.params = {
        page: this.page,
        limit: this.limit,
        sortBy: `${this.sortDir}${this.sort}`,
        sort: this.sort,
        sortDir: this.sortDir,
        showSearch: this.showSearch,
        name: this.name,
        permissions: this.permissions,
      };
    },
    onFetch() {
      this.listLoading = true;
      this.buildParams();
      getRoles(this.params).then((response) => {
        this.list = response.data.docs.map((item, index) => ({
          index: index + 1,
          ...item,
        }));
        this.total = response.data.totalDocs;
        this.listLoading = false;
      });
    },
    handleDelete(id) {
      this.$confirm('Do you want to remove this role ?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          deleteRole(id).then(() => {
            this.$message({
              type: 'success',
              message: 'Delete successfully!',
            });
            this.onFetch();
          });
        })
        .catch(() => {});
    },
    handleEdit(id) {
      this.$router.push({
        name: 'RoleManagementEdit',
        params: { id },
        query: this.params,
      });
    },
    onSearch() {
      this.page = 1;
      this.onFetch();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.onFetch();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.onFetch();
    },
  },
};
</script>
