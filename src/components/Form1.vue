<template>
  <div class="ui centered card">
    <h1 class="ui header">Page 1</h1>

    <div class="content">
      <div class="ui form">
        <!-- Store info -->
        <fieldset class="ui segment fields">
          <div class="field">
            <label>Store Type</label>
            <select v-model="storeType">
              <option
                v-for="(option, index) in storeTypes"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <div class="ui pointing red basic label" v-show="errors['storeType']">
              {{ errors['storeType'] }}
            </div>
          </div>

          <div class="field" v-show="storeType === 'Metro'">
            <label>Store Detail</label>
            <input type="text" v-model="storeDetail">
            <div class="ui pointing red basic label" v-show="errors['storeDetail']">
              {{ errors['storeDetail'] }}
            </div>
          </div>
        </fieldset>

        <!-- User info -->
        <fieldset class="ui segment fields">
          <div class="field">
            <label>Name lookup</label>
            <autocomplete
              :items="users"
              @change="onFullNameSelected"
            ></autocomplete>
            <div class="ui pointing red basic label" v-show="errors['fullName']">
              {{ errors['fullName'] }}
            </div>
          </div>

          <div class="field">
            <label>First Name</label>
            <input type="text" v-model="firstName">
            <div class="ui pointing red basic label" v-show="errors['firstName']">
              {{ errors['firstName'] }}
            </div>
          </div>

          <div class="field">
            <label>Last Name</label>
            <input type="text" v-model="lastName">
            <div class="ui pointing red basic label" v-show="errors['lastName']">
              {{ errors['lastName'] }}
            </div>
          </div>
        </fieldset>

        <div class="ui buttons">
          <button class="ui disabled button" disabled>
            Back
          </button>
          <button class="ui primary button" @click="next()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from './Autocomplete';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    Autocomplete,
  },

  data() {
    return {
      storeTypes: [
        'Mall',
        'Metro',
        'Arcade',
        'Centre',
      ],
      users: [],
      errors: {},       // for form validation
    };
  },

  computed: {
    ...mapFields([
      'form.storeType',
      'form.storeDetail',
      'form.fullName',
      'form.firstName',
      'form.lastName',
    ]),
  },

  mounted() {
    fetch('https://randomuser.me/api/?results=50&nat=au&exc=login')
      .then(res => res.json())
      .then(res => {
        this.users = res.results.map(u => `${u.name.first} ${u.name.last}`);
      })
      .catch(() => {});
  },

  methods: {
    next() {
      if (this.validateForm()) {
        this.$router.push('/form2');
      }
    },

    onFullNameSelected(name) {
      this.fullName = name;
      [this.firstName, this.lastName] = name.split(' ', 2);
    },

    // Validate form and return true if everything is ok
    validateForm() {
      this.errors = [];

      if (!this.storeType) {
        this.errors['storeType'] = 'Store type is required';
      }

      if (this.storeType === 'Metro' && this.storeDetail.trim() === '') {
        this.errors['storeDetail'] = 'Store details are required for Metro type';
      }

      if (!this.fullName) {
        this.errors['fullName'] = 'Full name is required';
      }

      if (!this.firstName) {
        this.errors['firstName'] = 'First name is required';
      }

      if (!this.lastName) {
        this.errors['lastName'] = 'Last name is required';
      }

      return Object.keys(this.errors).length === 0;
    },
  },
}
</script>
