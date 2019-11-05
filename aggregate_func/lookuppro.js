const User=require("../models/user_model");
const Profile=require("../models/profile_model");
function aggregatefunc(){
User.aggregate([
    {
        $lookup: 
        {
            from: "profile",
            localField:"_id",
            foreignfield: "id",
            as:"result"
        }

    }
])
.then(dataresult=>{
  return res.send(dataresult);
})
.catch(err=>{
   return res.send(err);
})
}
module.exports.aggregatefunc=aggregatefunc;