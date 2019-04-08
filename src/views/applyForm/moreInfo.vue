<template>
  <div class="more-apply__info">
    <back-to :backLink="srcRoute"/>
    <md-notice-bar>为了确保您能终审通过，请填写下列详细信息</md-notice-bar>
    <md-field title="个人信息" class="field-title">
      <select-item
        title="所在城市:"
        name="所在城市"
        align="center"
        :value.sync="userInfo.city"
        :picker-data="pickerData"
        picker-title="选择省市县"
        v-validate="'required'"
      />

      <input-validate
        v-model="userInfo.residentialAddress"
        title="住宅地址:"
        name="住宅地址"
        align="center"
        placeholder="请输入您的住宅地址"
        v-validate="'required'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('住宅地址')"
        clearable
      />

      <input-validate
        v-model="userInfo.personalEmail"
        type="email"
        title="邮箱:"
        name="邮箱"
        placeholder="请输入您的邮箱"
        v-validate="'required|email'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('邮箱')"
        clearable
      />

      <select-item
        title="婚姻状况:"
        name="婚姻状况"
        align="center"
        :value.sync="userInfo.maritalStatus"
        :picker-data="marrigePickerData"
        :picker-cols="1"
        picker-title="婚姻状况"
        v-validate="'required'"
      />

      <select-item
        title="教育程度:"
        name="教育程度"
        align="center"
        :value.sync="userInfo.educationLevel"
        :picker-data="educatePickerData"
        :picker-cols="1"
        picker-title="教育程度"
        v-validate="'required'"
      />

    </md-field>

    <!-- 2 -->
    <md-field title="工作信息" class="field-title no-valid">
      <input-validate
        v-model="userInfo.companyName"
        title="单位名称:"
        name="单位名称"
        placeholder="单位名称"
        clearable
      />

      <select-item
        title="单位城市:"
        name="单位城市"
        align="center"
        :value.sync="userInfo.companyCity"
        :picker-data="pickerData"
        picker-title="单位所在城市"
      />

      <input-validate
        v-model="userInfo.companyAdress"
        title="单位地址:"
        name="单位地址"
        placeholder="单位地址"
        clearable
      />

      <input-validate
        v-model="userInfo.companyPhone"
        title="单位电话:"
        name="单位电话"
        placeholder="单位电话"
        v-validate="'numeric|min:7'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('单位电话')"
        clearable
      />

      <input-validate
        v-model="userInfo.annualIncome"
        title="年收入(元):"
        name="年收入"
        placeholder="年收入"
        v-validate="'decimal:2'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('年收入')"
        clearable
      />

    </md-field>

    <!-- 3 -->
    <md-field title="联系人信息" class="field-title">
      <md-field title="联系人1:" class="field-contact__item">
        <input-validate
          v-model="userInfo.contactName"
          name="联系人姓名"
          placeholder="姓名"
          v-validate="'required'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人姓名')"
          clearable
        />

        <input-validate
          v-model="userInfo.contactPhone"
          type="phone"
          name="联系人手机号"
          placeholder="手机号"
          v-validate="'required|phone'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人手机号')"
          clearable
        />
      </md-field>

      <md-field title="联系人2:" class="field-contact__item">
        <input-validate
          v-model="userInfo.contactName2"
          name="联系人姓名"
          placeholder="姓名"
          v-validate="'required'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人姓名')"
          clearable
        />

        <input-validate
          v-model="userInfo.contactPhone2"
          type="phone"
          name="联系人手机号"
          placeholder="手机号"
          v-validate="'required|phone'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('联系人手机号')"
          clearable
        />
      </md-field>

      <md-field title="紧急联系人姓名1:" class="field-contact__item no-valid">
        <input-validate
                v-model="userInfo.contactName3"
                name="紧急联系人姓名（父/母）"
                placeholder="紧急联系人姓名（父/母）"
                v-validate="'required'"
                data-vv-value-path="innerValue"
                data-vv-validate-on="blur"
                :error="errors.first('紧急联系人姓名（父/母）')"
                clearable
        />

        <input-validate
                v-model="userInfo.contactPhone3"
                type="phone"
                name="紧急联系人电话（父/母）"
                placeholder="手机号"
                v-validate="'required|phone'"
                data-vv-value-path="innerValue"
                data-vv-validate-on="blur"
                :error="errors.first('紧急联系人电话（父/母）')"
                clearable
        />
      </md-field>

      <md-field title="紧急联系人姓名2:" class="field-contact__item no-valid">
        <input-validate
                v-model="userInfo.contactName4"
                name="紧急联系人姓名（配偶）"
                placeholder="紧急联系人姓名（配偶）"
                v-validate="'required'"
                data-vv-value-path="innerValue"
                data-vv-validate-on="blur"
                :error="errors.first('紧急联系人姓名（配偶）')"
                clearable
        />

        <input-validate
                v-model="userInfo.contactPhone4"
                type="phone"
                name="紧急联系人电话（配偶）"
                placeholder="紧急联系人电话（配偶）"
                v-validate="'required|phone'"
                data-vv-value-path="innerValue"
                data-vv-validate-on="blur"
                :error="errors.first('紧急联系人电话（配偶）')"
                clearable
        />
      </md-field>

    </md-field>

    <!-- 4 -->
    <md-field title="证明材料" class="field-title">
      <div class="upload-preview__wrapper">
        <div class="upload-preview__box">
          <ul class="image-reader-list">
            <!-- 工作证明 -->
            <template v-if="userInfo.product.id == 2 || userInfo.product.id ==3">
            <template v-if="imageList['readerGzzm'].length > 0">
              <li class="image-reader-item"
                  :style="{
                  'backgroundImage': `url(${imageList['readerGzzm'][0]})`,
                  'backgroundPosition': 'center center',
                  'backgroundRepeat': 'no-repeat',
                  'backgroundSize': 'cover'
                }">
                <md-icon
                        class="image-reader-item-del"
                        name="circle-cross"
                        color="#666"
                        @click.native="onDeleteImage('readerGzzm', 0)">
                </md-icon>
              </li>
            </template>
            <template v-else>
              <li class="image-reader-item add">
                <md-image-reader
                        name="readerGzzm"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        is-multiple
                ></md-image-reader>
                <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                <p>工作证明</p>
              </li>
            </template>
            <!-- 营业执照 -->
            <template v-if="imageList['readerYyzz'].length > 0">
              <li class="image-reader-item"
                  :style="{
                    'backgroundImage': `url(${imageList['readerYyzz'][0]})`,
                    'backgroundPosition': 'center center',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': 'cover'
                  }">
                <md-icon
                        class="image-reader-item-del"
                        name="circle-cross"
                        color="#666"
                        @click.native="onDeleteImage('readerYyzz', 0)">
                </md-icon>
              </li>
            </template>
            <template v-else>
              <li class="image-reader-item add">
                <md-image-reader
                        name="readerYyzz"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        is-multiple
                ></md-image-reader>
                <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                <p>营业执照</p>
              </li>
            </template>
            </template>
            <template v-if="userInfo.product.id == 2 || userInfo.product.id ==3">
            <!-- 房本 -->
            <template v-if="imageList['readerFb'].length > 0">
              <li class="image-reader-item"
                  :style="{
                    'backgroundImage': `url(${imageList['readerFb'][0]})`,
                    'backgroundPosition': 'center center',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': 'cover'
                  }">
                <md-icon
                        class="image-reader-item-del"
                        name="circle-cross"
                        color="#666"
                        @click.native="onDeleteImage('readerFb', 0)">
                </md-icon>
              </li>
            </template>
            <template v-else>
              <li class="image-reader-item add">
                <md-image-reader
                        name="readerFb"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        is-multiple
                ></md-image-reader>
                <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                <p>房本</p>
              </li>
            </template>
            <!-- 购房网签合同 -->
            <template v-if="imageList['readerWgqfht'].length > 0">
              <li class="image-reader-item"
                  :style="{
                    'backgroundImage': `url(${imageList['readerWgqfht'][0]})`,
                    'backgroundPosition': 'center center',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': 'cover'
                  }">
                <md-icon
                        class="image-reader-item-del"
                        name="circle-cross"
                        color="#666"
                        @click.native="onDeleteImage('readerWgqfht', 0)">
                </md-icon>
              </li>
            </template>
            <template v-else>
              <li class="image-reader-item add">
                <md-image-reader
                        name="readerWgqfht"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        is-multiple
                ></md-image-reader>
                <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                <p>购房网签合同</p>
              </li>
            </template>
            <!-- 其他材料 -->
            <template v-if="imageList['readerQtcl'].length > 0">
              <li class="image-reader-item"
                  :style="{
                    'backgroundImage': `url(${imageList['readerQtcl'][0]})`,
                    'backgroundPosition': 'center center',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': 'cover'
                  }">
                <md-icon
                        class="image-reader-item-del"
                        name="circle-cross"
                        color="#666"
                        @click.native="onDeleteImage('readerQtcl', 0)">
                </md-icon>
              </li>
            </template>
            <template v-else>
              <li class="image-reader-item add">
                <md-image-reader
                        name="readerQtcl"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        is-multiple
                ></md-image-reader>
                <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                <p>其他材料</p>
              </li>
            </template>
            </template>
          </ul>
        </div>
      </div>
    </md-field>


    <div class="footer-btn">
      <md-button @click="handleSubmit" :disabled="buttonLoading ? true: false">
        <template v-if="buttonLoading">
          <md-activity-indicator
            class="md-activity-indicator-css"
            type="carousel"
            :size="15"
            color="#fff"
            text-color="#fff"
          >提交中</md-activity-indicator>
        </template>
        <template v-else>提 交</template>
      </md-button>
    </div>

     <md-dialog
      :closable="false"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    >
      提交信息审核通过后我们将第一时间和您联系，请保存电话畅通！
    </md-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Picker, Field, FieldItem, InputItem, Icon, Button,ImageReader, Toast, NoticeBar, Dialog, ActivityIndicator } from 'mand-mobile'
  import { district } from '@/utils/district'
  import { educates, maritalStatus, deepClone } from '@/utils'
  import { Validator } from "vee-validate"
  import { savePersonInfo } from '@/api/product'
  import InputValidate from "@/components/InputValidate/index.vue"
  import SelectItem from '@/components/SelectItem/index.vue'
  import imageProcessor from 'mand-mobile/components/image-reader/image-processor'

  // 手机号验证器
  Validator.extend("phone", {
    getMessage: field => `请输入您有效的${field}`,
    validate: value => /^1[34578][0-9]{9}$/.test(value)
  })

  export default {
    name: 'MoreApplyInfoForm',
    /* eslint-disable */
    components: {
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [NoticeBar.name]: NoticeBar,
      [ImageReader.name]: ImageReader,
      [Dialog.name]: Dialog,
      [ActivityIndicator.name]: ActivityIndicator,
      InputValidate,
      SelectItem
    },
    data() {
      return {
        buttonLoading: false,
        pickerData: district, // 省市县
        marrigePickerData: maritalStatus, // 婚姻状况
        educatePickerData: educates, // 教育程度
        imageList: {
          readerGzzm: [],
          readerYyzz: [],
          readerFb: [],
          readerWgqfht: [],
          readerQtcl: []
        },
        actDialog: {
          open: false,
          btns: [
            {
              text: '取消',
              handler: this.onActCancel,
            },
            {
              text: '确认提交',
              handler: this.onActConfirm,
            },
          ],
        },
        personalData: null,
        // 路由来源
        srcRoute: ''
      }
    },
    computed: {
      ...mapGetters([
        'personalInfo',
        'product',
        'user'
      ]),
      userInfo() {
        this.personalInfo.product = this.product
        return deepClone(this.personalInfo || {})
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.srcRoute = from.path
      })
    },
    created() {
      if (!this.$route.params.auth || !this.product) {
        this.$router.push({ path: '/center' })
      }
    },
    methods: {
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        this.actDialog.open = false
        this.buttonLoading = true
        this.submitForm()
      },
      handleSubmit() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            this.actDialog.open = true
              // 如果

          } else {
            return false
          }
        })
      },
    onReaderSelect() {
      Toast.loading('图片读取中...')
    },
    onReaderComplete(name, { dataUrl, blob, file }) {
      const fileSize = file && file.size
      if (fileSize > 5 * 1024 * 1024) {
        Toast.info('图片不能大于 5M！')
        return
      }
      const imageList = []
      imageProcessor({
        dataUrl,
        quality: 0.8
      }).then(({dataUrl}) => {
        if (dataUrl) {
          imageList.push(dataUrl)
          imageList.push(file.type)
        }
      })
      this.$set(this.imageList, name, imageList)
      Toast.hide()
    },
    onReaderError(name, {msg}) {
      Toast.failed(msg)
    },
    onDeleteImage(name, index) {
      const imageList = []
      imageList.splice(index, 1)
      this.$set(this.imageList, name, imageList)
    },
      submitForm() {
         // 添加照片处理
        const gzzm = this.imageList.readerGzzm[0]
        const yyzz = this.imageList.readerYyzz[0]
        const fb = this.imageList.readerFb[0]
        const wgqfht = this.imageList.readerWgqfht[0]
        const qtcl = this.imageList.readerQtcl[0]
        let userinfolet

        // 针对第二个商品进行处理
        if (this.userInfo.product ==2 || this.userInfo.product.id ==3){
          // 工作证明
          if(gzzm){
            userinfolet = Object.assign({}, this.userInfo, {
              workNamePhoto: gzzm.substring(gzzm.indexOf(',') + 1, gzzm.length),
              workNamePhotoType: this.imageList.readerGzzm[1]
            })
          }

          // 营业执照
         else if (yyzz){
            userinfolet = Object.assign({}, userinfolet, {
            businessLicensePhoto: yyzz.substring(yyzz.indexOf(',') + 1, yyzz.length),
                    businessLicensePhotoType: this.imageList.readerYyzz[1]})
          }
        //房本
       else if (fb){
          userinfolet = Object.assign({}, userinfolet, {
            businessLicensePhoto: yyzz.substring(yyzz.indexOf(',') + 1, yyzz.length),
            businessLicensePhotoType: this.imageList.readerYyzz[1]})
        }
        //网购签房合同
       else if(wgqfht){
          userinfolet = Object.assign({},userinfolet,{
            purchaseAHouseNetworkContract: wgqfht.substring(wgqfht.indexOf(',') + 1, wgqfht.length),
            purchaseAHouseNetworkContractType: this.imageList.readerWgqfht[1]})
        }
          //其他材料
         else if (qtcl){
            userinfolet = Object.assign({},userinfolet,{
              otherPhoto: qtcl.substring(qtcl.indexOf(',') + 1, qtcl.length),
              otherPhotoType: this.imageList.readerQtcl[1]})
          }else {
            userinfolet = this.userInfo
          }

        }else {
          userinfolet = this.userInfo
        }
        savePersonInfo(userinfolet, 'PUT').then(response => {
          if (response.status === 200) {
            this.$router.push({ name: 'NoticePage', params: { auth: true } })
          } else {
            this.buttonLoading = false
          }
        }).catch(err => {
          this.buttonLoading = false
          console.error(err)
        })
      }
    }
  }
