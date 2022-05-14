<template>
  <div>
    <input
      type="text"
      name="serchCountry"
      id="countrySearch"
      v-model="search"
      class="all-countries-search"
      placeholder="search..."
    />
    <label for="countrySearch">Search for country</label>
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
import { fetchCountriesData, debounce } from "../utils/utils";

export default {
  setup() {
    const search = ref("");
    const { resObj, error, loading, fetchData } = fetchCountriesData();

    fetchData();

    const filtered = computed(() => {
      return resObj.value.filter((item) => item.name.includes(search.value));
    });

    return { resObj, error, filtered, loading, search };
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