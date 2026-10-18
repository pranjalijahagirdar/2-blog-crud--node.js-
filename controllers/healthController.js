const getHealth = (req, res)=>{
    res.status(200).json({
        success:true,
        message:'blog crud api is running successfully !!!'
    })
}
module.exports = {
    getHealth
}