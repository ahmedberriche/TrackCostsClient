const API_ENDPOINT = "http://localhost:8000"; // backend endpoint

//get all costs from database
const getAllCost = () =>
  fetch(`${API_ENDPOINT}/costs/all`, {
    method: "GET",
  });

//get costs by id from database
const getCostById = (id) =>
  fetch(`${API_ENDPOINT}/costs/` + id, {
    method: "GET",
  });
//update costs from database
const editCost = ({ costId, ...body }) =>
  fetch(`${API_ENDPOINT}/costs/` + costId, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export { getAllCost, getCostById, editCost };
