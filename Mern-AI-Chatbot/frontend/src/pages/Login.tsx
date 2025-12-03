import { Box } from "@mui/material"

import airRobot from "../assets/airobot.png";

const Login = () => {
    return <Box width={"100%"} height={"100%"} display="flex" flex={1}>
        <Box padding={8} mt={8} display={{md: "flex", sm: "none", xs: "None"}}>
            <img src={airRobot} alt="Robot" style={{width: "400px"}} />
        </Box>
        <Box></Box>
    </Box>
};

export default Login;