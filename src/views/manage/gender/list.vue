<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Gender Management List</span>
        <router-link
          v-if="checkPermissionByRouterName('GenderManagementCreate')"
          :to="{ name: 'GenderManagementCreate', query: params }"
        >
          <el-button type="primary" style="float: right" icon="el-icon-plus">
            Create new gender
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
            checkPermissionByRouterName('GenderManagementSearch')
          "
        >
          <el-form label-width="100px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Name:">
                  <el-input v-model="name" />
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
        <el-table-column align="center" label="Operations" min-width="15%">
          <template slot-scope="scope">
            <el-button
              :disabled="!checkPermissionByRouterName('GenderManagementEdit')"
              type="primary"
              size="small"
              @click="handleEdit(scope.row._id)"
            >
              Edit
            </el-button>
            <el-button
              :disabled="!checkPermissionByRouterName('GenderManagementDelete')"
              type="danger"
              size="small"
              @click="handleDelete(scope.row._id)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { checkPermissionByRouterName } from '@/utils/permission';
import { checkBoolean } from '@/utils';
import { findAll as findAllGenders } from '@/api/gender';

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      // Params field
      total: 0,
      params: {},
      page: this.$route.query.currentPage
        ? Number(this.$route.query.currentPage)
        : 1,
      limit: this.$route.query.size ? Number(this.$route.query.size) : 20,
      sort: this.$route.query.sort ? this.$route.query.sort : 'updatedAt',
      sortDir: this.$route.query.sortDir ? this.$route.query.sortDir : '-',
      name: this.$route.query.name ? this.$route.query.name : '',
      showSearch: this.$route.query.showSearch
        ? checkBoolean(this.$route.query.showSearch)
        : false,
    };
  },
  created() {
    this.onFetch();
  },
  methods: {
    checkPermissionByRouterName,
    buildParams() {
      this.params = {
        page: this.page,
        limit: this.limit,
        sortBy: `${this.sortDir}${this.sort}`,
        sort: this.sort,
        sortDir: this.sortDir,
        showSearch: this.showSearch,
        name: this.name,
      };
    },
    onFetch() {
      this.listLoading = true;
      this.buildParams();
      findAllGenders(this.params).then((response) => {
        this.list = response.data.docs.map((item, index) => ({
          index: index + 1,
          ...item,
        }));
        this.total = response.data.totalDocs;
        this.listLoading = false;
      });
    },
    handleEdit(id) {
      this.$router.push({
        name: 'GenderManagementEdit',
        params: { id },
        query: this.params,
      });
    },
  },
};
</script>
