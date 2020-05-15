<template>
	<section class="card shadow-sm radius mt-3 p-4">
		<form>
			<div class="form-group">
				<label for="name">Nome</label>
				<input 
					type="text" 
					class="form-control rounded-pill" 
					id="name" 
					placeholder="ex.: Subir site"
					v-model="taskData.name">
			</div>
			<div class="form-group">
				<label for="description">Descrição</label>
				<input 
					type="text" 
					class="form-control rounded-pill" 
					id="description"
					v-model="taskData.description">
			</div>
			<div class="form-group">
				<label for="priority">Prioridade</label>
				<select class="form-control rounded-pill" id="priority" value="1" v-model="taskData.priority">
					<option value="1">Urgente</option>
					<option value="2">Pouco urgente</option>
					<option value="3">Não urgente</option>
				</select>
			</div>
			<div v-show="!status" class="alert alert-danger rounded-pill" role="alert">
				Falha ao salvar alterações.
			</div>
			<button 
				type="submit" 
				class="btn btn-primary rounded-pill mr-2"
				@click.prevent="updateTask">
				Salvar alterações da tarefa
			</button>
			<button class="btn btn-outline-danger rounded-pill" @click.prevent="back">Cancelar</button>
		</form>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	name: 'EditTask',
	data: () => {
		return {
			taskData: {
				name: "",
				description: "",
				priority: "",
				project_id: null,
				complete: false
			},
			status: true
		}
	},
	methods: {
		updateTask: function() {
			axios.put(`https://ruanscherer-todo.herokuapp.com/task/update/${this.$route.params.id}`, this.taskData)
				.then( () => { this.$router.replace(`/overview/${this.taskData.project_id}`) } )
				.catch( () => { this.status = false } )
		},
		back() {
			this.$router.go(-1)
		}
	},
	async mounted() {
		await axios.get(`https://ruanscherer-todo.herokuapp.com/task/id/${this.$route.params.id}`)
			.then( (response) => { 
				const { name, description, priority, project_id, complete } = response.data.task
				this.taskData.name = name
				this.taskData.description = description
				this.taskData.priority = priority
				this.taskData.project_id = project_id
				this.taskData.complete = complete
			} )
			.catch( (err) => { this.name = err } )
	}
}
</script>