import React from "react";
import Typography from "@material-ui/core/Typography";

type MyPastesPageProps = {
  path?: string;
};

const MyPastesPage: React.FC<MyPastesPageProps> = () => (
  <Typography variant="h5">My Pastes</Typography>
);

export default MyPastesPage;
