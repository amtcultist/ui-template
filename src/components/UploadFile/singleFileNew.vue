<template>
  <div v-if="detail">
    <span v-for="item in fileList" :key="item.id">
      <span
        style="color: #305bc1;"
      ><a :href="item.url + '?X-Token=' + xToken">{{ item.name }}</a></span><br>
    </span>
  </div>
  <div v-else>
    <el-upload
      ref="upload"
      :class="'upload-file upfile file' + testRanDom"
      name="uploadfile"
      :action="action"
      :on-change="handleChange"
      :before-remove="handleRemove"
      :before-upload="handleUploadFile"
      :on-success="handleSuccess"
      :file-list="fileList"
      :limit="limitFile"
      :headers="headersToken"
      :on-preview="handlePreview"
      :file-dinh-kem-ids="fileDinhKemIds"
    >
      <el-button
        v-if="fileList !== null && limitFile > fileList.length"
        slot="trigger"
        :class="'luuy' + testRanDom"
        size="small"
        type="primary"
      >Chọn tập tin</el-button>
      <div
        v-else
        slot="tip"
        :class="'max' + testRanDom"
        style="color: #2f6cde;margin-top: -35px;"
      >
        Bạn đã đính kèm tối đa tệp tin.
      </div>
      <!-- <div>
        <el-button v-if="hideLimitFile != true || fileList.length != limitFile" slot="trigger" :class="'luuy'+testRanDom" size="small" type="primary">Chọn tập tin</el-button>
      </div>
      <div v-if="checkSize ==false" slot="tip" :class="'el-upload__tip luuy'+testRanDom" style="color: red;">(Lưu ý: File đính kèm phải có dung lượng nhỏ hơn {{ textSize }})</div>
      <div v-if=" hideLimitFile ==true && fileList.length >= limitFile" slot="tip" :class="'max'+testRanDom" style="color: #2f6cde;margin-top: -20px;">Bạn đã đính kèm tối đa tệp tin.</div> -->
    </el-upload>
    <!-- </div> -->
    <!-- <span> {{ fileDinhKemIds }} + {{ limitFile }} + {{ limitFile >= fileList.length }} + {{ fileList.length }} </span> -->
  </div>
