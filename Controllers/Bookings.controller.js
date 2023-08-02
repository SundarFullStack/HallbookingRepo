const BookingRouter = require("express").Router();
const BookingModel = require("../Models/Bookings.model");

//BOOKING AN ROOM WITH [CUSTOMER NAME,DATE,START TIME,END TIME,ROOM ID]
/**
 * METHOD - POST
 * REQUEST - OBJECT<BOOKING>
 * RESPONSE - CERATRED OBJECT<BOOKING>
 */

BookingRouter.post("/book", (request, response, next) => {
  let data = request.body;
  // console.log(data);
  const Bookings = new BookingModel(data);
  Bookings.save()
    .then((result) => {
      if (result && result._id) {
        return response.status(200).json({
          success: true,
          message: "BOOKING CREATED SUCCESSFULLY!!!",
          createdBooking: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          success: false,
          message: "ERROR IN BOOKING CREATION!!!",
          Error: error,
        });
      }
    });
});

//FETCHING ALL ROOM DETAILS BY USING FOREIGNKEY FROM ROOMS

/**
 * METHOD - GET
 * REQUEST - {}
 * RESPONSE - OBJECT<BOOKINGS-WITH-ROOMDETAILS>
 */

BookingRouter.get("/", (request, response, next) => {
  BookingModel.aggregate([
    {
      $lookup: {
        from: "rooms",
        localField: "roomId",
        foreignField: "_id",
        as: "roomDetails",
      },
    },
  ])
    .then((result) => {
      return response.status(200).json({
        success: true,
        message: "DATA FETCHED SUCCESSFULLY!!!",
        Data: result,
      });
    })
    .catch((error) => {
      return (
        response.status(401),
        json({
          success: false,
          message: "ERROR IN FETCHING DATA!!!",
          Error: error,
        })
      );
    });
});

//FETCHING ALL CUSTOMER AND HALL DETAILS OF BOOKING

/**
 * METHOD - GET
 * REQUEST - {}
 * RESPONSE - OBJECT<CUSTOMER- (HALL & BOOKINGS DETAILS)>
 */

BookingRouter.get("/all", (request, response, next) => {
  BookingModel.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerName",
        foreignField: "customerName",
        as: "customerDetails",
      },
    },
    {
      $unwind: "$customerDetails",
    },
    {
      $lookup: {
        from: "rooms",
        localField: "roomId",
        foreignField: "_id",
        as: "roomDetails",
      },
    },
    {
      $unwind: "$roomDetails",
    },
    {
      $group: {
        _id: {
          CustomerName: "$customerDetails.customerName",
          RoomName: "$roomDetails.roomName",
          Date: "$bookingDate",
          StartTime: "$startTime",
          EndTime: "$endTime",
          BookingId: "$_id",
          BookingStatus: "$roomDetails.bookedStatus",
        },
        BookedCount: {
          $sum: "$customerDetails.bookedCount",
        },
      },
    },
  ])
    .then((result) => {
      if (result) {
        // console.log(result);
        return response.status(200).json({
          success: true,
          message: "DATA FETCHED SUCCESSFULLY!!!",
          Data: result,
        });
      }
    })
    .catch((error) => {
      if (error) {
        // console.log(error);
        return response.status(401).json({
          success: false,
          message: "ERROR IN FETCHING DATA!!!",
          Error: error,
        });
      }
    });
});

module.exports = BookingRouter;
