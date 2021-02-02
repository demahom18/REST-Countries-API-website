<template>
  <div class="search">
      <form action="">
        <div>
          <input type="text" placeholder="Search for a country...">
        </div>
        <div>
          <select name="filter" id="filter">
            <option value="">Search by region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: 'SearchBox'
}
</script>

<style>

</style>