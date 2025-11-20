import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import openAIImage from "../../assets/openai.png";

const Logo = () => {
  return (
    <Box sx={{ display: "flex", mr: "auto", alignItems: "center", gap: 1 }}>
      <Link to={"/"}>
        <img
          src={openAIImage}
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-color"
        />
      </Link>
      <Typography
        sx={{
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{fontSize: "30px"}}>MERN</span>-GPT
      </Typography>
    </Box>
  );
};

export default Logo;
