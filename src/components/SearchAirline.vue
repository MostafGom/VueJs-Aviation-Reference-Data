<template>
  <div>
    <input
      type="text"
      name="serchCountry"
      id="countrySearch"
      v-model="search"
      class="code-search"
      placeholder="search..."
    />
    <label for="countrySearch"
      >Get airline information by IATA or ICAO code</label
    >
    <br />
    <div v-if="errorCode" class="error">
      <p>{{ errorCode }}</p>
      <p>possible values :</p>
      <ul>
        <li>LH</li>
        <li>GEC</li>
        <li>GEX</li>
        <li>QS</li>
        <li>ID</li>
        <li>HTY</li>
      </ul>
    </div>

    <div v-else>
      <div v-if="resObjCode">
        <br />
        <span class="airline-label">icaoCode : </span>
        <span class="airline-data">{{ resObjCode.icaoCode }}</span>
        <br />
        <span class="airline-label">iataCode : </span>
        <span class="airline-data">{{ resObjCode.iataCode }}</span>
        <br />
        <span class="airline-label">callSign : </span>
        <span class="airline-data">{{ resObjCode.callSign }}</span>
        <br />
        <span class="airline-label">alpha3countryCode : </span>
        <span class="airline-data">{{ resObjCode.alpha3countryCode }}</span>
        <br />

        <FetchCountryByCode
          :countries="resObj"
          :alphaCode="resObjCode.alpha3countryCode"
          :error="error"
          :loading="loading"
        />
      </div>
      <div v-else>loading...</div>
    </div>
  </div>
</template>


<script>
import { ref, watch, watchEffect } from "vue";
import { fetchByCode, debounce, fetchCountriesData } from "../utils/utils";
import FetchCountryByCode from "./FetchCountryByCode.vue";

export default {
  components: { FetchCountryByCode },
  setup() {
    const search = ref("LH");
    const { resObj, error, loading, fetchData } = fetchCountriesData();
    const { resObjCode, errorCode, fetchDataCode } = fetchByCode();

    fetchData();
    const applyDebounce = debounce(() => {
      fetchDataCode(search.value);
    }, 500);

    watchEffect(() => {
      applyDebounce();
    });

    watch(search, () => {
      applyDebounce();
    });
    return { resObjCode, errorCode, search, resObj, error, loading };
  },
};
</script>

<style>
.airline-label {
  display: inline-block;
  margin: 10px;
  background-color: rgba(165, 42, 42, 0.144);
  color: black;
  padding: 10px;
  border-radius: 10px;
  width: 180px;
}
.airline-data {
  display: inline-block;
  margin: 10px;
  background-color: rgba(165, 42, 42, 0.5);
  color: black;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
}

.code-search {
  display: block;
  padding: 10px;
  border-radius: 10px;
  margin: 20px;
  border: 1px solid crimson;
}

.error {
  color: red;
  margin-top: 30px;
}
</style>