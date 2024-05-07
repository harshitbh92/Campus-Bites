const UserModel = require("../model/UserModel")

const UserController = {
  userHomePage: (request, response) => {
    response.send({
      status: true,
      message: "hi i m home page"
    });
  },
  getUserList: async (request, response) => {
    let { gender } = request.params;
    let result = await UserModel.find({ gender: { $regex: gender, $options: "i" } }, { first_name: 1, last_name: 1, gender: 1 });
    response.send({
      status: true,
      list: result
    });
  },
  saveUserData: async (request, response) => {
    //client (postman) to server
    let user = request.body;
    // console.log(user)
    let data = {
      fullname: user.fullName,
      email: user.email,
      phone: user.phone,
      password: user.password,
      address: user.address,

    }


    const res = await UserModel.findOne({ email: data.email })
    if(res){
      response.send({
        call: false,
        message: "User is Already registered",
      })
    } else {
      let result = new UserModel(data);
      let saveData = await result.save();
      response.send({
        call: true,
        saveData,
      })
    }
  }
  ,
  userLogin: async (request, response) => {
    let { email, password } = request.body;
    let isUserValid = await UserModel.findOne({ email: email, password: password }, { password: 0 });

    if (isUserValid) {
      response.send({
        call: true,
        user: isUserValid
      })
    } else {
      response.send({
        call: false

      })
    }

  }

}

module.exports = UserController;