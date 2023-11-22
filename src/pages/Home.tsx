import { useEffect, useState } from "react";
import { TaskType } from "../types";
import { apiService } from "../service/service";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function Home() {
    const [task, setTask] = useState<TaskType[]>([]);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        loadDate();
    }, []);

    const loadDate = async () => {
        try {
            const data = await apiService.get("task");
            if (data.status === 200) {
                setTask(data.data.data);
            } else {
                console.log("data loading error : ", data);
                messageApi.open({
                    type: "error",
                    content: "Error in new task data loading",
                });
                setTask([]);
            }
        } catch (error) {
            console.log("data loading error : ", error);
            setTask([]);
            messageApi.open({
                type: "error",
                content: "Error in new task data loading",
            });
        }
    };

    const completeTask = async (id: string, isCompleted: boolean) => {
        try {
            const data = await apiService.patch("task/complete/" + id, {
                isCompleted: !isCompleted,
            });

            console.log(data);
            if (data.status === 200) {
                loadDate();
                const alertMsg: string = isCompleted
                    ? "Task set to not complete"
                    : "Task completed";
                messageApi.open({
                    type: "success",
                    content: alertMsg,
                });
            } else {
                console.log("task completion error : ", data);
                messageApi.open({
                    type: "error",
                    content: "Error in completion task",
                });
            }
        } catch (error) {
            console.log("task completion error : ", error);
            messageApi.open({
                type: "error",
                content: "Error in completion task",
            });
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const data = await apiService.delete("task/" + id);

            console.log(data);
            if (data.status === 200) {
                loadDate();
                messageApi.open({
                    type: "success",
                    content: "Task deleted",
                });
            } else {
                console.log("task deletion error : ", data);
                messageApi.open({
                    type: "error",
                    content: "Task deletion error",
                });
            }
        } catch (error) {
            console.log("task deletion error : ", error);
            messageApi.open({
                type: "error",
                content: "Task deletion error",
            });
        }
    };

    const TodoItem = ({ taskData }: { taskData: TaskType }) => {
        return (
            <div
                className={`p-2 mx-auto my-6 rounded-xl border-2 border-slate-200 min-w-[200px] max-w-[1000px] ${
                    taskData.isCompleted ? "bg-green-50" : "bg-yellow-50"
                }`}
            >
                <div className=" flex flex-row justify-between border-b-2 border-slate-200">
                    <div className=" font-semibold">{taskData.title}</div>
                    <div className="flex flex-row gap-2">
                        <div
                            className={`cursor-pointer ${
                                taskData.isCompleted
                                    ? "text-green-600"
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

                <div className="p-4">{taskData.description}</div>
            </div>
        );
    };

    return (
        <>
            {contextHolder}
            <div className="container mx-auto">
                <div className="mt-10 mx-5">
                    <div className="flex flex-row justify-end mb-4">
                        <button
                            className=" bg-green-400 px-4 py-2 rounded-lg"
                            onClick={() => navigate("/create")}
                        >
                            Create
                        </button>
                    </div>
                    <h1 className=" text-2xl font-semibold">To Do Task List</h1>
                    <div>
                        {task.map((task: TaskType, index: number) => {
                            return <TodoItem taskData={task} key={index} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
