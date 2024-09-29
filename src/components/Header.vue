<template>
	<div id="header-wrapper">
		<div id="header-text">
			<h1>Knowledge base doesn't have to be boring</h1>
			<h3>Everything you need to Manage your Messaging</h3>
			<div style="display: flex; justify-content: center; margin-top: 40px;">
				<div class="input-group" style="width: 720px; height: 60px;">
					<input type="text" class="form-control" placeholder="Search for answers" v-model="searchInputValue">
					<span class="input-group-text" @click="handleEmitSearchInputValue" style="cursor: pointer;"><i class="fa fa-search search-icon"></i></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	data () {
		return {
			searchInputValue: ""
		}
	},
	methods: {
    /** Function handleEmitSearchInputValue
     * Function to emit search input value to parent component
    **/
		handleEmitSearchInputValue () {
			this.$emit('updateSearchInputValue', this.searchInputValue);
			this.searchInputValue = "";
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../scss/_variables.scss';

	#header-text {
		text-align: center;
		font-family: $font-family;
		color: $text-black;
		padding: 20px;
		min-height: 299px;

		h1 {
			font-style: normal;
			font-weight: bold;
			font-size: 34px;
			line-height: 41px;
			margin-bottom: 0;
			margin-top: 30px;
		}

		h3 {
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;
			margin-top: 8px;
		}
	}

	.form-control {
		color: #9C9AA6;
		border-radius: 5px;
    &::placeholder {
      color: #9C9AA6;
			font-size: 16px;
    }
  }

  .input-group-text {
    background-color: #03A84E;
    color: #FFFFFF;
		width: 80px;
		font-size: 22px;
		display: flex;
		justify-content: center;
		align-items: center;
  }

	.search-icon {
		font-size: 20px;
	}
</style>