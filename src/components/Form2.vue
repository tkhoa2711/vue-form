<template>
  <div class="ui centered card">
    <div class="content">
      <div class="ui form">
        <div class="field">
          <label>Name lookup</label>
          <autocomplete
            :items="users"
            v-on:select-result="onFullNameSelected"
          ></autocomplete>
        </div>
        <div class="field">
          <label>First Name</label>
          <input type="text" v-model="firstName">
        </div>
        <div class="field">
          <label>Last Name</label>
          <input type="text" v-model="lastName">
        </div>
        <div class="ui buttons">
          <button class="ui button" v-on:click="prev()">
            Back
          </button>
          <button class="ui primary button" v-on:click="submit()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from './Autocomplete';

export default {
  data() {
    return {
      search: '',
      users: [],
      firstName: '',
      lastName: '',
    };
  },

  components: {
    Autocomplete,
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
    prev() {
      this.$router.go(-1);
    },

    submit() {
      // TODO
    },

    onFullNameSelected(name) {
      [this.firstName, this.lastName] = name.split(' ', 2);
    },
  },
}
</script>
