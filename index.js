import express from "express";
import cors from "cors";
import { connectToDataBase } from "./mongo.js";
import Product from "./models/product.js";

const app = express();
//cors
app.use(
  cors({
    //origin: "http://localhost:5174",
  })
);
//to get the JSON data
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hey, the app is listening here!!");
});

//get router
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send({
      products: products,
    });
  } catch (error) {
    res.send("Error while fetching products");
  }
});

//get router
app.get("/products/:id", async (req, res) => {
  try {
    const params = req.params;
    console.log(params);
    const product = await Product.findById(params.id);

    if (!product) {
      res.send("Product not found");
    }
    res.send({
      product,
    });
  } catch (error) {
    res.send("Error in products while running");
  }
});

//post router
app.post("/products", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await Product.create({
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
    });
    res.send({
      product: product,
    });
  } catch (error) {
    res.send("Error in post");
  }
});

//put router
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params; // Destructure id from params
    const updatedProduct = req.body;

    // Corrected method name: findByIdAndUpdate
    const existingProduct = await Product.findByIdAndUpdate(
      id,
      { ...updatedProduct },
      { new: true } // Returns the updated document
    );

    if (!existingProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.send({
      product: existingProduct,
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    res.status(500).send("Error in PUT");
  }
});

// app.put("/products/:id", async (req, res) => {
//   try {
//     const params = req.params;
//     const updatedProduct = req.body;
//     const existingProduct = await Product.findByIdandUpdate(params.id, {
//       ...updatedProduct,
//     });
//     res.send({
//       product: existingProduct,
//     });
//   } catch (error) {
//     res.send("Error in put");
//   }
// });

//delete router
app.delete("/products/:id", async (req, res) => {
  try {
    const params = req.params;
    const response = await Product.findByIdAndDelete(params.id);
    if (!response) {
      return res.send("Product is already deleted!");
    } else {
      res.send("product deleted!");
    }
  } catch (error) {
    res.send("Error in put");
  }
});

//port is listening
app.listen(port, () => {
  connectToDataBase();
  console.log("Error while connecting to the database");
});
