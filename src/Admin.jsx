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

  const generateTextReport = (checklist) => {
    if (!checklist || !checklist.tasks) {
      return "Data tugas tidak tersedia.\n\n";
    }

    let report = `Checklist Tugas\n\nNama: ${
      checklist.name || "Tidak ada nama"
    }\n\n`;
    for (const [category, tasks] of Object.entries(checklist.tasks)) {
      report += `${category}\n`;
      for (const [task, isCompleted] of Object.entries(tasks || {})) {
        report += `${task} ${isCompleted ? "✅" : "❌"}\n`;
      }
      report += `\n`;
    }
    return report;
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
            {checklists.map((checklist) => (
              <div
                key={checklist.id}
                className="border-2 border-gray-300 rounded-lg p-4 mb-4"
              >
                <h2 className="text-xl font-bold mb-2">
                  Nama: {checklist.name}
                </h2>
                <textarea
                  className="w-full h-64 p-2 border border-gray-300 rounded-lg"
                  readOnly
                  value={generateTextReport(checklist)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={downloadJSON}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Unduh Data JSON
      </button>
    </>
  );
};

export default Admin;
