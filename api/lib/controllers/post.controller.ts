import {Request, Response, Router} from 'express';
import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import Controller from '../interfaces/controller.interface';
import DataService from '../modules/services/data.service';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.post(this.path, this.add);
        this.router.delete(`${this.path}/:id`, this.deleteOne);
        this.router.post(`${this.path}/:num`, checkPostCount, this.get);
        this.router.get(`${this.path}s`, this.getAll);
        this.router.delete(`${this.path}s`, this.deleteAll);
    }

    private getAll = async (request: Request, response: Response) => {
        // response.status(200).json(testArr);

        const allData = await this.dataService.getAll();
        // const allData = await this.dataService.query({});
        response.status(200).json(allData);
    };

    private getOne = async (request: Request, response: Response) => {
        // const {id} = request.params;
        // response.status(200).json(testArr[Number(id) - 1]);

        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
    };

    private get = async (request: Request, response: Response) => {
        const {num} = request.params;
        // response.status(200).json(testArr.slice(0, Number(num)));
        const allData = await this.dataService.getLimit(Number(num));
        response.status(200).json(allData);
    };

    private add = async (request: Request, response: Response) => {
        // const {elem} = request.body;
        // testArr.push(elem);

        // response.status(200).json(testArr);

        const {title, text, image} = request.body;

        const readingData = {
            title,
            text,
            image
        };

        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('eeee', error)

            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    };

    private deleteOne = async (request: Request, response: Response) => {
        // const {id} = request.params;
        // testArr.splice(Number(id) - 1, 1);

        // response.status(200).json(testArr);

        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    };

    private deleteAll = async (request: Request, response: Response) => {
        // testArr = [];
        // response.status(200).json(testArr);

        await this.dataService.deleteAll();
        response.sendStatus(200);
    };
}

export default PostController;
