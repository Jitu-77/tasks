const healthCheckController = (req,res)=>{
    return res.status(200).json({message:"All good to go"})
}
export default healthCheckController