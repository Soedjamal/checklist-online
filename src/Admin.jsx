import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Admin = () => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchChecklists = async () => {
      const checklistCollectionRef = collection(db, "checklists");
      const data = await getDocs(checklistCollectionRef);
      setChecklists(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchChecklists();
  }, []);

  const predefinedCategories = [
    "Story About Me",
    "Catwalks",
    "Butterfly Life Cycle",
    "Animal Kingdom",
    "Indonesian Map",
    "Clock and Time",
    "Virtual/Birthday Card",
    "Human Anatomy",
    "Planet Rotation and Evolutions",
    "Shape Variations",
    "Day and Night",
    "Animal Kingdom 2",
    "Life Cycle of Jelly Fish",
    "Underwater Animals - Sharkgame",
  ];

  const predefinedTasks = ["Project Mandiri", "Project Modul", "PPT/Modul"];

  const generateTextReport = (checklist) => {
    if (!checklist || !checklist.tasks) {
      return "Data tugas tidak tersedia.\n\n";
    }

    let report = `Checklist Tugas\n\nNama : ${
      checklist.name || "Tidak ada nama"
    }\n\n`;

    for (const category of predefinedCategories) {
      report += `${category}\n`;

      const tasks = checklist.tasks[category] || {};
      for (const task of predefinedTasks) {
        const isCompleted = tasks[task] || false;
        report += `${predefinedTasks.indexOf(task) + 1}. ${task} ${
          isCompleted ? "✅" : "❌"
        }\n`;
      }
      report += `\n`;
    }

    return report;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Laporan berhasil disalin ke clipboard!");
  };

  const downloadJSON = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(checklists, null, 2)
    )}`;
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "checklists.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold my-5">Admin Panel</h1>
        {checklists.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <div className="w-full max-w-4xl">
            {checklists.map((checklist) => {
              const reportText = generateTextReport(checklist);
              return (
                <div
                  key={checklist.id}
                  className="border-2 border-gray-300 rounded-lg p-4 mb-4"
                >
                  <h2 className="text-xl font-bold mb-2">
                    Nama: {checklist.name}
                  </h2>
                  <textarea
                    className="w-full h-64 p-2 border border-gray-300 rounded-lg mb-4"
                    readOnly
                    value={reportText}
                  />
                  <button
                    onClick={() => handleCopy(reportText)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Copy
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        onClick={downloadJSON}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Unduh Data JSON
      </button>
    </>
  );
};

export default Admin;
