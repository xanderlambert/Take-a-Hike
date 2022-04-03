import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import PackingList from "./PackingList.jsx";
//mport UserProfile from "./UserProfile.jsx";

const Quartermaster = () => {
  // assign the state variable to an object with listName and items, and array
  const [listNameAndPnkListDescription, setListNameAndPankListDescription] =
    useState({ listName: "", packingListDescription: "" });
  const [packingListsNames, setPackingListsNames] = useState([]);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    console.log("LINE 78 data");
    axios
      .get("/api/packingLists")
      .then((response) => {
        console.log("ALL LISTS FROM DATABASE LINE 79 ||", response.data);
        setPackingListsNames([...response.data]);
      })
      .catch((err) => {
        console.error("LINE 34 ERROR ON THE SERVER SIDE", err);
      });
    axios
      .get("/profile")
      .then((profile) => {
        const user = profile.data;
        setUserId(user._id);
        setUserName(user.fullName);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      });
  }, []);

  //captures input list name from the user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListNameAndPankListDescription((state) => {
      return { ...state, [name]: value };
    });
  };

  //Data packing lists are being feched by can't state e not resetting.
  const handleSubmit = (event) => {
    //allow react to control the state variables changed on change
    event.preventDefault();
    axios
      //send the user list to the server
      .post("/api/packingLists", {
        listName: listName,
        packingListDescription: packingListDescription,
      })
      .then((data) => {
        console.log("Line 61 => this code block was reached", data);
        setListNameAndPankListDescription((state) => {
          return { ...state, listName: "", packingListDescription: "" };
        });
      })
      .catch((err) => {
        console.log("Line 64 => this code block was reached", err);
      });
    alert("Packing list saved successfully!");
  };
  console.log(packingListsNames);
  const { packingListDescription, listName } = listNameAndPnkListDescription;
  return (
    <>
      <h3 className="header">{userName}'s Quartermaster</h3>
      <div className="quart-description">
        <p>Make and save the lists you'll need for your hiking adventures</p>
      </div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          placeholder="Packing list name"
          onChange={handleInputChange}
          name="listName"
          value={listName}
        />
        <br></br>
        <br></br>
        <label>
          <textarea
            type="text"
            placeholder="Description"
            onChange={handleInputChange}
            name="packingListDescription"
            value={packingListDescription}
          />
        </label>
        <br></br>
        <br></br>
        <>List Items bellow:</>
        <br></br>

        <br></br>
        <br></br>
        <Link
          to={`/packinglist/${packingListsNames.map(
            (packingList) => packingList._id
          )}`}
        >
          <button type="submit">Create and save</button>
        </Link>
      </form>
      <br></br>
      <br></br>
      <div>
        <h3>My packing Lists</h3>
        {packingListsNames.map((listName) => {
          //console.log("LINE 124", listName);
          //console.log(packingList.packingListNames);
          return <div key={listName._id}>{listName.listName}</div>;
        })}
      </div>
      <div></div>

      {/* <UserProfile packingListNames={packingListNames} /> */}
    </>
  );
};

export default Quartermaster;

// const getAllPackingLists = () => {
//   axios
//     .get("/api/packingLists")
//     .then((response) => {
//       //console.log("ALL LISTS FROM DATABASE LINE 59 ||", response.data);
//       setPackingList((state) => {
//         return {
//           ...state,
//           listName: "",
//           listItem: "",
//           packingListDescription: "",
//           packingListNames: response.data,
//         };
//       });

//     })
//     .catch((err) => {
//       console.error("LINE 68 ERROR ON THE SERVER SIDE", err);
//     });
// };
