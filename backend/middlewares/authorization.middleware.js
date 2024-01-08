const authorization = async(req, res, next) =>{
    const token = req.headers.authorizations
    console.log(token);
    try{
        res.status(200).send({token});
    }catch(err){
        res.status(500).send({Error: err.message});
    }
}

module.exports = authorization;