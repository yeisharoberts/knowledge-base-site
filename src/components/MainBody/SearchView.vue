<template>
  <div class="parentSearchView">
    <nav class="breadcrumb-nav">
      <ol class="breadcrumb" style="font-size: 14px; margin: 0;">
        <li class="breadcrumb-item"><div class="tc-green" @click="$emit('handleComponentVisibility', 'home')" style="cursor: pointer;">All Categories</div></li>
        <li class="breadcrumb-item active tc-gray">Search results</li>
      </ol>
    </nav>

    <div v-if="searchDataLength > 0">
      <div class="d-flex justify-content-center">
        Showing results for "{{ searchInputValue }}"
      </div>

      <div class="row">
        <div class="col-md-auto">
          <div class="card text-card" style="margin-top: 15px; min-height: 91.54px;" v-for="search of searchData" :key="search.id">
            <div class="card-body" style="min-height: 91.54px;">
              <div class="row" style="height: 100%;">
                <div class="col-10" style="display: flex; align-items: center;">
                  <i class="fa fa-file-text tc-gray" style="padding: 20px; font-size: 20px;"></i>
                  <div>
                    <span class="tc-green" style="font-size: 17px; font-weight: 580;">{{ search.title }}</span><br /><span class="tc-gray" style="font-size: 12px;">Description</span>
                  </div>
                </div>
                <div class="col tc-green" style="font-size: 30px; display: flex; justify-content: end; align-items: center; padding-right: 25px;">></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="child-x-result" v-else>
      <div>
        <div>
          No search results
        </div>
        <div>
          Please, try again or <span class="tc-green">Submit a ticket</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
imp
export default {
  name: "SearchView",
  props: {
    searchData: { default: [] },
    searchInputValue: { default: "" }
  },
  computed: {
    searchDataLength () {
      return this.searchData.length;
    }
  }
}
</script>

<style lang="scss">
  @import '../../scss/_variables.scss';
  .tc-green{
    color: $green;
  }

  .child-x-result {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
