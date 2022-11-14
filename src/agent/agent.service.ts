import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 } from 'cloudinary';
import { Model } from 'mongoose';
import { CreateAgentDto } from './dto/create-agent.dto';
import { CreateReviewsDto } from './dto/create-review.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
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

  // GET USER BY ID AGENT OR ADMIN
  async getAgentById(id: string): Promise<Agent> {
    return await this.agentModel.findById(id).exec();
  }

  // GET MY AGENTS
  async getMyAgents(user: any): Promise<Agent[]> {
    return await this.agentModel.find({ user: user._id }).exec();
  }

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
      gender,
      socials: {
        youtube: youtube && youtube,
        facebook: facebook && facebook,
        instagram: instagram && instagram,
        linkedin: linkedin && linkedin,
        website: website && website,
      },
    });

    if (image !== '') {
      const result = await v2.uploader.upload(image, {
        folder: `dieundsakeur/user/${user.id}/profile`,
      });

      agent.image = {
        public_id: result.public_id,
        url: result.secure_url,
        format: result.format,
        height: result.height,
        width: result.width,
      };
    }

    try {
      return await agent.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // UPDATE USER
  async updateAgent(updateAgentDto: UpdateAgentDto, id: string, user: any) {
    const {
      email,
      firstname,
      lastname,
      description,
      phone,
      facebook,
      gender,
      image,
      instagram,
      linkedin,
      website,
    } = updateAgentDto;

    const agent = await this.agentModel.findById(id).exec();
    if (image) {
      if (agent.image.public_id) {
        const image_id = agent.image.public_id;
        await v2.uploader.destroy(image_id);
      }
      const result = await v2.uploader.upload(image, {
        folder: `dieundsakeur/agents/${user.name}`,
      });

      agent.image = {
        public_id: result.public_id,
        url: result.secure_url,
        format: result.format,
        height: result.height,
        width: result.width,
      };
    }

    if (agent && user._id.toString() === agent.user.toString()) {
      agent.firstname = firstname || agent.firstname;
      agent.lastname = lastname || agent.lastname;
      agent.phone = phone || agent.phone;
      agent.email = email || agent.email;
      agent.description = description || agent.description;
      agent.gender = gender || agent.gender;
      agent.socials.facebook = facebook || agent.socials.facebook;
      agent.socials.instagram = instagram || agent.socials.instagram;
      agent.socials.linkedin = linkedin || agent.socials.linkedin;
      agent.socials.website = website || agent.socials.website;
      try {
        return await agent.save();
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    } else {
      throw new UnauthorizedException('User with that id not found');
    }
  }

  // DELETE AGENT ADMIN
  async deleteAgent(id: string, user: any): Promise<Agent> {
    const agent = await this.agentModel.findById(id);
    if (
      (agent && user._id.toString() === agent.user.toString()) ||
      user.roles === 'admin'
    ) {
      await v2.uploader.destroy(agent.image.public_id);

      return await agent.remove();
    } else {
      throw new InternalServerErrorException('Agent not found');
    }
  }

  //GET TOP RATED PRODUCTS
  async getTopRatedAgent(): Promise<Agent[]> {
    const agent = await this.agentModel.find({}).sort({ rating: -1 }).limit(3);
    return agent;
  }

  //CREATE REVIEWS
  async createReviews(
    createReviewsDto: CreateReviewsDto,
    id: string,
    user: any,
  ): Promise<Agent> {
    let agent = await this.agentModel.findById(id);
    const { rating, comment } = createReviewsDto;

    if (agent) {
      const alreadyReviewed = agent.reviews.find(
        (r) => r.user.toString() === user._id.toString(),
      );

      if (alreadyReviewed) {
        throw new InternalServerErrorException(
          'Vous avez dèjas donné votre avis sur ce produit !',
        );
      }

      agent.reviews.push({
        user: user._id,
        name: user.firstname + ' ' + user.lastname,
        rating: Number(rating),
        comment: comment,
      });
      agent.numbReviews = agent.reviews.length;
      agent.rating =
        agent.reviews.reduceRight((acc, item) => item.rating + acc, 0) /
        agent.reviews.length;
      try {
        return await agent.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      throw new InternalServerErrorException('Agent not found');
    }
  }
}
