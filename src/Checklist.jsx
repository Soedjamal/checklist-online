import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Checklist = () => {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState({});
  const [checklists, setChecklists] = useState([]);

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
    await addDoc(checklistCollectionRef, { name, tasks });
    setName("");
    setTasks(initializeTasks());
    alert("Data berhasil disimpan!");
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl ">Checklist Tugas ✔</h1>
      <label className="text-xl my-4">
        Nama:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama"
        />
      </label>
      <div className="flex flex-col gap-10">
        {Object.entries(tasks).map(([category, taskList]) => (
          <div
            className="flex flex-col border-2 border-black p-5 w-[300px] rounded-lg"
            key={category}
          >
            <h3 className="text-xl">{category}</h3>
            {Object.keys(taskList).map((task) => (
              <div key={task} className="flex ">
                <label className="flex">
                  <input
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
        className="my-8 bg-slate-200 w-[300px] py-4 text-xl font-bold rounded-lg"
        onClick={handleSubmit}
      >
        Simpan
      </button>
      {/* <h2>Data Checklist</h2> */}
      {/* <pre>{JSON.stringify(checklists, null, 2)}</pre> */}
    </div>
  );
};

export default Checklist;
