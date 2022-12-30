import { User, UserModel } from '../../entities/user.js';
import { Password } from '../../services/password/password.options.js';
import { BasicUserRepo, id } from '../repo.interface.js';

export class UserRepo implements BasicUserRepo {
    password = new Password();
    static instance: UserRepo;
    public static getInstance(): UserRepo {
        if (!UserRepo.instance) {
            UserRepo.instance = new UserRepo();
        }
        return UserRepo.instance;
    }
    #Model = UserModel;

    async post(data: Partial<User>): Promise<User> {
        if (typeof data.passwd !== 'string')
            throw new Error('Contraseña no valida');
        data.passwd = await this.password.encrypt(data.passwd);
        const result = await this.#Model.create(data);
        return result;
    }

    async query(key: string, value: string): Promise<Array<User>> {
        const result = await this.#Model
            .find({ [key]: value })
            .populate('favoriteSongs');
        return result as unknown as Array<User>;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('favoriteSongs');
        return result as User;
    }

    async onlyOne(id: id): Promise<User> {
        const user = await this.#Model.findById(id);
        return user as User;
    }

    async getAll(): Promise<Array<User>> {
        const result = await this.#Model.find();
        return result;
    }

    async delete(id: id): Promise<string> {
        await this.#Model.findByIdAndDelete(id);
        return id;
    }
}
