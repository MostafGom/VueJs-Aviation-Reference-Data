<template>
  <div>
    <div class="inputs-container">
      <div>
        <input
          type="text"
          name="serchLat"
          id="serchLat"
          v-model="searchLat"
          class="all-coords-search"
          placeholder="search..."
        />
        <label for="serchLat">Enter latitude</label>
      </div>

      <div>
        <input
          type="text"
          name="searchLon"
          id="searchLon"
          v-model="searchLon"
          class="all-coords-search"
          placeholder="search..."
        />
        <label for="searchLon">Enter longitude</label>
      </div>
      <div>
        <input
          type="text"
          name="searchRadius"
          id="searchRadius"
          v-model="searchRadius"
          class="all-coords-search"
          placeholder="search..."
        />
        <label for="searchRadius">Enter radius</label>
      </div>
      <br />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="loading">...loading...</div>
      <div v-else>
        <div v-if="resObj.length">
          <div
            v-for="(airport, index) in resObj"
            :key="airport.alpha2countryCode"
            class="one-country"
          >
            <h3>>>>Airport {{ index + 1 }}</h3>
            <span class="c_span_name"
              >name : <span class="t-bold">{{ airport.name }}</span></span
            >
            <span class="c_span"
              >alpha2Code :
              <span class="t-bold">{{ airport.alpha2countryCode }}</span>
            </span>
            <span class="c_span"
              >iataCode :
              <span class="t-bold">{{ airport.iataCode }}</span>
            </span>
            <span class="c_span"
              >icaoCode :
              <span class="t-bold">{{ airport.icaoCode }}</span>
            </span>
            <span class="c_span"
              >latitude :
              <span class="t-bold">{{ airport.latitude }}</span>
            </span>
            <span class="c_span"
              >longitude :
              <span class="t-bold">{{ airport.longitude }}</span>
            </span>
          </div>
        </div>
        <div v-else>no data available with these entries</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect, watch } from "vue";
import { fetchByCoords, debounce } from "../utils/utils";
export default {
  // props: ["alpha3Code"],
  setup() {
    const searchLat = ref(-54.81);
    const searchLon = ref(-68.315);
    const searchRadius = ref(100);

    const { resObj, error, loading, fetchData } = fetchByCoords();
    const applyDebounce = debounce(() => {
      fetchData(searchLat.value, searchLon.value, searchRadius.value);
    }, 1000);

    watchEffect(() => {
      applyDebounce();
    });

    watch([searchLat, searchLon, searchRadius], () => {
      applyDebounce();
    });

    return { resObj, error, loading, searchLat, searchLon, searchRadius };
  },
};
</script>

<style>
.c_span_name {
  display: inline-block;
  padding: 10px;
  background-color: gray;
  color: white;
  border-radius: 10px;
  margin: 10px;
  width: 30%;
}
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
.all-coords-search {
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  margin: 20px;
  margin-bottom: 0px;
  border: 1px solid crimson;
}
.inputs-container {
  margin-bottom: 10px;
}
</style>