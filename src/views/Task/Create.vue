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
			<div class="form-group">
				<label for="project">Projeto</label>
				<select class="form-control rounded-pill" id="project_id" v-model="taskData.project_id">
					<option 
						v-for="project in projects" 
						:key="project._id"
						:value="project._id">
						{{ project.name }}
					</option>
				</select>
			</div>
			<div v-show="status == 1" class="alert alert-success rounded-pill" role="alert">
				Tarefa criada com sucesso!
			</div>
			<div v-show="status == 0" class="alert alert-danger rounded-pill" role="alert">
				Falha ao criar tarefa.
			</div>
			<button 
				type="submit" 
				class="btn btn-primary rounded-pill mr-2"
				@click.prevent="createTask">
				Criar tarefa
			</button>
			<button class="btn btn-outline-danger rounded-pill" @click.prevent="back">Cancelar</button>
		</form>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	name: 'CreateTask',
	data: () => {
		return {
			projects: null,
			taskData: {
				name: "",
				description: "",
				priority: "",
				project_id: ""
			},
			status: null
		}
	},
	methods: {
		async createTask() {
			await axios.post('https://ruanscherer-todo.herokuapp.com/task/register', this.taskData)
				.then( response => { 
					this.projects = response.data.projects;
					this.status = 1
				} )
				.catch( (error) => { 
					this.projects = error;
					this.status = 0
				} )
		},
		back() {
			this.$router.go(-1)
		}
	},
	async mounted() {
		await axios.get('https://ruanscherer-todo.herokuapp.com/project/all')
			.then( response => { this.projects = response.data.projects } )
			.catch( (error) => { this.projects = error } )
	}
}
</script>