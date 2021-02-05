import {AxiosInstance, AxiosResponse} from "axios";
import nProgress from "nprogress";
import {AxiosService} from "./axiosService";
import {HydraGame, HydraPlayer, HydraTeam, PlayerJsonld} from "../commons/model";


export class ApiService {
    constructor(private axios: AxiosInstance) { }


    private async GET(url: string): Promise<any> {
        const response = await this.axios.get(url);
        return response.data;
    }


    public async getPlayers(): Promise<HydraPlayer> {
        const result = await this.GET('/players');
        return result;
    }

    public async getTeams(): Promise<HydraTeam> {
        const result = await this.GET('/teams');
        return result;
    }

    public async getGames(): Promise<HydraGame> {
        const result = await this.GET('/games');
        return result;
    }

    public async addGame(): Promise<any> {
        const result = await this.GET('/games');
        return result.data;
    }


}

export const Api = new ApiService(AxiosService);