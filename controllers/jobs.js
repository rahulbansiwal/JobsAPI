const Job = require('../models/Job');
const {StatusCodes}= require('http-status-codes')
const{NotFoundError} = require('../errors')




exports.getAllJobs = async (req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    
    .select('company position createdAt status');
    res.status(StatusCodes.OK)
    .json({
        jobs,
        count : jobs.length
    })
}

 exports.getJob = async(req,res)=>{
        const {params:{id:jobId},user:{userId}}= req;
        let job;
        try{
         job = await Job.findOne({_id:jobId,createdBy:userId}).select('company position createdAt status');
        
        }
        catch(err){
            console.log(err);
            throw new NotFoundError('not found')
        }
        if(!job){
            throw new NotFoundError('not found');
        }
        res.status(StatusCodes.OK).json({job});
        
}
exports.createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json(job);
}
exports.updateJob = async(req,res)=>{
    const {params:{id:jobId},user:{userId}}= req;
    
    try{
        const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true});
    }
    catch(err){
        console.log(err);
        throw new NotFoundError('not found');
    }
    res.status(StatusCodes.OK).json({msg:'Job details Updated'});
    
}
exports.deleteJob = async(req,res)=>{
    const {params:{id:jobId},user:{userId}}= req;
    let job;
    try{
        job = await Job.findByIdAndDelete({_id:jobId,createdBy:userId});
        
    }
    catch(err){
        console.log(err);
        throw new NotFoundError('not found');
    }
    if(!job){
       return  res.status(StatusCodes.NOT_FOUND).json({msg:'Job not found'});
    }
    res.status(StatusCodes.GONE).json({msg:'requested item deleted'});
}