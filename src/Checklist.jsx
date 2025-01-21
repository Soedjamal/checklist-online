import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Checklist = () => {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState({});
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    msg: "",
  });

  const checklistCollectionRef = collection(db, "checklists");

  useEffect(() => {
    console.log(message);
    const fetchChecklists = async () => {
      const data = await getDocs(checklistCollectionRef);
      setChecklists(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    fetchChecklists();
  }, []);

  const initializeTasks = () => ({
    "Story About Me": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    Catwalks: {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Butterfly Life Cycle": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Animal Kingdom": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Indonesian Map": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Clock and Time": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Virtual/Birthday Card": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Human Anatomy": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Planet Rotation and Evolutions": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Shape Variations": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Day and Night": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Animal Kingdom 2": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Life Cycle of Jelly Fish": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
    "Underwater Animals - Sharkgame": {
      "Project Mandiri": false,
      "Project Modul": false,
      "PPT/Modul": false,
    },
  });

  useEffect(() => {
    setTasks(initializeTasks());
  }, []);

  const handleTaskChange = (category, task) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: {
        ...prevTasks[category],
        [task]: !prevTasks[category][task],
      },
    }));
  };

  const handleSubmit = async () => {
    if (name.trim() === "") {
      setMessage({
        status: false,
        msg: "input wajib diisi",
      });
      return;
    }
    setLoading(true);
    await addDoc(checklistCollectionRef, { name, tasks });
    setName("");
    setTasks(initializeTasks());
    setMessage({
      status: true,
      msg: "berhasil input data",
    });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10 w-full ">
      <h1 className="text-xl ">Checklist Tugas ✔</h1>
      <div className="flex w-full justify-center my-6 ">
        <label className="flex gap-2 text-xl justify-center font-bold ">
          Nama:
          <input
            className="outline-none text-slate-500 w-[200px]"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
          />
        </label>
      </div>
      <div className="flex flex-col gap-10">
        {Object.entries(tasks).map(([category, taskList]) => (
          <div
            className="flex flex-col border-2 border-black p-5 odd:bg-blue-100 even:bg-green-100 w-[300px] rounded-lg"
            key={category}
          >
            <h3 className="text-xl font-bold mb-2">{category}</h3>
            {Object.keys(taskList).map((task) => (
              <div key={task} className="flex m-1">
                <label className="flex ">
                  <input
                    className="mr-2 "
                    type="checkbox"
                    checked={tasks[category][task]}
                    onChange={() => handleTaskChange(category, task)}
                  />
                  {task}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      {message.status ? (
        <p className="text-green-500 mt-8 mb-2 text-xl">{message.msg}</p>
      ) : (
        <p className="text-red-500 mt-8 mb-2 text-xl">{message.msg}</p>
      )}
      <button
        disabled={loading ? true : false}
        className="active:bg-slate-300 shadow-xl mb-8 bg-slate-400 w-[300px] py-4 text-xl font-bold rounded-lg"
        onClick={handleSubmit}
      >
        {loading ? "Mengirim.." : "Kirim"}
      </button>
      {/* <h2>Data Checklist</h2>
      <pre>{JSON.stringify(checklists, null, 2)}</pre> */}
    </div>
  );
};

export default Checklist;
