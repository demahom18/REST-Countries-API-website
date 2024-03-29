<template>
    <div class="country-card">
        <router-link
            :to="{
                name: 'CountryDetail',
                params: { countryname: countryName }
            }"
        >
            <img :src="countryFlag" :alt="`${countryName} flag`" />
            <div class="country-infos">
                <div>
                    <h2>{{ countryName }}</h2>
                </div>

                <div>
                    <h3>Population:</h3>
                    <p>{{ population }}</p>
                </div>

                <div>
                    <h3>Region:</h3>
                    <p>{{ country.region }}</p>
                </div>

                <div>
                    <h3>Capital:</h3>
                    <p>{{ country.capital }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import { computed } from "vue"

export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const country = props.country


        const populationFormatted = computed(() => {
            return [...country.population.toString()]
                .reverse().map((num, idx) => (idx % 3 === 0 && idx != 0) ? `${num},` : num)
                .reverse().join('')
        })

        const countryName = computed(() => {
            if (typeof country.name == 'string') {
                return country.name
            }
            return country.name.common
        })

        const countryFlag = computed(() => country.flags.png)

        return {
            population: populationFormatted,
            countryName, countryFlag
        }
    }
}
</script>

<style lang="scss">
@import "../assets/style.scss";

.country-card {
    margin: 36px;
    transform: translateZ(0);
    border-radius: 5px;
    cursor: pointer;
    background: white;
    min-height: 330px;
    transition: all 0.3s;
    @include d-shadow($shadow-light, 0, 0, 0.3rem);

    &:hover {
        @include d-shadow();
    }

    img {
        border-radius: 5px 5px 0 0;
        height: 160px;
        width: 100%;
    }

    h2 {
        font-size: 18px;
    }
}

.country-infos {
    padding: 24px;
    p {
        padding: 0 5px;
    }

    div {
        @include flex("", center, "");
        &,
        h3 {
            font-size: 14px;
        }
        padding: 4px 0;
        &:first-of-type {
            padding-bottom: 12px;
        }
    }
}

body.dark-mode .country-card {
    @include d-shadow($shadow-dark, 0, 0, 0.3rem);
    background: $el-bg-dark-mode;

    &:hover {
        @include d-shadow($shadow-light, 0, 0, 0.3rem);
    }
}

@media only screen and (max-width: 680px) {
    .country-card {
        margin: 20px;
    }
}
</style>