<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="loading">....loading....</div>
      <div v-else>
        <div v-if="filtered.length">
          <div
            v-for="country in filtered"
            :key="country.alpha2Code"
            class="one-country"
          >
            <span class="c_span"
              >name : <span class="t-bold">{{ country.name }}</span></span
            >
            <span class="c_span"
              >alpha2Code :
              <span class="t-bold">{{ country.alpha2Code }}</span></span
            >
            <span class="c_span"
              >alpha3Code :
              <span class="t-bold">{{ country.alpha3Code }}</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  props: ["alphaCode", "countries", "error", "loading"],

  setup(props) {
    const search = ref("");
    console.log(props);
    if (props.alphaCode) {
      search.value = props.alphaCode;
    }

    const filtered = computed(() => {
      return props.countries.filter((item) =>
        item.alpha3Code.includes(search.value)
      );
    });

    return { filtered, search };
  },
};
</script>

<style>
.c_span {
  display: inline-block;
  padding: 10px;
  background-color: crimson;
  color: white;
  border-radius: 10px;
  margin: 10px;
  width: 30%;
}
.one-country {
  border-bottom: 2px solid #000;
  border-top: 2px solid #000;
}
.t-bold {
  font-weight: bold;
  color: #000;
}
.all-countries-search {
  display: block;
  padding: 10px;
  border-radius: 10px;
  margin: 20px;
  border: 1px solid crimson;
}
</style>