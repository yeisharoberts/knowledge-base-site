<template>
  <div id="parent-home">
    <!-------------------- HOME VIEW -------------------->
    <div class="generalStyling" id="child-home" v-if="homeView">
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
    <div class="generalStyling" style="display:flex; justify-content: center;" v-else>
      <div style="display: flex; justify-content: center; width: 100%; padding: 20px 120px 25px 120px;">
        <div>
          <nav class="breadcrumb-nav">
            <ol class="breadcrumb" style="font-size: 14px; margin: 0;">
              <li class="breadcrumb-item"><div class="tc-green" @click="handleComponentVisibility(true)" style="cursor: pointer;">All Categories</div></li>
              <li class="breadcrumb-item active tc-gray">{{ selectedCategory.title || "" }}</li>
            </ol>
          </nav>
          <div class="row">
            <div class="col-md-auto" style="padding: 0; width: 320px; margin-top: 15px; margin-left: 10px; min-height: 340px;">
              <div style="width: 280px; background: white; border-radius: 5px; border: 1px solid lightgrey;">
                <div style="min-height: 185px; text-align: center;">
                  <div style="padding-top: 35px;"><i :class="['fa', 'fa-' + selectedCategory.icon || '', 'card-icon']"></i></div>
                  <div style="padding: 20px 5px 5px 5px;font-size: 22px; font-weight: 600;">{{ selectedCategory.title }}</div>
                  <p class="tc-gray" style="font-size: 12px;">Updated {{ getNumberOfWeeks(selectedCategory.updatedOn) }} weeks ago</p>
                </div>
                <div style="min-height: 160px; text-align: center; border-top: 1px solid lightgray;">
                  <div class="pt-3">
                    <i class="fa fa-info-circle tc-green" style="font-size: 20px;"></i>
                  </div>
                  <div class="tc-gray" style="font-size: 13px; overflow-wrap: anywhere; padding: 10px 25px 10px 25px;">
                    {{ selectedCategory.description || "" }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-auto">
              <div class="card text-card" style="margin-top: 15px; min-height: 91.54px;" v-for="article in articlesData" :key="article.id">
                <div class="card-body" style="min-height: 91.54px;">
                  <div class="row" style="height: 100%;">
                    <div class="col-10" style="display: flex; align-items: center;">
                      <i class="fa fa-file-text tc-green" style="padding: 20px; font-size: 20px;"></i>
                      <div>
                        <span style="font-size: 17px; font-weight: 580;">{{ article.title }}</span><br /><span class="tc-gray" style="font-size: 12px;">Updated {{ getReadableStringDate(article.updatedOn) }}</span>
                      </div>
                    </div>
                    <div class="col tc-green" style="font-size: 30px; display: flex; justify-content: end; align-items: center; padding-right: 25px;">></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clonedeep from "lodash.clonedeep";
import { makeGetRequest } from "../../helpers/request";

export default {
  name: "Home",
  props: {
    searchInputValue: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      categoriesData: [],
      clonedCategoriesData: [],
      homeView: true,
      selectedCategory: {},
      articlesData: [],
      clonedArticlesData: []
    }
  },  
  created () {
    this.initCategoriesData();
  },
  methods: {
    // Function to get list of categories
    initCategoriesData () {
      makeGetRequest("categories")
        .then((reqResponse) => {
          const resData = clonedeep(reqResponse.data);
          this.categoriesData = resData.filter((category) => category.enabled).sort((firstCategory, secondCategory) => firstCategory.order - secondCategory.order) || [];
          this.clonedCategoriesData = clonedeep(this.categoriesData);
        })
        .catch(error => console.error("initCategoriesData", error));
    },
    getLastUpdate (dateUpdated) {
      const updatedDate = new Date(dateUpdated);
      const todayDate = new Date();
      return Math.floor((todayDate - updatedDate) / (1000 * 60 * 60 * 24));
    },
    handleSearchCategories (searchValue) {
      const component = this.homeView ? 'categoriesData' : 'articlesData';
      const clonedComponent = this.homeView ? 'clonedCategoriesData' : 'clonedArticlesData';
      if (!searchValue) {
        this[component] = clonedeep(this[clonedComponent]);
        return;
      }
      const filteredComponent = clonedeep(this[clonedComponent]).filter(component => 
        component.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      this[component] = filteredComponent.length ? filteredComponent : clonedeep(this[clonedComponent]);
    },
    switchView (category) {
      this.selectedCategory = clonedeep(category);
      // Call API to get Articles
      makeGetRequest(`category/${category.id}`)
        .then((reqResponse) => {
          const resData = clonedeep(reqResponse.data);
          this.articlesData = resData.filter((article) => article.status === "published").sort((firstArticle, secondArticle) => firstArticle.order - secondArticle.order) || [];
          this.clonedArticlesData = clonedeep(this.articlesData);
          this.handleComponentVisibility(false);
        })
        .catch(error => console.error("switchView", error));
    },
    handleComponentVisibility (value) {
      if (value) {
        this.selectedCategory = {};
        this.categoriesData = clonedeep(this.clonedCategoriesData);
      }
      this.homeView = value;
    },
    getNumberOfWeeks (updatedDate) {
      const startDate = new Date(updatedDate);
      const todayDate = new Date();
      return Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24 * 7));
    },
    getReadableStringDate (dateString) {
      const date = new Date(dateString);
      const month = date.toLocaleString('en-US', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}, ${day} ${year}`;
    }
  },
  watch: {
    searchInputValue (newValue) {
      this.handleSearchCategories(newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
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

  .text-card{
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