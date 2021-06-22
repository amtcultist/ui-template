<template>
  <div :class="'upload-container uploadcontainer'">
    <!-- {{Url}} -->
    <div v-if="action == 'detail'">
      <span v-for="item in fileList" :key="item.id">
        <span
          style="color: #305bc1;"
        ><a :href="item.url + '?X-Token=' + tokenUser">{{
          item.name
        }}</a></span><br>
      </span>
    </div>
    <div v-else>
      <el-upload
        ref="upload"
        :class="'upload-file upfile file' + testRanDom"
        name="uploadfile"
        :on-change="handleChange"
        :before-remove="handleRemove"
        :before-upload="handleUploadFile"
        :on-success="handleSuccess"
        :file-list="fileListAll"
        :action="uploadUrl"
        :headers="headersToken"
        :limit="limitFile"
        :on-exceed="handleExceed"
      >
        <div>
          <el-button
            v-if="hideLimitFile != true || fileList.length != limitFile"
            slot="trigger"
            :class="'luuy' + testRanDom"
            size="small"
            type="primary"
          >Chọn tập tin</el-button>
        </div>
        <div
          v-if="checkSize == false"
          slot="tip"
          :class="'el-upload__tip luuy' + testRanDom"
          style="color: red;"
        >
          (Lưu ý: File đính kèm phải có dung lượng nhỏ hơn {{ textSize }})
        </div>
        <div
          v-if="hideLimitFile == true && fileList.length >= limitFile"
          slot="tip"
          :class="'max' + testRanDom"
          style="color: #2f6cde;margin-top: -20px;"
        >
          Bạn đã đính kèm tối đa tệp tin.
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
function getReadableFileSizeString(bytes,si) {
   var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1
    do {
        bytes /= thresh;
        ++u
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u]
}
import{ doUploadUrl} from '@/settings'
import { doUpload } from '@/api/core/attachment'
import { deleteOne } from '@/api/core/attachment'
import { getFileDinhKem } from '@/api/getfilesdinhkem'
import { getFileDinhKemAll } from '@/api/getfilesdinhkem'
import { getFileDinhKemSort } from '@/api/getfilesdinhkem'
import { getFileDinhKemAllSort } from '@/api/getfilesdinhkem'
import { getStoreToken } from '@/utils/request'
export default {
  name: 'singleFileUpload',
  props: ['listFile','limitFile','hideLimitFile','sizeFile','url','urls','sort','idList', 'isLoad','action' ],
  data() {
    return {
      tokenUser: '',
      testRanDom:'',
      checkRanDom:true,
      checkSize:true,
      size:50000000,
      textSize:'',
      id:0,
      uploadUrl: doUploadUrl,
      dataObj: { token: '', key: '' },
      headersToken: { 'X-Token': getStoreToken(), },
      fileListTest:2,
      fileListAll:[],
      fileList: [],
      id: 0,
      listTmp:[]
    }
  },
  created() {
    this.loadSelect()
    this.makeid()
  },
  watch: {
    isLoad(){
      this.fileList = []
      this.onFetch()
    },
    fileList() {
      if (this.fileList !== undefined && this.fileList != null  ) {
        for(var i = 0; i < this.fileList.length; i++){
          if(this.fileList[i].name === undefined || this.fileList[i].name == null || this.fileList[i].name === '' ){
            this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
          }
          if(this.fileList[i].url === undefined || this.fileList[i].url == null || this.fileList[i].url === '' ){
            this.$set(this.fileList[i], 'url', this.fileList[i].link)
          }
        }
       this.fileListAll=this.fileList
      } 
    }
  },
  methods: {
    loadSelect() {
      this.tokenUser = getStoreToken()
    },
    makeid() { 
      this.testRanDom = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 10; i++){
          this.testRanDom += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      this.onFetch()
    },
    onFetch() {
      if (this.idList === undefined || this.idList === null || this.idList < 0) {
        this.id = this.$router.history.current.query.id
      } else {
        this.id = this.idList
      }
      if(this.sizeFile != undefined || this.sizeFile >0 ){
        this.size=this.sizeFile
      }
      this.textSize=getReadableFileSizeString(this.size, true)
      if(this.id != undefined  && this.id >0){
            const urrlTmp=this.url
            const idTmp=this.id
            if(this.sort != undefined &&  this.sort == true){
                if(this.Urls== undefined || this.Urls.length==0){
                  getFileDinhKemSort(urrlTmp,idTmp).then(response => {
                    if(response.data.ids.length>0){
                      this.fileList=response.data.fileLists
                      for(var item of response.data.ids ){
                        const row = this.listFile.filter(word => word==item)
                        if(row.length===0){
                          const itemTmp=item
                          this.listFile.push(itemTmp)
                        }
                     }
                    }     
                  })
              }else if(this.Urls.length>0){
                  getFileDinhKemAllSort(urrlTmp,idTmp,this.Urls).then(response => {
                    if(response.data.ids.length>0){
                      const list=response.data.ids
                      for(var item of response.data.fileLists ){
                        const itemTmp=item
                        this.fileList.push(itemTmp)
                      }
                      for(var item of response.data.ids ){
                        const row = this.listFile.filter(word => word==item)
                        if(row.length===0){
                            const itemTmp=item
                            this.listFile.push(itemTmp)
                        }
                      }
                      this.fileListAll=this.fileList
                    }
                  })
              }

            }else{
                if(this.Urls== undefined || this.Urls.length==0){
                getFileDinhKem(urrlTmp,idTmp).then(response => {
                  if(response.data.ids.length>0){
                    this.fileList=response.data.fileLists 
                    for(var item of response.data.ids ){
                      const row = this.listFile.filter(word => word==item)
                        if(row.length===0){
                          const itemTmp=item
                          this.listFile.push(itemTmp)
                        }
                     }
                  }  
                })
            }else if(this.Urls.length>0){
                getFileDinhKemAll(urrlTmp,idTmp,this.Urls).then(response => {
                  if(response.data.ids.length>0){
                     const list=response.data.ids
                     for(var item of response.data.fileLists ){
                      const itemTmp=item
                      this.fileList.push(itemTmp)
                    }
                     for(var item of response.data.ids ){
                        const row = this.listFile.filter(word => word==item)
                        if(row.length===0){
                            const itemTmp=item
                            this.listFile.push(itemTmp)
                        }
                     }
                    this.fileListAll=this.fileList
                  }
                })
             }
            }        
        } else {
          this.fileList = []
        }
    },
    handleUploadFile(file){
        if(file.size>this.size){
            this.checkSize=false
            return false
        }else{
          this.checkSize=true
        } 
    },
    handleRemove(file, fileList) {
      if(file.size>this.size){
            this.checkSize=false
        }else{
          this.checkSize=true
        }
      return new Promise((resolve, reject) => {
        if(this.checkSize==true){
            this.$confirm(
            'File sẽ bị xóa trong hệ thống, bạn có muốn tiếp tục?',
            'Cảnh báo !',
            {
              confirmButtonText: 'Đồng ý',
              cancelButtonText: 'Hủy',
              type: 'warning'
            })
              .then(_ => {
                resolve()
                this.id=file.id
                if(file.id != undefined && file.id>0 ){
                  this.id=file.id
                }
                else if(file.response.id != undefined && file.response.id>0 ){
                  this.id=file.response.id
                }
                deleteOne(this.id).then(response => {
                    this.listFile.splice(this.listFile.indexOf(this.id), 1)
                    var  index = this.fileList.findIndex(x => x.id === this.id)
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
        }else{
          resolve()
                this.id=file.id
                if(file.id != undefined && file.id>0 ){
                  this.id=file.id
                }
                else if(file.response.id != undefined && file.response.id>0 ){
                  this.id=file.response.id
                }
                deleteOne(this.id).then(response => {
                  this.listFile.splice(this.listFile.indexOf(this.id), 1)
                  var  index = this.fileList.findIndex(x => x.id === this.id)
                  this.fileList.splice(index, 1)
              })
        }
      })
    },
    handleExceed(fileList) {
      this.$message({
        type: 'warning',
        message: `Bạn chỉ được chọn ${fileList.length} file, yêu cầu xóa file hiện tại để chọn lại!!!`});
    },

   handleSuccess(response, file, fileList) {
          const item={
              id:response.id,
              name:response.fileName,
              url:response.link
            }
            this.fileList.push(item)
            this.listFile.push(response.id)
            if(this.listFile.length==this.limitFile){
              if(this.hideLimitFile== true){
                  Array.filter( document.getElementsByClassName('luuy'+this.testRanDom+''), function(elem){    elem.style.display = 'none'; }) 
            }
          }
     },
    handleChange(file) {
    },
    handleUpload() {
      doUpload().then(response => {
      })
      this.$message({
        type: 'success',
        message: 'Xóa thành công'
      })
    }
  },
}
</script>
<style>
.upfile .el-upload{
     text-align: initial;
}
</style>
