const RoomRouter = require("express").Router();
const RoomModel = require("../Models/Rooms.model");

//CREATE A ROOM WITH [No.Of.SEATS AVAIL,AMENTIES IN ROOM,PRICE]
/**
 * METHOD - POST
 * REQUEST - OBJECT<ROOM>
 * REQPONSE - CREATEDOBJECT<ROOM>
 */

RoomRouter.post("/create", (request, response, next) => {
  const data = request.body;
  // console.log(data);
  const Rooms = new RoomModel(data);
  Rooms.save()
    .then((result) => {
      if (result && result._id) {
        return response.status(200).json({
          success: true,
          message: "ROOM CREATED SUUCESSFULLY!!!",
          createdData: result,
        });
      }
    })
    .catch((error) => {
      return response.status(401).json({
        success: false,
        message: "ERROR IN CREATING ROOM!!!",
        Error: error,
      });
    });
});

module.exports = RoomRouter;
