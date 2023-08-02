const CustomerRouter = require("express").Router();
const CustomerModel = require("../Models/Customers.model");

//CREATING CUSTOMERS USING POST METHOD
/**
 * METHOD - POST
 * REQUEST - OBJECT<CUSTOMER>
 * RESPONSE - CREATEDOBJECT<CUTOMER>
 */

CustomerRouter.post("/create", (request, response, next) => {
  const data = request.body;

  // console.log(data);

  const Customers = new CustomerModel(data);
  Customers.save()
    .then((result) => {
      if (result && result._id) {
        return response.status(200).json({
          success: true,
          message: "CUSTOMER CREATED SUCCESSFULLY!!!",
          createdCustomer: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN CREATING CUSTOMER",
          Error: error,
        });
      }
    });
});

//FETCHING ALL BOOKING OF CUSTOMER

/**
 * METHOD - GET
 * REQUEST - {}
 * REPONSE - OBJECT<CUSTOMER WITH BOOKING DETAILS>
 */

CustomerRouter.get("/", (request, response, next) => {
  CustomerModel.aggregate([
    {
      $lookup: {
        from: "bookings",
        localField: "customerName",
        foreignField: "customerName",
        as: "BookingDetails",
      },
    },
  ])
    .then((result) => {
      if (result) {
        return response.status(200).json({
          success: true,
          message: "DATA FETCHED SUCCESSFULLY",
          Data: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN FETCHING DATA",
          Error: error,
        });
      }
    });
});
module.exports = CustomerRouter;
