import { useEffect, useState, useMemo } from "react";
import TaskItemComponent from "../molecules/TaskItem";
import { useTaskStore } from "../../store/useTaskStore";

const TaskListComponent = () => {
  const {
    fetchTasks,
    allTasks,
    activeTasks,
    completedTasks,
    deleteCompletedTasks,
    tasks,
  } = useTaskStore();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return filter === "active"
      ? activeTasks()
      : filter === "completed"
      ? completedTasks()
      : allTasks();
  }, [filter, allTasks, activeTasks, completedTasks, tasks]);

  const filters = ["all", "active", "completed"] as const;

  return (
    <>
      <div className="card-dinamic shadow-2xs mt-8 rounded-md">
        <div>
          {filteredTasks.map((task) => (
            <TaskItemComponent key={task._id} task={task} />
          ))}
        </div>
        <div className="footer h-13 items-center flex justify-between px-8 text-base">
          <div className="filter">
            <p>{filteredTasks.length} items left</p>
          </div>
          <div className="flex gap-3">
            {filters.map((type) => (
              <div
                key={type}
                onClick={() => setFilter(type)}
                className={`filter cursor-pointer ${
                  filter === type ? "active" : ""
                }`}
              >
                <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
              </div>
            ))}
          </div>
          <div className="cursor-pointer filter" onClick={deleteCompletedTasks}>
            <p>Clear completed</p>
          </div>
        </div>
      </div>
      <div className="drag-and-drop w-full flex justify-center items-center mt-10">
        <p className="filter">Drag and drop to reorder list</p>
      </div>
    </>
  );
};

export default TaskListComponent;
