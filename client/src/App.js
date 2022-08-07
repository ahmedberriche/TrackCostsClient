import "./App.css";
import { useEffect, useState } from "react";
import { editCost, getAllCost } from "./api";
import LineChart from "./components/Chart";

function App() {
  const [dataTableNa, setDataTableNa] = useState([]);
  const [dataTableCa, setDataTableCa] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const doGetData = async () => {
    let naTable = [];
    let caTable = [];
    try {
      getAllCost().then(async (res) => {
        const { costs } = await res.json();

        costs.map(({ CAC40, ...rest }) => {
          let time = new Date(rest.dateTime).getMonth();
          return naTable.push({ x: time + 1, y: rest.NASDAQ, id: rest._id });
        });

        costs.map(({ NASDAQ, ...rest }) => {
          let time = new Date(rest.dateTime).getMonth();
          return caTable.push({ x: time + 1, y: rest.CAC40, id: rest._id });
        });

        setDataTableNa(naTable);
        setDataTableCa(caTable);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    doGetData();
  }, []);

  const handleChange = async (e, item) => {
    await editCost({
      costId: item?.id,
      [e.target.name]: Number(e.target.value),
    });
    await doGetData();
  };
  return (
    <div className="App">
      <div className="container" style={{ border: "1px solid #7d7a7b" }}>
        <div className="legend">
          <div className="span">CAC40</div>
          <div className="span na">NASDAQ</div>
        </div>
        <LineChart dataTableCa={dataTableCa} dataTableNa={dataTableNa} />

        <div className="table">
          <table style={{ width: "100%" }}>
            <tr>
              <th>CAC40</th>
              {dataTableCa
                .sort((a, b) => a.x - b.x) //sort data asc
                .map((ele) => (
                  <td
                    className={
                      ele.id === selectedItem?.id &&
                      selectedItem["key"] === "CAC40"
                        ? "isActive"
                        : ""
                    }
                    key={ele.id}
                    onClick={() => setSelectedItem({ ...ele, key: "CAC40" })}
                  >
                    <input
                      type="number"
                      id="CAC40"
                      name="CAC40"
                      defaultValue={ele?.y}
                      onChange={(e) => handleChange(e, ele)}
                    />
                  </td>
                ))}
            </tr>
            <tr>
              <th>NASDAQ</th>
              {dataTableNa
                .sort((a, b) => a.x - b.x) // sort data asc
                .map((ele) => (
                  <td
                    className={
                      ele.id === selectedItem?.id &&
                      selectedItem["key"] === "NASDAQ"
                        ? "isActive"
                        : ""
                    }
                    key={ele.id}
                    onClick={() => setSelectedItem({ ...ele, key: "NASDAQ" })}
                  >
                    <input
                      type="number"
                      id="NASDAQ"
                      name="NASDAQ"
                      defaultValue={ele?.y}
                      onChange={(e) => handleChange(e, ele)}
                    />
                  </td>
                ))}
            </tr>
          </table>
        </div>
      </div>
      <div className="spacer" />
    </div>
  );
}

export default App;
