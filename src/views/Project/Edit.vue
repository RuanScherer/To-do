<template>
	<section class="card shadow-sm radius mt-3 p-4">
		<form>
			<div class="form-group">
				<label for="name">Nome</label>
				<input 
					type="text" 
					class="form-control rounded-pill" 
					id="name" 
					placeholder="Meu Projeto"
					v-model="name"
					required>
			</div>
			<div class="form-group">
				<label for="description">Descrição</label>
				<input 
					type="text" 
					class="form-control rounded-pill" 
					id="description"
					placeholder="Um projeto incrível"
					v-model="description">
			</div>
			<div v-show="!status" class="alert alert-danger rounded-pill" role="alert">
				Falha ao salvar alterações.
			</div>
			<button 
				type="submit"
				class="btn btn-primary rounded-pill mr-2"
				v-on:click.prevent="updateProject()">
				Salvar alterações do projeto
			</button>
			<button class="btn btn-outline-danger rounded-pill" @click.prevent="back">Cancelar</button>
		</form>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	name: 'EditProject',
	data: () => {
		return {
			name: null,
			description: null,
			status: true
		}
	},
	methods: {
		updateProject: function() {
			axios.put(`https://ruanscherer-todo.herokuapp.com/project/update/${this.$route.params.id}`, { name: this.name, description: this.description })
				.then( () => { this.$router.replace(`/overview/${this.$route.params.id}`) } )
				.catch( () => { this.status = false } )
		},
		back() {
			this.$router.go(-1)
		}
	},
	async mounted() {
		axios.get(`https://ruanscherer-todo.herokuapp.com/project/id/${this.$route.params.id}`)
			.then( (response) => { 
				this.name = response.data.project.name
				this.description = response.data.project.description
			} )
			.catch( (err) => { this.name = err } )
	}
}
</script>