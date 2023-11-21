import { useEffect, useState } from "react";
import { TaskType } from "../types";
import { apiService } from "../service/service";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [task, setTask] = useState<TaskType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadDate();
    }, []);

    const loadDate = async () => {
        const data = await apiService.get("task");
        if (data.status === 200) {
            setTask(data.data.data);
        } else {
            console.log("data loading error : ", data);
            setTask([]);
        }
    };

    const completeTask = async (id: string, isCompleted: boolean) => {
        const data = await apiService.patch("task/complete/" + id, {
            isCompleted: !isCompleted,
        });

        console.log(data);
        if (data.status === 200) {
            loadDate();
        } else {
            console.log("task completion error : ", data);
        }
    };

    const deleteTask = async (id: string) => {
        const data = await apiService.delete("task/" + id);

        console.log(data);
        if (data.status === 200) {
            loadDate();
        } else {
            console.log("task deletion error : ", data);
        }
    };

    const TodoItem = ({ taskData }: { taskData: TaskType }) => {
        return (
            <div className="p-2 my-6 rounded-xl border-2 border-slate-200 min-w-[200px] max-w-[1000px]">
                <div className=" flex flex-row justify-between border-b-2 border-slate-200">
                    <div className="">{taskData.title}</div>
                    <div className="flex flex-row gap-2">
                        <div
                            className={`cursor-pointer ${
                                taskData.isCompleted
                                    ? "text-green-500"
                                    : "text-blue-400"
                            }`}
                            onClick={() =>
                                completeTask(taskData._id, taskData.isCompleted)
                            }
                        >
                            {taskData.isCompleted ? "completed" : "complete"}
                        </div>
                        <div
                            className=" cursor-pointer text-red-500"
                            onClick={() => deleteTask(taskData._id)}
                        >
                            delete
                        </div>
                    </div>
                </div>

                <div>{taskData.description}</div>
            </div>
        );
    };

    return (
        <div className="container mx-auto">
            <div className="mt-10 mx-5">
                <div className="flex flex-row justify-end mb-4">
                    <button
                        className=" bg-green-400 px-2 rounded-lg"
                        onClick={() => navigate("/create")}
                    >
                        Create
                    </button>
                </div>
                <h1>To Do Task List</h1>
                <div>
                    {task.map((task: TaskType, index: number) => {
                        return <TodoItem taskData={task} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}
