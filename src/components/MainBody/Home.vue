<template>
  <div id="parent-home">
    <!-------------------- HOME VIEW -------------------->
    <div class="generalStyling" id="child-home" v-if="view === 'home'">
      <div class="container overflow-hidden text-center">
        <div class="d-flex justify-content-center row">
          <div class="col-xl-4 col-md-auto col-sm-auto" id="parent-container" v-for="category in categoriesData" :key="category.id" @click="switchView(category)" style="cursor: pointer;">
            <div class="p-2 d-flex justify-content-center">
              <div class="card" style="width: 315px; height: 220px;">
                <div class="card-body">
                  <div class="mt-3"><i :class="['fa', 'fa-' + category.icon, 'card-icon']"></i></div>
                  <div class="mt-3 tc-black fw-700" style="font-size: 20px;">
                    {{ category.title }}
                  </div>
                  <div class="mt-4">
                    <div class="tc-green" style="font-size: 14px;">{{ category.totalArticle }} articles</div><div class="tc-gray" style="font-size: 11px;">Last Update: {{ getLastUpdate(category.updatedOn) }} days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-------------------- CATEGORY VIEW -------------------->
    <category :selectedCategory="selectedCategory" :articlesData="articlesData" @handleComponentVisibility="handleComponentVisibility" v-else-if="view === 'component'" />
    <searchView v-if="view === 'search'" :searchData="searchData" :searchInputValue="searchInputValue" @handleComponentVisibility="handleComponentVisibility" />
  </div>
</template>

<script>
import clonedeep from "lodash.clonedeep";
import { makeGetRequest } from "../../helpers/request";
import Category from "./Category.vue";
import SearchView from "./SearchView.vue";

export default {
  name: "Home",
  props: {
    searchInputValue: {
      type: String,
      default: ""
    }
  },
  components: {
    Category,
    SearchView
  },
  data () {
    return {
      categoriesData: [],
      clonedCategoriesData: [],
      view: "home",
      selectedCategory: {},
      articlesData: [],
      clonedArticlesData: [],
      // searchView: false,
      searchData: []
    }
  },  
  created () {
    this.initCategoriesData();
  },
  methods: {
    /** Funtion initCategoriesData
     * Function to get list of categories
    **/
    initCategoriesData () {
      makeGetRequest("categories")
        .then((reqResponse) => {
          const resData = clonedeep(reqResponse.data);
          this.categoriesData = resData.filter((category) => category.enabled).sort((firstCategory, secondCategory) => firstCategory.order - secondCategory.order) || [];
          this.clonedCategoriesData = clonedeep(this.categoriesData);
        })
        .catch(error => console.error("initCategoriesData", error));
    },
    /** Function getLastUpdate
     * Function to get last updated date in days format
     * @param {string} dateUpdated - updated date
     * @returns {string} new string 
    **/
    getLastUpdate (dateUpdated) {
      const updatedDate = new Date(dateUpdated);
      const todayDate = new Date();
      return Math.floor((todayDate - updatedDate) / (1000 * 60 * 60 * 24));
    },
    /** Function handleSearchItem
     * Function to search list for item
     * @param {string} searchValue - search input value
    **/
    // handleSearchItem (searchValue) {
    //   const component = this.homeView ? 'categoriesData' : 'articlesData';
    //   const clonedComponent = this.homeView ? 'clonedCategoriesData' : 'clonedArticlesData';
    //   if (!searchValue) {
    //     this[component] = clonedeep(this[clonedComponent]);
    //     return;
    //   }
    //   const filteredComponent = clonedeep(this[clonedComponent]).filter(component => 
    //     component.title.toLowerCase().includes(searchValue.toLowerCase())
    //   );
    //   this[component] = filteredComponent.length ? filteredComponent : clonedeep(this[clonedComponent]);
    // },
    /** Function switchView
     * Function to switch from Home to Category view 
     * @param {any} category - category data
    **/
    switchView (category) {
      this.selectedCategory = clonedeep(category);
      // Call API to get Articles
      makeGetRequest(`category/${category.id}`)
        .then((reqResponse) => {
          const resData = clonedeep(reqResponse.data);
          this.articlesData = resData.filter((article) => article.status === "published").sort((firstArticle, secondArticle) => firstArticle.order - secondArticle.order) || [];
          this.clonedArticlesData = clonedeep(this.articlesData);
          this.handleComponentVisibility("component");
        })
        .catch(error => console.error("switchView", error));
    },
    /** Function handleComponentVisibility
     * Function to switch between component Home and Category
     * @param {boolean} value - boolean value
    **/
    handleComponentVisibility (viewInput) {
      if (viewInput === "home") {
        this.selectedCategory = {};
        this.categoriesData = clonedeep(this.clonedCategoriesData);
      }
      this.view = viewInput;
    },
    handleSearchItem () {
      this.view = 'search';
      // Init search results data
      makeGetRequest(`search/${this.searchInputValue}`)
        .then((response) => {
          const resData = clonedeep(response.data);
          this.searchData = resData.filter((res) => res.title.toLowerCase().includes(this.searchInputValue) && res.status === "published");
          console.log(this.searchData);
        })
        .catch((error) => console.error("handleSearchItem", error));
    }   
  },
  watch: {
    searchInputValue () {
      this.handleSearchItem(true);
    }
  }
};
</script>

<style lang="scss">
	@import '../../scss/_variables.scss';

  @media (max-width: 640px) {
    .text-card {
      width: 100%;
      max-width: 640px !important;
      min-width: 100% !important;
    }
  }

  #parent-home {
    font-family: $font-family;
  }

  #child-home {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #parent-container {
    padding: 0;
    width: auto;
  }

  .text-card {
    min-width: 640px;
    max-width: 100%;
  }

  .generalStyling {
    min-height: calc(100vh - 299px);
    background: #FAFAFA;
  }

  .card-icon {
    font-size: 40px;
    color: #03A84E;
  }

  .tc-black {
    color: $text-black;
  }

  .fw-700 {
    font-weight: $fw-700;
  }

  .tc-green {
    color: $green;
  }

  .tc-gray {
    color: $text-gray;
  }

  .breadcrumb {
    --bs-breadcrumb-divider: '>';
    color: inherit;

    .breadcrumb-item {
      & + .breadcrumb-item::before {
        color: $text-gray; // Change this to your desired color
        font-weight: bold;
        content: var(--bs-breadcrumb-divider); // Use the custom separator
      }
    }
  }
</style>