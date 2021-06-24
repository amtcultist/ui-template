<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? 'Editing gender' : 'Creating new gender' }}</span>
        <router-link
          v-if="checkPermissionByRouterName('GenderManagementList')"
          :to="{ name: 'GenderManagementList', query: $route.query }"
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
          <el-input
            v-model="form.name"
            placeholder="Gender name"
            @input="handleInput()"
            @keypress.native="omitSpecialChar($event)"
          />
          <div v-if="!isFirstName">
            <span v-if="isLoadingName">
              <img :src="loadingImage" width="20px" style="margin-right: 5px" />
              Checking gender name validity
            </span>
            <span v-if="isValidName && !isLoadingName">
              <svg-icon icon-class="flat-tick" style="margin-right: 5px" />
              Gender name can be use
            </span>
            <span v-if="!isValidName && !isLoadingName">
              <svg-icon icon-class="flat-cross" style="margin-right: 5px" />
              Invalid gender name
            </span>
          </div>
        </el-form-item>
        <div style="text-align: center">
          <el-button
            type="primary"
            :disabled="isLoadingName || !isValidName || isSaved()"
            @click="saveHandler"
          >
            Confirm
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { checkPermissionByRouterName } from '@/utils/permission';
import _ from 'lodash';
import {
  create as createGender,
  findById as findGenderById,
  update as updateGender,
  validateByName as validateGenderByName,
} from '@/api/gender';
const defaultGender = {
  name: '',
};

export default {
  name: 'GenderManagementDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    loadingImage: {
      type: String,
      default: require('@/assets/gif/unblockable.gif'),
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
      form: Object.assign({}, defaultGender),
      timeoutName: null,
      isLoadingName: false,
      isValidName: true,
      isFirstName: true,
      savedForm: {},
      rules: {
        name: [{ validator: validateRequire, required: true, trigger: 'blur' }],
      },
    };
  },
  created() {
    if (this.isEdit) {
      this.fetchData();
    }
    this.syncSavedForm();
  },
  methods: {
    checkPermissionByRouterName,
    omitSpecialChar(e) {
      const charToBlock = '/';
      if (e.charCode === charToBlock.charCodeAt(0)) {
        e.preventDefault();
      }
    },
    handleInput() {
      if (
        !this.form.name ||
        this.form.name === '' ||
        this.form.name === this.savedForm.name
      ) {
        if (this.timeoutName) clearTimeout(this.timeoutName);
        return (this.isFirstName = true);
      }

      this.isFirstName = false;
      this.isLoadingName = true;
      if (this.timeoutName) clearTimeout(this.timeoutName);
      this.timeoutName = setTimeout(() => {
        validateGenderByName(this.form.name).then((response) => {
          this.isLoadingName = false;
          this.isValidName = response.data;
        });
      }, 1000);
    },
    syncSavedForm() {
      this.savedForm = _.cloneDeep(this.form);
    },
    fetchData() {
      if (!this.$route.params.id) return;

      findGenderById(this.$route.params.id).then((response) => {
        this.form = response.data;
        this.syncSavedForm();
      });
    },
    isSaved() {
      return JSON.stringify(this.form) === JSON.stringify(this.savedForm);
    },
    saveHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            createGender(this.form).then((response) => {
              this.syncSavedForm();

              /* Get response */
              const { _id, name } = response.data;

              /* Notify fire */
              this.$notify({
                title: 'New Gender created successfully',
                dangerouslyUseHTMLString: true,
                message: `
                <div>Gender Id: ${_id}</div>
                <div>Gender Name: ${name}</div>
              `,
                type: 'success',
              });

              /* Back to list */
              this.$router.push({
                name: 'GenderManagementList',
                query: this.$route.query,
              });
            });
          } else {
            updateGender(this.$route.params.id, this.form).then((response) => {
              this.syncSavedForm();

              /* Get response */
              const { _id, name } = response.data;

              /* Notify fire */
              this.$notify({
                title: 'Gender updated successfully',
                dangerouslyUseHTMLString: true,
                message: `
                <div>Gender Id: ${_id}</div>
                <div>Gender Name: ${name}</div>
              `,
                type: 'success',
              });

              /* Back to list */
              this.$router.push({
                name: 'GenderManagementList',
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