</template>
<script>
import { doUpload, deleteOne } from '@/api/core/attachment'
import store from '@/store'
import defaultSettings from '@/settings'
export default {
  name: 'SingleFileUploadNew',
  props: {
    action: {
      type: String,
      default() {
        return defaultSettings.doUploadUrl
      }
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    limitFile: {
      type: Number,
      default: 1
    },
    allowFileTypes: {
      type: Array,
      default() {
        return []
      }
    },
    fileDinhKemIds: {
      type: Array,
      default() {
        return []
      }
    },
    detail: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      mimeTypes: {
        'audio/mp4': 'm4a|f4a|f4b',
        'audio/ogg': 'oga|ogg',
        'audio/&': 'mid|midi|mp3|wav',
        'application/javascript': 'js|jsonp',
        'application/json': 'json',
        'application/msword': 'doc|dot',
        'application/octet-stream': 'bin',
        'application/postscript': 'ai',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          'pptx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          'xlsx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          'docx',
        'application/vnd.ms-excel': 'xla|xls|xlt',
        'application/vnd.ms-fontobject': 'eot',
        'application/vnd.ms-powerpoint': 'pot|ppa|pps|ppt',
        'application/x-shockwave-flash': 'swf',
        'application/xml': 'atom|rdf|rss|xml',
        'application/&': 'pdf|rtf|zip',
        'application/pdf': 'pdf',
        'font/opentype': 'otf',
        'font/&': 'ttf|ttc|woff',
        'image/jpeg': 'jpe|jpeg|jpg',
        'image/svg+xml': 'svg|svgz',
        'image/vnd.adobe.photoshop': 'psd',
        'image/vnd.microsoft.icon': 'ico',
        'image/&': 'bmp|ief|gif|png|tif|tiff|webp',
        'text/cache-manifest': 'appcache|manifest',
        'text/plain': 'txt',
        'text/x-component': 'htc',
        'text/x-vcard': 'vcf',
        'text/&': 'css|html|php|vtt',
        'text/x-&': 'markdown|md',
        'video/mp4': 'mp4|m4v|f4v|f4p',
        'video/ogg': 'ogv',
        'video/quicktime': 'mov|qt',
        'video/&': 'avi|mpg|vdo|viv|vivo|webm',
        'video/x-&': 'flv'
      },
      xToken: store.getters.token,
      headersToken: { 'X-Token': store.getters.token },
      fileListSize: this.limitFile
    }
  },
  created() {
    this.makeid()
  },
  methods: {
    makeid() {
      this.testRanDom = ''
      var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < 10; i++) {
        this.testRanDom += possible.charAt(
          Math.floor(Math.random() * possible.length)
        )
      }
      this.onFetch()
    },
    onFetch() {},
    handleUploadFile(file) {
      var obj = this.mimeTypes
      const allowFileTypes = ['doc', 'docx', 'pdf', 'xlsx', 'xls']
      var allowMimeFileTypes = []
      Object.keys(obj).forEach(function eachKey(key) {
        var splitObj = obj[key].split('|')
        if (splitObj) {
          splitObj.forEach(function eachKey(sObj) {
            if (allowFileTypes.includes(sObj)) {
              allowMimeFileTypes.push(key)
            }
          })
        }
      })
      const checkTypeFile = allowMimeFileTypes.includes(file.type)
      const checkLimitSize = file.size / 1024 / 1024 < 50
      if (!checkLimitSize) {
        this.$message.error('Không up file có dung lượng quá 50MB!')
      }
      if (!checkTypeFile) {
        this.$message.error('Up file không đúng định dạng cho phép!')
      }
      return checkTypeFile && checkTypeFile
    },
    handleRemove(file, fileList) {
      return new Promise((resolve, reject) => {
        this.$confirm(
          'File sẽ bị xóa trong hệ thống, bạn có muốn tiếp tục?',
          'Cảnh báo !',
          {
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
            type: 'warning'
          }
        )
          .then(_ => {
            resolve()
            let fileDinhKemId = 0
            if (file.id !== undefined && file.id > 0) {
              fileDinhKemId = file.id
            } else if (file.response.id !== undefined && file.response.id > 0) {
              fileDinhKemId = file.response.id
            }
            deleteOne(fileDinhKemId).then(response => {
              this.fileDinhKemIds.splice(
                this.fileDinhKemIds.indexOf(fileDinhKemId),
                1
              )
              var index = this.fileList.findIndex(x => x.id === fileDinhKemId)
              this.fileList.splice(index, 1)
              this.$message({
                type: 'success',
                message: 'Xóa thành công'
              })
            })
          })
          .catch(_ => {
            reject()
          })
      })
    },
    handleSuccess(response, file, fileList) {
      const item = {
        id: response.id,
        name: response.fileName,
        url: response.link
      }
      if (this.fileList !== undefined && !this.fileList.includes(item)) {
        this.fileList.push(item)
      }
      if (!this.fileDinhKemIds.includes(response.id)) {
        this.fileDinhKemIds.push(response.id)
      }
      console.log(this.fileDinhKemIds)
    },
    handleChange(file) {},
    handlePreview(file) {
      console.log('file:' + JSON.stringify(file))
      const link = document.createElement('a')
      link.href = file.url + '?X-Token=' + this.xToken
      link.download = file.name
      link.target = '_blank'
      document.body.appendChild(link)
      console.log('link:' + link)
      link.click()
      link.remove()
    },
    handleUpload() {
      doUpload().then(response => {
        console.log(response.data)
      })
    }
  }
}
</script>
