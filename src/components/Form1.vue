<template>
  <div class="ui centered card">
    <div class="content">
      <div class="ui form">
        <div class="field">
          <label>Store Type</label>
          <select v-model="storeType">
            <option
              v-for="(option, index) in storeTypes"
              :key="index"
              v-bind:value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="field" v-show="storeType === 'Metro'">
          <label>Store Detail</label>
          <input type="text" v-model="storeDetail">
        </div>
        <div class="ui buttons">
          <button class="ui disabled button" disabled>
            Back
          </button>
          <button class="ui primary button" v-on:click="next()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeTypes: [
        'Mall',
        'Metro',
        'Arcade',
        'Centre',
      ],
      storeType: '',
      storeDetail: '',
    };
  },

  methods: {
    next() {
      this.$router.push('/form2');
    },
  },
}
</script>
