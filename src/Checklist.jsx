import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Checklist = () => {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState({});
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(false);

  const checklistCollectionRef = collection(db, "checklists");

  useEffect(() => {
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
      alert("Nama tidak boleh kosong!");
      return;
    }
    setLoading(true);
    await addDoc(checklistCollectionRef, { name, tasks });
    setName("");
    setTasks(initializeTasks());
    alert("Data berhasil disimpan!");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="text-xl ">Checklist Tugas ✔</h1>
      <label className="flex gap-2 text-xl my-4 w-[300px] font-bold  ">
        Nama:
        <input
          className="outline-none text-slate-500"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap"
        />
      </label>
      <div className="flex flex-col gap-10">
        {Object.entries(tasks).map(([category, taskList]) => (
          <div
            className="flex flex-col border-2 border-black p-5 odd:bg-blue-200 even:bg-green-200 w-[300px] rounded-lg"
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
      <button
        disabled={loading ? true : false}
        className="active:bg-slate-300 shadow-xl my-8 bg-slate-400 w-[300px] py-4 text-xl font-bold rounded-lg"
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
