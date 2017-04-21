<template>
  <div class="columns is-multiline is-mobile">
    <form @submit.prevent="handleSubmit">
      <div class="column is-12 has-bottom-line">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">{{$t('mall.address.fields.name') }}：</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="name">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">{{$t('mall.address.fields.mobile') }}：</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" type="number" v-model="mobile">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">{{$t('mall.address.fields.area') }}：</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <city-select @onSelect="onSelect"></city-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">{{$t('mall.address.fields.address') }}：</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="address">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12 has-text-centered">
        <v-touch class="button is-info is-large is-fullwidth" :class="$v.$invalid ? 'is-disabled' : ''" tag="a"
          @tap="handleSubmit">{{$t('common.save') }}</v-touch>
      </div>
    </form>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'
import scroller from 'common/components/scroller'
import citySelect from 'common/components/citySelect/citySelect'
import {
  required,
} from 'vuelidate/lib/validators'
import {
  minLength,
  maxLength
} from 'common/js/utils'

export default {
  components: {
    scroller,
    citySelect
  },
  mounted: async function() {},
  data: function() {
    return {
      processing: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      mobile: '',
      name: '',
      address: '',
      area: '',
      area_code: '',
      province: '',
      city: '',
      district: '',
      provinceCode: '',
      cityCode: '',
      districtCode: ''
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(30)
    },
    mobile: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11)
    },
    address: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(150)
    }
  },
  methods: {
    handleSubmit: async function() {
      let area = this.district == "" ? null : this.province + "-" + this.city + "-" + this.district
      let area_code = this.districtCode == "" ? null : this.provinceCode + "-" + this.cityCode +
        "-" +
        this.districtCode

      let result = await this.$acs.insertAddress({
        name: this.name,
        mobile: this.mobile,
        area: area,
        area_code: area_code,
        address: this.address
      })
      if (result.success) {
        this.$router.replace({
          name: 'myAddresses'
        })
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