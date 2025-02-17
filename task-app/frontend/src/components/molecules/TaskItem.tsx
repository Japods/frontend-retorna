import CheckboxComponent from "../atoms/Checkbox";
import CrossIcon from "../../assets/icon-cross.svg";
import { ITask } from "../../models/Task";
import { TaskStatus } from "../../enums/TaskStatus";
import { useTask } from "../../hooks/useTask";

interface TaskItemProps {
  task: ITask;
}

const TaskItemComponent: React.FC<TaskItemProps> = ({ task }) => {
  const { deleteTask, updateTask } = useTask();

  const handleCheckboxChange = (checked: boolean) => {
    const newStatus = checked ? TaskStatus.COMPLETED : TaskStatus.ACTIVE;

    if (task._id) {
      updateTask(task._id, { ...task, status: newStatus }); // Actualiza la tarea completa con el nuevo estado
    }
  };

  const deleteTaskHandler = () => {
    if (task._id) {
      deleteTask(task._id);
    }
  };

  return (
    <div className="task-container flex items-center gap-3 justify-between group px-8 item-task-border">
      <div className="flex items-center gap-5">
        <CheckboxComponent
          checked={task.status === TaskStatus.COMPLETED}
          onChange={handleCheckboxChange}
        />
        <div>
          <div>
            <h4
              className={`${
                task.status === TaskStatus.COMPLETED
                  ? "line-through text-light-grayish-blue completed-task"
                  : "text-very-dark-grayish-blue dark:text-light-grayish-blue"
              }`}
            >
              {task.title}
            </h4>
          </div>
        </div>
      </div>
      <div>
        <img
          className="cursor-pointer hidden group-hover:block"
          src={CrossIcon}
          alt=""
          onClick={deleteTaskHandler}
        />
      </div>
    </div>
  );
};

export default TaskItemComponent;
