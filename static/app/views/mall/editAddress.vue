<template>
  <div class="edit-address columns is-multiline is-mobile">
    <form v-if="address.id>0" @submit.prevent="handleSubmit">
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.name') }}：</span>
            <input class="input no-border" type="text" v-model.trim="address.name">
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.mobile') }}：</span>
            <input class="input no-border" type="number" v-model.trim="address.mobile">
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile has-text-left">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.area') }}：</span>
            <div style="width:100%">
              <city-select v-if="provinceCode>0" :_province="provinceCode" :_city="cityCode" :_district="districtCode"
                @onSelect="onSelect"></city-select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.address') }}：</span>
            <input class="input no-border" type="text" v-model="address.address">
          </div>
        </div>
      </div>
      <div class="column is-12 has-text-centered">
        <div class="tile is-full has-text-left" style="margin: 0.5rem" v-show="errorHint">
          <span class="icon is-sign">!</span>
          <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
        </div>
        <v-touch class="button is-info is-large is-fullwidth" tag="a" @tap="handleSubmit" :class="processing || $v.$invalid ? 'is-disabled' : ''" :disabled="$v.$invalid">{{$t('common.save') }}</v-touch>
      </div>
    </form>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'
import citySelect from 'common/components/citySelect/citySelect'
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

  mounted: async function() {
    acs.checkIsLogin(_ => {})
    await this.getAddressDetail()
  },

  computed: {
    errorHint: function() {
      if (!this.$v.address.name.required) {
        return this.$t('mall.address.namePlaceholder')
      } else if (!this.$v.address.name.minLength) {
        return this.$t('error.validation.minResidentNameLength')
      } else if (!this.$v.address.name.maxLength) {
        return this.$t('error.validation.maxResidentNameLength')
      } else if (!this.$v.address.mobile.required) {
        return this.$t('mall.address.mobilePlaceholder')
      } else if (!this.$v.address.mobile.isValidMobileNumber) {
        return this.$t('error.validation.invalidMobileNumber')
      } else if (!this.$v.address.area.required) {
        return this.$t('mall.address.areaPlaceholder')
      } else if (!this.$v.address.address.required) {
        return this.$t('mall.address.addressPlaceholder')
      } else if (!this.$v.address.address.minLength) {
        return this.$t('error.validation.minAddressLength')
      } else if (!this.$v.address.address.maxLength) {
        return this.$t('error.validation.maxAddressLength')
      }

      return ''
    }
  },

  validations: {
    address: {
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

  data: function() {
    return {
      processing: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      address: {
        id: 0,
        name: '',
        mobile: '',
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
  
  methods: {
    handleSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let area = this.district == "" ? null : this.province + "-" + this.city + "-" + this.district
        let area_code = this.districtCode == "" ? null : this.provinceCode + "-" + this.cityCode +
          "-" + this.districtCode
        let result = await this.$acs.updateAddress({
          id: this.address.id,
          name: this.address.name,
          mobile: this.address.mobile,
          area: area,
          address: this.address.address,
          area_code: area_code,
          is_default: this.address.is_default
        })
        if (result.success) {
          this.$router.replace({
            name: 'myAddresses'
          })
        }
        this.processing = false
      }
    },
    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    },
    getAddressDetail: async function() {
      let addressId = this.$router.currentRoute.params.addressId
      let result = await this.$acs.getAddressDetail(addressId)
      if (result.success) {
        this.address = result.address
        let areaItem = this.address.area.split('-')
        let codeItem = this.address.area_code.split('-')
        this.province = areaItem[0]
        this.city = areaItem[1]
        this.district = areaItem[2]
        this.provinceCode = codeItem[0]
        this.cityCode = codeItem[1]
        this.districtCode = codeItem[2]
      }
    },
    onSelect: function(province, city, district) {
      this.province = province.name
      this.provinceCode = province.code
      this.city = city.name
      this.cityCode = city.code
      this.district = district.name
      this.districtCode = district.code
    }
  },
  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  }
}
</script>