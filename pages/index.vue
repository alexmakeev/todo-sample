<template>
	<div>
		<div v-if="!is_loaded">Loading...</div>
		<div v-else v-for="(item, item_i) of items" :key="item._id">
			<input
				type="checkbox"
				v-model="item.checked"
				@change="saveItem(item_i)"
			/>
			<span :class="{'done': item.checked}">{{item.title}}</span>
			<input type="text" v-model="item.title" @input="saveItem(item_i)"/>
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
			this.loadItems();
		},
		methods: {
			async loadItems() {
				this.is_loaded = false;
				this.items = (await this.$axios.get('/api/getAll', {})).data;
				this.is_loaded = true;
			},
			async createItem(title, spec) {
				// let id = await axios.get('/todo-items/add', {});
				let item = (await this.$axios.put('/api/createOne', {})).data; //{id: Math.random(), checked: false, title: title, spec}
				this.items.push(item);
				return item;
			},
			async saveItem(item_i) {
				let item = this.items[item_i];
				let ret = (await this.$axios.post('/api/saveOne', {id: item._id, new_attrs: item})).data;
			}
		},
	}
</script>

<style scoped>
	.done {
		text-decoration: line-through;
	}
</style>
