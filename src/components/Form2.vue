<template>
  <div class="ui centered card">
    <div class="content">
      <div class="ui form">
        <div class="field">
          <label>User lookup</label>
          <!-- This field should send a request to https://randomuser.me/api/?results=50&nat=au&exc=login
          as the user types and populate an autocomplete widget. The widget should highlight matches based the name field.
          -->
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
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
    };
  },

  methods: {
    prev() {
      this.$router.go(-1);
    },

    submit() {
      // TODO
    }
  },
}
</script>
