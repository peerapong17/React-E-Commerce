import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

const connectDB = (app) => {
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      app.listen(PORT, function () {
        console.log(`Server started on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

export default connectDB;
