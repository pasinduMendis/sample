const { StatusCodes } = require("http-status-codes");

const SUCCESS_STATUS = "success";
const ERROR_STATUS = "error";

const ResponseBody =(data, status, message, code)=>{
  return {
    status: status,
    data:data,
    message:message,
    code:code,
  };
}

const  ErrorResponse=(res)=> {

 return { 
  badRequest:(message)=>{
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        ResponseBody(
          {},
          ERROR_STATUS,
          message ??
            "The request is invalid or malformed. Please check the provided data and try again.",
          StatusCodes.BAD_REQUEST
        )
      );
  },

  unAuthorized:(message)=> {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        ResponseBody(
          {},
          ERROR_STATUS,
          message ??
            "You are not authorized to access this resource. Please log in or provide valid credentials.",
          StatusCodes.UNAUTHORIZED
        )
      );
  },

  notFound:(message)=> {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        ResponseBody(
          {},
          ERROR_STATUS,
          message ?? "The requested resource was not found on the server.",
          StatusCodes.NOT_FOUND
        )
      );
  },

  internalServerError:(message) =>{
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        ResponseBody(
          {},
          ERROR_STATUS,
          message ??
            "An unexpected error occurred on the server. Please try again later or contact the support team for assistance.",
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
  },

  serviceUnavailable:(message) =>{
    return res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .json(
        ResponseBody(
          {},
          ERROR_STATUS,
          message ??
            "The server is currently unable to handle the request due to maintenance or overload. Please try again later.",
          StatusCodes.SERVICE_UNAVAILABLE
        )
      );
  },
}
}

const SuccessResponse=(res)=> {

  return {
    ok:(data, message)=> {
    return res
      .status(StatusCodes.OK)
      .json(
        ResponseBody(
          data ?? {},
          SUCCESS_STATUS,
          message ?? "Request successful",
          StatusCodes.OK
        )
      );
  },

  created:(data, message)=> {
    return res
      .status(StatusCodes.CREATED)
      .json(
        ResponseBody(
          data ?? {},
          SUCCESS_STATUS,
          message ?? "Resource created successfully",
          StatusCodes.CREATED
        )
      );
  }
}
}

module.exports = {
  ErrorResponse: ErrorResponse,
  SuccessResponse: SuccessResponse,
};
