import { useEffect, useCallback, useState } from "react";

const useContextMenu = (outerRef) => {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [menu, showMenu] = useState(false);
  const [id, setid] = useState(null);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      if (outerRef && outerRef.current.contains(event.target)) {
        console.log(outerRef);
        setXPos(`${event.pageX}px`);
        setYPos(`${event.pageY}px`);
        // Do comment if you find any alternative for below line
        const target = event.target.closest("tr");
        if (target) {
          console.log("target id is ", target)
          showMenu(true);
          setid(target.id);
        }
      } else {
        setid(false);
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xPos, yPos, menu, id };
};

export default useContextMenu;
