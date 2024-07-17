const validatePostRequest = (req,res,next) =>{
    const {ID , Name , Rating , Description , Genre ,Cast} = req.body ;  

    const error=[] ; 

    if(typeof ID !== "number"){
        error.push("ID should be number")
    } 
    if(typeof Name !== "string"){
        error.push("Name should be String")
    } 
    if(typeof Rating !== "number"){
        error.push("Rating should be Number")
    }
    if(typeof Description !== "string"){
        error.push("Description should be String")
    }
    if(typeof Genre !== "string"){
        error.push("Genre should be String")
    }
    if(!Array.isArray(Cast) || !Cast.every(item => typeof item === "string")){
        error.push("Cast should be Array of String") ;
    }
  
    if(error.length > 0 ){
        res.status(400).json({
            message: 'bad request. some data is incorrect.',
            errors: error
          });
    }else{
        next()
    }

}

module.exports = validatePostRequest ; 