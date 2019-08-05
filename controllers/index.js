const express = require("express")
const router = express.Router()
const app = express()

router.use("/user", require("./user"))
router.use("/play", require("./play"))


router.get("/", function (req, res) {
    console.log("GET /")
    if (!req.session.username)
        res.render("splash", {})
    else
        res.render("home", {
            username: req.session.username
        })
})



router.get("/profile", function(req,res){
    console.log("GET /profile")
    if(req.session.username){
        res.render("profile.hbs", {
            username: req.session.username,
            elo: req.session.elo
        })
    }else{
        res.redirect("/")
    }
})

router.get("/logout", function(req,res){
    req.session.destroy((err)=>{
        console.log("ERROR destroying cookie")
    })
    res.redirect("/")
})

module.exports = router