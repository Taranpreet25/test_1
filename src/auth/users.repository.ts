import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, In, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';



@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialDto : AuthCredentialDto): Promise<void>{

        const { username ,password} =authCredentialDto;

        


        //hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);




        const user = this.create({ username, password: hashedPassword});
      
        
        //imp for unique user name we genrate a rendom message
        try{
            await this.save(user);
        } catch (error){
            if (error.code === '23505'){
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException();
            }
            // console.log(error.code);
        }

        






    }


    async getUser(): Promise<User[]>{
        
        const query=this.createQueryBuilder("user");
        query.leftJoinAndSelect('user.depart','depart')
        query.leftJoinAndSelect('user.project','project')
        const user =await query.getMany();
        return user;

  

        
    }

   





































}




