import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}
    
    async create(userDTO: CreateUserDto) {
      const { login } = userDTO;
      const user = await this.userModel.findOne({ login });
      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const createdUser = new this.userModel(userDTO);
      console.log(createdUser)
      console.log(userDTO)
      await createdUser.save();
      return this.sanitizeUser(createdUser);
    }

    async findByFunction() {
      let cur = await this.userModel.find({},{login: 1}).$where(function(){ 
        return this.login == 'ldfs'
      }).exec();
      return;
    }

  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
