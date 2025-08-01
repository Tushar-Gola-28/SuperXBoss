import { Card } from "@mui/material";
import React from "react";

const DonutCard = ({ children }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        boxShadow: 0,
      }}
    >
      {children}
    </Card>
  );
};

export default DonutCard;
