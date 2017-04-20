<template>
  <div class="field has-addons is-marginless is-paddingless">
    <p class="control">
      <span class="select">
        <select v-model="province">
          <option value="">选择省</option>
          <option v-for="province in provinces" :value="province.code">{{province.name}}</option>
        </select>
      </span>
    </p>
    <p class="control">
      <span class="select">
        <select v-model="city">
          <option value="">选择城市</option>
          <option v-for="city in cities" :value="city.code">{{city.name}}</option>
        </select>
      </span>
    </p>
    <p class="control">
      <span class="select">
        <select v-model="district">
          <option value="">选择县/区</option>
          <option v-for="district in districts" :value="district.code">{{district.name}}</option>
        </select>
      </span>
    </p>
    <slot>
    </slot>
  </div>
</template>
<script>
import citydata from './citydata.json';
export default {
  mounted: function() {
    this.provinces = citydata;
  },
  props: {
    _province: {
      twoWay: true,
      default: ''
    },
    _city: {
      twoWay: true,
      default: ''
    },
    _district: {
      twoWay: true,
      default: ''
    }
  },
  data() {
    return {
      province: this._province,
      city: this._city,
      district: this._district,
      oldProvince: undefined,
      oldCity: undefined,
      oldDistrict: undefined,
      provinces: [],
      cities: [],
      districts: []
    }
  },
  methods: {
    onSelect() {

    }
  },
  watch: {
    province() {
      let seletedItem = this.provinces.filter(function(item) {
        return item.code == this.province;
      }.bind(this));

      if (seletedItem.length) {
        this.oldProvince = seletedItem[0];
        this.cities = seletedItem[0]['children'];
        this.city = this.cities[0].code;
      } else {
        this.city = '';
        this.cities = [];
      }

    },
    city() {
      let seletedItem = this.cities.filter(function(item) {
        return item.code == this.city;
      }.bind(this));
      if (seletedItem.length) {
        this.oldCity = seletedItem[0];
        this.districts = seletedItem[0]['children'];
        this.district = this.districts[0].code
      } else {
        this.district = '';
        this.districts = [];
      }
    },
    district() {
      let seletedItem = this.districts.filter(function(item) {
        return item.code == this.district;
      }.bind(this));

      if (seletedItem.length) {
        this.oldDistrict = seletedItem[0];
      }

      this.$emit('onSelect', this.oldProvince, this.oldCity, this.oldDistrict)
    }
  },
  computed: {}
}
</script>