</script>

<style lang="scss">
  .more-apply__info {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    .field-title {
      & > .md-field-title {
        color: #2c3e50;
        font-size: 30px;
        font-weight: 400;
      }
    }
    .field-contact__item .md-field-title::before,
    .field-title .md-field-item-title::before {
      content: '*';
      padding-top: 5px;
      padding-right: 5px;
      color: #ff525d;
    }

    .field-contact__item.no-valid .md-field-title::before,
    .field-title.no-valid .md-field-item-title::before {
      content: '';
    }

    .upload-preview__wrapper {
      position: relative;
      // left: 30px;
      width: 100%;
      overflow: hidden;
    }
    .upload-preview__box {
      &::after {
        content: "";
        clear: both;
        display: table;
      }
    }
    .image-reader-list {
      float: left;
      width: 100%;
      margin: 0;
    }
    .image-reader-item {
      float: left;
      width: 44%;
      padding-bottom: 30%;
      margin-bottom: 2%;
      margin-right: 2%;
      margin-left: 3%;
      background: #fff;
      box-sizing: border-box;
      list-style: none;
      border-radius: 4px;
      position: relative;
      background-size: cover;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      &.add {
        .md-icon {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%,-50%);
          opacity: .5;
          &.md {
            width: 40px;
            height: 40px;
          }
        }
        p {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          margin-top: 15px;
          font-size: 30px;
          color: #ccc;
          text-align: center;
        }
      }
      .image-reader-item-del {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 3;
        background: #eee;
        border-radius: 50%;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 2px dashed #d9d9d9;
        box-sizing: border-box;
        transform-origin: 0 0;
        transform: scale(.5);
        z-index: 2;
      }
    }
    .footer-btn {
      width: 95%;
      margin: 30px auto;
      .md-button.primary.large {
        border-radius: 10px;
      }
      .md-activity-indicator-css {
        margin-bottom: 0;
        .md-activity-indicator-svg {
          height: 15px !important;
        }
      }
    }
  }
</style>
