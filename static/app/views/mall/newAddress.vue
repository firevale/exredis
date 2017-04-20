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
                <input class="input" type="text" v-model.trim="address.name">
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
                <input class="input" type="number" v-model.trim="address.mobile">
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
                <city-select :province.sync="province" :city.sync="city" :district.sync="district" @onSelect="onSelect"></city-select>
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
                <input class="input" type="text" v-model.trim="address.address">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12 has-text-centered">
        <v-touch class="button is-info is-large is-fullwidth" tag="a" @tap="handleSubmit">{{$t('common.save') }}</v-touch>
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

export default {
  components: {
    scroller,
    citySelect
  },
  mounted: async function() {
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      address: {},
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
      let result = await this.$acs.insertAddress({
          name: this.address.name,
          mobile: this.address.mobile,
          area: this.address.area,
          address: this.address.address,
          area_code: this.address.area_code
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
    onSelect: function(province, city, district) {}
  },
  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  }
}
</script>