import { ref } from 'vue'

export const fetchCountriesData = () => {
    const resObj = ref([]);
    const error = ref(null);
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': import.meta.env.VITE_APP_X_RapidAPI_HOST,
                'X-RapidAPI-Key': import.meta.env.VITE_APP_X_RapidAPI_KEY
            }
        }
        try {
            const data = await fetch("https://aviation-reference-data.p.rapidapi.com/countries", options)
            if (!data.ok) {
                throw Error('no data available')
            }
            const res = await data.json()
            resObj.value = res
            loading.value = false
            console.log(resObj.value);
        } catch (error) {
            loading.value = false
            error.value = error.message
        }
    }
    return { resObj, error, loading, fetchData }
}

export const fetchByCode = () => {
    const resObjCode = ref(null);
    const errorCode = ref('');
    const loadingCode = ref(false)
    const fetchDataCode = async (code) => {

        loadingCode.value = true
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': import.meta.env.VITE_APP_X_RapidAPI_HOST,
                'X-RapidAPI-Key': import.meta.env.VITE_APP_X_RapidAPI_KEY
            }
        }
        try {
            const data = await fetch("https://aviation-reference-data.p.rapidapi.com/airline/" + code, options)

            if (data.status === 404) {
                throw Error('please enter valid code')
            }
            errorCode.value = ''
            const res = await data.json()
            resObjCode.value = res
            loadingCode.value = false
        } catch (err) {
            errorCode.value = err.message
            loadingCode.value = false
        }
    }
    return { resObjCode, errorCode, fetchDataCode }
}


export const fetchByCoords = () => {
    const resObj = ref([]);
    const loading = ref(false)
    const error = ref('');
    const fetchData = async (lat, lon, radius) => {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': import.meta.env.VITE_APP_X_RapidAPI_HOST,
                'X-RapidAPI-Key': import.meta.env.VITE_APP_X_RapidAPI_KEY
            }
        }
        try {
            loading.value = true
            const data =
                await fetch(`https://aviation-reference-data.p.rapidapi.com/airports/search?lat=${lat}&lon=${lon}&radius=${radius}`, options)

            if (data.status === 404) {
                throw Error('please enter valid code')
            }
            error.value = ''
            const res = await data.json()
            resObj.value = res
            loading.value = false
            console.log(resObj.value);
        } catch (err) {
            error.value = err.message
            loading.value = false
        }
    }
    return { resObj, error, loading, fetchData }

}

export const debounce = (cb, delay = 1500) => {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            cb(...args);
        }, delay);
    };
};