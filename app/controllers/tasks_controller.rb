class TasksController < ApplicationController
  before_action :set_project
  before_action :set_task, except: [:create]

  def create
	@task = @project.tasks.new(task_params)
	if @task.save
      template =  render :partial => 'tasks/task', locals: {:project => @task.project, :current_user => current_user, :task => @task} 
      ActionCable.server.broadcast 'tasks',
      project_id: @task.project_id,
      task_content: template,
      user_id: current_user.id
      head :ok
    end
  end

  def destroy
    if @task.destroy
	  flash[:success] = "Task was deleted!"
	else 
	  flash[:error] = "Task was not deleted"
	end
		
	  ActionCable.server.broadcast 'tasksdelete',
      task_id: @task.id
      head :ok
	end

	def complete
	  @task.update_attribute(:completed_at, Time.now)
	  template =  render :partial => 'tasks/task_inner', locals: {:project => @task.project, :current_user => current_user, :task => @task}

	  ActionCable.server.broadcast 'tasksupdate',
      task_id: @task.id,
      template: template,
      user_id: current_user.id
      head :ok
	end

	def incomplete
	  @task.update_attribute(:completed_at, nil)
	  template =  render :partial => 'tasks/task_inner', locals: {:project => @task.project, :current_user => current_user, :task => @task}

	  ActionCable.server.broadcast 'tasksupdate',
      task_id: @task.id,
      template: template,
      user_id: current_user.id
      head :ok
	end


	private

	def set_task
	  @task = @project.tasks.find(params[:id])
	end

	def set_project
	  @project = Project.find(params[:project_id])
	end

	def task_params
	  params[:task].permit(:content)
    end
end
