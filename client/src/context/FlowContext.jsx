import { createContext, useContext, useEffect, useState } from "react";
import { API_URI } from "../utils/env";
const flowContext = createContext();

const FlowProvider = ({ children }) => {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //one user can have only one flow chart
    const getFlowChart = async () => {
      try {
        const res = await fetch(`${API_URI}/api/flow`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const resp = await res.json();
        if (!resp.sucess) {
          throw new Error(resp.message);
        }
        console.log(resp);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getFlowChart();
  }, []);

  return (
    <flowContext.Provider value={{ initialEdges, initialNodes, loading }}>
      {children}
    </flowContext.Provider>
  );
};

export default FlowProvider;

export const useFlowContext = () => useContext(flowContext);
