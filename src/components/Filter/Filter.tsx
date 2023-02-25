import { Card, CardContent, Container, Fade, Stack } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  header: ReactNode;
  children: ReactNode;
};

export const Filter = (props: Props) => {
  return (
    <Fade in={props.isOpen}>
      <Container sx={styles.container}>
        <Card sx={styles.card}>
          {props.header}
          <CardContent>
            <Stack display={"flex"} direction={"column"} rowGap={2}>
              {props.children}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Fade>
  );
};

const styles = {
  container: () => ({
    padding: "0 !important",
    pointerEvents: "all",
  }),
  card: () => ({
    width: 250,
    height: "auto",
  }),
  header: () => ({ fontSize: 14 }),
  table: () => ({ marginTop: 3 }),
};
