import React from "react";

import NewPasteForm from "../components/NewPasteForm";

type NewPastePageProps = {
  path?: string;
};

const NewPastePage: React.FC<NewPastePageProps> = () => {
  return <NewPasteForm />;
};

export default NewPastePage;
