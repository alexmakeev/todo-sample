<template>
	<div>
		<div v-if="!is_loaded">Loading...</div>
		<div v-else v-for="(item, item_i) of items" :key="item.id">
			<input
				type="checkbox"
				v-model="item.checked"/>
			<span :class="{'done': item.checked}">{{item.title}}</span>
			<input type="text" v-model="item.title"/>
			<button @click="items.splice(item_i, 1)">Delete</button>
		</div>
		<button @click="createItem()">Add</button>

		Total undone: {{items.filter(it => !it.checked).length}}
	</div>
</template>

<script>
	// const axios = require('axios');

	export default {
		data: () => {
			return {
				items: [],
				is_loaded: true
			}
		},
		async created() {
			try {
				let item_a = await this.createItem('a');
				await this.createItem('b');
				await this.createItem('c');
				await this.createItem('d');
				await this.createItem('e');
				item_a.title = "sdfadsf"
			} catch (err) {
				console.error(err);
			}

		},
		methods: {
			async loadItems() {
				this.is_loaded = false;
				// this.items = await axios.get('/todo-items/get_all', {});
				this.is_loaded = true;
			},
			async createItem(title, spec) {
				// let id = await axios.get('/todo-items/add', {});
				let item = {id: Math.random(), checked: false, title: title, spec}
				this.items.push(item);
				return item;
			}
		}
	}
</script>

<style scoped>
	.done {
		text-decoration: line-through;
	}
</style>
