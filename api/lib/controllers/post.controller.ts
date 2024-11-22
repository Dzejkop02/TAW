import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //    this.router.get(`${this.path}/latest`, this.getAll);
        //    this.router.post(`${this.path}/:id`, this.addData);

        this.router.get(`${this.path}/:id`, this.getOne);
        this.router.post(this.path, this.add);
        this.router.delete(`${this.path}/:id`, this.deleteOne);
        this.router.post(`${this.path}/:num`, this.get);
        this.router.get(`${this.path}s`, this.getAll);
        this.router.delete(`${this.path}s`, this.deleteAll);
    }

    private getAll = async (request: Request, response: Response) => {
        response.status(200).json(testArr);
    };

    private getOne = async (request: Request, response: Response) => {
        const {id} = request.params;
        response.status(200).json(testArr[Number(id) - 1]);
    };

    private get = async (request: Request, response: Response) => {
        const {num} = request.params;
        response.status(200).json(testArr.slice(0, Number(num)));
    };

    private add = async (request: Request, response: Response) => {
        const {elem} = request.body;
        testArr.push(elem);

        response.status(200).json(testArr);
    };

    private deleteOne = async (request: Request, response: Response) => {
        const {id} = request.params;
        testArr.splice(Number(id) - 1, 1);

        response.status(200).json(testArr);
    };

    private deleteAll = async (request: Request, response: Response) => {
        testArr = [];

        response.status(200).json(testArr);
    };


    // private getAll = async (request: Request, response: Response) => {
    //     response.status(200).json(testArr);
    // };

    // private addData = async (request: Request, response: Response) => {
    //     const { elem } = request.body;
    //     testArr.push(elem);

    //     response.status(200).json(testArr);
    // };
}

export default PostController;
