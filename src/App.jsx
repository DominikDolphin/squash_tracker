import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
function App() {
  
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                title="Winner - Michael"
                subheader="Best out of 3"
                style={{ paddingBottom: "0px", textAlign: "center" }}
              />
              <CardContent style={{ PaddingTop: "0px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">Winner</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">Score</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">Actions</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">Michael</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">11 - 8</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="edit" color="warning">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" color="error">
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "5px" }}
                >
                  Add Round
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
