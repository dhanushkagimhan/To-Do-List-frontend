import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../service/service";

export default function CreateTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(title);
        console.log(description);

        const data = await apiService.post("task/", {
            title: title,
            description: description,
        });

        console.log(data);
        if (data.status === 201) {
            console.log("created data");
        } else {
            console.log("task creation error : ", data);
        }
    };
    return (
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
                <h1 className=" text-2xl font-semibold">Create Task</h1>
                <div className="mt-5">
                    <form onSubmit={formSubmit}>
                        <label>
                            Title:
                            <br />
                            <input
                                type="text"
                                name="title"
                                className="border-2 border-slate-200"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Description:
                            <br />
                            <textarea
                                name="description"
                                className="border-2 border-slate-200"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <input
                            type="submit"
                            className="p-2 bg-slate-200 cursor-pointer"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
