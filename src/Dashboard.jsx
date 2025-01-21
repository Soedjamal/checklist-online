import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

const Dashboard = () => {
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

  return (
    <>
      {checklists.map((list, i) => (
        <p key={i}>{list}</p>
      ))}
    </>
  );
};

export default Dashboard;
