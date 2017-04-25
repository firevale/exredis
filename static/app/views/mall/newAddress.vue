<template>
  <div class="new-address columns is-multiline is-mobile">
    <form @submit.prevent="handleSubmit">
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.name') }}：</span>
            <input class="input no-border" type="text" v-model.trim="addressModel.name" :placeholder="$t('mall.address.namePlaceholder')">
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.mobile') }}：</span>
            <input class="input no-border" type="number" v-model.trim="addressModel.mobile" :placeholder="$t('mall.address.mobilePlaceholder')">
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile has-text-left">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.area') }}：</span>
            <city-select @onSelect="onSelect" style="width:100%"></city-select>
          </div>
        </div>
      </div>
      <div class="column is-12 has-bottom-line">
        <div class="level is-mobile">
          <div class="level-item">
            <span class="subtitle is-5 is-normal width-5">{{$t('mall.address.fields.address') }}：</span>
            <input class="input no-border" type="text" v-model.trim="addressModel.address" :placeholder="$t('mall.address.addressPlaceholder')">
          </div>
        </div>
      </div>
      <div class="column is-12 has-text-centered">
        <div class="tile is-full has-text-left" style="margin: 0.5rem" v-show="errorHint">
          <span class="icon is-sign">!</span>
          <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
        </div>
        <v-touch class="button is-info is-large is-fullwidth" :class="processing || $v.$invalid ? 'is-disabled' : ''"
          tag="a" @tap="handleSubmit">{{$t('common.save') }}</v-touch>
      </div>
    </form>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'
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
  computed: {
    errorHint: function() {
      if (!this.$v.addressModel.name.required) {
        return this.$t('mall.address.fields.name') + this.$t('mall.address.namePlaceholder')
      } else if (!this.$v.addressModel.name.maxLength) {
        return this.$t('mall.address.fields.name') + this.$t('mall.address.namePlaceholder')
      } else if (!this.$v.addressModel.mobile.required) {
        return this.$t('mall.address.mobilePlaceholder')
      } else if (!this.$v.addressModel.mobile.minLength) {
        return this.$t('mall.address.mobilePlaceholder')
      } else if (!this.$v.addressModel.mobile.maxLength) {
        return this.$t('mall.address.mobilePlaceholder')
      } else if (!this.$v.addressModel.area.required) {
        return this.$t('mall.address.areaPlaceholder')
      } else if (!this.$v.addressModel.address.required) {
        return this.$t('mall.address.fields.address') + this.$t('mall.address.addressPlaceholder')
      } else if (!this.$v.addressModel.address.maxLength) {
        return this.$t('mall.address.fields.address') + this.$t('mall.address.addressPlaceholder')
      }

      return ''
    }
  },
  data: function() {
    return {
      processing: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
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
        minLength: minLength(2),
        maxLength: maxLength(45)
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
    ...mapActions([
      'updateSelectedAddress'
    ]),
    handleSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.insertAddress({
          name: this.addressModel.name,
          mobile: this.addressModel.mobile,
          area: this.addressModel.area,
          area_code: this.addressModel.area_code,
          address: this.addressModel.address
        })
        if (result.success) {
          this.updateSelectedAddress(result.address)
          this.$router.back()
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
    }
  },
  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  }
}
</script>