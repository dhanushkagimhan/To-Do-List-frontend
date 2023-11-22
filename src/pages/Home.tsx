import { useEffect, useState } from "react";
import { TaskType } from "../types";
import { apiService } from "../service/service";
import { useNavigate } from "react-router-dom";
import { Popconfirm, message } from "antd";

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
                <div className=" flex flex-row max-sm:flex-col gap-2 pb-4 justify-between border-b-2 border-slate-200">
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
                            {taskData.isCompleted ? "Completed" : "Complete"}
                        </div>
                        <div>
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => deleteTask(taskData._id)}
                                okText="Yes"
                                cancelText="No"
                                okType="default"
                            >
                                <div className=" cursor-pointer text-red-500">
                                    Delete
                                </div>
                            </Popconfirm>
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
                            className="bg-green-400 px-4 py-2 rounded-lg"
                            onClick={() => navigate("/create")}
                        >
                            Create
                        </button>
                    </div>
                    <h1 className="text-3xl font-semibold">To Do Task List</h1>
                    <div className="mt-10">
                        {task.length === 0 ? (
                            <div className="mx-auto min-w-[200px] max-w-[1000px] text-center">
                                No Task
                            </div>
                        ) : (
                            task.map((task: TaskType, index: number) => {
                                return <TodoItem taskData={task} key={index} />;
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
