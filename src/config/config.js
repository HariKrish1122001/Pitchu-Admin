var env = "local"
var configration = {};

if (env === "local") {
    configration = {
        BACKEND_URL: "http://localhost:8000/",
       
        SECRET_KEY: "pitchudailychit1212131313",


    }
} else if (env === "demo") {
    configration = {
      
    }

} else {
    configration = {

    }
}

export default configration;