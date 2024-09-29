<template>
  <div class="generalStyling" style="display:flex; justify-content: center;">
    <div style="display: flex; justify-content: center; width: 100%; padding: 20px 120px 25px 120px;">
      <div>
        <nav class="breadcrumb-nav">
          <ol class="breadcrumb" style="font-size: 14px; margin: 0;">
            <li class="breadcrumb-item"><div class="tc-green" @click="$emit('handleComponentVisibility', true)" style="cursor: pointer;">All Categories</div></li>
            <li class="breadcrumb-item active tc-gray">{{ selectedCategory.title || "" }}</li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-md-auto" style="padding: 0; width: 320px; margin-top: 15px; margin-left: 10px; min-height: 340px;">
            <div style="width: 280px; background: white; border-radius: 5px; border: 1px solid lightgrey;">
              <div style="min-height: 185px; text-align: center;">
                <div style="padding-top: 35px;"><i :class="['fa', 'fa-' + selectedCategory.icon || '', 'card-icon']"></i></div>
                <div style="padding: 20px 5px 5px 5px;font-size: 22px; font-weight: 600;">{{ selectedCategory.title || "" }}</div>
                <p class="tc-gray" style="font-size: 12px;">Updated {{ getNumberOfWeeks(selectedCategory.updatedOn) || "" }} weeks ago</p>
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
                      <span style="font-size: 17px; font-weight: 580;">{{ article.title || "" }}</span><br /><span class="tc-gray" style="font-size: 12px;">Updated {{ getReadableStringDate(article.updatedOn) || "" }}</span>
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
</template>

<script>
export default {
  name: "Category",
  props: {
    selectedCategory: { default: {} },
    articlesData: { default: [] }
  },
  methods: {
    /** Function getNumberOfWeeks
     * Function to get Number of Weeks
     * @param {string} updatedDate - date string
     * @returns {string} new string 
    **/
    getNumberOfWeeks (updatedDate) {
      const startDate = new Date(updatedDate);
      const todayDate = new Date();
      return Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24 * 7));
    },
    /** Function getReadableStringDate
     * Function get get date string in 'month, day year' format
     * @param {string} dateString - date string
     * @returns {string} new string 
    **/
    getReadableStringDate (dateString) {
      const date = new Date(dateString);
      const month = date.toLocaleString('en-US', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}, ${day} ${year}`;
    }
  }
}
</script>
