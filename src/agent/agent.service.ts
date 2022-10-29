import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent, AgentDocument } from './schema/agent.schema';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel(Agent.name)
    private agentModel: Model<AgentDocument>,
  ) {}

  // GET ALL ANGENTS AGENCE OR ADMIN
  async getAllAgents(): Promise<Agent[]> {
    return await this.agentModel.find().exec();
  }

  //   // GET USER BY ID Admin
  //   async getUserById(id: string): Promise<User> {
  //     return await this.userModel.findById(id).exec();
  //   }

  //   // UPDATE USER
  //   async updateUser(updateUserDto: AuthUpdateCredentialsDto, me: any) {
  //     const { email, firstname, lastname, password, phone, role } = updateUserDto;

  //     const user = await this.userModel.findById(me._id).exec();
  //     if (user) {
  //       if (password) {
  //         const salt = await bcrypt.genSalt();
  //         const hashedPassword = await bcrypt.hash(password, salt);
  //         user.password = hashedPassword;
  //       }
  //       user.firstname = firstname || user.firstname;
  //       user.lastname = lastname || user.lastname;
  //       user.phone = phone || user.phone;
  //       user.email = email || user.email;
  //       user.roles = role || user.roles;
  //       try {
  //         return await user.save();
  //       } catch (error) {
  //         throw new InternalServerErrorException(error);
  //       }
  //     } else {
  //       throw new UnauthorizedException('User with that id not found');
  //     }
  //   }

  //CREATE AGENT
  async createAgent(createAgentDto: CreateAgentDto, user: any): Promise<Agent> {
    const {
      email,
      firstname,
      lastname,
      description,
      facebook,
      gender,
      image,
      instagram,
      linkedin,
      website,
      youtube,
      phone,
    } = createAgentDto;

    const agent = new this.agentModel({
      user: user._id,
      firstname,
      lastname,
      phone,
      email,
      description,
      image: image && image,
      gender,
      socials: {
        youtube: youtube && youtube,
        facebook: facebook && facebook,
        instagram: instagram && instagram,
        linkedin: linkedin && linkedin,
        website: website && website,
      },
    });

    try {
      return await agent.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //   // DELETE USER Admin
  //   async deleteUser(id: string): Promise<User> {
  //     return await this.userModel.findByIdAndDelete(id).exec();
  //   }

  //   //   Login / Sign in
  //   async signIn(
  //     email: string,
  //     password: string,
  //   ): Promise<{ accessToken: string }> {
  //     const user = await this.userModel.findOne({ email }).exec();
  //     if (user && (await bcrypt.compare(password, user.password))) {
  //       const payload: JwtPayload = { email };
  //       const accessToken = await this.jwtService.sign(payload);
  //       return { accessToken };
  //     } else {
  //       throw new UnauthorizedException('Invalid Credentials');
  //     }
  //   }

  //   // FIND USER
  //   async findUser(email: string): Promise<User> {
  //     return this.userModel.findOne({ email }).exec();
  //   }
  //   // FORGOT PASSWORD
  //   async forgotPassword(email: string): Promise<{ message: string }> {
  //     const user = await this.userModel.findOne({ email }).exec();
  //     if (user) {
  //       const resetToken = crypto.randomBytes(20).toString('hex');
  //       user.resetPasswordToken = crypto
  //         .createHash('sha256')
  //         .update(resetToken)
  //         .digest('hex');

  //       user.resetPasswordExpiration = new Date(Date.now() + 10 * 60 * 1000);

  //       await user.save({ validateBeforeSave: false });
  //       try {
  //         await this.mailService.sendUserConfirmation(user, resetToken);
  //         return { message: 'Email Sent successfully' };
  //       } catch (error) {
  //         throw new InternalServerErrorException(error.message);
  //       }
  //     } else {
  //       throw new UnauthorizedException('User with that email not found');
  //     }
  //   }
  //   // RESET PASSWORD
  //   async resetPassword(resetToken: string, password: string): Promise<User> {
  //     const resetPasswordToken = crypto
  //       .createHash('sha256')
  //       .update(resetToken)
  //       .digest('hex');
  //     const user = await this.userModel
  //       .findOne({
  //         resetPasswordToken,
  //         resetPasswordExpiration: {
  //           $gt: new Date(),
  //         },
  //       })
  //       .exec();

  //     if (user) {
  //       if (user.resetPasswordExpiration.getTime() > Date.now()) {
  //         const salt = await bcrypt.genSalt();
  //         const hashedPassword = await bcrypt.hash(password, salt);
  //         user.password = hashedPassword;
  //         user.resetPasswordToken = undefined;
  //         user.resetPasswordExpiration = undefined;

  //         try {
  //           return await user.save();
  //         } catch (error) {
  //           throw new InternalServerErrorException(error);
  //         }
  //       } else {
  //         throw new UnauthorizedException('Reset token has expired');
  //       }
  //     } else {
  //       throw new UnauthorizedException('Invalid reset token');
  //     }
  //   }

  //   // SEND MESSAGE
  //   async sendMessage(
  //     messages: string,
  //     email: string,
  //     subject: string,
  //     name: string,
  //   ): Promise<any> {
  //     try {
  //       return await this.mailService.sendMessage(messages, email, subject, name);
  //     } catch (error) {
  //       throw new InternalServerErrorException(error);
  //     }
  //   }
}
