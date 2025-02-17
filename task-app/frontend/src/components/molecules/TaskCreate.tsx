import { useState } from "react";
import CheckboxComponent from "../atoms/Checkbox";
import InputComponent from "../atoms/Input";
import { useTask } from "../../hooks/useTask";
import { ITask } from "../../models/Task";
import { TaskStatus } from "../../enums/TaskStatus";

const TaskCreateComponent = () => {
  const [titleTask, setTitleTask] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { addTask } = useTask();

  const handleAddTask = () => {
    const newTask: ITask = {
      title: titleTask,
      status: isChecked ? TaskStatus.COMPLETED : TaskStatus.ACTIVE,
    };

    addTask(newTask);
    cleanValues();
  };

  const cleanValues = () => {
    setTitleTask("");
    setIsChecked(false);
  };

  const handleValueInput = (value: string) => {
    setTitleTask(value);
  };

  return (
    <div className="card-dinamic h-18 px-8 flex items-center rounded-md mt-5 gap-3">
      <div>
        <CheckboxComponent checked={isChecked} onChange={setIsChecked} />
      </div>
      <div className="w-100">
        <InputComponent
          value={titleTask}
          onChange={handleValueInput}
          onEnter={handleAddTask}
        />
      </div>
    </div>
  );
};

export default TaskCreateComponent;
