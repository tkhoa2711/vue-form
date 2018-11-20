<template>
  <div class="autocomplete">
    <input
      type="text"
      placeholder="Search here..."
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      >
    <ul class="autocomplete-results" v-show="isOpen">
      <li
        class="autocomplete-result"
        v-for="(result, index) in results"
        :key="index"
        @click="selectResult(result)"
        :class="{ 'is-active': index === arrowCounter }"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
// Reference: https://alligator.io/vuejs/vue-autocomplete-component/

export default {
  name: 'autocomplete',

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      search: '',       // the search text
      isOpen: false,    // whether to display the search results
      results: [],
      arrowCounter: 0,  // to track the movement of arrow keys
    };
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },

  watch: {
    items: function (val, oldValue) {
      if (val.length !== oldValue.length) {
        this.results = val;
      }
    },
  },

  methods: {
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },

    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter -1;
      }
    },

    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
      this.$emit('select-result', this.search);
    },

    filterResults() {
      this.results = this.items.filter(i => 
        i.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },

    selectResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit('select-result', this.search);
    },

    handleClickOutside(e) {
      // close the dropdown result when click outside the results
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
  },
}
</script>

<style>
  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
    width: 100%;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
