module.exports.uploadProfil = (req, res)=>{
    // const data = `${req.protocol}://${req.get('host')}/img/dossier`
    // const data = JSON.parse(req) 
    // console.log(data)   
    return res.status(201).send( req.file.filename)
}