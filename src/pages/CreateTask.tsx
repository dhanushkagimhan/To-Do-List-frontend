import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../service/service";
import { message } from "antd";

export default function CreateTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [messageApi, contextHolder] = message.useMessage();

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await apiService.post("task/", {
                title: title,
                description: description,
            });

            console.log(data);
            if (data.status === 201) {
                setTitle("");
                setDescription("");
                console.log("created data");
                messageApi.open({
                    type: "success",
                    content: "New task created",
                });
            } else {
                console.log("task creation error : ", data);
                messageApi.open({
                    type: "error",
                    content: "Error in new task creation",
                });
            }
        } catch (error) {
            console.log("task creation error : ", error);
            messageApi.open({
                type: "error",
                content: "Error in new task creation",
            });
        }
    };
    return (
        <>
            {contextHolder}
            <div className="container mx-auto">
                <div className="mt-10 mx-5">
                    <div className="flex flex-row justify-end mb-4">
                        <button
                            className=" bg-green-400 px-4 py-2 rounded-lg"
                            onClick={() => navigate("/")}
                        >
                            ToDo List
                        </button>
                    </div>
                    <h1 className="text-3xl font-semibold">Create Task</h1>
                    <div className="mt-10 min-w-[200px] max-w-[1000px] mx-auto">
                        <form onSubmit={formSubmit}>
                            <label>
                                Title:
                                <br />
                                <input
                                    type="text"
                                    name="title"
                                    className="border-2 border-slate-200 w-full rounded-lg h-10 p-4"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                            </label>
                            <br />
                            <br />
                            <label>
                                Description:
                                <br />
                                <textarea
                                    name="description"
                                    className="border-2 border-slate-200 w-full h-40 rounded-lg p-4"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    value={description}
                                    required
                                />
                            </label>
                            <br />
                            <br />
                            <div className=" flex flex-row justify-end">
                                <input
                                    type="submit"
                                    className="p-2 bg-slate-200 cursor-pointer rounded-lg"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
