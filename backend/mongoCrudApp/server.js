import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const __dirname = path.resolve(path.dirname(''));

const app = express();

app.listen(3000,()=>{
    console.log('server is started at port 3000');
});

app.use(express.json());

const crudRouter = express.Router();

app.use('/',crudRouter);

app.route('/')
.get(getData)
.post(addData)
.patch(updateData)
.delete(deleteData)

function getData(req,res){
    res.sendFile('index.html',{root:__dirname});
}

function addData(req,res){

}

function updateData(req,res){

}

function deleteData(req,res){

}

const dbLink = 'mongodb+srv://root:root@expressmongodb.rmjjzpr.mongodb.net/ExpressMongoDB';

mongoose.connect(dbLink).then((db)=>{
    console.log('db is connected..');
}).catch((err)=>{
    console.log(err);
});

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.password==this.confirmPassword;
        }
    }
});

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(this.password,salt);
    this.password = hashPass;
    this.confirmPassword = undefined;
    console.log('run pre mongoDb',this);
});

userSchema.post('save',function(doc){
    console.log('run post mongoDb',doc);
});

const userModel = mongoose.model('userModel',userSchema);

async function createUser(){
    let user = {
        name:"abhishek kumar singh",
        email:"singh.abhi15101999@gmail.com",
        password:"1234567801",
        confirmPassword:"1234567801"
    }
    try{
        let data =  await userModel.create(user);
        console.log(data);
    }catch(err){
        console.log(err);
    }
}

async function getAllUsers(){
    try {
        let data = await userModel.find();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function getUser(){
    try {
        let data = await userModel.findOne({email:'singh.abhishek15@gmail.com'});
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(){
    try {
        let data = await userModel.findOneAndUpdate({email:'singh.abhishek15@gmail.com'},{email:'raj1501@gmail.com',name:'raj'});
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(){
    try {
        let data = await userModel.findOneAndDelete({email:'singh.abhishek@gmail.com'});
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

createUser();
// getAllUsers();
// getUser();
// updateUser();
// deleteUser();