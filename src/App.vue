<template>
	<div>
			<tawk-header @updateSearchInputValue="updateSearchInputValue"/>
			<home :searchInputValue="searchInputValue"/>
	</div>
</template>

<script>
import Header from './components/Header.vue'
import Home from './components/MainBody/Home.vue';
import clonedeep from 'lodash.clonedeep';

export default {
	name: "App",
	components: {
		'tawk-header': Header,
		'home': Home
	},
	data () {
		return {
			searchInputValue: ""
		}
	},
	methods: {
    /** Function updateSearchInputValue
     * Function to update searchInputValue data
     * @param {string} value - search input value
    **/
		updateSearchInputValue (value) {
			this.searchInputValue = clonedeep(value);
		}
	}
}
</script>

<style lang="scss" scoped>
	@import 'scss/main.scss';
</style>