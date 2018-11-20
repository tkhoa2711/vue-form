<template>
  <div class="ui centered card">
    <div class="content">
      <form class="ui form">
        <h2 class="ui dividing header">Page 2</h2>

        <!-- user role -->
        <div class="field">
          <label>What is the user role?</label>
          <select class="ui fluid dropdown" v-model="role">
            <option
              v-for="(role, index) in roles"
              :key="index"
              :value="role"
            >
              {{ role }}
            </option>
          </select>
        </div>

        <!-- first joining date -->
        <div class="field">
          <label>When did the user first join?</label>
          <input type="date" v-model="joinDate">
          <div class="ui pointing red basic label" v-show="errors['joinDate']">
            {{ errors['joinDate'] }}
          </div>
        </div>

        <!-- is user located in Victoria -->
        <div class="inline fields">
          <label>Is this person located in Victoria?</label>
          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                :value="true"
                v-model="isLocatedInVic">
              <label>Yes</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                :value="false"
                v-model="isLocatedInVic">
              <label>No</label>
            </div>
          </div>
          <div class="ui pointing red basic label" v-show="errors['isLocatedInVic']">
            {{ errors['isLocatedInVic'] }}
          </div>
        </div>

        <!-- where in Victoria -->
        <div class="field" v-show="isLocatedInVic">
          <label>Where in Victoria?</label>
          <input type="text" v-model="locationInVic">
          <div class="ui pointing red basic label" v-show="errors['locationInVic']">
            {{ errors['locationInVic'] }}
          </div>
        </div>

        <div class="ui buttons">
          <button class="ui button" @click="back">
            Back
          </button>
          <button class="ui primary button" @click="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [
        'Dev',
        'Manager',
        'Student',
      ],
      role: null,
      joinDate: null,
      isLocatedInVic: null,
      locationInVic: '',
      errors: {},
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    submit() {
      if (this.validateForm()){
        // TODO
      }
    },

    validateForm() {
      this.errors = [];

      if (!this.joinDate) {
        this.errors['joinDate'] = 'Joining date is required';
      }

      if (this.isLocatedInVic === null) {
        this.errors['isLocatedInVic'] = 'You must select your location';
      }

      if (!this.locationInVic) {
        this.errors['locationInVic'] = 'Please specify where in Victoria';
      }

      return Object.keys(this.errors).length === 0;
    },
  },
}
</script>
