import React from "react";
import { Container, Column } from "rbx";

const NewPaste: React.FC = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Column.Group>
        <Column size="three-quarters">
          {/* TODO: NewPasteForm */}
          <h1>Placeholder for NewPasteForm</h1>
        </Column>
        <Column>
          {/* TODO: Recent Pastes */}
          <h1 className="has-text-right">Placeholder for Recent Pastes</h1>
        </Column>
      </Column.Group>
    </Container>
  );
};

export default NewPaste;
