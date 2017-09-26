<template>
  <div class="new-address">
    <div class="address-head is-flex flex-center flex-vcentered is-size-medium">
      填写收获地址
    </div>
    <div class="address-content">
      <div class="fields is-flex flex-center flex-vcentered">
        <div class="column is-3 has-text-right">
          收件人：
        </div>
        <div class="column is-9 has-text-left">
          <input type="text" class="input is-primary" v-model.trim="addressModel.name" placeholder="请输入您的大名">
        </div>
      </div>
      <div class="fields is-flex flex-center flex-vcentered">
        <div class="column is-3 has-text-right">
          手机号码：
        </div>
        <div class="column is-9 has-text-left">
          <input type="text" class="input is-primary" v-model.trim="addressModel.mobile" placeholder="请输入您的手机号码">
        </div>
      </div>
      <div class="fields is-flex flex-center flex-vcentered">
        <div class="column is-3 has-text-right">
          所在地区：
        </div>
        <div class="column is-9 has-text-left">
          <city-select @onSelect="onSelect" style="width:100%;margin-top: -1rem; margin-bottom:-1rem"></city-select>
        </div>
      </div>
      <div class="fields is-flex flex-center flex-vcentered">
        <div class="column is-3 has-text-right">
          详细地址：
        </div>
        <div class="column is-9 has-text-left">
          <input type="text" class="input is-primary" v-model.trim="addressModel.address" placeholder="请输入您的地址">
        </div>
      </div>
      <div class="fields is-flex flex-center flex-vcentered" v-show="errorHint && !loading">
        <div class="column is-3 has-text-right is-warning">
          提示：
        </div>
        <div class="column is-9 has-text-left is-warning">
          {{errorHint}}
        </div>
      </div>
      <div class="fields is-flex flex-center flex-vcentered">
        <a class="button btn-save-address" @click="handleSubmit"></a>
      </div>
    </div>
  </div>
</template>
<script>
import citySelect from 'common/components/citySelect/citySelect'
import Toast from 'common/components/toast'

import {
  required,
} from 'vuelidate/lib/validators'
import {
  minLength,
  maxLength,
  isValidMobileNumber
} from 'common/js/utils'

export default {
  components: {
    citySelect
  },
  mounted: function() {},
  computed: {
    order_id() {
      return this.$route.params && this.$route.params.order_id
    },
    action() {
      return this.$route.params && this.$route.params.action ? this.$route.params.action : ""
    },
    errorHint: function() {
      if (!this.$v.addressModel.name.required) {
        return "请输入您的大名"
      } else if (!this.$v.addressModel.name.minLength) {
        return "姓名至少两个字"
      } else if (!this.$v.addressModel.name.maxLength) {
        return "姓名太长了"
      } else if (!this.$v.addressModel.mobile.required) {
        return "请输入您的手机号码"
      } else if (!this.$v.addressModel.mobile.isValidMobileNumber) {
        return "请输入正确的手机号码"
      } else if (!this.$v.addressModel.area.required) {
        return "请选择您所在的地区"
      } else if (!this.$v.addressModel.address.required) {
        return "请输入您的地址"
      } else if (!this.$v.addressModel.address.minLength) {
        return "地址太短了"
      } else if (!this.$v.addressModel.address.maxLength) {
        return "地址太长了"
      }

      return ''
    }
  },
  data: function() {
    return {
      loading: true,
      processing: false,
      addressModel: {
        mobile: '',
        name: '',
        address: '',
        area: '',
        area_code: '',
      },
      province: '',
      city: '',
      district: '',
      provinceCode: '',
      cityCode: '',
      districtCode: ''
    }
  },

  validations: {
    addressModel: {
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(50)
      },
      mobile: {
        required,
        isValidMobileNumber
      },
      address: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(250)
      },
      area: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(90)
      },
      area_code: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    onSelect: function(province, city, district) {
      this.province = province.name
      this.provinceCode = province.code
      this.city = city.name
      this.cityCode = city.code
      this.district = district.name
      this.districtCode = district.code

      this.addressModel.area = this.district == "" ? null : this.province + "-" + this.city + "-" +
        this.district
      this.addressModel.area_code = this.districtCode == "" ? null : this.provinceCode + "-" +
        this.cityCode +
        "-" + this.districtCode
    },
    handleSubmit: async function() {
      if (!this.processing) {
        this.loading = false
        this.processing = true
        let msg = this.errorHint
        if (msg != '') {
          return
        }

        var data = {
          order_id: this.order_id,
          user_address: {
            name: this.addressModel.name,
            mobile: this.addressModel.mobile,
            area: this.addressModel.area,
            area_code: this.addressModel.area_code,
            address: this.addressModel.address
          }
        }

        let result;
        if (this.action == "exchange") {
          result = await this.$acs.updateAddress(data)
        } else if (this.action == "draw") {
          result = await this.$acs.updateDrawAddress(data)
        }

        if (result.success) {
          Toast.show(this.$t('pmall.address.saveSuccess'))
          this.$router.go(-1)
        }
        this.processing = false
      }
    }
  }
}
</script>