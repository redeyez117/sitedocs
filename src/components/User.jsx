import { LocationOn } from "@mui/icons-material";
import { Card, Box, Chip, Stack, Typography } from "@mui/material";

const User = ({ user }) => {
  return (
    <Card>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography>{`${user.FirstName ? user.FirstName : ''} ${user.LastName ? user.LastName : ''}`}</Typography>
        <Stack mt={1} direction={"row"} justifyContent={"space-between"}>
          <Typography>
            {user.JobTitle ? user.JobTitle : "Unemployed"}
          </Typography>
          <Chip
            label={user.Active === true ? "Active user" : "Not active user"}
            sx={{ color: user.Active === true ? "blue" : "red" }}
          ></Chip>
        </Stack>
        <Typography>
          {user.MobileNumber ? user.MobileNumber : "324131xxxxxxx"}
        </Typography>
      </Box>
      <Stack
        sx={{ px: 2, py: 1, bgcolor: "powderblue" }}
        direction={"row"}
        spacing={0.5}
      >
        <LocationOn sx={{ color: "grey" }}></LocationOn>
        <Typography>
          {user.StreetAddress ? user.StreetAddress : "32 Road"}
        </Typography>
      </Stack>
    </Card>
  );
};

export default User;
