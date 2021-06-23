<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? 'Editing role' : 'Creating new role' }}</span>
        <router-link
          v-if="checkPermissionByRouterName('RoleManagementList')"
          :to="{ name: 'RoleManagementList', query: $route.query }"
        >
          <el-button style="float: right" icon="el-icon-back"> Back </el-button>
        </router-link>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="90px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item prop="name" label="Name">
          <el-input v-model="form.name" placeholder="Role name" />
        </el-form-item>
        <el-form-item prop="description" label="Description">
          <el-input
            v-model="form.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Role description"
          />
        </el-form-item>
        <el-form-item prop="permissions" label="Permissions">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="name"
            class="permission-tree"
            default-expand-all
            @check-change="syncCheckedKeys()"
          />
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" :disabled="isSaved()" @click="saveHandler">
            Confirm
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import path from 'path';
import { getRoutes, checkPermissionByRouterName } from '@/utils/permission';
import _ from 'lodash';
import { createRole, findById as findRoleById, updateRole } from '@/api/role';

const defaultRole = {
  name: '',
  description: '',
  permissions: [],
};

export default {
  name: 'RoleManagementDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(rule.field + ' is required'));
      } else {
        callback();
      }
    };
    return {
      form: Object.assign({}, defaultRole),
      savedForm: {},
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      rules: {
        name: [{ validator: validateRequire, required: true, trigger: 'blur' }],
      },
    };
  },
  computed: {
    routesData() {
      return this.routes;
    },
  },
  created() {
    this.getRoutes(); // Get all route from router
    if (this.isEdit) {
      this.fetchData();
    }
    this.syncSavedForm();
  },
  methods: {
    checkPermissionByRouterName,
    syncSavedForm() {
      this.savedForm = _.cloneDeep(this.form);
    },
    syncCheckedKeys() {
      /* Get checked */
      const checkedKeys = this.$refs.tree.getCheckedKeys();

      /* Set */
      this.form.permissions = checkedKeys;
    },
    fetchData() {
      if (!this.$route.params.id) return;

      findRoleById(this.$route.params.id).then((response) => {
        /* Get data */
        this.form = response.data;
        /* Check into key */
        this.$refs.tree.setCheckedKeys(this.form.permissions);

        /* Sync saved */
        this.syncSavedForm();
      });
    },
    isSaved() {
      return JSON.stringify(this.form) === JSON.stringify(this.savedForm);
    },
    getRoutes() {
      this.serviceRoutes = getRoutes();
      this.routes = this.generateRoutes(getRoutes());
    },
    generateRoutes(routes, basePath = '/') {
      const res = [];

      for (let route of routes) {
        // skip some route
        if (route.path === '*') {
          continue;
        }
        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        );

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          name: route.name,
        };

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      return res;
    },
    generateArr(routes) {
      let data = [];
      routes.forEach((route) => {
        data.push(route);
        if (route.children) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null;
      const showingChildren = children;
      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0];
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
        return onlyOneChild;
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return onlyOneChild;
      }

      return false;
    },
    saveHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            createRole(this.form).then((response) => {
              this.syncSavedForm();

              /* Get response */
              const { description, _id, name } = response.data;

              /* Notify fire */
              this.$notify({
                title: 'New Role created successfully',
                dangerouslyUseHTMLString: true,
                message: `
                <div>Role Id: ${_id}</div>
                <div>Role Name: ${name}</div>
                <div>Description: ${description}</div>
              `,
                type: 'success',
              });

              /* Back to list */
              this.$router.push({
                name: 'RoleManagementList',
                query: this.$route.query,
              });
            });
          } else {
            updateRole(this.$route.params.id, this.form).then((response) => {
              this.syncSavedForm();

              /* Get response */
              const { description, _id, name } = response.data;

              /* Notify fire */
              this.$notify({
                title: 'Role updated successfully',
                dangerouslyUseHTMLString: true,
                message: `
                <div>Role Id: ${_id}</div>
                <div>Role Name: ${name}</div>
                <div>Description: ${description}</div>
              `,
                type: 'success',
              });

              /* Back to list */
              this.$router.push({
                name: 'RoleManagementList',
                query: this.$route.query,
              });
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
