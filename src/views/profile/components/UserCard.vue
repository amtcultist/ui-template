<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb width="100px" height="100px" :image="user.avatar">
          <div @click="uploadAvatarDialog()">
            <i class="el-icon-upload2" /><br>
            <span style="font-size:12px">Upload your avatar</span>
          </div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">
          {{ user.role | uppercaseFirst }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" /><span>Education</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" /><span>Skills</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="Upload your avatar"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="example-avatar">
        <div
          v-show="$refs.upload && $refs.upload.dropActive"
          class="drop-active"
        >
          <h3>Drop files to upload</h3>
        </div>
        <div v-show="!edit" class="avatar-upload">
          <div class="text-center p-2">
            <label for="avatar">
              <img
                :src="files.length ? files[0].url : user.avatar"
                class="rounded-circle"
              >
              <h4 class="pt-2">or<br>Drop files anywhere to upload</h4>
            </label>
          </div>
          <div class="text-center p-2">
            <file-upload
              ref="upload"
              v-model="files"
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              name="avatar"
              :drop="!edit"
              @input-filter="inputFilter"
              @input-file="inputFile"
            />
          </div>
        </div>

        <div v-show="files.length && edit" class="avatar-edit">
          <div v-if="files.length" class="avatar-edit-image">
            <img ref="editImage" :src="files[0].url">
          </div>
          <div class="text-center p-4">
            <button
              type="button"
              class="btn btn-secondary"
              @click.prevent="$refs.upload.clear"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="editSave"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb';
import FileUpload from 'vue-upload-component';
import Cropper from 'cropperjs';

export default {
  components: { PanThumb, FileUpload },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          id: ''
        };
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      files: [],
      edit: false,
      cropper: false
    };
  },
  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function() {
          if (!this.$refs.editImage) {
            return;
          }
          const cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
            viewMode: 1
          });
          this.cropper = cropper;
        });
      } else {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = false;
        }
      }
    }
  },
  methods: {
    uploadAvatarDialog() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.files = [];
    },
    editSave() {
      this.edit = false;
      const oldFile = this.files[0];
      const binStr = atob(
        this.cropper
          .getCroppedCanvas()
          .toDataURL(oldFile.type)
          .split(',')[1]
      );
      const arr = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      const file = new File([arr], oldFile.name, { type: oldFile.type });
      /* this.$refs.upload.update(oldFile.id, {
       file,
       type: file.type,
       size: file.size,
       active: true,
     })*/
      // console.log(file)
      const postData = {
        id: this.user._id,
        file: file
      };
      this.$store
        .dispatch('user/modifyAvatar', postData)
        .then(avatar => {
          // console.log('success')
          this.user.avatar = avatar;
          this.$message({
            message: 'Avatar change successfully',
            type: 'success',
            showClose: true,
            duration: 5 * 1000
          });
        })
        .catch(err => {
          this.$message({
            message: `Avatar change failed || ${err}`,
            type: 'error',
            showClose: true,
            duration: 5 * 1000
          });
          console.log('failed');
        });
    },
    alert(message) {
      alert(message);
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function() {
          this.edit = true;
        });
      }
      if (!newFile && oldFile) {
        this.edit = false;
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture');
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = '';
        const URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
    }
  }
};
</script>
<style>
.cropper-view-box {
  box-shadow: 0 0 0 1px #39f;
  border-radius: 50%;
  outline: 0;
}
.cropper-face {
  background-color: inherit !important;
}
.cropper-view-box {
  outline: inherit !important;
}
</style>
<style lang="scss" scoped>
.avatar-item:hover {
  opacity: 0;
}
.noHover {
  pointer-events: none;
}
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.example-avatar .avatar-upload .rounded-circle {
  width: 200px;
  height: 200px;
}
.example-avatar .text-center .btn {
  margin: 0 0.5rem;
}
.example-avatar .avatar-edit-image {
  max-width: 100%;
}
.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.example-avatar .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
