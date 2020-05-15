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
			<div v-show="status == 1" class="alert alert-success rounded-pill" role="alert">
				Projeto criado com sucesso!
			</div>
			<div v-show="status == 0" class="alert alert-danger rounded-pill" role="alert">
				Falha ao criar projeto.
			</div>
			<button 
				type="submit"
				class="btn btn-primary rounded-pill mr-2"
				v-on:click.prevent="create()">
				Criar projeto
			</button>
			<button class="btn btn-outline-danger rounded-pill" @click.prevent="back">Cancelar</button>
		</form>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	name: 'CreateProject',
	data: () => {
		return {
			name: null,
			description: null,
			status: null
		}
	},
	methods: {
		create: function() {
			axios.post("https://ruanscherer-todo.herokuapp.com/project/register", { name: this.name, description: this.description })
				.then( () => { this.status = 1 } )
				.catch( () => { this.status = 0 } )
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>