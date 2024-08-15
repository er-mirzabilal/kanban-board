import { BoardHeader } from "@/components/BoardHeader";
import { ListsSection } from "@/components/ListsSection";
import { Container } from "@mui/material";

export default function TaskBoard() {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          overflowY: "auto",
          height: "100vh",
          backgroundColor: "#CD5A91",
        }}
      >
        <BoardHeader />
        <ListsSection />
      </Container>
    </div>
  );
}
