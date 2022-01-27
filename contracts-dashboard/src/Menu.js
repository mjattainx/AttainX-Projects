import React from "react";

import useContextMenu from "./useContextMenu";
import axios from 'axios';


const Menu = ({ outerRef }) => {
  //console.log("from Menu before ", outerRef);
  const { xPos, yPos, menu, id } = useContextMenu(outerRef);

  const destroy = (contractId, contractName) => {
		// return console.log("destroy ", id)
		//const updatedRows = rows.filter()
		axios.delete('https://lepc4h05p3.execute-api.us-east-1.amazonaws.com/dev',
		{ data : {
			"contract id" : contractId,
			"contract name" : contractName
			},
			headers : {
			"Content-Type": "application/json",
			 "Accept": "application/json"
			}
		})
		.then(res => {
			console.log(res.data);
		})
		.catch((err) => {
				console.log(err);
		})
	}

  // const addNewRow = () => {
  //   var table = document.getElementById("current-table");
  //   var row = table.insertRow(3);
  //   for (let i = 0; i < 10; i++) {
  //     //eval('var ' + 'cell' + i + '= ') = row.insertCell(i);
  //     window['cell'+i] = row.insertCell(i)
  //     if (i !== 2 && i !== 8 && i !== 9) {
  //       window['cell'+i].innerHTML = "REQUIRED"
  //     }
  //     // celli.innerHTML = "REQUIRED"
  //   }
    

  // }

  if (menu && id) {
    let splitted = id.split("---", 2)
    let s1 = splitted[0]
    let s2 = splitted[1]
    // console.log("s1 is ", s2)
    
    return (
      <ul className="menu" style={{ top: yPos, left: xPos }}>
        <div>Contract ID is {s1}</div>
        <div>Contract Name is {s2} </div>
        <div className="contextMenu--separator" />
                
        {/* <div className="contextMenu--option" onClick = {() => addNewRow()}>Create New Entry</div> */}
        <div className="contextMenu--option">Update</div>
        <div className="contextMenu--option" onClick = {() => destroy(s1, s2)}>Delete</div>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
