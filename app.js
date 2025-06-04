import express from "express";
import filesRouter from "#api/routes/filesRouter";
import foldersRouter from "#api/routes/foldersRouter";

const app = express();

app.use(express.json());

app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Sorry! Something went wrong!" });
});

export default app;
