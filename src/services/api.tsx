import {AxiosInstance} from "axios";
import {AxiosService} from "./axiosService";
import {GameJsonld, HydraGame, HydraPlayer, HydraTeam, PlayerJsonld, TeamJsonld} from "../commons/model";


export class ApiService {
    constructor(private axios: AxiosInstance) { }

    public init() { }

    private async GET(url: string): Promise<any> {
        const response = await this.axios.get(url);
        return response.data;
    }

    public async getPlayers(): Promise<HydraPlayer> {
        return await this.GET('/players');
    }

    public async getTeams(): Promise<HydraTeam> {
        return await this.GET('/teams');
    }

    public async getGames(): Promise<HydraGame> {
        return await this.GET('/games');
    }

    public async addGame(game: any): Promise<any> {
        const result = await this.axios.post('/games', game);
        return result.data;
    }

    public async addPlayer(player: any): Promise<PlayerJsonld> {
        const result = await this.axios.post('/players', player);
        return result.data;
    }

    public async addTeam(team: any): Promise<PlayerJsonld> {
        const result = await this.axios.post('/teams', team);
        return result.data;
    }

    public async updateTeam(team: any): Promise<TeamJsonld> {
        const result = await this.axios.put('/teams/' + team.id, team);
        return result.data;
    }

    public async updatePlayer(player: any): Promise<PlayerJsonld> {
        const result = await this.axios.put('/players/' + player.id, player);
        return result.data;
    }

    public async updateGame(game: any): Promise<GameJsonld> {
        const result = await this.axios.put('/games/' + game.id, game);
        return result.data;
    }

    public async getStat(): Promise<any> {
        return await this.GET("/team_ranking");
    }

    public async getGamesByPlayer(id: number): Promise<any> {
        return await this.GET("/players/" + id + "/games");
    }

    public async getGamesByTeam(id: number): Promise<any> {
        return await this.GET("/teams/" + id + "/games");
    }





}

export const Api = new ApiService(AxiosService);
